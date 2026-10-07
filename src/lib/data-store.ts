"use client";

import { useEffect, useState } from "react";
import { type Article, INITIAL_ARTICLES, findArticleBySlug } from "./articles";

export { type Article, INITIAL_ARTICLES, findArticleBySlug };

export interface VillageOfficial {
  id: string;
  name: string;
  role: string;
  period?: string;
  nip?: string;
  nrpd?: string;
  photo?: string;
  phone?: string;
}

export interface VillageProfile {
  name: string;
  tagline: string;
  subdistrict: string;
  regency: string;
  province: string;
  postalCode: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  vision: string;
  missions: string[];
  history: string;
  stats: {
    population: number;
    families: number;
    male: number;
    female: number;
    bagCraftsmen: number;
    neighborhoods: number;
    hamlets: number;
    areaKm2: number;
  };
  apbdesBalihoUrl?: string;
}

export interface APBDesItem {
  id: string;
  title: string;
  budget: number;
  realization: number;
  percentage: number;
  category: "Pendapatan" | "Belanja" | "Pembiayaan";
}

export interface VillageAgenda {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
}

export interface ServiceRequest {
  id: string;
  citizenName: string;
  nik: string;
  serviceType: string;
  whatsapp: string;
  notes: string;
  createdAt: string;
  status: "Menunggu" | "Diproses" | "Selesai";
  details?: Record<string, string>;
}

export interface CitizenAspiration {
  id: string;
  name: string;
  contact: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "Baru" | "Ditanggapi";
}

export interface SotkSettings {
  view: "bagan" | "grid";
  bgTheme: "kantor" | "blueprint" | "clean";
  bgImage: string;
}

export const INITIAL_SOTK_SETTINGS: SotkSettings = {
  view: "bagan",
  bgTheme: "kantor",
  bgImage: "/images/kantor-desa-kadugenep.jpg",
};

export const INITIAL_PROFILE: VillageProfile = {
  name: "Desa Kadugenep",
  tagline: "Desa Kecil Seribu Mesin — Gemah Ripah Loh Jinawi",
  subdistrict: "Kecamatan Petir",
  regency: "Kabupaten Serang",
  province: "Banten",
  postalCode: "42172",
  address: "Jl. Raya Petir - Serang Km. 3, Kadugenep, Kec. Petir, Kab. Serang, Banten 42172",
  phone: "(0254) 849-2101",
  email: "kantor@kadugenep.desa.id",
  whatsapp: "0838-5717-8552",
  vision: "Terwujudnya Desa Kadugenep yang Religius, Mandiri, Berdaya Saing Industri Kreatif Berbasis Seribu Mesin, serta Sejahtera Lahir Batin.",
  missions: [
    "Meningkatkan tata kelola pemerintahan desa yang transparan, akuntabel, dan berbasis teknologi digital.",
    "Mengembangkan ekosistem industri kreatif kerajinan tas dan produk konveksi menuju pasar nasional dan ekspor.",
    "Mengoptimalkan produktivitas sektor pertanian terpadu serta kelestarian lingkungan hidup pedesaan.",
    "Meningkatkan mutu pelayanan publik, pendidikan, dan kesehatan masyarakat desa secara adil dan merata.",
    "Memperkokoh kerukunan warga berlandaskan nilai-nilai keagamaan dan kearifan lokal Banten.",
  ],
  history:
    "Desa Kadugenep terletak di Kecamatan Petir, Kabupaten Serang. Berawal dari perkampungan agraris yang rukun, desa ini bertransformasi menjadi salah satu pusat ekonomi kreatif paling dinamis di Banten. Sejak dekade 1990-an, keahlian warganya dalam memproduksi tas berkualitas tinggi telah melahirkan julukan 'Desa Kecil Seribu Mesin'. Setiap sudut perkampungan dipenuhi deru mesin jahit konveksi mandiri yang memasok ribuan tas sekolah, ransel gunung, hingga tas kerja ke seluruh pelosok Nusantara.",
  stats: {
    population: 4820,
    families: 1342,
    male: 2465,
    female: 2355,
    bagCraftsmen: 340,
    neighborhoods: 16,
    hamlets: 4,
    areaKm2: 3.42,
  },
  apbdesBalihoUrl: "/images/infografis-apbdes-2026.png",
};

export const INITIAL_OFFICIALS: VillageOfficial[] = [
  {
    id: "off-1",
    name: "H. M. Aopidi",
    role: "Kepala Desa Kadugenep",
    period: "2019 - 2025",
    photo: "/images/kepala-desa-aopidi.jpg",
    phone: "0818-0666-9275",
  },
  {
    id: "off-bpd",
    name: "Sahruroji",
    role: "Ketua BPD Desa Kadugenep",
    phone: "087771500069",
  },
  {
    id: "off-sekdes",
    name: "Nursahid",
    role: "Sekretaris Desa",
    nrpd: "1908 19860515 01",
    nip: "1908 19860515 01",
  },
  {
    id: "off-kaur-1",
    name: "Rohaman",
    role: "Kaur Umum",
    nrpd: "1908 19900420 01",
    nip: "1908 19900420 01",
  },
  {
    id: "off-kaur-2",
    name: "Deddy Ardiansyah",
    role: "Kaur Keuangan",
    nrpd: "1908 19890626 01",
    nip: "1908 19890626 01",
  },
  {
    id: "off-kaur-3",
    name: "Idrus",
    role: "Kaur Perencanaan",
    nrpd: "1906 19860506 01",
    nip: "1906 19860506 01",
  },
  {
    id: "off-kasi-1",
    name: "Abdul Hani",
    role: "Kasi Pemerintahan",
    nrpd: "1908 19870812 01",
    nip: "1908 19870812 01",
  },
  {
    id: "off-kasi-2",
    name: "Kartawijaya",
    role: "Kasi Kesejahteraan",
    nrpd: "1908 19850107 01",
    nip: "1908 19850107 01",
  },
  {
    id: "off-kasi-3",
    name: "Ihah Tunjihah",
    role: "Kasi Pelayanan",
    nrpd: "1908 20020326 01",
    nip: "1908 20020326 01",
  },
];


export const INITIAL_APBDES: APBDesItem[] = [
  // 1. PENDAPATAN (Total: Rp 1.124.547.453)
  {
    id: "apb-1",
    title: "Alokasi Dana Desa (ADD)",
    budget: 373619400,
    realization: 373619400,
    percentage: 100,
    category: "Pendapatan",
  },
  {
    id: "apb-2",
    title: "Dana Desa (DDS) APBN",
    budget: 354579000,
    realization: 354579000,
    percentage: 100,
    category: "Pendapatan",
  },
  {
    id: "apb-3",
    title: "Bagi Hasil Pajak & Retribusi Daerah (BHPRD 2026)",
    budget: 147739900,
    realization: 147739900,
    percentage: 100,
    category: "Pendapatan",
  },
  {
    id: "apb-4",
    title: "Luncuran Dana Tahun 2023 & 2024",
    budget: 128609153,
    realization: 128609153,
    percentage: 100,
    category: "Pendapatan",
  },
  {
    id: "apb-5",
    title: "Bantuan Keuangan Provinsi Banten",
    budget: 120000000,
    realization: 120000000,
    percentage: 100,
    category: "Pendapatan",
  },

  // 2. BELANJA (Total: Rp 1.103.530.141)
  {
    id: "apb-6",
    title: "Bidang Penyelenggaraan Pemerintahan Desa (59,57%)",
    budget: 684751252,
    realization: 582038564,
    percentage: 85,
    category: "Belanja",
  },
  {
    id: "apb-7",
    title: "Bidang Pelaksanaan Pembangunan Desa (33,28%)",
    budget: 382564700,
    realization: 325179995,
    percentage: 85,
    category: "Belanja",
  },
  {
    id: "apb-8",
    title: "Bidang Penanggulangan Bencana & Mendesak (BLT 3,13%)",
    budget: 36000000,
    realization: 36000000,
    percentage: 100,
    category: "Belanja",
  },
  {
    id: "apb-9",
    title: "Bidang Pemberdayaan Perempuan & Masyarakat (2,09%)",
    budget: 24000000,
    realization: 20400000,
    percentage: 85,
    category: "Belanja",
  },
  {
    id: "apb-10",
    title: "Bidang Pembinaan Kemasyarakatan & Pemuda (1,93%)",
    budget: 22154100,
    realization: 18830985,
    percentage: 85,
    category: "Belanja",
  },

  // 3. PEMBIAYAAN
  {
    id: "apb-11",
    title: "Penerimaan Pembiayaan",
    budget: 41411599,
    realization: 41411599,
    percentage: 100,
    category: "Pembiayaan",
  },
  {
    id: "apb-12",
    title: "Pengeluaran Pembiayaan",
    budget: 16489000,
    realization: 16489000,
    percentage: 100,
    category: "Pembiayaan",
  },
];

export const INITIAL_AGENDA: VillageAgenda[] = [
  {
    id: "ag-1",
    title: "Pelatihan Standarisasi Mutu & Branding Kemasan Tas",
    date: "2026-09-26",
    time: "09:00 - 15:00 WIB",
    location: "Aula Kantor Desa Kadugenep",
    organizer: "Pokja UMKM & Disperindagkop",
    description: "Pelatihan khusus bagi 50 pemilik bengkel konveksi tas mengenai teknik jahit presisi dan foto produk digital.",
  },
  {
    id: "ag-2",
    title: "Rembug Warga & Penetapan RKPDes Perubahan 2026",
    date: "2026-10-03",
    time: "19:30 - Selesai",
    location: "Gedung Serbaguna Kadugenep",
    organizer: "BPD & Pemdes Kadugenep",
    description: "Musyawarah bersama ketua RT/RW dan tokoh agama membahas realisasi anggaran semester akhir.",
  },
  {
    id: "ag-3",
    title: "Senam Sehat Bugar & Bazar Murah Produk Warga",
    date: "2026-10-11",
    time: "06:30 - 10:30 WIB",
    location: "Lapangan Sepak Bola Desa Kadugenep",
    organizer: "Karang Taruna Tunas Harapan",
    description: "Kegiatan olahraga massal berhadiah doorprize dan stan kuliner lokal khas Petir Serang.",
  },
];

export const INITIAL_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: "req-1",
    citizenName: "Bambang Sudirman",
    nik: "3604121405820001",
    serviceType: "Surat Keterangan Usaha (SKU) Konveksi Tas",
    whatsapp: "081298765432",
    notes: "Untuk pengajuan pinjaman modal usaha KUR BRI.",
    createdAt: "2026-09-19",
    status: "Diproses",
  },
  {
    id: "req-2",
    citizenName: "Dewi Lestari",
    nik: "3604125809950003",
    serviceType: "Surat Pengantar SKCK",
    whatsapp: "085712345678",
    notes: "Persyaratan melamar pekerjaan.",
    createdAt: "2026-09-18",
    status: "Selesai",
  },
  {
    id: "req-3",
    citizenName: "H. Samsul Bahri",
    nik: "3604120101700002",
    serviceType: "Surat Keterangan Domisili Tempat Tinggal",
    whatsapp: "081387654321",
    notes: "Pindah alamat keluarga ke RT 03.",
    createdAt: "2026-09-20",
    status: "Menunggu",
  },
];

export const INITIAL_ASPIRATIONS: CitizenAspiration[] = [
  {
    id: "asp-1",
    name: "Hidayatullah (Ketua RT 04)",
    contact: "081987654321",
    subject: "Usulan Penambahan Lampu Penerangan Jalan RT 04",
    message: "Mohon agar jalan masuk dusun 2 dipasang penerangan jalan tambahan karena aktivitas pengrajin tas sering hingga larut malam.",
    createdAt: "2026-09-17",
    status: "Ditanggapi",
  },
  {
    id: "asp-2",
    name: "Rian Maulana",
    contact: "085698761234",
    subject: "Fasilitasi Workshop E-Commerce untuk Pengrajin Muda",
    message: "Mohon diadakan pelatihan jualan di TikTok Shop & Shopee untuk anak-anak muda pengrajin tas Kadugenep.",
    createdAt: "2026-09-19",
    status: "Baru",
  },
];

const STORAGE_KEYS = {
  PROFILE: "kadugenep_profile",
  OFFICIALS: "kadugenep_officials",
  ARTICLES: "kadugenep_articles",
  APBDES: "kadugenep_apbdes",
  AGENDA: "kadugenep_agenda",
  SERVICE_REQUESTS: "kadugenep_services",
  ASPIRATIONS: "kadugenep_aspirations",
  ADMIN_SESSION: "kadugenep_admin_session",
  SOTK_SETTINGS: "kadugenep_sotk_settings",
};

export function getStoredData<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setStoredData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("kadugenep_store_update", { detail: { key } }));
  } catch (err) {
    console.error("Failed saving to localStorage:", err);
  }
}

// Background sync to Supabase Cloud Database
export async function syncToCloud(action: string, payload: any) {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload }),
    });
    return await res.json();
  } catch (err) {
    console.warn("Could not sync change to Supabase cloud:", err);
  }
}

export function useVillageStore() {
  const [profile, setProfileState] = useState<VillageProfile>(INITIAL_PROFILE);
  const [officials, setOfficialsState] = useState<VillageOfficial[]>(INITIAL_OFFICIALS);
  const [articles, setArticlesState] = useState<Article[]>(INITIAL_ARTICLES);
  const [apbdes, setApbdesState] = useState<APBDesItem[]>(INITIAL_APBDES);
  const [agenda, setAgendaState] = useState<VillageAgenda[]>(INITIAL_AGENDA);
  const [serviceRequests, setServiceRequestsState] = useState<ServiceRequest[]>(INITIAL_SERVICE_REQUESTS);
  const [aspirations, setAspirationsState] = useState<CitizenAspiration[]>(INITIAL_ASPIRATIONS);
  const [sotkSettings, setSotkSettingsState] = useState<SotkSettings>(INITIAL_SOTK_SETTINGS);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Schedule initial load from localStorage outside immediate render
    const timer = setTimeout(() => {
      const storedProfile = getStoredData(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
      const migratedProfile = {
        ...storedProfile,
        whatsapp:
          !storedProfile.whatsapp ||
          storedProfile.whatsapp === "0812-8921-7721" ||
          storedProfile.whatsapp === "0818-0666-9275"
            ? "0838-5717-8552"
            : storedProfile.whatsapp,
      };
      setStoredData(STORAGE_KEYS.PROFILE, migratedProfile);
      setProfileState(migratedProfile);
      const storedOfficials = getStoredData(STORAGE_KEYS.OFFICIALS, INITIAL_OFFICIALS);
      const hasNursahid = storedOfficials.some((o: VillageOfficial) => o.name.toLowerCase().includes("nursahid"));
      let mergedOfficials: VillageOfficial[];
      if (!hasNursahid) {
        mergedOfficials = INITIAL_OFFICIALS;
        setStoredData(STORAGE_KEYS.OFFICIALS, INITIAL_OFFICIALS);
      } else {
        mergedOfficials = storedOfficials.map((o: VillageOfficial) => {
          if (o.id === "off-1") {
            return {
              ...o,
              name: "H. M. Aopidi",
              role: "Kepala Desa Kadugenep",
              period: "2019 - 2025",
              photo: "/images/kepala-desa-aopidi.jpg",
              phone:
                !o.phone || o.phone === "0838-5717-8552" || o.phone === "0812-8921-7721"
                  ? "0818-0666-9275"
                  : o.phone,
            };
          }
          if (o.id === "off-bpd" && (o.name.includes("Ridwan") || o.phone === "0813-9988-1122")) {
            return {
              ...o,
              name: "Sahruroji",
              role: "Ketua BPD Desa Kadugenep",
              phone: "087771500069",
            };
          }
          return o;
        });
        setStoredData(STORAGE_KEYS.OFFICIALS, mergedOfficials);
      }
      setOfficialsState(mergedOfficials);

      const storedArticles = getStoredData<Article[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
      const hasNewArticles = storedArticles.some((a) => a.id === "art-1" && a.slug.includes("radar-banten-awards"));
      const validArticles = !hasNewArticles ? INITIAL_ARTICLES : storedArticles;
      setArticlesState(validArticles);

      const storedApbdes = getStoredData(STORAGE_KEYS.APBDES, INITIAL_APBDES);
      const isOldApbdes = storedApbdes.some((item: APBDesItem) => item.budget === 985000000 || (item.id === "apb-1" && item.budget !== 373619400));
      const validApbdes = isOldApbdes ? INITIAL_APBDES : storedApbdes;
      setApbdesState(validApbdes);

      setAgendaState(getStoredData(STORAGE_KEYS.AGENDA, INITIAL_AGENDA));
      setServiceRequestsState(getStoredData(STORAGE_KEYS.SERVICE_REQUESTS, INITIAL_SERVICE_REQUESTS));
      setAspirationsState(getStoredData(STORAGE_KEYS.ASPIRATIONS, INITIAL_ASPIRATIONS));
      setSotkSettingsState(getStoredData(STORAGE_KEYS.SOTK_SETTINGS, INITIAL_SOTK_SETTINGS));
      setIsAdminLoggedIn(Boolean(getStoredData(STORAGE_KEYS.ADMIN_SESSION, false)));
      setIsLoaded(true);

      // Background sync with Supabase cloud database
      fetch("/api/sync")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.success) {
            // Check if local device has extra articles not yet in Supabase (e.g. TESTING & tesss added from laptop)
            const localArticles = getStoredData<Article[]>(STORAGE_KEYS.ARTICLES, []);
            const missingInCloud = localArticles.filter(
              (la) => !data.articles.some((ca: Article) => ca.id === la.id || ca.slug === la.slug)
            );

            if (missingInCloud.length > 0) {
              // Automatically sync missing local articles up to Supabase!
              syncToCloud("sync_all_articles", localArticles);
              setArticlesState(localArticles);
            } else if (Array.isArray(data.articles) && data.articles.length > 0) {
              setArticlesState(data.articles);
              setStoredData(STORAGE_KEYS.ARTICLES, data.articles);
            }

            if (data.profile) {
              setProfileState(data.profile);
              setStoredData(STORAGE_KEYS.PROFILE, data.profile);
            }
            if (Array.isArray(data.officials) && data.officials.length > 0) {
              setOfficialsState(data.officials);
              setStoredData(STORAGE_KEYS.OFFICIALS, data.officials);
            }
            if (Array.isArray(data.apbdes) && data.apbdes.length > 0) {
              setApbdesState(data.apbdes);
              setStoredData(STORAGE_KEYS.APBDES, data.apbdes);
            }
            if (data.sotkSettings) {
              setSotkSettingsState(data.sotkSettings);
              setStoredData(STORAGE_KEYS.SOTK_SETTINGS, data.sotkSettings);
            }
            if (Array.isArray(data.serviceRequests) && data.serviceRequests.length > 0) {
              setServiceRequestsState(data.serviceRequests);
              setStoredData(STORAGE_KEYS.SERVICE_REQUESTS, data.serviceRequests);
            }
            if (Array.isArray(data.aspirations) && data.aspirations.length > 0) {
              setAspirationsState(data.aspirations);
              setStoredData(STORAGE_KEYS.ASPIRATIONS, data.aspirations);
            }
          }
        })
        .catch((err) => {
          console.warn("Supabase sync notice (using local store):", err);
        });
    }, 0);

    const handleUpdate = () => {
      const sProf = getStoredData(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
      const mProf = {
        ...sProf,
        whatsapp:
          !sProf.whatsapp ||
          sProf.whatsapp === "0812-8921-7721" ||
          sProf.whatsapp === "0818-0666-9275"
            ? "0838-5717-8552"
            : sProf.whatsapp,
      };
      setProfileState(mProf);
      const sOfficials = getStoredData(STORAGE_KEYS.OFFICIALS, INITIAL_OFFICIALS);
      const hasNursahidInUpdate = sOfficials.some((o: VillageOfficial) => o.name.toLowerCase().includes("nursahid"));
      let mOfficials: VillageOfficial[];
      if (!hasNursahidInUpdate) {
        mOfficials = INITIAL_OFFICIALS;
      } else {
        mOfficials = sOfficials.map((o: VillageOfficial) => {
          if (o.id === "off-1") {
            return {
              ...o,
              name: "H. M. Aopidi",
              role: "Kepala Desa Kadugenep",
              period: "2019 - 2025",
              photo: "/images/kepala-desa-aopidi.jpg",
              phone:
                !o.phone || o.phone === "0838-5717-8552" || o.phone === "0812-8921-7721"
                  ? "0818-0666-9275"
                  : o.phone,
            };
          }
          if (o.id === "off-bpd" && (o.name.includes("Ridwan") || o.phone === "0813-9988-1122")) {
            return {
              ...o,
              name: "Sahruroji",
              role: "Ketua BPD Desa Kadugenep",
              phone: "087771500069",
            };
          }
          return o;
        });
      }
      setOfficialsState(mOfficials);

      const sArticles = getStoredData<Article[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
      const hasNew = sArticles.some((a) => a.id === "art-1" && a.slug.includes("radar-banten-awards"));
      setArticlesState(!hasNew ? INITIAL_ARTICLES : sArticles);

      const sApbdes = getStoredData(STORAGE_KEYS.APBDES, INITIAL_APBDES);
      const isOld = sApbdes.some((item: APBDesItem) => item.budget === 985000000 || (item.id === "apb-1" && item.budget !== 373619400));
      setApbdesState(isOld ? INITIAL_APBDES : sApbdes);
      setAgendaState(getStoredData(STORAGE_KEYS.AGENDA, INITIAL_AGENDA));
      setServiceRequestsState(getStoredData(STORAGE_KEYS.SERVICE_REQUESTS, INITIAL_SERVICE_REQUESTS));
      setAspirationsState(getStoredData(STORAGE_KEYS.ASPIRATIONS, INITIAL_ASPIRATIONS));
      setSotkSettingsState(getStoredData(STORAGE_KEYS.SOTK_SETTINGS, INITIAL_SOTK_SETTINGS));
      setIsAdminLoggedIn(Boolean(getStoredData(STORAGE_KEYS.ADMIN_SESSION, false)));
    };

    window.addEventListener("kadugenep_store_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("kadugenep_store_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const saveProfile = (newProfile: VillageProfile) => {
    setProfileState(newProfile);
    setStoredData(STORAGE_KEYS.PROFILE, newProfile);
    syncToCloud("save_setting", { key: "profile", data: newProfile });
  };

  const saveOfficials = (newOfficials: VillageOfficial[]) => {
    setOfficialsState(newOfficials);
    setStoredData(STORAGE_KEYS.OFFICIALS, newOfficials);
    syncToCloud("save_setting", { key: "officials", data: newOfficials });
  };

  const saveArticles = (newArticles: Article[]) => {
    setArticlesState(newArticles);
    setStoredData(STORAGE_KEYS.ARTICLES, newArticles);
    syncToCloud("sync_all_articles", newArticles);
  };

  const saveApbdes = (newApbdes: APBDesItem[]) => {
    setApbdesState(newApbdes);
    setStoredData(STORAGE_KEYS.APBDES, newApbdes);
    syncToCloud("save_setting", { key: "apbdes", data: newApbdes });
  };

  const saveAgenda = (newAgenda: VillageAgenda[]) => {
    setAgendaState(newAgenda);
    setStoredData(STORAGE_KEYS.AGENDA, newAgenda);
  };

  const saveServiceRequests = (newReqs: ServiceRequest[]) => {
    setServiceRequestsState(newReqs);
    setStoredData(STORAGE_KEYS.SERVICE_REQUESTS, newReqs);
    if (newReqs.length > 0) {
      syncToCloud("save_service_request", newReqs[0]);
    }
  };

  const saveAspirations = (newAsps: CitizenAspiration[]) => {
    setAspirationsState(newAsps);
    setStoredData(STORAGE_KEYS.ASPIRATIONS, newAsps);
    if (newAsps.length > 0) {
      syncToCloud("save_aspiration", newAsps[0]);
    }
  };

  const saveSotkSettings = (newSettings: SotkSettings) => {
    setSotkSettingsState(newSettings);
    setStoredData(STORAGE_KEYS.SOTK_SETTINGS, newSettings);
    syncToCloud("save_setting", { key: "sotk_settings", data: newSettings });
  };

  const loginAdmin = () => {
    setIsAdminLoggedIn(true);
    setStoredData(STORAGE_KEYS.ADMIN_SESSION, true);
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setStoredData(STORAGE_KEYS.ADMIN_SESSION, false);
  };

  const resetToDefault = () => {
    if (typeof window !== "undefined") {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
      setProfileState(INITIAL_PROFILE);
      setOfficialsState(INITIAL_OFFICIALS);
      setArticlesState(INITIAL_ARTICLES);
      setApbdesState(INITIAL_APBDES);
      setAgendaState(INITIAL_AGENDA);
      setServiceRequestsState(INITIAL_SERVICE_REQUESTS);
      setAspirationsState(INITIAL_ASPIRATIONS);
      setSotkSettingsState(INITIAL_SOTK_SETTINGS);
      setIsAdminLoggedIn(false);
      window.dispatchEvent(new CustomEvent("kadugenep_store_update", { detail: { reset: true } }));
    }
  };

  return {
    isLoaded,
    profile,
    officials,
    articles,
    apbdes,
    agenda,
    serviceRequests,
    aspirations,
    sotkSettings,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    saveProfile,
    saveOfficials,
    saveArticles,
    saveApbdes,
    saveAgenda,
    saveServiceRequests,
    saveAspirations,
    saveSotkSettings,
    resetToDefault,
  };
}
