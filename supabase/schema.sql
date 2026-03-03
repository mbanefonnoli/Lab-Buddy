-- Lab Buddy — Supabase schema
-- Run this once: Dashboard → SQL Editor → New query → Paste → Run

create table if not exists lab_reports (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  data         jsonb not null,
  analyzed_at  timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

alter table lab_reports enable row level security;

create policy "Users see own reports"
  on lab_reports for all
  using (auth.uid() = user_id);

create index if not exists lab_reports_user_date
  on lab_reports(user_id, analyzed_at desc);
