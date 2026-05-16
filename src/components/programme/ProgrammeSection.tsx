import React from 'react';
import { programmeCards, learningOutcomes } from '../../data/programme';
import { RevealSection } from '../common/RevealSection';
import { SectionBadge } from '../common/SectionBadge';

export const ProgrammeSection: React.FC = () => (
  <section
    id="programme"
    style={{
      padding: 'var(--section-padding)',
      background: 'linear-gradient(160deg, #3A0F0D 0%, #160807 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Diagonal texture */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23A44B2A' fill-opacity='0.08'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
      }}
    />

    <div
      style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Heading */}
      <RevealSection style={{ textAlign: 'center', marginBottom: 64 }}>
        <SectionBadge label="Outdoor Activity" dark />
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 900,
            color: '#FFFEF8',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          The Art of
          <br />
          <span style={{ color: '#A44B2A', fontStyle: 'italic' }}>
            Explore · Connect · Communicate
          </span>
        </h2>
        <p
          style={{
            color: 'rgba(246,240,232,0.65)',
            fontSize: 16,
            maxWidth: 560,
            margin: '0 auto',
          }}
        >
          PGDM students from Myanmar, Sri Lanka and India unite through communication,
          teamwork and shared discovery outside the classroom.
        </p>
      </RevealSection>

      {/* Programme cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          marginBottom: 60,
        }}
      >
        {programmeCards.map((card, i) => (
          <RevealSection key={card.title} delay={i * 120}>
            <div
              className="card-hover"
              style={{
                background: 'rgba(255,249,239,0.06)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(164,75,42,0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: 36,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>{card.icon}</div>
              <h3
                className="font-serif"
                style={{ color: '#FFFEF8', fontSize: 28, fontWeight: 700, marginBottom: 12 }}
              >
                {card.title}
              </h3>
              <p style={{ color: 'rgba(246,240,232,0.65)', fontSize: 14, lineHeight: 1.8 }}>
                {card.desc}
              </p>
            </div>
          </RevealSection>
        ))}
      </div>

      {/* Learning outcomes */}
      <RevealSection delay={200}>
        <div
          style={{
            background: 'rgba(255,249,239,0.05)',
            border: '1px solid rgba(164,75,42,0.25)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px 48px',
          }}
        >
          <h3
            className="font-serif"
            style={{
              color: '#FFFEF8',
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 24,
              textAlign: 'center',
            }}
          >
            Learning Outcomes
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {learningOutcomes.map((item) => (
              <div
                key={item}
                style={{
                  background: 'rgba(164,75,42,0.18)',
                  border: '1px solid rgba(164,75,42,0.4)',
                  borderRadius: 100,
                  padding: '8px 20px',
                  color: '#C96A3A',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </RevealSection>
    </div>
  </section>
);
