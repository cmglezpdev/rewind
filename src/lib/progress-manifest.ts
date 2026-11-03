import type { Library, Video } from './library';

/**
 * Which chapters belong to which video and course. Progress records only hold
 * chapter ids, so the browser needs this map to roll them up. It is published
 * once as `/progress-manifest.json` instead of being inlined into every page.
 */
export interface ProgressManifest {
  /** Video id -> ids of its trackable chapters. */
  videos: Record<string, string[]>;
  /** Course id -> ids of its videos. */
  courses: Record<string, string[]>;
}

/** Only numbered chapter notes are tracked; overviews and transcripts are not. */
export function chapterIdsOf(video: Pick<Video, 'documents'>): string[] {
  return video.documents.filter((doc) => doc.kind === 'topic').map((doc) => doc.id).sort(compareIds);
}

function compareIds(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true });
}

export function buildManifest(library: Pick<Library, 'videos' | 'courses'>): ProgressManifest {
  return {
    videos: Object.fromEntries(library.videos.map((video) => [video.id, chapterIdsOf(video)])),
    courses: Object.fromEntries(library.courses.map((course) => [course.id, course.videos.map((video) => video.id)])),
  };
}
