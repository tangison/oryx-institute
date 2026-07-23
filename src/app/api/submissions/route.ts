import { NextRequest, NextResponse } from 'next/server';
import {
  registerInterestSchema,
  mailingListSchema,
  enquirySchema,
  persistSubmission,
  type Submission,
} from '@/lib/submissions';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const raw = body as Record<string, unknown>;
  const type = raw?.type;

  let parsed: Submission;

  try {
    if (type === 'register-interest') {
      parsed = registerInterestSchema.parse(body);
    } else if (type === 'mailing-list') {
      parsed = mailingListSchema.parse(body);
    } else if (
      type === 'employer-enquiry' ||
      type === 'wil-enquiry' ||
      type === 'corporate-training-enquiry' ||
      type === 'research-advisory-enquiry' ||
      type === 'funding-partnership-enquiry' ||
      type === 'contact'
    ) {
      parsed = enquirySchema.parse(body);
    } else {
      return NextResponse.json(
        { ok: false, error: 'Unknown submission type.' },
        { status: 400 }
      );
    }
  } catch (err: unknown) {
    const e = err as { errors?: { path: (string | number)[]; message: string }[] };
    const fields: Record<string, string> = {};
    if (Array.isArray(e?.errors)) {
      for (const er of e.errors) {
        const key = er.path.join('.');
        if (!fields[key]) fields[key] = er.message;
      }
    }
    return NextResponse.json(
      { ok: false, error: 'Validation failed.', fields },
      { status: 422 }
    );
  }

  // Honeypot: if website is filled, silently accept but discard
  if ((parsed as { website?: string }).website) {
    return NextResponse.json({
      ok: true,
      id: `sub_spam_${Date.now().toString(36)}`,
      message: 'Thank you. Your submission has been received.',
      mockNotice:
        'Submitted locally. This is a pre-launch demo. No data is sent to a server.',
    });
  }

  const result = await persistSubmission(parsed);
  return NextResponse.json(result, { status: 201 });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'oryx-institute-submissions',
    mode: 'pre-launch',
    notice:
      'This endpoint accepts POST submissions only. No data is exposed for read.',
  });
}
