'use client';
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

type Props = {
  videoId: string;
  title: string;
  /** Thumbnail quality: maxresdefault > sddefault > hqdefault > mqdefault */
  thumbQuality?: 'maxres' | 'sd' | 'hq' | 'mq';
  className?: string;
};

/**
 * Lite YouTube facade - renders a static thumbnail + play button until the
 * user clicks. Only then is the real iframe (and ~500 kB of YouTube player
 * JS + tracking cookies) loaded. Massive CWV win on pages with embedded
 * videos; also keeps the page free of YouTube/DoubleClick tracking
 * requests until the user opts in.
 */
const LiteYouTube = ({
  videoId,
  title,
  thumbQuality = 'hq',
  className = '',
}: Props) => {
  const [activated, setActivated] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  const activate = useCallback(() => setActivated(true), []);

  const thumbFile =
    thumbQuality === 'maxres'
      ? 'maxresdefault.jpg'
      : thumbQuality === 'sd'
      ? 'sddefault.jpg'
      : thumbQuality === 'hq'
      ? 'hqdefault.jpg'
      : 'mqdefault.jpg';
  // maxresdefault.jpg is not generated for every YouTube video - fall back to
  // hqdefault.jpg (always present for public videos) on 404.
  const thumbUrl = thumbFailed
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${videoId}/${thumbFile}`;

  if (activated) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        className={`absolute inset-0 w-full h-full ${className}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={activate}
      aria-label={`Play video: ${title}`}
      className={`group absolute inset-0 w-full h-full cursor-pointer overflow-hidden ${className}`}
    >
      <Image
        src={thumbUrl}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 960px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => {
          if (!thumbFailed) setThumbFailed(true);
        }}
      />
      {/* Dim overlay for play-button contrast */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-black/10 group-hover:from-black/55 transition-colors duration-300"
      />
      {/* Play button */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-sm shadow-2xl ring-1 ring-black/10 group-hover:scale-110 group-hover:bg-white transition-all duration-300"
      >
        <Play
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#0a67b3] translate-x-0.5"
          strokeWidth={2.5}
          fill="currentColor"
        />
      </span>
    </button>
  );
};

export default LiteYouTube;
