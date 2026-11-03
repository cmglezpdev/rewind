import type { APIRoute } from 'astro';
import { getLibrary } from '../lib/library';
import { buildManifest } from '../lib/progress-manifest';

export const GET: APIRoute = async () => {
  const manifest = buildManifest(await getLibrary());
  return new Response(JSON.stringify(manifest), { headers: { 'Content-Type': 'application/json' } });
};
