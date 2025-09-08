export interface PostMetadata {
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  viewCount: number;
  likes: number;
  comments: number;
  category: string;
  tags: string[];
  isPublished: boolean;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

// 클라이언트 사이드에서 사용할 수 있는 간단한 버전
export function getStaticPosts(): Post[] {
  // 정적 데이터로 대체 (개발 중)
  return [
    {
      slug: "react-typescript-best-practices",
      metadata: {
        title: "React + TypeScript 베스트 프랙티스 가이드",
        excerpt:
          "React와 TypeScript를 함께 사용할 때 알아야 할 핵심 패턴과 베스트 프랙티스를 정리했습니다.",
        author: "moomookcow",
        publishedAt: "2024-01-15",
        readingTime: 8,
        viewCount: 1247,
        likes: 89,
        comments: 12,
        category: "React",
        tags: [
          "React",
          "TypeScript",
          "Frontend",
          "JavaScript",
          "Best Practices",
        ],
        isPublished: true,
      },
      content: `# React + TypeScript 베스트 프랙티스

React와 TypeScript를 함께 사용하면 더 안전하고 유지보수하기 쉬운 코드를 작성할 수 있습니다. 이 글에서는 실무에서 자주 사용되는 패턴들을 정리해보겠습니다.

## 1. 컴포넌트 Props 타입 정의

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  disabled = false
}) => {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
\`\`\`

## 2. 커스텀 훅 타입 정의

\`\`\`typescript
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
\`\`\`

## 결론

TypeScript와 React를 함께 사용하면 컴파일 타임에 오류를 잡을 수 있어 더 안전한 코드를 작성할 수 있습니다.`,
    },
  ];
}
