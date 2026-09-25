"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  MegaphoneSimple,
  Clock,
  WhatsappLogo,
  CaretLeft,
  CaretRight,
  ArrowRight,
} from "@phosphor-icons/react";

interface NoticeItem {
  id: string;
  category: string;
  title: string;
  actionLabel: string;
  actionHref: string;
}

const OFFICIAL_NOTICES: NoticeItem[] = [
  {
    id: "notice-1",
    category: "Layanan Mandiri",
    title: "Pengajuan Surat Keterangan (SKU, Domisili, SKCK) aktif 24 jam via portal desa.",
    actionLabel: "Ajukan Surat",
    actionHref: "/layanan",
  },
  {
    id: "notice-2",
    category: "APBDes 2026",
    title: "Realisasi APBDes Bidang Pembangunan capai 78.4% — Terbuka bagi seluruh warga.",
    actionLabel: "Cek APBDes",
    actionHref: "#apbdes",
  },
  {
    id: "notice-3",
    category: "Sentra Tas",
    title: "Fasilitasi legalitas NIB & kemitraan ritel bagi 340+ bengkel pengrajin tas Kadugenep.",
    actionLabel: "Potensi Sentra",
    actionHref: "#sentra-tas",
  },
  {
    id: "notice-4",
    category: "Kantor Desa",
    title: "Pelayanan tatap muka di Kantor Desa buka Senin–Jumat pukul 08:00 – 15:30 WIB.",
    actionLabel: "Info Balai",
    actionHref: "#kontak",
  },
];

export function CivicNoticeBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentNotice = OFFICIAL_NOTICES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % OFFICIAL_NOTICES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + OFFICIAL_NOTICES.length) % OFFICIAL_NOTICES.length);
  };

  // Auto rotate every 6 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  return (
    <section
      aria-label="Papan Maklumat Resmi Desa"
      className="relative w-full bg-gradient-to-r from-[#061528] via-[#091f3a] to-[#061528] border-y border-slate-800/80 text-white shadow-inner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle institutional ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(14,165,233,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-6">
          
          {/* Left: Official Notice Broadcast Ribbon */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
            
            {/* Official Civic Badge */}
            <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <MegaphoneSimple size={14} weight="fill" className="text-emerald-400 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider whitespace-nowrap">
                Maklumat
              </span>
            </div>

            {/* Live Notice Content Slider */}
            <div className="relative flex-1 min-w-0 h-6 sm:h-7 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNotice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="flex items-center gap-2 w-full min-w-0"
                >
                  <p className="text-xs sm:text-[13px] text-slate-200 font-medium truncate min-w-0 flex-1">
                    <span className="text-sky-300 font-bold mr-1.5">{currentNotice.category}:</span>
                    <span>{currentNotice.title}</span>
                  </p>

                  <Link
                    href={currentNotice.actionHref}
                    className="shrink-0 inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-sky-400 hover:text-sky-300 underline underline-offset-2 ml-1 transition-colors whitespace-nowrap"
                  >
                    <span>{currentNotice.actionLabel}</span>
                    <ArrowRight size={12} weight="bold" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Controls */}
            <div className="shrink-0 hidden md:flex items-center gap-1 pl-2 border-l border-slate-700/60 text-slate-400">
              <span className="text-[10px] font-bold text-slate-400 select-none mr-1">
                {currentIndex + 1}/{OFFICIAL_NOTICES.length}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Pengumuman sebelumnya"
                className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <CaretLeft size={14} weight="bold" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Pengumuman selanjutnya"
                className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <CaretRight size={14} weight="bold" />
              </button>
            </div>
          </div>

          {/* Right: Operational Status & Civic Direct Hotline */}
          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
            
            {/* Balai Desa Working Hours */}
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300 font-medium whitespace-nowrap">
              <Clock size={14} className="text-emerald-400 shrink-0" />
              <span>
                <span className="text-emerald-400 font-semibold">Kantor:</span> Buka 08:00 – 15:30 WIB
              </span>
            </div>

            {/* Direct WhatsApp Call Center / Layanan Warga */}
            <a
              href="https://wa.me/6281289217721?text=Halo%20Pemerintah%20Desa%20Kadugenep,%20saya%20ingin%20menanyakan%20informasi%20layanan%20desa."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-98 whitespace-nowrap"
            >
              <WhatsappLogo size={15} weight="fill" className="text-emerald-400 shrink-0" />
              <span className="font-bold">Hotline:</span>
              <span className="text-slate-200">0812-8921-7721</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
