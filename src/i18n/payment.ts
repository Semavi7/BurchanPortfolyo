export const paymentUi = {
  tr: {
    // ── Section ──
    servicesTitle: "Hizmetler",
    servicesSubtitle: "Hizmet bedelini USDT ile guvenli ve hizli sekilde ode.",
    servicesIndex: "SERVICE_INDEX",
    selectService: "Odemeyi Baslat",
    closeCheckout: "Kapat",

    // ── Method tabs ──
    trc20Tab: "TRC20 (QR / Adres)",
    metamaskTab: "MetaMask",

    // ── TRC20 ──
    trc20Address: "TRC20 Genel Adres",
    copyAddress: "Adresi Kopyala",
    copied: "Kopyalandi",
    enterTxidLabel: "Odedikten sonra islem (TXID) numarani gir",
    txidPlaceholder: "Tronscan TX Hash",
    verifyButton: "Dogrula",
    verifying: "Dogrulaniyor...",
    verifiedFound: "Islem Tronscan uzerinde bulundu.",
    verifiedNotFound:
      "Islem henuz bulunamadi, birkac dakika sonra tekrar dene.",
    verifiedError:
      "Dogrulama su an yapilamadi, yine de bildirime devam edebilirsin.",

    // ── MetaMask ──
    networkLabel: "Ag Sec",
    connectingWallet: "Cuzdan baglaniyor...",
    switchingNetwork: "Ag degistiriliyor...",
    awaitingConfirmation: "Onay bekleniyor...",
    sendButton: (amount: number, network: string) =>
      `${amount} USDT Gonder (${network})`,
    sentButton: "Tekrar Gonder",
    metamaskNotFound: "MetaMask bulunamadi.",
    installMetamask: "MetaMask Kurulu Degil — Indir",
    openInMetamask: "MetaMask ile Ac",
    userRejected: "Islem cuzdanda reddedildi.",
    unknownError: "Bir hata olustu, tekrar dene.",
    viewOnExplorer: "Islemi Explorer'da Goruntule",

    // ── WhatsApp notify ──
    customerNamePlaceholder: "Adin Soyadin (opsiyonel)",
    notifyWhatsapp: "WhatsApp'tan Bildir",
    notifyDisabledTrc20Hint: "Once TXID gir.",
    notifyDisabledMetamaskHint: "Once odemeyi tamamla.",
    notifyOpenedHint: "WhatsApp acildi — mesaji gondermeyi unutma.",
    waMessageService: "Hizmet",
    waMessageAmount: "Tutar",
    waMessageMethod: "Yontem",
    waMessageTxHash: "TX Hash",
    waMessageTxHashEmpty: "(girilmedi)",
    waMessageCustomer: "Musteri",

    // ── Misc ──
    depositRequired: (percent: number, amount: number) =>
      `%${percent} PESINAT GEREKLI: ${amount} USDT`,
    networkDisclaimerTitle: "Ag Uyarisi",
    networkDisclaimerBody:
      "Gondermeden once agi mutlaka kontrol et. TRC20 sekmesinde sadece Tron (TRC20) agi, MetaMask sekmesinde sadece secili EVM agi (Ethereum veya BNB Smart Chain) desteklenir. Yanlis ag uzerinden gonderilen varliklar geri alinamaz.",
  },

  en: {
    // ── Section ──
    servicesTitle: "Services",
    servicesSubtitle: "Pay for services securely and quickly with USDT.",
    servicesIndex: "SERVICE_INDEX",
    selectService: "Start Checkout",
    closeCheckout: "Close",

    // ── Method tabs ──
    trc20Tab: "TRC20 (QR / Address)",
    metamaskTab: "MetaMask",

    // ── TRC20 ──
    trc20Address: "TRC20 Public Address",
    copyAddress: "Copy Address",
    copied: "Copied",
    enterTxidLabel: "After paying, enter your transaction (TXID) hash",
    txidPlaceholder: "Tronscan TX Hash",
    verifyButton: "Verify",
    verifying: "Verifying...",
    verifiedFound: "Transaction found on Tronscan.",
    verifiedNotFound: "Transaction not found yet, try again in a few minutes.",
    verifiedError:
      "Verification unavailable right now, you can still proceed to notify.",

    // ── MetaMask ──
    networkLabel: "Select Network",
    connectingWallet: "Connecting wallet...",
    switchingNetwork: "Switching network...",
    awaitingConfirmation: "Awaiting confirmation...",
    sendButton: (amount: number, network: string) =>
      `Send ${amount} USDT (${network})`,
    sentButton: "Send Again",
    metamaskNotFound: "MetaMask not found.",
    installMetamask: "MetaMask Not Installed — Get It",
    openInMetamask: "Open in MetaMask",
    userRejected: "Transaction rejected in wallet.",
    unknownError: "Something went wrong, please try again.",
    viewOnExplorer: "View Transaction on Explorer",

    // ── WhatsApp notify ──
    customerNamePlaceholder: "Your Name (optional)",
    notifyWhatsapp: "Notify via WhatsApp",
    notifyDisabledTrc20Hint: "Enter TXID first.",
    notifyDisabledMetamaskHint: "Complete the payment first.",
    notifyOpenedHint: "WhatsApp opened — don't forget to send the message.",
    waMessageService: "Service",
    waMessageAmount: "Amount",
    waMessageMethod: "Method",
    waMessageTxHash: "TX Hash",
    waMessageTxHashEmpty: "(not entered)",
    waMessageCustomer: "Customer",

    // ── Misc ──
    depositRequired: (percent: number, amount: number) =>
      `${percent}% UPFRONT DEPOSIT REQUIRED: ${amount} USDT`,
    networkDisclaimerTitle: "Network Disclaimer",
    networkDisclaimerBody:
      "Please double-check the network before sending. The TRC20 tab only supports the Tron (TRC20) network; the MetaMask tab only supports the selected EVM network (Ethereum or BNB Smart Chain). Assets sent via the wrong network cannot be recovered.",
  },
} as const;

export type PaymentUiDict = typeof paymentUi.tr;
