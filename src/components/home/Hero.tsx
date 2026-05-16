import React from 'react';
import { siteMeta } from '../../data/siteMeta';
import { Button } from '../common/Button';

interface CollageCard {
  label: string;
  emoji: string;
  rotate: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  animation: string;
  delay: string;
  bg: string;
}

const COLLAGE_CARDS: CollageCard[] = [
  { label: 'Haji Lane',     emoji: '🎨', rotate: '-8deg', top: '18%', left: '4%',  animation: 'floatA 6s ease-in-out infinite', delay: '0s',   bg: '#FFF0E0' },
  { label: 'Kampong Glam', emoji: '🕌', rotate: '5deg',  top: '10%', right: '5%', animation: 'floatB 7s ease-in-out infinite', delay: '1s',   bg: '#F5E8D0' },
  { label: 'Group 5',       emoji: '⭐', rotate: '-3deg', bottom: '22%', left: '3%',  animation: 'floatC 8s ease-in-out infinite', delay: '0.5s', bg: '#FFF9EF' },
  { label: 'May 2026',      emoji: '📅', rotate: '7deg',  bottom: '15%', right: '4%', animation: 'floatA 9s ease-in-out infinite', delay: '1.5s', bg: '#F8EDD8' },
  { label: 'Street Art',    emoji: '🌈', rotate: '-6deg', top: '52%', left: '6%',  animation: 'floatB 7.5s ease-in-out infinite', delay: '2s',  bg: '#FFF5E6' },
  { label: 'Singapore',     emoji: '🦁', rotate: '4deg',  top: '55%', right: '6%', animation: 'floatC 6.5s ease-in-out infinite', delay: '0.8s', bg: '#F0E8DC' },
];

const META_ITEMS = [
  { label: 'Module',   val: siteMeta.module },
  { label: 'Activity', val: siteMeta.activity },
  { label: 'Date',     val: siteMeta.date },
  { label: 'Lecturer', val: siteMeta.lecturer },
];

const TICKER_ITEMS = [
  '🎨 Haji Lane', '🕌 Kampong Glam', '✨ Street Art', '🤝 Group 5',
  '📸 Outdoor Activity', '🦁 Singapore', '💬 Corporate Communication', '🎓 AceTek College',
];

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const tickerContent = [...Array(6)].flatMap(() => TICKER_ITEMS).join('  ·  ');

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #3A0F0D 0%, #160807 60%, #2A1008 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 80,
      }}
    >
      {/* Texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A44B2A' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          opacity: 0.5,
        }}
      />

      {/* Floating collage cards */}
      {COLLAGE_CARDS.map((card, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            background: card.bg,
            borderRadius: 8,
            padding: '10px 14px',
            border: '2px solid rgba(164,75,42,0.3)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            animation: card.animation,
            animationDelay: card.delay,
            transform: `rotate(${card.rotate})`,
            top: card.top,
            left: card.left,
            right: card.right,
            bottom: card.bottom,
            zIndex: 1,
            minWidth: 110,
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: 22, display: 'block' }}>{card.emoji}</span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#3A0F0D',
              letterSpacing: 0.5,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {card.label}
          </span>
        </div>
      ))}

      {/* Main content */}
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '60px 24px',
          position: 'relative',
          zIndex: 2,
          width: '100%',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>

          {/* Edition badge */}
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(164,75,42,0.25)',
              border: '1px solid rgba(164,75,42,0.6)',
              borderRadius: 100,
              padding: '6px 18px',
              marginBottom: 24,
              animation: 'floatA 4s ease-in-out infinite',
            }}
          >
            <span
              style={{
                color: '#C96A3A',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {siteMeta.edition} · {siteMeta.group}
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="font-serif"
            style={{
              fontSize: 'clamp(52px, 10vw, 110px)',
              fontWeight: 900,
              color: '#FFFEF8',
              lineHeight: 0.9,
              letterSpacing: -2,
              marginBottom: 8,
            }}
          >
            THE
            <br />
            <span style={{ color: '#A44B2A', fontStyle: 'italic' }}>LOOP</span>
            <br />
            <span
              style={{
                fontSize: '0.55em',
                letterSpacing: 4,
                color: 'rgba(246,240,232,0.6)',
                fontStyle: 'normal',
                fontWeight: 600,
              }}
            >
              BY FIVE
            </span>
          </h1>

          {/* Meta bar */}
          <div
            style={{
              margin: '28px 0',
              borderTop: '1px solid rgba(164,75,42,0.4)',
              borderBottom: '1px solid rgba(164,75,42,0.4)',
              padding: '16px 0',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px 24px',
            }}
          >
            {META_ITEMS.map((m) => (
              <div key={m.label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    color: '#A44B2A',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    marginBottom: 2,
                  }}
                >
                  {m.label}
                </div>
                <div style={{ color: 'rgba(246,240,232,0.8)', fontSize: 13 }}>
                  {m.val}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              color: 'rgba(246,240,232,0.65)',
              fontSize: 15,
              maxWidth: 480,
              margin: '0 auto 36px',
              lineHeight: 1.7,
            }}
          >
            An editorial journey through the vibrant streets, cultural richness and
            shared stories of Group 5's outdoor adventure.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Button label="View Activities" onClick={() => scrollTo('programme')} variant="primary" />
            <Button label="Meet the Team"  onClick={() => scrollTo('about')}     variant="outline" />
            <Button label="Watch Videos"   onClick={() => scrollTo('videos')}    variant="outline" />
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(164,75,42,0.15)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid rgba(164,75,42,0.3)',
          overflow: 'hidden',
          height: 36,
          display: 'flex',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            animation: 'marqueeTicker 40s linear infinite',
            color: '#C96A3A',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          <span style={{ marginRight: 40 }}>{tickerContent}</span>
          <span style={{ marginRight: 40 }}>{tickerContent}</span>
        </div>
      </div>
    </section>
  );
};
