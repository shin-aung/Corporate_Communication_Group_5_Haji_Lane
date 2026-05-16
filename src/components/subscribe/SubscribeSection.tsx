import React, { useState } from 'react';
import { RevealSection } from '../common/RevealSection';
import { SectionBadge } from '../common/SectionBadge';

const SOCIAL_LINKS = [
  { label: '📱 Instagram', href: '#' },
  { label: '💼 LinkedIn',  href: '#' },
  { label: '🐙 GitHub',    href: '#' },
  { label: '🌐 Website',   href: '#' },
];

export const SubscribeSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section
      id="subscribe"
      style={{ padding: 'var(--section-padding)', background: 'var(--color-beige)' }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>

        <RevealSection style={{ marginBottom: 48 }}>
          <SectionBadge label="Stay Connected" />
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
            Thank You
            <br />
            <span style={{ color: 'var(--color-copper)', fontStyle: 'italic' }}>
              for Following Along
            </span>
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: 16, lineHeight: 1.8 }}>
            This has been Group 5's outdoor adventure — a story of exploration, connection and
            communication through the vibrant streets of Haji Lane, Singapore.
          </p>
        </RevealSection>

        {/* Subscribe form */}
        <RevealSection delay={100} style={{ marginBottom: 36 }}>
          <div
            style={{
              background: 'var(--color-paper)',
              border: '1px solid rgba(164,75,42,0.12)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px 40px',
            }}
          >
            {!submitted ? (
              <>
                <h3
                  className="font-serif"
                  style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-maroon)', marginBottom: 8 }}
                >
                  Subscribe for Updates
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: 14, marginBottom: 24 }}>
                  Get notified when we publish more content.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    aria-label="Email address"
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    style={{
                      flex: 1,
                      minWidth: 200,
                      padding: '12px 18px',
                      border: '1.5px solid rgba(164,75,42,0.2)',
                      borderRadius: 10,
                      fontSize: 14,
                      fontFamily: 'var(--font-sans)',
                      background: 'var(--color-white)',
                      color: 'var(--color-ink)',
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={handleSubmit}
                    style={{
                      background: 'var(--color-copper)',
                      border: 'none',
                      color: '#FFFEF8',
                      padding: '12px 28px',
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sans)',
                      transition: 'background 0.2s',
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#C96A3A';
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#A44B2A';
                    }}
                  >
                    Subscribe →
                  </button>
                </div>
              </>
            ) : (
              <div>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
                <h3
                  className="font-serif"
                  style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-maroon)', marginBottom: 8 }}
                >
                  Thank you!
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: 14 }}>
                  You're subscribed. We'll keep you updated!
                </p>
              </div>
            )}
          </div>
        </RevealSection>

        {/* Social links */}
        <RevealSection delay={150} style={{ marginBottom: 48 }}>
          <p
            style={{
              color: 'var(--color-muted)',
              fontSize: 13,
              marginBottom: 16,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Follow Us
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--color-paper)',
                  border: '1px solid rgba(164,75,42,0.2)',
                  borderRadius: 100,
                  padding: '9px 20px',
                  color: 'var(--color-muted)',
                  fontSize: 13,
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  display: 'inline-block',
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = '#A44B2A';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#A44B2A';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(164,75,42,0.2)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-muted)';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
};
