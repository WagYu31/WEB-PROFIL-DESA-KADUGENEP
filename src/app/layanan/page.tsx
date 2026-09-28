"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  CheckCircle,
  Clock,
  WhatsappLogo,
  ArrowLeft,
  IdentificationCard,
  ShieldCheck,
  Info,
  Tote,
  GraduationCap,
  House,
  Briefcase,
  MapPin,
  Buildings,
  ShieldPlus,
  Hospital,
} from "@phosphor-icons/react";
import { useVillageStore } from "@/lib/data-store";

type ServiceId = "sku" | "skck" | "domisili" | "sktm" | "sktm_pbi" | "sktm_rsud";

interface ServiceTypeConfig {
  id: ServiceId;
  title: string;
  shortName: string;
  badge: string;
  icon: React.ReactNode;
  description: string;
  reqs: string[];
}

const SERVICE_TYPES: ServiceTypeConfig[] = [
  {
    id: "sku",
    title: "Surat Keterangan Usaha (SKU)",
    shortName: "SKU",
    badge: "UMKM & Usaha",
    icon: <Tote size={20} className="text-sky-600" />,
    description: "Untuk pemilik bengkel konveksi tas, peternak, pedagang, dan petani yang membutuhkan pengantar permodalan/perbankan.",
    reqs: [
      "Foto KTP Asli Pemilik Usaha",
      "Foto Kartu Keluarga (KK)",
      "Surat Pengantar dari Ketua RT/RW setempat",
      "Foto Lokasi / Aktivitas Bengkel Usaha",
    ],
  },
  {
    id: "skck",
    title: "Surat Pengantar SKCK",
    shortName: "SKCK",
    badge: "Kepolisian & Karir",
    icon: <Briefcase size={20} className="text-blue-600" />,
    description: "Untuk pengantar resmi penerbitan Surat Keterangan Catatan Kepolisian di Polsek Petir atau Polres Serang.",
    reqs: [
      "Fotokopi KTP Pemohon",
      "Fotokopi Kartu Keluarga (KK)",
      "Surat Pengantar RT/RW Kadugenep",
      "Pas Foto 4x6 latar merah (2 lembar saat ke Polsek)",
    ],
  },
  {
    id: "domisili",
    title: "Surat Keterangan Domisili",
    shortName: "Domisili",
    badge: "Kependudukan",
    icon: <House size={20} className="text-indigo-600" />,
    description: "Keterangan resmi kependudukan tempat tinggal sementara atau tetap bagi warga di wilayah Desa Kadugenep.",
    reqs: [
      "Fotokopi KTP Pemohon",
      "Fotokopi Kartu Keluarga (KK)",
      "Surat Pengantar RT/RW setempat",
      "Surat Pindah dari desa asal (khusus warga pendatang baru)",
    ],
  },
  {
    id: "sktm",
    title: "Surat Keterangan Tidak Mampu (SKTM) - Pendidikan",
    shortName: "SKTM Sekolah",
    badge: "Pendidikan & Sekolah",
    icon: <GraduationCap size={20} className="text-emerald-600" />,
    description: "Untuk pengajuan beasiswa pendidikan (KIP Kuliah/PIP), keringanan SPP sekolah/kuliah, atau bantuan perlengkapan belajar.",
    reqs: [
      "KTP Asli Kepala Keluarga & Pemohon",
      "Kartu Keluarga (KK) Kadugenep",
      "Surat Pengantar RT/RW menyatakan kondisi ekonomi",
      "Kartu Pelajar / Mahasiswa atau Surat Keterangan Sekolah",
    ],
  },
  {
    id: "sktm_pbi",
    title: "Surat Keterangan Tidak Mampu (SKTM PBI)",
    shortName: "SKTM PBI",
    badge: "BPJS PBI / KIS",
    icon: <ShieldPlus size={20} className="text-teal-600" />,
    description: "Untuk pengajuan kepesertaan atau pengaktifan kembali BPJS Kesehatan PBI-JKN (gratis ditanggung pemerintah) bagi keluarga prasejahtera.",
    reqs: [
      "Fotokopi KTP Pemohon & Kepala Keluarga",
      "Fotokopi Kartu Keluarga (KK) Kadugenep",
      "Surat Pengantar RT/RW setempat",
      "Kartu KIS/BPJS lama (jika ada / pengaktifan kembali)",
      "Surat Pernyataan Penghasilan / Tidak Mampu bermaterai",
    ],
  },
  {
    id: "sktm_rsud",
    title: "Surat Keterangan Tidak Mampu (SKTM Pengobatan RSUD)",
    shortName: "SKTM RSUD",
    badge: "Kesehatan & Rujukan RS",
    icon: <Hospital size={20} className="text-rose-600" />,
    description: "Untuk rekomendasi keringanan biaya perawatan medis, tindakan operasi darurat, atau rawat inap di RSUD Banten / RSDP Serang.",
    reqs: [
      "Fotokopi KTP Pasien & KTP Penanggung Jawab",
      "Fotokopi Kartu Keluarga (KK) Kadugenep",
      "Surat Pengantar RT/RW menyatakan kondisi keluarga tidak mampu",
      "Surat Keterangan Rawat Inap / Rujukan / Tagihan dari RSUD",
      "Surat Pernyataan Tidak Memiliki Asuransi Kesehatan Aktif",
    ],
  },
];

export default function LayananPage() {
  const { saveServiceRequests, serviceRequests } = useVillageStore();

  const [activeTypeId, setActiveTypeId] = useState<ServiceId>("sku");

  // Common Core Fields
  const [coreForm, setCoreForm] = useState({
    name: "",
    nik: "",
    whatsapp: "",
  });

  // Dynamic Specific Fields for SKU
  const [skuForm, setSkuForm] = useState({
    namaUsaha: "",
    jenisUsaha: "Konveksi & Kerajinan Tas",
    alamatUsaha: "RT 04 / RW 02, Kadugenep",
    tahunMulai: "2020",
    jumlahMesin: "6 Unit Mesin Jahit",
    keperluan: "Pengajuan Pinjaman Modal Usaha KUR Bank",
    catatanTambahan: "",
  });

  // Dynamic Specific Fields for SKCK
  const [skckForm, setSkckForm] = useState({
    tempatLahir: "Serang",
    tanggalLahir: "1998-05-14",
    jenisKelamin: "Laki-laki",
    agama: "Islam",
    pekerjaan: "Wiraswasta / Karyawan",
    pendidikanTerakhir: "SMA / SMK Sederajat",
    keperluan: "Melamar Pekerjaan di Perusahaan Swasta / BUMN",
    tujuanPolsek: "Polsek Petir",
  });

  // Dynamic Specific Fields for Domisili
  const [domisiliForm, setDomisiliForm] = useState({
    tempatLahir: "Serang",
    tanggalLahir: "1995-08-20",
    jenisKelamin: "Laki-laki",
    alamatKadugenep: "Kp. Kadugenep Babakan RT 03 / RW 01",
    statusTempatTinggal: "Rumah Sendiri",
    tinggalSejak: "Sejak Lahir",
    alamatAsal: "-",
    keperluan: "Pembukaan Rekening Bank & Administrasi Kantor",
  });

  // Dynamic Specific Fields for SKTM
  const [sktmForm, setSktmForm] = useState({
    noKK: "",
    namaAnggota: "",
    hubunganKeluarga: "Anak Kandung",
    pekerjaanKK: "Buruh Konveksi / Petani",
    penghasilanBulanan: "< Rp 1.500.000",
    jumlahTanggungan: "3 Orang",
    keperluan: "Pendaftaran Beasiswa KIP Kuliah / PIP Sekolah",
    instansiTujuan: "Universitas / Sekolah Terkait",
  });

  // Dynamic Specific Fields for SKTM PBI (BPJS PBI / KIS)
  const [sktmPbiForm, setSktmPbiForm] = useState({
    noKK: "",
    namaCalonPeserta: "",
    nikCalonPeserta: "",
    hubunganKeluarga: "Anak Kandung",
    pekerjaanKK: "Buruh Konveksi / Petani",
    penghasilanBulanan: "< Rp 1.000.000",
    jumlahAnggota: "4 Jiwa",
    statusDtks: "Belum Terdaftar / Perlu Cek Petugas Desa",
    alasanPengajuan: "Pendaftaran Baru BPJS PBI-JKN (Gratis Pemerintah)",
  });

  // Dynamic Specific Fields for SKTM Pengobatan RSUD
  const [sktmRsudForm, setSktmRsudForm] = useState({
    noKK: "",
    namaPasien: "",
    nikPasien: "",
    hubunganDenganPasien: "Orang Tua Kandung",
    namaRumahSakit: "RSUD Banten",
    statusPerawatan: "Rawat Inap (Sedang Dirawat di RS)",
    diagnosaPenyakit: "",
    pekerjaanPenanggungJawab: "Buruh Harian Lepas / Petani",
    penghasilanBulanan: "< Rp 1.000.000",
    keperluan: "Keringanan Biaya Perawatan & Rawat Inap RSUD",
  });

  // Submission receipt state
  const [submittedData, setSubmittedData] = useState<{
    receiptId: string;
    serviceTitle: string;
    citizenName: string;
    details: Record<string, string>;
  } | null>(null);

  const currentConfig = SERVICE_TYPES.find((s) => s.id === activeTypeId)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coreForm.name || !coreForm.nik || !coreForm.whatsapp) return;

    const receiptId = `KDG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    let details: Record<string, string> = {};
    let summaryNotes = "";

    if (activeTypeId === "sku") {
      details = {
        "Nama Usaha": skuForm.namaUsaha,
        "Jenis Usaha": skuForm.jenisUsaha,
        "Alamat Usaha": skuForm.alamatUsaha,
        "Mulai Beroperasi": skuForm.tahunMulai,
        "Kapasitas / Mesin": skuForm.jumlahMesin,
        "Keperluan SKU": skuForm.keperluan,
        "Catatan": skuForm.catatanTambahan || "-",
      };
      summaryNotes = `Usaha: ${skuForm.namaUsaha} (${skuForm.jenisUsaha}) - ${skuForm.keperluan}`;
    } else if (activeTypeId === "skck") {
      details = {
        "Tempat, Tanggal Lahir": `${skckForm.tempatLahir}, ${skckForm.tanggalLahir}`,
        "Jenis Kelamin": skckForm.jenisKelamin,
        "Agama / Pendidikan": `${skckForm.agama} / ${skckForm.pendidikanTerakhir}`,
        "Pekerjaan": skckForm.pekerjaan,
        "Keperluan SKCK": skckForm.keperluan,
        "Tujuan": skckForm.tujuanPolsek,
      };
      summaryNotes = `SKCK: ${skckForm.keperluan} (${skckForm.tujuanPolsek})`;
    } else if (activeTypeId === "domisili") {
      details = {
        "Tempat, Tanggal Lahir": `${domisiliForm.tempatLahir}, ${domisiliForm.tanggalLahir}`,
        "Alamat Domisili": domisiliForm.alamatKadugenep,
        "Status Tempat Tinggal": domisiliForm.statusTempatTinggal,
        "Menetap Sejak": domisiliForm.tinggalSejak,
        "Alamat Asal": domisiliForm.alamatAsal,
        "Keperluan Domisili": domisiliForm.keperluan,
      };
      summaryNotes = `Domisili di: ${domisiliForm.alamatKadugenep} (${domisiliForm.keperluan})`;
    } else if (activeTypeId === "sktm") {
      details = {
        "Nomor Kartu Keluarga": sktmForm.noKK,
        "Nama yang Diajukan": sktmForm.namaAnggota,
        "Hubungan Keluarga": sktmForm.hubunganKeluarga,
        "Pekerjaan Kepala Keluarga": sktmForm.pekerjaanKK,
        "Penghasilan Bulanan": sktmForm.penghasilanBulanan,
        "Tanggungan": sktmForm.jumlahTanggungan,
        "Keperluan SKTM": sktmForm.keperluan,
        "Tujuan Instansi": sktmForm.instansiTujuan,
      };
      summaryNotes = `SKTM Sekolah untuk ${sktmForm.namaAnggota} (${sktmForm.keperluan})`;
    } else if (activeTypeId === "sktm_pbi") {
      details = {
        "Nomor Kartu Keluarga": sktmPbiForm.noKK,
        "Nama Calon Peserta PBI": sktmPbiForm.namaCalonPeserta || coreForm.name,
        "NIK Calon Peserta": sktmPbiForm.nikCalonPeserta || coreForm.nik,
        "Hubungan Keluarga": sktmPbiForm.hubunganKeluarga,
        "Pekerjaan Kepala Keluarga": sktmPbiForm.pekerjaanKK,
        "Penghasilan Bulanan": sktmPbiForm.penghasilanBulanan,
        "Jumlah Jiwa dalam KK": sktmPbiForm.jumlahAnggota,
        "Status DTKS": sktmPbiForm.statusDtks,
        "Alasan Pengajuan": sktmPbiForm.alasanPengajuan,
      };
      summaryNotes = `SKTM PBI: ${sktmPbiForm.namaCalonPeserta || coreForm.name} (${sktmPbiForm.alasanPengajuan})`;
    } else if (activeTypeId === "sktm_rsud") {
      details = {
        "Nomor Kartu Keluarga": sktmRsudForm.noKK,
        "Nama Pasien": sktmRsudForm.namaPasien || coreForm.name,
        "NIK Pasien": sktmRsudForm.nikPasien || coreForm.nik,
        "Hubungan dengan Pasien": sktmRsudForm.hubunganDenganPasien,
        "Rumah Sakit Tujuan": sktmRsudForm.namaRumahSakit,
        "Status Perawatan": sktmRsudForm.statusPerawatan,
        "Diagnosa / Keluhan": sktmRsudForm.diagnosaPenyakit || "-",
        "Pekerjaan Penanggung Jawab": sktmRsudForm.pekerjaanPenanggungJawab,
        "Penghasilan Bulanan": sktmRsudForm.penghasilanBulanan,
        "Keperluan Pengobatan": sktmRsudForm.keperluan,
      };
      summaryNotes = `SKTM RSUD: ${sktmRsudForm.namaPasien || coreForm.name} di ${sktmRsudForm.namaRumahSakit} (${sktmRsudForm.statusPerawatan})`;
    }

    const newReq = {
      id: receiptId,
      citizenName: coreForm.name,
      nik: coreForm.nik,
      serviceType: currentConfig.title,
      whatsapp: coreForm.whatsapp,
      notes: summaryNotes,
      details,
      createdAt: new Date().toISOString().split("T")[0],
      status: "Menunggu" as const,
    };

    saveServiceRequests([newReq, ...serviceRequests]);
    setSubmittedData({
      receiptId,
      serviceTitle: currentConfig.title,
      citizenName: coreForm.name,
      details,
    });

    // Reset core form
    setCoreForm({ name: "", nik: "", whatsapp: "" });
  };

  return (
    <div className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-sky-700 transition-colors mb-6 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Kembali ke Beranda</span>
      </Link>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200 mb-3">
          <FileText size={16} />
          <span>Pelayanan Publik Terpadu</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Layanan Persuratan Mandiri Warga
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Pilih salah satu dari 6 jenis persuratan resmi di bawah ini. Formulir akan secara otomatis menyesuaikan kolom isian khusus sesuai standar administrasi Pemerintah Desa Kadugenep.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 6 Service Type Selector Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <IdentificationCard size={18} className="text-sky-700" />
              <span>Pilih Jenis Surat (6 Pilihan):</span>
            </h2>
          </div>

          <div className="space-y-3">
            {SERVICE_TYPES.map((service) => {
              const isSelected = activeTypeId === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setActiveTypeId(service.id);
                    setSubmittedData(null);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? "bg-white border-sky-600 shadow-lg ring-2 ring-sky-600/20"
                      : "bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${isSelected ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-600"}`}>
                        {service.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {service.badge}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">{service.title}</h3>
                      </div>
                    </div>

                    {isSelected && (
                      <CheckCircle size={20} weight="fill" className="text-sky-600 shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{service.description}</p>

                  {/* Requirements checklist preview */}
                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-slate-100 bg-sky-50/50 -mx-4 -mb-4 p-4 rounded-b-2xl">
                      <p className="text-[11px] font-bold text-sky-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Info size={14} className="text-sky-700" />
                        <span>Syarat Berkas yang Diperlukan:</span>
                      </p>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                        {service.reqs.map((req, rIdx) => (
                          <li key={rIdx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Service Time Info Card */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
            <p className="font-bold flex items-center gap-2 text-amber-900">
              <Clock size={16} />
              <span>Waktu Penyelesaian Surat:</span>
            </p>
            <p className="leading-relaxed">
              Surat yang diajukan pada jam kerja (Senin - Jumat 08:00 - 15:30 WIB) rata-rata selesai dalam waktu <strong>1–2 jam kerja</strong>. Anda dapat mengambil surat fisik di Kantor Balai Desa Kadugenep setelah diverifikasi.
            </p>
          </div>

          {/* Real Office Building & Physical Service Window Card */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-3.5 overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
                <Buildings size={15} />
                <span>Kantor & Loket Pelayanan</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Tatap Muka
              </span>
            </div>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
              <Image
                src="/images/kantor-desa-kadugenep.jpg"
                alt="Kantor Balai Desa Kadugenep dan Loket Pelayanan"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <p className="text-xs font-bold leading-tight drop-shadow">Balai Desa Kadugenep</p>
                <p className="text-[10px] text-slate-200 drop-shadow">Pengambilan Berkas Fisik & Stempel</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-sky-700 shrink-0 mt-0.5" />
                <span>Jl. Raya Petir - Serang Km. 3, Desa Kadugenep, Kec. Petir</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                Setelah mengisi permohonan online dan verifikasi selesai, warga dapat mengambil surat asli bertanda tangan Kepala Desa di loket pelayanan ini.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Form tailored for each of the 4 types */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
            
            {/* Header Form with Current Letter Type Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Formulir Khusus
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {currentConfig.title}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200 w-fit">
                {currentConfig.badge}
              </span>
            </div>

            {submittedData ? (
              /* Success Receipt View */
              <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-200 text-center space-y-5 animate-fadeIn">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 text-white mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle size={32} weight="bold" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-950">Permohonan Berhasil Diajukan!</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Nomor Resi Pelayanan Digital Desa Kadugenep:
                  </p>
                  <p className="text-2xl font-mono font-black text-sky-900 mt-2 bg-white py-2 px-5 rounded-xl inline-block border border-sky-300 shadow-sm">
                    {submittedData.receiptId}
                  </p>
                </div>

                {/* Summary Table of specific submitted fields */}
                <div className="text-left bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <p className="font-bold text-slate-900 pb-1 border-b border-slate-100">
                    Rincian Berkas Permohonan:
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 text-slate-600">
                    <span className="font-medium text-slate-500">Nama Pemohon:</span>
                    <span className="font-bold text-slate-900">{submittedData.citizenName}</span>
                    <span className="font-medium text-slate-500">Jenis Layanan:</span>
                    <span className="font-bold text-sky-800">{submittedData.serviceTitle}</span>
                    {Object.entries(submittedData.details).map(([k, v]) => (
                      <React.Fragment key={k}>
                        <span className="font-medium text-slate-500">{k}:</span>
                        <span className="font-semibold text-slate-800">{v}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <a
                    href={`https://wa.me/6283857178552?text=Halo%20Pelayanan%20Desa%20Kadugenep,%20saya%20telah%20mengajukan%20${encodeURIComponent(submittedData.serviceTitle)}%20dengan%20nomor%20resi%20${submittedData.receiptId}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow"
                  >
                    <WhatsappLogo size={16} weight="fill" />
                    <span>Konfirmasi WhatsApp Petugas</span>
                  </a>
                  <button
                    onClick={() => setSubmittedData(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
                  >
                    Ajukan Surat Baru
                  </button>
                </div>
              </div>
            ) : (
              /* The Dynamic Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Section A: Core Identity Information (All letter types) */}
                <div className="space-y-3.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">1</span>
                    <span>Data Identitas Pemohon (Sesuai KTP Kadugenep)</span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nama Lengkap Pemohon *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Muhammad Arsenio"
                        value={coreForm.name}
                        onChange={(e) => setCoreForm({ ...coreForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nomor Induk Kependudukan (NIK 16 Digit) *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={16}
                        placeholder="Contoh: 360412xxxxxxxxxx"
                        value={coreForm.nik}
                        onChange={(e) => setCoreForm({ ...coreForm, nik: e.target.value.replace(/\D/g, "") })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={coreForm.whatsapp}
                        onChange={(e) => setCoreForm({ ...coreForm, whatsapp: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: SPECIFIC DYNAMIC FIELDS ACCORDING TO LETTER TYPE */}
                <div className="pt-4 border-t border-slate-200/80 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-[10px] font-bold">2</span>
                    <span>Rincian Khusus Dokumen: {currentConfig.shortName}</span>
                  </p>

                  {/* 1. DYNAMIC FIELDS FOR SKU */}
                  {activeTypeId === "sku" && (
                    <div className="space-y-3.5 bg-sky-50/40 p-4 rounded-2xl border border-sky-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nama Usaha / Bengkel *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Konveksi Tas Berkah Mandiri"
                            value={skuForm.namaUsaha}
                            onChange={(e) => setSkuForm({ ...skuForm, namaUsaha: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Sektor / Bidang Usaha *
                          </label>
                          <select
                            value={skuForm.jenisUsaha}
                            onChange={(e) => setSkuForm({ ...skuForm, jenisUsaha: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Konveksi & Kerajinan Tas">Konveksi & Kerajinan Tas</option>
                            <option value="Pertanian Padi & Palawija">Pertanian Padi & Palawija</option>
                            <option value="Peternakan & Perikanan">Peternakan & Perikanan</option>
                            <option value="Toko Kelontong & Perdagangan">Toko Kelontong & Perdagangan</option>
                            <option value="Bengkel Motor & Jasa Las">Bengkel Motor & Jasa Las</option>
                            <option value="Kuliner & Warung Makan">Kuliner & Warung Makan</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Alamat Lokasi Usaha di Kadugenep *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Kp. Kadugenep RT 04 / RW 02"
                            value={skuForm.alamatUsaha}
                            onChange={(e) => setSkuForm({ ...skuForm, alamatUsaha: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Tahun Mulai Beroperasi *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: 2019"
                            value={skuForm.tahunMulai}
                            onChange={(e) => setSkuForm({ ...skuForm, tahunMulai: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Kapasitas / Jumlah Mesin / Pekerja
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: 8 Mesin Jahit, 4 Karyawan"
                            value={skuForm.jumlahMesin}
                            onChange={(e) => setSkuForm({ ...skuForm, jumlahMesin: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Tujuan / Keperluan SKU *
                          </label>
                          <select
                            value={skuForm.keperluan}
                            onChange={(e) => setSkuForm({ ...skuForm, keperluan: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Pengajuan Pinjaman Modal Usaha KUR Bank">Pengajuan KUR Bank (BRI/Mandiri/BJB)</option>
                            <option value="Pembuatan NIB & Izin Usaha OSS">Pembuatan NIB & Izin Usaha OSS</option>
                            <option value="Syarat Kemitraan Distributor Luar Kota">Syarat Kemitraan Distributor Luar Kota</option>
                            <option value="Bantuan Stimulan UMKM Pemerintah">Bantuan Stimulan UMKM Pemerintah</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. DYNAMIC FIELDS FOR SKCK */}
                  {activeTypeId === "skck" && (
                    <div className="space-y-3.5 bg-blue-50/40 p-4 rounded-2xl border border-blue-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Tempat Lahir *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Serang"
                            value={skckForm.tempatLahir}
                            onChange={(e) => setSkckForm({ ...skckForm, tempatLahir: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Tanggal Lahir *
                          </label>
                          <input
                            type="date"
                            required
                            value={skckForm.tanggalLahir}
                            onChange={(e) => setSkckForm({ ...skckForm, tanggalLahir: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Jenis Kelamin *
                          </label>
                          <select
                            value={skckForm.jenisKelamin}
                            onChange={(e) => setSkckForm({ ...skckForm, jenisKelamin: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Pendidikan Terakhir *
                          </label>
                          <select
                            value={skckForm.pendidikanTerakhir}
                            onChange={(e) => setSkckForm({ ...skckForm, pendidikanTerakhir: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="SMA / SMK Sederajat">SMA / SMK Sederajat</option>
                            <option value="Diploma (D3)">Diploma (D3)</option>
                            <option value="Sarjana (S1)">Sarjana (S1)</option>
                            <option value="Magister (S2)">Magister (S2)</option>
                            <option value="SMP Sederajat">SMP Sederajat</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Keperluan Pembuatan SKCK *
                          </label>
                          <select
                            value={skckForm.keperluan}
                            onChange={(e) => setSkckForm({ ...skckForm, keperluan: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Melamar Pekerjaan di Perusahaan Swasta / BUMN">Melamar Pekerjaan di Perusahaan Swasta / BUMN</option>
                            <option value="Pendaftaran Seleksi CPNS / PPPK">Pendaftaran Seleksi CPNS / PPPK</option>
                            <option value="Pendaftaran TNI / POLRI">Pendaftaran TNI / POLRI</option>
                            <option value="Melanjutkan Jenjang Pendidikan / Kuliah">Melanjutkan Jenjang Pendidikan / Kuliah</option>
                            <option value="Persyaratan Pencalonan / Sertifikasi">Persyaratan Pencalonan / Sertifikasi</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Kantor Polisi Tujuan Verifikasi
                          </label>
                          <input
                            type="text"
                            value={skckForm.tujuanPolsek}
                            onChange={(e) => setSkckForm({ ...skckForm, tujuanPolsek: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. DYNAMIC FIELDS FOR DOMISILI */}
                  {activeTypeId === "domisili" && (
                    <div className="space-y-3.5 bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Tempat Lahir *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Serang"
                            value={domisiliForm.tempatLahir}
                            onChange={(e) => setDomisiliForm({ ...domisiliForm, tempatLahir: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Tanggal Lahir *
                          </label>
                          <input
                            type="date"
                            required
                            value={domisiliForm.tanggalLahir}
                            onChange={(e) => setDomisiliForm({ ...domisiliForm, tanggalLahir: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Alamat Lengkap Domisili di Kadugenep *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Kp. Kadugenep Babakan RT 03 / RW 01, Dusun 1"
                            value={domisiliForm.alamatKadugenep}
                            onChange={(e) => setDomisiliForm({ ...domisiliForm, alamatKadugenep: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Status Kepemilikan Tempat Tinggal *
                          </label>
                          <select
                            value={domisiliForm.statusTempatTinggal}
                            onChange={(e) => setDomisiliForm({ ...domisiliForm, statusTempatTinggal: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Rumah Milik Sendiri">Rumah Milik Sendiri</option>
                            <option value="Sewa / Kontrak">Sewa / Kontrak</option>
                            <option value="Menumpang Keluarga / Orang Tua">Menumpang Keluarga / Orang Tua</option>
                            <option value="Rumah Dinas / Asrama">Rumah Dinas / Asrama</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Menetap di Alamat Ini Sejak *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Januari 2021 atau Sejak Lahir"
                            value={domisiliForm.tinggalSejak}
                            onChange={(e) => setDomisiliForm({ ...domisiliForm, tinggalSejak: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Keperluan Surat Domisili *
                          </label>
                          <select
                            value={domisiliForm.keperluan}
                            onChange={(e) => setDomisiliForm({ ...domisiliForm, keperluan: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Pembukaan Rekening Bank & Administrasi Kantor">Pembukaan Rekening Bank & Administrasi Kantor</option>
                            <option value="Persyaratan Masuk Kerja / Perusahaan">Persyaratan Masuk Kerja / Perusahaan</option>
                            <option value="Pendaftaran Sekolah / Zonasi Pendidikan">Pendaftaran Sekolah / Zonasi Pendidikan</option>
                            <option value="Pengajuan Paspor / Dokumen Kependudukan">Pengajuan Paspor / Dokumen Kependudukan</option>
                            <option value="Keterangan Pindah Sementara">Keterangan Pindah Sementara</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. DYNAMIC FIELDS FOR SKTM */}
                  {activeTypeId === "sktm" && (
                    <div className="space-y-3.5 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nomor Kartu Keluarga (No KK 16 Digit) *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={16}
                            placeholder="Contoh: 360412xxxxxxxxxx"
                            value={sktmForm.noKK}
                            onChange={(e) => setSktmForm({ ...sktmForm, noKK: e.target.value.replace(/\D/g, "") })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nama Anggota Keluarga yang Diajukan *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nama Siswa / Anak / Pasien"
                            value={sktmForm.namaAnggota}
                            onChange={(e) => setSktmForm({ ...sktmForm, namaAnggota: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Hubungan dengan Kepala Keluarga *
                          </label>
                          <select
                            value={sktmForm.hubunganKeluarga}
                            onChange={(e) => setSktmForm({ ...sktmForm, hubunganKeluarga: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Anak Kandung">Anak Kandung</option>
                            <option value="Diri Sendiri (Kepala Keluarga)">Diri Sendiri (Kepala Keluarga)</option>
                            <option value="Istri">Istri</option>
                            <option value="Orang Tua / Lansia">Orang Tua / Lansia</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Pekerjaan Kepala Keluarga *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Buruh Harian Lepas / Petani"
                            value={sktmForm.pekerjaanKK}
                            onChange={(e) => setSktmForm({ ...sktmForm, pekerjaanKK: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Rata-rata Penghasilan Bulanan *
                          </label>
                          <select
                            value={sktmForm.penghasilanBulanan}
                            onChange={(e) => setSktmForm({ ...sktmForm, penghasilanBulanan: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="< Rp 1.000.000">&lt; Rp 1.000.000 / bulan</option>
                            <option value="Rp 1.000.000 - Rp 1.500.000">Rp 1.000.000 - Rp 1.500.000 / bulan</option>
                            <option value="Rp 1.500.000 - Rp 2.000.000">Rp 1.500.000 - Rp 2.000.000 / bulan</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Jumlah Tanggungan Keluarga
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: 4 Orang"
                            value={sktmForm.jumlahTanggungan}
                            onChange={(e) => setSktmForm({ ...sktmForm, jumlahTanggungan: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Tujuan Pengajuan SKTM *
                          </label>
                          <select
                            value={sktmForm.keperluan}
                            onChange={(e) => setSktmForm({ ...sktmForm, keperluan: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Pendaftaran Beasiswa KIP Kuliah / PIP Sekolah">Beasiswa Pendidikan (KIP Kuliah / PIP Sekolah)</option>
                            <option value="Keringanan Biaya Rumah Sakit & Pengobatan">Keringanan Biaya Rumah Sakit & Pengobatan</option>
                            <option value="Pengajuan BPJS PBI / KIS Bantuan Pemerintah">Pengajuan BPJS Kesehatan PBI / KIS Gratis</option>
                            <option value="Bantuan Sosial & Kebutuhan Pokok">Pengajuan Bantuan Sosial / PKH</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nama Sekolah / Universitas / RS Tujuan
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: Universitas Sultan Ageng Tirtayasa (UNTIRTA) / RSUD Banten"
                            value={sktmForm.instansiTujuan}
                            onChange={(e) => setSktmForm({ ...sktmForm, instansiTujuan: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. DYNAMIC FIELDS FOR SKTM PBI (BPJS PBI / KIS) */}
                  {activeTypeId === "sktm_pbi" && (
                    <div className="space-y-3.5 bg-teal-50/40 p-4 rounded-2xl border border-teal-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nomor Kartu Keluarga (No KK 16 Digit) *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={16}
                            placeholder="Contoh: 360412xxxxxxxxxx"
                            value={sktmPbiForm.noKK}
                            onChange={(e) => setSktmPbiForm({ ...sktmPbiForm, noKK: e.target.value.replace(/\D/g, "") })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nama Calon Peserta BPJS PBI *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nama yang diajukan untuk BPJS PBI"
                            value={sktmPbiForm.namaCalonPeserta}
                            onChange={(e) => setSktmPbiForm({ ...sktmPbiForm, namaCalonPeserta: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            NIK Calon Peserta (16 Digit) *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={16}
                            placeholder="Contoh: 360412xxxxxxxxxx"
                            value={sktmPbiForm.nikCalonPeserta}
                            onChange={(e) => setSktmPbiForm({ ...sktmPbiForm, nikCalonPeserta: e.target.value.replace(/\D/g, "") })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Hubungan dengan Kepala Keluarga *
                          </label>
                          <select
                            value={sktmPbiForm.hubunganKeluarga}
                            onChange={(e) => setSktmPbiForm({ ...sktmPbiForm, hubunganKeluarga: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Diri Sendiri (Kepala Keluarga)">Diri Sendiri (Kepala Keluarga)</option>
                            <option value="Istri">Istri</option>
                            <option value="Anak Kandung">Anak Kandung</option>
                            <option value="Orang Tua / Lansia">Orang Tua / Lansia</option>
                            <option value="Famili Lain">Famili Lain</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Pekerjaan Kepala Keluarga *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Buruh Konveksi / Petani / Pedagang"
                            value={sktmPbiForm.pekerjaanKK}
                            onChange={(e) => setSktmPbiForm({ ...sktmPbiForm, pekerjaanKK: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Rata-rata Penghasilan Bulanan *
                          </label>
                          <select
                            value={sktmPbiForm.penghasilanBulanan}
                            onChange={(e) => setSktmPbiForm({ ...sktmPbiForm, penghasilanBulanan: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="< Rp 1.000.000">&lt; Rp 1.000.000 / bulan</option>
                            <option value="Rp 1.000.000 - Rp 1.500.000">Rp 1.000.000 - Rp 1.500.000 / bulan</option>
                            <option value="Tidak Menentu (Penghasilan Harian)">Tidak Menentu (Penghasilan Harian)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Jumlah Jiwa dalam KK *
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: 4 Jiwa"
                            value={sktmPbiForm.jumlahAnggota}
                            onChange={(e) => setSktmPbiForm({ ...sktmPbiForm, jumlahAnggota: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Status Terdaftar DTKS Kemensos *
                          </label>
                          <select
                            value={sktmPbiForm.statusDtks}
                            onChange={(e) => setSktmPbiForm({ ...sktmPbiForm, statusDtks: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Belum Terdaftar / Perlu Cek Petugas Desa">Belum Terdaftar / Perlu Cek Petugas Desa</option>
                            <option value="Sudah Terdaftar di DTKS Kemensos">Sudah Terdaftar di DTKS Kemensos</option>
                            <option value="Pernah Terdaftar tapi KIS Non-Aktif">Pernah Terdaftar tapi KIS Non-Aktif</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Alasan / Keperluan Pengajuan PBI *
                          </label>
                          <select
                            value={sktmPbiForm.alasanPengajuan}
                            onChange={(e) => setSktmPbiForm({ ...sktmPbiForm, alasanPengajuan: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Pendaftaran Baru BPJS PBI-JKN (Gratis Pemerintah)">Pendaftaran Baru BPJS PBI-JKN (Gratis Pemerintah)</option>
                            <option value="Pengaktifan Kembali Kartu KIS PBI Non-Aktif">Pengaktifan Kembali Kartu KIS PBI Non-Aktif</option>
                            <option value="Pengalihan dari BPJS Mandiri Menunggak ke PBI">Pengalihan dari BPJS Mandiri Menunggak ke PBI</option>
                            <option value="Penambahan Anggota Keluarga Baru ke PBI">Penambahan Anggota Keluarga Baru ke PBI</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 6. DYNAMIC FIELDS FOR SKTM PENGOBATAN RSUD */}
                  {activeTypeId === "sktm_rsud" && (
                    <div className="space-y-3.5 bg-rose-50/40 p-4 rounded-2xl border border-rose-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nomor Kartu Keluarga (No KK 16 Digit) *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={16}
                            placeholder="Contoh: 360412xxxxxxxxxx"
                            value={sktmRsudForm.noKK}
                            onChange={(e) => setSktmRsudForm({ ...sktmRsudForm, noKK: e.target.value.replace(/\D/g, "") })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nama Pasien yang Sakit / Dirawat *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nama lengkap pasien sesuai KTP/KK"
                            value={sktmRsudForm.namaPasien}
                            onChange={(e) => setSktmRsudForm({ ...sktmRsudForm, namaPasien: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            NIK Pasien (16 Digit) *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={16}
                            placeholder="Contoh: 360412xxxxxxxxxx"
                            value={sktmRsudForm.nikPasien}
                            onChange={(e) => setSktmRsudForm({ ...sktmRsudForm, nikPasien: e.target.value.replace(/\D/g, "") })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Hubungan Pemohon dengan Pasien *
                          </label>
                          <select
                            value={sktmRsudForm.hubunganDenganPasien}
                            onChange={(e) => setSktmRsudForm({ ...sktmRsudForm, hubunganDenganPasien: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Diri Sendiri (Pasien Langsung)">Diri Sendiri (Pasien Langsung)</option>
                            <option value="Orang Tua Kandung">Orang Tua Kandung</option>
                            <option value="Anak Kandung">Anak Kandung</option>
                            <option value="Suami / Istri">Suami / Istri</option>
                            <option value="Saudara Kandung / Famili">Saudara Kandung / Famili</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nama Rumah Sakit / RSUD Tujuan *
                          </label>
                          <select
                            value={sktmRsudForm.namaRumahSakit}
                            onChange={(e) => setSktmRsudForm({ ...sktmRsudForm, namaRumahSakit: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="RSUD Banten">RSUD Banten (Kota Serang)</option>
                            <option value="RSUD Dr. Drajat Prawiranegara Serang">RSUD Dr. Drajat Prawiranegara (RSDP Serang)</option>
                            <option value="Puskesmas DTP Petir">Puskesmas DTP Petir</option>
                            <option value="RSUD Berkah Pandeglang">RSUD Berkah Pandeglang</option>
                            <option value="RS Hermina Ciruas / Swasta Lainnya">RS Hermina Ciruas / Swasta Mitra Jamkesda</option>
                            <option value="Lainnya">Rumah Sakit Lainnya</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Status Perawatan Pasien *
                          </label>
                          <select
                            value={sktmRsudForm.statusPerawatan}
                            onChange={(e) => setSktmRsudForm({ ...sktmRsudForm, statusPerawatan: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Rawat Inap (Sedang Dirawat di RS)">Rawat Inap (Sedang Dirawat di RS)</option>
                            <option value="IGD / Gawat Darurat">IGD / Pasien Gawat Darurat</option>
                            <option value="Rencana Tindakan Medis / Operasi">Rencana Tindakan Medis / Operasi</option>
                            <option value="Rawat Jalan / Kontrol Rutin Spesialis">Rawat Jalan / Kontrol Rutin Spesialis</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Diagnosa Penyakit / Keluhan Medis Singkat *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: DBD, Penyakit Paru, Melahirkan dengan Tindakan Operasi, dll."
                            value={sktmRsudForm.diagnosaPenyakit}
                            onChange={(e) => setSktmRsudForm({ ...sktmRsudForm, diagnosaPenyakit: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Pekerjaan Penanggung Jawab *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Buruh Harian / Petani / Pedagang"
                            value={sktmRsudForm.pekerjaanPenanggungJawab}
                            onChange={(e) => setSktmRsudForm({ ...sktmRsudForm, pekerjaanPenanggungJawab: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Penghasilan Rata-rata Keluarga *
                          </label>
                          <select
                            value={sktmRsudForm.penghasilanBulanan}
                            onChange={(e) => setSktmRsudForm({ ...sktmRsudForm, penghasilanBulanan: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="< Rp 1.000.000">&lt; Rp 1.000.000 / bulan</option>
                            <option value="Rp 1.000.000 - Rp 1.500.000">Rp 1.000.000 - Rp 1.500.000 / bulan</option>
                            <option value="Tidak Menentu (Penghasilan Harian)">Tidak Menentu (Penghasilan Harian)</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Keperluan Surat *
                          </label>
                          <select
                            value={sktmRsudForm.keperluan}
                            onChange={(e) => setSktmRsudForm({ ...sktmRsudForm, keperluan: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Keringanan Biaya Perawatan & Rawat Inap RSUD">Keringanan Biaya Perawatan & Rawat Inap RSUD</option>
                            <option value="Permohonan Bantuan Biaya Berobat Jamkesda Serang">Permohonan Bantuan Biaya Berobat Jamkesda Kab. Serang</option>
                            <option value="Rekomendasi Pembebasan Biaya Tindakan Medis Darurat">Rekomendasi Pembebasan Biaya Tindakan Medis Darurat</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={18} />
                    <span>Kirim Permohonan {currentConfig.shortName} ke Balai Desa</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Data Anda tersimpan secara aman dan terenkripsi dalam sistem administrasi Pemerintah Desa Kadugenep.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
