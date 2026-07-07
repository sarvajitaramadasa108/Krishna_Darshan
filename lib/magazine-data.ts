import {
  currentIssue,
  type ArchiveIssue,
  type EventItem,
  type GalleryItem,
  type IssueMetric,
  type StoryCard,
  type VideoItem,
} from "@/lib/newsletter-data";
import { supabaseSelect } from "@/lib/supabase";

type IssueRow = {
  id: number;
  slug: string;
  month: string;
  title: string;
  theme: string;
  intro: string;
  cover_image_url: string | null;
  published_at: string | null;
};

type EventRow = {
  id: number;
  issue_id: number;
  title: string;
  event_date: string | null;
  event_type: string | null;
  summary: string;
  stats: Array<{ label?: string; value?: string }> | null;
  content_blocks:
    | Array<
        | {
            type?: string;
            text?: string;
            images?: Array<{ url?: string; caption?: string }>;
            url?: string;
          }
        | Record<string, unknown>
      >
    | null;
  video_url: string | null;
  order_index: number;
};

type EventImageRow = {
  id: number;
  event_id: number;
  image_url: string;
  caption: string | null;
  order_index: number;
};

export type MagazineEvent = {
  id: number;
  anchorId: string;
  title: string;
  date: string;
  type: string;
  summary: string;
  stats: Array<{ label: string; value: string }>;
  images: Array<{ url: string; caption: string }>;
  videoUrl?: string | null;
  blocks: MagazineEventBlock[];
};

export type MagazineEventBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "gallery";
      images: Array<{ url: string; caption?: string }>;
    }
  | {
      type: "video";
      url: string;
    };

function videoIdFromUrl(url: string | null) {
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "") || null;
    }

    const id = parsed.searchParams.get("v");
    if (id) {
      return id;
    }
  } catch {
    return null;
  }

  return null;
}

function normalizeEventBlocks(
  event: EventRow,
  images: Array<{ url: string; caption: string }>
): MagazineEventBlock[] {
  const blocks = event.content_blocks ?? [];

  if (!blocks.length) {
    const fallback: MagazineEventBlock[] = [];

    if (event.summary) {
      fallback.push({ type: "paragraph", text: event.summary });
    }

    if (images.length) {
      fallback.push({
        type: "gallery",
        images: images.map((image) => ({
          url: image.url,
          caption: image.caption,
        })),
      });
    }

    if (event.video_url) {
      fallback.push({ type: "video", url: event.video_url });
    }

    return fallback;
  }

  return blocks.flatMap((block): MagazineEventBlock[] => {
    if (block && typeof block === "object") {
      const blockType = "type" in block ? String(block.type ?? "") : "";

      if (blockType === "paragraph" && "text" in block && block.text) {
        return [{ type: "paragraph", text: String(block.text) }];
      }

      if (blockType === "gallery" && Array.isArray(block.images)) {
        const galleryImages = block.images.reduce<
          Array<{ url: string; caption?: string }>
        >((acc, image) => {
          if (!image || typeof image !== "object" || !("url" in image)) {
            return acc;
          }

          const url = String(image.url ?? "");
          if (!url) {
            return acc;
          }

          acc.push({
            url,
            caption:
              "caption" in image && image.caption
                ? String(image.caption)
                : undefined,
          });
          return acc;
        }, []);

        return [
          {
            type: "gallery",
            images: galleryImages,
          },
        ];
      }

      if (blockType === "video" && "url" in block && block.url) {
        return [{ type: "video", url: String(block.url) }];
      }
    }

    return [];
  });
}

export type MagazineIssueData = typeof currentIssue;

export type MagazineIssueResult = MagazineIssueData & {
  source: "supabase" | "template";
  note: string;
  events: MagazineEvent[];
};

export async function loadMagazineIssue(): Promise<MagazineIssueResult> {
  try {
    const issues = await supabaseSelect<IssueRow>(
      "issues",
      "*",
      {
        slug: "june-2026",
      }
    );

    if (!issues?.length) {
      return {
        ...currentIssue,
        source: "template",
        note: "No Supabase issue rows were found.",
        events: [],
      };
    }

    const issue = issues[0];
    const events = (await supabaseSelect<EventRow>("events", "*", {
      issue_id: issue.id,
    }))?.sort((a, b) => a.order_index - b.order_index) ?? [];

    const eventImages =
      (await supabaseSelect<EventImageRow>("event_images", "*"))?.sort(
        (a, b) => a.order_index - b.order_index
      ) ?? [];

    const imagesByEvent = new Map<number, EventImageRow[]>();
    for (const image of eventImages) {
      const list = imagesByEvent.get(image.event_id) ?? [];
      list.push(image);
      imagesByEvent.set(image.event_id, list);
    }

    const storyCards: StoryCard[] = events.slice(0, 3).map((event, index) => ({
        eyebrow: event.event_type ?? `Story ${index + 1}`,
        title: event.title,
        body: event.summary,
        highlight:
          event.stats?.map((stat) => `${stat.label ?? "Stat"}: ${stat.value ?? ""}`).join(" | ") ||
          "Add stats for this story in Supabase.",
        metrics: event.stats?.map((stat) => stat.label ?? "Stat") || [],
      }));

    const detailedEvents: MagazineEvent[] = events.map((event, index) => ({
      id: event.id,
      anchorId: `event-${event.id}`,
      title: event.title,
      date: event.event_date ?? issue.month,
      type: event.event_type ?? `Event ${index + 1}`,
      summary: event.summary,
      stats:
        event.stats?.map((stat, statIndex) => ({
          label: stat.label ?? `Stat ${statIndex + 1}`,
          value: stat.value ?? "",
        })) ?? [],
      images: (imagesByEvent.get(event.id) ?? []).map((image) => ({
        url: image.image_url,
        caption: image.caption ?? event.summary,
      })),
      videoUrl: event.video_url,
      blocks: normalizeEventBlocks(
        event,
        (imagesByEvent.get(event.id) ?? []).map((image) => ({
          url: image.image_url,
          caption: image.caption ?? event.summary,
        }))
      ),
    }));

    const gallery: GalleryItem[] = [];
    for (const event of events) {
      const images = imagesByEvent.get(event.id) ?? [];
      for (const image of images) {
        gallery.push({
          title: event.title,
          caption: image.caption ?? event.summary,
          image: image.image_url,
        });
      }
    }

    const videos: VideoItem[] = events
      .map((event) => {
        const videoId = videoIdFromUrl(event.video_url);
        if (!videoId) {
          return null;
        }

        return {
          title: event.title,
          description: event.summary,
          youtubeId: videoId,
          source: issue.title,
        };
      })
      .filter((value): value is VideoItem => Boolean(value))
      .slice(0, 3);

    const upcoming: EventItem[] = events
      .filter((event) => (event.event_type ?? "").toLowerCase().includes("upcoming"))
      .map((event) => ({
        date: event.event_date ?? "",
        title: event.title,
        body: event.summary,
        tag: event.event_type ?? "Event",
      }));

    const archiveRows = (await supabaseSelect<IssueRow>("issues", "*")) ?? [];
    const archive: ArchiveIssue[] = archiveRows
      .filter((row) => row.slug !== issue.slug)
      .sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""))
      .map((row) => ({
        month: row.month,
        title: row.title,
        summary: row.theme,
        pdfUrl: row.cover_image_url || "#",
      }))
      .slice(0, 6);

    const metrics: IssueMetric[] = [
      {
        label: "Story slots",
        value: String(Math.max(storyCards.length, 3)).padStart(2, "0"),
        note: "Loaded from your Supabase events",
      },
      {
        label: "Media slots",
        value: String(Math.max(gallery.length, 4)).padStart(2, "0"),
        note: "Loaded from your Supabase images",
      },
      {
        label: "Video slots",
        value: String(Math.max(videos.length, 1)).padStart(2, "0"),
        note: "Loaded from your Supabase links",
      },
    ];

    return {
      ...currentIssue,
      month: issue.month,
      title: issue.title,
      theme: issue.theme,
      intro: issue.intro,
      metrics,
      storyCards: storyCards.length ? storyCards : currentIssue.storyCards,
      gallery: gallery.length ? gallery.slice(0, 4) : currentIssue.gallery,
      videos: videos.length ? videos : currentIssue.videos,
      upcoming: upcoming.length ? upcoming : currentIssue.upcoming,
      archive: archive.length ? archive : currentIssue.archive,
      events: detailedEvents,
      source: "supabase",
      note: `Loaded ${events.length} event(s) from Supabase.`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Supabase error.";
    return {
      ...currentIssue,
      source: "template",
      note: message,
      events: [],
    };
  }
}
