import Image from "next/image";
import Link from "next/link";
import { loadMagazineIssue } from "@/lib/magazine-data";
import EventImageCarousel from "@/components/event-image-carousel";

export const dynamic = "force-dynamic";

function youtubeEmbedUrl(url?: string | null) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "");
      return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : null;
    }

    const videoId = parsed.searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const currentIssue = await loadMagazineIssue();
  const monthLabel = currentIssue.month.replace(/(\w+)\s+(\d{4})$/, "$1, $2");

  return (
    <main className="magazine-shell">
      <a
        href="#events"
        className="fixed bottom-4 right-4 z-50 rounded-full border border-white/60 bg-[linear-gradient(135deg,#6d28d9,#ec4899,#f59e0b)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(109,40,217,0.3)] transition hover:-translate-y-0.5"
      >
        Go to the Events
      </a>

      <div className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <header className="sticky top-3 z-40 rounded-full border border-white/60 bg-[rgba(255,255,255,0.72)] px-4 py-3 shadow-[0_16px_40px_rgba(99,102,241,0.12)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-white shadow-lg shadow-[#7c3aed]/10">
              <Image
                src="/temple-logo.png"
                alt="Hare Krishna Vaikuntham Cultural Centre logo"
                width={48}
                height={48}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#7c3aed]">
                Hare Krishna Vaikuntham Cultural Centre
              </p>
            </div>
          </div>
        </header>

        <section
          id="home"
          className="relative mt-6 overflow-hidden rounded-[2.5rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,227,244,0.92),rgba(231,245,255,0.92),rgba(255,247,214,0.9),rgba(236,253,245,0.9))] px-5 py-10 shadow-[0_28px_90px_rgba(99,102,241,0.14)] sm:px-8 sm:py-14 lg:px-12 lg:py-16"
        >
          <div className="absolute left-[-4rem] top-[-2rem] h-40 w-40 rounded-full bg-[#f472b6]/25 blur-3xl" />
          <div className="absolute bottom-[-3rem] right-[-2rem] h-44 w-44 rounded-full bg-[#38bdf8]/25 blur-3xl" />

          <div className="relative grid gap-6 text-center">
            <h1 className="font-serif-display text-[clamp(3.6rem,12vw,7.5rem)] font-semibold leading-[0.88] text-[#1e1b4b]">
              Krishna Darshan
            </h1>

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-semibold text-[#0f766e] shadow-sm">
                A Monthly Newsletter
              </p>
              <p className="rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-semibold text-[#7c3aed] shadow-sm">
                {monthLabel}
              </p>
            </div>

            <p className="mx-auto max-w-4xl text-base leading-8 text-[#334155] sm:text-lg">
              Krishna Darshan is a monthly magazine that captures the spiritual
              heartbeat of Hare Krishna Vaikuntham Temple. Each edition offers
              a curated glimpse into the festivals, outreach activities,
              devotional gatherings, and services rendered by the temple and
              its dedicated community of devotees. With every page, we
              celebrate devotion in action, the joy of service, and the
              timeless culture of bhakti that continues to flourish within the
              Hare Krishna Movement.
            </p>
          </div>
        </section>

        <section id="events" className="py-10 sm:py-12">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#7c3aed]">
              Events in the month of June
            </p>
          </div>

          {currentIssue.events.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {currentIssue.events.map((event, index) => {
                const coverImage = event.images[0]?.url;
                const accentClasses = [
                  "from-[#ffe4f1] via-[#fff7fd] to-white",
                  "from-[#e0f2fe] via-[#f8fcff] to-white",
                  "from-[#dcfce7] via-[#f8fff9] to-white",
                  "from-[#fef3c7] via-[#fffef6] to-white",
                ];
                const accent = accentClasses[index % accentClasses.length];

                return (
                  <article
                    key={event.id}
                    id={`event-card-${event.id}`}
                    className="fade-up overflow-hidden rounded-[1.9rem] border border-white/70 bg-white/84 shadow-[0_16px_40px_rgba(79,70,229,0.12)]"
                    style={{ animationDelay: `${index * 110}ms` }}
                  >
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${accent}`}>
                      {coverImage ? (
                        <Image
                          src={coverImage}
                          alt={event.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-contain bg-white p-2 sm:p-3"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#64748b]">
                          Add a cover image for this event
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                    </div>

                    <div className="space-y-3 p-5">
                      <div>
                        <h3 className="font-serif-display text-3xl font-semibold leading-tight text-[#1e1b4b]">
                          {event.title}
                        </h3>
                      </div>

                      <Link
                        href={`#${event.anchorId}`}
                        className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#6d28d9,#db2777,#f59e0b)] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-105"
                      >
                        Click Here for more details
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-[#ead9bc] bg-white/80 p-6 text-sm text-[#6f5a46]">
              No Supabase events were found yet.
            </div>
          )}
        </section>

        <section className="border-t border-[#ddc7a9] py-8">
          <div className="space-y-8">
            {currentIssue.events.map((event, index) => {
              return (
                <article
                  key={event.id}
                  id={event.anchorId}
                  className="fade-up rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,254,255,0.95),rgba(255,248,220,0.94))] p-5 shadow-[0_16px_40px_rgba(79,70,229,0.12)] sm:p-6"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="max-w-3xl">
                        <h3 className="font-serif-display text-4xl font-semibold leading-tight text-[#1e1b4b]">
                          {event.title}
                        </h3>

                        {event.stats.length ? (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {event.stats.map((stat) => (
                              <span
                                key={`${event.id}-${stat.label}`}
                                className="rounded-full border border-white/80 bg-white/90 px-4 py-2 text-sm font-semibold text-[#7c3aed]"
                              >
                                {stat.label}: {stat.value}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        <div className="mt-6 space-y-6">
                          {event.blocks.map((block, blockIndex) => {
                            if (block.type === "paragraph") {
                              return (
                                <p
                                  key={`${event.id}-paragraph-${blockIndex}`}
                                  className="text-justify text-base leading-8 text-[#5e4a39]"
                                >
                                  {block.text}
                                </p>
                              );
                            }

                            if (block.type === "gallery") {
                              return (
                                <EventImageCarousel
                                  key={`${event.id}-gallery-${blockIndex}`}
                                  images={block.images}
                                />
                              );
                            }

                            if (block.type === "video") {
                              const blockVideoEmbed = youtubeEmbedUrl(block.url);
                              return (
                                <div
                                  key={`${event.id}-video-${blockIndex}`}
                                  className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/70 shadow-[0_16px_40px_rgba(86,48,18,0.08)]"
                                >
                                  {blockVideoEmbed ? (
                                    <div className="aspect-video">
                                      <iframe
                                        src={blockVideoEmbed}
                                        title={`${event.title} video`}
                                        className="h-full w-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      />
                                    </div>
                                  ) : (
                                    <Link
                                      href={block.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex rounded-full bg-[linear-gradient(135deg,#06b6d4,#8b5cf6)] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-105"
                                    >
                                      Watch video
                                    </Link>
                                  )}
                                </div>
                              );
                            }

                            return null;
                          })}
                        </div>
                      </div>

                      <Link
                        href={`#event-card-${event.id}`}
                        className="inline-flex h-fit items-center justify-center rounded-full border border-white/80 bg-white/90 px-4 py-3 text-sm font-semibold text-[#0f766e] transition hover:text-[#7c3aed]"
                      >
                        Go to the Events
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
