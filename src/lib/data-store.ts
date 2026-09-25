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
    slug: "kades-kadugenep-raih-penghargaan-tokoh-inovatif-radar-banten-awards-2026",
    title: "Kepala Desa Kadugenep Raih Penghargaan Bergengsi Tokoh Inovatif Radar Banten Awards 2026",
    category: "Pemerintahan",
    summary:
      "Apresiasi atas keberhasilan memajukan desa mandiri melalui penguatan sentra kerajinan tas dan transformasi digital pelayanan publik yang berdampak nyata bagi ribuan warga.",
    content: `
      Prestasi membanggakan kembali diraih Pemerintah Desa Kadugenep, Kecamatan Petir, Kabupaten Serang. Kepala Desa Kadugenep secara resmi dinobatkan sebagai penerima penghargaan 'Tokoh Inovatif' pada ajang bergengsi Radar Banten Awards 2026.

      Penghargaan ini diberikan atas dedikasi dan terobosan kepemimpinan dalam menggerakkan perekonomian masyarakat melalui ekosistem 'Desa Kecil Seribu Mesin', penguatan legalitas UMKM pengrajin tas, serta implementasi pelayanan publik desa berbasis digital yang transparan dan akuntabel.

      "Penghargaan ini saya persembahkan seutuhnya untuk seluruh warga masyarakat Desa Kadugenep, para perajin tas konveksi mandiri, BPD, perangkat desa, serta seluruh kader yang tak kenal lelah bergotong royong membangun desa tercinta," ujar Kepala Desa Kadugenep usai menerima piagam dan trofi penghargaan.
    `,
    author: "Humas Pemdes Kadugenep",
    date: "2026-09-24",
    image: "/images/radar-banten-awards-2026.jpg",
    views: 1850,
    featured: true,
  },
  {
    id: "art-2",
    slug: "liputan-khusus-banten-tv-sentra-tas-dan-kearifan-desa-kadugenep",
    title: "Liputan Khusus Banten TV: Mengupas Tuntas Kisah Sentra Kerajinan Tas & Potensi Alam Kadugenep",
    category: "Ekonomi & UMKM",
    summary:
      "Tim jurnalis Banten TV melakukan peliputan eksklusif dan wawancara lapangan bersama Kepala Desa mengenai geliat 340+ bengkel mesin tas konveksi dan keasrian alam pedesaan.",
    content: `
      Keunikan dan ketangguhan ekonomi Desa Kadugenep menarik perhatian media regional Banten TV. Bertempat di tengah keteduhan rumpun bambu alam desa, kru redaksi Banten TV menggelar sesi wawancara khusus bersama Kepala Desa Kadugenep dan perwakilan pelaku usaha konveksi tas lokal.

      Liputan ini menyoroti bagaimana warga Desa Kadugenep secara mandiri mentransformasikan desa kecil di Kecamatan Petir menjadi salah satu sentra produksi tas terbesar di Banten yang menyuplai produk ke pasar grosir nasional.

      Selain sektor kerajinan, program dokumenter ini juga mengeksplorasi potensi pertanian berkelanjutan, kekayaan kearifan lokal 'Soméah Hadé ka Sémah', serta keramahan warga pedesaan Kadugenep.
    `,
    author: "Redaksi Warta Banten",
    date: "2026-09-22",
    image: "/images/liputan-banten-tv.jpg",
    views: 1540,
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=T-M4QR6n6Jc",
    videoTitle: "Liputan Khusus Banten TV: Geliat Sentra Tas Kadugenep & Kearifan Warga",
  },
  {
    id: "art-3",
    slug: "kades-kadugenep-hadiri-layanan-posyandu-kutilang-2-cegah-stunting",
    title: "Kades Kadugenep Tinjau Langsung Pelayanan Posyandu Kutilang 2: Pastikan Generasi Sehat & Bebas Stunting",
    category: "Kegiatan Warga",
    summary:
      "Kepala Desa bersama bidan desa dan kader Posyandu Kutilang 2 memantau penimbangan balita, pemberian gizi tambahan, serta edukasi kesehatan keluarga bagi warga desa.",
    content: `
      Komitmen Pemerintah Desa Kadugenep dalam meningkatkan derajat kesehatan masyarakat diwujudkan melalui kunjungan langsung Kepala Desa ke Gedung Pelayanan Posyandu Kutilang 2 Desa Kadugenep.

      Dalam kegiatan rutin ini, puluhan ibu dan balita mendapatkan layanan penimbangan berat badan, pengukuran tinggi badan, imunisasi dasar, serta pembagian makanan tambahan (PMT) bergizi tinggi berbahan pangan lokal.

      Kepala Desa mengapresiasi keaktifan para kader Posyandu dan mengajak seluruh orang tua di Kadugenep untuk terus rutin memantau tumbuh kembang putra-putrinya demi mencetak generasi emas Kadugenep yang cerdas, sehat, dan berdaya saing.
    `,
    author: "Kader Posyandu Kutilang 2",
    date: "2026-09-19",
    image: "/images/kegiatan-posyandu.jpg",
    views: 1120,
    featured: false,
  },
  {
    id: "art-4",
    slug: "musrenbangdes-kadugenep-susun-du-rkp-2028-dan-rkp-2027",
    title: "Musrenbangdes Kadugenep Sukses Digelar: Rancang DU-RKP 2028 & Tetapkan RKP Desa TA 2027",
    category: "Pembangunan",
    summary:
      "Musyawarah mufakat dihadiri BPD, LPM, tokoh agama, ketua RT/RW, dan pemuda menyepakati fokus anggaran pada infrastruktur jalan sentra, drainase, dan permodalan UMKM.",
    content: `
      Bertempat di Gedung Olahraga / Balai Desa Kadugenep, agenda tahunan Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) dalam rangka Penyusunan DU-RKP TA 2028 dan Penetapan RKP Desa TA 2027 berlangsung dengan penuh semangat kebersamaan.

      Forum menyepakati sejumlah skala prioritas pembangunan, di antaranya:
      1. Pemeliharaan dan rabat beton jalur akses utama sentra pengrajin tas.
      2. Normalisasi saluran drainase permukiman dan irigasi persawahan lumbung pangan.
      3. Penguatan sarana prasarana pos pelayanan kesehatan terpadu di setiap kedusunan.
      4. Pelatihan digitalisasi pemasaran produk UMKM konveksi bagi pemuda karang taruna.
    `,
    author: "Tim Perencanaan Pembangunan Desa",
    date: "2026-09-15",
    image: "/images/musrenbangdes-kadugenep.jpg",
    views: 980,
    featured: false,
  },
  {
    id: "art-5",
    slug: "kadugenep-seribu-mesin-tembus-pasar-nasional",
    title: "Geliat Pengrajin Tas Kadugenep: Dari Bengkel Desa Menembus Pasar Ritel Nasional",
    category: "Ekonomi & UMKM",
    summary:
      "Dengan lebih dari 340 unit bengkel konveksi mandiri, Desa Kadugenep memperkuat digitalisasi pemasaran tas lokal untuk memenuhi permintaan distributor di Jabodetabek dan luar pulau.",
    content: `
      Desa Kadugenep di Kecamatan Petir, Kabupaten Serang, kian mengukuhkan posisinya sebagai sentra konveksi tas terkemuka di Provinsi Banten. Dijuluki sebagai 'Desa Kecil Seribu Mesin', puluhan rumah warga sehari-hari berdengung suara mesin jahit yang merajut beragam produk tas berkualitas.

      Pemerintah Desa Kadugenep bersama Dinas Koperasi dan UMKM terus memberikan pendampingan legalitas NIB, standarisasi mutu jahitan, serta fasilitasi pelatihan pemasaran digital.
    `,
    author: "Redaksi Warta Kadugenep",
    date: "2026-09-10",
    image: "/images/kerajinan-tas.jpg",
    views: 1420,
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
