import { ImageResponse } from "next/og";

export const alt = "Bruma Studio — Dark arts of the digital craft.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D0D12",
          position: "relative",
        }}
      >
        {/* Subtle gold radial glow */}
        <div
          style={{
            position: "absolute",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,166,105,0.08) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent, #C9A669, transparent)",
          }}
        />

        {/* B monogram */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          width={64}
          height={64}
          style={{ marginBottom: 32 }}
        >
          <path
            d="M8 6h10c2.5 0 4.5 1 5.5 2.8 0.8 1.4 0.7 3.2-0.3 4.5 1.5 1.2 2.3 3 1.8 5-0.7 2.8-3 4.7-6 4.7H8V6z"
            stroke="#C9A669"
            strokeWidth="1.5"
            fill="none"
          />
          <line x1="11" y1="6" x2="11" y2="23" stroke="#C9A669" strokeWidth="1.5" />
          <line x1="11" y1="14" x2="20" y2="14" stroke="#C9A669" strokeWidth="1" />
          <circle cx="16" cy="27" r="1" fill="#C9A669" />
        </svg>

        {/* Studio name */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#C9A669",
            letterSpacing: 12,
            textTransform: "uppercase",
            fontFamily: "serif",
          }}
        >
          Bruma Studio
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 20,
            color: "#E8E2D6",
            marginTop: 16,
            letterSpacing: 4,
            opacity: 0.7,
            fontFamily: "serif",
          }}
        >
          Dark arts of the digital craft.
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent, #C9A669, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
