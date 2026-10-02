import type { Metadata } from "next";
import {
  findArticleBySlug,
  INITIAL_ARTICLES,
  CANONICAL_SITE_URL,
  getAbsoluteImageUrl,
} from "@/lib/articles";
import ArticleDetailClient from "@/app/berita/[slug]/article-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "radar" },
    { slug: "1" },
    { slug: "banten-tv" },
    { slug: "2" },
    { slug: "posyandu" },
    { slug: "3" },
    { slug: "musrenbang" },
    { slug: "4" },
    { slug: "tas" },
    { slug: "5" },
    ...INITIAL_ARTICLES.map((a) => ({ slug: a.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticleBySlug(slug);

  if (!article) {
    return {
      title: "Warta Desa Kadugenep",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_SITE_URL;
  const canonicalUrl = `${siteUrl}/berita/${article.slug}`;
  const imageUrl = getAbsoluteImageUrl(article.image, siteUrl);

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: canonicalUrl,
      siteName: "Desa Kadugenep",
      locale: "id_ID",
      type: "website",
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

export default async function ShortArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = findArticleBySlug(slug);

  return <ArticleDetailClient slug={slug} initialArticle={article} />;
}
