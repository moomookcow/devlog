import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OptimizedImage from "@/components/common/OptimizedImage";
import ImageGallery from "@/components/common/ImageGallery";
import PerformanceDashboard from "@/components/common/PerformanceDashboard";
import {
  testImages,
  performanceTestImages,
  webpTestImages,
  lazyLoadingTestImages,
  errorTestImages,
  blurPlaceholderImages,
} from "@/data/testImages";
// import { cn } from "@/lib/utils";

const ImageTestPage: React.FC = () => {
  const [showPerformanceDashboard, setShowPerformanceDashboard] =
    useState(false);
  const [imageLoadTimes, setImageLoadTimes] = useState<Record<string, number>>(
    {}
  );

  const handleImageLoad = (imageId: string) => {
    const loadTime = performance.now();
    setImageLoadTimes((prev) => ({
      ...prev,
      [imageId]: loadTime,
    }));
  };

  const ImageGrid: React.FC<{
    images: any[];
    title: string;
    showLoadTimes?: boolean;
  }> = ({ images, title, showLoadTimes = false }) => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full h-48 object-cover"
                onLoad={() => handleImageLoad(`${title}-${index}`)}
                placeholder={image.blurDataURL ? "blur" : "empty"}
                blurDataURL={image.blurDataURL}
              />
              <div className="p-3">
                <p className="text-sm font-medium">{image.alt}</p>
                {image.caption && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {image.caption}
                  </p>
                )}
                {showLoadTimes && imageLoadTimes[`${title}-${index}`] && (
                  <Badge variant="outline" className="mt-2">
                    로드 시간: {Math.round(imageLoadTimes[`${title}-${index}`])}
                    ms
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">이미지 최적화 테스트</h1>
          <p className="text-lg text-muted-foreground mb-6">
            다양한 이미지 최적화 기법들을 테스트해보세요
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() =>
                setShowPerformanceDashboard(!showPerformanceDashboard)
              }
              variant={showPerformanceDashboard ? "default" : "outline"}
            >
              {showPerformanceDashboard
                ? "성능 모니터 숨기기"
                : "성능 모니터 보기"}
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline">
              페이지 새로고침
            </Button>
          </div>
        </motion.div>

        {/* Performance Dashboard */}
        {showPerformanceDashboard && (
          <PerformanceDashboard
            showDetails={true}
            autoRefresh={true}
            refreshInterval={5000}
          />
        )}

        {/* Tabs */}
        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="gallery">갤러리</TabsTrigger>
            <TabsTrigger value="performance">성능 테스트</TabsTrigger>
            <TabsTrigger value="webp">WebP 테스트</TabsTrigger>
            <TabsTrigger value="lazy">지연 로딩</TabsTrigger>
            <TabsTrigger value="error">에러 처리</TabsTrigger>
            <TabsTrigger value="blur">블러 플레이스홀더</TabsTrigger>
          </TabsList>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>이미지 갤러리 테스트</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageGallery
                  images={testImages}
                  showThumbnails={true}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Test Tab */}
          <TabsContent value="performance" className="space-y-6">
            <ImageGrid
              images={performanceTestImages}
              title="성능 테스트 이미지들"
              showLoadTimes={true}
            />
          </TabsContent>

          {/* WebP Test Tab */}
          <TabsContent value="webp" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">WebP 형식 테스트</h3>
              <p className="text-muted-foreground">
                WebP 형식의 이미지들이 자동으로 선택되어 표시됩니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {webpTestImages.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <OptimizedImage
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className="w-full h-64 object-cover"
                        onLoad={() => handleImageLoad(`webp-${index}`)}
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium">{image.alt}</p>
                        <Badge variant="secondary" className="mt-2">
                          WebP 형식
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Lazy Loading Test Tab */}
          <TabsContent value="lazy" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">지연 로딩 테스트</h3>
              <p className="text-muted-foreground">
                스크롤할 때 이미지들이 지연 로딩됩니다. 개발자 도구의 네트워크
                탭을 확인해보세요.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lazyLoadingTestImages.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <OptimizedImage
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        onLoad={() => handleImageLoad(`lazy-${index}`)}
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium">{image.alt}</p>
                        <Badge variant="outline" className="mt-2">
                          지연 로딩
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Error Handling Test Tab */}
          <TabsContent value="error" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">에러 처리 테스트</h3>
              <p className="text-muted-foreground">
                잘못된 URL의 이미지들이 에러 상태를 올바르게 처리하는지
                테스트합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {errorTestImages.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <OptimizedImage
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className="w-full h-48 object-cover"
                        onError={() =>
                          console.log(`이미지 로드 실패: ${image.src}`)
                        }
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium">{image.alt}</p>
                        <Badge variant="destructive" className="mt-2">
                          에러 테스트
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Blur Placeholder Test Tab */}
          <TabsContent value="blur" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                블러 플레이스홀더 테스트
              </h3>
              <p className="text-muted-foreground">
                이미지 로딩 중에 블러 효과가 적용된 플레이스홀더가 표시됩니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blurPlaceholderImages.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <OptimizedImage
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className="w-full h-64 object-cover"
                        placeholder="blur"
                        blurDataURL={image.blurDataURL}
                        onLoad={() => handleImageLoad(`blur-${index}`)}
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium">{image.alt}</p>
                        <Badge variant="secondary" className="mt-2">
                          블러 플레이스홀더
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Performance Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>성능 최적화 팁</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">이미지 최적화</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• WebP 형식 사용 (지원하는 브라우저)</li>
                    <li>• 적절한 이미지 크기 설정</li>
                    <li>• 지연 로딩 (lazy loading) 적용</li>
                    <li>• 반응형 이미지 (srcset) 사용</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">로딩 경험</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 스켈레톤 로딩 또는 블러 플레이스홀더</li>
                    <li>• 에러 상태 처리</li>
                    <li>• 로딩 상태 표시</li>
                    <li>• 우선순위 이미지 설정</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageTestPage;
