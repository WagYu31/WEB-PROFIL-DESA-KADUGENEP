import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kadugenep-petir.desa.id"),
  title: "Website Resmi Desa Kadugenep | Desa Kecil Seribu Mesin",
  description:
    "Portal resmi Pemerintah Desa Kadugenep, Kecamatan Petir, Kabupaten Serang, Banten. Pusat informasi warta desa, sentra kerajinan seribu mesin jahit, transparansi APBDes, dan pelayanan administrasi mandiri warga.",
  keywords: [
    "Desa Kadugenep",
    "Kadugenep Petir",
    "Seribu Mesin Kadugenep",
    "Pengrajin Tas Serang",
    "Pemerintah Desa Kadugenep",
    "Desa Wisata Banten",
    "APBDes Kadugenep",
    "Pelayanan Surat Desa Kadugenep",
  ],
  authors: [{ name: "Pemerintah Desa Kadugenep" }],
  openGraph: {
    title: "Website Resmi Desa Kadugenep | Desa Kecil Seribu Mesin",
    description:
      "Portal informasi warta desa, sentra pengrajin tas seribu mesin, transparansi APBDes, dan pelayanan publik Desa Kadugenep, Kecamatan Petir, Serang Banten.",
    url: "https://kadugenep-petir.desa.id",
    siteName: "Desa Kadugenep Official",
    images: [
      {
        url: "/images/hero-kadugenep.jpg",
        width: 1200,
        height: 630,
        alt: "Pemandangan Asri Desa Kadugenep Banten",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#fbfcf9] text-slate-900 selection:bg-emerald-800 selection:text-white">
        <Navbar />
        <main className="flex-grow pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
