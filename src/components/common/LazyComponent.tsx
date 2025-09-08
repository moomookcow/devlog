import React, { Suspense, lazy } from "react";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

interface LazyComponentProps {
  fallback?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

// 로딩 스피너 컴포넌트
const LoadingSpinner: React.FC<{ size?: "sm" | "md" | "lg" }> = ({
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={cn(
          "border-2 border-primary border-t-transparent rounded-full animate-spin",
          sizeClasses[size]
        )}
      />
    </div>
  );
};

// 스켈레톤 로딩 컴포넌트
const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("animate-pulse bg-muted rounded", className)} />
);

// 기본 로딩 컴포넌트
const DefaultFallback: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-2 text-sm text-muted-foreground">로딩 중...</p>
    </div>
  </div>
);

// Lazy 컴포넌트 래퍼
export const LazyComponent: React.FC<LazyComponentProps> = ({
  fallback = <DefaultFallback />,
  className,
  children,
}) => {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </div>
  );
};

// 페이지별 Lazy 컴포넌트들
export const LazyHomePage = lazy(() => import("@/pages/HomePage"));
export const LazyBlogListPage = lazy(() => import("@/pages/BlogListPage"));
export const LazyPostDetailPage = lazy(() => import("@/pages/PostDetailPage"));
export const LazyCategoryPage = lazy(() => import("@/pages/CategoryPage"));
export const LazySearchPage = lazy(() => import("@/pages/SearchPage"));
export const LazyAboutPage = lazy(() => import("@/pages/AboutPage"));
export const LazyGuestbookPage = lazy(() => import("@/pages/GuestbookPage"));
export const LazyNotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// 컴포넌트별 Lazy 컴포넌트들
export const LazyImageGallery = lazy(() => import("./ImageGallery"));
export const LazyCategoryModal = lazy(() => import("./CategoryModal"));

// Lazy 컴포넌트 생성 헬퍼 함수
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback || <DefaultFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// 특별한 로딩 상태를 위한 컴포넌트들
export const PageLoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-lg font-medium">페이지를 불러오는 중...</p>
      <p className="mt-2 text-sm text-muted-foreground">잠시만 기다려주세요</p>
    </div>
  </div>
);

export const CardLoadingFallback: React.FC = () => (
  <div className="space-y-4">
    <SkeletonLoader className="h-48 w-full" />
    <div className="space-y-2">
      <SkeletonLoader className="h-4 w-3/4" />
      <SkeletonLoader className="h-4 w-1/2" />
      <SkeletonLoader className="h-4 w-2/3" />
    </div>
  </div>
);

export const ListLoadingFallback: React.FC<{ count?: number }> = ({
  count = 3,
}) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <CardLoadingFallback key={index} />
    ))}
  </div>
);

export const ImageLoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center bg-muted rounded-lg">
    <div className="text-center p-8">
      <LoadingSpinner size="md" />
      <p className="mt-2 text-sm text-muted-foreground">이미지 로딩 중...</p>
    </div>
  </div>
);

// 에러 바운더리와 함께 사용할 수 있는 Lazy 컴포넌트
export const LazyWithErrorBoundary: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ children, fallback }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-lg font-medium">오류가 발생했습니다</p>
          <p className="text-sm text-muted-foreground mt-2">
            페이지를 새로고침해주세요
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={fallback || <DefaultFallback />}>{children}</Suspense>
  );
};

export default LazyComponent;
