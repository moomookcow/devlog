import { useEffect, useState, useCallback } from "react";

interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte

  // Additional metrics
  loadTime: number | null;
  domContentLoaded: number | null;
  firstPaint: number | null;
  firstContentfulPaint: number | null;

  // Memory usage
  memoryUsage: {
    usedJSHeapSize: number | null;
    totalJSHeapSize: number | null;
    jsHeapSizeLimit: number | null;
  };

  // Network info
  connectionType: string | null;
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
}

interface PerformanceObserver {
  disconnect: () => void;
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    loadTime: null,
    domContentLoaded: null,
    firstPaint: null,
    firstContentfulPaint: null,
    memoryUsage: {
      usedJSHeapSize: null,
      totalJSHeapSize: null,
      jsHeapSizeLimit: null,
    },
    connectionType: null,
    effectiveType: null,
    downlink: null,
    rtt: null,
  });

  const [isSupported, setIsSupported] = useState(false);

  // Check if Performance Observer is supported
  useEffect(() => {
    setIsSupported(
      typeof window !== "undefined" &&
        "PerformanceObserver" in window &&
        "performance" in window
    );
  }, []);

  // Measure Core Web Vitals
  const measureCoreWebVitals = useCallback(() => {
    if (!isSupported) return;

    const observers: PerformanceObserver[] = [];

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics((prev) => ({
          ...prev,
          lcp: lastEntry.startTime,
        }));
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      observers.push(lcpObserver);
    } catch (e) {
      console.warn("LCP measurement not supported");
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          setMetrics((prev) => ({
            ...prev,
            fid: entry.processingStart - entry.startTime,
          }));
        });
      });
      fidObserver.observe({ entryTypes: ["first-input"] });
      observers.push(fidObserver);
    } catch (e) {
      console.warn("FID measurement not supported");
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        setMetrics((prev) => ({
          ...prev,
          cls: clsValue,
        }));
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
      observers.push(clsObserver);
    } catch (e) {
      console.warn("CLS measurement not supported");
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === "first-contentful-paint") {
            setMetrics((prev) => ({
              ...prev,
              fcp: entry.startTime,
            }));
          }
        });
      });
      fcpObserver.observe({ entryTypes: ["paint"] });
      observers.push(fcpObserver);
    } catch (e) {
      console.warn("FCP measurement not supported");
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isSupported]);

  // Measure basic performance metrics
  const measureBasicMetrics = useCallback(() => {
    if (!isSupported) return;

    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    if (navigation) {
      setMetrics((prev) => ({
        ...prev,
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        ttfb: navigation.responseStart - navigation.requestStart,
      }));
    }

    // First Paint and First Contentful Paint
    const paintEntries = performance.getEntriesByType("paint");
    paintEntries.forEach((entry) => {
      if (entry.name === "first-paint") {
        setMetrics((prev) => ({
          ...prev,
          firstPaint: entry.startTime,
        }));
      }
      if (entry.name === "first-contentful-paint") {
        setMetrics((prev) => ({
          ...prev,
          firstContentfulPaint: entry.startTime,
        }));
      }
    });
  }, [isSupported]);

  // Measure memory usage
  const measureMemoryUsage = useCallback(() => {
    if (!isSupported) return;

    const memory = (performance as any).memory;
    if (memory) {
      setMetrics((prev) => ({
        ...prev,
        memoryUsage: {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        },
      }));
    }
  }, [isSupported]);

  // Measure network information
  const measureNetworkInfo = useCallback(() => {
    if (!isSupported) return;

    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (connection) {
      setMetrics((prev) => ({
        ...prev,
        connectionType: connection.type,
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
      }));
    }
  }, [isSupported]);

  // Get performance score based on metrics
  const getPerformanceScore = useCallback(() => {
    let score = 100;

    // LCP scoring (Good: <2.5s, Needs Improvement: 2.5-4s, Poor: >4s)
    if (metrics.lcp !== null) {
      if (metrics.lcp > 4000) score -= 30;
      else if (metrics.lcp > 2500) score -= 15;
    }

    // FID scoring (Good: <100ms, Needs Improvement: 100-300ms, Poor: >300ms)
    if (metrics.fid !== null) {
      if (metrics.fid > 300) score -= 25;
      else if (metrics.fid > 100) score -= 10;
    }

    // CLS scoring (Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25)
    if (metrics.cls !== null) {
      if (metrics.cls > 0.25) score -= 25;
      else if (metrics.cls > 0.1) score -= 10;
    }

    // FCP scoring (Good: <1.8s, Needs Improvement: 1.8-3s, Poor: >3s)
    if (metrics.fcp !== null) {
      if (metrics.fcp > 3000) score -= 20;
      else if (metrics.fcp > 1800) score -= 10;
    }

    return Math.max(0, score);
  }, [metrics]);

  // Get performance grade
  const getPerformanceGrade = useCallback(() => {
    const score = getPerformanceScore();
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  }, [getPerformanceScore]);

  // Format bytes to human readable format
  const formatBytes = useCallback((bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  // Format time to human readable format
  const formatTime = useCallback((ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  }, []);

  // Initialize measurements
  useEffect(() => {
    if (!isSupported) return;

    const cleanup = measureCoreWebVitals();
    measureBasicMetrics();
    measureMemoryUsage();
    measureNetworkInfo();

    // Measure memory usage periodically
    const memoryInterval = setInterval(measureMemoryUsage, 5000);

    return () => {
      cleanup?.();
      clearInterval(memoryInterval);
    };
  }, [
    isSupported,
    measureCoreWebVitals,
    measureBasicMetrics,
    measureMemoryUsage,
    measureNetworkInfo,
  ]);

  return {
    metrics,
    isSupported,
    getPerformanceScore,
    getPerformanceGrade,
    formatBytes,
    formatTime,
    refresh: () => {
      measureBasicMetrics();
      measureMemoryUsage();
      measureNetworkInfo();
    },
  };
};

export default usePerformance;
