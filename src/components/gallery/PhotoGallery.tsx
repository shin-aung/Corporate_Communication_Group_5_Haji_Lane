import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { galleryImages } from '../../data/media';
import type { ImageItem } from '../../types/MediaItem';
import { RevealSection } from '../common/RevealSection';
import { SectionBadge } from '../common/SectionBadge';

// How many images to show on the home page preview
const HOME_PREVIEW_LIMIT = 6;

// Swap sz=s1600 → sz=s3200 for lightbox full-res
const toHighRes = (src: string) => src.replace('sz=s1600', 'sz=s3200');

// ── Lightbox ──────────────────────────────────────────────────────────────────
interface LightboxProps {
  item: ImageItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onPrev, onNext, hasPrev, hasNext }) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-label={item.alt}
    onClick={onClose}
    style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 64px' }}
  >
    {hasPrev && (
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous image" style={navBtnStyle('left')}>‹</button>
    )}
    <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '88vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <img src={toHighRes(item.src)} alt={item.alt} style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 12, boxShadow: '0 24px 64px rgba(0,0,0,0.6)', display: 'block' }} />
      {item.caption && <p style={{ color: 'rgba(246,240,232,0.75)', fontSize: 14, textAlign: 'center', margin: 0 }}>{item.caption}</p>}
    </div>
    {hasNext && (
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next image" style={navBtnStyle('right')}>›</button>
    )}
    <button onClick={onClose} aria-label="Close lightbox" style={{ position: 'fixed', top: 20, right: 24, background: 'rgba(255,255,255,0.12)', border: 'none', color: '#FFFEF8', width: 40, height: 40, borderRadius: '50%', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
  </div>
);

const navBtnStyle = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'fixed', top: '50%', [side]: 12, transform: 'translateY(-50%)',
  background: 'rgba(164,75,42,0.75)', border: 'none', color: '#FFFEF8',
  width: 44, height: 44, borderRadius: '50%', fontSize: 28, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 301,
});

// ── GalleryCard ───────────────────────────────────────────────────────────────
export interface GalleryCardProps {
  item: ImageItem;
  onClick: () => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick }) => {
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
      style={{ borderRadius: 'var(--radius-md)', aspectRatio: '4/3', cursor: 'pointer', position: 'relative', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.06)', background: '#1C0A08' }}
    >
      {!loaded && !errored && (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #2A0F0D 0%, #3A1510 50%, #2A0F0D 100%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 28, opacity: 0.35 }}>📷</div>
          <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, fontWeight: 600 }}>Loading…</div>
        </div>
      )}
      {errored && (
        <div style={{ position: 'absolute', inset: 0, background: '#1C0A08', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 24 }}>⚠️</div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, lineHeight: 1.5, margin: 0 }}>Could not load image.<br />Check Drive sharing permissions.</p>
        </div>
      )}
      <img src={item.src} alt={item.alt} onLoad={() => setLoaded(true)} onError={() => setErrored(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }} />
      {loaded && item.caption && (
        <div aria-hidden="true" className="caption-overlay" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 14px 12px', background: 'linear-gradient(to top, rgba(22,8,7,0.85) 0%, transparent 100%)', opacity: 0, transition: 'opacity 0.25s ease' }}>
          <p style={{ color: '#FFFEF8', fontSize: 12, fontWeight: 600, margin: 0 }}>{item.caption}</p>
        </div>
      )}
    </div>
  );
};

// ── PhotoGallery (home page preview — limited to HOME_PREVIEW_LIMIT) ──────────
export const PhotoGallery: React.FC = () => {
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Only show the first N images on the home page
  const preview = galleryImages.slice(0, HOME_PREVIEW_LIMIT);
  const hasMore = galleryImages.length > HOME_PREVIEW_LIMIT;

  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const goNext = () => setLightboxIndex((i) => (i !== null && i < preview.length - 1 ? i + 1 : i));

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
    <section id="gallery" style={{ padding: 'var(--section-padding)', background: 'var(--color-ink)' }}>
      <style>{`
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .card-hover:hover .caption-overlay { opacity: 1 !important; }
      `}</style>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

        {/* Heading */}
        <RevealSection style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionBadge label="Photo Gallery" dark />
          <h2 className="font-serif" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#FFFEF8', lineHeight: 1.1, marginBottom: 16 }}>
            Our Activity in Pictures
          </h2>
          <p style={{ color: 'rgba(246,240,232,0.5)', fontSize: 15 }}>
            Photos from our outdoor activity at <strong style={{ color: '#C96A3A' }}>Haji Lane, Singapore</strong>
          </p>
        </RevealSection>

        {/* Grid — limited preview */}
        {preview.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {preview.map((item, i) => (
              <RevealSection key={item.id} delay={i * 40}>
                <GalleryCard item={item} onClick={() => setLightboxIndex(i)} />
              </RevealSection>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(246,240,232,0.35)', fontSize: 15 }}>
            No photos yet.
          </div>
        )}

        {/* See More button */}
        {hasMore && (
          <RevealSection delay={100} style={{ textAlign: 'center', marginTop: 48 }}>
            {/* Count badge */}
            <p style={{ color: 'rgba(246,240,232,0.4)', fontSize: 13, marginBottom: 20 }}>
              Showing <strong style={{ color: '#C96A3A' }}>{HOME_PREVIEW_LIMIT}</strong> of{' '}
              <strong style={{ color: '#C96A3A' }}>{galleryImages.length}</strong> photos
            </p>

            <button
              onClick={() => navigate('/gallery')}
              style={{
                background: 'transparent',
                border: '2px solid #A44B2A',
                color: '#C96A3A',
                padding: '14px 40px',
                borderRadius: 100,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                letterSpacing: 0.5,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all 0.25s ease',
              }}
              onMouseOver={(e) => {
                const btn = e.currentTarget;
                btn.style.background = '#A44B2A';
                btn.style.color = '#FFFEF8';
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 8px 28px rgba(164,75,42,0.4)';
              }}
              onMouseOut={(e) => {
                const btn = e.currentTarget;
                btn.style.background = 'transparent';
                btn.style.color = '#C96A3A';
                btn.style.transform = 'none';
                btn.style.boxShadow = 'none';
              }}
            >
              See All Photos & Videos
              <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
            </button>
          </RevealSection>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && preview[lightboxIndex] && (
        <Lightbox item={preview[lightboxIndex]} onClose={closeLightbox} onPrev={goPrev} onNext={goNext} hasPrev={lightboxIndex > 0} hasNext={lightboxIndex < preview.length - 1} />
      )}
    </section>
  );
};
