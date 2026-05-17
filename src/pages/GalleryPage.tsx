import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { galleryImages, galleryVideos } from '../data/media';
import type { ImageItem } from '../types/MediaItem';
import { GalleryCard } from '../components/gallery/PhotoGallery';
import { RevealSection } from '../components/common/RevealSection';
import { SectionBadge } from '../components/common/SectionBadge';

// ── Types ─────────────────────────────────────────────────────────────────────
type FilterCategory = 'All' | 'Haji Lane' | 'History';

const FILTER_CATEGORIES: FilterCategory[] = [
  'All',
  'Haji Lane',
  'History',
];

const CATEGORY_MAP: Record<FilterCategory, string> = {
  'All': 'all',
  'Haji Lane': 'haji-lane',
  'History': 'history',
};

// ── Helpers ───────────────────────────────────────────────────────────────────
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

const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onPrev, onNext, onClose]);

  return (
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
};

const navBtnStyle = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'fixed', top: '50%', [side]: 12, transform: 'translateY(-50%)',
  background: 'rgba(164,75,42,0.75)', border: 'none', color: '#FFFEF8',
  width: 44, height: 44, borderRadius: '50%', fontSize: 28, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 301,
});

// ── VideoCard ─────────────────────────────────────────────────────────────────
// interface VideoCardProps {
//   title: string;
//   description?: string;
//   embedSrc: string;
// }

// const VideoCard: React.FC<VideoCardProps> = ({ title, description, embedSrc }) => {
//   const [playing, setPlaying] = useState(false);

//   return (
//     <div className="card-hover" style={{ background: 'var(--color-paper)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid rgba(164,75,42,0.12)', display: 'flex', flexDirection: 'column' }}>
//       <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0E0606', overflow: 'hidden' }}>
//         {playing ? (
//           <iframe src={embedSrc} title={title} allow="autoplay" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
//         ) : (
//           <button onClick={() => setPlaying(true)} aria-label={`Play ${title}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, #3A0F0D 0%, #160807 100%)', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: 0 }}>
//             <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 14, background: 'repeating-linear-gradient(90deg, rgba(164,75,42,0.4) 0px, rgba(164,75,42,0.4) 10px, transparent 10px, transparent 20px)' }} />
//             <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 14, background: 'repeating-linear-gradient(90deg, rgba(164,75,42,0.4) 0px, rgba(164,75,42,0.4) 10px, transparent 10px, transparent 20px)' }} />
//             <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(164,75,42,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.25)', boxShadow: '0 4px 20px rgba(164,75,42,0.5)', fontSize: 22, paddingLeft: 4, color: '#FFFEF8' }}>▶</div>
//             <span style={{ color: 'rgba(246,240,232,0.65)', fontSize: 12, fontWeight: 600, letterSpacing: 0.5, fontFamily: 'var(--font-sans)' }}>Click to play</span>
//           </button>
//         )}
//       </div>
//       <div style={{ padding: '16px 20px 20px', flex: 1 }}>
//         <h4 className="font-serif" style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-maroon)', marginBottom: 6 }}>{title}</h4>
//         {description && <p style={{ color: 'var(--color-muted)', fontSize: 13, lineHeight: 1.6 }}>{description}</p>}
//         {playing && (
//           <button onClick={() => setPlaying(false)} style={{ marginTop: 12, background: 'none', border: '1px solid rgba(164,75,42,0.3)', color: 'var(--color-copper)', fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 100, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>⏹ Stop</button>
//         )}
//       </div>
//     </div>
//   );
// };

// ── GalleryPage ───────────────────────────────────────────────────────────────
type ActiveTab = 'photos' 
// | 'videos'
;

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>('photos');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === CATEGORY_MAP[activeFilter]);

  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const goNext = () => setLightboxIndex((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-ink)', paddingTop: 64 }}>
      <style>{`
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .card-hover:hover .caption-overlay { opacity: 1 !important; }
      `}</style>

      {/* ── Page Header ────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(160deg, #3A0F0D 0%, #160807 100%)', padding: '60px 24px 48px', position: 'relative', overflow: 'hidden' }}>
        {/* Texture */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23A44B2A' fill-opacity='0.07'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            style={{ background: 'rgba(164,75,42,0.2)', border: '1px solid rgba(164,75,42,0.4)', color: '#C96A3A', padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', marginBottom: 32, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(164,75,42,0.35)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(164,75,42,0.2)'; }}
          >
            ← Back to Home
          </button>

          <div style={{ textAlign: 'center' }}>
            <SectionBadge label="Full Gallery" dark />
            <h1 className="font-serif" style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, color: '#FFFEF8', lineHeight: 1, marginBottom: 12 }}>
              Photos <span style={{ color: '#A44B2A', fontStyle: 'italic' }}>&</span> Videos
            </h1>
            <p style={{ color: 'rgba(246,240,232,0.5)', fontSize: 15, maxWidth: 480, margin: '0 auto' }}>
              Every moment from our outdoor activity at Haji Lane, Singapore — May 2026
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 28 }}>
              {[
                { value: galleryImages.length, label: 'Photos' },
                // { value: galleryVideos.length, label: 'Videos' },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div className="font-serif" style={{ fontSize: 32, fontWeight: 900, color: '#A44B2A', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ color: 'rgba(246,240,232,0.5)', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab Switcher ────────────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid rgba(164,75,42,0.2)', background: '#160807', position: 'sticky', top: 64, zIndex: 50 }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 24px', display: 'flex', gap: 0 }}>
          {(['photos'] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: `3px solid ${activeTab === tab ? '#A44B2A' : 'transparent'}`,
                color: activeTab === tab ? '#C96A3A' : 'rgba(246,240,232,0.45)',
                padding: '16px 28px',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                letterSpacing: 0.5,
                textTransform: 'capitalize',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {tab === 'photos' ? '📷' : '🎬'} {tab}
              <span style={{ background: activeTab === tab ? 'rgba(164,75,42,0.25)' : 'rgba(255,255,255,0.06)', color: activeTab === tab ? '#C96A3A' : 'rgba(246,240,232,0.35)', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>
                {tab === 'photos' ? galleryImages.length : galleryVideos.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Photos Tab ─────────────────────────────────────────────── */}
      {activeTab === 'photos' && (
        <div style={{ padding: '48px 24px 80px' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

            {/* Category filters */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 36 }}>
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{ background: activeFilter === cat ? '#A44B2A' : 'rgba(255,249,239,0.06)', border: `1px solid ${activeFilter === cat ? '#A44B2A' : 'rgba(164,75,42,0.25)'}`, color: activeFilter === cat ? '#FFFEF8' : 'rgba(246,240,232,0.6)', padding: '7px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, transition: 'all 0.2s', fontFamily: 'var(--font-sans)', cursor: 'pointer' }}
                >
                  {cat}
                  <span style={{ marginLeft: 6, opacity: 0.7, fontSize: 11 }}>
                    ({cat === 'All' ? galleryImages.length : galleryImages.filter(img => img.category === CATEGORY_MAP[cat]).length})
                  </span>
                </button>
              ))}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                {filtered.map((item, i) => (
                  <RevealSection key={item.id} delay={i * 30}>
                    <GalleryCard item={item} onClick={() => setLightboxIndex(i)} />
                  </RevealSection>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(246,240,232,0.3)', fontSize: 15 }}>
                No photos in this category yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Videos Tab ─────────────────────────────────────────────── */}
      {/* {activeTab === 'videos' && (
        <div style={{ padding: '48px 24px 80px' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
            {galleryVideos.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                {galleryVideos.map((vid, i) => (
                  <RevealSection key={vid.id} delay={i * 80}>
                    <VideoCard title={vid.title} description={vid.description} embedSrc={vid.embedSrc} />
                  </RevealSection>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(246,240,232,0.3)', fontSize: 15 }}>
                No videos yet.
              </div>
            )}
          </div>
        </div>
      )} */}

      {/* Lightbox */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <Lightbox item={filtered[lightboxIndex]} onClose={closeLightbox} onPrev={goPrev} onNext={goNext} hasPrev={lightboxIndex > 0} hasNext={lightboxIndex < filtered.length - 1} />
      )}
    </div>
  );
};

export default GalleryPage;
