"use client";

import { useEffect, useState } from "react";

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: "Pemerintahan" | "Ekonomi & UMKM" | "Kegiatan Warga" | "Pengumuman" | "Pembangunan";
  summary: string;
  content: string;
  author: string;
  date: string;
  image: string;
  views: number;
  featured?: boolean;
  videoUrl?: string;
  videoTitle?: string;
}

export interface VillageOfficial {
  id: string;
  name: string;
  role: string;
  period?: string;
  nip?: string;
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
  whatsapp: "0812-8921-7721",
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
};

export const INITIAL_OFFICIALS: VillageOfficial[] = [
  {
    id: "off-1",
    name: "H. M. Aopidi",
    role: "Kepala Desa Kadugenep",
    period: "2019 - 2025",
    photo: "/images/kepala-desa-aopidi.jpg",
    phone: "0812-8921-7721",
  },
  {
    id: "off-2",
    name: "Ahmad Fauzi, S.E.",
    role: "Sekretaris Desa",
    nip: "19850914 201001 1 008",
    phone: "0813-1122-3344",
  },
  {
    id: "off-3",
    name: "Siti Rahmawati, S.Ak.",
    role: "Kaur Keuangan (Bendahara)",
    nip: "19910322 201502 2 004",
    phone: "0819-5566-7788",
  },
  {
    id: "off-4",
    name: "Dedi Suhendar, S.P.",
    role: "Kaur Perencanaan & Pembangunan",
    nip: "19881105 201403 1 002",
    phone: "0857-4433-2211",
  },
  {
    id: "off-5",
    name: "Hj. Nina Kurniasih",
    role: "Kasi Pelayanan Umum & Kesra",
    nip: "19830718 200902 2 006",
    phone: "0812-7788-9900",
  },
  {
    id: "off-6",
    name: "Ust. M. Ridwan, S.Ag.",
    role: "Ketua BPD Desa Kadugenep",
    phone: "0813-9988-1122",
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "kadugenep-seribu-mesin-tembus-pasar-nasional",
    title: "Geliat Pengrajin Tas Kadugenep: Dari Bengkel Desa Menembus Pasar Ritel Nasional",
    category: "Ekonomi & UMKM",
    summary:
      "Dengan lebih dari 340 unit bengkel konveksi mandiri, Desa Kadugenep memperkuat digitalisasi pemasaran tas lokal untuk memenuhi permintaan distributor di Jabodetabek dan luar pulau.",
    content: `
      Desa Kadugenep di Kecamatan Petir, Kabupaten Serang, kian mengukuhkan posisinya sebagai sentra konveksi tas terkemuka di Provinsi Banten. Dijuluki sebagai 'Desa Kecil Seribu Mesin', puluhan rumah warga sehari-hari berdengung suara mesin jahit yang merajut beragam produk tas berkualitas.

      Kepala Desa Kadugenep menyampaikan bahwa produk tas karya perajin lokal kini tidak hanya dipasarkan ke pasar tradisional Serang dan Tanah Abang Jakarta, namun telah merambah e-commerce dan distributor resmi di berbagai provinsi di Sumatra dan Jawa.

      Pemerintah Desa Kadugenep bersama Dinas Koperasi dan UMKM Kabupaten Serang terus memberikan pendampingan legalitas NIB (Nomor Induk Berusaha), standarisasi mutu jahitan, serta fasilitasi pelatihan pemasaran digital agar produk kerajinan tas Kadugenep berdaya saing tinggi.
    `,
    author: "Redaksi Warta Kadugenep",
    date: "2026-09-18",
    image: "/images/kerajinan-tas.jpg",
    views: 1420,
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=T-M4QR6n6Jc",
    videoTitle: "Liputan RRI Banten: Perjalanan & Geliat Pengrajin Tas Lokal Sentra Mandiri",
  },
  {
    id: "art-2",
    slug: "musrenbangdes-kadugenep-prioritas-jalan-usaha-tani-dan-pelatihan",
    title: "Musrenbangdes 2026 Kadugenep Sepakati 4 Prioritas Pembangunan & Digitalisasi Desa",
    category: "Pemerintahan",
    summary:
      "Musyawarah Perencanaan Pembangunan Desa Kadugenep dihadiri perwakilan RT, BPD, tokoh masyarakat, dan pemuda menyepakati fokus pada perbaikan infrastruktur jalan sentra dan penguatan UMKM.",
    content: `
      Bertempat di Aula Kantor Balai Desa Kadugenep, Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) tahun anggaran 2026 berlangsung khidmat dan partisipatif. Agenda ini membahas usulan rencana kerja pembangunan desa dengan melibatkan seluruh elemen masyarakat.

      Empat pilar utama yang disepakati meliputi:
      1. Peningkatan drainase dan betonisasi jalan poros desa lingkar Kadugenep - Petir.
      2. Pembangunan Pojok Literasi & Inkubator Kreatif Mesin Tas bagi pemuda karang taruna.
      3. Digitalisasi sistem pelayanan administrasi persuratan warga (Layanan Mandiri Cepat).
      4. Bantuan permodalan stimulan melalui BUMDes 'Maju Bersama Kadugenep'.
    `,
    author: "Tim Humas Desa",
    date: "2026-09-14",
    image: "/images/warga-komunitas.jpg",
    views: 980,
    featured: true,
  },
  {
    id: "art-3",
    slug: "posyandu-balita-dan-lansia-terpadu-kadugenep",
    title: "Layanan Terpadu Posyandu Kasih Ibu Kadugenep Sukses Layani 180 Balita dan Lansia",
    category: "Kegiatan Warga",
    summary:
      "Kader Posyandu bersama bidan desa melaksanakan pemeriksaan kesehatan rutin, pemberian vitamin tambahan, dan edukasi pencegahan stunting secara door-to-door.",
    content: `
      Kesehatan warga menjadi pondasi kesejahteraan Desa Kadugenep. Posyandu Kasih Ibu yang tersebar di 4 kedusunan serentak mengadakan penimbangan balita, imunisasi dasar lengkap, serta pemantauan tekanan darah dan gula darah bagi warga lanjut usia.

      Program ini didukung penuh oleh alokasi Dana Desa bidang kesehatan kemasyarakatan guna memastikan tidak ada anak yang terindikasi stunting dan warga lansia mendapatkan pendampingan medis berkala.
    `,
    author: "Kader Kesehatan Desa",
    date: "2026-09-10",
    image: "/images/balai-desa.jpg",
    views: 650,
    featured: false,
    videoUrl: "/uploads/video-1790038029125-118-sample_village_video.mp4",
    videoTitle: "Dokumentasi Liputan Kegiatan Posyandu Kasih Ibu Kadugenep",
  },
  {
    id: "art-4",
    slug: "gotong-royong-normalisasi-saluran-irigasi-sawah",
    title: "Warga Dusun 2 Gelar Gotong Royong Normalisasi Saluran Irigasi Sambut Musim Tanam",
    category: "Pembangunan",
    summary:
      "Kekompakan warga petani dan pengrajin tampak nyata saat bahu membahu membersihkan saluran irigasi primer sepanjang 1,2 kilometer demi kelancaran pasokan air sawah.",
    content: `
      Semangat kebersamaan tradisional Banten terus lestari di Desa Kadugenep. Puluhan warga dari RT 05 dan RT 06 turun langsung ke saluran air persawahan untuk membersihkan sedimen lumpur dan gulma.

      Dengan irigasi yang lancar, diharapkan produktivitas panen padi sawah seluas 120 hektare di areal barat desa dapat meningkat secara signifikan pada siklus tanam musim hujan mendatang.
    `,
    author: "Bhabinkamtibmas & Babinsa Kadugenep",
    date: "2026-09-05",
    image: "/images/hero-kadugenep.jpg",
    views: 820,
    featured: false,
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

export function useVillageStore() {
  const [profile, setProfileState] = useState<VillageProfile>(INITIAL_PROFILE);
  const [officials, setOfficialsState] = useState<VillageOfficial[]>(INITIAL_OFFICIALS);
  const [articles, setArticlesState] = useState<Article[]>(INITIAL_ARTICLES);
  const [apbdes, setApbdesState] = useState<APBDesItem[]>(INITIAL_APBDES);
  const [agenda, setAgendaState] = useState<VillageAgenda[]>(INITIAL_AGENDA);
  const [serviceRequests, setServiceRequestsState] = useState<ServiceRequest[]>(INITIAL_SERVICE_REQUESTS);
  const [aspirations, setAspirationsState] = useState<CitizenAspiration[]>(INITIAL_ASPIRATIONS);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Schedule initial load from localStorage outside immediate render
    const timer = setTimeout(() => {
      setProfileState(getStoredData(STORAGE_KEYS.PROFILE, INITIAL_PROFILE));
      const storedOfficials = getStoredData(STORAGE_KEYS.OFFICIALS, INITIAL_OFFICIALS);
      const mergedOfficials = storedOfficials.map((o: VillageOfficial) => {
        if (o.id === "off-1") {
          return {
            ...o,
            name: "H. M. Aopidi",
            role: "Kepala Desa Kadugenep",
            period: "2019 - 2025",
            photo: "/images/kepala-desa-aopidi.jpg",
          };
        }
        return o;
      });
      setOfficialsState(mergedOfficials);

      const storedArticles = getStoredData(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
      const mergedArticles = storedArticles.map((a: Article) => {
        const init = INITIAL_ARTICLES.find((ia) => ia.id === a.id);
        if (init?.videoUrl && (!a.videoUrl || a.videoUrl.includes("gT8vWl_YVCg"))) {
          return { ...a, videoUrl: init.videoUrl, videoTitle: init.videoTitle };
        }
        return a;
      });
      setArticlesState(mergedArticles);

      const storedApbdes = getStoredData(STORAGE_KEYS.APBDES, INITIAL_APBDES);
      const isOldApbdes = storedApbdes.some((item: APBDesItem) => item.budget === 985000000 || (item.id === "apb-1" && item.budget !== 373619400));
      const validApbdes = isOldApbdes ? INITIAL_APBDES : storedApbdes;
      setApbdesState(validApbdes);

      setAgendaState(getStoredData(STORAGE_KEYS.AGENDA, INITIAL_AGENDA));
      setServiceRequestsState(getStoredData(STORAGE_KEYS.SERVICE_REQUESTS, INITIAL_SERVICE_REQUESTS));
      setAspirationsState(getStoredData(STORAGE_KEYS.ASPIRATIONS, INITIAL_ASPIRATIONS));
      setIsAdminLoggedIn(Boolean(getStoredData(STORAGE_KEYS.ADMIN_SESSION, false)));
      setIsLoaded(true);
    }, 0);

    const handleUpdate = () => {
      setProfileState(getStoredData(STORAGE_KEYS.PROFILE, INITIAL_PROFILE));
      const sOfficials = getStoredData(STORAGE_KEYS.OFFICIALS, INITIAL_OFFICIALS);
      const mOfficials = sOfficials.map((o: VillageOfficial) => {
        if (o.id === "off-1") {
          return {
            ...o,
            name: "H. M. Aopidi",
            role: "Kepala Desa Kadugenep",
            period: "2019 - 2025",
            photo: "/images/kepala-desa-aopidi.jpg",
          };
        }
        return o;
      });
      setOfficialsState(mOfficials);

      const sArticles = getStoredData(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
      const mArticles = sArticles.map((a: Article) => {
        const init = INITIAL_ARTICLES.find((ia) => ia.id === a.id);
        if (init?.videoUrl && (!a.videoUrl || a.videoUrl.includes("gT8vWl_YVCg"))) {
          return { ...a, videoUrl: init.videoUrl, videoTitle: init.videoTitle };
        }
        return a;
      });
      setArticlesState(mArticles);

      const sApbdes = getStoredData(STORAGE_KEYS.APBDES, INITIAL_APBDES);
      const isOld = sApbdes.some((item: APBDesItem) => item.budget === 985000000 || (item.id === "apb-1" && item.budget !== 373619400));
      setApbdesState(isOld ? INITIAL_APBDES : sApbdes);
      setAgendaState(getStoredData(STORAGE_KEYS.AGENDA, INITIAL_AGENDA));
      setServiceRequestsState(getStoredData(STORAGE_KEYS.SERVICE_REQUESTS, INITIAL_SERVICE_REQUESTS));
      setAspirationsState(getStoredData(STORAGE_KEYS.ASPIRATIONS, INITIAL_ASPIRATIONS));
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
  };

  const saveOfficials = (newOfficials: VillageOfficial[]) => {
    setOfficialsState(newOfficials);
    setStoredData(STORAGE_KEYS.OFFICIALS, newOfficials);
  };

  const saveArticles = (newArticles: Article[]) => {
    setArticlesState(newArticles);
    setStoredData(STORAGE_KEYS.ARTICLES, newArticles);
  };

  const saveApbdes = (newApbdes: APBDesItem[]) => {
    setApbdesState(newApbdes);
    setStoredData(STORAGE_KEYS.APBDES, newApbdes);
  };

  const saveAgenda = (newAgenda: VillageAgenda[]) => {
    setAgendaState(newAgenda);
    setStoredData(STORAGE_KEYS.AGENDA, newAgenda);
  };

  const saveServiceRequests = (newReqs: ServiceRequest[]) => {
    setServiceRequestsState(newReqs);
    setStoredData(STORAGE_KEYS.SERVICE_REQUESTS, newReqs);
  };

  const saveAspirations = (newAsps: CitizenAspiration[]) => {
    setAspirationsState(newAsps);
    setStoredData(STORAGE_KEYS.ASPIRATIONS, newAsps);
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
    resetToDefault,
  };
}
