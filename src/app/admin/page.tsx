"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useVillageStore,
  type Article as ArticleType,
  type APBDesItem,
} from "@/lib/data-store";
import { formatRupiah, slugify, formatDateID, isYouTubeUrl, isVideoFile, cn } from "@/lib/utils";
import {
  Article as ArticleIcon,
  GearSix,
  Plus,
  Trash,
  PencilSimple,
  ShieldCheck,
  CheckCircle,
  ArrowSquareOut,
  IdentificationCard,
  FileText,
  WhatsappLogo,
  DownloadSimple,
  ArrowCounterClockwise,
  Users,
  House,
  SignOut,
  LockKey,
  Eye,
  EyeSlash,
  Key,
  YoutubeLogo,
  VideoCamera,
  UploadSimple,
  ImageSquare,
  FilmStrip,
  Spinner,
  Sparkle,
  Scroll,
  ShieldStar,
  TreeEvergreen,
} from "@phosphor-icons/react";

export default function AdminPage() {
  const {
    isLoaded,
    profile,
    articles,
    apbdes,
    serviceRequests,
    aspirations,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    saveProfile,
    saveArticles,
    saveApbdes,
    saveServiceRequests,
    saveAspirations,
    resetToDefault,
  } = useVillageStore();

  const [activeTab, setActiveTab] = useState<"berita" | "profil" | "apbdes" | "layanan" | "aspirasi" | "backup">("berita");

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Admin Authentication State
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(false);

    setTimeout(() => {
      const trimmed = passwordInput.trim();
      if (trimmed === "admin123" || trimmed === "kadugenep2026" || trimmed === "admin") {
        loginAdmin();
        showToast("Berhasil masuk ke Dashboard Administrator!");
      } else {
        setLoginError(true);
      }
      setIsLoggingIn(false);
    }, 300);
  };

  const handleQuickLogin = () => {
    setPasswordInput("admin123");
    loginAdmin();
    showToast("Berhasil masuk ke Dashboard Administrator!");
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar (Log Out) dari Sesi Administrator?")) {
      logoutAdmin();
      setPasswordInput("");
      showToast("Anda telah keluar dari sesi Administrator.");
    }
  };

  // Article Modal Form State
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: "",
    category: "Pemerintahan" as ArticleType["category"],
    author: "Admin Desa Kadugenep",
    summary: "",
    content: "",
    image: "/images/hero-kadugenep.jpg",
    videoUrl: "",
    videoTitle: "",
  });

  // Profile Form State
  const [profileForm, setProfileForm] = useState(profile);

  // Sync profileForm when profile changes safely
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProfileForm(profile);
    }, 0);
    return () => clearTimeout(timer);
  }, [profile]);

  // APBDes Modal / Form State
  const [apbModalOpen, setApbModalOpen] = useState(false);
  const [editingApbId, setEditingApbId] = useState<string | null>(null);
  const [apbForm, setApbForm] = useState<Omit<APBDesItem, "id">>({
    title: "",
    category: "Belanja",
    budget: 100000000,
    realization: 80000000,
    percentage: 80,
  });

  const handleOpenCreateApb = () => {
    setEditingApbId(null);
    setApbForm({
      title: "",
      category: "Belanja",
      budget: 100000000,
      realization: 80000000,
      percentage: 80,
    });
    setApbModalOpen(true);
  };

  const handleOpenEditApb = (item: APBDesItem) => {
    setEditingApbId(item.id);
    setApbForm({
      title: item.title,
      category: item.category,
      budget: item.budget,
      realization: item.realization,
      percentage: item.percentage,
    });
    setApbModalOpen(true);
  };

  // Media source state for article form
  const [imageSourceTab, setImageSourceTab] = useState<"upload" | "preset">("upload");
  const [videoSourceTab, setVideoSourceTab] = useState<"upload" | "youtube" | "none">("upload");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  const handleFileUpload = async (file: File, type: "image" | "video") => {
    const formData = new FormData();
    formData.append("file", file);

    if (type === "image") {
      setIsUploadingImage(true);
    } else {
      setIsUploadingVideo(true);
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengunggah file.");
      }
      if (type === "image") {
        setArticleForm((prev) => ({ ...prev, image: data.url }));
        showToast("Foto berhasil diunggah dari galeri!");
      } else {
        setArticleForm((prev) => ({
          ...prev,
          videoUrl: data.url,
          videoTitle: prev.videoTitle || file.name.replace(/\.[^/.]+$/, ""),
        }));
        showToast("Video berhasil diunggah dari galeri!");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("Gagal mengunggah: " + (err.message || "Terjadi kesalahan"));
    } finally {
      if (type === "image") setIsUploadingImage(false);
      else setIsUploadingVideo(false);
    }
  };

  // Handle Article Create / Edit
  const handleOpenCreateArticle = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: "",
      category: "Ekonomi & UMKM",
      author: "Admin Desa Kadugenep",
      summary: "",
      content: "",
      image: "/images/kerajinan-tas.jpg",
      videoUrl: "",
      videoTitle: "",
    });
    setImageSourceTab("upload");
    setVideoSourceTab("upload");
    setArticleModalOpen(true);
  };

  const handleOpenEditArticle = (art: ArticleType) => {
    setEditingArticleId(art.id);
    setArticleForm({
      title: art.title,
      category: art.category,
      author: art.author,
      summary: art.summary,
      content: art.content,
      image: art.image,
      videoUrl: art.videoUrl || "",
      videoTitle: art.videoTitle || "",
    });
    setImageSourceTab(art.image.startsWith("/uploads/") ? "upload" : "preset");
    if (!art.videoUrl) {
      setVideoSourceTab("none");
    } else if (isYouTubeUrl(art.videoUrl)) {
      setVideoSourceTab("youtube");
    } else {
      setVideoSourceTab("upload");
    }
    setArticleModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.summary) return;

    if (editingArticleId) {
      // Edit existing
      const updated = articles.map((a) =>
        a.id === editingArticleId
          ? {
              ...a,
              title: articleForm.title,
              slug: slugify(articleForm.title),
              category: articleForm.category,
              author: articleForm.author,
              summary: articleForm.summary,
              content: articleForm.content,
              image: articleForm.image,
              videoUrl: articleForm.videoUrl?.trim() || undefined,
              videoTitle: articleForm.videoTitle?.trim() || undefined,
            }
          : a
      );
      saveArticles(updated);
      showToast("Berita berhasil diperbarui!");
    } else {
      // Add new
      const newArticle: ArticleType = {
        id: `art-${Date.now()}`,
        slug: slugify(articleForm.title),
        title: articleForm.title,
        category: articleForm.category,
        author: articleForm.author,
        summary: articleForm.summary,
        content: articleForm.content,
        date: new Date().toISOString().split("T")[0],
        image: articleForm.image,
        videoUrl: articleForm.videoUrl?.trim() || undefined,
        videoTitle: articleForm.videoTitle?.trim() || undefined,
        views: 1,
        featured: false,
      };
      saveArticles([newArticle, ...articles]);
      showToast("Berita baru berhasil ditambahkan!");
    }

    setArticleModalOpen(false);
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel warta ini?")) {
      saveArticles(articles.filter((a) => a.id !== id));
      showToast("Artikel berhasil dihapus.");
    }
  };

  // Handle Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(profileForm);
    showToast("Profil dan Data Desa Kadugenep berhasil diperbarui!");
  };

  // Handle APBDes Save
  const handleSaveApbItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apbForm.title.trim()) return;

    const pct = apbForm.budget > 0 ? Math.round((apbForm.realization / apbForm.budget) * 100) : 0;

    if (editingApbId) {
      const updated = apbdes.map((item) =>
        item.id === editingApbId
          ? {
              ...item,
              title: apbForm.title.trim(),
              category: apbForm.category,
              budget: apbForm.budget,
              realization: apbForm.realization,
              percentage: isNaN(pct) ? 0 : pct,
            }
          : item
      );
      saveApbdes(updated);
      showToast("Pos APBDes berhasil diperbarui!");
    } else {
      const newItem: APBDesItem = {
        id: `apb-${Date.now()}`,
        title: apbForm.title.trim(),
        category: apbForm.category,
        budget: apbForm.budget,
        realization: apbForm.realization,
        percentage: isNaN(pct) ? 0 : pct,
      };
      saveApbdes([...apbdes, newItem]);
      showToast("Pos APBDes baru berhasil ditambahkan!");
    }

    setApbModalOpen(false);
  };

  const handleDeleteApbItem = (id: string) => {
    if (confirm("Hapus pos anggaran ini?")) {
      saveApbdes(apbdes.filter((item) => item.id !== id));
      showToast("Pos APBDes berhasil dihapus.");
    }
  };

  // Handle Service Request status update
  const handleUpdateServiceStatus = (id: string, newStatus: "Menunggu" | "Diproses" | "Selesai") => {
    const updated = serviceRequests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    saveServiceRequests(updated);
    showToast(`Status permohonan diubah menjadi ${newStatus}.`);
  };

  // Handle Aspiration status
  const handleUpdateAspirationStatus = (id: string) => {
    const updated = aspirations.map((asp) =>
      asp.id === id ? { ...asp, status: "Ditanggapi" as const } : asp
    );
    saveAspirations(updated);
    showToast("Aspirasi warga ditandai sebagai Ditanggapi.");
  };

  // Export JSON
  const handleExportData = () => {
    const fullBackup = {
      profile,
      articles,
      apbdes,
      serviceRequests,
      aspirations,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-desa-kadugenep-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    showToast("File backup data desa berhasil diunduh.");
  };

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f4f6f2] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#064e3b] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-700">Memuat Sistem Desa Kadugenep...</p>
        </div>
      </div>
    );
  }

  // Admin Login Gateway - Tema Luhur Sunda & Banten Wiwitan (Taste-Skill Standard)
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#07130e] text-amber-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-amber-500 selection:text-slate-950 font-sans">
        {/* Atmospheric Cultural Backdrop with Banten Heritage Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-kadugenep.jpg"
            alt="Alam Desa Kadugenep Petir"
            fill
            priority
            className="object-cover object-center opacity-20 scale-105 filter brightness-75"
          />
          {/* Deep Forest Jade & Obsidian Radial Gradients */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050e0a] via-[#071711]/95 to-[#0b241b]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(217,119,6,0.18),rgba(6,78,59,0.3)_60%,transparent)]" />
          
          {/* Subtle Traditional Sundanese Anyaman & Batik Banten Weave Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>

        {/* Ambient Warm Golden & Emerald Orbs */}
        <div className="absolute top-1/6 -left-28 w-[450px] h-[450px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/6 -right-28 w-[450px] h-[450px] rounded-full bg-emerald-500/15 blur-[150px] pointer-events-none" />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-[#064e3b] text-amber-100 shadow-2xl flex items-center gap-3 border border-amber-400/40 animate-fade-in backdrop-blur-md">
            <CheckCircle size={22} weight="fill" className="text-amber-400" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}

        <div className="w-full max-w-4xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Sunda Cultural Heritage & Civic Identity (Large Screens) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-between space-y-6 p-8 rounded-3xl bg-[#0a1c15]/80 border border-amber-500/20 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Top Ornamental Ribbon */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

            <div className="space-y-4">
              {/* Civic Tag & Aksara Sunda */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold tracking-wide">
                  <Sparkle size={13} weight="fill" className="text-amber-400" />
                  <span>Tatapraja Karahayuan · ᮓᮦᮞ ᮊᮓᮥᮌᮨᮔᮨᮕ᮪</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-amber-400/70 uppercase">
                  v2.6 Digital
                </span>
              </div>

              {/* Official Seal & Title */}
              <div className="flex items-center gap-4 pt-1">
                <div className="relative w-14 h-16 shrink-0 p-1.5 rounded-2xl bg-amber-950/40 border border-amber-400/30 shadow-lg backdrop-blur-md">
                  <Image
                    src="/images/logo-serang.png"
                    alt="Lambang Kabupaten Serang"
                    fill
                    priority
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-amber-400/80 font-bold">
                    Pamaréntah Désa
                  </p>
                  <h2 className="text-2xl font-serif font-black tracking-tight text-white drop-shadow-sm">
                    Kadugenep Petir
                  </h2>
                  <p className="text-xs font-medium text-emerald-300/90">
                    Kabupatén Sérang · Propinsi Banten
                  </p>
                </div>
              </div>

              {/* Falsafah Sunda Card */}
              <div className="p-3.5 rounded-2xl bg-[#06140f]/90 border border-amber-500/20 space-y-1.5">
                <p className="text-[11px] font-serif italic text-amber-200/90">
                  &ldquo;Silih Asih, Silih Asah, Silih Asuh — Gemah Ripah Loh Jinawi.&rdquo;
                </p>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Pusat tatakelola administrasi mandiri warga, warta publikasi kabuyutan desa, transparansi anggaran, sarta kamajuan sentra industri tas.
                </p>
              </div>
            </div>

            {/* Cultural Pillars List */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#071812]/70 border border-emerald-900/60 hover:border-amber-500/30 transition-all">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldStar size={18} weight="fill" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-amber-100">Pangaping Kaamanan Digital</p>
                  <p className="text-[10px] text-slate-400">Aksés administrator terenkripsi terisolasi</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#071812]/70 border border-emerald-900/60 hover:border-amber-500/30 transition-all">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <Scroll size={18} weight="fill" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-amber-100">Palayanan Mandiri Warga</p>
                  <p className="text-[10px] text-slate-400">Tindak lanjut permohonan surat & warta kampung</p>
                </div>
              </div>
            </div>

            {/* Footer Traditional Wisdom */}
            <div className="pt-3 border-t border-amber-500/15 flex items-center justify-between text-[11px] text-amber-300/70">
              <span>ᮊᮎᮙᮒᮔ᮪ ᮕᮨᮒᮤᮁ · Sérang</span>
              <span className="text-amber-400 font-serif italic">Soméah Hadé ka Sémah</span>
            </div>
          </div>

          {/* Right Column: Sundanese Gateway Card (Form) */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto space-y-5">
            
            {/* Mobile Header (Sunda Theme) */}
            <div className="lg:hidden text-center space-y-2.5">
              <div className="inline-flex p-3 rounded-3xl bg-[#0a1c15] border border-amber-500/30 shadow-2xl backdrop-blur-md">
                <div className="relative w-12 h-14">
                  <Image
                    src="/images/logo-serang.png"
                    alt="Lambang Kabupaten Serang"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950/60 text-amber-300 border border-amber-500/30 mb-1.5">
                  <Sparkle size={12} weight="fill" className="text-amber-400" />
                  <span>Lawang Pangaping Administrator</span>
                </div>
                <h1 className="text-2xl font-serif font-black tracking-tight text-white">
                  Désa Kadugenep
                </h1>
                <p className="text-xs text-amber-200/70 font-medium">
                  Kacamatan Petir · Kabupatén Sérang
                </p>
              </div>
            </div>

            {/* Main Login Card - Sunda Royal Jade & Gold Style */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0a1c15]/95 border border-amber-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl space-y-6 relative overflow-hidden">
              {/* Golden Top Accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <Key size={18} weight="fill" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-white tracking-tight">
                      Lawang Asup Admin
                    </h2>
                    <p className="text-[10px] text-amber-300/80 font-mono">
                      ᮕᮧᮁᮒᮜ᮪ ᮃᮓ᮪ᮙᮤᮔᮤᮞ᮪ᮒᮢᮞᮤ · Otentikasi Resmi
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 pt-1">
                  Lebetkeun kecap sandi resmi pikeun muka sistem pangleler & administrasi désa.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-amber-100 flex items-center gap-1.5">
                      <span>Kecap Sandi Aksés</span>
                      <span className="text-[10px] font-normal text-slate-400">(Kata Sandi)</span>
                    </label>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400/60 group-focus-within:text-amber-400 transition-colors">
                      <LockKey size={18} weight="bold" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        if (loginError) setLoginError(false);
                      }}
                      placeholder="Lebetkeun kecap sandi..."
                      className="w-full pl-10 pr-11 py-3.5 rounded-2xl bg-[#06120e] border border-amber-500/30 text-sm font-semibold text-amber-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                      title={showPassword ? "Sembunyikan sandi" : "Lihat sandi"}
                    >
                      {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {loginError && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-xs text-rose-200 flex items-center justify-between">
                      <span className="font-semibold">⚠️ Sandi lepat (Sandi salah).</span>
                      <button
                        type="button"
                        onClick={handleQuickLogin}
                        className="underline font-bold text-amber-300 hover:text-white cursor-pointer text-[11px]"
                      >
                        Paké Sandi Bawaan (admin123) →
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Access Helper Bar - Sunda Style */}
                <div className="p-3.5 rounded-2xl bg-[#06120e]/90 border border-amber-500/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-slate-300 text-[11px]">
                      Sandi Bawaan: <strong className="text-amber-400 font-mono font-bold">admin123</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickLogin}
                    className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 border border-amber-400/40 text-[11px] font-bold text-amber-300 transition-all cursor-pointer active:scale-95 shadow-sm"
                  >
                    Lebet Enggal ⚡
                  </button>
                </div>

                {/* Submit Action Button - Royal Sunda Amber/Emerald Gradient */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#064e3b] via-[#047857] to-amber-600 hover:from-[#047857] hover:to-amber-500 text-amber-100 hover:text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/80 hover:shadow-amber-900/40 border border-amber-400/30 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <>
                      <Spinner size={18} className="animate-spin text-amber-300" />
                      <span>Mariksa Aksés Tatapraja...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} weight="fill" className="text-amber-300" />
                      <span>Lebet ka Dashboard Admin</span>
                    </>
                  )}
                </button>
              </form>

              {/* Navigation Back */}
              <div className="pt-3 border-t border-amber-500/15 flex items-center justify-between text-xs">
                <Link
                  href="/"
                  className="font-semibold text-amber-300/80 hover:text-amber-200 transition-colors flex items-center gap-1.5 group"
                >
                  <House size={15} className="group-hover:-translate-x-0.5 transition-transform text-amber-400" />
                  <span>Wangsul ka Beranda Web</span>
                </Link>
                <span className="text-[11px] text-slate-400 font-serif italic">
                  Kec. Petir · Banten
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f2] py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#064e3b] text-white shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle size={22} weight="fill" className="text-emerald-300" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#064e3b] text-white flex items-center justify-center font-bold text-xl shadow-md">
              <GearSix size={24} weight="duotone" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Dashboard Administrator Desa Kadugenep
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Kelola konten warta berita, profil desa seribu mesin, transparansi APBDes, dan persuratan warga.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors border border-slate-200 cursor-pointer"
            >
              <House size={16} />
              <span>Lihat Web Utama</span>
              <ArrowSquareOut size={14} />
            </Link>

            {/* Prominent Log Out Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-all border border-rose-200 shadow-xs cursor-pointer active:scale-95"
              title="Keluar dari sesi administrator"
            >
              <SignOut size={16} weight="bold" />
              <span>Keluar (Log Out)</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Berita Terbit</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{articles.length} Artikel</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Permohonan Surat</span>
            <p className="text-2xl font-black text-emerald-800 mt-1">{serviceRequests.length} Berkas</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Aspirasi Warga</span>
            <p className="text-2xl font-black text-amber-700 mt-1">{aspirations.length} Masukan</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pengrajin Tas Aktif</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{profile.stats.bagCraftsmen}+ Bengkel</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab("berita")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "berita" ? "bg-[#064e3b] text-white shadow-sm" : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            <ArticleIcon size={16} />
            <span>Kelola Berita ({articles.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("layanan")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "layanan" ? "bg-[#064e3b] text-white shadow-sm" : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            <FileText size={16} />
            <span>Permohonan Surat ({serviceRequests.filter((r) => r.status === "Menunggu").length} baru)</span>
          </button>
          <button
            onClick={() => setActiveTab("profil")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "profil" ? "bg-[#064e3b] text-white shadow-sm" : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            <Users size={16} />
            <span>Profil & Data Desa</span>
          </button>
          <button
            onClick={() => setActiveTab("apbdes")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "apbdes" ? "bg-[#064e3b] text-white shadow-sm" : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            <ShieldCheck size={16} />
            <span>Transparansi APBDes</span>
          </button>
          <button
            onClick={() => setActiveTab("aspirasi")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "aspirasi" ? "bg-[#064e3b] text-white shadow-sm" : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            <IdentificationCard size={16} />
            <span>Aspirasi Warga ({aspirations.filter((a) => a.status === "Baru").length})</span>
          </button>
          <button
            onClick={() => setActiveTab("backup")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "backup" ? "bg-[#064e3b] text-white shadow-sm" : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            <DownloadSimple size={16} />
            <span>Backup & Reset</span>
          </button>
        </div>

        {/* TAB 1: KELOLA BERITA */}
        {activeTab === "berita" && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Daftar Publikasi Warta & Berita</h2>
                <p className="text-xs text-slate-500">
                  Artikel yang ditambahkan atau diedit di sini langsung tampil di halaman depan website.
                </p>
              </div>
              <button
                onClick={handleOpenCreateArticle}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold shadow transition-all active:scale-95"
              >
                <Plus size={16} weight="bold" />
                <span>Tambah Berita Baru</span>
              </button>
            </div>

            {/* Table of articles */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Judul Artikel</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">Penulis</th>
                    <th className="py-3 px-4">Pembaca</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-sm">
                        <div className="line-clamp-2">{art.title}</div>
                        {art.videoUrl && (
                          <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            {isYouTubeUrl(art.videoUrl) ? (
                              <>
                                <YoutubeLogo size={12} weight="fill" />
                                <span>Video YouTube</span>
                              </>
                            ) : (
                              <>
                                <FilmStrip size={12} weight="fill" />
                                <span>Video Galeri</span>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {art.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">{formatDateID(art.date)}</td>
                      <td className="py-3.5 px-4">{art.author}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap">{art.views} kali</td>
                      <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEditArticle(art)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          title="Edit Berita"
                        >
                          <PencilSimple size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(art.id)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Hapus Berita"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PERMOHONAN SURAT WARGA */}
        {activeTab === "layanan" && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Daftar Permohonan Surat Mandiri Warga</h2>
              <p className="text-xs text-slate-500">
                Data yang dikirim warga dari halaman /layanan secara instan masuk ke sini untuk ditindaklanjuti.
              </p>
            </div>

            <div className="space-y-3">
              {serviceRequests.length === 0 ? (
                <p className="text-xs text-slate-400">Belum ada permohonan masuk.</p>
              ) : (
                serviceRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-600/30 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {req.id}
                        </span>
                        <span className="text-sm font-bold text-slate-900">{req.citizenName}</span>
                        <span className="text-xs text-slate-400 font-mono">(NIK: {req.nik})</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700">{req.serviceType}</p>
                      <p className="text-[11px] text-slate-500">Catatan: {req.notes}</p>
                      <p className="text-[10px] text-slate-400">Tanggal Diajukan: {req.createdAt}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/62${req.whatsapp.replace(/[^0-9]/g, "").slice(1)}?text=Halo%20Bpk/Ibu%20${encodeURIComponent(req.citizenName)},%20mengenai%20permohonan%20${encodeURIComponent(req.serviceType)}%20di%20Kantor%20Desa%20Kadugenep.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm"
                      >
                        <WhatsappLogo size={15} weight="fill" />
                        <span>Hubungi Warga</span>
                      </a>

                      <select
                        value={req.status}
                        onChange={(e) =>
                          handleUpdateServiceStatus(req.id, e.target.value as "Menunggu" | "Diproses" | "Selesai")
                        }
                        className={`text-xs font-bold rounded-xl px-3 py-1.5 border focus:outline-none ${
                          req.status === "Selesai"
                            ? "bg-green-100 text-green-900 border-green-300"
                            : req.status === "Diproses"
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : "bg-slate-200 text-slate-800 border-slate-300"
                        }`}
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: EDIT PROFIL & DATA DESA */}
        {activeTab === "profil" && (
          <form onSubmit={handleSaveProfile} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Profil & Data Administratif Desa Kadugenep</h2>
              <p className="text-xs text-slate-500">
                Ubah informasi statistik, visi misi, kontak, dan narasi sejarah desa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Desa</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Slogan / Julukan</label>
                <input
                  type="text"
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Penduduk (Jiwa)</label>
                <input
                  type="number"
                  value={profileForm.stats.population}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      stats: { ...profileForm.stats, population: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah Bengkel Pengrajin Tas</label>
                <input
                  type="number"
                  value={profileForm.stats.bagCraftsmen}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      stats: { ...profileForm.stats, bagCraftsmen: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp Pelayanan</label>
                <input
                  type="text"
                  value={profileForm.whatsapp}
                  onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Kantor Desa</label>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Visi Desa Kadugenep</label>
              <textarea
                rows={2}
                value={profileForm.vision}
                onChange={(e) => setProfileForm({ ...profileForm, vision: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Narasi Sejarah & Identitas Desa</label>
              <textarea
                rows={4}
                value={profileForm.history}
                onChange={(e) => setProfileForm({ ...profileForm, history: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#064e3b] hover:bg-[#047857] text-white font-bold text-xs shadow transition-all active:scale-95"
            >
              Simpan Perubahan Profil Desa
            </button>
          </form>
        )}

        {/* TAB 4: TRANSPARANSI APBDES */}
        {activeTab === "apbdes" && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Kelola Pos Anggaran APBDes</h2>
                <p className="text-xs text-slate-500">
                  Perbarui alokasi pagu anggaran, realisasi serapan kas, atau tambahkan pos kegiatan baru.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenCreateApb}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold shadow transition-all cursor-pointer"
              >
                <Plus size={16} weight="bold" />
                <span>Tambah Pos Anggaran</span>
              </button>
            </div>

            <div className="space-y-3">
              {apbdes.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black tracking-wider ${
                        item.category === "Pendapatan"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-sky-100 text-sky-800 border border-sky-300"
                      }`}>
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        item.percentage >= 85
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : item.percentage >= 70
                          ? "bg-sky-50 text-sky-700 border border-sky-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {item.percentage}% Realisasi
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-mono">
                      <span>Pagu: <strong className="text-slate-900">{formatRupiah(item.budget)}</strong></span>
                      <span>•</span>
                      <span>Realisasi: <strong className="text-emerald-700">{formatRupiah(item.realization)}</strong></span>
                      <span>•</span>
                      <span className="text-slate-500">Sisa Pagu: {formatRupiah(Math.max(0, item.budget - item.realization))}</span>
                    </div>

                    {/* Visual mini progress bar */}
                    <div className="w-full max-w-lg h-2 rounded-full bg-slate-100 overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.category === "Pendapatan"
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                            : item.percentage >= 85
                            ? "bg-gradient-to-r from-sky-500 to-blue-600"
                            : "bg-gradient-to-r from-amber-400 to-amber-500"
                        }`}
                        style={{ width: `${Math.min(100, item.percentage)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditApb(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all cursor-pointer active:scale-95 shadow-xs"
                      title="Edit Pos Anggaran Ini"
                    >
                      <PencilSimple size={15} weight="bold" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteApbItem(item.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer"
                      title="Hapus Pos Anggaran"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ASPIRASI WARGA */}
        {activeTab === "aspirasi" && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Laporan & Aspirasi Masuk dari Warga</h2>
              <p className="text-xs text-slate-500">
                Aspirasi warga yang disampaikan melalui formulir beranda.
              </p>
            </div>

            <div className="space-y-3">
              {aspirations.map((asp) => (
                <div key={asp.id} className="p-4 rounded-2xl border border-slate-200 space-y-2 bg-slate-50/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{asp.name}</span>
                        <span className="text-xs text-emerald-700 font-mono">({asp.contact})</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5">{asp.subject}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      asp.status === "Ditanggapi" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {asp.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100">
                    {asp.message}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Tanggal: {asp.createdAt}</span>
                    {asp.status === "Baru" && (
                      <button
                        onClick={() => handleUpdateAspirationStatus(asp.id)}
                        className="text-xs font-bold text-emerald-800 hover:underline"
                      >
                        Tandai Sudah Ditanggapi
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: BACKUP & RESET */}
        {activeTab === "backup" && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Cadangan (Backup) & Setel Ulang Data</h2>
              <p className="text-xs text-slate-500">
                Ekspor seluruh data website ke berkas JSON atau kembalikan data ke setelan bawaan awal Desa Kadugenep.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <DownloadSimple size={18} className="text-emerald-700" />
                  <span>Ekspor Data Lengkap (JSON)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Unduh seluruh artikel berita, data profil desa, APBDes, dan daftar permohonan ke satu file JSON.
                </p>
                <button
                  onClick={handleExportData}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm"
                >
                  Unduh Backup JSON
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-red-200 bg-red-50/40 space-y-3">
                <h3 className="text-sm font-bold text-red-900 flex items-center gap-2">
                  <ArrowCounterClockwise size={18} className="text-red-700" />
                  <span>Kembalikan ke Setelan Awal</span>
                </h3>
                <p className="text-xs text-red-800/80">
                  Menghapus perubahan lokal dan mengembalikan data otentik awal Desa Kadugenep.
                </p>
                <button
                  onClick={() => {
                    if (confirm("Reset seluruh data ke setelan awal Desa Kadugenep?")) {
                      resetToDefault();
                      showToast("Data berhasil di-reset ke data awal desa.");
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-xs shadow-sm cursor-pointer"
                >
                  Reset ke Data Awal
                </button>
              </div>

              {/* Sesi Administrator & Keamanan Akun */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 sm:col-span-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <SignOut size={18} className="text-rose-600" />
                  <span>Sesi Administrator & Keamanan Akun</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Akhiri sesi kerja administrator di peramban ini agar orang lain tidak dapat mengubah data desa secara bebas.
                </p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5 active:scale-95"
                >
                  <SignOut size={15} weight="bold" />
                  <span>Keluar (Log Out) Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL TAMBAH / EDIT BERITA */}
      {articleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingArticleId ? "Edit Artikel Warta" : "Tambah Berita Baru"}
              </h3>
              <button
                onClick={() => setArticleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Berita *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pengrajin Tas Kadugenep Adakan Pelatihan Jahit..."
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori *</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) =>
                      setArticleForm({
                        ...articleForm,
                        category: e.target.value as ArticleType["category"],
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700 bg-white"
                  >
                    <option value="Pemerintahan">Pemerintahan</option>
                    <option value="Ekonomi & UMKM">Ekonomi & UMKM</option>
                    <option value="Kegiatan Warga">Kegiatan Warga</option>
                    <option value="Pembangunan">Pembangunan</option>
                    <option value="Pengumuman">Pengumuman</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Penulis *</label>
                  <input
                    type="text"
                    required
                    value={articleForm.author}
                    onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              {/* PENGATURAN GAMBAR UTAMA (FOTO DARI GALERI ATAU ASET DESA) */}
              <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageSquare size={16} className="text-emerald-700" weight="fill" />
                    <span>Foto / Gambar Utama Berita *</span>
                  </label>
                  <div className="inline-flex p-0.5 rounded-lg bg-slate-200/80 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setImageSourceTab("upload")}
                      className={cn(
                        "px-2.5 py-1 rounded-md transition-all cursor-pointer",
                        imageSourceTab === "upload" ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      Upload dari Galeri
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSourceTab("preset")}
                      className={cn(
                        "px-2.5 py-1 rounded-md transition-all cursor-pointer",
                        imageSourceTab === "preset" ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      Pilih dari Aset Desa
                    </button>
                  </div>
                </div>

                {imageSourceTab === "upload" ? (
                  <div className="space-y-2">
                    <div className="relative border-2 border-dashed border-emerald-600/30 hover:border-emerald-600/60 rounded-xl p-4 transition-all text-center bg-white cursor-pointer group">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "image");
                        }}
                        disabled={isUploadingImage}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />
                      {isUploadingImage ? (
                        <div className="flex flex-col items-center justify-center py-3 gap-2">
                          <Spinner size={24} className="animate-spin text-emerald-700" />
                          <p className="text-xs font-bold text-emerald-800">Sedang mengunggah foto ke server desa...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-2 gap-1.5 pointer-events-none">
                          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <UploadSimple size={20} weight="bold" />
                          </div>
                          <p className="text-xs font-bold text-slate-800">
                            Klik atau Tarik Foto dari Galeri HP / Komputer
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Format JPG, PNG, WEBP (Bebas tanpa batasan link)
                          </p>
                        </div>
                      )}
                    </div>

                    {articleForm.image && (
                      <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                          <img
                            src={articleForm.image}
                            alt="Preview Foto Berita"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {articleForm.image.startsWith("/uploads/") ? "Foto Terunggah dari Galeri" : "Foto Aset Desa"}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">{articleForm.image}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                          Aktif
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <select
                      value={articleForm.image}
                      onChange={(e) => setArticleForm({ ...articleForm, image: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700 bg-white"
                    >
                      <option value="/images/kerajinan-tas.jpg">Kerajinan Tas (Sentra Mesin Jahit)</option>
                      <option value="/images/hero-kadugenep.jpg">Panorama Pertanian Sawah Kadugenep</option>
                      <option value="/images/balai-desa.jpg">Kantor Balai Desa Kadugenep</option>
                      <option value="/images/warga-komunitas.jpg">Musyawarah & Guyub Warga</option>
                    </select>

                    <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                        <img
                          src={articleForm.image}
                          alt="Preset Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-slate-600 font-medium truncate">Aset foto standar desa terpilih</p>
                    </div>
                  </div>
                )}
              </div>

              {/* PENGATURAN DOKUMENTASI VIDEO (UPLOAD GALERI / YOUTUBE / TANPA VIDEO) */}
              <div className="space-y-3 p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <VideoCamera size={16} className="text-rose-600" weight="fill" />
                    <span>Video Dokumentasi (Diputar Langsung di Web)</span>
                  </label>
                  <div className="inline-flex p-0.5 rounded-lg bg-rose-200/60 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setVideoSourceTab("upload")}
                      className={cn(
                        "px-2.5 py-1 rounded-md transition-all cursor-pointer",
                        videoSourceTab === "upload" ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      Upload Video Galeri
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoSourceTab("youtube")}
                      className={cn(
                        "px-2.5 py-1 rounded-md transition-all cursor-pointer",
                        videoSourceTab === "youtube" ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      Link YouTube
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoSourceTab("none");
                        setArticleForm({ ...articleForm, videoUrl: "", videoTitle: "" });
                      }}
                      className={cn(
                        "px-2.5 py-1 rounded-md transition-all cursor-pointer",
                        videoSourceTab === "none" ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      Tanpa Video
                    </button>
                  </div>
                </div>

                {videoSourceTab === "upload" && (
                  <div className="space-y-2">
                    <div className="relative border-2 border-dashed border-rose-500/30 hover:border-rose-500/60 rounded-xl p-4 transition-all text-center bg-white cursor-pointer group">
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "video");
                        }}
                        disabled={isUploadingVideo}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />
                      {isUploadingVideo ? (
                        <div className="flex flex-col items-center justify-center py-4 gap-2">
                          <Spinner size={24} className="animate-spin text-rose-600" />
                          <p className="text-xs font-bold text-rose-700">Sedang mengunggah video ke server desa... Harap tunggu sebentar.</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-2 gap-1.5 pointer-events-none">
                          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FilmStrip size={20} weight="bold" />
                          </div>
                          <p className="text-xs font-bold text-slate-800">
                            Pilih Video dari Galeri HP / Laptop
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Format MP4, WebM, MOV. Otomatis diputar langsung di web tanpa perlu link YouTube!
                          </p>
                        </div>
                      )}
                    </div>

                    {articleForm.videoUrl && isVideoFile(articleForm.videoUrl) && (
                      <div className="p-3 rounded-xl bg-white border border-rose-200 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5">
                            <CheckCircle size={15} weight="fill" className="text-emerald-600" />
                            <span>Video Galeri Siap Diputar di Web</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setArticleForm({ ...articleForm, videoUrl: "" })}
                            className="text-rose-600 hover:text-rose-700 font-semibold text-[11px] cursor-pointer"
                          >
                            Hapus Video
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden aspect-video bg-black max-h-44">
                          <video
                            src={articleForm.videoUrl}
                            controls
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{articleForm.videoUrl}</p>
                      </div>
                    )}
                  </div>
                )}

                {videoSourceTab === "youtube" && (
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="Tempel link YouTube: https://www.youtube.com/watch?v=... atau https://youtu.be/..."
                      value={articleForm.videoUrl || ""}
                      onChange={(e) => setArticleForm({ ...articleForm, videoUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-rose-600 bg-white"
                    />
                    <p className="text-[11px] text-slate-500">
                      Masukkan URL YouTube publik untuk menampilkan pemutar video YouTube di halaman berita.
                    </p>
                  </div>
                )}

                {videoSourceTab !== "none" && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Judul / Keterangan Video Liputan (Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Dokumentasi Liputan Pengrajin Tas RW 02"
                      value={articleForm.videoTitle || ""}
                      onChange={(e) => setArticleForm({ ...articleForm, videoTitle: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-rose-600 bg-white"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ringkasan Berita (Lead) *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Ringkasan singkat yang memikat pembaca..."
                  value={articleForm.summary}
                  onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Isi Lengkap Berita *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tuliskan isi berita secara terperinci..."
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setArticleModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold shadow"
                >
                  {editingArticleId ? "Simpan Perubahan" : "Terbitkan Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT / TAMBAH POS APBDES */}
      {apbModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingApbId ? "Edit Pos Anggaran APBDes" : "Tambah Pos Anggaran APBDes Baru"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editingApbId
                    ? "Perbarui rincian uraian kegiatan, pagu target, atau realisasi kas saat ini."
                    : "Tambahkan rincian penerimaan atau rencana belanja baru ke buku kas APBDes."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setApbModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold transition-all cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveApbItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Uraian Kegiatan / Pos Anggaran *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pembangunan Drainase dan Rabat Beton"
                  value={apbForm.title}
                  onChange={(e) => setApbForm({ ...apbForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Pos *</label>
                <select
                  value={apbForm.category}
                  onChange={(e) => setApbForm({ ...apbForm, category: e.target.value as "Pendapatan" | "Belanja" })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none transition-all cursor-pointer"
                >
                  <option value="Pendapatan">Pendapatan (Penerimaan Kas / DDS / ADD / PADes)</option>
                  <option value="Belanja">Belanja (Pembangunan Fisik, Pemberdayaan, Layanan Digital)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Pagu Anggaran (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={100000}
                    value={apbForm.budget}
                    onChange={(e) => setApbForm({ ...apbForm, budget: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                  <p className="text-[11px] font-mono text-slate-500 mt-1">
                    {formatRupiah(apbForm.budget || 0)}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Realisasi Saat Ini (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={100000}
                    value={apbForm.realization}
                    onChange={(e) => setApbForm({ ...apbForm, realization: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                  <p className="text-[11px] font-mono text-slate-500 mt-1">
                    {formatRupiah(apbForm.realization || 0)}
                  </p>
                </div>
              </div>

              {/* Real-time Percentage & Budget Difference Indicator */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium">Kalkulasi Otomatis Sistem:</span>
                  <p className="text-xs font-bold text-slate-800">
                    Capaian Realisasi Anggaran
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black font-mono text-emerald-700">
                    {apbForm.budget > 0 ? Math.round((apbForm.realization / apbForm.budget) * 100) : 0}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setApbModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#064e3b] hover:bg-[#047857] text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle size={16} weight="bold" />
                  <span>{editingApbId ? "Simpan Perubahan" : "Tambahkan Pos"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
