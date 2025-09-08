import { MDXProvider } from "@mdx-js/react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// MDX 컴포넌트 정의
const components = {
  // 제목 스타일링
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-4xl font-bold text-foreground mb-6 mt-8 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-3xl font-bold text-foreground mb-4 mt-8 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-2xl font-semibold text-foreground mb-3 mt-6 first:mt-0">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: ReactNode }) => (
    <h4 className="text-xl font-semibold text-foreground mb-2 mt-4 first:mt-0">
      {children}
    </h4>
  ),

  // 문단 스타일링
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-foreground mb-4 leading-relaxed">{children}</p>
  ),

  // 코드 블록 스타일링
  pre: ({ children }: { children: ReactNode }) => (
    <div className="mb-6">
      <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
        {children}
      </pre>
    </div>
  ),
  code: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    }
    return <code className="text-sm font-mono">{children}</code>;
  },

  // 목록 스타일링
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),

  // 링크 스타일링
  a: ({ children, href }: { children: ReactNode; href?: string }) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),

  // 인용문 스타일링
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-primary/20 pl-4 py-2 mb-4 italic text-muted-foreground bg-muted/30 rounded-r">
      {children}
    </blockquote>
  ),

  // 구분선
  hr: () => <hr className="my-8 border-border" />,

  // 테이블 스타일링
  table: ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse border border-border rounded-lg">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="border border-border px-4 py-2 bg-muted font-semibold text-left">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="border border-border px-4 py-2">{children}</td>
  ),

  // 커스텀 컴포넌트들
  Info: ({ children }: { children: ReactNode }) => (
    <Alert className="mb-4">
      <Info className="h-4 w-4" />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  ),
  Warning: ({ children }: { children: ReactNode }) => (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  ),
  Success: ({ children }: { children: ReactNode }) => (
    <Alert className="mb-4 border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
      <CheckCircle className="h-4 w-4" />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  ),
  Error: ({ children }: { children: ReactNode }) => (
    <Alert variant="destructive" className="mb-4">
      <XCircle className="h-4 w-4" />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  ),
  Card: ({ children, title }: { children: ReactNode; title?: string }) => (
    <Card className="mb-6">
      {title && (
        <div className="px-6 py-3 border-b bg-muted/50">
          <h4 className="font-semibold text-foreground">{title}</h4>
        </div>
      )}
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  ),
  Badge: ({
    children,
    variant = "default",
  }: {
    children: ReactNode;
    variant?: "default" | "secondary" | "destructive" | "outline";
  }) => (
    <Badge variant={variant} className="mb-2 mr-2">
      {children}
    </Badge>
  ),
};

interface MDXComponentsProps {
  children: ReactNode;
}

export const MDXComponents = ({ children }: MDXComponentsProps) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MDXComponents;
