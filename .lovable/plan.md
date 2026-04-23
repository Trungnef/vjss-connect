
# VJSS 2026 — Vietnam–Japan Semiconductor Symposium Platform

A trilingual (EN / VI / JA) academic conference platform combining a public marketing site, full author/reviewer/chair submission system, admin back-office, and an AI assistant. Built on Lovable Cloud now, designed to be portable to the university's self-hosted Supabase later.

## 1. Design language

- **Mood**: professional, academic, international. Clean editorial layout inspired by IEEE / Nature conference sites, warmed by a subtle Vietnam–Japan visual motif (red + indigo accents on neutral background, thin gold dividers).
- **Typography**: serif display (Source Serif / Noto Serif JP) for headings, Inter / Noto Sans JP for body — trilingual-safe.
- **Palette**: ivory background, deep navy primary, semiconductor-blue accent, Vietnamese red + Japanese indigo as secondary accents, subtle silicon-wafer micro-pattern in hero.
- **Components**: shadcn/ui, generous whitespace, restrained motion (fade + slight rise on scroll), no flashy gradients.

## 2. Internationalization (3 languages: EN / VI / JA)

- Default EN, language switcher persists in URL (`/en/...`, `/vi/...`, `/ja/...`) and localStorage.
- `i18next` with namespace per route; structured CMS content stored as `{en, vi, ja}` JSONB columns so admins translate inline.
- Date/time localized; speaker names kept in original script with optional romanization.

## 3. Public website (separate routes — not hash anchors)

| Route | Purpose |
|---|---|
| `/` Home | Hero (title, dates, venue, two CTAs: Submit / Register), key stats, welcome message from chair, featured speakers carousel, program highlights, sponsor strip, partner logos. Light scroll storytelling. |
| `/about` | Vision, mission, scope, VN–JP collaboration context, history continuity from VJSS 2025, committees (steering, program, organizing) with avatars. |
| `/program` | Timeline + day/track filters, session detail drawer, status badge (Draft/Updated/Final), "Download PDF program" button, add-to-calendar (.ics). |
| `/speakers` | Card grid with filters (keynote / invited / panel, country, affiliation). Click → `/speakers/$slug` bio page with talk abstract, photo, affiliation, social links. |
| `/venue` | Address, embedded interactive map, transport guide (from Hanoi/Tokyo airports, train, taxi), nearby hotels with booking links, trilingual practical tips. |
| `/organizers` | Tiered groups: Organizers · Co-organizers · Patrons · Academic Partners — logo wall with tooltips and links. |
| `/sponsors` | Tiered (Platinum / Gold / Silver / Bronze / Supporter) with banners, descriptions, outbound links. "Become a sponsor" CTA → prospectus PDF + contact form. |
| `/call-for-papers` | Topics, important dates, submission guidelines, templates (LaTeX/Word), policies, ethics. |
| `/registration` | Fee tiers, what's included, deadlines, payment instructions (bank transfer / on-site), FAQ. |
| `/news` | Announcements feed (admin-managed). |
| `/contact` | Form + official email, social, secretariat info. |
| Footer | Privacy, Terms, Copyright, sitemap, language switch. |

Each route ships its own `head()` metadata (title, description, og:title, og:description, og:image where a hero image exists) for SEO and social sharing.

## 4. VJSS 2025 content reuse map

Explicit per-section verdict for the team:

| Item from vjsemiconductor.vanj.jp | Action |
|---|---|
| Conference name, VN–JP framing, mission language | **Rewrite & elevate** for 2026 — keep spirit, sharpen academic tone, add scope statement |
| 2025 speaker list & photos | **Archive page** `/archive/2025`; do not surface as 2026 speakers |
| 2025 schedule | **Archive only**, used as template structure for 2026 program |
| Organizer / co-organizer / partner / patron logos | **Reuse as-is** unless org confirms changes; CMS-editable |
| Venue details | **Update for 2026 location** (assumed new); structure reusable |
| Sponsor tier structure | **Reuse structure**, refresh logos when 2026 sponsors confirmed |
| Visual identity | **Redesign** — VJSS 2025 site is functional but dated; 2026 needs upscale academic look |
| Information architecture | **Redesign** — flat hash-anchor SPA → multi-route, SEO-friendly, CMS-driven |

## 5. Author portal (`/author/*`)

Authentication: email/password + Google sign-in (Lovable Cloud auth).

- **Dashboard**: list of my submissions with status pipeline (Draft → Submitted → Under Review → Revision Requested → Accepted/Rejected → Camera-Ready Submitted).
- **New submission wizard** (multi-step, autosave):
  1. Track & topic selection
  2. Title + abstract (with character counter, plain text + LaTeX math)
  3. Authors & affiliations (add multiple, mark corresponding author, ORCID optional)
  4. Keywords, conflicts of interest, ethics declarations
  5. Manuscript file upload (PDF, optional supplementary zip)
  6. Review & submit
- **Revisions**: upload revised manuscript + response-to-reviewers letter.
- **Camera-ready**: final PDF + copyright form upload.
- Email notifications on every state change.

Workflow inspired by TACT 2025 — re-modeled for VJSS, not copied.

## 6. Reviewer portal (`/reviewer/*`)

- Invitations inbox (Accept / Decline with reason).
- Assigned papers with blinded PDF viewer.
- Review form: rubric scores (originality, technical quality, clarity, relevance, significance — 1–5), confidential comments to chair, comments to authors, recommendation (Accept / Minor / Major / Reject).
- Deadline reminders.

## 7. Chair / Program-committee portal (`/chair/*`)

- Submission inbox with filters (track, status, score).
- Reviewer assignment UI (suggest by topic match, manual pick, bulk invite).
- Aggregate scores & reviews per paper.
- Decision letter composer with templates → triggers author notification.
- Conflict-of-interest auto-flagging (same affiliation as author).

## 8. Admin area (`/admin/*`)

Role: `admin` (separate `user_roles` table; `has_role()` SECURITY DEFINER pattern).

- **Content CMS**: edit every public page section in EN/VI/JA inline; manage news posts.
- **Speakers**: CRUD with photo upload, ordering, featured flag.
- **Program**: day/session/talk builder, drag-to-reorder, publish workflow.
- **Organizations**: organizers / partners / sponsors with logo upload, tier, link.
- **Submissions overview**: full pipeline view, export CSV/Excel of submissions, authors, reviews.
- **Users & roles**: invite reviewers/chairs, assign roles.
- **Site settings**: dates, venue, registration fees, feature flags per language.
- **Audit log** of admin actions.

## 9. AI Chatbot (Phase 1, hybrid RAG + submission guide)

- Floating launcher on every public page; full-screen on mobile.
- **RAG knowledge base**: nightly ingest of all CMS content (about, program, speakers, venue, CFP, FAQ, policies) into `pgvector` embeddings; trilingual chunks.
- **Submission assistant mode**: when an authenticated author opens it inside `/author/*`, system prompt switches to step-by-step guidance referencing their current draft state (e.g. "you're missing the corresponding author").
- Lovable AI Gateway, default `google/gemini-3-flash-preview`, streaming SSE via edge function.
- Always shows source citations (which page/section answer came from).
- Language auto-detected from user message; admin can review chat logs and add Q&A overrides.

## 10. Data model (high level)

`profiles`, `user_roles`, `submissions`, `submission_authors`, `submission_files`, `reviews`, `review_assignments`, `decisions`, `tracks`, `sessions`, `talks`, `speakers`, `organizations` (typed: organizer/partner/sponsor/patron with tier), `news_posts`, `pages` (i18n JSONB blocks), `chat_conversations`, `chat_messages`, `kb_chunks` (with `vector` embedding), `audit_log`. RLS on every table; storage buckets `manuscripts` (private), `speaker-photos`, `org-logos`, `program-pdfs` (public).

## 11. Self-hosting handover

Built on Lovable Cloud (Supabase) so the university can later export schema + storage and run the same stack on their own Supabase instance. Plan ships with: SQL migration files, `.env.example`, README for self-hosting, and notes on which features map 1:1 (auth, RLS, storage, edge functions) vs. require swap (Lovable AI Gateway → bring-your-own OpenAI/Gemini key).

## 12. Phase 1 scope (this build)

Everything above **except**: live payment processing (manual bank transfer instructions only), mobile native apps, on-site check-in/QR badges, livestream integration. These are flagged as Phase 2.

## 13. Build order

1. Foundation: design system, i18n, layout shell, auth, roles
2. Public site routes with CMS-backed content + VJSS 2025 archive import stub
3. Admin CMS for pages, speakers, program, organizations, sponsors
4. Author portal + submission wizard + storage
5. Reviewer + Chair portals + decision workflow
6. AI chatbot (RAG ingest + hybrid assistant)
7. Polish, SEO meta per route, accessibility pass, self-hosting docs
