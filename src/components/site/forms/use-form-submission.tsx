'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message: string;
  errors: Record<string, string>;
}

export function useFormSubmission() {
  const [state, setState] = useState<FormState>({
    status: 'idle',
    message: '',
    errors: {},
  });

  const submit = async (type: string, data: Record<string, unknown>) => {
    setState({ status: 'submitting', message: '', errors: {} });
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...data }),
      });
      const json = await res.json();
      if (!res.ok) {
        setState({
          status: 'error',
          message: json.error || 'Submission failed. Please try again.',
          errors: json.fields || {},
        });
        return false;
      }
      setState({
        status: 'success',
        message: json.message || 'Thank you. Your submission has been received.',
        errors: {},
      });
      return true;
    } catch {
      setState({
        status: 'error',
        message: 'Network error. Please check your connection and try again.',
        errors: {},
      });
      return false;
    }
  };

  const reset = () => setState({ status: 'idle', message: '', errors: {} });

  return { state, submit, reset };
}

export function FormStatus({ state }: { state: FormState }) {
  if (state.status === 'idle') return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'p-4 border text-sm leading-relaxed',
        state.status === 'success' && 'bg-[var(--color-oryx-cream)] border-[var(--oryx-maroon)] text-[var(--oryx-ink)]',
        state.status === 'error' && 'bg-[var(--color-oryx-cream)] border-[var(--color-destructive)] text-[var(--color-destructive)]',
        state.status === 'submitting' && 'bg-[var(--color-oryx-cream)] border-[var(--color-border)] text-[var(--muted-foreground)]'
      )}
    >
      {state.status === 'submitting' && 'Submitting...'}
      {state.status === 'success' && (
        <div>
          <p className="font-medium">{state.message}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-2">
            Submitted locally. This is a pre-launch demo. No data is sent to a server. We will be in
            touch when the institution is established.
          </p>
        </div>
      )}
      {state.status === 'error' && state.message}
    </div>
  );
}

export function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="mt-1 text-xs text-[var(--color-destructive)]">{error}</p>
  );
}
