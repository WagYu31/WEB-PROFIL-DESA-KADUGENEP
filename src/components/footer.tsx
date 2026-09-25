import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  WhatsappLogo,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  NavigationArrow,
  InstagramLogo,
  YoutubeLogo,
  FacebookLogo,
  TiktokLogo,
  Receipt,
} from "@phosphor-icons/react/dist/ssr";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/desakadugenep",
    icon: <InstagramLogo size={18} weight="bold" />,
    hoverClass: "hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-pink-500",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@desakadugenep",
    icon: <YoutubeLogo size={18} weight="bold" />,
    hoverClass: "hover:bg-red-600 hover:text-white hover:border-red-500",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/desakadugenep",
    icon: <FacebookLogo size={18} weight="bold" />,
    hoverClass: "hover:bg-blue-600 hover:text-white hover:border-blue-500",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@desakadugenep",
    icon: <TiktokLogo size={18} weight="bold" />,
    hoverClass: "hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/6281289217721?text=Halo%20Admin%20Desa%20Kadugenep",
    icon: <WhatsappLogo size={18} weight="bold" />,
    hoverClass: "hover:bg-emerald-600 hover:text-white hover:border-emerald-500",
  },
];

export function Footer() {
  return (
    <footer className="bg-[#051120] text-slate-300 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {/* ISO Standardized 3-Column Composite Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* Col 1 (4 cols): Identitas Resmi & Kontak & Media Sosial */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-12 shrink-0">
                <Image
                  src="/images/logo-serang.png"
                  alt="Lambang Kabupaten Serang"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white tracking-tight leading-snug">
                  Pemerintah Desa Kadugenep
                </h3>
                <p className="text-[11px] text-sky-400 font-medium">
                  Kecamatan Petir · Kabupaten Serang · Banten 42172
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Desa Kecil Seribu Mesin. Sentra industri kreatif kerajinan konveksi tas mandiri terbesar di Banten. Melayani warga dengan dedikasi, transparansi, dan digitalisasi.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300 pt-1 border-t border-slate-800/70">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-sky-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">Jl. Raya Petir - Serang Km. 3, Kadugenep, Serang 42172</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-sky-400 shrink-0" />
                <span className="text-[11px]">(0254) 849-2101</span>
              </div>
              <div className="flex items-center gap-2">
                <WhatsappLogo size={15} className="text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/6281289217721"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] hover:text-sky-400 transition-colors"
                >
                  0812-8921-7721 (Layanan Warga)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <EnvelopeSimple size={15} className="text-sky-400 shrink-0" />
                <span className="text-[11px]">kantor@kadugenep.desa.id</span>
              </div>
            </div>

            {/* Media Sosial Resmi Compact Pill Badges */}
            <div className="pt-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Media Sosial Resmi:
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {SOCIAL_LINKS.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={soc.name}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold transition-all duration-200 shadow-sm ${soc.hoverClass}`}
                  >
                    {soc.icon}
                    <span className="text-[11px]">{soc.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2 (4 cols): Jam Operasional, Layanan, & Keamanan */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-2.5">
                <Clock size={15} className="text-sky-400" />
                <span>Jam Layanan Kantor Desa</span>
              </h4>
              <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between items-center text-slate-300 text-[11px]">
                  <span className="font-semibold text-white">Senin - Kamis</span>
                  <span>08:00 - 15:30 WIB</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 text-[11px]">
                  <span className="font-semibold text-white">Jumat</span>
                  <span>08:00 - 11:30 & 13:30 - 15:30</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 text-[11px]">
                  <span>Sabtu - Minggu</span>
                  <span className="text-amber-400 font-medium">Layanan Online 24 Jam</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Tautan Layanan Utama
              </h4>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px]">
                <Link href="/layanan" className="hover:text-sky-400 transition-colors flex items-center justify-between group">
                  <span>Permohonan Surat</span>
                  <ArrowUpRight size={12} className="text-slate-500 group-hover:text-sky-400" />
                </Link>
                <Link href="/#apbdes" className="hover:text-sky-400 transition-colors flex items-center justify-between group">
                  <span>Transparansi APBDes</span>
                  <ArrowUpRight size={12} className="text-slate-500 group-hover:text-sky-400" />
                </Link>
                <Link href="/#potensi" className="hover:text-sky-400 transition-colors flex items-center justify-between group">
                  <span>Sentra Tas UMKM</span>
                  <ArrowUpRight size={12} className="text-slate-500 group-hover:text-sky-400" />
                </Link>
                <Link href="/#berita" className="hover:text-sky-400 transition-colors flex items-center justify-between group">
                  <span>Warta Desa</span>
                  <ArrowUpRight size={12} className="text-slate-500 group-hover:text-sky-400" />
                </Link>
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 font-semibold flex items-center justify-between col-span-2 pt-0.5">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    Portal Administrator Desa
                  </span>
                  <ArrowUpRight size={12} />
                </Link>
                <Link href="/invoice" className="text-sky-400 hover:text-sky-300 font-semibold flex items-center justify-between col-span-2 pt-0.5">
                  <span className="flex items-center gap-1.5">
                    <Receipt size={14} />
                    Invoice Pengadaan Web (Wahyu Utomo)
                  </span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>

            <div className="pt-1 border-t border-slate-800/70">
              <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Kontak Cepat & Keamanan:
              </h5>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-slate-400 text-[10px]">Bhabinkamtibmas</p>
                  <p className="text-sky-400 font-mono font-semibold">0813-8822-1919</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-slate-400 text-[10px]">Puskesmas Petir</p>
                  <p className="text-sky-400 font-mono font-semibold">0254-849-0118</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3 (4 cols): Peta Lokasi Google Maps Terpadu */}
          <div id="peta-wilayah" className="lg:col-span-4 space-y-2.5 scroll-mt-24">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Lokasi Balai Desa Kadugenep
                </h4>
              </div>
              <span className="text-[10px] text-sky-400 font-mono">Petir · Serang</span>
            </div>

            {/* Compact Embedded Google Map */}
            <div className="relative w-full h-[190px] rounded-2xl overflow-hidden border border-slate-700/80 shadow-lg bg-slate-900 group">
              <iframe
                src="https://maps.google.com/maps?q=Kantor+Desa+Kadugenep,+Petir,+Serang,+Banten&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-[1.05] brightness-[0.95]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Kantor Desa Kadugenep"
              />
              <div className="absolute bottom-2 left-2 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700 text-[10px] font-mono text-slate-200 pointer-events-none">
                6°14&apos;22.1&quot;S 106°11&apos;06.8&quot;E
              </div>
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Kantor+Desa+Kadugenep+Kecamatan+Petir+Kabupaten+Serang+Banten"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all shadow-md"
              >
                <NavigationArrow size={14} weight="bold" />
                <span>Petunjuk Arah (Maps)</span>
              </a>
              <a
                href="https://wa.me/6281289217721?text=Halo%20Pemerintah%20Desa%20Kadugenep,%20saya%20ingin%20menanyakan%20rute%20lokasi%20kantor%20desa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 transition-all"
                title="Tanya Rute via WhatsApp"
              >
                <WhatsappLogo size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & ISO Compliance Row */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="text-[11px] text-center sm:text-left">
            © {new Date().getFullYear()} Pemerintah Desa Kadugenep, Kec. Petir, Kab. Serang. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-sky-400 font-semibold">Sepi Ing Pamrih Rame Ing Gawe</span>
            <span>•</span>
            <span className="text-slate-400">Kabupaten Serang, Banten</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
