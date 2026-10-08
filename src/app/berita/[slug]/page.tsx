import type { Metadata } from "next";
import {
  getArticleBySlugServer,
  CANONICAL_SITE_URL,
  getAbsoluteImageUrl,
} from "@/lib/articles";
import ArticleDetailClient from "./article-detail-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getImageMimeType(url: string): string {
  const clean = url.split("?")[0].toLowerCase();
  if (clean.endsWith(".webp")) return "image/webp";
  if (clean.endsWith(".png")) return "image/png";
  if (clean.endsWith(".gif")) return "image/gif";
  return "image/jpeg";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlugServer(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_SITE_URL;

  if (!article) {
    return {
      title: "Warta Desa Kadugenep",
      description: "Halaman warta resmi Desa Kadugenep tidak ditemukan atau telah diperbarui.",
      openGraph: {
        title: "Warta Desa Kadugenep",
        description: "Portal warta dan informasi resmi Pemerintah Desa Kadugenep.",
        url: `${siteUrl}/berita/${slug}`,
        siteName: "Warta Resmi Desa Kadugenep",
        locale: "id_ID",
        type: "website",
        images: [
          {
            url: `${siteUrl}/images/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: "Warta Desa Kadugenep",
            type: "image/jpeg",
          },
        ],
      },
    };
  }

  const canonicalUrl = `${siteUrl}/berita/${article.slug}`;
  const imageUrl = getAbsoluteImageUrl(article.image, siteUrl);
  const mimeType = getImageMimeType(imageUrl);

  return {
    title: `${article.title} | Warta Desa Kadugenep`,
    description: article.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: canonicalUrl,
      siteName: "Warta Resmi Desa Kadugenep",
      locale: "id_ID",
      type: "article",
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
          type: mimeType,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: [imageUrl],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlugServer(slug);

  return <ArticleDetailClient slug={slug} initialArticle={article} />;
}
