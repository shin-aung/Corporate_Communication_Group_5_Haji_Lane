export type MediaCategory =
  | 'cover'
  | 'haji-lane'
  | 'group'
  | 'activity'
  | 'profile'
  | 'behind-the-scenes';

export interface ImageItem {
  id: string;
  /** Google Drive direct image URL.
   *  Convert any sharing link to direct form:
   *  https://drive.google.com/file/d/FILE_ID/view  →  https://drive.google.com/uc?export=view&id=FILE_ID
   */
  src: string;
  alt: string;
  category: MediaCategory;
  caption?: string;
}

export interface VideoItem {
  id: string;
  /** Google Drive embed URL.
   *  Convert any sharing link to embed form:
   *  https://drive.google.com/file/d/FILE_ID/view  →  https://drive.google.com/file/d/FILE_ID/preview
   */
  embedSrc: string;
  title: string;
  category: MediaCategory;
  description?: string;
}
