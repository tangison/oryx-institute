'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Notice } from '@/components/site/notice';

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
  if (state.status === 'idle' || state.status === 'submitting') {
    if (state.status === 'submitting') {
      return (
        <Notice variant="info" title="Submitting">
          <p>Sending your submission. Please wait.</p>
        </Notice>
      );
    }
    return null;
  }

  if (state.status === 'success') {
    return (
      <Notice variant="success" title={state.message}>
        <p>
          Submitted locally. This is a pre-launch demo. No data is sent to a server. We will be in
          touch when the institution is established.
        </p>
      </Notice>
    );
  }

  return (
    <Notice variant="error" title="Could not submit">
      <p>{state.message}</p>
    </Notice>
  );
}

export function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="mt-1 text-xs text-[var(--color-error)]" role="alert">
      {error}
    </p>
  );
}
