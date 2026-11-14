/**
 * Social channel marks, drawn as minimal line icons in the site's own
 * register (1.4px strokes, currentColor); icon-only links get their
 * label from the wrapping anchor's aria-label. No brand scripts, no
 * embeds, no third-party requests.
 */

export type SocialName = "Instagram" | "Facebook" | "LinkedIn" | "X" | "Threads";

export function SocialIcon({
  name,
  className,
}: {
  name: SocialName;
  /** Lets a prominent, accessible social link size its mark responsively. */
  className?: string;
}) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    className,
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

  if (name === "LinkedIn") {
    return (
      <svg {...common}>
        <path
          d="M5.1 3.6a2.4 2.4 0 1 1-.05 4.8 2.4 2.4 0 0 1 .05-4.8zM3.1 9.4h4v11.2h-4V9.4zm6.1 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.66h-4v-5.02c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.92 1.3-1.92 2.65v5.11h-4V9.4z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "Threads") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M18.9 2.8h3.7l-8.1 9.3 9.5 9.1h-7.4l-5.8-5.6-4.9 5.6H2.2l8.6-9.8-9.1-8.6h7.6l5.3 5.1 4.3-5.1Zm-1.3 16.7h2L8.2 4.4H6.1l11.5 15.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
