import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "blog";
  category?: string;
  tags?: string[];
  readingTime?: number;
  viewCount?: number;
  likes?: number;
  comments?: number;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Tech Blog - 개발 지식과 경험을 공유하는 블로그",
  description = "JavaScript, TypeScript, React를 중심으로 한 실무 경험과 학습 내용을 체계적으로 정리하여 개발자 커뮤니티와 지식을 나누는 기술 블로그입니다.",
  keywords = [
    "개발",
    "프로그래밍",
    "JavaScript",
    "TypeScript",
    "React",
    "웹개발",
    "기술블로그",
  ],
  author = "moomookcow",
  publishedAt,
  updatedAt,
  image = "/og-image.jpg",
  url,
  type = "website",
  category,
  tags = [],
  readingTime,
  viewCount,
  likes,
  comments,
}) => {
  const siteName = "Tech Blog";
  const siteUrl = "https://tech-blog.moomookcow.dev";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  // 메타 키워드 생성
  const allKeywords = [
    ...keywords,
    ...(category ? [category] : []),
    ...tags,
    "개발자",
    "프론트엔드",
    "백엔드",
    "프로그래밍",
    "코딩",
    "기술",
    "IT",
  ].join(", ");

  // 구조화된 데이터 생성
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "BlogPosting" : "WebSite",
    name: title,
    description,
    url: fullUrl,
    image: fullImage,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    ...(type === "article" && {
      datePublished: publishedAt,
      dateModified: updatedAt || publishedAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": fullUrl,
      },
      ...(category && {
        articleSection: category,
      }),
      ...(tags.length > 0 && {
        keywords: tags.join(", "),
      }),
      ...(readingTime && {
        timeRequired: `PT${readingTime}M`,
      }),
      ...(viewCount && {
        interactionStatistic: {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/ReadAction",
          userInteractionCount: viewCount,
        },
      }),
    }),
  };

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="Korean" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph 메타 태그 */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter Card 메타 태그 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@moomookcow" />
      <meta name="twitter:site" content="@moomookcow" />

      {/* 추가 메타 태그 */}
      {publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {updatedAt && (
        <meta property="article:modified_time" content={updatedAt} />
      )}
      {category && <meta property="article:section" content={category} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* 구조화된 데이터 */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>

      {/* 파비콘 */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />

      {/* 사이트맵 */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Helmet>
  );
};

export default SEOHead;
