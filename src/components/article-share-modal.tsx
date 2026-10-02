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
  LinkSimple,
  Cards,
  ImageSquare,
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
  const [copiedLinkOnly, setCopiedLinkOnly] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const imageUrl = article.image || "/images/hero-kadugenep.jpg";
  const cleanLink = shareUrl;
  const formattedChatText = `*${article.title}*\n\n${article.summary}\n\nBaca warta resmi selengkapnya di Desa Kadugenep:\n${cleanLink}`;

  // 1. Share ONLY the clean link to WhatsApp to get the Floating Link Card (Gambar 3)
  const handleShareLinkCardToWA = () => {
    setStatusNotice(
      "Membuka WhatsApp... Pilih 'Status saya', lalu tunggu 1-2 detik hingga kartu gambar warta otomatis muncul di tengah layar sebelum menekan tombol Kirim."
    );
    const textEncoded = encodeURIComponent(cleanLink);
    const waUrl = `https://api.whatsapp.com/send?text=${textEncoded}`;
    window.open(waUrl, "_blank");
  };

  // Copy Clean Link Only (for pasting into WhatsApp Status to trigger Gambar 3)
  const handleCopyCleanLink = async () => {
    try {
      await navigator.clipboard.writeText(cleanLink);
      setCopiedLinkOnly(true);
      setStatusNotice(
        "Tautan bersih berhasil disalin! Buka Status WhatsApp -> Tempel (Paste) -> Tunggu 1 detik sampai kartu gambar warta otomatis muncul di tengah layar -> Kirim!"
      );
      setTimeout(() => setCopiedLinkOnly(false), 3000);
    } catch (err) {
      console.error("Gagal menyalin link:", err);
    }
  };

  // 2. Share Fullscreen Photo + Caption (Gambar 2)
  const handleShareFullscreenPhoto = async () => {
    setStatusNotice(null);

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
            text: formattedChatText,
            files: [file],
          });
          onClose();
          return;
        }
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") {
          return;
        }
        console.warn("Share file gagal atau dibatalkan:", err);
      }
    }

    // Fallback: download image + copy caption
    await handleDownloadImage();
    try {
      await navigator.clipboard.writeText(formattedChatText);
    } catch {}

    setStatusNotice(
      "Foto warta berhasil diunduh dan teks caption telah disalin! Tinggal buka WhatsApp -> Tambah Status Foto -> Pilih foto yang baru diunduh -> Tempel caption."
    );
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
      window.open(imageUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  // Direct WhatsApp chat / message share
  const handleShareWAChat = () => {
    const textEncoded = encodeURIComponent(formattedChatText);
    const waUrl = `https://api.whatsapp.com/send?text=${textEncoded}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <WhatsappLogo size={18} weight="fill" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                Pilih Tampilan Status WhatsApp
              </h3>
              <p className="text-[11px] text-slate-500">
                Pilih model kartu tautan melayang atau foto satu layar penuh
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
                <p className="text-[11px] text-emerald-700 font-semibold truncate font-mono">
                  {cleanLink.replace(/^https?:\/\//, "")}
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Action Notice / Guide */}
          {statusNotice && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs space-y-2 animate-in fade-in slide-in-from-top-1">
              <div className="flex items-start gap-2">
                <Sparkle size={17} weight="fill" className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-emerald-950">Petunjuk Status WhatsApp:</p>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    {statusNotice}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleShareLinkCardToWA}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <WhatsappLogo size={14} weight="fill" />
                  <span>Buka WhatsApp Sekarang</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyCleanLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100/50 transition-colors"
                >
                  {copiedLinkOnly ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copiedLinkOnly ? "Link Disalin!" : "Salin Ulang Link"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Share Format Options */}
          <div className="space-y-3.5">
            {/* OPTION 1 (RECOMMENDED): Kartu Tautan Melayang (Gambar 3) */}
            <div className="p-4 rounded-2xl border-2 border-emerald-600 bg-emerald-50/60 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-700 text-white shadow-xs">
                      Rekomendasi
                    </span>
                    <h5 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                      <Cards size={16} weight="fill" className="text-emerald-700" />
                      <span>1. Kartu Tautan Status WA (Seperti Contoh Gambar 3)</span>
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    Menampilkan <strong>kartu pratinjau gambar warta di tengah layar status</strong> lengkap dengan judul dan tombol tautan yang bisa langsung diklik oleh pembaca status.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleShareLinkCardToWA}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  <span>Kirim Kartu ke Status WA</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyCleanLink}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-100/50 active:scale-[0.98] text-emerald-800 text-xs font-bold transition-all cursor-pointer"
                >
                  {copiedLinkOnly ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                  <span>{copiedLinkOnly ? "Link Bersih Disalin!" : "Salin Link Status"}</span>
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-white/80 border border-emerald-200/80 text-[11px] text-emerald-900 flex items-start gap-1.5">
                <Info size={15} className="text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Cara kerja:</strong> Saat WhatsApp terbuka di Status, tunggu <strong>1–2 detik</strong> sampai kartu gambar berita otomatis muncul di tengah layar sebelum menekan tombol Kirim.
                </p>
              </div>
            </div>

            {/* OPTION 2: Foto Penuh Layar (Gambar 2) */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition-all space-y-2.5">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <ImageSquare size={16} weight="bold" className="text-slate-700" />
                  <h5 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                    2. Status Foto Penuh (Seperti Contoh Gambar 2)
                  </h5>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Menampilkan foto liputan satu layar penuh sebagai status foto WhatsApp, dengan tulisan caption di bawah foto.
                </p>
              </div>

              <button
                type="button"
                onClick={handleShareFullscreenPhoto}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 active:scale-[0.99] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <DeviceMobile size={16} />
                <span>Bagikan Foto Penuh ke Status WA</span>
              </button>
            </div>

            {/* OPTION 3: Kirim ke Chat / Grup */}
            <div className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition-all space-y-2.5">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Chats size={16} weight="bold" className="text-sky-700" />
                  <h5 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                    3. Kirim ke Chat / Grup WhatsApp
                  </h5>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Kirim pesan warta langsung ke nomor pribadi, grup warga desa, atau obrolan keluarga dengan pratinjau kartu gambar otomatis.
                </p>
              </div>

              <button
                type="button"
                onClick={handleShareWAChat}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 active:scale-[0.99] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <Chats size={16} weight="fill" />
                <span>Buka Chat WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Secondary Quick Utilities: Unduh Foto & Salin Link Lengkap */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={downloading}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200/80"
            >
              <DownloadSimple size={15} />
              <span>{downloading ? "Mengunduh..." : "Unduh Foto Berita"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyCleanLink}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200/80"
            >
              <LinkSimple size={15} />
              <span>Salin Link Saja</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
