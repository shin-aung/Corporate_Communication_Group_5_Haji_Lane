import React from 'react';
import type { TeamMember } from '../../types/TeamMember';

interface TeamCardProps {
  member: TeamMember;
  isSelected: boolean;
  onClick: () => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, isSelected, onClick }) => (
  <article
    className="card-hover"
    onClick={onClick}
    style={{
      background: 'var(--color-paper)',
      border: `2px solid ${isSelected ? 'var(--color-copper)' : 'rgba(164,75,42,0.12)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: 28,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Pending badge */}
    {member.isPending && (
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'var(--color-copper)',
          color: '#FFFEF8',
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 1,
          padding: '3px 8px',
          borderRadius: 100,
          textTransform: 'uppercase',
          animation: 'pulse 2s infinite',
          zIndex: 1,
        }}
      >
        PENDING
      </div>
    )}

    {/* Avatar — real photo or styled initials placeholder */}
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        marginBottom: 16,
        overflow: 'hidden',
        border: `3px solid ${isSelected ? 'var(--color-copper)' : 'rgba(164,75,42,0.2)'}`,
        boxShadow: `0 4px 16px ${member.color}40`,
        flexShrink: 0,
      }}
    >
      {member.image ? (
        <img
          src={member.image}
          alt={`${member.name} profile photo`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${member.color}, ${member.accentColor})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 800,
            color: '#FFFEF8',
            fontFamily: 'var(--font-serif)',
          }}
        >
          {member.initials}
        </div>
      )}
    </div>

    <h3
      className="font-serif"
      style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-maroon)', marginBottom: 4 }}
    >
      {member.name}
    </h3>
    <p style={{ color: 'var(--color-copper)', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
      {member.flag} {member.from}
    </p>
    <p style={{ color: 'var(--color-muted)', fontSize: 13, marginBottom: 16 }}>{member.role}</p>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {member.interests.slice(0, 2).map((interest) => (
        <span
          key={interest}
          style={{
            background: 'rgba(164,75,42,0.1)',
            color: 'var(--color-copper)',
            fontSize: 10,
            padding: '3px 10px',
            borderRadius: 100,
            fontWeight: 600,
          }}
        >
          {interest}
        </span>
      ))}
    </div>

    <div style={{ marginTop: 16, color: 'var(--color-copper)', fontSize: 12, fontWeight: 600 }}>
      View Profile →
    </div>
  </article>
);
