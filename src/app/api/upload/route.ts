import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah." }, { status: 400 });
    }

    // Determine type
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/") || /\.(mp4|webm|ogg|mov|m4v|mkv)$/i.test(file.name);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: "Format file tidak didukung. Harap unggah file foto (JPG/PNG/WEBP) atau video (MP4/WEBM/MOV)." },
        { status: 400 }
      );
    }

    // Limit video size (e.g. 100MB) or images (20MB)
    const maxVideoSize = 150 * 1024 * 1024; // 150MB
    const maxImageSize = 25 * 1024 * 1024; // 25MB

    if (isVideo && file.size > maxVideoSize) {
      return NextResponse.json(
        { error: "Ukuran video melebihi batas maksimal 150MB. Harap kompresi terlebih dahulu." },
        { status: 400 }
      );
    }

    if (isImage && file.size > maxImageSize) {
      return NextResponse.json(
        { error: "Ukuran gambar melebihi batas maksimal 25MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const originalName = file.name || (isImage ? "gambar.jpg" : "video.mp4");
    const extension = path.extname(originalName) || (isImage ? ".jpg" : ".mp4");
    const rawBase = path.basename(originalName, extension);
    const cleanBase = rawBase
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 40)
      .toLowerCase();

    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const prefix = isVideo ? "video" : "foto";
    const uniqueFileName = `${prefix}-${timestamp}-${random}-${cleanBase}${extension}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, uniqueFileName);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      originalName,
      size: file.size,
      type: file.type,
      mediaCategory: isVideo ? "video" : "image",
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan file: " + (error?.message || "Kesalahan server") },
      { status: 500 }
    );
  }
}
