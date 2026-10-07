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

export const CANONICAL_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.desakadugenep.my.id";

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

export function findArticleBySlug(
  slug: string,
  list: Article[] = INITIAL_ARTICLES
): Article | undefined {
  if (!slug) return undefined;
  const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();

  return (
    list.find((a) => a.slug?.toLowerCase() === decodedSlug || a.id?.toLowerCase() === decodedSlug) ||
    INITIAL_ARTICLES.find((a) => a.slug?.toLowerCase() === decodedSlug || a.id?.toLowerCase() === decodedSlug) ||
    (decodedSlug.includes("posyandu")
      ? list.find((a) => a.slug.includes("posyandu"))
      : null) ||
    (decodedSlug.includes("radar") || decodedSlug.includes("inovatif")
      ? list.find((a) => a.slug.includes("radar-banten"))
      : null) ||
    (decodedSlug.includes("banten-tv") || decodedSlug.includes("liputan")
      ? list.find((a) => a.slug.includes("banten-tv"))
      : null) ||
    (decodedSlug.includes("musrenbang")
      ? list.find((a) => a.slug.includes("musrenbang"))
      : null) ||
    (decodedSlug.includes("tas") || decodedSlug.includes("mesin")
      ? list.find((a) => a.slug.includes("tas"))
      : null) ||
    undefined
  );
}

export function getAbsoluteImageUrl(imagePath?: string, baseUrl: string = CANONICAL_SITE_URL): string {
  if (!imagePath) return `${baseUrl}/images/hero-kadugenep.jpg`;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${baseUrl}${cleanPath}`;
}

export async function getArticleBySlugServer(slug: string): Promise<Article | undefined> {
  if (!slug) return undefined;
  const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();

  // 1. Check in INITIAL_ARTICLES
  const localMatch = findArticleBySlug(decodedSlug, INITIAL_ARTICLES);
  if (localMatch) return localMatch;

  // 2. Query Supabase directly
  try {
    const { supabaseAdmin } = await import("./supabase");
    const { data: rows, error } = await supabaseAdmin
      .from("articles")
      .select("*")
      .or(`slug.eq.${decodedSlug},id.eq.${decodedSlug}`)
      .limit(1);

    if (!error && rows && rows.length > 0) {
      const r = rows[0];
      return {
        id: r.id,
        slug: r.slug,
        title: r.title,
        category: r.category,
        summary: r.summary,
        content: r.content,
        author: r.author,
        date: r.date,
        image: r.image,
        views: Number(r.views) || 1,
        featured: Boolean(r.featured),
        videoUrl: r.video_url || undefined,
        videoTitle: r.video_title || undefined,
      };
    }
  } catch (err) {
    console.warn("Could not fetch article by slug from Supabase:", err);
  }

  return undefined;
}

