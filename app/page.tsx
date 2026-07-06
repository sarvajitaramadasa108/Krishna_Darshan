import Image from "next/image";
import Link from "next/link";
import { archivePath } from "@/lib/newsletter-data";
import { loadMagazineIssue } from "@/lib/magazine-data";

export const dynamic = "force-dynamic";

function youtubeEmbedUrl(url?: string | null) {
  if (!url) {
    return null;
  }

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

function EventImageCarousel({
  images,
  title,
}: {
  images: Array<{ url: string; caption: string }>;
  title: string;
}) {
  if (!images.length) {
    return (
      <div className="rounded-[1.75rem] border border-white/70 bg-white/65 p-6 text-sm text-[#6f5a46] shadow-[0_16px_40px_rgba(86,48,18,0.08)]">
        Add event images in Supabase to show the carousel for {title}.
      </div>
    );
  }

  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
      {images.map((image, index) => (
        <figure
          key={`${title}-${index}`}
          className="min-w-[84%] snap-start overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 shadow-[0_18px_48px_rgba(86,48,18,0.12)] sm:min-w-[56%] lg:min-w-[38%]"
        >
          <Image
            src={image.url}
            alt={image.caption}
            width={1200}
            height={900}
            sizes="(max-width: 640px) 84vw, (max-width: 1024px) 56vw, 38vw"
            className="h-[240px] w-full object-cover sm:h-[320px]"
          />
          <figcaption className="px-4 py-3 text-sm leading-6 text-[#6f5a46]">
            {image.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
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
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7f3a24,#b85c38)] text-sm font-bold text-white shadow-lg shadow-[#7f3a24]/20">
                KD
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#a15b2f]">
                  Hare Krishna Vaikuntham Temple
                </p>
                <p className="font-serif-display text-xl font-semibold text-[#25150d]">
                  Krishna Darshan
                </p>
              </div>
            </div>

            <nav aria-label="Primary" className="flex flex-wrap gap-2">
              <Link
                href="#home"
                className="rounded-full border border-[#ddc7a9] bg-white/80 px-4 py-2 text-sm font-semibold text-[#5f4631] transition hover:border-[#b85c38] hover:text-[#7f3a24]"
              >
                Home
              </Link>
              <Link
                href={archivePath}
                className="rounded-full border border-[#ddc7a9] bg-white/80 px-4 py-2 text-sm font-semibold text-[#5f4631] transition hover:border-[#b85c38] hover:text-[#7f3a24]"
              >
                Previous Issues
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-[#ddc7a9] bg-white/80 px-4 py-2 text-sm font-semibold text-[#5f4631] transition hover:border-[#b85c38] hover:text-[#7f3a24]"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </header>

        <section
          id="home"
          className="relative mt-6 overflow-hidden rounded-[2.5rem] border border-[#ead9bc] bg-[linear-gradient(135deg,rgba(255,248,236,0.98),rgba(248,232,205,0.94),rgba(255,255,255,0.92))] px-5 py-10 shadow-[0_28px_90px_rgba(91,50,22,0.14)] sm:px-8 sm:py-14 lg:px-12 lg:py-16"
        >
          <div className="absolute left-[-4rem] top-[-2rem] h-40 w-40 rounded-full bg-[#d7a95a]/20 blur-3xl" />
          <div className="absolute bottom-[-3rem] right-[-2rem] h-44 w-44 rounded-full bg-[#b85c38]/20 blur-3xl" />

          <div className="relative grid gap-6 text-center">
            {currentIssue.source === "supabase" ? (
              <div className="mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-[#ead9bc] bg-white/80 px-4 py-2 text-sm text-[#7f3a24] shadow-sm">
                <span className="font-semibold">Supabase connected</span>
                <span className="text-[#8b6d53]">{currentIssue.note}</span>
              </div>
            ) : (
              <div className="mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-[#ead9bc] bg-white/80 px-4 py-2 text-sm text-[#7f3a24] shadow-sm">
                <span className="font-semibold">Template fallback</span>
                <span className="text-[#8b6d53]">{currentIssue.note}</span>
              </div>
            )}

            <div className="flex justify-center">
              <span className="rounded-full border border-[#f0d8ae] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#a15b2f]">
                A web-first monthly issue
              </span>
            </div>

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

            <p className="mx-auto max-w-3xl text-base leading-8 text-[#5e4a39] sm:text-lg">
              {currentIssue.intro}
            </p>
          </div>
        </section>

        <section id="events" className="py-10 sm:py-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#a15b2f]">
                Events in the month of June
              </p>
              <h2 className="mt-2 font-serif-display text-4xl font-semibold text-[#25150d] sm:text-5xl">
                Event pallets you can tap into
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#645042]">
              The grid reshapes itself automatically so mobile stays one-column,
              tablets can show two, and larger screens can show three or more.
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
                    className={`fade-up overflow-hidden rounded-[1.9rem] border border-[#e4cfb3] bg-white/82 shadow-[0_16px_40px_rgba(86,48,18,0.12)]`}
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
                      <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#7f3a24]">
                        {event.type}
                      </div>
                    </div>

                    <div className="space-y-4 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-[#7f3a24]">
                          {event.date}
                        </span>
                        <span className="rounded-full bg-[#fff4dd] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#a15b2f]">
                          {index + 1}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif-display text-3xl font-semibold leading-tight text-[#25150d]">
                          {event.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[#645042]">
                          Click Here for more details
                        </p>
                      </div>

                      <Link
                        href={`#${event.anchorId}`}
                        className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#7f3a24,#b85c38)] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-105"
                      >
                        {event.title}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-[#ead9bc] bg-white/80 p-6 text-sm text-[#6f5a46]">
              No Supabase events were found yet. Add rows to the <span className="font-semibold">issues</span>,{" "}
              <span className="font-semibold">events</span>, and <span className="font-semibold">event_images</span>{" "}
              tables, then redeploy.
            </div>
          )}
        </section>

        <section className="border-t border-[#ddc7a9] py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a15b2f]">
                Event details
              </p>
              <h2 className="mt-2 font-serif-display text-4xl font-semibold text-[#25150d]">
                Highlights, statistics, and image carousels
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#645042]">
              Each event opens into a detailed section below. Add more images or
              a YouTube link in Supabase and the section grows naturally.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {currentIssue.events.map((event, index) => {
              const hasStats = event.stats.length > 0;
              const videoEmbed = youtubeEmbedUrl(event.videoUrl);

              return (
                <article
                  key={event.id}
                  id={event.anchorId}
                  className="fade-up rounded-[2rem] border border-[#e4cfb3] bg-[linear-gradient(180deg,rgba(255,252,245,0.99),rgba(247,240,223,0.96))] p-5 shadow-[0_16px_40px_rgba(86,48,18,0.12)] sm:p-6"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
                        <span>{event.date}</span>
                        <span className="text-[#b88a4f]">•</span>
                        <span>{event.type}</span>
                      </div>

                      <h3 className="mt-3 font-serif-display text-4xl font-semibold leading-tight text-[#25150d]">
                        {event.title}
                      </h3>

                      <p className="mt-4 text-base leading-8 text-[#5e4a39]">
                        {event.summary}
                      </p>

                      <p className="mt-4 text-base leading-8 text-[#5e4a39]">
                        {hasStats
                          ? `Highlights from this event include ${event.stats
                              .map((stat) => `${stat.label} ${stat.value}`)
                              .join(", ")}.`
                          : "Add a few statistics in Supabase so this section can show attendance, service counts, or other highlights."}
                      </p>

                      {hasStats ? (
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

                    <div className="flex shrink-0 flex-col gap-3 lg:items-end">
                      <Link
                        href="#events"
                        className="inline-flex items-center justify-center rounded-full border border-[#d9c6ad] bg-white/85 px-4 py-3 text-sm font-semibold text-[#5f4631] transition hover:border-[#b85c38] hover:text-[#7f3a24]"
                      >
                        Go to the Events
                      </Link>
                      <Link
                        href={`#${event.anchorId}`}
                        className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#d7a95a,#b85c38)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(184,92,56,0.24)]"
                      >
                        {event.title}
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6">
                    <EventImageCarousel images={event.images} title={event.title} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="border-t border-[#ddc7a9] py-10">
          <div className="grid gap-4 rounded-[2rem] border border-[#e4cfb3] bg-[linear-gradient(135deg,rgba(255,252,245,0.98),rgba(243,228,196,0.92),rgba(255,244,230,0.98))] p-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a15b2f]">
                Contact Us
              </p>
              <h2 className="mt-2 font-serif-display text-4xl font-semibold text-[#25150d]">
                Ready for the next month&apos;s event story
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#645042]">
                Send the next issue event by event with photos, captions,
                statistics, and YouTube links. We can keep the older months as
                PDFs in the archive while each new month stays fully interactive
                on the website.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#ead9bc] bg-white/80 p-5 text-sm leading-7 text-[#645042]">
              <p className="font-semibold text-[#7f3a24]">Workflow</p>
              <p className="mt-2">
                1. Add issue and event rows in Supabase.
                <br />
                2. Upload images to the public bucket.
                <br />
                3. Add image rows and optional video links.
                <br />
                4. Redeploy on Vercel to publish the new issue.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
