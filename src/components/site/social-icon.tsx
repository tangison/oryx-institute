/**
 * Social channel marks, drawn as minimal line icons in the site's own
 * register (1.4px strokes, currentColor) — icon-only links get their
 * label from the wrapping anchor's aria-label. No brand scripts, no
 * embeds, no third-party requests.
 */

export type SocialName = "Instagram" | "Facebook" | "LinkedIn";

export function SocialIcon({ name }: { name: SocialName }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    "aria-hidden": true,
    focusable: false as const,
  };

  if (name === "Instagram") {
    return (
      <svg {...common} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.1" cy="6.9" r="0.4" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "Facebook") {
    return (
      <svg {...common}>
        <path
          d="M13.6 21v-7.1h2.4l.4-2.9h-2.8V9.2c0-.8.3-1.4 1.5-1.4h1.4V5.2c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.2v2.9h2.4V21h3z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M5.1 3.6a2.4 2.4 0 1 1-.05 4.8 2.4 2.4 0 0 1 .05-4.8zM3.1 9.4h4v11.2h-4V9.4zm6.1 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.66h-4v-5.02c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.92 1.3-1.92 2.65v5.11h-4V9.4z"
        fill="currentColor"
      />
    </svg>
  );
}
