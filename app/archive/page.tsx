import Link from "next/link";
import { archivePath } from "@/lib/newsletter-data";
import { loadMagazineIssue } from "@/lib/magazine-data";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const currentIssue = await loadMagazineIssue();

  return (
    <main className="magazine-shell">
      <div className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="magazine-card rounded-[2rem] px-5 py-4 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#a15b2f]">
                Archive
              </p>
              <h1 className="mt-2 font-serif-display text-4xl font-semibold text-[#24150d]">
                Previous issues and archived PDFs
              </h1>
              <p className="mt-3 text-sm font-medium text-[#7f3a24]">
                {currentIssue.source === "supabase"
                  ? `Supabase connected: ${currentIssue.note}`
                  : currentIssue.note}
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-[#d8c3a4] bg-white/80 px-4 py-2 text-sm font-semibold text-[#5e4633] transition hover:border-[#b85c38] hover:text-[#7f3a24]"
            >
              Back to June issue
            </Link>
          </div>
        </div>

        <section className="grid gap-4 py-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="magazine-card-strong rounded-[2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
              Current issue
            </p>
            <h2 className="mt-3 font-serif-display text-4xl font-semibold text-[#24150d]">
              {currentIssue.month}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#645042]">
              June is the live web edition. It holds stories, statistics,
              images, and video embeds directly on the site.
            </p>
          </article>

          <article className="magazine-card rounded-[2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a15b2f]">
              Archive note
            </p>
            <h2 className="mt-3 font-serif-display text-4xl font-semibold text-[#24150d]">
              May remains as a PDF reference
            </h2>
              <p className="mt-3 text-sm leading-7 text-[#645042]">
                All earlier issues can continue as Drive PDFs, while June and
                onward move into the interactive web format.
              </p>
            <p className="mt-4 rounded-2xl border border-[#ead9bc] bg-[#fffaf1] px-4 py-4 text-sm leading-7 text-[#5f4633]">
              Archive path: {archivePath}
            </p>
          </article>
        </section>

        <section className="grid gap-4 pb-10 md:grid-cols-2 xl:grid-cols-3">
          {currentIssue.archive.map((issue, index) => (
            <article
              key={issue.month}
              className={`fade-up delay-${(index % 3) + 1} magazine-card rounded-[1.75rem] p-5`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a15b2f]">
                {issue.month}
              </p>
              <h3 className="mt-2 font-serif-display text-3xl font-semibold text-[#24150d]">
                {issue.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#645042]">
                {issue.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={issue.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#7f3a24] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6f3120]"
                >
                  Open PDF
                </Link>
                <Link
                  href="/"
                  className="rounded-full border border-[#d8c3a4] bg-white/80 px-4 py-2 text-sm font-semibold text-[#5e4633] transition hover:border-[#b85c38] hover:text-[#7f3a24]"
                >
                  View June
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
