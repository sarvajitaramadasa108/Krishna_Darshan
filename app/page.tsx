import Image from "next/image";
import Link from "next/link";
import {
  archivePath,
  currentIssue,
  issueNavigation,
  youtubeEmbedUrl,
} from "@/lib/newsletter-data";

export default function Home() {
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
              Monthly magazine, interactive edition
            </p>
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#907457]">
                {currentIssue.month}
              </p>
              <h2 className="max-w-3xl font-serif-display text-5xl font-semibold leading-[0.95] text-[#26160d] sm:text-6xl lg:text-7xl">
                {currentIssue.theme}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#5e4a39] sm:text-lg">
              {currentIssue.intro}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#editors-note"
                className="rounded-full bg-[#7f3a24] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7f3a24]/20 transition hover:-translate-y-0.5 hover:bg-[#6f3120]"
              >
                Read this issue
              </Link>
              <Link
                href={archivePath}
                className="rounded-full border border-[#d8c3a4] bg-white/75 px-5 py-3 text-sm font-semibold text-[#5e4633] transition hover:border-[#b85c38] hover:text-[#7f3a24]"
              >
                Open archive
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {currentIssue.coverStat.map((stat, index) => (
                <article
                  key={stat.label}
                  className={`magazine-card rounded-3xl p-4 fade-up delay-${index + 1}`}
                >
                  <p className="text-3xl font-semibold text-[#2d1a10]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-[#6d5844]">{stat.label}</p>
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
                    alt="Illustrated cover for Krishna Darshan"
                    width={1400}
                    height={1060}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <article className="rounded-[1.5rem] border border-[#ead9bc] bg-white/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a15b2f]">
                      Featured story
                    </p>
                    <h3 className="mt-2 font-serif-display text-3xl font-semibold text-[#28170d]">
                      Temple life in motion
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#66513f]">
                      A visual, scroll-friendly issue page for festivals,
                      outreach, and devotional service.
                    </p>
                  </article>
                  <article className="rounded-[1.5rem] border border-[#ead9bc] bg-[#fff7ec] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a15b2f]">
                      Monthly flow
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-[#664f3b]">
                      <li>One page that feels like a magazine spread</li>
                      <li>Archive links for older PDF editions</li>
                      <li>Embedded video moments from YouTube</li>
                    </ul>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="editors-note"
          className="grid gap-4 border-t border-[#ddc7a9] py-10 lg:grid-cols-3"
        >
          {currentIssue.sections.map((section, index) => (
            <article
              key={section.title}
              className={`magazine-card fade-up delay-${(index % 3) + 1} rounded-[1.75rem] p-6`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
                {section.eyebrow}
              </p>
              <h3 className="mt-3 font-serif-display text-3xl font-semibold leading-tight text-[#24150d]">
                {section.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#645042]">
                {section.body}
              </p>
              <div className="mt-5 rounded-2xl border border-[#ead9bc] bg-white/70 px-4 py-3 text-sm font-medium text-[#7f3a24]">
                {section.accent}
              </div>
              {section.bullets ? (
                <ul className="mt-5 space-y-2 text-sm leading-6 text-[#645042]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#d7a95a]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </section>

        <section
          id="highlights"
          className="grid gap-6 border-t border-[#ddc7a9] py-10 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <article className="fade-up magazine-card rounded-[2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
              Monthly Highlights
            </p>
            <h3 className="mt-3 font-serif-display text-4xl font-semibold text-[#24150d]">
              Story blocks that guide the reader
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#645042]">
              This structure is ideal for a newsletter that mixes text, photos,
              and links. Each card can become a different section every month:
              a festival recap, a seva story, a donation update, or a youth
              program feature.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Festival photo stories",
                "Temple service highlights",
                "Outreach and prasadam updates",
                "Audio and video embeds",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#ead9bc] bg-[#fffaf1] px-4 py-4 text-sm font-medium text-[#5f4633]"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Festival rhythm",
                text: "Use a bright visual block for Janmashtami, Radhashtami, Govardhan, or any month-specific celebration.",
              },
              {
                title: "Community service",
                text: "Feature book distribution, prasadam, youth outreach, and temple maintenance in clean cards.",
              },
              {
                title: "Editorial depth",
                text: "Add a short introduction from leadership and a closing note from the editorial team.",
              },
              {
                title: "Print archive",
                text: "Keep older editions as PDFs and only the current month as the rich web experience.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className={`magazine-card-strong fade-up delay-${(index % 3) + 1} rounded-[1.75rem] p-5`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a15b2f]">
                  Highlight
                </p>
                <h4 className="mt-2 font-serif-display text-2xl font-semibold text-[#24150d]">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-[#645042]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="gallery" className="border-t border-[#ddc7a9] py-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
                Devotional Gallery
              </p>
              <h3 className="mt-3 font-serif-display text-4xl font-semibold text-[#24150d]">
                Visual panels for photos and spreads
              </h3>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#645042]">
              Replace the illustrated panels with your monthly temple photos
              anytime. The grid already handles a photo-heavy, mobile-friendly
              layout.
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

        <section
          id="videos"
          className="border-t border-[#ddc7a9] py-10"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
                Watch and Listen
              </p>
              <h3 className="mt-3 font-serif-display text-4xl font-semibold text-[#24150d]">
                Bring YouTube straight into the issue
              </h3>
            </div>
            <Link
              href="https://www.youtube.com/user/harekrishnavizag"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center rounded-full border border-[#d8c3a4] bg-white/80 px-4 py-2 text-sm font-semibold text-[#5e4633] transition hover:border-[#b85c38] hover:text-[#7f3a24]"
            >
              Open the temple channel
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

        <section className="border-t border-[#ddc7a9] py-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="magazine-card rounded-[2rem] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
                Free publishing flow
              </p>
              <h3 className="mt-3 font-serif-display text-4xl font-semibold text-[#24150d]">
                A simple structure for every month
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#645042]">
                The fastest free approach is to keep the current issue in this
                web page, store your images in a free file bucket or directly in
                the repo for small assets, and keep the older months as PDF
                archives in Google Drive.
              </p>
              <p className="mt-4 rounded-2xl border border-[#ead9bc] bg-[#fffaf1] px-4 py-4 text-sm leading-7 text-[#5f4633]">
                When you are ready for a database, this same layout can move to
                a free Supabase table for issue metadata and a storage bucket
                for photos. The front-end does not need to change much.
              </p>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Current month",
                  text: "Web story with sections, photos, and videos.",
                },
                {
                  title: "Older months",
                  text: "Keep these as PDF downloads in an archive page.",
                },
                {
                  title: "Images",
                  text: "Use a free storage bucket or static public assets.",
                },
                {
                  title: "Data",
                  text: "Keep issue metadata in a typed content file or Supabase table.",
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
            <p>
              Krishna Darshan for Hare Krishna Movement Organisation.
            </p>
            <Link href={archivePath} className="font-semibold text-[#7f3a24]">
              Browse the archive
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
