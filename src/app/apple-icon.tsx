import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D0D12",
          borderRadius: 36,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          width={120}
          height={120}
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
      </div>
    ),
    { ...size }
  );
}
