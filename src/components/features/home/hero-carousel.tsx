"use client";

import { useEffect, useState } from "react";

type HeroCarouselProps = {
  items: HeroItem[];
};

export type HeroItem = {
  eyebrow: string;
  title: string;
  description: string;
  meta: string[];
  nextTitle: string;
  nextDescription: string;
  setupTitle: string;
  setupDescription: string;
  background: string;
};

const ROTATION_MS = 30000;

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
    }, ROTATION_MS);

    return () => window.clearInterval(intervalId);
  }, [items.length]);

  const activeItem = items[activeIndex];

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-4 sm:px-8 lg:px-12 lg:pb-24">
      <div
        className={`absolute inset-x-6 inset-y-0 rounded-[2rem] transition-all duration-700 ${activeItem.background} sm:inset-x-8 lg:inset-x-12`}
      />
      <div className="absolute inset-x-6 inset-y-0 rounded-[2rem] border border-line sm:inset-x-8 lg:inset-x-12" />
      <div className="relative grid min-h-[60vh] items-end gap-10 px-8 py-10 sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:px-14 lg:py-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.38em] text-zinc-400 sm:text-base">
            {activeItem.eyebrow}
          </p>
          <h1 className="max-w-4xl font-display text-6xl uppercase leading-[0.88] tracking-[0.04em] text-white sm:text-7xl lg:text-8xl xl:text-[8rem]">
            {activeItem.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8 lg:text-xl">
            {activeItem.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-zinc-300 sm:text-base">
            {activeItem.meta.map((entry) => {
              const isOriginal = entry === "GregFlix Original";

              return (
                <span
                  key={entry}
                  className={
                    isOriginal
                      ? "rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-white"
                      : "rounded-full border border-white/15 bg-white/6 px-4 py-2"
                  }
                >
                  {entry}
                </span>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-full bg-foreground px-8 py-4 text-base font-semibold text-black transition-transform duration-200 hover:scale-[1.02]">
              Play
            </button>
            <button className="rounded-full border border-white/15 bg-white/8 px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/14">
              More Info
            </button>
          </div>
          <div className="mt-8 flex items-center gap-3">
            {items.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show hero ${index + 1}: ${item.title}`}
                aria-pressed={index === activeIndex}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-12 bg-white"
                    : "w-6 bg-white/25 hover:bg-white/45"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:justify-self-end">
          <div className="rounded-[1.75rem] border border-white/10 bg-black/35 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
              Up Next
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {activeItem.nextTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {activeItem.nextDescription}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-black/35 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
              Continue Setup
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {activeItem.setupTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {activeItem.setupDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
