import React, { useState } from 'react';
import { galleryImages } from '../../data/media';
import type { ImageItem } from '../../types/MediaItem';
import { RevealSection } from '../common/RevealSection';
import { SectionBadge } from '../common/SectionBadge';

type FilterCategory = 'All' | 'Haji Lane' | 'Group Photos' | 'Activities' | 'Behind the Scenes';

const FILTER_CATEGORIES: FilterCategory[] = [
  'All',
  'Haji Lane',
  'Group Photos',
  'Activities',
  'Behind the Scenes',
];

const CATEGORY_MAP: Record<FilterCategory, string> = {
  'All': 'all',
  'Haji Lane': 'haji-lane',
  'Group Photos': 'group',
  'Activities': 'activity',
  'Behind the Scenes': 'behind-the-scenes',
};

// ── Lightbox ─────────────────────────────────────────────────────────────────
interface LightboxProps {
  item: ImageItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  // Close on backdrop click, not on image click
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(0,0,0,0.94)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 60px',
      }}
    >
      {/* Prev button */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
          style={navBtnStyle('left')}
        >
          ‹
        </button>
      )}

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <img
          src={item.src}
          alt={item.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: 12,
            boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            display: 'block',
          }}
        />
        {item.caption && (
          <p style={{ color: 'rgba(246,240,232,0.75)', fontSize: 14, textAlign: 'center', margin: 0 }}>
            {item.caption}
          </p>
        )}
      </div>

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
          style={navBtnStyle('right')}
        >
          ›
        </button>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: 'fixed',
          top: 20,
          right: 24,
          background: 'rgba(255,255,255,0.12)',
          border: 'none',
          color: '#FFFEF8',
          width: 40,
          height: 40,
          borderRadius: '50%',
          fontSize: 22,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
};

const navBtnStyle = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'fixed',
  top: '50%',
  [side]: 12,
  transform: 'translateY(-50%)',
  background: 'rgba(164,75,42,0.75)',
  border: 'none',
  color: '#FFFEF8',
  width: 44,
  height: 44,
  borderRadius: '50%',
  fontSize: 26,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
  zIndex: 301,
});

// ── GalleryCard ───────────────────────────────────────────────────────────────
interface GalleryCardProps {
  item: ImageItem;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      className="card-hover"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.alt}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      style={{
        borderRadius: 'var(--radius-md)',
        aspectRatio: '4/3',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: '2px solid rgba(255,255,255,0.06)',
        background: '#1C0A08',
      }}
    >
      {/* Skeleton shimmer while loading */}
      {!loaded && !errored && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #2A0F0D 0%, #3A1510 50%, #2A0F0D 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.6s infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ fontSize: 28, opacity: 0.4 }}>📷</div>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, fontWeight: 600 }}>Loading…</div>
        </div>
      )}

      {/* Error state */}
      {errored && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#2A0F0D',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: 16,
          }}
        >
          <div style={{ fontSize: 28 }}>⚠️</div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, textAlign: 'center', lineHeight: 1.5 }}>
            Could not load image.{'\n'}Check Drive sharing permissions.
          </p>
        </div>
      )}

      {/* Actual image */}
      <img
        src={item.src}
        alt={item.alt}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Caption overlay on hover */}
      {loaded && item.caption && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '32px 14px 12px',
            background: 'linear-gradient(to top, rgba(22,8,7,0.85) 0%, transparent 100%)',
            opacity: 0,
            transition: 'opacity 0.25s ease',
          }}
          className="caption-overlay"
        >
          <p style={{ color: '#FFFEF8', fontSize: 12, fontWeight: 600, margin: 0 }}>{item.caption}</p>
        </div>
      )}
    </div>
  );
};

// ── PhotoGallery ──────────────────────────────────────────────────────────────
export const PhotoGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeFilter === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === CATEGORY_MAP[activeFilter]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const goNext = () => setLightboxIndex((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i));

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  return (
    <section
      id="gallery"
      style={{ padding: 'var(--section-padding)', background: 'var(--color-ink)' }}
    >
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .card-hover:hover .caption-overlay { opacity: 1 !important; }
      `}</style>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

        {/* Heading */}
        <RevealSection style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionBadge label="Photo Gallery" dark />
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 900,
              color: '#FFFEF8',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Our Activity in Pictures
          </h2>
          <p style={{ color: 'rgba(246,240,232,0.5)', fontSize: 15 }}>
            Photos from our outdoor activity at{' '}
            <strong style={{ color: '#C96A3A' }}>Haji Lane, Singapore</strong>
          </p>
        </RevealSection>

        {/* Filter buttons */}
        <RevealSection delay={100}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              justifyContent: 'center',
              marginBottom: 36,
            }}
          >
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  background: activeFilter === cat ? '#A44B2A' : 'rgba(255,249,239,0.06)',
                  border: `1px solid ${activeFilter === cat ? '#A44B2A' : 'rgba(164,75,42,0.25)'}`,
                  color: activeFilter === cat ? '#FFFEF8' : 'rgba(246,240,232,0.6)',
                  padding: '7px 18px',
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </RevealSection>

        {/* Gallery grid */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            {filtered.map((item, i) => (
              <RevealSection key={item.id} delay={i * 40}>
                <GalleryCard item={item} onClick={() => openLightbox(i)} />
              </RevealSection>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(246,240,232,0.35)', fontSize: 15 }}>
            No photos in this category yet.
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <Lightbox
          item={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < filtered.length - 1}
        />
      )}
    </section>
  );
};
