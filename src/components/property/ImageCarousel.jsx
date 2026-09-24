import { useState } from 'react';
import { ChevronLeft, ChevronRight, ImageOff, Volume2, VolumeX } from 'lucide-react';

export default function ImageCarousel({ images = [], title = '' }) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[16/9] bg-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-300">
        <ImageOff size={60} />
        <span className="text-base mt-3">No images available</span>
      </div>
    );
  }

  const prev = () => setCurrent(c => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative w-full aspect-[16/9] bg-slate-900 rounded-xl overflow-hidden group">
      {/* Main image */}
      <img
        src={images[current]}
        alt={`${title} - Image ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Nav buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white shadow-lg"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Counter */}
      <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-lg backdrop-blur-sm font-medium">
        {current + 1}/{images.length}
      </div>

      {/* Sound icon (decorative) */}
      <button className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors">
        <VolumeX size={18} />
      </button>

      {/* Dots */}
      {images.length > 1 && images.length <= 8 && (
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                idx === current ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
