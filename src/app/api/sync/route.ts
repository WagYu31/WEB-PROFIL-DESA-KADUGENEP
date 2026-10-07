import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { type Article, INITIAL_ARTICLES } from "@/lib/articles";
import {
  INITIAL_PROFILE,
  INITIAL_OFFICIALS,
  INITIAL_APBDES,
  INITIAL_SERVICE_REQUESTS,
  INITIAL_ASPIRATIONS,
  INITIAL_SOTK_SETTINGS,
} from "@/lib/data-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Fetch articles from Supabase
    const { data: artRows, error: artErr } = await supabaseAdmin
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (artErr) console.warn("Supabase articles error:", artErr);

    const articles: Article[] = (artRows || []).map((r: any) => ({
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
    }));

    // 2. Fetch service requests
    const { data: svcRows, error: svcErr } = await supabaseAdmin
      .from("service_requests")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (svcErr) console.warn("Supabase services error:", svcErr);

    const serviceRequests = (svcRows || []).map((r: any) => ({
      id: r.id,
      citizenName: r.citizen_name,
      nik: r.nik,
      serviceType: r.service_type,
      whatsapp: r.whatsapp,
      notes: r.notes || "",
      createdAt: r.created_at,
      status: r.status,
      details: r.details || undefined,
    }));

    // 3. Fetch aspirations
    const { data: aspRows, error: aspErr } = await supabaseAdmin
      .from("aspirations")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (aspErr) console.warn("Supabase aspirations error:", aspErr);

    const aspirations = (aspRows || []).map((r: any) => ({
      id: r.id,
      name: r.name,
      contact: r.contact,
      subject: r.subject,
      message: r.message,
      createdAt: r.created_at,
      status: r.status,
    }));

    // 4. Fetch site settings
    const { data: setRows, error: setErr } = await supabaseAdmin
      .from("site_settings")
      .select("*");

    if (setErr) console.warn("Supabase settings error:", setErr);

    const settingsMap: Record<string, any> = {};
    for (const row of setRows || []) {
      settingsMap[row.setting_key] = row.setting_value;
    }

    return NextResponse.json({
      success: true,
      articles: articles.length > 0 ? articles : INITIAL_ARTICLES,
      profile: settingsMap.profile || INITIAL_PROFILE,
      officials: settingsMap.officials || INITIAL_OFFICIALS,
      apbdes: settingsMap.apbdes || INITIAL_APBDES,
      sotkSettings: settingsMap.sotk_settings || INITIAL_SOTK_SETTINGS,
      serviceRequests: serviceRequests.length > 0 ? serviceRequests : INITIAL_SERVICE_REQUESTS,
      aspirations: aspirations.length > 0 ? aspirations : INITIAL_ASPIRATIONS,
    });
  } catch (err: any) {
    console.error("API /api/sync GET error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    switch (action) {
      case "save_article": {
        const art = payload;
        const { error } = await supabaseAdmin.from("articles").upsert(
          {
            id: art.id,
            slug: art.slug,
            title: art.title,
            category: art.category,
            summary: art.summary,
            content: art.content,
            author: art.author,
            date: art.date,
            image: art.image,
            views: art.views || 1,
            featured: Boolean(art.featured),
            video_url: art.videoUrl || null,
            video_title: art.videoTitle || null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

        if (error) throw error;
        return NextResponse.json({ success: true, message: "Artikel tersimpan di Supabase" });
      }

      case "delete_article": {
        const { id } = payload;
        const { error } = await supabaseAdmin.from("articles").delete().eq("id", id);
        if (error) throw error;
        return NextResponse.json({ success: true, message: "Artikel terhapus dari Supabase" });
      }

      case "save_service_request": {
        const item = payload;
        const { error } = await supabaseAdmin.from("service_requests").upsert(
          {
            id: item.id,
            citizen_name: item.citizenName,
            nik: item.nik,
            service_type: item.serviceType,
            whatsapp: item.whatsapp,
            notes: item.notes || "",
            created_at: item.createdAt,
            status: item.status || "Menunggu",
            details: item.details || null,
          },
          { onConflict: "id" }
        );

        if (error) throw error;
        return NextResponse.json({ success: true, message: "Permohonan surat tersimpan di Supabase" });
      }

      case "save_aspiration": {
        const asp = payload;
        const { error } = await supabaseAdmin.from("aspirations").upsert(
          {
            id: asp.id,
            name: asp.name,
            contact: asp.contact,
            subject: asp.subject,
            message: asp.message,
            created_at: asp.createdAt,
            status: asp.status || "Baru",
          },
          { onConflict: "id" }
        );

        if (error) throw error;
        return NextResponse.json({ success: true, message: "Aspirasi tersimpan di Supabase" });
      }

      case "save_setting": {
        const { key, data } = payload;
        const { error } = await supabaseAdmin.from("site_settings").upsert(
          {
            setting_key: key,
            setting_value: data,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "setting_key" }
        );

        if (error) throw error;
        return NextResponse.json({ success: true, message: `Setting ${key} tersimpan di Supabase` });
      }

      case "sync_all_articles": {
        const articlesList = payload;
        if (Array.isArray(articlesList)) {
          for (const art of articlesList) {
            await supabaseAdmin.from("articles").upsert(
              {
                id: art.id,
                slug: art.slug,
                title: art.title,
                category: art.category,
                summary: art.summary,
                content: art.content,
                author: art.author,
                date: art.date,
                image: art.image,
                views: art.views || 1,
                featured: Boolean(art.featured),
                video_url: art.videoUrl || null,
                video_title: art.videoTitle || null,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "id" }
            );
          }
        }
        return NextResponse.json({ success: true, message: "Semua artikel tersinkronisasi" });
      }

      default:
        return NextResponse.json({ error: "Action tidak dikenal" }, { status: 400 });
    }
  } catch (err: any) {
    console.error("API /api/sync POST error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
