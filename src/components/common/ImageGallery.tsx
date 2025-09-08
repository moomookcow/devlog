import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import OptimizedImage from "./OptimizedImage";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
  }>;
  className?: string;
  showThumbnails?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className,
  showThumbnails = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = images[currentIndex].src;
    link.download = `image-${currentIndex + 1}.jpg`;
    link.click();
  };

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-8 bg-muted rounded-lg",
          className
        )}
      >
        <div className="text-center text-muted-foreground">
          <div className="text-4xl mb-2">📷</div>
          <p>표시할 이미지가 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery */}
      <div className={cn("relative", className)}>
        {/* Main Image */}
        <div className="relative group">
          <div onClick={openFullscreen} className="cursor-pointer">
            <OptimizedImage
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={images[currentIndex].width}
              height={images[currentIndex].height}
              className="w-full h-64 md:h-96 rounded-lg"
              priority={currentIndex === 0}
            />
          </div>

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="sm"
              onClick={openFullscreen}
              className="bg-white/90 hover:bg-white text-black"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              전체화면
            </Button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Caption */}
        {images[currentIndex].caption && (
          <p className="mt-2 text-sm text-muted-foreground text-center">
            {images[currentIndex].caption}
          </p>
        )}

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={cn(
                  "flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                  index === currentIndex
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent hover:border-muted-foreground/50"
                )}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeFullscreen}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-black"
                onClick={closeFullscreen}
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Download Button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-16 z-10 bg-white/90 hover:bg-white text-black"
                onClick={downloadImage}
              >
                <Download className="w-4 h-4" />
              </Button>

              {/* Main Image */}
              <OptimizedImage
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="max-w-full max-h-[80vh] object-contain"
                priority
              />

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* Caption */}
              {images[currentIndex].caption && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded text-sm max-w-md text-center">
                  {images[currentIndex].caption}
                </div>
              )}

              {/* Thumbnails */}
              {showThumbnails && images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={cn(
                        "w-12 h-12 rounded overflow-hidden border-2 transition-all",
                        index === currentIndex
                          ? "border-white"
                          : "border-white/50 hover:border-white/80"
                      )}
                    >
                      <OptimizedImage
                        src={image.src}
                        alt={image.alt}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;
