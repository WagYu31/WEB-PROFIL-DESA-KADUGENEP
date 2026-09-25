"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "motion/react";
import {
  Sparkle,
  ArrowRight,
  ShieldCheck,
  TrendUp,
  Users,
  Tote,
  X,
  MapPin,
  BookOpen,
  NavigationArrow,
  CheckCircle,
  ArrowSquareOut,
} from "@phosphor-icons/react";

export interface StackCardData {
  id: string;
  tag: string;
  badgeBg: string;
  badgeText: string;
  title: string;
  description: string;
  bullets: { title: string; desc: string; icon: React.ReactNode }[];
  imageSrc: string;
  imageAlt: string;
  ctaText?: string;
  ctaLink?: string;
  actionType?: "modal-sejarah" | "modal-peta" | "link";
}

interface OverlappingStackProps {
  cards: StackCardData[];
}

function StackCardItem({
  card,
  index,
  total,
  range,
  targetScale,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress,
  onOpenModal,
}: {
  card: StackCardData;
  index: number;
  total: number;
  range: [number, number];
  targetScale: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
  onOpenModal: (type: "sejarah" | "peta") => void;
}) {
  const isReduced = useReducedMotion();
  const scale = useTransform(progress, range, [1, targetScale]);

  const handleActionClick = (e: React.MouseEvent) => {
    if (card.actionType === "modal-sejarah") {
      e.preventDefault();
      onOpenModal("sejarah");
    } else if (card.actionType === "modal-peta") {
      e.preventDefault();
      onOpenModal("peta");
    }
  };

  return (
    <div className="sticky top-24 md:top-28 flex items-center justify-center pt-2 pb-5">
      <motion.div
        style={{
          scale: isReduced ? 1 : scale,
          top: `calc(${index * 16}px)`,
        }}
        className="relative w-full max-w-4xl lg:max-w-5xl mx-auto rounded-2xl md:rounded-3xl bg-[#0b1727] text-white border border-slate-700/60 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5),0_0_0_1px_rgba(56,189,248,0.15)] overflow-hidden transition-all duration-300"
      >
        {/* Modern radial ambient glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center p-5 sm:p-6 md:p-8">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${card.badgeBg} ${card.badgeText} mb-2.5 shadow-sm`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {card.tag}
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-black tracking-tight text-white leading-snug">
                {card.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-[52ch]">
                {card.description}
              </p>
            </div>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2.5 border-t border-slate-800">
              {card.bullets.map((b, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-800/90 text-sky-400 border border-slate-700/50 shrink-0 mt-0.5 shadow-sm">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{b.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-normal mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action link */}
            {card.ctaText && (
              <div className="pt-1">
                {card.actionType === "modal-sejarah" || card.actionType === "modal-peta" ? (
                  <button
                    type="button"
                    onClick={handleActionClick}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-all cursor-pointer group"
                  >
                    <span>{card.ctaText}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : card.ctaLink?.startsWith("#") ? (
                  <a
                    href={card.ctaLink}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-all group"
                  >
                    <span>{card.ctaText}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    href={card.ctaLink || "#"}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition-all group"
                  >
                    <span>{card.ctaText}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Image Asset */}
          <div className="lg:col-span-5 relative w-full aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3] max-h-[250px] sm:max-h-[280px] lg:max-h-[270px] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl group">
            <Image
              src={card.imageSrc}
              alt={card.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 35vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
            
            {/* Card Index Badge */}
            <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-sky-300 font-bold">
              0{index + 1} / 0{total}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function OverlappingStack({ cards }: OverlappingStackProps) {
  const container = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<"sejarah" | "peta" | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const closeModal = () => setActiveModal(null);

  return (
    <section ref={container} className="relative py-8 md:py-14 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto mb-6 md:mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200 mb-2.5">
          <Sparkle size={14} />
          <span>Keunggulan Wilayah</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
          Potensi & Fondasi Desa Kadugenep
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Menyatukan kearifan lokal Banten, denyut industri kreatif seribu mesin, serta tata kelola pemerintahan yang transparan dan melayani.
        </p>
      </div>

      <div className="relative">
        {cards.map((card, i) => {
          const targetScale = 1 - (cards.length - i) * 0.03;
          return (
            <StackCardItem
              key={card.id}
              card={card}
              index={i}
              total={cards.length}
              range={[i * (1 / cards.length), 1]}
              targetScale={targetScale}
              progress={scrollYProgress}
              onOpenModal={(type) => setActiveModal(type)}
            />
          );
        })}
      </div>

      {/* Interactive Modal Popups */}
      <AnimatePresence>
        {activeModal === "sejarah" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-2xl p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup Modal"
              >
                <X size={20} weight="bold" />
              </button>

              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
                <BookOpen size={16} />
                <span>Sejarah & Tradisi Kerajinan</span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight leading-snug">
                Perjalanan Julukan &ldquo;Desa Kecil Seribu Mesin&rdquo;
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Kecamatan Petir · Kabupaten Serang · Provinsi Banten
              </p>

              <div className="mt-5 space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  Berawal dari dekade 1990-an, beberapa warga Desa Kadugenep yang merantau ke sentra konveksi tas di kota besar memutuskan pulang ke kampung halaman membawa keahlian menjahit tas berkualitas tinggi.
                </p>
                <p>
                  Keterampilan tersebut kemudian ditularkan dari rumah ke rumah, melahirkan tradisi gotong royong industri rumahan. Berkat ketekunan masyarakat, kini hampir di setiap sudut kampung terdengar dengung ritmis mesin jahit.
                </p>
                <p>
                  Dengan lebih dari <strong>340 unit bengkel mandiri</strong> aktif, Kadugenep bertransformasi menjadi salah satu episentrum pemasok tas terbesar di Provinsi Banten yang menembus pasar grosir Jabodetabek, Jawa Barat, hingga Sumatra.
                </p>
              </div>

              {/* Stat Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 pt-4 border-t border-slate-800">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                  <p className="text-lg font-black text-sky-400">1990-an</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Awal Rintisan</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                  <p className="text-lg font-black text-amber-400">340+ Unit</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Bengkel Mesin</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                  <p className="text-lg font-black text-emerald-400">120K+</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Produksi/Bulan</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                  <p className="text-lg font-black text-indigo-400">Nasional</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Jangkauan Pasar</p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href="#sentra-tas"
                  onClick={closeModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Tote size={16} weight="bold" />
                  <span>Jelajahi Produk & Sentra Tas</span>
                </a>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {activeModal === "peta" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-2xl p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup Modal"
              >
                <X size={20} weight="bold" />
              </button>

              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                <MapPin size={16} />
                <span>Geografis & Bentang Alam</span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight leading-snug">
                Peta Potensi Wilayah Desa Kadugenep
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Kecamatan Petir · Kabupaten Serang · Provinsi Banten (Kode Pos: 42172)
              </p>

              {/* Embedded Google Map */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-700/80 shadow-inner bg-slate-950 my-5">
                <iframe
                  src="https://maps.google.com/maps?q=Kantor+Desa+Kadugenep,+Petir,+Serang,+Banten&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.05] brightness-[0.95]"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Kantor Desa Kadugenep"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700 text-[10px] font-mono text-slate-200">
                  📍 6°14&apos;22.1&quot;S 106°11&apos;06.8&quot;E
                </div>
              </div>

              {/* Geographical Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60 space-y-1">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle size={15} className="text-emerald-400" />
                    Batas Wilayah Desa:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    • <strong>Utara:</strong> Desa Sindangsari<br />
                    • <strong>Selatan:</strong> Desa Mekarbaru<br />
                    • <strong>Barat:</strong> Desa Cirangkong<br />
                    • <strong>Timur:</strong> Desa Petir
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60 space-y-1">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <Sparkle size={15} className="text-sky-400" />
                    Statistik Wilayah:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    • <strong>Luas Wilayah:</strong> 3,42 km²<br />
                    • <strong>Lahan Pertanian:</strong> 120 Ha Sawah Irigasi<br />
                    • <strong>Pembagian:</strong> 4 Dusun & 16 RT<br />
                    • <strong>Ketinggian:</strong> ± 45 mdpl
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-5">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Kantor+Desa+Kadugenep+Kecamatan+Petir+Kabupaten+Serang+Banten"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <NavigationArrow size={16} weight="bold" />
                  <span>Petunjuk Arah Google Maps</span>
                  <ArrowSquareOut size={14} />
                </a>
                <a
                  href="#peta-wilayah"
                  onClick={closeModal}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors text-center"
                >
                  Lihat Peta di Footer
                </a>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-400 font-bold text-xs transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export const SAMPLE_STACK_CARDS: StackCardData[] = [
  {
    id: "card-tas",
    tag: "Sentra Kerajinan Nasional",
    badgeBg: "bg-sky-950 border border-sky-500/40",
    badgeText: "text-sky-300",
    title: "Desa Kecil Seribu Mesin: Rumah Pengrajin Tas Berkualitas",
    description:
      "Kadugenep tersohor sebagai episentrum produksi tas di Banten. Ratusan bengkel konveksi mandiri melahirkan tas sekolah, carrier gunung, hingga tas kantor berdaya tahan tinggi.",
    bullets: [
      {
        title: "340+ Unit Mesin Aktif",
        desc: "Digerakkan oleh tangan-tangan terampil warga lokal setiap harinya.",
        icon: <Tote size={16} />,
      },
      {
        title: "Ekspansi Digital",
        desc: "Menjangkau distributor dan konsumen di berbagai kota besar Indonesia.",
        icon: <TrendUp size={16} />,
      },
    ],
    imageSrc: "/images/kerajinan-tas.jpg",
    imageAlt: "Pengrajin tas Desa Kadugenep",
    ctaText: "Pelajari Sejarah & Ekosistem UMKM",
    ctaLink: "#sentra-tas",
    actionType: "modal-sejarah",
  },
  {
    id: "card-alam",
    tag: "Agraris & Wisata Edukasi",
    badgeBg: "bg-emerald-950 border border-emerald-500/40",
    badgeText: "text-emerald-300",
    title: "Hamparan Sawah Subur & Nuansa Alam Petir yang Asri",
    description:
      "Di balik geliat mesin industri jahit, Kadugenep memelihara bentang alam pedesaan nan hijau dengan sistem irigasi teknis terpadu yang menjamin kemandirian pangan warga.",
    bullets: [
      {
        title: "120 Hektare Sawah",
        desc: "Penghasil gabah berkualitas dengan panen stabil 3 kali setahun.",
        icon: <Sparkle size={16} />,
      },
      {
        title: "Rintisan Desa Wisata",
        desc: "Integrasi wisata edukasi jahit dan keasrian panorama desa.",
        icon: <TrendUp size={16} />,
      },
    ],
    imageSrc: "/images/hero-kadugenep.jpg",
    imageAlt: "Pemandangan sawah Desa Kadugenep",
    ctaText: "Lihat Peta Potensi Wilayah",
    ctaLink: "#peta-wilayah",
    actionType: "modal-peta",
  },
  {
    id: "card-balai",
    tag: "Pemerintahan Bersih",
    badgeBg: "bg-amber-950 border border-amber-500/40",
    badgeText: "text-amber-300",
    title: "Pelayanan Publik Cepat, Akuntabel, dan Ramah Warga",
    description:
      "Aparatur Kantor Balai Desa Kadugenep mengedepankan standar pelayanan cepat tanpa birokrasi berbelit. Segala kebutuhan permohonan surat kini dapat diproses mudah secara online.",
    bullets: [
      {
        title: "Transparansi APBDes",
        desc: "Laporan anggaran pendapatan dan belanja desa dipublikasikan terbuka.",
        icon: <ShieldCheck size={16} />,
      },
      {
        title: "Layanan Mandiri Warga",
        desc: "Permohonan surat keterangan usaha & pengantar online via portal.",
        icon: <Users size={16} />,
      },
    ],
    imageSrc: "/images/balai-desa.jpg",
    imageAlt: "Kantor Balai Desa Kadugenep",
    ctaText: "Ajukan Permohonan Surat Online",
    ctaLink: "/layanan",
    actionType: "link",
  },
  {
    id: "card-warga",
    tag: "Keguyuban Sosial",
    badgeBg: "bg-rose-950 border border-rose-500/40",
    badgeText: "text-rose-300",
    title: "Solidaritas Komunitas, Musyawarah, dan Generasi Muda Berdaya",
    description:
      "Kekuatan utama Kadugenep berakar pada keguyuban warganya. Forum Musrenbangdes dan aktivitas Karang Taruna aktif melahirkan inisiatif untuk memajukan kesejahteraan bersama.",
    bullets: [
      {
        title: "Pendidikan & Karakter",
        desc: "Didukung MTs Al-Fauzan dan majelis taklim terpadu.",
        icon: <Users size={16} />,
      },
      {
        title: "Gotong Royong Lestari",
        desc: "Tradisi sambatan dan rembug warga terjaga lintas generasi.",
        icon: <ShieldCheck size={16} />,
      },
    ],
    imageSrc: "/images/warga-komunitas.jpg",
    imageAlt: "Warga dan musyawarah Desa Kadugenep",
    ctaText: "Kirimkan Aspirasi / Usulan Warga",
    ctaLink: "#aspirasi",
    actionType: "link",
  },
];
