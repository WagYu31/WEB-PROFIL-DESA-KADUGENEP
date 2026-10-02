"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  WhatsappLogo,
  ShareNetwork,
  DownloadSimple,
  Copy,
  Check,
  X,
  Chats,
  DeviceMobile,
  ArrowSquareOut,
  Sparkle,
  Info,
} from "@phosphor-icons/react";
import type { Article } from "@/lib/articles";

interface ArticleShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article;
  shareUrl: string;
}

export function ArticleShareModal({
  isOpen,
  onClose,
  article,
  shareUrl,
}: ArticleShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [statusSharedNotice, setStatusSharedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const imageUrl = article.image || "/images/hero-kadugenep.jpg";
  const formattedCaption = `*${article.title}*\n\n${article.summary}\n\nBaca warta resmi selengkapnya di Desa Kadugenep:\n${shareUrl}`;

  // Copy full caption + link
  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(formattedCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Gagal menyalin:", err);
    }
  };

  // Download high-res article photo
  const handleDownloadImage = async () => {
    setDownloading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${article.slug || "warta-desa-kadugenep"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Gagal unduh gambar:", err);
      // Fallback
      window.open(imageUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  // Share to WhatsApp Status (with Photo & Caption)
  const handleShareToWAStatus = async () => {
    setStatusSharedNotice(null);

    // If mobile browser supports Web Share with File
    if (typeof navigator !== "undefined" && navigator.canShare) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `${article.slug || "berita"}.jpg`, {
          type: blob.type || "image/jpeg",
        });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: article.title,
            text: formattedCaption,
            files: [file],
          });
          onClose();
          return;
        }
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") {
          return;
        }
        console.warn("Share file gagal atau dibatalkan, beralih ke fallback desktop:", err);
      }
    }

    // Desktop / unsupported browser fallback:
    // 1. Download image automatically
    await handleDownloadImage();
    // 2. Copy caption to clipboard
    try {
      await navigator.clipboard.writeText(formattedCaption);
    } catch {}

    setStatusSharedNotice(
      "Foto warta berhasil diunduh dan teks caption telah disalin! Tinggal buka WhatsApp -> Tambah Status Foto -> Tempel (Paste) caption."
    );
  };

  // Direct WhatsApp chat / message share
  const handleShareWAChat = () => {
    const textEncoded = encodeURIComponent(formattedCaption);
    const waUrl = `https://api.whatsapp.com/send?text=${textEncoded}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <WhatsappLogo size={18} weight="fill" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                Bagikan Warta ke WhatsApp
              </h3>
              <p className="text-[11px] text-slate-500">
                Pilih format berbagi dengan foto penuh atau chat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700">
          {/* Article Live Preview Card */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-3 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300/80">
                <Image
                  src={imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  unoptimized={Boolean(imageUrl.startsWith("/uploads/") || imageUrl.startsWith("data:"))}
                />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-700 text-emerald-50">
                  {article.category}
                </span>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate font-mono">
                  {shareUrl.replace(/^https?:\/\//, "")}
                </p>
              </div>
            </div>
          </div>

          {/* Fallback Notice for Status WA if triggered */}
          {statusSharedNotice && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2 animate-in fade-in slide-in-from-top-1">
              <div className="flex items-start gap-2">
                <Sparkle size={16} weight="fill" className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-emerald-950">Foto Berita Siap Dipasang di Status!</p>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    {statusSharedNotice}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://web.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <ArrowSquareOut size={14} />
                  <span>Buka WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyCaption}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100/50 transition-colors"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copied ? "Caption Tersalin!" : "Salin Ulang Caption"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Action Cards */}
          <div className="space-y-3">
            {/* 1. Status WhatsApp (Foto + Teks) */}
            <div className="p-4 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/40 hover:bg-emerald-50/70 transition-all space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <DeviceMobile size={16} weight="bold" className="text-emerald-700" />
                    <h5 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      1. Status WhatsApp (Foto + Teks)
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Menampilkan <strong>foto liputan sebagai status</strong> lengkap dengan tulisan judul & tautan baca di bagian bawah foto.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleShareToWAStatus}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <WhatsappLogo size={18} weight="fill" />
                <span>Bagikan ke Status WhatsApp (Foto + Teks)</span>
              </button>
            </div>

            {/* 2. Kirim ke Chat / Grup WhatsApp */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition-all space-y-2.5">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Chats size={16} weight="bold" className="text-sky-700" />
                  <h5 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                    2. Kirim ke Chat / Grup WhatsApp
                  </h5>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Kirim pesan warta langsung ke nomor pribadi, grup warga desa, atau obrolan keluarga dengan pratinjau kartu gambar otomatis.
                </p>
              </div>

              <button
                type="button"
                onClick={handleShareWAChat}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <Chats size={16} weight="fill" />
                <span>Buka Chat WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Secondary Quick Utilities: Unduh Foto & Salin Link */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={downloading}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200/80"
            >
              <DownloadSimple size={15} />
              <span>{downloading ? "Mengunduh..." : "Unduh Foto"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyCaption}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200/80"
            >
              {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
              <span>{copied ? "Tersalin!" : "Salin Teks & Link"}</span>
            </button>
          </div>

          {/* Helpful Tips */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] text-slate-500">
            <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <p>
              <strong>Tips Status WA:</strong> Jika menggunakan WhatsApp Web di laptop/PC, pilih <em>&ldquo;Status WhatsApp (Foto + Teks)&rdquo;</em> untuk langsung mengunduh gambar dan menyalin teks judul agar bisa diposting ke status foto.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
