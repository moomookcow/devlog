import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Tag, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/blog/PageHeader";
import PostList from "@/components/blog/PostList";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SEOHead from "@/components/seo/SEOHead";
import { usePosts } from "@/hooks/usePosts";

const TagPage = () => {
  const { tag } = useParams<{ tag: string }>();
  const navigate = useNavigate();
  const { posts, loading, getPostsByTag } = usePosts();
  const [tagPosts, setTagPosts] = useState<any[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    if (tag) {
      const decodedTag = decodeURIComponent(tag);
      const posts = getPostsByTag(decodedTag);
      setTagPosts(posts);
    }
  }, [tag, getPostsByTag]);

  useEffect(() => {
    // 모든 태그 수집
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      if (post.metadata.tags) {
        post.metadata.tags.forEach((tag: string) => tagsSet.add(tag));
      }
    });
    setAllTags(Array.from(tagsSet).sort());
  }, [posts]);

  const handleTagClick = (clickedTag: string) => {
    navigate(`/tag/${encodeURIComponent(clickedTag)}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="lg" text="태그 페이지 로딩 중..." />
      </div>
    );
  }

  if (!tag) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              태그를 찾을 수 없습니다
            </h1>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              블로그로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const decodedTag = decodeURIComponent(tag);
  const tagCount = tagPosts.length;

  return (
    <>
      <SEOHead
        title={`${decodedTag} 태그 - Tech Blog`}
        description={`${decodedTag} 태그와 관련된 ${tagCount}개의 포스트를 확인해보세요.`}
        keywords={[decodedTag, "태그", "블로그", "기술"]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <PageHeader
          title={`#${decodedTag}`}
          description={`${decodedTag} 태그와 관련된 ${tagCount}개의 포스트`}
          icon={Tag}
          badges={[
            { text: `${tagCount}개 포스트`, variant: "secondary" as const },
            { text: "태그", variant: "outline" as const },
          ]}
        />

        {/* 태그 클라우드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5" />
                모든 태그
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tagName) => (
                  <Badge
                    key={tagName}
                    variant={tagName === decodedTag ? "default" : "secondary"}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      tagName === decodedTag
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary hover:text-primary-foreground"
                    }`}
                    onClick={() => handleTagClick(tagName)}
                  >
                    {tagName}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 포스트 목록 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {tagPosts.length > 0 ? (
            <PostList posts={tagPosts} onTagClick={handleTagClick} />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Tag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  해당 태그의 포스트가 없습니다
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  다른 태그를 선택하거나 블로그 목록을 확인해보세요.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => navigate("/blog")}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    블로그 목록
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/")}>
                    홈으로
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default TagPage;
