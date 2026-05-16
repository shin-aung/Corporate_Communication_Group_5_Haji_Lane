import React, { useState } from 'react';
import { teamMembers } from '../../data/teamMembers';
import { TeamCard } from './TeamCard';
import { ProfileModal } from './ProfileModal';
import { RevealSection } from '../common/RevealSection';
import { SectionBadge } from '../common/SectionBadge';

const GROUP_PHOTOS = [
  {
    src: '/media/images/gallery/group-photo-01.jpg',
    alt: 'Group 5 at Haji Lane — outdoor activity',
    caption: 'Haji Lane · May 2026',
  },
  {
    src: '/media/images/gallery/group-photo-02.jpg',
    alt: 'Group 5 at AceTek College',
    caption: 'AceTek College · Group 5',
  },
];

export const TeamSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedMember = selectedIndex !== null ? teamMembers[selectedIndex] : null;

  return (
    <section
      id="about"
      style={{ padding: 'var(--section-padding)', background: 'var(--color-beige)' }}
    >
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>

        {/* Heading */}
        <RevealSection style={{ textAlign: 'center', marginBottom: 40 }}>
          <SectionBadge label="About the Team" />
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 900,
              color: 'var(--color-maroon)',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Meet Group 5
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
            Five individuals. Three countries. One team. Click on a profile to learn more.
          </p>
        </RevealSection>

        {/* Group Photos */}
        <RevealSection delay={80} style={{ marginBottom: 52 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {GROUP_PHOTOS.map((photo) => (
              <div
                key={photo.src}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '3px solid var(--color-paper)',
                  boxShadow: '0 8px 32px rgba(58,15,13,0.14)',
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={{
                    width: '100%',
                    height: 320,
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
                {/* Caption overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '28px 20px 14px',
                    background: 'linear-gradient(to top, rgba(58,15,13,0.75) 0%, transparent 100%)',
                  }}
                >
                  <p
                    style={{
                      color: '#FFFEF8',
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: 0.5,
                    }}
                  >
                    📍 {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Team Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {teamMembers.map((member, i) => (
            <RevealSection key={member.id} delay={i * 100}>
              <TeamCard
                member={member}
                isSelected={selectedIndex === i}
                onClick={() => setSelectedIndex(i)}
              />
            </RevealSection>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      {selectedMember && (
        <ProfileModal
          member={selectedMember}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
};
