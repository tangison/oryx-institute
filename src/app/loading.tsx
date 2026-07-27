import { OryxLogo } from '@/components/site/oryx-logo';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-cream)] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <OryxLogo variant="light" size="compact" linked={false} animate />
        <div className="w-[48px] h-[2px] bg-[var(--color-brand-maroon)] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-[var(--color-brand-maroon-dark)]"
            style={{
              animation: 'loading-slide 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
            }}
          />
        </div>
        <p className="font-sans text-sm text-[var(--color-text-muted)] uppercase tracking-[0.1em]">
          Loading
        </p>
      </div>
      <style>{`
        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
