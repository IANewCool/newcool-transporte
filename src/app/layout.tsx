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
  title: "Transporte Chile | NewCooltura Informada",
  description: "Buscador de plantas de revision tecnica, licencias de conducir, calculadora de multas y transporte publico en Chile",
  keywords: ["transporte Chile", "revision tecnica", "licencia conducir", "multas transito", "transporte publico"],
  openGraph: {
    title: "Transporte Chile - NewCooltura Informada",
    description: "Revision tecnica, licencias y multas",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
