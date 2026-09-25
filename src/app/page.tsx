"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkle,
  ArrowRight,
  ShieldCheck,
  Users,
  Tote,
  FileText,
  CalendarCheck,
  MagnifyingGlass,
  MapPin,
  Clock,
  WhatsappLogo,
  Eye,
  CheckCircle,
  PaperPlaneTilt,
  IdentificationCard,
  TrendUp,
  Coins,
  Buildings,
  DownloadSimple,
  Receipt,
  X,
  ArrowsOut,
} from "@phosphor-icons/react";
import { CivicNoticeBar } from "@/components/civic-notice-bar";
import { Counter } from "@/components/ui/counter";
import { motion } from "motion/react";
import { OverlappingStack, SAMPLE_STACK_CARDS } from "@/components/ui/overlapping-stack";
import { useVillageStore } from "@/lib/data-store";
import { formatDateID, formatRupiah } from "@/lib/utils";

export default function HomePage() {
  const { profile, officials, articles, apbdes, agenda, saveAspirations, aspirations } = useVillageStore();

  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showBalihoModal, setShowBalihoModal] = useState<boolean>(false);

  // Aspirasi form state
  const [aspForm, setAspForm] = useState({ name: "", contact: "", subject: "", message: "" });
  const [aspSubmitted, setAspSubmitted] = useState(false);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCat = selectedCategory === "Semua" || art.category === selectedCategory;
      const matchSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const categories = ["Semua", "Pemerintahan", "Ekonomi & UMKM", "Kegiatan Warga", "Pembangunan"];

  const handleAspirationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aspForm.name || !aspForm.contact || !aspForm.message) return;

    const newAsp = {
      id: `asp-${Date.now()}`,
      name: aspForm.name,
      contact: aspForm.contact,
      subject: aspForm.subject || "Aspirasi Warga",
      message: aspForm.message,
      createdAt: new Date().toISOString().split("T")[0],
      status: "Baru" as const,
    };

    saveAspirations([newAsp, ...aspirations]);
    setAspSubmitted(true);
    setAspForm({ name: "", contact: "", subject: "", message: "" });
    setTimeout(() => setAspSubmitted(false), 5000);
  };

  // APBDes calculations & filter
  const [apbdesTab, setApbdesTab] = useState<"Semua" | "Pendapatan" | "Belanja">("Semua");

  const totalPendapatan = useMemo(
    () => apbdes.filter((a) => a.category === "Pendapatan").reduce((sum, item) => sum + item.budget, 0),
    [apbdes]
  );
  const totalPendapatanReal = useMemo(
    () => apbdes.filter((a) => a.category === "Pendapatan").reduce((sum, item) => sum + item.realization, 0),
    [apbdes]
  );
  const totalBelanja = useMemo(
    () => apbdes.filter((a) => a.category === "Belanja").reduce((sum, item) => sum + item.budget, 0),
    [apbdes]
  );
  const totalBelanjaReal = useMemo(
    () => apbdes.filter((a) => a.category === "Belanja").reduce((sum, item) => sum + item.realization, 0),
    [apbdes]
  );
  const surplusAnggaran = totalPendapatan - totalBelanja;
  const persenRealisasiPendapatan = totalPendapatan ? Math.round((totalPendapatanReal / totalPendapatan) * 100) : 0;
  const persenSerapanBelanja = totalBelanja ? Math.round((totalBelanjaReal / totalBelanja) * 100) : 0;

  const filteredApbdes = useMemo(() => {
    if (apbdesTab === "Semua") return apbdes;
    return apbdes.filter((item) => item.category === apbdesTab);
  }, [apbdes, apbdesTab]);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-[#f8fafc]">
      {/* 1. HERO SECTION: Modern Civic Split-Screen (Anti-gloomy, crisp, luminous) */}
      <section className="relative pt-6 pb-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50/50 via-white to-slate-50 border-b border-slate-200/80 overflow-hidden">
        {/* Subtle geometric civic backdrop glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Prestigious Civic Identity & Typography */}
            <div className="lg:col-span-7 space-y-6">
              {/* Bold Headline with High Contrast */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                  Pelayanan Cepat, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-800">
                    Desa Seribu Mesin.
                  </span>
                </h1>
                <p className="text-lg sm:text-xl font-medium text-slate-700 font-serif italic">
                  &ldquo;Gemah Ripah Loh Jinawi · Sentra Kerajinan Tas Nasional&rdquo;
                </p>
              </div>

              {/* Punchy Subtext */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                Portal resmi Pemerintah Desa Kadugenep, Kecamatan Petir, Kabupaten Serang. Mengintegrasikan kemudahan layanan administrasi mandiri warga, transparansi APBDes, serta geliat ratusan pengrajin tas konveksi lokal.
              </p>

              {/* Quick Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/layanan"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-sm shadow-md hover:shadow-xl transition-all active:scale-[0.98] flex items-center gap-2"
                >
                  <FileText size={18} weight="bold" />
                  <span>Pelayanan Surat Mandiri</span>
                </Link>

                <a
                  href="#potensi"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm shadow-sm transition-all active:scale-[0.98] flex items-center gap-2 group"
                >
                  <span>Potensi Sentra Mesin</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-sky-600" />
                </a>
              </div>

              {/* Quick Services Pill Shortcuts */}
              <div className="pt-4 border-t border-slate-200/80">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Layanan Cepat Terpopuler:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/layanan"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50/50 shadow-2xs transition-colors"
                  >
                    <Tote size={14} className="text-sky-600" />
                    <span>Surat Keterangan Usaha (SKU)</span>
                  </Link>
                  <Link
                    href="/layanan"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50/50 shadow-2xs transition-colors"
                  >
                    <IdentificationCard size={14} className="text-blue-600" />
                    <span>Pengantar SKCK</span>
                  </Link>
                  <a
                    href="#apbdes"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50/50 shadow-2xs transition-colors"
                  >
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>Cek APBDes 2026</span>
                  </a>
                </div>
              </div>

              {/* Operating Status Pill */}
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Kantor Buka
                </span>
                <span>08:00 - 15:30 WIB</span>
                <span>•</span>
                <span className="truncate">Jl. Raya Petir - Serang Km. 3</span>
              </div>
            </div>

            {/* Right Column: Radiant Photographic Showcase with Interactive Highlights */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-white">
                <Image
                  src="/images/hero-kadugenep.jpg"
                  alt="Panorama Asri Persawahan Desa Kadugenep"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                
                {/* Natural subtle bottom shadow for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Overlaid Bottom Title */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow">
                    Potensi Alam & Industri
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow">
                    Lanskap Kadugenep, Petir Serang
                  </h3>
                  <p className="text-xs text-slate-200 drop-shadow">
                    Kombinasi 120 ha sawah irigasi asri dan sentra 340+ bengkel konveksi mandiri.
                  </p>
                </div>
              </div>

              {/* Floating Highlight Widget 1: Sentra Tas */}
              <div className="absolute -top-4 -left-4 sm:-left-6 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl max-w-xs animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <Tote size={22} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sentra Konveksi</p>
                    <p className="text-sm font-black text-slate-900 leading-tight">340+ Unit Mesin</p>
                    <p className="text-[11px] text-sky-700 font-semibold">Aktif Memproduksi Tas</p>
                  </div>
                </div>
              </div>

              {/* Floating Highlight Widget 2: Balai Pelayanan */}
              <div className="hidden sm:block absolute -bottom-5 -right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle size={22} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Administrasi Desa</p>
                    <p className="text-sm font-black text-slate-900 leading-tight">Layanan Mandiri</p>
                    <p className="text-[11px] text-emerald-700 font-semibold">Resi Surat Digital Cepat</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MAKLUMAT RESMI & CIVIC BROADCAST BAR (Professional Institutional Ribbon) */}
      <CivicNoticeBar />

      {/* 3. KILAS STATISTIK DESA (Interactive Animated Counters & Crisp Visual Cards) */}
      <section className="py-12 bg-white border-b border-slate-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* 1. Demografi */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-white via-slate-50/70 to-sky-50/30 border border-slate-200/90 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100/50 hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-xs">
                    <Users size={24} weight="duotone" />
                  </div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-sky-800 bg-sky-100/60 border border-sky-200/70 px-2.5 py-0.5 rounded-full">
                    Demografi
                  </span>
                </div>
                
                <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight flex items-baseline gap-1">
                  <Counter end={profile.stats.population} duration={2.2} />
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Total Jiwa ({profile.stats.families.toLocaleString("id-ID")} KK)
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>Pencatatan Warga</span>
                  <span className="text-sky-700 font-bold">Terdata Aktif</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* 2. Industri Tas */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-white via-slate-50/70 to-amber-50/30 border border-slate-200/90 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-100/50 hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-xs">
                    <Tote size={24} weight="duotone" />
                  </div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-800 bg-amber-100/60 border border-amber-200/70 px-2.5 py-0.5 rounded-full">
                    Industri Tas
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight flex items-baseline gap-1">
                  <Counter end={profile.stats.bagCraftsmen} duration={2} suffix="+ Unit" />
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Bengkel Mesin Pengrajin Tas
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>Sentra Produksi</span>
                  <span className="text-amber-700 font-bold">Seribu Mesin</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "94%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, delay: 0.1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* 3. Pertanian */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-white via-slate-50/70 to-emerald-50/30 border border-slate-200/90 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-xs">
                    <Sparkle size={24} weight="duotone" />
                  </div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100/60 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                    Pertanian
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight flex items-baseline gap-1">
                  <Counter end={120} duration={1.8} suffix=" Ha" />
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Lahan Sawah Irigasi Subur
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>Ketahanan Pangan</span>
                  <span className="text-emerald-700 font-bold">Panen Rutin</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "88%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* 4. Keterbukaan */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-white via-slate-50/70 to-blue-50/30 border border-slate-200/90 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-xs">
                    <ShieldCheck size={24} weight="duotone" />
                  </div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-blue-800 bg-blue-100/60 border border-blue-200/70 px-2.5 py-0.5 rounded-full">
                    Keterbukaan
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight flex items-baseline gap-1">
                  <Counter end={100} duration={2} suffix="%" />
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Transparansi APBDes 2026
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>Tata Kelola</span>
                  <span className="text-blue-700 font-bold">100% Terbuka</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. SAMBUTAN KEPALA DESA & PUSAT PELAYANAN BALAI DESA */}
      <section id="sambutan" className="py-16 md:py-24 bg-gradient-to-b from-white via-sky-50/40 to-slate-50 border-b border-slate-200/80 relative overflow-hidden">
        {/* Subtle background ambient accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200">
              <Buildings size={15} />
              <span>Kepemimpinan & Balai Pelayanan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Membangun Desa, Melayani Warga
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Komitmen kepemimpinan Desa Kadugenep dalam mewujudkan pelayanan publik modern, transparan, dan berdaya saing industri kerajinan seribu mesin.
            </p>
          </div>

          {/* Two-Column Grid: Sambutan Kades (Left) & Balai Desa (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Card 1: Sambutan Resmi Kepala Desa */}
            <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white border border-slate-200/90 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-6">
                {/* Header ribbon */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-sky-800">
                    <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
                    <span>Sambutan Resmi Kepala Desa</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    Periode 2019 – 2025
                  </span>
                </div>

                {/* Profile + Quote Split */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                  {/* Photo of Kepala Desa */}
                  <div className="sm:col-span-4 flex flex-col items-center text-center space-y-2.5">
                    <div className="relative w-36 h-48 sm:w-full sm:h-52 rounded-2xl overflow-hidden border-2 border-sky-200 shadow-md bg-slate-100">
                      <Image
                        src="/images/kepala-desa-aopidi.jpg"
                        alt="H. M. Aopidi - Kepala Desa Kadugenep"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 144px, 200px"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 tracking-tight leading-snug">
                        H. M. AOPIDI
                      </h4>
                      <p className="text-[11px] text-sky-800 font-bold uppercase tracking-wider">
                        Kepala Desa Kadugenep
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Kec. Petir · Kab. Serang
                      </p>
                    </div>
                  </div>

                  {/* Quote & Greeting Body */}
                  <div className="sm:col-span-8 space-y-3.5 text-slate-700">
                    <p className="text-xs font-bold text-sky-800 italic">
                      &ldquo;Assalamu’alaikum Warahmatullahi Wabarakatuh&rdquo;
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                      Selamat datang di portal resmi Pemerintah Desa Kadugenep. Kami menyambut seluruh warga dan masyarakat luas dengan penuh rasa hormat dan keterbukaan.
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                      Sebagai sentra industri kreatif yang dijuluki <strong>&ldquo;Desa Kecil Seribu Mesin&rdquo;</strong>, visi utama kami adalah memajukan perekonomian warga pengrajin tas, menjaga kelestarian sektor pertanian, serta menjamin seluruh pelayanan administrasi desa dapat diakses secara cepat, tertib, dan transparan.
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                      Mari bersama-sama kita bangun Desa Kadugenep yang religius, mandiri, dan berdaya saing nasional!
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                      <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 font-semibold border border-sky-100">
                        ✓ Transparansi APBDes
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100">
                        ✓ Pelayanan Surat Digital
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-semibold border border-amber-100">
                        ✓ Dukungan UMKM Tas
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom signature block */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-7 h-9 shrink-0">
                    <Image
                      src="/images/logo-serang.png"
                      alt="Logo Kabupaten Serang"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-slate-900 leading-tight">
                      Pemerintah Desa Kadugenep
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Sepi Ing Pamrih Rame Ing Gawe
                    </p>
                  </div>
                </div>

                <a
                  href="#profil"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 group"
                >
                  <span>Lihat Struktur Aparatur Desa</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Card 2: Kantor & Balai Pelayanan Warga */}
            <div className="lg:col-span-5 p-7 sm:p-9 rounded-3xl bg-white border border-slate-200/90 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-2 pb-2">
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Kantor Balai Desa</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Buka Hari Kerja
                  </span>
                </div>

                {/* Real Photo of Balai Desa */}
                <div className="relative aspect-[16/9] sm:aspect-[2.2/1] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <Image
                    src="/images/kantor-desa-kadugenep.jpg"
                    alt="Kantor dan Balai Desa Kadugenep Petir Serang"
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-extrabold drop-shadow">Gedung Kantor & Loket Pelayanan</p>
                    <p className="text-[10px] text-slate-200 drop-shadow">Jl. Raya Petir - Serang Km. 3, Kadugenep</p>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    Pusat Layanan Tatap Muka & Konsultasi
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Balai Desa Kadugenep menyediakan loket pelayanan administrasi kependudukan, pengesahan berkas resmi, pengurusan SKU usaha tas, dan ruang musyawarah masyarakat.
                  </p>
                </div>

                {/* Info Points */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <Clock size={16} className="text-sky-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Jam Operasional Pelayanan:</p>
                      <p className="text-[11px] text-slate-600">Senin – Jumat: 08:00 – 15:30 WIB (Sabtu/Minggu Libur)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <MapPin size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-900">Lokasi & Alamat Fisik:</p>
                      <p className="text-[11px] text-slate-600">Jl. Raya Petir - Serang Km. 3, Kadugenep, Kec. Petir, Kab. Serang</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <Link
                  href="/layanan"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all"
                >
                  <FileText size={15} />
                  <span>Ajukan Surat Mandiri</span>
                </Link>

                <a
                  href="https://wa.me/6281289217721?text=Halo%20Pemerintah%20Desa%20Kadugenep,%20saya%20ingin%20menanyakan%20informasi%20pelayanan%20kantor%20desa."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <WhatsappLogo size={15} weight="fill" />
                  <span>Kontak Petugas Desa</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. OVERLAPPING STACK SECTION (Modern Stacking Cards) */}
      <div id="potensi">
        <OverlappingStack cards={SAMPLE_STACK_CARDS} />
      </div>

      {/* 5. SENTRA PENGRAJIN TAS "DESA KECIL SERIBU MESIN" */}
      <section id="sentra-tas" className="scroll-mt-20 py-16 md:py-24 bg-[#08172c] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Asset on Left */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
              <Image
                src="/images/kerajinan-tas.jpg"
                alt="Pengrajin Tas Desa Kadugenep Mesin Jahit"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700">
                <p className="text-sm font-bold text-white">Bengkel Konveksi Mandiri Kadugenep</p>
                <p className="text-xs text-sky-300 mt-0.5">Memproduksi hingga 15.000 tas berkualitas tiap bulannya.</p>
              </div>
            </div>

            {/* Content on Right */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-950 border border-sky-500/40 text-sky-300">
                <Tote size={16} />
                <span>Episentrum Industri Tas Banten</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
                Mengapa Dijuluki Desa Kecil Seribu Mesin?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Di Desa Kadugenep, hampir di setiap kediaman warga terdengar deru ritmis mesin jahit konveksi. Keterampilan yang diwariskan turun-temurun ini telah melahirkan ekosistem industri kreatif mandiri yang memasok berbagai kebutuhan tas ke pasar grosir dan toko ritel ternama di Pulau Jawa hingga Sumatra.
              </p>

              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <p className="text-xs font-bold text-sky-300">Tas Ransel & Sekolah</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">Bahan cordura & kanvas kuat tahan air.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <p className="text-xs font-bold text-sky-300">Tas Seminar & Kantor</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">Custom bordir & sablon logo instansi.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <p className="text-xs font-bold text-sky-300">Tas Carrier & Outdoor</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">Jahitan bar-tack presisi beban berat.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <p className="text-xs font-bold text-sky-300">Tote Bag & Cinderamata</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">Desain kekinian untuk souvenir acara.</p>
                </div>
              </div>

              {/* Direct Order WhatsApp link */}
              <div className="pt-2 flex items-center gap-4">
                <a
                  href={`https://wa.me/62${profile.whatsapp.replace(/[^0-9]/g, "").slice(1)}?text=Halo%20Pengurus%20UMKM%20Desa%20Kadugenep,%20saya%20tertarik%20dengan%20produk%20tas%20lokal.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs transition-colors shadow-lg"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  <span>Katalog Pemesanan Tas UMKM</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WARTA & BERITA TERKINI DESA (NEWS PORTAL) */}
      <section id="berita" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200 mb-2">
              <Sparkle size={15} />
              <span>Publikasi Resmi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Warta & Berita Desa Kadugenep
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Kabar terkini seputar pembangunan, kebijakan pemerintah desa, agenda komunitas, dan geliat ekonomi warga.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <MagnifyingGlass size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berita atau warta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600 shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-sky-700 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200">
            <p className="text-base font-semibold text-slate-700">Tidak ada berita yang sesuai dengan filter.</p>
            <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci lain atau ubah kategori.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                className="group flex flex-col rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={art.image || "/images/hero-kadugenep.jpg"}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-sky-200 backdrop-blur-md shadow-md border border-white/10">
                      {art.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-2">
                      <span>{formatDateID(art.date)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {art.views} dibaca
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug line-clamp-2">
                      <Link href={`/berita/${art.slug}`}>{art.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">Oleh {art.author}</span>
                    <Link
                      href={`/berita/${art.slug}`}
                      className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 group/btn"
                    >
                      <span>Baca</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 7. TRANSPARANSI APBDES 2026: Executive Civic Treasury Dashboard */}
      <section id="apbdes" className="scroll-mt-20 py-20 md:py-28 bg-[#060e1b] text-white relative overflow-hidden border-y border-slate-800/80">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[700px] h-[700px] rounded-full bg-sky-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          {/* Header Block */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-slate-800/80">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/90 text-emerald-400 border border-emerald-500/30 shadow-sm">
                <ShieldCheck size={16} weight="duotone" />
                <span>Akuntabilitas & Keterbukaan Publik</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Transparansi Anggaran Pendapatan & Belanja Desa
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Laporan resmi realisasi APBDes Tahun Anggaran 2026 Pemerintah Desa Kadugenep. Setiap rupiah dialokasikan secara terbuka, berkeadilan, dan diawasi bersama demi kemajuan sentra seribu mesin dan kesejahteraan warga.
              </p>
            </div>

            {/* Action & Verification Seal Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowBalihoModal(true)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg hover:shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Eye size={17} weight="bold" />
                <span>Lihat Dokumen Baliho Resmi</span>
              </button>

              <div className="hidden lg:flex items-center gap-3.5 p-3 px-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-xl shrink-0">
                <div className="relative w-7 h-9 shrink-0">
                  <Image
                    src="/images/logo-serang.png"
                    alt="Lambang Kabupaten Serang"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Audit BPD Disetujui</span>
                  </div>
                  <p className="text-xs font-extrabold text-white mt-0.5">Tahun Anggaran 2026</p>
                  <p className="text-[10px] text-slate-400">Musrenbangdes Kadugenep</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top 3 Executive KPI Bento Cards (Double-Bezel Architecture) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            
            {/* Card 1: Total Pendapatan */}
            <div className="p-1 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 shadow-2xl transition-all duration-300 hover:border-emerald-400/50">
              <div className="p-6 sm:p-7 rounded-[22px] bg-gradient-to-br from-slate-900 via-slate-900 to-[#022c22] relative overflow-hidden flex flex-col justify-between h-full space-y-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-950/90 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Total Pagu Pendapatan
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                      <TrendUp size={20} weight="bold" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {formatRupiah(totalPendapatan)}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Pagu target penerimaan kas desa resmi 2026
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Realisasi Diterima:</span>
                    <span className="font-bold font-mono text-emerald-300">{formatRupiah(totalPendapatanReal)} ({persenRealisasiPendapatan}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.5)] transition-all duration-1000"
                      style={{ width: `${persenRealisasiPendapatan}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 pt-0.5">
                    Bersumber dari: <strong>DDS APBN Pusat</strong>, <strong>ADD Serang</strong>, & <strong>PADes</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Total Belanja */}
            <div className="p-1 rounded-3xl bg-sky-500/15 border border-sky-500/30 shadow-2xl transition-all duration-300 hover:border-sky-400/50">
              <div className="p-6 sm:p-7 rounded-[22px] bg-gradient-to-br from-slate-900 via-slate-900 to-[#0c2a4d] relative overflow-hidden flex flex-col justify-between h-full space-y-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-950/90 text-sky-300 border border-sky-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      Rencana Alokasi Belanja
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0">
                      <Coins size={20} weight="bold" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {formatRupiah(totalBelanja)}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Total alokasi belanja pembangunan & pelayanan
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Anggaran Terserap:</span>
                    <span className="font-bold font-mono text-sky-300">{formatRupiah(totalBelanjaReal)} ({persenSerapanBelanja}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500 shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all duration-1000"
                      style={{ width: `${persenSerapanBelanja}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 pt-0.5">
                    Fokus: <strong>Jalan Sentra Usaha</strong>, <strong>Pelatihan UMKM</strong>, & <strong>Layanan Digital</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Surplus & Kesehatan Fiskal */}
            <div className="p-1 rounded-3xl bg-amber-500/15 border border-amber-500/30 shadow-2xl transition-all duration-300 hover:border-amber-400/50">
              <div className="p-6 sm:p-7 rounded-[22px] bg-gradient-to-br from-slate-900 via-slate-900 to-[#1f1505] relative overflow-hidden flex flex-col justify-between h-full space-y-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-950/90 text-amber-300 border border-amber-500/30">
                      <Sparkle size={13} weight="fill" />
                      Neraca Surplus & Cadangan
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} weight="bold" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">
                      +{formatRupiah(surplusAnggaran)}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Estimasi Sisa Lebih Pembiayaan Anggaran (SiLPA)
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                    <CheckCircle size={16} weight="fill" />
                    <span>Rasio Kas Sehat (Zero Defisit)</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Surplus dialokasikan sebagai dana cadangan mitigasi darurat serta penyertaan modal bergulir BUMDes.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Official Baliho Infografis Card (Direct Integration of Real Village Document) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#071d2b] border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Interactive Thumbnail */}
              <div className="lg:col-span-4 relative group">
                <div 
                  onClick={() => setShowBalihoModal(true)}
                  className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-xl cursor-pointer bg-slate-950 transition-all duration-300 group-hover:border-emerald-400 group-hover:scale-[1.02]"
                >
                  <Image
                    src="/images/infografis-apbdes-2026.png"
                    alt="Baliho Infografis APBDes Kadugenep Tahun 2026"
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-lg">
                      <ArrowsOut size={22} weight="bold" />
                    </div>
                    <span className="text-xs font-bold tracking-wide">Klik untuk Perbesar Dokumen Penuh</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                  <span>Dokumen Resmi Kemendesa</span>
                  <span className="text-emerald-400 font-bold">100% Terverifikasi</span>
                </div>
              </div>

              {/* Right Column: Key Breakdown & Official Highlights */}
              <div className="lg:col-span-8 space-y-5">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck size={15} />
                    <span>Baliho Resmi APBDes Tahun 2026</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Rincian Alokasi Belanja Sesuai Baliho Publik
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif italic">
                    &ldquo;Bangun Desa Bangun Indonesia — Desa Terdepan Untuk Indonesia&rdquo;
                  </p>
                </div>

                {/* 5 Bidang Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="flex items-center justify-between text-xs pb-1">
                      <span className="font-bold text-white">Bidang Pemerintah Desa</span>
                      <span className="font-mono font-bold text-emerald-400">59,57%</span>
                    </div>
                    <p className="text-base font-black text-white font-mono">{formatRupiah(684751252)}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Siltap & Oprasional Pemdes (Rp 494Jt), Aset Kantor (Rp 187Jt)</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="flex items-center justify-between text-xs pb-1">
                      <span className="font-bold text-white">Bidang Pembangunan Desa</span>
                      <span className="font-mono font-bold text-sky-400">33,28%</span>
                    </div>
                    <p className="text-base font-black text-white font-mono">{formatRupiah(382564700)}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Gedung Posyandu (Rp 93Jt), Jalan Desa (Rp 49Jt), PMT (Rp 22Jt)</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="flex items-center justify-between text-xs pb-1">
                      <span className="font-bold text-white">Bencana & BLT Mendesak</span>
                      <span className="font-mono font-bold text-amber-400">3,13%</span>
                    </div>
                    <p className="text-base font-black text-white font-mono">{formatRupiah(36000000)}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Bantuan Langsung Tunai (BLT) untuk warga yang membutuhkan</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <div className="flex items-center justify-between text-xs pb-1">
                      <span className="font-bold text-white">Pemberdayaan & Pembinaan</span>
                      <span className="font-mono font-bold text-pink-400">4,02%</span>
                    </div>
                    <p className="text-base font-black text-white font-mono">{formatRupiah(46154100)}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Pemberdayaan Perempuan (Rp 24Jt), Kepemudaan, PKK & Anti Narkoba</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBalihoModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <ArrowsOut size={15} weight="bold" />
                    <span>Perbesar & Baca Dokumen Lengkap</span>
                  </button>

                  <a
                    href="/images/infografis-apbdes-2026.png"
                    download="APBDes-Desa-Kadugenep-2026.png"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors"
                  >
                    <DownloadSimple size={15} />
                    <span>Unduh Gambar HD</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Segmented Balance Flow Meter */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Receipt size={16} className="text-sky-400" />
                Keseimbangan Aliran Keuangan Desa 2026
              </span>
              <span className="text-slate-400 text-[11px] font-mono">
                Total Pagu Pengelolaan: {formatRupiah(totalPendapatan)}
              </span>
            </div>

            {/* Segmented Flow Bar */}
            <div className="w-full h-3.5 rounded-full bg-slate-850 p-0.5 border border-slate-700/60 flex overflow-hidden gap-1">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                style={{ width: `${Math.round((totalPendapatanReal / totalPendapatan) * 55)}%` }}
                title="Pendapatan Masuk"
              />
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-700"
                style={{ width: `${Math.round((totalBelanjaReal / totalPendapatan) * 40)}%` }}
                title="Belanja Terserap"
              />
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-700"
                style={{ width: "12%" }}
                title="Cadangan Kas Surplus"
              />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Realisasi Pendapatan ({persenRealisasiPendapatan}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span>Serapan Belanja Pembangunan ({persenSerapanBelanja}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Cadangan SiLPA Sehat (+{formatRupiah(surplusAnggaran)})</span>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {(["Semua", "Pendapatan", "Belanja"] as const).map((tab) => {
                const count = tab === "Semua" ? apbdes.length : apbdes.filter((i) => i.category === tab).length;
                const isActive = apbdesTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setApbdesTab(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30 border border-sky-400"
                        : "bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/60"
                    }`}
                  >
                    <span>{tab === "Semua" ? "Semua Pos Anggaran" : tab === "Pendapatan" ? "Sumber Pendapatan" : "Alokasi Belanja"}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${isActive ? "bg-black/25 text-white" : "bg-slate-800 text-slate-400"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-slate-400 text-left sm:text-right font-medium">
              Menampilkan {filteredApbdes.length} pos anggaran terverifikasi
            </p>
          </div>

          {/* Bento Item Grid (Modular, high-information density cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredApbdes.map((item) => {
              const isIncome = item.category === "Pendapatan";
              return (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/85 border border-slate-800 hover:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  {/* Top Badge & Progress Pill */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isIncome
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                            : "bg-sky-950 text-sky-300 border border-sky-500/40"
                        }`}
                      >
                        {item.category}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {item.category === "Pendapatan" ? "Penerimaan Kas" : "Pengeluaran Program"}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                        item.percentage >= 85
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : item.percentage >= 70
                          ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {item.percentage}% Realisasi
                    </span>
                  </div>

                  {/* Title & Context */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-350 text-slate-300/80 mt-2 leading-relaxed">
                      {item.id === "apb-1" && "Transfer APBN Pusat untuk pembangunan fisik jalan desa, drainase lingkungan, dan program intervensi gizi balita stunting."}
                      {item.id === "apb-2" && "Alokasi perimbangan Pemkab Serang untuk operasional kelembagaan BPD, RT/RW, dan siltap aparatur pemerintahan desa."}
                      {item.id === "apb-3" && "Penerimaan mandiri dari sewa kios pasar desa, retribusi sentra konveksi, dan dividen usaha BUMDes Maju Bersama."}
                      {item.id === "apb-4" && "Peningkatan rabat beton 1.200 meter di koridor utama sentra tas Dusun 1 & 2 demi percepatan mobilitas logistik warga."}
                      {item.id === "apb-5" && "Pengadaan 35 unit mesin jahit canggih, pelatihan branding digital pengrajin, dan inkubasi desainer tas karang taruna."}
                      {item.id === "apb-6" && "Pengembangan sistem surat digital online mandiri 24 jam, wifi publik warga, serta modernisasi sarana kantor balai desa."}
                      {item.id === "apb-7" && "Dana siaga tanggap bencana luapan sawah, perbaikan tanggul darurat, dan jaring pengaman sosial warga pra-sejahtera."}
                      {!["apb-1","apb-2","apb-3","apb-4","apb-5","apb-6","apb-7"].includes(item.id) && (
                        isIncome
                          ? "Penerimaan kas resmi kas desa yang disalurkan transparan tanpa potongan."
                          : "Alokasi anggaran belanja program kemasyarakatan dan fasilitas publik Desa Kadugenep."
                      )}
                    </p>
                  </div>

                  {/* Financial Numbers & Visual Progress Bar */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <div>
                        <span className="text-[11px] text-slate-400">Telah Terealisasi:</span>
                        <p className="text-lg font-black font-mono text-white tracking-tight">
                          {formatRupiah(item.realization)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400">Target Pagu:</span>
                        <p className="text-xs font-mono font-semibold text-slate-300">
                          {formatRupiah(item.budget)}
                        </p>
                      </div>
                    </div>

                    {/* Glowing Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isIncome
                            ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            : item.percentage >= 85
                            ? "bg-gradient-to-r from-sky-400 to-blue-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                            : "bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Public Accountability Guarantee & Civic Feedback Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#0c1f36] border border-slate-700/80 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <CheckCircle size={16} weight="fill" />
                <span>Keterbukaan Informasi Publik (UU No. 14/2008 & UU Desa No. 6/2014)</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Punya Pertanyaan atau Masukan Mengenai Anggaran Desa?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Masyarakat berhak mengetahui, mengawasi, dan berpartisipasi aktif dalam setiap realisasi anggaran pembangunan Desa Kadugenep demi kemaslahatan bersama.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="#aspirasi"
                className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition-all active:scale-[0.98] flex items-center gap-2"
              >
                <PaperPlaneTilt size={16} weight="bold" />
                <span>Kirim Aspirasi APBDes</span>
              </a>
              <a
                href={`https://wa.me/62${profile.whatsapp.replace(/[^0-9]/g, "").slice(1)}?text=Halo%20Pengurus%20Desa%20Kadugenep,%20saya%20ingin%20menanyakan%20informasi%20APBDes%202026`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-600 font-bold text-xs transition-all flex items-center gap-2"
              >
                <WhatsappLogo size={18} weight="fill" />
                <span>Tanya via WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 8. APARATUR PEMERINTAH DESA */}
      <section id="profil" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200 mb-2">
            <Users size={15} />
            <span>Pemerintahan Desa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Struktur Aparatur Pemerintah Desa
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Perangkat Desa Kadugenep yang siap melayani kebutuhan administratif dan pembinaan kemasyarakatan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {officials.map((off) => {
            const isKades = off.id === "off-1";
            return (
              <div
                key={off.id}
                className={`p-6 rounded-3xl bg-white border transition-all flex items-center gap-4 ${
                  isKades
                    ? "border-sky-300 shadow-md ring-2 ring-sky-500/20 bg-gradient-to-br from-white via-sky-50/20 to-white hover:shadow-lg"
                    : "border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300"
                }`}
              >
                {off.photo ? (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-sky-600 shadow-md shrink-0 bg-slate-100">
                    <Image
                      src={off.photo}
                      alt={off.name}
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-800 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
                    {off.name.charAt(0)}
                  </div>
                )}
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-bold uppercase tracking-wider text-sky-800">{off.role}</p>
                    {off.period && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {off.period}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug truncate">{off.name}</h4>
                  {off.nip && <p className="text-[11px] text-slate-400 font-mono">NIP: {off.nip}</p>}
                  {off.phone && <p className="text-[11px] text-slate-500 font-mono">Kontak: {off.phone}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. AGENDA KEGIATAN DESA & ASPIRASI WARGA */}
      <section className="py-12 md:py-16 bg-[#f4f6f9] border-t border-slate-200 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Agenda Kegiatan */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 border border-sky-200 text-sky-800 mb-2">
                  <CalendarCheck size={15} />
                  <span>Jadwal Agenda</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Kegiatan & Rembug Warga
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Jadwal agenda musyawarah, posyandu, dan pelatihan UMKM di lingkungan Desa Kadugenep.
                </p>
              </div>

              <div className="space-y-3">
                {agenda.map((ag) => (
                  <div key={ag.id} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1.5 hover:border-sky-300 transition-colors">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">{ag.title}</h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-sky-50 text-sky-800 border border-sky-200 font-semibold shrink-0">
                        {formatDateID(ag.date)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{ag.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1 text-sky-700 font-medium">
                        <Clock size={13} />
                        {ag.time}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <MapPin size={13} />
                        {ag.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Kanal Pengaduan / Aspirasi Warga */}
            <div id="aspirasi" className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white text-slate-900 shadow-2xl space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 mb-2">
                  <PaperPlaneTilt size={16} />
                  <span>Kanal Aspirasi Warga</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Sampaikan Usulan & Laporan
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Punya ide kemajuan desa atau laporan fasilitas umum yang perlu diperbaiki? Sampaikan langsung kepada pengurus desa.
                </p>
              </div>

              {aspSubmitted && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle size={20} className="text-emerald-600 shrink-0" />
                  <span>Terima kasih! Aspirasi Anda telah dicatat dan akan ditindaklanjuti oleh aparat Desa Kadugenep.</span>
                </div>
              )}

              <form onSubmit={handleAspirationSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={aspForm.name}
                    onChange={(e) => setAspForm({ ...aspForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 08123456789"
                      value={aspForm.contact}
                      onChange={(e) => setAspForm({ ...aspForm, contact: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Perihal</label>
                    <input
                      type="text"
                      placeholder="Contoh: Usulan Jalan / UMKM"
                      value={aspForm.subject}
                      onChange={(e) => setAspForm({ ...aspForm, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Isi Pesan / Aspirasi *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan aspirasi, kritik, atau usulan Anda dengan jelas..."
                    value={aspForm.message}
                    onChange={(e) => setAspForm({ ...aspForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <PaperPlaneTilt size={16} />
                  <span>Kirim Aspirasi ke Kantor Desa</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Baliho APBDes 2026 */}
      {showBalihoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setShowBalihoModal(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 bg-slate-900/95 text-white">
              <div className="flex items-center gap-3">
                <div className="relative w-6 h-8 shrink-0">
                  <Image src="/images/logo-serang.png" alt="Logo Serang" fill className="object-contain" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    Baliho Resmi APBDes Desa Kadugenep Tahun 2026
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Pemerintah Desa Kadugenep · Kecamatan Petir, Kabupaten Serang
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/images/infografis-apbdes-2026.png"
                  download="APBDes-Desa-Kadugenep-2026.png"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 text-xs font-semibold transition-colors"
                  title="Unduh Gambar HD"
                >
                  <DownloadSimple size={15} />
                  <span className="hidden sm:inline">Unduh HD</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowBalihoModal(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-rose-900/60 transition-colors cursor-pointer"
                  title="Tutup Modal"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
            </div>

            {/* Modal Image Body (Scrollable for high-res detail inspection) */}
            <div className="overflow-y-auto p-4 flex justify-center bg-slate-900/40 max-h-[75vh]">
              <div className="relative w-full max-w-2xl aspect-[1052/1360] rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
                <Image
                  src="/images/infografis-apbdes-2026.png"
                  alt="Dokumen Lengkap APBDes Kadugenep Tahun 2026"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 px-6 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <span className="text-[11px]">
                Dokumen Resmi Sesuai Penetapan Bersama BPD & Kemendesa PDTT Republik Indonesia
              </span>
              <button
                type="button"
                onClick={() => setShowBalihoModal(false)}
                className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Tutup Dokumen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
