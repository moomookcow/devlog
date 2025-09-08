import { Calendar, Clock, Tag, Folder, Search, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { SearchResult } from "@/hooks/useSearch";
import { formatDate } from "@/lib/utils";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
  onPostClick: (slug: string) => void;
}

export function SearchResults({
  results,
  isLoading,
  query,
  onPostClick,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">검색어를 입력해주세요</h3>
        <p className="text-muted-foreground">
          포스트 제목, 내용, 태그, 카테고리로 검색할 수 있습니다.
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
        <p className="text-muted-foreground mb-4">
          "{query}"에 대한 검색 결과를 찾을 수 없습니다.
        </p>
        <div className="text-sm text-muted-foreground">
          <p>다른 검색어를 시도해보세요:</p>
          <ul className="mt-2 space-y-1">
            <li>• 더 간단한 키워드 사용</li>
            <li>• 오타 확인</li>
            <li>• 동의어나 유사한 단어 시도</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 검색 결과 요약 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          "{query}"에 대한 검색 결과{" "}
          <span className="font-semibold text-foreground">
            {results.length}개
          </span>
        </p>
      </div>

      {/* 검색 결과 목록 */}
      <div className="space-y-4">
        {results.map((result, index) => (
          <motion.div
            key={result.post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle
                      className="text-lg group-hover:text-primary transition-colors line-clamp-2"
                      onClick={() => onPostClick(result.post.slug)}
                    >
                      {result.post.metadata.title}
                    </CardTitle>
                    {result.post.metadata.excerpt && (
                      <p className="text-muted-foreground mt-2 line-clamp-2">
                        {result.post.metadata.excerpt}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    {result.score}점
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(result.post.metadata.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {result.post.metadata.readingTime}분
                  </div>
                  <div className="flex items-center gap-1">
                    <Folder className="h-4 w-4" />
                    {result.post.categoryPath.split("/")[0]}
                  </div>
                </div>

                {/* 태그 */}
                {result.post.metadata.tags &&
                  result.post.metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {result.post.metadata.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                {/* 매칭된 필드 표시 */}
                <div className="flex flex-wrap gap-2">
                  {result.matchedFields.map((field) => (
                    <Badge key={field} variant="secondary" className="text-xs">
                      {field === "title" && "제목"}
                      {field === "description" && "설명"}
                      {field === "tags" && "태그"}
                      {field === "category" && "카테고리"}
                      {field === "content" && "내용"}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={() => onPostClick(result.post.slug)}
                >
                  포스트 읽기
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
