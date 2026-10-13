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
  title: "Pauta Limpa 2026 | Comparador Presidencial Oficial",
  description: "Pauta Limpa: compare objetivamente as propostas de governo e o histórico de votações dos candidatos ao 2º turno da Presidência do Brasil com dados do TSE e da Câmara dos Deputados.",
  openGraph: {
    title: "Pauta Limpa 2026 | Dados Cívicos Oficiais",
    description: "Compare propostas e históricos de votações com dados abertos do TSE e da Câmara dos Deputados.",
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
      <body className="min-h-full flex flex-col bg-zinc-50/60 text-zinc-900 font-sans">
        {children}
      </body>
    </html>
  );
}
