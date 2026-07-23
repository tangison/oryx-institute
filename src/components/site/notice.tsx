/**
 * Notice — DESIGN.md §12.9
 * Notices use a left rule, clear heading and plain explanation.
 * info: blue-grey, success: green, warning: amber-brown, error: red.
 * Never use maroon for every status.
 */

type NoticeVariant = 'info' | 'success' | 'warning' | 'error';

const variantLabel: Record<NoticeVariant, string> = {
  info: 'Information',
  success: 'Confirmed',
  warning: 'Attention required',
  error: 'Error',
};

export function Notice({
  variant = 'info',
  title,
  children,
}: {
  variant?: NoticeVariant;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`notice notice-${variant}`} role="status" aria-live="polite">
      <div className="notice-rule" aria-hidden="true" />
      <div>
        <p className="notice-title">{title ?? variantLabel[variant]}</p>
        <div className="notice-body">{children}</div>
      </div>
    </div>
  );
}
