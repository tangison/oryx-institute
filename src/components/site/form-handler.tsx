'use client';

import { useEffect } from 'react';

/**
 * FormHandler attaches submit handlers to every form marked with
 * `data-form-type` on the page. The form data is POSTed to /api/submissions,
 * and on success the form is replaced by an inline confirmation.
 *
 * This component is mounted once at the page root.
 */
export function FormHandler() {
  useEffect(() => {
    const forms = Array.from(document.querySelectorAll<HTMLFormElement>('form[data-form-type]'));

    const handlers: Array<{ form: HTMLFormElement; handler: (e: Event) => void }> = [];

    forms.forEach((form) => {
      const handler = async (e: Event) => {
        e.preventDefault();
        const formData = new FormData(form);
        const formType = form.getAttribute('data-form-type') || '';

        // Honeypot check
        const website = (formData.get('website') as string) || '';
        if (website) {
          // Silently succeed without submitting
          showSuccess(form, {
            ok: true,
            id: 'sub_spam',
            message: 'Thank you. Your submission has been received.',
            mockNotice: '',
          });
          return;
        }

        // Build payload
        const payload: Record<string, unknown> = { type: formType };
        formData.forEach((value, key) => {
          if (key === 'website') return;
          if (key === 'consent') {
            payload[key] = value === 'on' || value === 'true' || value === true;
          } else {
            payload[key] = value;
          }
        });

        // Disable submit button + show "submitting"
        const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.dataset.originalText = submitBtn.textContent || '';
          submitBtn.textContent = 'Submitting...';
        }

        try {
          const res = await fetch('/api/submissions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (res.ok && data.ok) {
            showSuccess(form, data);
          } else {
            showError(form, data);
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
            }
          }
        } catch (err) {
          showError(form, { error: 'Network error. Please try again.' });
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
          }
        }
      };

      form.addEventListener('submit', handler);
      handlers.push({ form, handler });
    });

    return () => {
      handlers.forEach(({ form, handler }) => form.removeEventListener('submit', handler));
    };
  }, []);
  return null;
}

function showSuccess(form: HTMLFormElement, data: { message?: string; mockNotice?: string }) {
  const result = form.querySelector<HTMLElement>('[data-role="form-result"]');
  if (result) {
    result.textContent = data.message || 'Thank you. Your submission has been received.';
    result.style.color = 'var(--oryx-maroon)';
    result.style.fontWeight = '500';
  }
  // Replace form body with confirmation
  const confirmation = document.createElement('div');
  confirmation.className = 'confirmation-block';
  confirmation.setAttribute('role', 'status');
  confirmation.setAttribute('aria-live', 'polite');
  confirmation.innerHTML = `
    <div style="display:flex; align-items:flex-start; gap:1rem; padding:1.5rem 0;">
      <div style="flex-shrink:0; width:32px; height:32px; border:1px solid var(--oryx-maroon); display:inline-flex; align-items:center; justify-content:center;">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7L6 11L12 3" stroke="var(--oryx-maroon)" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/>
        </svg>
      </div>
      <div>
        <p style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 500; margin:0 0 0.5rem 0; line-height:1.2;">
          ${escapeHtml(data.message || 'Thank you. Your submission has been received.')}
        </p>
        ${data.mockNotice ? `<p style="font-size: 0.8125rem; color: var(--muted-foreground); margin:0; line-height:1.5;">${escapeHtml(data.mockNotice)}</p>` : ''}
      </div>
    </div>
  `;
  // Hide all form fields
  Array.from(form.children).forEach((child) => {
    if (child !== confirmation && child !== result) {
      (child as HTMLElement).style.display = 'none';
    }
  });
  form.appendChild(confirmation);
  // Remove the result text since we have a richer confirmation
  if (result) result.textContent = '';
  // Scroll confirmation into view
  confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showError(form: HTMLFormElement, data: { error?: string; fields?: Record<string, string> }) {
  const result = form.querySelector<HTMLElement>('[data-role="form-result"]');
  if (result) {
    const fieldErrors = data.fields ? Object.entries(data.fields).map(([k, v]) => `${k}: ${v}`).join(' · ') : '';
    result.textContent = data.error || `Validation failed. ${fieldErrors}`;
    result.style.color = 'var(--color-destructive)';
    result.style.fontWeight = '500';
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
