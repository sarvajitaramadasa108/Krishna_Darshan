import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const issues = sqliteTable(
  "issues",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull(),
    monthLabel: text("month_label").notNull(),
    title: text("title").notNull(),
    theme: text("theme").notNull(),
    intro: text("intro").notNull(),
    coverImageUrl: text("cover_image_url"),
    pdfUrl: text("pdf_url"),
    publishedAt: text("published_at"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    slugIdx: uniqueIndex("issues_slug_idx").on(table.slug),
  })
);

export const issueSections = sqliteTable(
  "issue_sections",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    issueId: integer("issue_id")
      .notNull()
      .references(() => issues.id, { onDelete: "cascade" }),
    sectionType: text("section_type").notNull(),
    orderIndex: integer("order_index").notNull(),
    eyebrow: text("eyebrow").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    accent: text("accent").notNull(),
    imageUrl: text("image_url"),
    videoUrl: text("video_url"),
    ctaLabel: text("cta_label"),
    ctaUrl: text("cta_url"),
  },
  (table) => ({
    issueOrderIdx: uniqueIndex("issue_sections_issue_order_idx").on(
      table.issueId,
      table.orderIndex
    ),
  })
);

export const mediaAssets = sqliteTable(
  "media_assets",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    issueId: integer("issue_id").references(() => issues.id, {
      onDelete: "cascade",
    }),
    assetType: text("asset_type").notNull(),
    label: text("label").notNull(),
    altText: text("alt_text").notNull(),
    url: text("url").notNull(),
    storageKey: text("storage_key"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => ({
    issueAssetIdx: uniqueIndex("media_assets_issue_asset_idx").on(
      table.issueId,
      table.assetType,
      table.label
    ),
  })
);

export const archiveLinks = sqliteTable(
  "archive_links",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    issueId: integer("issue_id").references(() => issues.id, {
      onDelete: "cascade",
    }),
    monthLabel: text("month_label").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    pdfUrl: text("pdf_url").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => ({
    issueArchiveIdx: uniqueIndex("archive_links_issue_archive_idx").on(
      table.issueId,
      table.monthLabel
    ),
  })
);
