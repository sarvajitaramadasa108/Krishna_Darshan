with inserted_issue as (
  insert into issues (
    slug,
    month,
    title,
    theme,
    intro,
    cover_image_url
  )
  values (
    'june-2026',
    'June 2026',
    'Krishna Darshan',
    'A web-first monthly issue',
    'Replace this with the actual June editorial intro. This should summarize the month and explain the theme in 3-6 lines.',
    null
  )
  returning id
)
insert into events (
  issue_id,
  title,
  event_date,
  event_type,
  summary,
  stats,
  video_url,
  order_index
)
select
  inserted_issue.id,
  v.title,
  v.event_date,
  v.event_type,
  v.summary,
  v.stats,
  v.video_url,
  v.order_index
from inserted_issue
cross join (
  values
    (
      'Main June event',
      'June 01',
      'festival',
      'Replace this with the first event story for June. Add the real summary and details here.',
      '[{"label":"Devotees","value":"0"},{"label":"Visitors","value":"0"}]'::jsonb,
      null,
      0
    ),
    (
      'Outreach highlight',
      'June 10',
      'outreach',
      'Replace this with the second event story for June.',
      '[{"label":"Volunteers","value":"0"},{"label":"Books","value":"0"}]'::jsonb,
      null,
      1
    ),
    (
      'Temple update',
      'June 20',
      'upcoming',
      'Replace this with the third event story for June or an upcoming program.',
      '[{"label":"Progress","value":"0%"}]'::jsonb,
      null,
      2
    )
) as v(title, event_date, event_type, summary, stats, video_url, order_index);
