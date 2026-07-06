type SupabaseRow = Record<string, unknown>;

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

async function supabaseSelect<T extends SupabaseRow>(
  table: string,
  select: string,
  filters: Record<string, string | number | boolean | undefined> = {}
) {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const searchParams = new URLSearchParams();
  searchParams.set("select", select);

  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined) {
      continue;
    }

    searchParams.set(key, `eq.${String(value)}`);
  }

  const response = await fetch(
    `${config.url}/rest/v1/${table}?${searchParams.toString()}`,
    {
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error(`Supabase request failed for ${table}: ${response.status}`);
  }

  return (await response.json()) as T[];
}

export { getSupabaseConfig, supabaseSelect };
