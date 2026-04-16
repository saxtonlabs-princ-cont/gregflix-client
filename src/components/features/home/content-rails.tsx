"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type RailItem = {
  title: string;
  subtitle: string;
  accent: string;
  year: string;
  runtime: string;
  rating: string;
  detail: string;
  tags: string[];
};

export type RailSection = {
  title: string;
  items: RailItem[];
  large?: boolean;
};

type ContentRailsProps = {
  sections: RailSection[];
};

export function ContentRails({ sections }: ContentRailsProps) {
  const [selectedItem, setSelectedItem] = useState<RailItem | null>(null);

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  return (
    <>
      <div className="flex flex-1 flex-col gap-10 px-6 pb-16 sm:px-8 lg:px-12">
        {sections.map((section) => (
          <ContentRail
            key={section.title}
            title={section.title}
            items={section.items}
            large={section.large}
            onSelect={setSelectedItem}
          />
        ))}
      </div>
      {selectedItem ? (
        <CardDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      ) : null}
    </>
  );
}

type ContentRailProps = {
  title: string;
  items: RailItem[];
  large?: boolean;
  onSelect: (item: RailItem) => void;
};

function ContentRail({
  title,
  items,
  large = false,
  onSelect,
}: ContentRailProps) {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.24em] text-zinc-500 transition-colors hover:text-zinc-300"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.title}
            className={`group overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-1 ${
              large ? "min-h-72" : "min-h-64"
            }`}
          >
            <button
              type="button"
              onClick={() => onSelect(item)}
              className={`flex h-full w-full flex-col justify-end bg-gradient-to-br p-6 text-left ${item.accent}`}
            >
              <div className="max-w-[16rem]">
                <p className="text-xs uppercase tracking-[0.28em] text-zinc-300/80">
                  {item.subtitle}
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
              </div>
              <div className="mt-8 flex items-center justify-between text-sm text-zinc-200/90">
                <span>View Details</span>
                <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1">
                  {item.rating}
                </span>
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

type CardDetailModalProps = {
  item: RailItem;
  onClose: () => void;
};

function CardDetailModal({ item, onClose }: CardDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-4 py-6 backdrop-blur-md sm:items-center sm:px-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="card-detail-title"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${item.accent} shadow-[0_40px_120px_rgba(0,0,0,0.55)]`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.78))] p-6 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.32em] text-zinc-300/75">
                {item.subtitle}
              </p>
              <h3
                id="card-detail-title"
                className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              >
                {item.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/45"
            >
              Close
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-200 sm:text-base">
            <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2">
              {item.year}
            </span>
            <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2">
              {item.runtime}
            </span>
            <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2">
              {item.rating}
            </span>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-base leading-7 text-zinc-100 sm:text-lg sm:leading-8">
            {item.detail}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-transform duration-200 hover:scale-[1.02]">
              Play
            </button>
            <button className="rounded-full border border-white/15 bg-black/20 px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-black/35">
              Add To My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
