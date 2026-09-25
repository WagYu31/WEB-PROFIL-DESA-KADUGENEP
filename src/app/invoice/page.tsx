"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Printer,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Globe,
  HardDrives,
  Code,
  Bank,
  Receipt,
} from "@phosphor-icons/react";

export default function InvoicePage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/90 py-6 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans print:bg-white print:p-0 print:m-0 print:min-h-0 print:h-auto">
      
      {/* Top Action Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-5 flex flex-wrap items-center justify-between gap-4 no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-sky-700 hover:bg-slate-50 transition-colors shadow-xs group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle size={15} weight="fill" />
            <span>Status: Lunas (Verified Bank BJB)</span>
          </span>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            <Printer size={16} weight="bold" />
            <span>Cetak / Simpan PDF (1 Lembar Pas A4)</span>
          </button>
        </div>
      </div>

      {/* Main Printable A4 Container (Calibrated for exact 1-page A4 print) */}
      <div className="print-page-exact max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:shadow-none print:border-none print:rounded-none print:max-w-none print:w-full print:m-0">
        
        {/* Decorative Top Accent Bar */}
        <div className="h-2.5 bg-gradient-to-r from-sky-600 via-blue-700 to-emerald-600 print:h-1" />

        <div className="p-6 sm:p-10 space-y-5 print:p-4 print:space-y-2.5 text-slate-900">
          
          {/* 1. Header: Vendor Identity & Invoice Meta */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-200 print:pb-2 print:gap-2 avoid-break">
            {/* Vendor Details */}
            <div className="space-y-1 print:space-y-0.5">
              <div className="flex items-center gap-2.5 print:gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-blue-800 text-white flex items-center justify-center font-black text-lg shadow-sm print:w-7 print:h-7 print:text-xs print:rounded-lg">
                  WU
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-none print:text-base">
                    WAHYU UTOMO
                  </h1>
                  <p className="text-[11px] font-bold text-sky-800 uppercase tracking-wider mt-0.5 print:text-[8.5px] print:mt-0">
                    Web Developer & Digital Solutions Provider
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight pt-0.5 print:text-[8px] print:pt-0">
                Pengembangan Website Resmi Pemerintahan Desa, Cloud Hosting, Integrasi Layanan Publik, & Domain.
              </p>
            </div>

            {/* Invoice Meta */}
            <div className="sm:text-right space-y-1 print:space-y-0.5 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300 print:text-[8px] print:py-0 print:px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 print:w-1 print:h-1" />
                <span>INVOICE LUNAS / PAID</span>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold print:text-[8px]">Nomor Faktur:</p>
                <p className="text-xs font-mono font-black text-slate-900 print:text-[10px]">INV/2026/09/DESA-KDG/001</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold print:text-[8px]">Tanggal Pelunasan:</p>
                <p className="text-[11px] font-bold text-slate-800 print:text-[9px]">24 September 2026</p>
              </div>
            </div>
          </div>

          {/* 2. Client & Payment Box (Compact 2-Column Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs print:p-2 print:gap-2.5 print:rounded-xl print:text-[9px] avoid-break">
            {/* Tagihan Kepada / Client */}
            <div className="space-y-0.5">
              <span className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1 print:text-[8px]">
                <Receipt size={13} className="text-sky-700 print:w-3 print:h-3" />
                <span>Tagihan Ditujukan Kepada:</span>
              </span>
              <h2 className="text-sm font-black text-slate-950 print:text-[11px]">
                Pemerintah Desa Kadugenep
              </h2>
              <p className="text-slate-600 text-[11px] print:text-[9px]">
                Kecamatan Petir, Kabupaten Serang, Provinsi Banten 42172
              </p>
              <p className="text-slate-500 text-[10.5px] pt-0.5 print:text-[8.5px] print:pt-0">
                <strong className="text-slate-700">Sumber Rekening:</strong> KAS DESA KADUGENEP (Bank BJB: 0064670786001)
              </p>
            </div>

            {/* Rekening Pembayaran Vendor */}
            <div className="space-y-0.5 sm:border-l sm:border-slate-200 sm:pl-4 print:border-l print:pl-2.5">
              <span className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1 print:text-[8px]">
                <Bank size={13} className="text-emerald-700 print:w-3 print:h-3" />
                <span>Rekening Tujuan Pembayaran Vendor:</span>
              </span>
              <h2 className="text-sm font-black text-slate-950 print:text-[11px]">
                PT. BANK CENTRAL ASIA Tbk. (BCA)
              </h2>
              <p className="text-slate-600 text-[11px] print:text-[9px]">
                KCU Pusat Operasional · <strong className="font-mono text-sky-900 font-bold">Rek: 7015429429</strong> a.n. WAHYU UTOMO
              </p>
              <p className="text-emerald-700 font-semibold text-[10px] pt-0.5 print:text-[8.5px] print:pt-0">
                Metode Transfer: SKN Bank BJB (Ref: C202609242093402566)
              </p>
            </div>
          </div>

          {/* 3. Tech Infrastructure Strip */}
          <div className="px-4 py-2 rounded-xl bg-sky-50/80 border border-sky-200 flex flex-wrap items-center justify-between gap-2 text-xs print:py-1 print:px-2.5 print:rounded-lg print:text-[9px] avoid-break">
            <div className="flex items-center gap-2">
              <Globe size={15} weight="bold" className="text-sky-700 print:w-3 print:h-3" />
              <span className="text-slate-600 font-medium">Domain Resmi:</span>
              <strong className="font-mono text-sky-950">DesaKadugenep.my.id</strong>
            </div>

            <div className="flex items-center gap-2">
              <HardDrives size={15} weight="bold" className="text-blue-700 print:w-3 print:h-3" />
              <span className="text-slate-600 font-medium">Server:</span>
              <strong className="text-slate-900">Cloud Hosting DomaiNesia (Tier-3 Jakarta)</strong>
            </div>
          </div>

          {/* 4. Itemized Deliverables Table */}
          <div className="space-y-1.5 print:space-y-0.5 avoid-break">
            <div className="overflow-hidden rounded-xl border border-slate-200 print:rounded-lg">
              <table className="w-full text-left text-xs print:text-[9px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase text-[9.5px] tracking-wider print:text-[8px]">
                    <th className="py-2.5 px-3 w-10 text-center print:py-1 print:px-2 print:w-7">No</th>
                    <th className="py-2.5 px-3 print:py-1 print:px-2">Deskripsi Layanan & Spesifikasi Teknis</th>
                    <th className="py-2.5 px-3 w-24 text-center print:py-1 print:px-2 print:w-20">Durasi</th>
                    <th className="py-2.5 px-3 w-32 text-right print:py-1 print:px-2 print:w-28">Biaya (IDR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Item 1 */}
                  <tr className="avoid-break">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400 print:py-1 print:px-2">1</td>
                    <td className="py-2.5 px-3 print:py-1 print:px-2 space-y-0.5">
                      <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5 print:text-[9.5px]">
                        <Code size={13} className="text-sky-600 shrink-0 print:w-3 print:h-3" />
                        <span>Pengembangan & Desain Website Resmi Profil Desa Kadugenep</span>
                      </p>
                      <p className="text-slate-500 text-[10.5px] leading-snug print:text-[8px] print:leading-tight">
                        • Desain UI/UX responsif modern, portal warta desa, video profil & dokumentasi warga.<br />
                        • Layanan Surat Mandiri Digital (SKU, SKCK, Domisili, SKTM) resi otomatis & integrasi WhatsApp.<br />
                        • Transparansi APBDes 2026 interaktif, Dokumen Baliho Resmi, panel admin desa & SEO optimized.
                      </p>
                    </td>
                    <td className="py-2.5 px-3 text-center font-semibold text-slate-600 print:py-1 print:px-2">
                      Selesai Aktif
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-950 print:py-1 print:px-2">
                      Rp 4.850.000
                    </td>
                  </tr>

                  {/* Item 2 */}
                  <tr className="avoid-break">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400 print:py-1 print:px-2">2</td>
                    <td className="py-2.5 px-3 print:py-1 print:px-2 space-y-0.5">
                      <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5 print:text-[9.5px]">
                        <HardDrives size={13} className="text-blue-600 shrink-0 print:w-3 print:h-3" />
                        <span>Langganan Cloud Hosting DomaiNesia (Dedicated NVMe SSD)</span>
                      </p>
                      <p className="text-slate-500 text-[10.5px] leading-snug print:text-[8px] print:leading-tight">
                        • Cloud Server Storage NVMe SSD, Tier-3 Datacenter Jakarta latensi rendah.<br />
                        • Unlimited Bandwidth, Auto SSL Let&apos;s Encrypt 256-bit (HTTPS Aman), Daily Backup & Email Resmi Desa.
                      </p>
                    </td>
                    <td className="py-2.5 px-3 text-center font-semibold text-slate-600 print:py-1 print:px-2">
                      1 Tahun
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-950 print:py-1 print:px-2">
                      Rp 1.850.000
                    </td>
                  </tr>

                  {/* Item 3 */}
                  <tr className="avoid-break">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400 print:py-1 print:px-2">3</td>
                    <td className="py-2.5 px-3 print:py-1 print:px-2 space-y-0.5">
                      <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5 print:text-[9.5px]">
                        <Globe size={13} className="text-emerald-600 shrink-0 print:w-3 print:h-3" />
                        <span>Registrasi & Pengelolaan Domain DesaKadugenep.my.id</span>
                      </p>
                      <p className="text-slate-500 text-[10.5px] leading-snug print:text-[8px] print:leading-tight">
                        • Registrasi domain resmi desa, Konfigurasi DNS, Cloudflare Protection & routing hosting.
                      </p>
                    </td>
                    <td className="py-2.5 px-3 text-center font-semibold text-slate-600 print:py-1 print:px-2">
                      1 Tahun
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-950 print:py-1 print:px-2">
                      Rp 300.000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Summary & Terbilang Block */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center print:gap-2.5 avoid-break">
            {/* Terbilang block */}
            <div className="sm:col-span-7 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs print:p-1.5 print:rounded-lg print:text-[8.5px]">
              <span className="font-bold text-slate-400 uppercase text-[9.5px] tracking-wider print:text-[7.5px]">
                Jumlah Terbilang:
              </span>
              <p className="text-sm font-extrabold text-slate-900 font-serif italic print:text-xs">
                &ldquo;Tujuh Juta Rupiah&rdquo;
              </p>
              <p className="text-[10px] text-slate-500 pt-0.5 print:text-[7.5px] print:pt-0">
                Invoice & kuitansi sah pelunasan pengadaan website profil desa, domain, dan hosting APBDes 2026.
              </p>
            </div>

            {/* Total calculation */}
            <div className="sm:col-span-5 space-y-1 text-xs print:text-[9px] print:space-y-0.5">
              <div className="flex justify-between text-slate-600 py-0.5 print:py-0">
                <span>Subtotal Layanan:</span>
                <span className="font-mono font-bold text-slate-900">Rp 7.000.000</span>
              </div>
              <div className="flex justify-between text-slate-600 py-0.5 border-t border-slate-100 print:py-0">
                <span>Pajak / Potongan:</span>
                <span className="font-mono font-bold text-slate-900">Rp 0</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3.5 rounded-xl bg-gradient-to-r from-sky-950 to-blue-950 text-white font-black text-xs print:py-1 print:px-2.5 print:rounded-lg">
                <span className="uppercase tracking-wider text-[11px] print:text-[8.5px]">TOTAL DIBAYAR:</span>
                <span className="font-mono text-sm text-amber-300 print:text-[11px]">Rp 7.000.000</span>
              </div>
            </div>
          </div>

          {/* 6. Bank BJB Verified Strip */}
          <div className="px-3.5 py-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1 print:py-1 print:px-2.5 print:rounded-lg print:space-y-0.5 avoid-break">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1 font-extrabold text-emerald-900 text-[10px] uppercase tracking-wider print:text-[8px]">
                <ShieldCheck size={14} className="text-emerald-700 print:w-3 print:h-3" />
                <span>Verifikasi Transaksi (Bank BJB - Domestic Transfer)</span>
              </div>
              <span className="px-2 py-0.2 rounded text-[9px] font-bold bg-emerald-200 text-emerald-950 font-mono print:text-[7.5px] print:py-0 print:px-1.5">
                Executed Successfully
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-slate-700 pt-0.5 border-t border-emerald-200/50 text-[10px] print:text-[8px] print:pt-0">
              <div>
                <span className="text-slate-400">Waktu: </span>
                <strong className="text-slate-900">24/09/2026, 11:35</strong>
              </div>
              <div>
                <span className="text-slate-400">Layanan: </span>
                <strong className="text-slate-900">SKN Bank BJB</strong>
              </div>
              <div>
                <span className="text-slate-400">Ref: </span>
                <strong className="font-mono text-sky-900">C202609242093402566</strong>
              </div>
              <div>
                <span className="text-slate-400">Ket: </span>
                <strong className="text-slate-900">PEMBAYARAN WEB DESA</strong>
              </div>
            </div>
          </div>

          {/* 7. Signatures Grid (Controlled Height) */}
          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-6 text-xs text-center print:pt-1.5 print:gap-3 avoid-break">
            {/* Client Signature */}
            <div className="flex flex-col justify-between h-28 print:h-20">
              <div>
                <p className="font-bold text-slate-500 uppercase tracking-wider text-[9.5px] print:text-[8px]">
                  Menyetujui & Menerima Pekerjaan:
                </p>
                <p className="font-black text-slate-900 text-xs mt-0.5 print:text-[9.5px] print:mt-0">
                  Pemerintah Desa Kadugenep
                </p>
              </div>

              <div>
                <p className="font-black text-slate-950 underline text-xs print:text-[10px]">
                  H. M. AOPIDI
                </p>
                <p className="text-slate-500 font-medium text-[10px] print:text-[8px]">
                  Kepala Desa Kadugenep (2019 – 2025)
                </p>
              </div>
            </div>

            {/* Vendor Signature */}
            <div className="flex flex-col justify-between h-28 print:h-20">
              <div>
                <p className="font-bold text-slate-500 uppercase tracking-wider text-[9.5px] print:text-[8px]">
                  Serang, 24 September 2026
                </p>
                <p className="font-black text-slate-900 text-xs mt-0.5 print:text-[9.5px] print:mt-0">
                  Vendor Pelaksana / Penerima:
                </p>
              </div>

              {/* Signature Image */}
              <div className="my-0.5 flex items-center justify-center print:my-0">
                <Image
                  src="/images/signature-wahyu-utomo.jpg"
                  alt="Tanda Tangan Wahyu Utomo"
                  width={140}
                  height={50}
                  className="object-contain mix-blend-multiply h-11 w-auto print:h-8"
                  priority
                />
              </div>

              <div>
                <p className="font-black text-slate-950 underline text-xs print:text-[10px]">
                  WAHYU UTOMO
                </p>
                <p className="text-slate-500 font-medium text-[10px] print:text-[8px]">
                  Web Developer & IT Solutions (Rek. BCA 7015429429)
                </p>
              </div>
            </div>
          </div>

          {/* 8. Footer Note */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 print:pt-1 print:text-[7.5px] avoid-break">
            <span>DesaKadugenep.my.id · Dokumen Sah Administrasi & Pertanggungjawaban APBDes</span>
            <span>Dicetak secara elektronik melalui Sistem Desa Kadugenep</span>
          </div>

        </div>
      </div>
    </div>
  );
}
