"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarBlank,
  User,
  Eye,
  WhatsappLogo,
  ShareNetwork,
  ArrowRight,
  Sparkle,
  YoutubeLogo,
  PlayCircle,
  ImageSquare,
  ArrowSquareOut,
  VideoCamera,
} from "@phosphor-icons/react";
import { useVillageStore } from "@/lib/data-store";
import { formatDateID, getYouTubeEmbedUrl, isYouTubeUrl, isVideoFile, cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticleDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const { articles } = useVillageStore();

  const article = articles.find((a) => a.slug === slug);
  const relatedArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);

  const [activeMedia, setActiveMedia] = useState<"photo" | "video">("photo");
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  if (!article) {
    notFound();
  }

  const isYouTube = isYouTubeUrl(article.videoUrl);
  const isLocalVideo = isVideoFile(article.videoUrl);
  const hasVideo = isYouTube || isLocalVideo;
  const embedUrl = isYouTube ? getYouTubeEmbedUrl(article.videoUrl, isAutoPlaying) : null;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShareWA = () => {
    const text = encodeURIComponent(`*${article.title}*\nBaca selengkapnya di Warta Desa Kadugenep: ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Tautan artikel berhasil disalin!");
  };

  return (
    <article className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        href="/#berita"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition-colors mb-6 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Kembali ke Warta Desa</span>
      </Link>

      {/* Category and Date */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#064e3b] text-emerald-100">
          {article.category}
        </span>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CalendarBlank size={14} />
          <span>{formatDateID(article.date)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Eye size={14} />
          <span>{article.views} pembaca</span>
        </div>
        {hasVideo && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            {isYouTube ? (
              <YoutubeLogo size={14} weight="fill" className="text-rose-600" />
            ) : (
              <VideoCamera size={14} weight="fill" className="text-rose-600" />
            )}
            <span>{isYouTube ? "Ada Video YouTube" : "Ada Video Dokumentasi"}</span>
          </span>
        )}
      </div>

      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
        {article.title}
      </h1>

      {/* Author and Share */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
            <User size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">{article.author}</p>
            <p className="text-[11px] text-slate-500">Humas Pemerintah Desa Kadugenep</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareWA}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <WhatsappLogo size={16} weight="fill" />
            <span>Bagikan</span>
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
          >
            <ShareNetwork size={16} />
            <span>Salin Link</span>
          </button>
        </div>
      </div>

      {/* Media Selector Tabs (If video is available) */}
      {hasVideo && (
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80 shadow-xs">
            <button
              type="button"
              onClick={() => {
                setActiveMedia("photo");
                setIsAutoPlaying(false);
              }}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                activeMedia === "photo"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <ImageSquare size={16} weight={activeMedia === "photo" ? "fill" : "regular"} />
              <span>Foto Liputan</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveMedia("video");
                setIsAutoPlaying(true);
              }}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                activeMedia === "video"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-rose-700 hover:bg-rose-50"
              )}
            >
              {isYouTube ? (
                <YoutubeLogo size={17} weight="fill" />
              ) : (
                <VideoCamera size={17} weight="fill" />
              )}
              <span>Video Dokumentasi</span>
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            </button>
          </div>

          {isYouTube ? (
            <a
              href={article.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-rose-700 transition-colors"
            >
              <span>Buka di YouTube</span>
              <ArrowSquareOut size={13} />
            </a>
          ) : (
            <a
              href={article.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-rose-700 transition-colors"
            >
              <span>Buka Video Asli</span>
              <ArrowSquareOut size={13} />
            </a>
          )}
        </div>
      )}

      {/* Hero Media Display (Toggle between Photo and Video) */}
      {activeMedia === "video" && hasVideo ? (
        <div className="mb-8 space-y-2">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-black">
            {isYouTube && embedUrl ? (
              <iframe
                src={embedUrl}
                title={article.videoTitle || article.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                src={article.videoUrl}
                controls
                autoPlay={isAutoPlaying}
                playsInline
                poster={article.image}
                className="w-full h-full object-contain bg-black"
              >
                Browser Anda tidak mendukung pemutar video HTML5.
              </video>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 px-2">
            <p className="flex items-center gap-1.5 font-medium">
              <VideoCamera size={15} className="text-rose-600" />
              <span>{article.videoTitle || "Dokumentasi Resmi Desa Kadugenep"}</span>
            </p>
            <button
              type="button"
              onClick={() => setActiveMedia("photo")}
              className="text-emerald-700 hover:underline font-semibold text-[11px] cursor-pointer"
            >
              Kembali ke Foto
            </button>
          </div>
        </div>
      ) : (
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-slate-200 shadow-md group">
          <Image
            src={article.image || "/images/hero-kadugenep.jpg"}
            alt={article.title}
            fill
            priority
            unoptimized={article.image?.startsWith("/uploads/") || article.image?.startsWith("data:")}
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
          {hasVideo && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center p-4">
              <button
                type="button"
                onClick={() => {
                  setActiveMedia("video");
                  setIsAutoPlaying(true);
                }}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/95 hover:bg-white text-slate-900 shadow-2xl backdrop-blur-md font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/80"
              >
                <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg">
                  <PlayCircle size={24} weight="fill" />
                </div>
                <div className="text-left">
                  <p className="font-extrabold text-slate-900 leading-tight">Putar Video Dokumentasi</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Tonton langsung di web tanpa berpindah halaman</p>
                </div>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Content Body */}
      <div className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed space-y-4 pb-12 border-b border-slate-200">
        <p className="font-semibold text-lg text-slate-900 leading-relaxed">
          {article.summary}
        </p>

        {article.content.split("\n\n").map((para, idx) => (
          <p key={idx} className="whitespace-pre-line">
            {para.trim()}
          </p>
        ))}

        {/* Dedicated Embedded Video Showcase Card inside content */}
        {hasVideo && activeMedia === "photo" && (
          <div className="my-8 p-6 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-4 not-prose">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                  {isYouTube ? (
                    <YoutubeLogo size={22} weight="fill" />
                  ) : (
                    <VideoCamera size={22} weight="fill" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Liputan Video Dokumentasi</h3>
                  <p className="text-xs text-slate-400">
                    {article.videoTitle || "Tonton liputan terkait artikel ini langsung di website."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveMedia("video");
                  setIsAutoPlaying(true);
                  window.scrollTo({ top: 220, behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <PlayCircle size={18} weight="fill" />
                <span>Putar Video Sekarang</span>
              </button>
            </div>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-slate-800">
              {isYouTube && embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={article.videoTitle || article.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={article.videoUrl}
                  controls
                  playsInline
                  poster={article.image}
                  className="w-full h-full object-contain bg-black"
                >
                  Browser Anda tidak mendukung pemutar video HTML5.
                </video>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Related News Section */}
      <section className="pt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkle size={20} className="text-emerald-700" />
            <span>Warta Lainnya dari Kadugenep</span>
          </h2>
          <Link href="/#berita" className="text-xs font-bold text-emerald-800 hover:text-emerald-700 flex items-center gap-1">
            <span>Lihat Semua</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.id}
              href={`/berita/${rel.slug}`}
              className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-700/40 hover:shadow-md transition-all space-y-2.5"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src={rel.image || "/images/hero-kadugenep.jpg"}
                  alt={rel.title}
                  fill
                  sizes="300px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                {rel.videoUrl && (
                  <span className="absolute bottom-2 right-2 p-1 rounded-md bg-black/70 backdrop-blur-sm text-rose-400">
                    <YoutubeLogo size={14} weight="fill" />
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">{rel.category}</span>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 line-clamp-2 leading-snug">
                {rel.title}
              </h4>
              <p className="text-[11px] text-slate-400">{formatDateID(rel.date)}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
