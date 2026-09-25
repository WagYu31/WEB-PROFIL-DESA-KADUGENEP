"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  List,
  X,
  Buildings,
  FileText,
  Article,
  ChartPieSlice,
  GearSix,
  Sparkle,
  SignOut,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useVillageStore } from "@/lib/data-store";

const NAV_LINKS = [
  { href: "/", label: "Beranda", icon: <Buildings size={16} /> },
  { href: "/#profil", label: "Profil Desa", icon: <FileText size={16} /> },
  { href: "/#potensi", label: "Sentra Tas", icon: <Sparkle size={16} /> },
  { href: "/#berita", label: "Warta Desa", icon: <Article size={16} /> },
  { href: "/#apbdes", label: "Transparansi APBDes", icon: <ChartPieSlice size={16} /> },
  { href: "/layanan", label: "Layanan Mandiri", icon: <FileText size={16} /> },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isAdminLoggedIn, logoutAdmin } = useVillageStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass-nav py-2.5 shadow-sm"
            : "bg-white/95 backdrop-blur-md py-3.5 border-b border-slate-200/70"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Logo & Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-11 shrink-0 group-hover:scale-105 transition-transform drop-shadow-sm">
              <Image
                src="/images/logo-serang.png"
                alt="Lambang Kabupaten Serang"
                fill
                priority
                className="object-contain"
                sizes="36px"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors">
                  Desa Kadugenep
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-800 border border-sky-200">
                  Petir · Serang
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                Desa Kecil Seribu Mesin
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold tracking-normal transition-colors flex items-center gap-1.5",
                    isActive
                      ? "text-sky-700 bg-sky-50 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {isAdminLoggedIn ? (
              <div className="inline-flex items-center p-1 rounded-xl bg-emerald-50 border border-emerald-200 shadow-xs gap-1">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Admin</span>
                </Link>
                <button
                  type="button"
                  onClick={() => logoutAdmin()}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                  title="Keluar dari sesi administrator"
                >
                  <SignOut size={14} weight="bold" />
                  <span>Keluar</span>
                </button>
              </div>
            ) : (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <GearSix size={15} />
                <span>Admin</span>
              </Link>
            )}

            <Link
              href="/layanan"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <span>Pelayanan Surat</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Buka Menu Navigasi"
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
          >
            {isOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div
            className="fixed top-16 right-4 left-4 rounded-2xl bg-white border border-slate-200 shadow-2xl p-5 space-y-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-7">
                  <Image src="/images/logo-serang.png" alt="Logo Serang" fill className="object-contain" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Pemerintah Desa Kadugenep</span>
              </div>
              <span className="text-[10px] text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md font-bold border border-sky-100">
                Kab. Serang
              </span>
            </div>

            <div className="space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-800 transition-colors"
                >
                  <span className="text-sky-700">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <GearSix size={16} />
                <span>{isAdminLoggedIn ? "Dashboard Admin" : "Login Admin"}</span>
              </Link>

              {isAdminLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    logoutAdmin();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 cursor-pointer"
                >
                  <SignOut size={15} weight="bold" />
                  <span>Log Out</span>
                </button>
              ) : (
                <Link
                  href="/layanan"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-700 text-white text-xs font-bold hover:bg-sky-800"
                >
                  <span>Ajukan Surat</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
