import React from "react";
import { useNavigate } from "react-router-dom";

const ProgrammePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <picture>
        {/* Phone image */}
        <source
          media="(max-width: 768px)"
          srcSet="/media/images/gallery/programme_schedule_phone.jpeg"
        />

        {/* PC image */}
        <img
          src="/media/images/gallery/programme_schedule_pc.jpeg"
          alt="Programme Schedule"
          style={{
            marginTop: "10vh",
            width: "90vw",
            maxHeight: "85vh",
            objectFit: "contain",
            display: "block",
          }}
        />
      </picture>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: 24,
          background: "rgba(164,75,42,0.2)",
          border: "1px solid rgba(164,75,42,0.4)",
          color: "#C96A3A",
          padding: "8px 18px",
          borderRadius: 100,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
          marginBottom: 20,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          transition: "all 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "rgba(164,75,42,0.35)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "rgba(164,75,42,0.2)";
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default ProgrammePage;
