export type ContentsItem = {
  label: string;
  href: string;
};

export type IssueMetric = {
  label: string;
  value: string;
  note: string;
};

export type StoryCard = {
  eyebrow: string;
  title: string;
  body: string;
  highlight: string;
  metrics: string[];
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

export type EventItem = {
  date: string;
  title: string;
  body: string;
  tag: string;
};

export type ArchiveIssue = {
  month: string;
  title: string;
  summary: string;
  pdfUrl: string;
};

export const currentIssue = {
  month: "June 2026",
  title: "Krishna Darshan",
  theme: "A web-first monthly issue",
  intro:
    "From June onward, Krishna Darshan becomes a living magazine page instead of a PDF wrapper. Each section can hold event stories, statistics, galleries, videos, and links that are easy to update month after month.",
  contents: [
    { label: "Editorial note", href: "#editorial-note" },
    { label: "Issue at a glance", href: "#issue-at-a-glance" },
    { label: "Feature stories", href: "#feature-stories" },
    { label: "Gallery", href: "#gallery" },
    { label: "Video moments", href: "#videos" },
    { label: "Upcoming events", href: "#upcoming-events" },
  ] satisfies ContentsItem[],
  metrics: [
    {
      label: "Story slots",
      value: "06",
      note: "Event-by-event sections ready for June content",
    },
    {
      label: "Media slots",
      value: "12",
      note: "Photos, posters, and other visuals",
    },
    {
      label: "Video slots",
      value: "03",
      note: "YouTube embeds for festival or outreach clips",
    },
  ] satisfies IssueMetric[],
  storyCards: [
    {
      eyebrow: "Festival highlight",
      title: "Temple celebration, done as a story card",
      body:
        "Use this module for a specific June event, festival, or darshan moment. Add the date, a short narrative, and a few image captions so it feels like a proper magazine spread.",
      highlight: "Best for a main June event with photos and stats.",
      metrics: ["Attendance", "Program length", "Photo count"],
    },
    {
      eyebrow: "Outreach report",
      title: "Service activities and public response",
      body:
        "Use this block for book distribution, prasadam outreach, village programs, or any temple-facing initiative. Keep the copy short and let the visuals do the work.",
      highlight: "Great for outreach stories and community impact.",
      metrics: ["Books distributed", "Villages reached", "Volunteers"],
    },
    {
      eyebrow: "Temple update",
      title: "Construction, service, or leadership update",
      body:
        "This card is ideal for project updates, service reflections, or a note from the leadership team. It keeps the page balanced between story and context.",
      highlight: "Useful for recurring monthly temple updates.",
      metrics: ["Progress points", "Milestones", "Next steps"],
    },
  ] satisfies StoryCard[],
  gallery: [
    {
      title: "Temple moments",
      caption: "Replace this illustrated tile with a real June photo.",
      image: "/gallery-temple.svg",
    },
    {
      title: "Festival color",
      caption: "Use this space for celebration imagery or poster art.",
      image: "/gallery-festival.svg",
    },
    {
      title: "Prasadam service",
      caption: "A clean block for service, distribution, or volunteer photos.",
      image: "/gallery-prasadam.svg",
    },
    {
      title: "Outreach scene",
      caption: "Good for campus talks, village preaching, or youth programs.",
      image: "/gallery-outreach.svg",
    },
  ] satisfies GalleryItem[],
  videos: [
    {
      title: "Temple walk-through",
      description: "A welcoming video for first-time visitors and devotees.",
      youtubeId: "LSidcoTTt4Y",
      source: "Hare Krishna Vaikuntham Temple",
    },
    {
      title: "Festival highlights",
      description: "Embed the strongest June celebration or program video here.",
      youtubeId: "iTACAd-ZH5M",
      source: "Hare Krishna Movement Visakhapatnam",
    },
    {
      title: "Project update",
      description: "Use this slot for a construction or service progress clip.",
      youtubeId: "XEl4y0dfz7g",
      source: "Hare Krishna Movement Visakhapatnam",
    },
  ] satisfies VideoItem[],
  upcoming: [
    {
      date: "June 17",
      title: "Prana Pratishtha ceremony",
      body:
        "Use this section for the next major temple program, invitation, and schedule details.",
      tag: "Invitation",
    },
    {
      date: "June 27",
      title: "Bhajan evening",
      body:
        "A good place for musical events, devotional gatherings, or ticketed spiritual programs.",
      tag: "Event",
    },
    {
      date: "June 27",
      title: "Panihati Chida Dahi festival",
      body:
        "This slot works well for celebration details, arati, skit, and prasadam notes.",
      tag: "Festival",
    },
  ] satisfies EventItem[],
  archive: [
    {
      month: "May 2026",
      title: "Festival Season",
      summary: "The previous print issue, kept as a PDF archive link.",
      pdfUrl:
        "https://drive.google.com/file/d/1GhNtiCi6YF8WUbuMgncryYst0xAp_IKY/view?usp=drive_link",
    },
    {
      month: "April 2026",
      title: "Bhakti Calendar",
      summary: "Another archived month can be added here as a PDF later.",
      pdfUrl: "https://drive.google.com/drive/folders/replace-with-april-2026-pdf",
    },
    {
      month: "March 2026",
      title: "Temple Life",
      summary: "Older print issues can remain as downloadable PDFs.",
      pdfUrl: "https://drive.google.com/drive/folders/replace-with-march-2026-pdf",
    },
  ] satisfies ArchiveIssue[],
};

export const issueNavigation = [
  { label: "Editorial note", href: "#editorial-note" },
  { label: "At a glance", href: "#issue-at-a-glance" },
  { label: "Stories", href: "#feature-stories" },
  { label: "Gallery", href: "#gallery" },
  { label: "Videos", href: "#videos" },
  { label: "Events", href: "#upcoming-events" },
  { label: "Archive", href: "/archive" },
];

export const archivePath = "/archive";

export const youtubeEmbedUrl = (youtubeId: string) =>
  `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`;
