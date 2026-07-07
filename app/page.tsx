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
        className="fixed bottom-4 right-4 z-50 rounded-full border border-white/50 bg-[#7f3a24] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(127,58,36,0.35)] transition hover:-translate-y-0.5 hover:bg-[#6f3120]"
      >
        Go to the Events
      </a>

      <div className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <header className="sticky top-3 z-40 rounded-full border border-white/50 bg-[rgba(255,248,236,0.82)] px-4 py-3 shadow-[0_16px_40px_rgba(91,50,22,0.14)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#ead9bc] bg-white shadow-lg shadow-[#7f3a24]/10">
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
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#a15b2f]">
                Hare Krishna Vaikuntham Cultural Centre
              </p>
            </div>
          </div>
        </header>

        <section
          id="home"
          className="relative mt-6 overflow-hidden rounded-[2.5rem] border border-[#ead9bc] bg-[linear-gradient(135deg,rgba(255,248,236,0.98),rgba(248,232,205,0.94),rgba(255,255,255,0.92))] px-5 py-10 shadow-[0_28px_90px_rgba(91,50,22,0.14)] sm:px-8 sm:py-14 lg:px-12 lg:py-16"
        >
          <div className="absolute left-[-4rem] top-[-2rem] h-40 w-40 rounded-full bg-[#d7a95a]/20 blur-3xl" />
          <div className="absolute bottom-[-3rem] right-[-2rem] h-44 w-44 rounded-full bg-[#b85c38]/20 blur-3xl" />

          <div className="relative grid gap-6 text-center">
            <h1 className="font-serif-display text-[clamp(3.6rem,12vw,7.5rem)] font-semibold leading-[0.88] text-[#2b160d]">
              Krishna Darshan
            </h1>

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="rounded-full border border-[#ead9bc] bg-white/80 px-4 py-2 text-sm font-semibold text-[#7f3a24] shadow-sm">
                A Monthly Newsletter
              </p>
              <p className="rounded-full border border-[#ead9bc] bg-white/80 px-4 py-2 text-sm font-semibold text-[#7f3a24] shadow-sm">
                {monthLabel}
              </p>
            </div>

            <p className="mx-auto max-w-4xl text-base leading-8 text-[#5e4a39] sm:text-lg">
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
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#a15b2f]">
              Events in the month of June
            </p>
          </div>

          {currentIssue.events.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {currentIssue.events.map((event, index) => {
                const coverImage = event.images[0]?.url;
                const accentClasses = [
                  "from-[#fff1d8] via-[#fffaf1] to-white",
                  "from-[#fce8dd] via-[#fff8f4] to-white",
                  "from-[#e7f5ef] via-[#f8fffc] to-white",
                  "from-[#f2e7ff] via-[#fbf8ff] to-white",
                ];
                const accent = accentClasses[index % accentClasses.length];

                return (
                  <article
                    key={event.id}
                    className="fade-up overflow-hidden rounded-[1.9rem] border border-[#e4cfb3] bg-white/82 shadow-[0_16px_40px_rgba(86,48,18,0.12)]"
                    style={{ animationDelay: `${index * 110}ms` }}
                  >
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${accent}`}>
                      {coverImage ? (
                        <Image
                          src={coverImage}
                          alt={event.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#8b6d53]">
                          Add a cover image for this event
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                    </div>

                    <div className="space-y-3 p-5">
                      <div>
                        <h3 className="font-serif-display text-3xl font-semibold leading-tight text-[#25150d]">
                          {event.title}
                        </h3>
                      </div>

                      <Link
                        href={`#${event.anchorId}`}
                        className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#7f3a24,#b85c38)] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-105"
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
              const videoEmbed = youtubeEmbedUrl(event.videoUrl);

              return (
                <article
                  key={event.id}
                  id={event.anchorId}
                  className="fade-up rounded-[2rem] border border-[#e4cfb3] bg-[linear-gradient(180deg,rgba(255,252,245,0.99),rgba(247,240,223,0.96))] p-5 shadow-[0_16px_40px_rgba(86,48,18,0.12)] sm:p-6"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex flex-col gap-5">
                    <div className="max-w-3xl">
                      <h3 className="font-serif-display text-4xl font-semibold leading-tight text-[#25150d]">
                        {event.title}
                      </h3>

                      <p className="mt-4 text-justify text-base leading-8 text-[#5e4a39]">
                        {event.summary}
                      </p>

                      {event.stats.length ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {event.stats.map((stat) => (
                            <span
                              key={`${event.id}-${stat.label}`}
                              className="rounded-full border border-[#ead9bc] bg-white/85 px-4 py-2 text-sm font-semibold text-[#7f3a24]"
                            >
                              {stat.label}: {stat.value}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {event.videoUrl ? (
                        <div className="mt-5">
                          {videoEmbed ? (
                            <div className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/70 shadow-[0_16px_40px_rgba(86,48,18,0.08)]">
                              <div className="aspect-video">
                                <iframe
                                  src={videoEmbed}
                                  title={`${event.title} video`}
                                  className="h-full w-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            </div>
                          ) : (
                            <Link
                              href={event.videoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex rounded-full bg-[#7f3a24] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#6f3120]"
                            >
                              Watch video
                            </Link>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-6">
                    <EventImageCarousel images={event.images} />
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
