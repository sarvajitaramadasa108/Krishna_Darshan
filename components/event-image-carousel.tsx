"use client";

import Image from "next/image";
import { useState } from "react";

type EventImageCarouselProps = {
  images: Array<{ url: string }>;
};

export default function EventImageCarousel({
  images,
}: EventImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orientations, setOrientations] = useState<
    Array<"portrait" | "landscape" | null>
  >(() => images.map(() => null));

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

  const currentOrientation = orientations[currentIndex] ?? "landscape";

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 shadow-[0_18px_48px_rgba(86,48,18,0.12)]">
      <div
        className={`relative overflow-hidden bg-white ${
          currentOrientation === "portrait"
            ? "aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]"
            : "aspect-[16/10] sm:aspect-[16/9]"
        }`}
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
                className={
                  orientations[index] === "portrait"
                    ? "object-contain bg-white p-3 sm:p-4"
                    : "object-cover"
                }
                onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.currentTarget;
                  setOrientations((current) => {
                    const next = [...current];
                    next[index] =
                      naturalHeight > naturalWidth ? "portrait" : "landscape";
                    return next;
                  });
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={goPrevious}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/90 p-3 text-[#7f3a24] shadow-[0_10px_24px_rgba(86,48,18,0.18)] transition hover:scale-105"
          >
            <span className="text-xl leading-none">{`<`}</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/90 p-3 text-[#7f3a24] shadow-[0_10px_24px_rgba(86,48,18,0.18)] transition hover:scale-105"
          >
            <span className="text-xl leading-none">{`>`}</span>
          </button>
        </>
      ) : null}
    </div>
  );
}
