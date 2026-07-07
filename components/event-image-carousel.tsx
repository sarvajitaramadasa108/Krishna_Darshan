"use client";

import Image from "next/image";
import { useEffect, useState, type TouchEvent } from "react";

type EventImageCarouselProps = {
  images: Array<{ url: string }>;
};

type CarouselFrameProps = {
  images: Array<{ url: string }>;
  currentIndex: number;
  orientations: Array<"portrait" | "landscape" | null>;
  fullscreen?: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onTouchStart: (event: TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (event: TouchEvent<HTMLDivElement>) => void;
  onImageLoad: (index: number, naturalWidth: number, naturalHeight: number) => void;
  onDoubleClick: () => void;
  onOpenFullscreen: () => void;
};

function CarouselFrame({
  images,
  currentIndex,
  orientations,
  fullscreen = false,
  onPrevious,
  onNext,
  onTouchStart,
  onTouchEnd,
  onImageLoad,
  onDoubleClick,
  onOpenFullscreen,
}: CarouselFrameProps) {
  const currentOrientation = orientations[currentIndex] ?? "landscape";
  const frameClassName =
    currentOrientation === "portrait"
      ? "aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]"
      : "aspect-[16/10] sm:aspect-[16/9]";

  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 shadow-[0_18px_48px_rgba(86,48,18,0.12)] ${
        fullscreen ? "w-[min(96vw,1200px)]" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-white ${
          fullscreen ? "aspect-[16/10] sm:aspect-[16/9]" : frameClassName
        }`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onDoubleClick={onDoubleClick}
      >
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={`${image.url}-${index}`} className="relative h-full min-w-full">
              <Image
                src={image.url}
                alt={`Event image ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain bg-white p-2 sm:p-4"
                onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.currentTarget;
                  onImageLoad(index, naturalWidth, naturalHeight);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/90 p-2 text-[#7c3aed] shadow-[0_8px_18px_rgba(86,48,18,0.16)] transition hover:scale-105"
          >
            <span className="text-sm leading-none">{`<`}</span>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/90 p-2 text-[#7c3aed] shadow-[0_8px_18px_rgba(86,48,18,0.16)] transition hover:scale-105"
          >
            <span className="text-sm leading-none">{`>`}</span>
          </button>
        </>
      ) : null}

      {!fullscreen ? (
        <button
          type="button"
          onClick={onOpenFullscreen}
          className="absolute bottom-3 right-3 rounded-full border border-white/80 bg-white/90 px-3 py-1 text-xs font-semibold text-[#0f766e] shadow-[0_8px_18px_rgba(86,48,18,0.16)]"
        >
          Full screen
        </button>
      ) : null}
    </div>
  );
}

export default function EventImageCarousel({
  images,
}: EventImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orientations, setOrientations] = useState<
    Array<"portrait" | "landscape" | null>
  >(() => images.map(() => null));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!images.length) {
    return (
      <div className="rounded-[1.75rem] border border-white/70 bg-white/65 p-6 text-sm text-[#6f5a46] shadow-[0_16px_40px_rgba(86,48,18,0.08)]">
        Add event images in Supabase to show the carousel here.
      </div>
    );
  }

  const total = images.length;

  const goPrevious = () => {
    setCurrentIndex((index) => (index - 1 + total) % total);
  };

  const goNext = () => {
    setCurrentIndex((index) => (index + 1) % total);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > 40) {
      if (difference > 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    setTouchStartX(null);
  };

  return (
    <>
      <CarouselFrame
        images={images}
        currentIndex={currentIndex}
        orientations={orientations}
        onPrevious={goPrevious}
        onNext={goNext}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onImageLoad={(index, naturalWidth, naturalHeight) => {
          setOrientations((current) => {
            const next = [...current];
            next[index] = naturalHeight > naturalWidth ? "portrait" : "landscape";
            return next;
          });
        }}
        onDoubleClick={() => setIsFullscreen(true)}
        onOpenFullscreen={() => setIsFullscreen(true)}
      />

      {isFullscreen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsFullscreen(false)}
        >
          <div onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="mb-3 ml-auto block rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#1e1b4b] shadow-lg"
            >
              Close
            </button>
            <CarouselFrame
              images={images}
              currentIndex={currentIndex}
              orientations={orientations}
              fullscreen
              onPrevious={goPrevious}
              onNext={goNext}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onImageLoad={(index, naturalWidth, naturalHeight) => {
                setOrientations((current) => {
                  const next = [...current];
                  next[index] = naturalHeight > naturalWidth ? "portrait" : "landscape";
                  return next;
                });
              }}
              onDoubleClick={() => setIsFullscreen(false)}
              onOpenFullscreen={() => setIsFullscreen(false)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
