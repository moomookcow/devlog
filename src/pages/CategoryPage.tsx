import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/utils/posts";
import type { Post } from "@/utils/mdx";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PostList from "@/components/blog/PostList";
import PageHeader from "@/components/blog/PageHeader";
import SEOHead from "@/components/seo/SEOHead";
import { FolderOpen } from "lucide-react";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      if (!category) return;

      try {
        setLoading(true);
        const allPosts = await getAllPosts();
        const filtered = allPosts.filter(
          (post) =>
            post.metadata.category.toLowerCase() === category.toLowerCase()
        );
        setPosts(filtered);
      } catch (error) {
        console.error("Error loading posts for category:", category, error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" text="포스트를 불러오는 중..." />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            카테고리를 찾을 수 없습니다
          </h1>
          <Button onClick={() => navigate("/blog")}>모든 포스트 보기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${category} 카테고리 - Tech Blog`}
        description={`"${category}" 카테고리의 모든 포스트를 확인해보세요. 관련된 기술 포스트들을 한눈에 볼 수 있습니다.`}
        keywords={[category || "", "카테고리", "기술", "개발", "프로그래밍"]}
        url={`/category/${category}`}
        type="website"
      />
      {/* Category Header */}
      <PageHeader
        title={category}
        description={`"${category}" 카테고리의 모든 포스트를 확인해보세요.`}
        icon={FolderOpen}
        badges={[
          { text: `총 ${posts.length}개 포스트` },
          {
            text: `${
              new Set(posts.map((post) => post.metadata.category)).size
            }개 카테고리`,
          },
        ]}
      />

      {/* Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <PostList
            posts={posts}
            variant="default"
            showTags={true}
            maxTags={2}
            onTagClick={(tag) => navigate(`/tag/${encodeURIComponent(tag)}`)}
            emptyMessage={`"${category}" 카테고리에 해당하는 포스트가 없습니다`}
            emptyDescription="다른 카테고리를 선택하거나 모든 포스트를 확인해보세요."
            emptyIcon={
              <FolderOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            }
          />
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
