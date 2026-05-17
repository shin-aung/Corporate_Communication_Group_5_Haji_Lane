import React from "react";
import { teamMembers } from "../../data/teamMembers";
import { RevealSection } from "../common/RevealSection";
import { SectionBadge } from "../common/SectionBadge";
import { QRCode } from "../common/QRCode";

export const LinksSection: React.FC = () => (
  <section
    id="links"
    style={{
      padding: "var(--section-padding)",
      background: "linear-gradient(160deg, #160807, #3A0F0D)",
    }}
  >
    <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
      <RevealSection style={{ textAlign: "center", marginBottom: 64 }}>
        <SectionBadge label="Achievements & Links" dark />
        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900,
            color: "#FFFEF8",
            lineHeight: 1.1,
          }}
        >
          Our Work & Projects
        </h2>
      </RevealSection>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {teamMembers.map((member, i) => (
          <RevealSection key={member.id} delay={i * 100}>
            <div
              style={{
                background: "rgba(255,249,239,0.06)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(164,75,42,0.2)",
                borderRadius: "var(--radius-md)",
                padding: 24,
              }}
            >
              {/* Member header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${member.color}, ${member.accentColor})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFEF8",
                    fontSize: 14,
                    fontWeight: 800,
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {member.initials}
                </div>
                <div>
                  <div
                    style={{ color: "#FFFEF8", fontSize: 14, fontWeight: 700 }}
                  >
                    {member.shortName}
                  </div>
                  <div style={{ color: "rgba(246,240,232,0.5)", fontSize: 11 }}>
                    {member.flag} {member.from}
                  </div>
                </div>
              </div>

              {/* Links */}
              {member.links.length > 0 ? (
                member.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      background: "rgba(164,75,42,0.18)",
                      border: "1px solid rgba(164,75,42,0.3)",
                      borderRadius: 8,
                      padding: "8px 14px",
                      color: "#C96A3A",
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 8,
                      transition: "background 0.2s",
                    }}
                  >
                    <div
                      style={{
                        background: "#FFFFFF",
                        borderRadius: 12,
                        padding: 12,
                        border: `2px solid ${member.accentColor}25`,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        display: "inline-flex",
                      }}
                    >
                      <QRCode
                        value={link.url}
                        size={160}
                        fgColor="#160807"
                        bgColor="#FFFFFF"
                        quietZone={2}
                      />
                    </div>
                  </a>
                ))
              ) : (
                <div
                  style={{
                    border: "1px dashed rgba(164,75,42,0.3)",
                    borderRadius: 8,
                    padding: "10px 14px",
                    color: "rgba(246,240,232,0.3)",
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  {member.isPending
                    ? "Links to be confirmed"
                    : "Add achievement links"}
                </div>
              )}
            </div>
          </RevealSection>
        ))}
      </div>
    </div>
  </section>
);
