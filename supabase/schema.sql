-- ============================================================
-- Lab Buddy – Supabase Schema
-- Paste this into: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

create table if not exists lab_reports (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  data         jsonb not null,        -- ExplainResponse { values[], disclaimer }
  analyzed_at  timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

-- Row-Level Security: each user only sees their own rows
alter table lab_reports enable row level security;

create policy "Users see own reports"
  on lab_reports
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Fast queries by user + recency
create index if not exists lab_reports_user_date
  on lab_reports(user_id, analyzed_at desc);
