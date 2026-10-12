import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comparador Presidencial 2026 | Dados Cívicos Oficiais",
  description: "Compare objetivamente as propostas de governo e o histórico de votações dos candidatos ao 2º turno da Presidência do Brasil com dados do TSE e da Câmara dos Deputados.",
  openGraph: {
    title: "Comparador Presidencial 2026 | Dados Cívicos Oficiais",
    description: "Compare objetivamente as propostas e votações dos candidatos com dados do TSE e da Câmara dos Deputados.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans">
        {children}
      </body>
    </html>
  );
}
