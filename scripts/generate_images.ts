import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_BASE = '/home/z/my-project/public/images';

type Job = {
  prompt: string;
  outPath: string;
  size: '1024x1024' | '768x1344' | '864x1152' | '1344x768' | '1152x864';
};

const PHOTO_STYLE = 'warm editorial documentary photography, Namibian landscape palette, cream sandstone and muted maroon tones, soft natural directional sunlight, minimal composition, one main subject, no text, no logos, no people faces visible, high quality, detailed, restrained, architectural';

const jobs: Job[] = [
  {
    prompt: `Vast Namibian savanna at golden hour, a single oryx antelope silhouette standing on a dune ridge in the distance, low warm sunlight raking across dry golden grass, deep blue sky with soft cloud, sense of scale and quiet grandeur, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/hero/hero-1.png`,
    size: '1344x768'
  },
  {
    prompt: `Architectural detail of warm sandstone wall with strong morning shadow raking across, single slim window, cream and earth tones, minimalism, Namibian institutional architecture, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/hero/hero-2.png`,
    size: '1344x768'
  },
  {
    prompt: `Stack of well-worn technical books and training manuals on a warm wooden desk, soft directional light from a side window, cream paper, maroon cloth covers, dust particles visible in light beam, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/hero/hero-3.png`,
    size: '1344x768'
  },
  {
    prompt: `Wide empty Windhoek highveld landscape at dawn, soft mist, distant acacia trees, warm earth tones meeting pale sky, sense of new beginning and quiet possibility, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/hero/hero-4.png`,
    size: '1344x768'
  },
  {
    prompt: `Close-up of skilled hands working on a mechanical training bench, warm workbench wood, brass tools, soft window light, focus on craft and competence, no faces, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/hero/hero-5.png`,
    size: '1344x768'
  },
  {
    prompt: `Safety training equipment arranged on a clean workbench, hard hat, high-visibility vest folded, safety gloves, fire extinguisher, warm directional light, organised composition, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/schools/safety.png`,
    size: '1344x768'
  },
  {
    prompt: `Minimalist office desk with ledger book, fountain pen, modern laptop, brass lamp, warm wood and cream paper, sense of disciplined commerce, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/schools/administration.png`,
    size: '1344x768'
  },
  {
    prompt: `Hospitality training setting, folded linen napkin on a polished wooden table, single wine glass, soft side light, cream and sand tones, refined and minimal, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/schools/hospitality.png`,
    size: '1344x768'
  },
  {
    prompt: `Digital skills training, close-up of hands on a keyboard with warm monitor glow, code visible on screen, soft ambient light, focused craft, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/schools/digital.png`,
    size: '1344x768'
  },
  {
    prompt: `Open Namibian horizon at twilight, single acacia tree silhouette against deep maroon and indigo sky, sense of future possibility, restrained, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/schools/future.png`,
    size: '1344x768'
  },
  {
    prompt: `Architectural concept sketch in pencil and warm cream paper of a minimalist Windhoek campus, low-rise sandstone building, deep eaves, single courtyard, acacia tree, soft morning light, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/campus/campus-1.png`,
    size: '1344x768'
  },
  {
    prompt: `Architectural concept interior of a small classroom, warm wood desks in horseshoe, single tall window with deep reveal, sandstone wall, soft daylight, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/campus/campus-2.png`,
    size: '1344x768'
  },
  {
    prompt: `Empty leather chair beside a wooden desk in warm afternoon light, single open notebook, sense of contemplation and preparation, no person, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/founder/founder-1.png`,
    size: '864x1152'
  },
  {
    prompt: `Institutional crest carved in sandstone, weathered, deep shadow, warm afternoon light on a Windhoek wall, restrained, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/institute/institute-1.png`,
    size: '1344x768'
  },
  {
    prompt: `Single oryx antelope photographed from the side in golden savanna grass, warm directional sunlight, deep maroon accents, cream and earth tones, restrained, dignified, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/brand/oryx-portrait.png`,
    size: '1344x768'
  },
  {
    prompt: `Open research notebook with handwritten notes and a single brass ruler, warm desk lamp light, cream paper, sense of careful study, ${PHOTO_STYLE}`,
    outPath: `${OUTPUT_BASE}/research/research-1.png`,
    size: '1344x768'
  },
];

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function generateOne(zai: any, job: Job, idx: number, total: number) {
  if (fs.existsSync(job.outPath)) {
    console.log(`[${idx + 1}/${total}] SKIP (exists): ${job.outPath}`);
    return { ok: true, skipped: true, path: job.outPath };
  }
  // Retry with backoff
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const response = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size,
      });
      const b64 = response.data[0].base64;
      const buf = Buffer.from(b64, 'base64');
      fs.mkdirSync(path.dirname(job.outPath), { recursive: true });
      fs.writeFileSync(job.outPath, buf);
      console.log(`[${idx + 1}/${total}] OK: ${job.outPath} (${(buf.length / 1024).toFixed(1)} KB)`);
      return { ok: true, skipped: false, path: job.outPath };
    } catch (e: any) {
      const msg = e?.message || String(e);
      if (msg.includes('429') || msg.includes('rate')) {
        const wait = 8000 * attempt;
        console.log(`[${idx + 1}/${total}] 429, waiting ${wait}ms (attempt ${attempt})`);
        await sleep(wait);
        continue;
      }
      console.error(`[${idx + 1}/${total}] FAIL: ${job.outPath} - ${msg}`);
      await sleep(3000);
      return { ok: false, error: msg, path: job.outPath };
    }
  }
  console.error(`[${idx + 1}/${total}] GIVE UP: ${job.outPath}`);
  return { ok: false, error: 'retries exhausted', path: job.outPath };
}

async function main() {
  const zai = await ZAI.create();
  const total = jobs.length;
  console.log(`Generating ${total} images, one at a time...`);

  const results: any[] = [];
  for (let i = 0; i < jobs.length; i++) {
    const r = await generateOne(zai, jobs[i], i, total);
    results.push(r);
    // Small pause between successful calls
    if (r.ok && !r.skipped) await sleep(1500);
  }

  const ok = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok);
  console.log(`\nDone. ${ok}/${total} succeeded.`);
  if (failed.length > 0) {
    console.log(`Failed:`);
    failed.forEach(f => console.log(`  - ${f.path}: ${f.error}`));
  }
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
