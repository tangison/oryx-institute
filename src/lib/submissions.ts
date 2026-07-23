/**
 * Oryx Institute — pre-launch submission repository.
 * Mock persistence: local JSON file at /data/submissions.json with an
 * audit log at /data/submissions_audit.log.
 *
 * This is a pre-launch demo. No data is sent to a server. Swap to
 * Vercel KV, Resend email, or PostgreSQL by implementing the
 * SubmissionRepository interface in lib/submissionRepository.ts.
 */

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const DATA_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const AUDIT_FILE = path.join(DATA_DIR, 'submissions_audit.log');

/* =========================================================
   Schemas (Zod)
   ========================================================= */
export const registerInterestSchema = z.object({
  type: z.literal('register-interest'),
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(6, 'Please enter a contact number.'),
  region: z.string().min(2, 'Please enter your region or town.'),
  programme: z.string().min(1, 'Please select a programme of interest.'),
  educationLevel: z.string().optional().default(''),
  employmentStatus: z.string().optional().default(''),
  rplInterest: z.enum(['yes', 'no', 'unsure']).optional().default('unsure'),
  preferredSchedule: z.string().optional().default(''),
  consent: z.literal(true, { error: 'Please consent to receive updates.' }),
  // honeypot
  website: z.string().max(0).optional().default(''),
});

export const mailingListSchema = z.object({
  type: z.literal('mailing-list'),
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  consent: z.literal(true, { error: 'Please consent to receive updates.' }),
  website: z.string().max(0).optional().default(''),
});

export const enquirySchema = z.object({
  type: z.enum([
    'employer-enquiry',
    'wil-enquiry',
    'corporate-training-enquiry',
    'research-advisory-enquiry',
    'funding-partnership-enquiry',
    'contact',
  ]),
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  organisation: z.string().optional().default(''),
  role: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  message: z.string().min(10, 'Please share a short message (at least 10 characters).'),
  consent: z.literal(true, { error: 'Please consent to be contacted.' }),
  website: z.string().max(0).optional().default(''),
});

export type Submission =
  | z.infer<typeof registerInterestSchema>
  | z.infer<typeof mailingListSchema>
  | z.infer<typeof enquirySchema>;

/* =========================================================
   Persistence
   ========================================================= */
async function ensureFiles() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(SUBMISSIONS_FILE);
    } catch {
      await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (e) {
    // Best-effort — if /data is read-only, fall back to in-memory discard
    console.error('Submission persistence unavailable:', e);
  }
}

async function readSubmissions(): Promise<unknown[]> {
  try {
    await ensureFiles();
    const raw = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(raw) as unknown[];
  } catch {
    return [];
  }
}

async function appendAudit(line: string) {
  try {
    await ensureFiles();
    const stamp = new Date().toISOString();
    await fs.appendFile(AUDIT_FILE, `[${stamp}] ${line}\n`, 'utf-8');
  } catch (e) {
    console.error('Audit append failed:', e);
  }
}

export interface SubmissionResult {
  ok: boolean;
  id: string;
  message: string;
  mockNotice: string;
}

export async function persistSubmission(input: Submission): Promise<SubmissionResult> {
  const id = `sub_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const record = {
    id,
    receivedAt: new Date().toISOString(),
    ...input,
  };

  const existing = await readSubmissions();
  existing.push(record);
  try {
    await ensureFiles();
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(existing, null, 2), 'utf-8');
  } catch (e) {
    console.error('Write failed (in-memory only):', e);
  }

  await appendAudit(
    `${input.type} | id=${id} | email=${(input as { email: string }).email} | persisted=${
      typeof existing !== 'undefined' ? 'yes' : 'no'
    }`
  );

  return {
    ok: true,
    id,
    message: 'Thank you. Your submission has been received.',
    mockNotice:
      'Submitted locally. This is a pre-launch demo. No data is sent to a server. We will be in touch when the institution is established.',
  };
}
