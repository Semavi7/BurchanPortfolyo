import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "en" ? "en" : "tr";

  return {
    title:
      lang === "tr"
        ? "Mehmet Burchan Gurses | Yazilim Gelistirici"
        : "Mehmet Burchan Gurses | Software Developer",
    description:
      lang === "tr"
        ? "C#, .NET ve Full-stack Yazilim Gelistirici Portfolyosu"
        : "C#, .NET & Full-stack Software Developer Portfolio",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "en" ? "en" : "tr";

  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers initialLang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
