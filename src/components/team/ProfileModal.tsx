import React, { useState } from "react";
import type { TeamMember } from "../../types/TeamMember";

interface ProfileModalProps {
  member: TeamMember;
  onClose: () => void;
}

// ── LinkCard — shows label + clickable link + QR code ────────────────────────
interface LinkCardProps {
  label: string;
  url: string;
  accentColor: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ label, url, accentColor }) => {
  const [showQR, setShowQR] = useState(false);
  const isPlaceholder = url === "#";

  return (
    <div
      style={{
        border: `1px solid ${accentColor}30`,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 12,
        background: `${accentColor}08`,
      }}
    >
      {/* Top row — label + buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          🔗
        </div>

        {/* Label + URL */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              color: "var(--color-ink)",
              fontSize: 13,
              fontWeight: 700,
              margin: 0,
              marginBottom: 2,
              lineHeight: 1.3,
            }}
          >
            {label}
          </p>
          {!isPlaceholder && (
            <p
              style={{
                color: "var(--color-muted)",
                fontSize: 11,
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {url}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          {!isPlaceholder && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: accentColor,
                color: "#FFFEF8",
                fontSize: 11,
                fontWeight: 700,
                padding: "5px 12px",
                borderRadius: 100,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                whiteSpace: "nowrap",
                transition: "opacity 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Open ↗
            </a>
          )}
          {!isPlaceholder && (
            <button
              onClick={() => setShowQR((v) => !v)}
              aria-label={showQR ? "Hide QR code" : "Show QR code"}
              style={{
                background: showQR ? accentColor : "transparent",
                border: `1px solid ${accentColor}50`,
                color: showQR ? "#FFFEF8" : accentColor,
                fontSize: 11,
                fontWeight: 700,
                padding: "5px 12px",
                borderRadius: 100,
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {showQR ? "✕ QR" : "⊡ QR"}
            </button>
          )}
        </div>
      </div>

      {/* QR code panel */}
      {showQR && !isPlaceholder && (
        <div
          style={{
            borderTop: `1px solid ${accentColor}20`,
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            background: "#FFFEF8",
          }}
        >
          {/* QR code in a white framed card */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 12,
              padding: 12,
              border: `2px solid ${accentColor}25`,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              display: "inline-flex",
            }}
          >
            <img
              src={url}
              alt={`${label} QR Code`}
              style={{ width: 160, height: 160, objectFit: "contain" }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <p
              style={{
                color: "var(--color-muted)",
                fontSize: 12,
                fontWeight: 600,
                margin: 0,
                marginBottom: 4,
              }}
            >
              Scan to open
            </p>
            <p
              style={{
                color: "var(--color-muted-light)",
                fontSize: 10,
                margin: 0,
                maxWidth: 220,
                lineHeight: 1.5,
              }}
            >
              Point your phone camera at the QR code or tap "Open ↗" above
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ── ProfileModal ──────────────────────────────────────────────────────────────
export const ProfileModal: React.FC<ProfileModalProps> = ({
  member,
  onClose,
}) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-label={`${member.name} profile`}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "rgba(22,8,7,0.85)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}
    onClick={onClose}
  >
    <div
      style={{
        background: "var(--color-paper)",
        borderRadius: "var(--radius-xl)",
        maxWidth: 660,
        width: "100%",
        maxHeight: "92vh",
        overflowY: "auto",
        position: "relative",
        boxShadow: "var(--shadow-modal)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${member.color}, ${member.accentColor})`,
          padding: "36px 36px 28px",
          borderRadius: "24px 24px 0 0",
          position: "relative",
          display: "flex",
          gap: 20,
          alignItems: "flex-start",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close profile modal"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "#FFFEF8",
            width: 32,
            height: 32,
            borderRadius: "50%",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Photo */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid rgba(255,255,255,0.4)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            flexShrink: 0,
          }}
        >
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          ) : (
            <div
              aria-hidden="true"
              style={{
                width: "100%",
                height: "100%",
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 800,
                color: "#FFFEF8",
                fontFamily: "var(--font-serif)",
              }}
            >
              {member.initials}
            </div>
          )}
        </div>

        <div style={{ paddingTop: 4 }}>
          {member.isPending && (
            <div
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.25)",
                color: "#FFFEF8",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                padding: "3px 10px",
                borderRadius: 100,
                marginBottom: 8,
                textTransform: "uppercase",
              }}
            >
              Profile Pending · Details Coming Soon
            </div>
          )}
          <h2
            style={{
              color: "#FFFEF8",
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 4,
              fontFamily: "var(--font-serif)",
              lineHeight: 1.2,
            }}
          >
            Hello, I am {member.name}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
            {member.flag} {member.from} · {member.role}
          </p>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div style={{ padding: "28px 36px 36px" }}>
        {member.about && (
          <div style={{ marginBottom: 24 }}>
            <p
              style={{
                color: "var(--color-muted)",
                fontSize: 15,
                lineHeight: 1.8,
              }}
            >
              {member.about}
            </p>
          </div>
        )}

        {/* Education */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={labelStyle}>Education</h4>
          {member.education.map((edu) => (
            <div key={edu} style={listItemStyle}>
              🎓 {edu}
            </div>
          ))}
        </div>

        {/* Strengths */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={labelStyle}>Strengths</h4>
          <div style={tagRowStyle}>
            {member.strengths.map((s) => (
              <span
                key={s}
                style={{
                  ...tagStyle,
                  background: `${member.color}18`,
                  color: member.color,
                  border: `1px solid ${member.color}30`,
                }}
              >
                ⭐ {s}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={labelStyle}>Things I Love</h4>
          <div style={tagRowStyle}>
            {member.interests.map((item) => (
              <span
                key={item}
                style={{
                  ...tagStyle,
                  background: "rgba(164,75,42,0.08)",
                  color: "var(--color-muted)",
                  border: "1px solid rgba(164,75,42,0.15)",
                }}
              >
                ❤️ {item}
              </span>
            ))}
          </div>
        </div>

        {/* Values */}
        {member.values && member.values.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h4 style={labelStyle}>Values & Goals</h4>
            {member.values.map((v) => (
              <div
                key={v}
                style={{
                  color: "var(--color-muted)",
                  fontSize: 14,
                  padding: "6px 0 6px 16px",
                  borderLeft: "2px solid rgba(164,75,42,0.4)",
                }}
              >
                {v}
              </div>
            ))}
          </div>
        )}

        {/* Goals */}
        {member.goals && member.goals.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h4 style={labelStyle}>Goals</h4>
            {member.goals.map((g) => (
              <div key={g} style={listItemStyle}>
                🎯 {g}
              </div>
            ))}
          </div>
        )}

        {/* Tools */}
        {member.tools && member.tools.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h4 style={labelStyle}>Tools</h4>
            <div style={tagRowStyle}>
              {member.tools.map((tool) => (
                <span
                  key={tool}
                  style={{
                    ...tagStyle,
                    background: "rgba(164,75,42,0.08)",
                    color: "var(--color-muted)",
                    border: "1px solid rgba(164,75,42,0.15)",
                  }}
                >
                  🛠️ {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Links with QR Codes ─────────────────────────────────── */}
        {member.links.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h4 style={labelStyle}>Links & Achievements</h4>
            <p
              style={{
                color: "var(--color-muted-light)",
                fontSize: 12,
                marginBottom: 14,
                lineHeight: 1.5,
              }}
            >
              Tap{" "}
              <strong style={{ color: "var(--color-copper)" }}>Open ↗</strong>{" "}
              to visit the link, or tap{" "}
              <strong style={{ color: "var(--color-copper)" }}>⊡ QR</strong> to
              reveal a scannable QR code.
            </p>
            {member.links.map((link) => (
              <LinkCard
                key={link.url + link.label}
                label={link.label}
                url={member.qrCodeSrc || link.url} // If qrCodeSrc exists, we use a placeholder URL to disable the "Open" button, since the QR code will be the primary way to access the link
                accentColor={member.accentColor}
              />
            ))}
          </div>
        )}

        {/* Pending notice */}
        {member.isPending && (
          <div
            style={{
              background: "rgba(164,75,42,0.06)",
              border: "1px dashed rgba(164,75,42,0.35)",
              borderRadius: "var(--radius-md)",
              padding: 20,
              textAlign: "center",
              marginBottom: 28,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>📝</div>
            <p
              style={{
                color: "var(--color-copper)",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Profile in Progress
            </p>
            <p style={{ color: "var(--color-muted)", fontSize: 12 }}>
              Aung Min Thant's full profile details are being confirmed by the
              team. This section will be updated before final submission.
            </p>
          </div>
        )}

        {/* ── About Me Image ──────────────────────────────────────── */}
        {member.aboutImage ? (
          <div style={{ marginTop: 8 }}>
            <h4 style={{ ...labelStyle, marginBottom: 14 }}>About Me</h4>
            <div
              style={{
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                border: "2px solid rgba(164,75,42,0.15)",
                boxShadow: "0 8px 24px rgba(58,15,13,0.1)",
              }}
            >
              <img
                src={member.aboutImage}
                alt={`${member.name} About Me`}
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </div>
        ) : member.isPending ? (
          <div
            style={{
              marginTop: 8,
              border: "1px dashed rgba(164,75,42,0.3)",
              borderRadius: "var(--radius-md)",
              padding: "32px 20px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>🖼️</div>
            <p style={{ color: "rgba(164,75,42,0.6)", fontSize: 13 }}>
              About Me image placeholder — add photo when confirmed
            </p>
          </div>
        ) : null}
      </div>
    </div>
  </div>
);

// ── Shared micro-styles ───────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  color: "var(--color-copper)",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  marginBottom: 12,
};
const listItemStyle: React.CSSProperties = {
  color: "var(--color-ink)",
  fontSize: 14,
  padding: "8px 0",
  borderBottom: "1px solid rgba(164,75,42,0.08)",
};
const tagRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};
const tagStyle: React.CSSProperties = {
  fontSize: 12,
  padding: "5px 14px",
  borderRadius: 100,
  fontWeight: 600,
};
