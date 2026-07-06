export type MagazineSection = {
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
  bullets?: string[];
};

export type GalleryItem = {
  title: string;
  caption: string;
  image: string;
};

export type VideoItem = {
  title: string;
  description: string;
  youtubeId: string;
  source: string;
};

export type ArchiveIssue = {
  month: string;
  title: string;
  summary: string;
  pdfUrl: string;
};

export const currentIssue = {
  month: "July 2026",
  title: "Krishna Darshan",
  theme: "The Temple as a Living Festival",
  intro:
    "This month’s edition celebrates the many ways devotion becomes visible: the rhythm of the morning arati, the energy of outreach, the quiet beauty of seva, and the shared joy of festivals that bring the community together.",
  coverStat: [
    { label: "Feature stories", value: "06" },
    { label: "Photo spreads", value: "14" },
    { label: "Video moments", value: "03" },
  ],
  sections: [
    {
      eyebrow: "Editor’s Note",
      title: "A monthly glimpse into bhakti in action",
      body:
        "Krishna Darshan is designed as a living magazine. Instead of only showing the final PDF, it lets readers flow through stories, visuals, and media with a better experience on phones and tablets.",
      accent: "The temple’s monthly heartbeat, made scrollable.",
      bullets: [
        "Festival coverage with clear section breaks",
        "Outreach and service stories presented as cards",
        "Embedded YouTube videos for talks and celebrations",
      ],
    },
    {
      eyebrow: "This Month",
      title: "Festivals, outreach, and service highlights",
      body:
        "The page is organized to mirror the magazine structure: a strong opening, a few vivid narrative sections, then a clean archive path for prior PDFs.",
      accent: "Built to feel editorial, not like a file dump.",
      bullets: [
        "Hero section for the main theme",
        "Archive links for previous printed issues",
        "A simple future-ready content model",
      ],
    },
    {
      eyebrow: "For the Team",
      title: "Easy to update every month",
      body:
        "The first version keeps the content in typed data so your team can publish quickly. Later, this can move into a free Supabase-backed admin flow without changing the visual system.",
      accent: "Start simple, then add a CMS when ready.",
      bullets: [
        "Copy text into the data file",
        "Swap in monthly photos and video links",
        "Point archive buttons to Drive PDFs",
      ],
    },
  ] satisfies MagazineSection[],
  gallery: [
    {
      title: "Temple Altar",
      caption: "A calm visual block for darshan and morning rituals.",
      image: "/gallery-temple.svg",
    },
    {
      title: "Festival Procession",
      caption: "A bright frame for utsava moments and celebrations.",
      image: "/gallery-festival.svg",
    },
    {
      title: "Prasadam Service",
      caption: "A warm card for service, distribution, and community care.",
      image: "/gallery-prasadam.svg",
    },
    {
      title: "Youth Outreach",
      caption: "A flexible panel for campus talks and outreach snapshots.",
      image: "/gallery-outreach.svg",
    },
  ] satisfies GalleryItem[],
  videos: [
    {
      title: "Temple walk-through",
      description: "A walk-through video for first-time visitors and devotees.",
      youtubeId: "LSidcoTTt4Y",
      source: "Hare Krishna Vaikuntham Temple",
    },
    {
      title: "Janmashtami celebrations",
      description: "Festival coverage that works beautifully inside the magazine page.",
      youtubeId: "iTACAd-ZH5M",
      source: "Hare Krishna Movement Visakhapatnam",
    },
    {
      title: "Construction and growth updates",
      description: "A progress video that shows the temple as a living, growing project.",
      youtubeId: "XEl4y0dfz7g",
      source: "Hare Krishna Movement Visakhapatnam",
    },
  ] satisfies VideoItem[],
  archive: [
    {
      month: "June 2026",
      title: "Service in Motion",
      summary: "Outreach stories, prasadam service, and temple updates.",
      pdfUrl: "https://drive.google.com/drive/folders/replace-with-june-2026-pdf",
    },
    {
      month: "May 2026",
      title: "Festival Season",
      summary: "A print-style recap of festivals, kirtans, and community seva.",
      pdfUrl: "https://drive.google.com/drive/folders/replace-with-may-2026-pdf",
    },
    {
      month: "April 2026",
      title: "Bhakti Calendar",
      summary: "A month of spiritual programs and temple activity highlights.",
      pdfUrl: "https://drive.google.com/drive/folders/replace-with-april-2026-pdf",
    },
    {
      month: "March 2026",
      title: "Temple Life",
      summary: "The earlier issue archive for easy download and sharing.",
      pdfUrl: "https://drive.google.com/drive/folders/replace-with-march-2026-pdf",
    },
  ] satisfies ArchiveIssue[],
};

export const issueNavigation = [
  { label: "Editor’s note", href: "#editors-note" },
  { label: "Highlights", href: "#highlights" },
  { label: "Gallery", href: "#gallery" },
  { label: "Videos", href: "#videos" },
  { label: "Archive", href: "/archive" },
];

export const archivePath = "/archive";

export const youtubeEmbedUrl = (youtubeId: string) =>
  `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`;
