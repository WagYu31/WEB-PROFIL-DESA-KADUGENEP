import type { Metadata } from "next";
import {
  findArticleBySlug,
  INITIAL_ARTICLES,
  CANONICAL_SITE_URL,
  getAbsoluteImageUrl,
} from "@/lib/articles";
import ArticleDetailClient from "./article-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INITIAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticleBySlug(slug);

  if (!article) {
    return {
      title: "Warta Tidak Ditemukan | Desa Kadugenep",
      description: "Halaman warta resmi Desa Kadugenep tidak ditemukan atau telah diperbarui.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_SITE_URL;
  const canonicalUrl = `${siteUrl}/berita/${article.slug}`;
  const imageUrl = getAbsoluteImageUrl(article.image, siteUrl);

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
      publishedTime: article.date,
      authors: [article.author || "Pemerintah Desa Kadugenep"],
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
          type: "image/jpeg",
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
  const article = findArticleBySlug(slug);

  return <ArticleDetailClient slug={slug} initialArticle={article} />;
}
