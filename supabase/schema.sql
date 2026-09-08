-- =========================================
-- PROMPTIQA DATABASE SCHEMA
-- Product Requirements Document (PRD) 2026
-- Creator: Muhammad Akbar Pamungkas
-- =========================================

create extension if not exists "uuid-ossp";

-- =========================================
-- PROFILES
-- =========================================
create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    username text unique,
    avatar_url text,
    total_xp integer default 0,
    current_streak integer default 0,
    longest_streak integer default 0,
    last_activity_date date,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- =========================================
-- CHALLENGES
-- =========================================
create table if not exists public.challenges (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    slug text unique not null,
    description text,
    instructions text not null,
    goal text,
    rules jsonb default '[]'::jsonb,
    sample_input jsonb,
    track text not null,
    difficulty text not null,
    xp_reward integer default 100,
    ideal_prompt text,
    is_published boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),

    constraint challenges_track_check
    check (track in ('developer', 'data', 'security')),

    constraint challenges_difficulty_check
    check (difficulty in ('beginner', 'intermediate', 'advanced', 'expert'))
);

-- =========================================
-- USER PROGRESS
-- =========================================
create table if not exists public.user_progress (
    id uuid primary key default uuid_generate_v4(),

    user_id uuid not null
    references public.profiles(id)
    on delete cascade,

    challenge_id uuid not null
    references public.challenges(id)
    on delete cascade,

    prompt_text text,
    score integer,
    grade text,
    clarity_score integer,
    role_score integer,
    constraint_score integer,
    format_score integer,
    security_risk text,

    is_completed boolean default false,
    attempts integer default 0,
    earned_xp integer default 0,

    completed_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),

    unique(user_id, challenge_id)
);

-- =========================================
-- COMMUNITY PROMPTS
-- =========================================
create table if not exists public.community_prompts (
    id uuid primary key default uuid_generate_v4(),

    user_id uuid not null
    references public.profiles(id)
    on delete cascade,

    title text not null,
    description text,
    prompt_content text not null,
    track text,
    tags text[] default '{}',
    visibility text default 'public',

    stars_count integer default 0,
    forks_count integer default 0,

    original_prompt_id uuid
    references public.community_prompts(id),

    created_at timestamptz default now(),
    updated_at timestamptz default now(),

    constraint community_visibility_check
    check (visibility in ('public', 'private'))
);

-- =========================================
-- PROMPT VERSIONS
-- =========================================
create table if not exists public.prompt_versions (
    id uuid primary key default uuid_generate_v4(),

    user_id uuid not null
    references public.profiles(id)
    on delete cascade,

    challenge_id uuid
    references public.challenges(id)
    on delete cascade,

    version_number integer not null,
    prompt_content text not null,

    created_at timestamptz default now()
);

-- =========================================
-- PROMPT STARS
-- =========================================
create table if not exists public.prompt_stars (
    id uuid primary key default uuid_generate_v4(),

    user_id uuid not null
    references public.profiles(id)
    on delete cascade,

    prompt_id uuid not null
    references public.community_prompts(id)
    on delete cascade,

    created_at timestamptz default now(),

    unique(user_id, prompt_id)
);

-- =========================================
-- USER BADGES
-- =========================================
create table if not exists public.user_badges (
    id uuid primary key default uuid_generate_v4(),

    user_id uuid not null
    references public.profiles(id)
    on delete cascade,

    badge_key text not null,
    earned_at timestamptz default now(),

    unique(user_id, badge_key)
);

-- =========================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================
alter table public.profiles enable row level security;
alter table public.challenges enable row level security;
alter table public.user_progress enable row level security;
alter table public.community_prompts enable row level security;
alter table public.prompt_versions enable row level security;
alter table public.prompt_stars enable row level security;
alter table public.user_badges enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

-- Policies for Challenges
create policy "Published challenges are viewable by all" on public.challenges for select using (is_published = true);

-- Policies for User Progress
create policy "Users view own progress" on public.user_progress for select using (auth.uid() = user_id);
create policy "Users create own progress" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "Users update own progress" on public.user_progress for update using (auth.uid() = user_id);

-- Policies for Community Prompts
create policy "Public community prompts are viewable" on public.community_prompts for select using (visibility = 'public' or auth.uid() = user_id);
create policy "Users create own community prompts" on public.community_prompts for insert with check (auth.uid() = user_id);
create policy "Users update own community prompts" on public.community_prompts for update using (auth.uid() = user_id);
create policy "Users delete own community prompts" on public.community_prompts for delete using (auth.uid() = user_id);

-- Policies for Prompt Versions
create policy "Users view own prompt versions" on public.prompt_versions for select using (auth.uid() = user_id);
create policy "Users create own prompt versions" on public.prompt_versions for insert with check (auth.uid() = user_id);

-- Policies for Prompt Stars
create policy "Stars are viewable" on public.prompt_stars for select using (true);
create policy "Users manage own stars" on public.prompt_stars for all using (auth.uid() = user_id);

-- Policies for User Badges
create policy "Badges are viewable" on public.user_badges for select using (true);

-- =========================================
-- AUTH PROFILE TRIGGER
-- =========================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
    insert into public.profiles (
        id,
        username,
        avatar_url
    )
    values (
        new.id,
        coalesce(
            new.raw_user_meta_data->>'user_name',
            new.raw_user_meta_data->>'name',
            'user_' || substring(new.id::text, 1, 8)
        ),
        new.raw_user_meta_data->>'avatar_url'
    );
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();
