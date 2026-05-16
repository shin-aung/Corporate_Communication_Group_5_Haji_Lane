import type { ImageItem, VideoItem } from '../types/MediaItem';

// =============================================================================
// HOW TO GET YOUR GOOGLE DRIVE LINKS
// =============================================================================
//
// FOR IMAGES (src field):
//   1. Right-click the image in Google Drive → "Share" → set to "Anyone with the link"
//   2. Copy the link. It looks like:
//      https://drive.google.com/file/d/FILE_ID/view?usp=sharing
//   3. Convert to direct format by replacing with:
//      https://drive.google.com/uc?export=view&id=FILE_ID
//   Example:
//      Sharing link : https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuV/view?usp=sharing
//      Direct link  : https://drive.google.com/uc?export=view&id=1aBcDeFgHiJkLmNoPqRsTuV
//
// FOR VIDEOS (embedSrc field):
//   1. Right-click the video in Google Drive → "Share" → set to "Anyone with the link"
//   2. Copy the link. It looks like:
//      https://drive.google.com/file/d/FILE_ID/view?usp=sharing
//   3. Convert to embed format by replacing with:
//      https://drive.google.com/file/d/FILE_ID/preview
//   Example:
//      Sharing link : https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuV/view?usp=sharing
//      Embed link   : https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuV/preview
//
// =============================================================================

// -----------------------------------------------------------------------------
// IMAGES
// Replace each `src` value with the direct Google Drive link for that image.
// Add or remove entries as needed — the gallery renders whatever is listed here.
// -----------------------------------------------------------------------------
export const galleryImages: ImageItem[] = [
  {
    id: 'img-001',
    src: 'https://drive.google.com/thumbnail?id=1jCD65Q8ORbzwvvC1wG9YhlyRXdjkIqQ7&sz=s1600',
    alt: 'Haji Lane plates and mats art',
    category: 'haji-lane',
    caption: 'Colourful plates and mats along Haji Lane',
  },
  {
    id: 'img-002',
    src: 'https://drive.google.com/thumbnail?id=1-bgKZJeqg5Q-fyCFGP-ARE7ZHXSFOGdl&sz=s1600',
    alt: 'Haji Lane street photo',
    category: 'haji-lane',
    caption: 'Building of Haji Lane with different colours and textures',
  },
  {
    id: 'img-003',
    src: 'https://drive.google.com/thumbnail?id=1NkKCWFcquaLwt6UgoNE24ctjmHmdmMjY&sz=s1600',
    alt: 'Haji Lane building Wall art',
    category: 'haji-lane',
    caption: 'Building wall art along Haji Lane',
  },
  {
    id: 'img-004',
    src: 'https://drive.google.com/thumbnail?id=1kLmNoPqRsTuVwG9YhlyRXdjkIqQ7&sz=s1600',
    alt: 'Kampong Glam',
    category: 'haji-lane',
    caption: 'Kampong Glam heritage district',
  },
  {
    id: 'img-005',
    src: 'https://drive.google.com/thumbnail?id=1nCeCW9Z_PfPBR7rIHoSNmF2N49EtIxmX&sz=s1600',
    alt: 'Behind the scenes',
    category: 'behind-the-scenes',
    caption: 'Behind the scenes of the activity',
  },
  {
    id: 'img-006',
    src: 'https://drive.google.com/thumbnail?id=1jCD65Q8ORbzwvvC1wG9YhlyRXdjkIqQ7&sz=s1600',
    alt: 'Team portrait',
    category: 'group',
    caption: 'Group portrait',
  },
  {
    id: 'img-007',
    src: 'https://drive.google.com/thumbnail?id=1osqRWU2fksNp7vVIwcCZukIDz9Wckvoq&sz=s1600',
    alt: 'Outdoor activity',
    category: 'activity',
    caption: 'Exploring the outdoor spaces',
  },
  {
    id: 'img-008',
    src: 'https://drive.google.com/thumbnail?id=1kLmNoPqRsTuVwG9YhlyRXdjkIqQ7&sz=s1600',
    alt: 'Haji Lane street view',
    category: 'haji-lane',
    caption: 'Street view of Haji Lane',
  },
  {
    id: 'img-009',
    src: 'https://drive.google.com/thumbnail?id=1nCeCW9Z_PfPBR7rIHoSNmF2N49EtIxmX&sz=s1600',
    alt: 'Candid moment',
    category: 'behind-the-scenes',
    caption: 'A candid group moment',
  },
];

// -----------------------------------------------------------------------------
// VIDEOS
// Replace each `embedSrc` value with the Google Drive preview/embed link.
// Add or remove entries to match however many videos are in the folder.
// -----------------------------------------------------------------------------
export const galleryVideos: VideoItem[] = [
  {
    id: 'vid-001',
    embedSrc: 'https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/preview',
    title: 'Outdoor Activity Highlights',
    category: 'activity',
    description: 'Main activity video from the day at Haji Lane',
  },
  {
    id: 'vid-002',
    embedSrc: 'https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/preview',
    title: 'Haji Lane Exploration',
    category: 'haji-lane',
    description: 'Group exploring the vibrant streets',
  },
  {
    id: 'vid-003',
    embedSrc: 'https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/preview',
    title: 'Team Moments',
    category: 'group',
    description: 'Candid team moments and group interactions',
  },
  {
    id: 'vid-004',
    embedSrc: 'https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/preview',
    title: 'Behind the Scenes',
    category: 'behind-the-scenes',
    description: 'BTS of the corporate communication activity',
  },
];
