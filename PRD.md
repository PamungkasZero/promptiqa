# Promptiqa
## Product Requirements Document (PRD) & Technical Blueprint

**Product Name:** Promptiqa  
**Creator & Lead Developer:** Muhammad Akbar Pamungkas  
**Year:** 2026  
**Type:** Gamified AI Prompt Engineering Tutor & Diagnostic Sandbox  
**Category:** EdTech / Micro-SaaS  
**Primary Platform:** Web Application  
**Deployment:** Vercel  

---

# 1. PRODUCT OVERVIEW

## 1.1 Product Vision

Promptiqa adalah platform pembelajaran **Prompt Engineering berbasis gamification** yang memungkinkan pengguna untuk:

- Belajar membuat prompt secara interaktif.
- Menyelesaikan challenge berdasarkan skenario nyata.
- Menulis dan menguji prompt dalam sandbox.
- Mendapatkan AI grading otomatis.
- Mendeteksi kelemahan prompt.
- Memahami risiko Prompt Injection dan Jailbreak.
- Membandingkan prompt versi lama dan baru.
- Mengoptimalkan prompt secara otomatis.
- Berbagi prompt dengan komunitas.

Promptiqa bukan sekadar chatbot AI. Produk ini harus terasa seperti kombinasi:

> **Duolingo + VS Code + Prompt Engineering Playground**

---

# 2. PRODUCT GOALS

## 2.1 Primary Goals

1. Membantu pengguna belajar Prompt Engineering secara praktis.
2. Memberikan feedback AI yang spesifik dan actionable.
3. Membuat pembelajaran terasa seperti game.
4. Menyediakan sandbox untuk eksperimen prompt.
5. Membangun komunitas berbagi prompt.
6. Menjadi Micro-SaaS yang scalable.

## 2.2 Non-Goals

Versi awal tidak perlu:

- Marketplace berbayar.
- Team collaboration real-time.
- Custom AI model training.
- Fine-tuning model.
- Mobile native application.
- Complex enterprise features.

---

# 3. TARGET USERS

## 3.1 Beginner

Karakteristik:
- Baru mengenal AI.
- Tidak memahami struktur prompt.
- Membutuhkan panduan.

Needs:
- Challenge sederhana.
- Contoh prompt.
- Feedback jelas.
- Gamification.

## 3.2 Intermediate

Karakteristik:
- Sudah menggunakan ChatGPT/Gemini.
- Ingin meningkatkan kualitas prompt.

Needs:
- Prompt diagnostics.
- Version comparison.
- Advanced challenges.

## 3.3 Developer

Karakteristik:
- Programmer.
- AI builder.
- Automation developer.

Needs:
- API examples.
- Export code snippets.
- Structured prompting.
- Security testing.

---

# 4. CORE VALUE PROPOSITION

> **"Learn Prompt Engineering by building, breaking, testing, and improving prompts."**

Promptiqa harus memberikan feedback yang menjawab:
- Apa yang salah?
- Mengapa prompt mendapatkan nilai rendah?
- Bagian mana yang harus diperbaiki?
- Bagaimana versi prompt yang lebih baik?
- Apakah prompt memiliki risiko keamanan?

---

# 5. BRANDING

## Application Name

`Promptiqa`

## Branding Subtitle

`Created by Muhammad Akbar Pamungkas`

## Footer

`Promptiqa © 2026 — Designed & Built by Muhammad Akbar Pamungkas`

---

# 6. DESIGN SYSTEM

## 6.1 Visual Style

Primary Style: **Neo-Brutalism**

Characteristics:
- Thick borders.
- Hard shadows.
- Bold typography.
- High contrast.
- Flat colors.
- Playful UI.
- Minimal gradients.
- No excessive blur.

## 6.2 Border Rules

Default:

```css
border: 2px solid black;
```

Important components:

```css
border: 3px solid black;
```

## 6.3 Shadow Rules

Hard shadow only:

```css
box-shadow: 4px 4px 0px black;
```

Large cards:

```css
box-shadow: 6px 6px 0px black;
```

Hover:

```css
transform: translate(-2px, -2px);
```

Active:

```css
transform: translate(2px, 2px);
box-shadow: 2px 2px 0px black;
```

Never use:
- Blur shadows
- Glassmorphism
- Heavy gradients
- Excessive rounded cards

## 6.4 Color Palette

| Name | Value |
|---|---|
| Off White | `#F5F1E8` |
| Black | `#111111` |
| Yellow | `#FFD93D` |
| Pink | `#FF8FAB` |
| Cyan | `#72DDF7` |
| Pastel Purple | `#CDB4DB` |
| White | `#FFFFFF` |

## 6.5 Typography

- Headings: `Space Grotesk`
- Body: `Inter`
- Code Editor: `JetBrains Mono`

---

# 7. TECH STACK

## Frontend / Fullstack
- SvelteKit
- TypeScript

## Styling
- TailwindCSS
- Lucide Icons

## Backend
- SvelteKit Server Routes

## Database & Auth
- Supabase PostgreSQL
- Supabase Auth

## AI Engine
- Google Gemini API
- Default model: `gemini-1.5-flash`
- Optional: Gemini Pro

## Deployment
- Vercel

---

# 8. SYSTEM ARCHITECTURE

```text
USER
 │
 ▼
SvelteKit Frontend
 │
 ├── Authentication ──> Supabase Auth
 │
 ├── Database ────────> Supabase PostgreSQL
 │
 ├── Challenge Engine
 │
 ├── Prompt Sandbox
 │
 └── API Routes
         │
         ▼
    Gemini API
         │
         ├── Prompt Grading
         ├── Security Scan
         ├── Optimization
         └── Output Simulation
```

---

# 9. APPLICATION NAVIGATION

## Header Navigation

```text
[Promptiqa Logo]

Sandbox
Community Hub
Leaderboard

[XP: 1,250]
[🔥 7 Days]

[Settings]
[Login / Avatar]
```

## Mobile Navigation

```text
[Logo]

Hamburger Menu

Sandbox
Community
Leaderboard
Profile
Settings
```

---

# 10. AUTHENTICATION & USERS

## 10.1 Supported Authentication

- Google OAuth
- GitHub OAuth
- Magic Link Email

## 10.2 Guest Mode

Guest dapat:
- Melihat challenge.
- Mencoba 1 challenge.
- Menggunakan sandbox terbatas.
- Mendapat feedback.

Guest tidak dapat:
- Menyimpan progress permanen.
- Mendapat XP permanen.
- Mengakses Community Hub penuh.
- Menyimpan prompt.

## 10.3 Guest Storage

Gunakan `localStorage`.

```json
{
  "guestChallengeUsed": false,
  "temporaryXP": 100,
  "temporaryPrompt": "..."
}
```

## 10.4 Login Conversion

```text
Guest Data
     ↓
Migration
     ↓
User Account
     ↓
Supabase Database
```

## 10.5 User Profile

Profile memiliki:
- Avatar
- Username
- Total XP
- Current Streak
- Longest Streak
- Badges
- Challenge History
- Created Prompts
- Forked Prompts

---

# 11. SETTINGS PANEL

## UI Type

**Neo-Brutalist Modal Overlay**

```text
┌─────────────────────────────┐
│ SETTINGS                [X] │
├─────────────────────────────┤
│ AI CONFIGURATION            │
│ Gemini API Key              │
│ [_______________________]   │
│ Model                       │
│ [Gemini Flash        ▼]     │
│ APPEARANCE                  │
│ Dark Mode       [ON/OFF]    │
│ Sound FX        [ON/OFF]    │
│              [SAVE SETTINGS]│
└─────────────────────────────┘
```

## 11.1 Custom API Key

Optional field untuk:

`Unlimited Sandbox Mode`

Security:
- Never store API key in database plaintext.
- Never expose server API keys to client.
- Custom key sebaiknya hanya digunakan pada active session dan tidak dipersist secara default.

## 11.2 Model Preference

Options:
- Gemini Flash
- Gemini Pro

Default:
- Gemini Flash

## 11.3 UI Preferences

- Theme: Light / Dark
- Sound FX: Enabled / Disabled

---

# 12. MAIN WORKSPACE

## Split-Screen IDE Layout

```text
┌──────────────────────────────────────────────┐
│ HEADER                                       │
├─────────────────────┬────────────────────────┤
│ CHALLENGE BRIEF     │ PROMPT EDITOR          │
│ Instructions        │ Write Prompt...        │
│ Goal                │                        │
│ Rules               │                        │
│ Sample Input        │                        │
├─────────────────────┼────────────────────────┤
│ Challenge Info      │ Tokens | Cost          │
│                     │ Variables              │
│                     │ Versions               │
└─────────────────────┴────────────────────────┘
```

---

# 13. LEFT PANEL — CHALLENGE BRIEF

Contains:
- Challenge Title
- Difficulty
- Track
- XP Reward
- Instructions
- Goal
- Rules
- Sample Input Data

Example rules:

```text
Must define AI role.
Must enforce output format.
Must include constraints.
```

---

# 14. RIGHT PANEL — PROMPT EDITOR

Features:
- Monospace font
- Syntax highlighting
- Line numbers
- Auto save

Recommended font:

`JetBrains Mono`

---

# 15. LIVE TOKEN & COST COUNTER

Display:

```text
Tokens: 124
Estimated Cost: $0.000X
```

MVP dapat menggunakan approximate token estimation:

```text
characters / 4
```

Actual API usage dapat digunakan jika tersedia.

---

# 16. QUICK VARIABLE INJECTOR

Variables:

```text
{role}
{context}
{constraints}
{task}
{format}
{input}
```

UI:

```text
[+ ROLE]
[+ CONTEXT]
[+ CONSTRAINTS]
[+ FORMAT]
```

Behavior:
- Insert variable pada posisi cursor editor.

---

# 17. PROMPT VERSIONING & DIFF CHECKER

User dapat:
- Save Version
- Restore Version
- Compare Version

Example:

`v1 → v2 → v3`

Diff Checker mendeteksi:
- Added text
- Removed text
- Modified text

---

# 18. AI GRADING & DIAGNOSTIC ENGINE

Output:

```text
Overall Score: 87/100
Grade: B+
```

Total:

`100 Points`

## 18.1 Four Scoring Pillars

### Clarity — 0-25
Evaluate:
- Clear objective
- Specific instructions
- No ambiguity
- Logical structure

### Role / Persona — 0-25
Evaluate:
- Role exists
- Role relevance
- Persona specificity
- Expertise definition

### Constraint Precision — 0-25
Evaluate:
- Clear limitations
- Explicit requirements
- Boundaries
- Edge cases

### Format Enforcement — 0-25
Evaluate:
- Output structure
- JSON/schema requirements
- Bullet rules
- Formatting instructions

---

# 19. GRADE SYSTEM

```text
A+ = 95 - 100
A  = 90 - 94
B+ = 85 - 89
B  = 80 - 84
C+ = 75 - 79
C  = 70 - 74
D  = 60 - 69
F  = 0 - 59
```

---

# 20. SECURITY & GUARDRAIL SCANNER

Detect:
- Prompt Injection
- Jailbreak Attempts
- Instruction Override
- Role Hijacking
- Data Extraction Requests
- Unsafe Prompt Patterns

Example:

```json
{
  "riskLevel": "MEDIUM",
  "issues": [
    {
      "type": "PROMPT_INJECTION",
      "description": "Prompt allows instruction override."
    }
  ]
}
```

---

# 21. MAGIC AUTO-OPTIMIZE

Button:

`✨ MAGIC AUTO-OPTIMIZE`

Flow:

```text
User Prompt
      ↓
Gemini Analysis
      ↓
Prompt Refactoring
      ↓
Optimized Prompt
      ↓
Before vs After
```

Goal:

`Improve prompt toward Grade A.`

Rule:
- Jangan mengganti prompt user secara otomatis.
- Selalu tampilkan Original, Optimized, dan Diff.
- User memutuskan apakah optimized prompt akan digunakan.

---

# 22. OUTPUT SIMULATION

Compare:

```text
User Prompt Output
VS
Ideal Prompt Output
```

Purpose:
- Membantu user memahami dampak kualitas prompt terhadap hasil AI.

---

# 23. GAMIFICATION

## Challenge Tracks

### Developer Track
- Code Generation
- Debugging
- API Prompting
- Documentation
- System Design

### Data Track
- Data Analysis
- CSV Processing
- SQL Generation
- Data Extraction
- Structured Output

### Security Track
- Prompt Injection
- Jailbreak Detection
- Guardrails
- Secure Prompting
- Red Team Challenges

## Difficulty

- Beginner
- Intermediate
- Advanced
- Expert

---

# 24. XP SYSTEM

Example:

```text
Complete Challenge: +100 XP
Grade A: +50 XP
First Try Success: +25 XP
Daily Challenge: +75 XP
Security Challenge: +150 XP
```

---

# 25. DAILY STREAK SYSTEM

User mendapatkan streak jika menyelesaikan minimal:

`1 challenge per day`

Examples:

```text
🔥 1 Day
🔥 7 Days
🔥 30 Days
🔥 100 Days
```

---

# 26. BADGES

Examples:

- First Prompt
- Prompt Apprentice
- Prompt Engineer
- Prompt Master
- Security Hunter
- Data Wizard
- 7 Day Streak
- 30 Day Streak

---

# 27. COMMUNITY PROMPT HUB

Users dapat:
- Share Prompt
- Star Prompt
- Fork Prompt

Prompt card:

```text
┌─────────────────────────┐
│ 🔥 SQL Query Generator  │
│ By @username            │
│ ⭐ 245                  │
│ 🍴 32 Forks             │
│ [VIEW] [FORK]           │
└─────────────────────────┘
```

## Fork Flow

```text
Community Prompt
        ↓
Fork
        ↓
User Workspace
        ↓
Modify
        ↓
Save Version
```

---

# 28. EXPORT CODE SNIPPET

Supported:
- cURL
- Python
- JavaScript SDK

Example Python:

```python
prompt = """
Your prompt here
"""

response = model.generate_content(prompt)
```

---

# 29. DATABASE ARCHITECTURE

Core tables:
- `profiles`
- `challenges`
- `user_progress`
- `community_prompts`

Additional recommended tables:
- `prompt_versions`
- `prompt_stars`
- `user_badges`

---

# 30. DATABASE SCHEMA SQL

```sql
-- =========================================
-- PROMPTIQA DATABASE SCHEMA
-- =========================================

create extension if not exists "uuid-ossp";


-- =========================================
-- PROFILES
-- =========================================

create table public.profiles (
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

create table public.challenges (
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

create table public.user_progress (
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

create table public.community_prompts (
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

create table public.prompt_versions (
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

create table public.prompt_stars (
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

create table public.user_badges (
    id uuid primary key default uuid_generate_v4(),

    user_id uuid not null
    references public.profiles(id)
    on delete cascade,

    badge_key text not null,

    earned_at timestamptz default now(),

    unique(user_id, badge_key)
);
```

---

# 31. ROW LEVEL SECURITY

```sql
alter table profiles enable row level security;
alter table user_progress enable row level security;
alter table community_prompts enable row level security;
alter table prompt_versions enable row level security;
alter table prompt_stars enable row level security;
alter table user_badges enable row level security;
```

## Profile Policies

```sql
create policy "Public profiles are viewable"
on profiles
for select
using (true);

create policy "Users update own profile"
on profiles
for update
using (auth.uid() = id);
```

## User Progress Policies

```sql
create policy "Users view own progress"
on user_progress
for select
using (auth.uid() = user_id);

create policy "Users create own progress"
on user_progress
for insert
with check (auth.uid() = user_id);

create policy "Users update own progress"
on user_progress
for update
using (auth.uid() = user_id);
```

> Production implementation harus menambahkan policy INSERT/UPDATE/DELETE yang lengkap untuk seluruh tabel sesuai kebutuhan.

---

# 32. AUTH PROFILE TRIGGER

```sql
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
            new.raw_user_meta_data->>'name'
        ),

        new.raw_user_meta_data->>'avatar_url'
    );

    return new;

end;

$$;


create trigger on_auth_user_created

after insert on auth.users

for each row

execute procedure public.handle_new_user();
```

---

# 33. DATABASE RELATIONSHIP

```text
AUTH USERS
    │
    │ 1:1
    ▼
PROFILES
    │
    ├───────────────┐
    │               │
    ▼               ▼
USER_PROGRESS    COMMUNITY_PROMPTS
    │               │
    │               │
    ▼               ▼
CHALLENGES       PROMPT_STARS
    │
    ▼
PROMPT_VERSIONS
```

---

# 34. GEMINI API ARCHITECTURE

Correct architecture:

```text
Frontend
   │
   ▼
SvelteKit API Route
   │
   ▼
Gemini API
```

Never:

```text
Frontend → Direct Server Gemini API Key
```

---

# 35. GEMINI GRADING API CONTRACT

## Endpoint

```text
POST /api/ai/grade
```

## Request

```json
{
  "prompt": "User prompt",

  "challenge": {
    "title": "Challenge Title",
    "instructions": "Challenge instructions",
    "goal": "Expected goal",
    "rules": [
      "Rule 1",
      "Rule 2"
    ],
    "sampleInput": {}
  }
}
```

---

# 36. SYSTEM PROMPT API CONTRACT

```json
{
  "role": "system",

  "instruction": "You are Promptiqa Grading Engine, an expert AI Prompt Engineering evaluator. Your task is to objectively analyze a user's prompt based on the provided challenge. You must score the prompt using four categories: Clarity, Role/Persona, Constraint Precision, and Format Enforcement. Each category has a maximum score of 25 points. Return strict JSON only. Do not include markdown, explanations outside JSON, or conversational text.",

  "scoring_rules": {

    "clarity": {
      "max": 25,
      "evaluate": [
        "objective clarity",
        "instruction specificity",
        "ambiguity",
        "logical structure"
      ]
    },

    "role_persona": {
      "max": 25,
      "evaluate": [
        "role presence",
        "persona relevance",
        "expertise specificity"
      ]
    },

    "constraint_precision": {
      "max": 25,
      "evaluate": [
        "explicit constraints",
        "limitations",
        "boundaries",
        "requirements"
      ]
    },

    "format_enforcement": {
      "max": 25,
      "evaluate": [
        "output structure",
        "format instructions",
        "schema enforcement"
      ]
    }
  },

  "security_rules": {
    "detect": [
      "prompt injection",
      "jailbreak attempt",
      "instruction override",
      "role hijacking",
      "unsafe data extraction"
    ]
  },

  "output_requirement": {

    "format": "json",

    "schema": {

      "overallScore": "number 0-100",
      "grade": "string",

      "scores": {
        "clarity": "number 0-25",
        "rolePersona": "number 0-25",
        "constraintPrecision": "number 0-25",
        "formatEnforcement": "number 0-25"
      },

      "strengths": ["string"],
      "weaknesses": ["string"],
      "recommendations": ["string"],

      "security": {
        "riskLevel": "LOW | MEDIUM | HIGH",
        "issues": [
          {
            "type": "string",
            "description": "string"
          }
        ]
      }
    }
  }
}
```

---

# 37. GEMINI RESPONSE EXAMPLE

```json
{
  "overallScore": 87,

  "grade": "B+",

  "scores": {
    "clarity": 24,
    "rolePersona": 20,
    "constraintPrecision": 23,
    "formatEnforcement": 20
  },

  "strengths": [
    "Clear objective",
    "Specific constraints",
    "Good task definition"
  ],

  "weaknesses": [
    "AI role is not specific enough",
    "Output format is loosely defined"
  ],

  "recommendations": [
    "Define a more specific expert persona",
    "Explicitly define output structure"
  ],

  "security": {
    "riskLevel": "LOW",
    "issues": []
  }
}
```

---

# 38. MAGIC OPTIMIZE API

Endpoint:

```text
POST /api/ai/optimize
```

Request:

```json
{
  "prompt": "User prompt",
  "targetGrade": "A"
}
```

Response:

```json
{
  "optimizedPrompt": "Improved prompt",
  "improvements": [
    "Added clear role",
    "Added constraints",
    "Added output format"
  ]
}
```

---

# 39. OUTPUT SIMULATION API

Endpoint:

```text
POST /api/ai/simulate
```

Request:

```json
{
  "userPrompt": "User prompt",
  "idealPrompt": "Ideal prompt",
  "sampleInput": {}
}
```

Response:

```json
{
  "userOutput": "Output",
  "idealOutput": "Output"
}
```

---

# 40. PROJECT STRUCTURE

```text
promptiqa/

├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.svelte
│   │   │   │   ├── Card.svelte
│   │   │   │   ├── Modal.svelte
│   │   │   │   └── Badge.svelte
│   │   │   │
│   │   │   ├── workspace/
│   │   │   │   ├── ChallengeBrief.svelte
│   │   │   │   ├── PromptEditor.svelte
│   │   │   │   ├── TokenCounter.svelte
│   │   │   │   ├── VariableInjector.svelte
│   │   │   │   └── VersionDiff.svelte
│   │   │   │
│   │   │   ├── grading/
│   │   │   │   ├── ScoreCard.svelte
│   │   │   │   ├── SecurityReport.svelte
│   │   │   │   └── RecommendationList.svelte
│   │   │   │
│   │   │   └── community/
│   │   │       ├── PromptCard.svelte
│   │   │       └── PromptHub.svelte
│   │   │
│   │   ├── stores/
│   │   │   ├── auth.ts
│   │   │   ├── workspace.ts
│   │   │   └── settings.ts
│   │   │
│   │   ├── types/
│   │   │   ├── challenge.ts
│   │   │   ├── grading.ts
│   │   │   └── user.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── tokens.ts
│   │   │   ├── grading.ts
│   │   │   └── diff.ts
│   │   │
│   │   └── supabase/
│   │       └── client.ts
│   │
│   └── routes/
│       ├── +page.svelte
│       ├── sandbox/
│       │   └── +page.svelte
│       ├── community/
│       │   └── +page.svelte
│       ├── leaderboard/
│       │   └── +page.svelte
│       ├── profile/
│       │   └── +page.svelte
│       └── api/
│           └── ai/
│               ├── grade/+server.ts
│               ├── optimize/+server.ts
│               └── simulate/+server.ts
│
├── static/
├── supabase/
│   └── schema.sql
├── PRD.md
├── package.json
└── .env.example
```

---

# 41. ENVIRONMENT VARIABLES

```env
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
```

Important:

`GEMINI_API_KEY` must never use the `PUBLIC_` prefix.

---

# 42. CORE TYPES

## Challenge

```typescript
export interface Challenge {
  id: string;
  title: string;
  slug: string;
  description?: string;
  instructions: string;
  goal?: string;
  rules: string[];
  sampleInput?: unknown;

  track:
    | 'developer'
    | 'data'
    | 'security';

  difficulty:
    | 'beginner'
    | 'intermediate'
    | 'advanced'
    | 'expert';

  xpReward: number;
}
```

## Grading Result

```typescript
export interface GradingResult {
  overallScore: number;
  grade: string;

  scores: {
    clarity: number;
    rolePersona: number;
    constraintPrecision: number;
    formatEnforcement: number;
  };

  strengths: string[];
  weaknesses: string[];
  recommendations: string[];

  security: {
    riskLevel:
      | 'LOW'
      | 'MEDIUM'
      | 'HIGH';

    issues: SecurityIssue[];
  };
}

export interface SecurityIssue {
  type: string;
  description: string;
}
```

---

# 43. UI COMPONENT RULES

Every reusable UI component should be:
- Reusable
- Typed Props
- Accessible
- Keyboard Friendly
- Responsive
- Neo-Brutalist
- Minimal Dependencies

---

# 44. CUSTOM TAILWIND UTILITIES

```css
.neo-border {
  @apply border-2 border-black;
}

.neo-border-heavy {
  @apply border-[3px] border-black;
}

.neo-shadow {
  box-shadow: 4px 4px 0px #111111;
}

.neo-shadow-lg {
  box-shadow: 6px 6px 0px #111111;
}

.neo-button {
  @apply border-2 border-black;
  box-shadow: 4px 4px 0px #111111;
}

.neo-button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #111111;
}
```

---

# 45. STATE MANAGEMENT

Recommended:

`Svelte Stores`

Stores:
- `authStore`
- `workspaceStore`
- `settingsStore`
- `userStore`

## Workspace State

```typescript
interface WorkspaceState {
  challengeId: string | null;
  prompt: string;
  versions: PromptVersion[];
  selectedVersion: number;
  gradingResult: GradingResult | null;
  isLoading: boolean;
}
```

---

# 46. API ROUTE RULES

All AI requests:

```text
Frontend
     ↓
SvelteKit Server Route
     ↓
Validate Input
     ↓
Rate Limit
     ↓
Gemini API
     ↓
Validate AI JSON
     ↓
Return Response
```

Never:

`Frontend → Direct Server Gemini API Key`

---

# 47. ERROR HANDLING

AI failure:

> AI engine is temporarily unavailable. Please try again.

Invalid AI JSON:
1. Retry once.
2. If still failing, return controlled error.

Database error:
- Show user-friendly toast.

---

# 48. LOADING STATES

Examples:

```text
🧠 ANALYZING PROMPT...
🔍 SCANNING SECURITY...
✨ OPTIMIZING...
⚡ SIMULATING OUTPUT...
```

---

# 49. EMPTY STATES

Example:

```text
NO PROMPT YET.

Start typing your prompt
to unlock AI diagnostics.
```

---

# 50. ACCESSIBILITY

Minimum requirements:
- Keyboard navigation
- Visible focus states
- ARIA labels
- Color contrast
- Responsive text

---

# 51. RESPONSIVE DESIGN

## Desktop
Split Screen IDE.

## Tablet
Resizable panels.

## Mobile

```text
Challenge Brief
      ↓
Prompt Editor
      ↓
Diagnostics
      ↓
Output
```

---

# 52. MVP SCOPE

## Must Have

- Authentication
- Guest Mode
- Challenge System
- Prompt Editor
- Token Counter
- Variable Injector
- AI Grading
- XP System
- Streak System
- Basic Profile
- Settings
- Community Prompt Sharing

## Should Have

- Prompt Versioning
- Diff Checker
- Magic Optimize
- Output Simulation
- Leaderboards

## Later

- Advanced Analytics
- Prompt Marketplace
- Team Collaboration
- Prompt Collections
- AI Learning Paths
- Achievement Animations

---

# 53. IMPLEMENTATION ROADMAP

## PHASE 0 — PROJECT INITIALIZATION

### Goal
Create stable project foundation.

### Tasks
1. Initialize SvelteKit.
2. Enable TypeScript.
3. Install TailwindCSS.
4. Install Lucide Icons.
5. Configure environment variables.
6. Setup Supabase client.
7. Setup base project structure.
8. Create global Neo-Brutalism styles.

### Done Criteria
- Project runs.
- Tailwind works.
- Supabase client initializes.
- Environment variables load.
- Base UI works.

---

## PHASE 1 — DESIGN SYSTEM

### Goal
Build reusable UI primitives.

### Components
- Button
- Card
- Modal
- Badge
- Input
- Toggle
- Toast

### Done Criteria
- Components reusable.
- Neo-Brutalism consistent.
- Dark mode supported.
- Mobile responsive.

---

## PHASE 2 — DATABASE

### Tasks
1. Create Supabase project.
2. Run `schema.sql`.
3. Enable RLS.
4. Create policies.
5. Configure Auth providers.
6. Test profile trigger.

### Done Criteria
- User signup creates profile.
- Database tables work.
- Unauthorized access blocked.

---

## PHASE 3 — AUTHENTICATION

### Implement
- Google Login
- GitHub Login
- Magic Link
- Logout
- Guest Mode

### Done Criteria
- Login works.
- Logout works.
- Guest can complete 1 challenge.
- Progress migrates after login.

---

## PHASE 4 — APPLICATION SHELL

Create:
- Header
- Navigation
- Footer
- Settings Modal
- XP Counter
- Streak Badge

### Done Criteria
- Navigation functional.
- Settings persist.
- Footer attribution visible.

---

## PHASE 5 — CHALLENGE ENGINE

Implement:
- Challenge List
- Track Filter
- Difficulty Filter
- Challenge Detail
- Challenge Workspace

Seed:
- Developer Track: 5 challenges
- Data Track: 5 challenges
- Security Track: 5 challenges

### Done Criteria
- Challenges load from Supabase.
- Filters work.
- Challenge opens workspace.

---

## PHASE 6 — PROMPT WORKSPACE

Implement:
- Split Screen
- Challenge Brief
- Prompt Editor
- Token Counter
- Variable Injector

### Done Criteria
- User writes prompt.
- Token count updates.
- Variables insert correctly.

---

## PHASE 7 — GEMINI GRADING

Create:

`POST /api/ai/grade`

Implement:
- Input Validation
- Gemini Request
- JSON Parsing
- Response Validation
- Error Handling

### Done Criteria
- Prompt receives score.
- All 4 scores appear.
- Recommendations appear.
- Security scan works.

---

## PHASE 8 — GAMIFICATION

Implement:
- XP Rewards
- Challenge Completion
- Daily Streak
- Badges

### Done Criteria
- XP saved.
- Streak updates.
- Badge unlock works.

---

## PHASE 9 — PROMPT VERSIONING

Implement:
- Save Version
- Restore Version
- Compare Versions
- Diff Viewer

### Done Criteria
- Versions saved.
- Diff accurate.
- Restore works.

---

## PHASE 10 — MAGIC OPTIMIZE

Create:

`POST /api/ai/optimize`

Flow:

```text
Prompt
   ↓
Analyze
   ↓
Optimize
   ↓
Show Diff
```

### Done Criteria
- Original preserved.
- Optimized version generated.
- User controls replacement.

---

## PHASE 11 — OUTPUT SIMULATION

Create:

`POST /api/ai/simulate`

### Done Criteria
- User output generated.
- Ideal output generated.
- Comparison visible.

---

## PHASE 12 — COMMUNITY HUB

Implement:
- Publish Prompt
- Browse Prompts
- Search
- Star
- Fork

### Done Criteria
- Public prompts visible.
- Star works.
- Fork creates workspace copy.

---

## PHASE 13 — LEADERBOARD

Ranking:
- Total XP

Views:
- Global
- Weekly
- Monthly

### Done Criteria
- Rankings correct.
- Current user highlighted.

---

## PHASE 14 — POLISH

Tasks:
- Loading States
- Error States
- Empty States
- Sound Effects
- Animations
- Mobile UI
- Accessibility

---

## PHASE 15 — SECURITY

Implement:
- Input Validation
- Rate Limiting
- RLS Validation
- API Key Protection
- Server-side Gemini Calls

Never:
- Expose Gemini Server Key.
- Trust client-side score.
- Allow unrestricted database writes.

---

## PHASE 16 — DEPLOYMENT

Steps:
1. Push repository to GitHub.
2. Connect repository to Vercel.
3. Configure environment variables.
4. Configure Supabase production URL.
5. Test OAuth callback URLs.
6. Deploy.
7. Test production.

---

# 54. AI AGENT IMPLEMENTATION RULES

For AntiGravity IDE AI Agent:

```text
RULE 1:
Do not implement all features at once.

RULE 2:
Complete one phase before starting the next.

RULE 3:
Do not rewrite working files unnecessarily.

RULE 4:
Use TypeScript strictly.

RULE 5:
Reuse existing components.

RULE 6:
Avoid unnecessary dependencies.

RULE 7:
Keep components small.

RULE 8:
Never expose API secrets.

RULE 9:
Validate AI responses.

RULE 10:
Test before proceeding.
```

---

# 55. AI AGENT TASK FORMAT

Every implementation task should follow:

```text
GOAL

FILES TO MODIFY

IMPLEMENTATION

VALIDATION

DONE CRITERIA
```

Example:

```text
GOAL:
Create NeoButton component.

FILES:
src/lib/components/ui/Button.svelte

IMPLEMENTATION:
Create reusable button with:
- variant
- size
- disabled state
- Neo-Brutalist shadow

VALIDATION:
npm run check

DONE CRITERIA:
Button renders correctly.
```

---

# 56. DEVELOPMENT PRIORITY

## P0
- Project Setup
- Database
- Authentication
- Design System
- Challenge System
- Prompt Workspace
- AI Grading

## P1
- XP
- Streak
- Profile
- Settings
- Versioning
- Magic Optimize

## P2
- Community
- Leaderboards
- Output Simulation
- Sound Effects

---

# 57. SUCCESS METRICS

Track:
- Daily Active Users
- Challenges Completed
- Average Prompt Score
- Average Session Duration
- Returning Users
- Daily Streak Retention
- Community Prompts Created

---

# 58. FINAL USER JOURNEY

```text
LANDING PAGE
      ↓
TRY AS GUEST
      ↓
SELECT CHALLENGE
      ↓
READ BRIEF
      ↓
WRITE PROMPT
      ↓
RUN AI GRADING
      ↓
VIEW SCORE
      ↓
FIX PROMPT
      ↓
IMPROVE SCORE
      ↓
EARN XP
      ↓
BUILD STREAK
      ↓
UNLOCK BADGES
      ↓
SHARE WITH COMMUNITY
```

---

# 59. FINAL PRODUCT PRINCIPLE

Promptiqa should feel:

```text
PLAYFUL
BUT
PROFESSIONAL

EDUCATIONAL
BUT
NOT BORING

TECHNICAL
BUT
BEGINNER FRIENDLY

GAMIFIED
BUT
NOT CHILDISH

BRUTAL
BUT
BEAUTIFUL
```

---

# END OF PRD

**Promptiqa © 2026 — Designed & Built by Muhammad Akbar Pamungkas**
