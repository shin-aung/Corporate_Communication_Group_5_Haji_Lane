import React, { useState } from 'react';
import { galleryVideos } from '../../data/media';
import { RevealSection } from '../common/RevealSection';
import { SectionBadge } from '../common/SectionBadge';

// ── VideoCard ─────────────────────────────────────────────────────────────────
interface VideoCardProps {
  title: string;
  description?: string;
  embedSrc: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, description, embedSrc }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="card-hover"
      style={{
        background: 'var(--color-paper)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid rgba(164,75,42,0.12)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Player area */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          background: '#0E0606',
          overflow: 'hidden',
        }}
      >
        {playing ? (
          /* Google Drive iframe embed — plays natively in the browser */
          <iframe
            src={embedSrc}
            title={title}
            allow="autoplay"
            allowFullScreen
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        ) : (
          /* Click-to-play cover */
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #3A0F0D 0%, #160807 100%)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              padding: 0,
            }}
          >
            {/* Film strip decoration */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 14,
                background: 'repeating-linear-gradient(90deg, rgba(164,75,42,0.4) 0px, rgba(164,75,42,0.4) 10px, transparent 10px, transparent 20px)',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 14,
                background: 'repeating-linear-gradient(90deg, rgba(164,75,42,0.4) 0px, rgba(164,75,42,0.4) 10px, transparent 10px, transparent 20px)',
              }}
            />

            {/* Play icon */}
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'rgba(164,75,42,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(255,255,255,0.25)',
                boxShadow: '0 4px 20px rgba(164,75,42,0.5)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                fontSize: 22,
                paddingLeft: 4,
                color: '#FFFEF8',
              }}
            >
              ▶
            </div>

            <span
              style={{
                color: 'rgba(246,240,232,0.65)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 0.5,
                fontFamily: 'var(--font-sans)',
              }}
            >
              Click to play
            </span>
          </button>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '16px 20px 20px', flex: 1 }}>
        <h4
          className="font-serif"
          style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-maroon)', marginBottom: 6 }}
        >
          {title}
        </h4>
        {description && (
          <p style={{ color: 'var(--color-muted)', fontSize: 13, lineHeight: 1.6 }}>{description}</p>
        )}
        {playing && (
          <button
            onClick={() => setPlaying(false)}
            style={{
              marginTop: 12,
              background: 'none',
              border: `1px solid rgba(164,75,42,0.3)`,
              color: 'var(--color-copper)',
              fontSize: 12,
              fontWeight: 600,
              padding: '5px 14px',
              borderRadius: 100,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            ⏹ Stop
          </button>
        )}
      </div>
    </div>
  );
};

// ── VideoGallery ──────────────────────────────────────────────────────────────
export const VideoGallery: React.FC = () => (
  <section
    id="videos"
    style={{ padding: 'var(--section-padding)', background: 'var(--color-beige)' }}
  >
    <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

      {/* Heading */}
      <RevealSection style={{ textAlign: 'center', marginBottom: 64 }}>
        <SectionBadge label="Video Gallery" />
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 900,
            color: 'var(--color-maroon)',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Relive the Adventure
        </h2>
        <p style={{ color: 'var(--color-muted)', fontSize: 15 }}>
          Videos from our outdoor activity at{' '}
          <strong style={{ color: 'var(--color-copper)' }}>Haji Lane, Singapore</strong>
        </p>
      </RevealSection>

      {/* Video grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}
      >
        {galleryVideos.map((vid, i) => (
          <RevealSection key={vid.id} delay={i * 100}>
            <VideoCard
              title={vid.title}
              description={vid.description}
              embedSrc={vid.embedSrc}
            />
          </RevealSection>
        ))}
      </div>

      {/* Setup note for the team */}
      <RevealSection delay={200}>
        <div
          style={{
            marginTop: 48,
            background: 'rgba(164,75,42,0.07)',
            border: '1px dashed rgba(164,75,42,0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 28px',
            display: 'flex',
            gap: 14,
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: 22, flexShrink: 0 }}>📋</span>
          <div>
            <p style={{ color: 'var(--color-copper)', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
              To update videos
            </p>
            <p style={{ color: 'var(--color-muted)', fontSize: 13, lineHeight: 1.7 }}>
              Open <code style={{ background: 'rgba(164,75,42,0.1)', padding: '1px 6px', borderRadius: 4, color: 'var(--color-copper)' }}>src/data/media.ts</code> and
              replace each <code style={{ background: 'rgba(164,75,42,0.1)', padding: '1px 6px', borderRadius: 4, color: 'var(--color-copper)' }}>REPLACE_WITH_FILE_ID</code> with
              the actual Google Drive file ID. Make sure each file is shared as <strong>"Anyone with the link"</strong>.
            </p>
          </div>
        </div>
      </RevealSection>
    </div>
  </section>
);
