"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { paymentUi } from "@/i18n/payment";
import { QRCodeSVG } from "qrcode.react";
import { EvmNetworkKey, evmNetworks } from "@/lib/evm-payment";
import {
  connectWallet,
  ensureNetwork,
  isMobile,
  isMetaMaskAvailable,
  openMetaMaskDeepLink,
  sendUsdtPayment,
} from "@/lib/metamask";
import { paymentConfig } from "@/lib/payment-config";
import { useState } from "react";
import {
  Copy,
  Check,
  MessageCircle,
  Wallet,
  ExternalLink,
  Loader2,
  AlertCircle,
  ShieldCheck,
  AlertTriangle,
  X,
} from "lucide-react";

type PayMethod = "trc20" | "metamask";
type MmStatus =
  | "idle"
  | "connecting"
  | "switching"
  | "sending"
  | "success"
  | "error";
type VerifyResult = "ok" | "not_found" | "error" | null;
type MmErrorCode = "METAMASK_NOT_FOUND" | "USER_REJECTED" | "UNKNOWN";

interface ServiceCheckoutProps {
  serviceName: string;
  amountUsdt: number;
  depositPercent?: number;
  onClose: () => void;
}

const ServiceCheckout = ({
  serviceName,
  amountUsdt,
  depositPercent,
  onClose,
}: ServiceCheckoutProps) => {
  const { lang } = useLanguage();
  const t = paymentUi[lang];

  const payAmount = depositPercent
    ? Math.round((amountUsdt * depositPercent) / 100)
    : amountUsdt;

  const [method, setMethod] = useState<PayMethod>("trc20");
  const [copied, setCopied] = useState(false);

  const [manualTxHash, setManualTxHash] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<VerifyResult>(null);

  const [networkKey, setNetworkKey] = useState<EvmNetworkKey>("bsc");
  const [mmStatus, setMmStatus] = useState<MmStatus>("idle");
  const [account, setAccount] = useState<string | null>(null);
  const [mmTxHash, setMmtxHash] = useState<string | null>(null);
  const [mmError, setMmError] = useState<MmErrorCode | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [waOpened, setWaOpened] = useState(false);

  const finalTxHash = method === "trc20" ? manualTxHash.trim() : mmTxHash;
  const networkLabel =
    method === "trc20" ? "TRC20 (Tron)" : evmNetworks[networkKey].chainName;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paymentConfig.usdtTrc20Address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API'sine erisim yoksa sessizce gec
    }
  };

  const handleVerifyTrc20 = async () => {
    if (!manualTxHash.trim()) return;
    setVerifying(true);
    setVerifyResult(null);
    try {
      const res = await fetch(
        `https://apilist.tronscanapi.com/api/transaction-info?hash=${manualTxHash.trim()}`,
      );
      const data = await res.json();
      const found = Boolean(data?.hash || data?.contractData);
      setVerifyResult(found ? "ok" : "not_found");
    } catch {
      setVerifyResult("error");
    } finally {
      setVerifying(false);
    }
  };

  const handleMetaMaskPay = async () => {
    setMmError(null);
    if (!isMetaMaskAvailable()) {
      setMmError("METAMASK_NOT_FOUND");
      return;
    }
    try {
      setMmStatus("connecting");
      const addr = account ?? (await connectWallet());
      setAccount(addr);

      setMmStatus("switching");
      await ensureNetwork(networkKey);

      setMmStatus("sending");
      const hash = await sendUsdtPayment({
        fromAdress: addr,
        toAdress: paymentConfig.evmAdress,
        amount: payAmount,
        networkKey,
      });
      setMmtxHash(hash);
      setMmStatus("success");
    } catch (err: unknown) {
      const code = (err as { code?: number })?.code;
      setMmError(code === 4001 ? "USER_REJECTED" : "UNKNOWN");
      setMmStatus("error");
    }
  };

  const waMessage = [
    `${t.waMessageService}: ${serviceName}`,
    `${t.waMessageAmount}: ${payAmount} USDT`,
    `${t.waMessageMethod}: ${networkLabel}`,
    `${t.waMessageTxHash}: ${finalTxHash || t.waMessageTxHashEmpty}`,
    customerName ? `${t.waMessageCustomer}: ${customerName}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const waLink = `https://wa.me/${paymentConfig.ownerWhatsapp}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="border border-border bg-card p-6 md:p-8 relative">
      <button
        onClick={onClose}
        aria-label={t.closeCheckout}
        className="absolute top-6 right-6 text-muted hover:text-foreground transition-colors"
      >
        <X size={18} />
      </button>

      {/* ── Baslik + Fiyat ── */}
      <div className="mb-6 pr-8">
        <h3 className="text-2xl font-black uppercase tracking-tight mb-1">
          {serviceName}
        </h3>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-4xl font-black">{payAmount}</span>
          <span className="font-mono text-sm font-bold text-muted uppercase">
            USDT
          </span>
          {depositPercent != null && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent ml-2">
              {t.depositRequired(depositPercent, payAmount)}
            </span>
          )}
        </div>
      </div>

      {/* ── Yontem sekmeleri ── */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMethod("trc20")}
          className={`flex-1 py-2.5 font-mono text-[10px] uppercase tracking-widest border transition-colors ${
            method === "trc20"
              ? "border-primary text-primary bg-primary/10"
              : "border-border text-muted hover:border-foreground/30"
          }`}
        >
          {t.trc20Tab}
        </button>
        <button
          onClick={() => setMethod("metamask")}
          className={`flex-1 py-2.5 font-mono text-[10px] uppercase tracking-widest border transition-colors ${
            method === "metamask"
              ? "border-primary text-primary bg-primary/10"
              : "border-border text-muted hover:border-foreground/30"
          }`}
        >
          {t.metamaskTab}
        </button>
      </div>

      {/* ── TRC20 sekmesi ── */}
      {method === "trc20" && (
        <div className="space-y-5">
          <div className="flex justify-center">
            <div className="bg-white p-4">
              <QRCodeSVG
                value={paymentConfig.usdtTrc20Address}
                size={176}
                level="M"
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {t.trc20Address}
              </span>
            </div>
            <div className="flex items-center gap-2 border border-border bg-background p-3">
              <code className="font-mono text-xs break-all flex-1">
                {paymentConfig.usdtTrc20Address}
              </code>
              <button
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-background font-mono text-[10px] uppercase font-bold tracking-wide hover:opacity-80 transition-opacity"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? t.copied : t.copyAddress}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
              {t.enterTxidLabel}
            </label>
            <div className="flex gap-2">
              <input
                value={manualTxHash}
                onChange={(e) => {
                  setManualTxHash(e.target.value);
                  setVerifyResult(null);
                }}
                placeholder={t.txidPlaceholder}
                className="flex-1 bg-background border border-border px-3 py-2.5 text-xs font-mono outline-none focus:border-primary transition-colors"
              />
              <button
                onClick={handleVerifyTrc20}
                disabled={!manualTxHash.trim() || verifying}
                className="px-4 py-2.5 border border-border font-mono text-[10px] uppercase tracking-wide hover:border-primary transition-colors disabled:opacity-40 disabled:hover:border-border shrink-0"
              >
                {verifying ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  t.verifyButton
                )}
              </button>
            </div>
            {verifyResult === "ok" && (
              <p className="flex items-center gap-1.5 text-xs text-primary mt-2">
                <ShieldCheck size={14} /> {t.verifiedFound}
              </p>
            )}
            {verifyResult === "not_found" && (
              <p className="text-xs text-accent mt-2">{t.verifiedNotFound}</p>
            )}
            {verifyResult === "error" && (
              <p className="text-xs text-muted mt-2">{t.verifiedError}</p>
            )}
          </div>
        </div>
      )}

      {/* ── MetaMask sekmesi ── */}
      {method === "metamask" && (
        <div className="space-y-5">
          <div>
            <div className="mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {t.networkLabel}
              </span>
            </div>
            <div className="flex gap-2">
              {(Object.keys(evmNetworks) as EvmNetworkKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setNetworkKey(key)}
                  disabled={mmStatus !== "idle" && mmStatus !== "error"}
                  className={`px-3 py-2 font-mono text-[10px] uppercase tracking-wide border transition-colors disabled:opacity-40 ${
                    networkKey === key
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted hover:border-foreground/30"
                  }`}
                >
                  {evmNetworks[key].chainName}
                </button>
              ))}
            </div>
          </div>

          {!isMetaMaskAvailable() ? (
            isMobile() ? (
              <button
                onClick={openMetaMaskDeepLink}
                className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-background font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
              >
                <Wallet size={18} />
                {t.openInMetamask}
              </button>
            ) : (
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 border border-border font-mono text-xs uppercase tracking-wide hover:border-primary transition-colors"
              >
                {t.installMetamask} <ExternalLink size={14} />
              </a>
            )
          ) : (
            <button
              onClick={handleMetaMaskPay}
              disabled={["connecting", "switching", "sending"].includes(
                mmStatus,
              )}
              className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-background font-bold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {mmStatus === "connecting" && (
                <>
                  <Loader2 size={18} className="animate-spin" />{" "}
                  {t.connectingWallet}
                </>
              )}
              {mmStatus === "switching" && (
                <>
                  <Loader2 size={18} className="animate-spin" />{" "}
                  {t.switchingNetwork}
                </>
              )}
              {mmStatus === "sending" && (
                <>
                  <Loader2 size={18} className="animate-spin" />{" "}
                  {t.awaitingConfirmation}
                </>
              )}
              {(mmStatus === "idle" || mmStatus === "error") && (
                <>
                  <Wallet size={18} />{" "}
                  {t.sendButton(payAmount, evmNetworks[networkKey].chainName)}
                </>
              )}
              {mmStatus === "success" && t.sentButton}
            </button>
          )}

          {mmError && (
            <div className="flex items-start gap-2 p-3 border border-red-500/30 bg-red-500/5">
              <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-300">
                {mmError === "METAMASK_NOT_FOUND" && t.metamaskNotFound}
                {mmError === "USER_REJECTED" && t.userRejected}
                {mmError === "UNKNOWN" && t.unknownError}
              </p>
            </div>
          )}

          {mmStatus === "success" && mmTxHash && (
            <a
              href={`${evmNetworks[networkKey].blockExplorerUrls[0]}/tx/${mmTxHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-primary hover:underline font-mono"
            >
              {t.viewOnExplorer} <ExternalLink size={12} />
            </a>
          )}
        </div>
      )}

      {/* ── Ag uyarisi ── */}
      <div className="flex gap-3 p-4 border border-accent/30 bg-accent/5 mt-6">
        <AlertTriangle size={18} className="text-accent shrink-0 mt-0.5" />
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-1">
            {t.networkDisclaimerTitle}
          </div>
          <p className="text-xs text-muted leading-relaxed">
            {t.networkDisclaimerBody}
          </p>
        </div>
      </div>

      {/* ── WhatsApp bildirim ── */}
      <div className="pt-6 mt-6 border-t border-border space-y-3">
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder={t.customerNamePlaceholder}
          className="w-full bg-background border border-border px-3 py-2.5 text-sm font-mono outline-none focus:border-primary transition-colors"
        />
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!finalTxHash) {
              e.preventDefault();
              return;
            }
            setWaOpened(true);
          }}
          className={`flex items-center justify-center gap-2 w-full py-4 font-bold uppercase tracking-wide transition-opacity ${
            finalTxHash
              ? "bg-[#25D366] text-black hover:opacity-90"
              : "bg-border text-muted cursor-not-allowed"
          }`}
        >
          <MessageCircle size={18} />
          {t.notifyWhatsapp}
        </a>
        {!finalTxHash && (
          <p className="text-xs text-muted text-center">
            {method === "trc20"
              ? t.notifyDisabledTrc20Hint
              : t.notifyDisabledMetamaskHint}
          </p>
        )}
        {waOpened && finalTxHash && (
          <p className="text-xs text-muted text-center">{t.notifyOpenedHint}</p>
        )}
      </div>
    </div>
  );
};

export default ServiceCheckout;
