import type { ImageItem, VideoItem } from "../types/MediaItem";

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
    id: "img-001",
    src: "https://drive.google.com/thumbnail?id=1e9g2Z1dMVSBMStDmRFVZmM52DXBxIrq_&sz=s1600",
    alt: "Haji Lane wall art and decorations",
    category: "haji-lane",
    caption: "Haji Lane wall art and decorations",
  },
  {
    id: "img-002",
    src: "https://drive.google.com/thumbnail?id=1-bgKZJeqg5Q-fyCFGP-ARE7ZHXSFOGdl&sz=s1600",
    alt: "Haji Lane street photo",
    category: "haji-lane",
    caption: "Building of Haji Lane with different colours and textures",
  },
  {
    id: "img-003",
    src: "https://drive.google.com/thumbnail?id=1NkKCWFcquaLwt6UgoNE24ctjmHmdmMjY&sz=s1600",
    alt: "Haji Lane building Wall art",
    category: "haji-lane",
    caption: "Building wall art along Haji Lane",
  },
  {
    id: "img-004",
    src: "https://drive.google.com/thumbnail?id=10D7dc0D-CtmckcfHaBlYDYEMPLq91b4Y&sz=s1600",
    alt: "Haji Lane street view",
    category: "haji-lane",
    caption: "Street view of Haji Lane",
  },
  {
    id: "img-005",
    src: "https://drive.google.com/thumbnail?id=1AllJ_pG-vHzCZLWQuie-27figzuEPWFP&sz=s1600",
    alt: "Haji Lane street view",
    category: "haji-lane",
    caption: "Building wall art along Haji Lane",
  },
  {
    id: "img-006",
    src: "https://drive.google.com/thumbnail?id=1CXlhkfjxhrV-zflX4pujfkULJmAqA1VS&sz=s1600",
    alt: "Haji Lane street view",
    category: "haji-lane",
    caption: "Building wall art along Haji Lane",
  },
  {
    id: "img-007",
    src: "https://drive.google.com/thumbnail?id=1nCeCW9Z_PfPBR7rIHoSNmF2N49EtIxmX&sz=s1600",
    alt: "Behind the scenes",
    category: "behind-the-scenes",
    caption: "Behind the scenes of the activity",
  },
  {
    id: "img-008",
    src: "https://drive.google.com/thumbnail?id=1ed00fbUKsb4SLzprXqo623kbzhsRMPWR&sz=s1600",
    alt: "Team portrait",
    category: "group",
    caption: "Sandy and Aung",
  },
  {
    id: "img-009",
    src: "https://drive.google.com/thumbnail?id=1AlJ2mYhg6-RhgG6olrbPD6v8ryEynFUs&sz=s1600",
    alt: "History of Haji Lane (2023)",
    category: "history",
    caption:
      "History of Haji Lane, from a 2023 article in The Straits Times (photo by The Straits Times/Roslan Rahman)",
  },
  {
    id: "img-010",
    src: "https://drive.google.com/thumbnail?id=1Kf0eh1_6supcZNyKpvvB35j8Gsqddv7D&sz=s1600",
    alt: "Sultan Mosque",
    category: "haji-lane",
    caption: "Sultan Mosque",
  },
  {
    id: "img-011",
    src: "https://drive.google.com/thumbnail?id=1oaAMg2HJ9mtMMVeDbStSESTXq2uS6pWJ&sz=s1600",
    alt: "Street of Haji Lane",
    category: "haji-lane",
    caption: "Street of Haji Lane",
  },
  {
    id: "img-012",
    src: "https://drive.google.com/thumbnail?id=1hsuiUkVE8aYN1EdjiIbVx_ezc3ie-oY5&sz=s1600",
    alt: "Carpet and decorations",
    category: "haji-lane",
    caption: "Mats and decorations along Haji Lane",
  },
  {
    id: "img-013",
    src: "https://drive.google.com/thumbnail?id=1XewGal829UOp85lOcjJtttTuUOmg4u5X&sz=s1600",
    alt: "Wall art along Haji Lane",
    category: "haji-lane",
    caption: "Wall art along Haji Lane",
  },
  {
    id: "img-014",
    src: "https://drive.google.com/thumbnail?id=1fvT42wZitHRX3yoyV4Qd5UCZ443-K6td&sz=s1600",
    alt: "Team portrait",
    category: "group",
    caption: "Group photo at Haji Lane",
  },
  {
    id: "img-015",
    src: "https://drive.google.com/thumbnail?id=1lyia4-BTSFj73cnXFDLrYcmOqRylgeIc&sz=s1600",
    alt: "Team portrait",
    category: "group",
    caption: "Group photo at Haji Lane",
  },
  {
    id: "img-016",
    src: "https://drive.google.com/thumbnail?id=1SXBRUeXaixWDmh60J-4QZjMsri9G-hIi&sz=s1600",
    alt: "Wall art along Haji Lane",
    category: "haji-lane",
    caption: "Wall art along Haji Lane",
  },
  {
    id: "img-017",
    src: "https://drive.google.com/thumbnail?id=1hIQ5UGpSEA9JSsEvLrS597nbENjjlP5K&sz=s1600",
    alt: "Behind the scenes",
    category: "behind-the-scenes",
    caption: "Sandy with an umbrella, behind the scenes of the activity",
  },
  {
    id: "img-018",
    src: "https://drive.google.com/thumbnail?id=1KCAVBLkY0HGgAciOXXxCnKzx1FxRu9JY&sz=s1600",
    alt: "Behind the scenes",
    category: "behind-the-scenes",
    caption: "Sandy with an umbrella, behind the scenes of the activity",
  },
  {
    id: "img-019",
    src: "https://drive.google.com/thumbnail?id=16ovYuIZeZ_pwXpRSiNv3lS5BwOdYZdJm&sz=s1600",
    alt: "Sultan Mosque",
    category: "haji-lane",
    caption: "Sultan Mosque",
  },
  {
    id: "img-020",
    src: "https://drive.google.com/thumbnail?id=1fY6NNgqd4PdpulZFHZSd0vl8Ne_j_p8R&sz=s1600",
    alt: "Decorations along Haji Lane",
    category: "haji-lane",
    caption: "Decorations along Haji Lane",
  },
  {
    id: "img-021",
    src: "https://drive.google.com/thumbnail?id=1IW6_pBZUDDCGqvq2TcWuLG-O4hnubT1A&sz=s1600",
    alt: "Wall art along Haji Lane",
    category: "haji-lane",
    caption: "Wall art along Haji Lane",
  },
  {
    id: "img-022",
    src: "https://drive.google.com/thumbnail?id=1dMq66EbcVTuZjpu9dkakSYhIXw5nRgxz&sz=s1600",
    alt: "Colourful decorations along Haji Lane",
    category: "haji-lane",
    caption: "Colourful decorations along Haji Lane",
  },
  {
    id: "img-023",
    src: "https://drive.google.com/thumbnail?id=1jCD65Q8ORbzwvvC1wG9YhlyRXdjkIqQ7&sz=s1600",
    alt: "Haji Lane plates and mats art",
    category: "haji-lane",
    caption: "Colourful plates and mats along Haji Lane",
  },
  {
    id: "img-024",
    src: "https://drive.google.com/thumbnail?id=1UDnA_32lmH1QJotGw5JBa4w_tgv_LHMb&sz=s1600",
    alt: "Haji Lane street art",
    category: "haji-lane",
    caption: "Street art along Haji Lane",
  },
  {
    id: "img-025",
    src: "https://drive.google.com/thumbnail?id=1qVFSeMb32aNm-wrXeZrArWoDpNx49E_q&sz=s1600",
    alt: "Haji Lane street view",
    category: "haji-lane",
    caption: "Street view along Haji Lane",
  },
  {
    id: "img-026",
    src: "https://drive.google.com/thumbnail?id=1sDHn7Gey9GQQQFKkhfFYwFbghltmuxDA&sz=s1600",
    alt: "Sultan Mosque",
    category: "haji-lane",
    caption: "Sultan Mosque",
  },
  {
    id: "img-027",
    src: "https://drive.google.com/thumbnail?id=1shZMBfb5uNBIe7PBqvPjonxZQ-04ICM5&sz=s1600",
    alt: "Haji Lane street view",
    category: "haji-lane",
    caption: "Street view along Haji Lane",
  },
  {
    id: "img-028",
    src: "https://drive.google.com/thumbnail?id=1DhGYJ908Skvp9pOLQnTHhET1bpxeh-EK&sz=s1600",
    alt: "Turkish store in Haji Lane",
    category: "haji-lane",
    caption: "Turkish store in Haji Lane",
  },
  {
    id: "img-029",
    src: "https://drive.google.com/thumbnail?id=1BJmdAeNkvhKwdwKz4Co5BXHU_Tb_UgRY&sz=s1600",
    alt: "History of Haji Lane (2023)",
    category: "history",
    caption:
      "History of Haji Lane, from a 2023 article in The Straits Times (photo by The Straits Times/Roslan Rahman)",
  },
];

// -----------------------------------------------------------------------------
// VIDEOS
// Replace each `embedSrc` value with the Google Drive preview/embed link.
// Add or remove entries to match however many videos are in the folder.
// -----------------------------------------------------------------------------
export const galleryVideos: VideoItem[] = [
  {
    id: "vid-001",
    embedSrc: "https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/preview",
    title: "Outdoor Activity Highlights",
    category: "history",
    description: "Main activity video from the day at Haji Lane",
  },
  {
    id: "vid-002",
    embedSrc: "https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/preview",
    title: "Haji Lane Exploration",
    category: "haji-lane",
    description: "Group exploring the vibrant streets",
  },
  {
    id: "vid-003",
    embedSrc: "https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/preview",
    title: "Team Moments",
    category: "group",
    description: "Candid team moments and group interactions",
  },
  {
    id: "vid-004",
    embedSrc: "https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/preview",
    title: "Behind the Scenes",
    category: "behind-the-scenes",
    description: "BTS of the corporate communication activity",
  },
];
