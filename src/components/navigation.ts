import type { Course, Library, NoteDocument, Video } from '../lib/library';

export function sortVideoDocuments(documents: NoteDocument[]): NoteDocument[] {
  const rank = (doc: NoteDocument) => {
    if (doc.kind === 'overview') return 0;
    if (doc.kind === 'transcript') return 2;
    return 1;
  };
  return [...documents].sort((a, b) => {
    const diff = rank(a) - rank(b);
    if (diff !== 0) return diff;
    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });
}

export function findVideo(library: Library, videoId: string | undefined): Video | undefined {
  if (!videoId) return undefined;
  return library.videos.find((video) => video.id === videoId);
}

export function findCourse(library: Library, courseId: string | undefined): Course | undefined {
  if (!courseId) return undefined;
  return library.courses.find((course) => course.id === courseId);
}

export function neighbors(
  documents: NoteDocument[],
  currentId: string,
): { previous?: NoteDocument; next?: NoteDocument } {
  const ordered = sortVideoDocuments(documents);
  const index = ordered.findIndex((doc) => doc.id === currentId);
  if (index < 0) return {};
  return {
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}

export function chapterDocuments(documents: NoteDocument[]): NoteDocument[] {
  return sortVideoDocuments(documents).filter((doc) => doc.kind !== 'index');
}
