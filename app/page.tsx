import Image from "next/image";
import Link from "next/link";
import {
  archivePath,
  issueNavigation,
  youtubeEmbedUrl,
} from "@/lib/newsletter-data";
import { loadMagazineIssue } from "@/lib/magazine-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const currentIssue = await loadMagazineIssue();

  return (
    <main className="magazine-shell">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <header className="sticky top-3 z-30 mb-6 rounded-full border border-white/40 bg-[rgba(255,250,242,0.84)] px-4 py-3 shadow-[0_10px_40px_rgba(102,60,24,0.12)] backdrop-blur-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7f3a24] text-sm font-semibold text-white shadow-lg shadow-[#7f3a24]/20">
                KD
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#8b6d53]">
                  Hare Krishna Vaikuntham Temple
                </p>
                <h1 className="font-serif-display text-xl font-semibold text-[#2d1a10]">
                  Krishna Darshan
                </h1>
              </div>
            </div>

            <nav aria-label="Primary" className="flex flex-wrap gap-2">
              {issueNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-[#d9c6ad] bg-white/80 px-4 py-2 text-sm font-medium text-[#5f4631] transition hover:border-[#b85c38] hover:text-[#7f3a24]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <section className="grid items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
          <div className="fade-up space-y-6">
            <p className="inline-flex items-center rounded-full border border-[#e0c8a6] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#a2522f]">
              Web-first magazine edition
            </p>
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#907457]">
                {currentIssue.month}
              </p>
              <h2 className="max-w-3xl font-serif-display text-5xl font-semibold leading-[0.95] text-[#26160d] sm:text-6xl lg:text-7xl">
                {currentIssue.theme}
              </h2>
            </div>
            <div className="inline-flex flex-wrap gap-2 rounded-full border border-[#ead9bc] bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7f3a24]">
              <span>{currentIssue.source === "supabase" ? "Supabase connected" : "Template fallback"}</span>
              <span className="normal-case tracking-normal">{currentIssue.note}</span>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#5e4a39] sm:text-lg">
              {currentIssue.intro}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#editorial-note"
                className="rounded-full bg-[#7f3a24] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7f3a24]/20 transition hover:-translate-y-0.5 hover:bg-[#6f3120]"
              >
                Start reading
              </Link>
              <Link
                href={archivePath}
                className="rounded-full border border-[#d8c3a4] bg-white/75 px-5 py-3 text-sm font-semibold text-[#5e4633] transition hover:border-[#b85c38] hover:text-[#7f3a24]"
              >
                Previous issues
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {currentIssue.metrics.map((metric, index) => (
                <article
                  key={metric.label}
                  className={`magazine-card rounded-3xl p-4 fade-up delay-${index + 1}`}
                >
                  <p className="text-3xl font-semibold text-[#2d1a10]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm text-[#6d5844]">{metric.label}</p>
                  <p className="mt-2 text-xs leading-5 text-[#8c745f]">
                    {metric.note}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="fade-up delay-1 relative">
            <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-[#d7a95a]/30 blur-3xl" />
            <div className="absolute -right-4 bottom-0 h-32 w-32 rounded-full bg-[#b85c38]/20 blur-3xl" />
            <div className="magazine-card-strong relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),rgba(255,255,255,0.05))]" />
              <div className="relative grid gap-4">
                <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-[#fff9f0]">
                  <Image
                    src="/cover-illustration.svg"
                    alt="Illustrated Krishna Darshan cover"
                    width={1400}
                    height={1060}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <article className="rounded-[1.5rem] border border-[#ead9bc] bg-white/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a15b2f]">
                      Editorial pattern
                    </p>
                    <h3 className="mt-2 font-serif-display text-3xl font-semibold text-[#28170d]">
                      Event by event, section by section
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#66513f]">
                      Every June issue can hold festival reports, outreach
                      coverage, stories with statistics, photos, and embedded
                      media in one scrollable page.
                    </p>
                  </article>
                  <article className="rounded-[1.5rem] border border-[#ead9bc] bg-[#fff7ec] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a15b2f]">
                      This issue
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-[#664f3b]">
                      {currentIssue.contents.map((item) => (
                        <li key={item.href}>{item.label}</li>
                      ))}
                    </ul>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="editorial-note"
          className="grid gap-4 border-t border-[#ddc7a9] py-10 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <article className="magazine-card rounded-[2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
              Editorial note
            </p>
            <h3 className="mt-3 font-serif-display text-4xl font-semibold text-[#24150d]">
              The page is designed like a monthly magazine spread
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#645042]">
              This template mirrors the way the May issue was organized, but it
              turns the flow into an interactive web page. The structure is now
              ready for June stories, and you can drop in real event details,
              photos, and links without redesigning the page each month.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {currentIssue.contents.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-[#ead9bc] bg-[#fffaf1] px-4 py-4 text-sm font-medium text-[#5f4633] transition hover:border-[#b85c38] hover:text-[#7f3a24]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </article>

          <article className="magazine-card-strong rounded-[2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
              June issue format
            </p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-[#645042]">
              <p>
                1. Opening editorial and monthly theme
              </p>
              <p>
                2. Event-by-event story cards with stats
              </p>
              <p>
                3. Gallery, videos, and press highlights
              </p>
              <p>
                4. Upcoming events and archive links
              </p>
            </div>
            <p className="mt-5 rounded-2xl border border-[#ead9bc] bg-white/70 px-4 py-4 text-sm leading-7 text-[#5f4633]">
              As you send June content, we can replace these template cards with
              real event names, speaker notes, attendance numbers, and media
              links.
            </p>
          </article>
        </section>

        <section
          id="issue-at-a-glance"
          className="grid gap-4 border-t border-[#ddc7a9] py-10 lg:grid-cols-3"
        >
          {currentIssue.storyCards.map((card, index) => (
            <article
              key={card.title}
              className={`magazine-card fade-up delay-${(index % 3) + 1} rounded-[1.75rem] p-6`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
                {card.eyebrow}
              </p>
              <h3 className="mt-3 font-serif-display text-3xl font-semibold leading-tight text-[#24150d]">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#645042]">
                {card.body}
              </p>
              <div className="mt-5 rounded-2xl border border-[#ead9bc] bg-white/70 px-4 py-3 text-sm font-medium text-[#7f3a24]">
                {card.highlight}
              </div>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-[#645042]">
                {card.metrics.map((metric) => (
                  <li key={metric} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#d7a95a]" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="feature-stories" className="border-t border-[#ddc7a9] py-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
                Feature stories
              </p>
              <h3 className="mt-3 font-serif-display text-4xl font-semibold text-[#24150d]">
                June stories that can be filled month by month
              </h3>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#645042]">
              Use these sections for the strongest June stories, whether they
              are festivals, outreach, construction updates, or community
              moments.
            </p>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {[
              {
                title: "Story 01",
                text: "Add the main June event here with date, summary, and a photo strip.",
              },
              {
                title: "Story 02",
                text: "Use this slot for outreach, book distribution, or prasadam service.",
              },
              {
                title: "Story 03",
                text: "A space for a leadership note, temple update, or special announcement.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className={`fade-up delay-${(index % 3) + 1} overflow-hidden rounded-[1.75rem] border border-[#e2ccb0] bg-white/80 shadow-[0_16px_40px_rgba(86,48,18,0.12)]`}
              >
                <div className="aspect-[4/3] bg-[linear-gradient(135deg,#d7a95a_0%,#f7e5c2_45%,#fff6e7_100%)]" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a15b2f]">
                    June event slot
                  </p>
                  <h4 className="mt-2 font-serif-display text-2xl font-semibold text-[#24150d]">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-[#645042]">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="gallery" className="border-t border-[#ddc7a9] py-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
                Gallery
              </p>
              <h3 className="mt-3 font-serif-display text-4xl font-semibold text-[#24150d]">
                Use photo tiles for the strongest visual moments
              </h3>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#645042]">
              Replace these tiles with June photos, and the page immediately
              feels like a magazine instead of a PDF upload.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {currentIssue.gallery.map((item, index) => (
              <article
                key={item.title}
                className={`fade-up delay-${(index % 3) + 1} overflow-hidden rounded-[1.75rem] border border-[#e2ccb0] bg-white/75 shadow-[0_16px_40px_rgba(86,48,18,0.12)]`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#f3e1c4]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-serif-display text-2xl font-semibold text-[#24150d]">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[#645042]">
                    {item.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="videos" className="border-t border-[#ddc7a9] py-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
                Video moments
              </p>
              <h3 className="mt-3 font-serif-display text-4xl font-semibold text-[#24150d]">
                Add embedded YouTube videos where they matter most
              </h3>
            </div>
            <Link
              href="https://www.youtube.com/user/harekrishnavizag"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center rounded-full border border-[#d8c3a4] bg-white/80 px-4 py-2 text-sm font-semibold text-[#5e4633] transition hover:border-[#b85c38] hover:text-[#7f3a24]"
            >
              Temple channel
            </Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {currentIssue.videos.map((video, index) => (
              <article
                key={video.youtubeId}
                className={`fade-up delay-${(index % 3) + 1} overflow-hidden rounded-[1.75rem] border border-[#e2ccb0] bg-white/80 shadow-[0_16px_40px_rgba(86,48,18,0.12)]`}
              >
                <div className="aspect-video bg-black">
                  <iframe
                    title={video.title}
                    src={youtubeEmbedUrl(video.youtubeId)}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a15b2f]">
                    {video.source}
                  </p>
                  <h4 className="mt-2 font-serif-display text-2xl font-semibold text-[#24150d]">
                    {video.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[#645042]">
                    {video.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="upcoming-events"
          className="border-t border-[#ddc7a9] py-10"
        >
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="magazine-card rounded-[2rem] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
                Upcoming events
              </p>
              <h3 className="mt-3 font-serif-display text-4xl font-semibold text-[#24150d]">
                A dedicated space for dates, invitations, and calls to action
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#645042]">
                These cards work for the events section from the May issue and
                can be replaced every month without changing the layout.
              </p>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {currentIssue.upcoming.map((event, index) => (
                <article
                  key={`${event.date}-${event.title}`}
                  className={`magazine-card-strong fade-up delay-${(index % 3) + 1} rounded-[1.5rem] p-5`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a15b2f]">
                    {event.tag}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#7f3a24]">
                    {event.date}
                  </p>
                  <h4 className="mt-2 font-serif-display text-2xl font-semibold text-[#24150d]">
                    {event.title}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-[#645042]">
                    {event.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#ddc7a9] py-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="magazine-card rounded-[2rem] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
                Free publishing flow
              </p>
              <h3 className="mt-3 font-serif-display text-4xl font-semibold text-[#24150d]">
                Ready for monthly updates
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#645042]">
                Keep June and onward as a website, then store older print issues
                as PDF archive links. Later, we can move the issue data into
                Supabase so your team can update stories without touching code.
              </p>
              <p className="mt-4 rounded-2xl border border-[#ead9bc] bg-[#fffaf1] px-4 py-4 text-sm leading-7 text-[#5f4633]">
                Next step: send the real June event details, photo links, and
                videos, and I&apos;ll swap the placeholders into a publish-ready
                issue page.
              </p>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "June issue",
                  text: "Web-first magazine with stories, media, and events.",
                },
                {
                  title: "May archive",
                  text: "Previous PDF issue linked from the archive page.",
                },
                {
                  title: "Supabase ready",
                  text: "Can hold issue metadata and asset links later.",
                },
                {
                  title: "Vercel ready",
                  text: "Can deploy as soon as the repository is connected.",
                },
              ].map((item, index) => (
                <article
                  key={item.title}
                  className={`magazine-card-strong fade-up delay-${(index % 3) + 1} rounded-[1.5rem] p-5`}
                >
                  <h4 className="font-serif-display text-2xl font-semibold text-[#24150d]">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[#645042]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-[#ddc7a9] pt-6 text-sm text-[#6f5a46]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>Krishna Darshan for Hare Krishna Movement Organisation.</p>
            <Link href={archivePath} className="font-semibold text-[#7f3a24]">
              Browse the archive
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
