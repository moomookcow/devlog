import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Zap,
  Clock,
  Wifi,
  MemoryStick,
  TrendingUp,
  TrendingDown,
  Minus,
  X,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import usePerformance from "@/hooks/usePerformance";
import { cn } from "@/lib/utils";

interface PerformanceDashboardProps {
  className?: string;
  showDetails?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  className,
  showDetails = false,
  autoRefresh = false,
  refreshInterval = 10000,
}) => {
  const [isExpanded, setIsExpanded] = useState(showDetails);
  const [isVisible, setIsVisible] = useState(false);

  const {
    metrics,
    isSupported,
    getPerformanceScore,
    getPerformanceGrade,
    formatBytes,
    formatTime,
    refresh,
  } = usePerformance();

  // Auto refresh
  React.useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(refresh, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refresh]);

  if (!isSupported) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="text-center text-muted-foreground">
            <Activity className="w-8 h-8 mx-auto mb-2" />
            <p>성능 모니터링을 지원하지 않는 브라우저입니다</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const score = getPerformanceScore();
  const grade = getPerformanceGrade();

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800 border-green-200";
      case "B":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "C":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "D":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getMetricStatus = (
    value: number | null,
    thresholds: { good: number; needsImprovement: number }
  ) => {
    if (value === null) return { status: "unknown", color: "text-gray-500" };
    if (value <= thresholds.good)
      return { status: "good", color: "text-green-600" };
    if (value <= thresholds.needsImprovement)
      return { status: "needs-improvement", color: "text-yellow-600" };
    return { status: "poor", color: "text-red-600" };
  };

  const lcpStatus = getMetricStatus(metrics.lcp, {
    good: 2500,
    needsImprovement: 4000,
  });
  const fidStatus = getMetricStatus(metrics.fid, {
    good: 100,
    needsImprovement: 300,
  });
  const clsStatus = getMetricStatus(metrics.cls, {
    good: 0.1,
    needsImprovement: 0.25,
  });
  const fcpStatus = getMetricStatus(metrics.fcp, {
    good: 1800,
    needsImprovement: 3000,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("fixed bottom-4 right-4 z-50", className)}
    >
      <Card className="w-80 shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5" />
              성능 모니터
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={refresh}
                className="h-8 w-8 p-0"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0"
              >
                {isExpanded ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <TrendingUp className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Overall Score */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className={cn("text-3xl font-bold", getScoreColor(score))}>
                {score}
              </div>
              <Badge className={cn("text-lg px-3 py-1", getGradeColor(grade))}>
                {grade}
              </Badge>
            </div>
            <Progress value={score} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">전체 성능 점수</p>
          </div>

          {/* Core Web Vitals */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">
              Core Web Vitals
            </h4>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">LCP</span>
                </div>
                <div className={cn("font-mono", lcpStatus.color)}>
                  {metrics.lcp ? formatTime(metrics.lcp) : "N/A"}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">FID</span>
                </div>
                <div className={cn("font-mono", fidStatus.color)}>
                  {metrics.fid ? `${Math.round(metrics.fid)}ms` : "N/A"}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">CLS</span>
                </div>
                <div className={cn("font-mono", clsStatus.color)}>
                  {metrics.cls ? metrics.cls.toFixed(3) : "N/A"}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">FCP</span>
                </div>
                <div className={cn("font-mono", fcpStatus.color)}>
                  {metrics.fcp ? formatTime(metrics.fcp) : "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-3 border-t pt-3"
              >
                {/* Memory Usage */}
                {metrics.memoryUsage.usedJSHeapSize && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MemoryStick className="w-4 h-4" />
                      <span className="font-medium text-sm">메모리 사용량</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>사용 중:</span>
                        <span className="font-mono">
                          {formatBytes(metrics.memoryUsage.usedJSHeapSize)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>전체:</span>
                        <span className="font-mono">
                          {formatBytes(metrics.memoryUsage.totalJSHeapSize!)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>제한:</span>
                        <span className="font-mono">
                          {formatBytes(metrics.memoryUsage.jsHeapSizeLimit!)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Network Info */}
                {metrics.effectiveType && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4" />
                      <span className="font-medium text-sm">네트워크</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>연결 타입:</span>
                        <span className="font-mono">
                          {metrics.effectiveType}
                        </span>
                      </div>
                      {metrics.downlink && (
                        <div className="flex justify-between">
                          <span>다운로드:</span>
                          <span className="font-mono">
                            {metrics.downlink} Mbps
                          </span>
                        </div>
                      )}
                      {metrics.rtt && (
                        <div className="flex justify-between">
                          <span>RTT:</span>
                          <span className="font-mono">{metrics.rtt}ms</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Metrics */}
                <div className="space-y-2">
                  <span className="font-medium text-sm">추가 메트릭</span>
                  <div className="text-sm space-y-1">
                    {metrics.loadTime && (
                      <div className="flex justify-between">
                        <span>로드 시간:</span>
                        <span className="font-mono">
                          {formatTime(metrics.loadTime)}
                        </span>
                      </div>
                    )}
                    {metrics.domContentLoaded && (
                      <div className="flex justify-between">
                        <span>DOM 로드:</span>
                        <span className="font-mono">
                          {formatTime(metrics.domContentLoaded)}
                        </span>
                      </div>
                    )}
                    {metrics.ttfb && (
                      <div className="flex justify-between">
                        <span>TTFB:</span>
                        <span className="font-mono">
                          {formatTime(metrics.ttfb)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PerformanceDashboard;
