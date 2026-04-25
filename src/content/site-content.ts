export type Locale = "en" | "vi" | "ja";

export type LocalizedText = Record<Locale, string>;
export type MaybeLocalizedText = LocalizedText | string;

export type SessionStatus = "draft" | "updated" | "final";

type SpeakerKind = "government" | "academia" | "industry";

const L = (en: string, vi: string, ja: string): LocalizedText => ({
  en,
  vi,
  ja,
});

const S = (value: string): LocalizedText => L(value, value, value);

export function resolveLocale(language?: string | null): Locale {
  const normalized = language?.split("-")[0];

  if (normalized === "vi" || normalized === "ja") {
    return normalized;
  }

  return "en";
}

export function pickLocalized(locale: Locale, value: MaybeLocalizedText) {
  return typeof value === "string" ? value : value[locale];
}

const makePlaceholderImage = (name: string, background: string) => {
  const initials = name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="960" height="720" viewBox="0 0 960 720" role="img" aria-label="${name}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="960" height="720" fill="url(#g)" />
      <circle cx="480" cy="250" r="120" fill="rgba(255,255,255,0.12)" />
      <circle cx="480" cy="250" r="92" fill="rgba(255,255,255,0.18)" />
      <text
        x="480"
        y="275"
        fill="#ffffff"
        text-anchor="middle"
        font-size="84"
        font-weight="700"
        font-family="Georgia, 'Times New Roman', serif"
      >
        ${initials}
      </text>
      <text
        x="480"
        y="470"
        fill="#ffffff"
        text-anchor="middle"
        font-size="42"
        font-weight="600"
        font-family="Georgia, 'Times New Roman', serif"
      >
        ${name}
      </text>
      <text
        x="480"
        y="520"
        fill="rgba(255,255,255,0.82)"
        text-anchor="middle"
        font-size="24"
        font-family="Arial, sans-serif"
      >
        VJSS 2026
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

type ProgramSession = {
  id: string;
  day: LocalizedText;
  date: MaybeLocalizedText;
  time: string;
  title: MaybeLocalizedText;
  themeId: string;
  theme: LocalizedText;
  status: SessionStatus;
  chairs: string[];
  summary: LocalizedText;
  speakerIds: string[];
};

type ProgramArchitectureItem = {
  title: LocalizedText;
  description: LocalizedText;
  audience: LocalizedText;
};

type TechnicalTheme = {
  name: LocalizedText;
  scope: LocalizedText;
  chairs: string[];
};

type TimelineItem = {
  period: string;
  milestones: LocalizedText;
  owner: LocalizedText;
  output: LocalizedText;
};

type OrganizationItem = {
  name: string;
  meta?: MaybeLocalizedText;
  description: LocalizedText;
  link?: string;
};

type OrganizationGroup = {
  id: string;
  title: LocalizedText;
  items: OrganizationItem[];
};

type CommitteeMember = {
  name: string;
  role: MaybeLocalizedText;
  affiliation: MaybeLocalizedText;
  status: MaybeLocalizedText;
};

type CommitteeGroup = {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  members: CommitteeMember[];
};

type SponsorRoute = {
  goal: LocalizedText;
  engagement: LocalizedText;
};

type SponsorTier = {
  name: MaybeLocalizedText;
  amount: MaybeLocalizedText;
  contributionModel: LocalizedText;
  benefits: LocalizedText[];
};

type CardCopy = {
  title: LocalizedText;
  body: LocalizedText;
};

type ContactEntry = {
  label: LocalizedText;
  value: MaybeLocalizedText;
  detail: LocalizedText;
  emails?: string[];
};

type NewsItem = {
  date: MaybeLocalizedText;
  status: SessionStatus;
  title: LocalizedText;
  body: LocalizedText;
};

export const conferenceIdentity = {
  shortName: "VJSS 2026",
  fullName: L(
    "Vietnam-Japan Semiconductor Symposium 2026",
    "Há»™i nghá»‹ BÃ¡n dáº«n Viá»‡t Nam - Nháº­t Báº£n 2026",
    "Vietnam-Japan Semiconductor Symposium 2026",
  ),
  heroEyebrow: L(
    "Partner, sponsor and invited speaker proposal",
    "Äá» xuáº¥t gá»­i Ä‘á»‘i tÃ¡c, nhÃ  tÃ i trá»£ vÃ  diá»…n giáº£ má»i",
    "Partner, sponsor and invited speaker proposal",
  ),
  tagline: L(
    "A four-day forum linking research, education, industry and public-sector cooperation between Vietnam and Japan.",
    "Diá»…n Ä‘Ã n kÃ©o dÃ i bá»‘n ngÃ y káº¿t ná»‘i nghiÃªn cá»©u, Ä‘Ã o táº¡o, cÃ´ng nghiá»‡p vÃ  há»£p tÃ¡c cÃ´ng giá»¯a Viá»‡t Nam vÃ  Nháº­t Báº£n.",
    "A four-day forum linking research, education, industry and public-sector cooperation between Vietnam and Japan.",
  ),
  dates: L("September 20-23, 2026", "20-23 thÃ¡ng 9, 2026", "September 20-23, 2026"),
  venue: L("Hanoi, Vietnam", "HÃ  Ná»™i, Viá»‡t Nam", "Hanoi, Vietnam"),
  format: L(
    "In-person conference with hybrid participation",
    "Há»™i nghá»‹ trá»±c tiáº¿p káº¿t há»£p tham dá»± hybrid",
    "In-person conference with hybrid participation",
  ),
  referenceNote: L(
    "Prepared from the April 2026 conference plan and committee/program workbook.",
    "Ná»™i dung Ä‘Æ°á»£c tá»•ng há»£p tá»« conference plan vÃ  workbook committee/program cáº­p nháº­t thÃ¡ng 4/2026.",
    "Prepared from the April 2026 conference plan and committee/program workbook.",
  ),
  referenceEvent: {
    date: S("April 2026 working draft"),
    venue: "Hanoi planning package and committee workbook",
    mapUrl: "https://maps.google.com/?q=Hanoi+Vietnam",
  },
};

export const homeMetrics = [
  {
    value: "150+",
    label: L("target participants", "Ä‘áº¡i biá»ƒu má»¥c tiÃªu", "target participants"),
  },
  {
    value: "7",
    label: L("technical themes", "chá»§ Ä‘á» ká»¹ thuáº­t", "technical themes"),
  },
  {
    value: "4",
    label: L("event days", "ngÃ y sá»± kiá»‡n", "event days"),
  },
  {
    value: "2",
    label: L("candidate venues", "phÆ°Æ¡ng Ã¡n Ä‘á»‹a Ä‘iá»ƒm", "candidate venues"),
  },
];

export const homeWelcome = {
  title: L("Executive summary", "TÃ³m táº¯t Ä‘iá»u hÃ nh", "Executive summary"),
  body: L(
    "VJSS 2026 is designed as a high-impact forum linking research, education, industry and public-sector cooperation between Vietnam and Japan. The Hanoi edition combines scientific sessions, plenary and invited talks, student-oriented lectures, career and study-abroad exchange, industry-policy dialogue, networking, and site visits.",
    "VJSS 2026 Ä‘Æ°á»£c thiáº¿t káº¿ nhÆ° má»™t diá»…n Ä‘Ã n cÃ³ tÃ¡c Ä‘á»™ng cao, káº¿t ná»‘i nghiÃªn cá»©u, giÃ¡o dá»¥c, cÃ´ng nghiá»‡p vÃ  há»£p tÃ¡c cÃ´ng giá»¯a Viá»‡t Nam vÃ  Nháº­t Báº£n. PhiÃªn báº£n táº¡i HÃ  Ná»™i káº¿t há»£p cÃ¡c phiÃªn khoa há»c, bÃ¡o cÃ¡o plenary vÃ  invited, bÃ i giáº£ng hÆ°á»›ng tá»›i sinh viÃªn, trao Ä‘á»•i nghá» nghiá»‡p vÃ  du há»c, Ä‘á»‘i thoáº¡i chÃ­nh sÃ¡ch - cÃ´ng nghiá»‡p, networking vÃ  cÃ¡c chuyáº¿n thÄƒm thá»±c Ä‘á»‹a.",
    "VJSS 2026 is designed as a high-impact forum linking research, education, industry and public-sector cooperation between Vietnam and Japan. The Hanoi edition combines scientific sessions, plenary and invited talks, student-oriented lectures, career and study-abroad exchange, industry-policy dialogue, networking, and site visits.",
  ),
  signature: L(
    "Prepared for outreach in April 2026",
    "Báº£n phá»¥c vá»¥ outreach thÃ¡ng 4/2026",
    "Prepared for outreach in April 2026",
  ),
};

export const homeHighlights = [
  {
    title: L(
      "Research exchange with implementation paths",
      "Trao Ä‘á»•i nghiÃªn cá»©u gáº¯n vá»›i kháº£ nÄƒng triá»ƒn khai",
      "Research exchange with implementation paths",
    ),
    body: L(
      "The symposium is positioned as a practical bridge between research excellence and implementation through talks, panels, site visits and partner meetings.",
      "Há»™i nghá»‹ Ä‘Æ°á»£c Ä‘á»‹nh vá»‹ nhÆ° má»™t cÃ¢y cáº§u thá»±c tiá»…n giá»¯a xuáº¥t sáº¯c nghiÃªn cá»©u vÃ  triá»ƒn khai thÃ´ng qua cÃ¡c bÃ i trÃ¬nh bÃ y, panel, chuyáº¿n thÄƒm thá»±c Ä‘á»‹a vÃ  cÃ¡c buá»•i gáº·p gá»¡ Ä‘á»‘i tÃ¡c.",
      "The symposium is positioned as a practical bridge between research excellence and implementation through talks, panels, site visits and partner meetings.",
    ),
  },
  {
    title: L(
      "Talent pipeline across lecture, career and industry sessions",
      "DÃ²ng cháº£y nhÃ¢n lá»±c xuyÃªn suá»‘t tá»« bÃ i giáº£ng, Ä‘á»‹nh hÆ°á»›ng nghá» nghiá»‡p Ä‘áº¿n káº¿t ná»‘i doanh nghiá»‡p",
      "Talent pipeline across lecture, career and industry sessions",
    ),
    body: L(
      "Student-facing lectures, study-abroad exchange and workforce dialogue are built into the core schedule rather than treated as side events.",
      "CÃ¡c bÃ i giáº£ng cho sinh viÃªn, trao Ä‘á»•i du há»c vÃ  Ä‘á»‘i thoáº¡i vá» nguá»“n nhÃ¢n lá»±c Ä‘Æ°á»£c Ä‘áº·t trong lá»‹ch chÃ­nh thay vÃ¬ bá»‹ Ä‘áº©y thÃ nh hoáº¡t Ä‘á»™ng bÃªn lá».",
      "Student-facing lectures, study-abroad exchange and workforce dialogue are built into the core schedule rather than treated as side events.",
    ),
  },
  {
    title: L(
      "Seven technical themes already mapped",
      "Báº£y chá»§ Ä‘á» ká»¹ thuáº­t Ä‘Ã£ Ä‘Æ°á»£c xÃ¡c láº­p",
      "Seven technical themes already mapped",
    ),
    body: L(
      "The working program already defines seven technical themes spanning IC design, optoelectronics, materials, packaging, AI and quantum, emerging devices, and human-resource development.",
      "Báº£n chÆ°Æ¡ng trÃ¬nh lÃ m viá»‡c Ä‘Ã£ xÃ¡c láº­p báº£y chá»§ Ä‘á» ká»¹ thuáº­t bao trÃ¹m thiáº¿t káº¿ vi máº¡ch, quang Ä‘iá»‡n tá»­, váº­t liá»‡u, Ä‘Ã³ng gÃ³i, AI vÃ  lÆ°á»£ng tá»­, cÃ´ng nghá»‡ má»›i ná»•i vÃ  phÃ¡t triá»ƒn nguá»“n nhÃ¢n lá»±c.",
      "The working program already defines seven technical themes spanning IC design, optoelectronics, materials, packaging, AI and quantum, emerging devices, and human-resource development.",
    ),
  },
  {
    title: L(
      "Partnership structure beyond logo exposure",
      "Cáº¥u trÃºc há»£p tÃ¡c vÆ°á»£t ra ngoÃ i viá»‡c gáº¯n logo",
      "Partnership structure beyond logo exposure",
    ),
    body: L(
      "The sponsorship model is framed around talent access, research collaboration, thought leadership, policy dialogue and measurable post-event deliverables.",
      "MÃ´ hÃ¬nh tÃ i trá»£ Ä‘Æ°á»£c xÃ¢y dá»±ng xoay quanh tiáº¿p cáº­n nhÃ¢n lá»±c, há»£p tÃ¡c nghiÃªn cá»©u, vai trÃ² dáº«n dáº¯t chuyÃªn mÃ´n, Ä‘á»‘i thoáº¡i chÃ­nh sÃ¡ch vÃ  cÃ¡c deliverable cÃ³ thá»ƒ Ä‘o lÆ°á»ng sau sá»± kiá»‡n.",
      "The sponsorship model is framed around talent access, research collaboration, thought leadership, policy dialogue and measurable post-event deliverables.",
    ),
  },
];

export const homeProgramDays = [
  {
    day: L("Day 1", "NgÃ y 1", "Day 1"),
    date: S("Sep 20"),
    title: L(
      "Lecture, orientation and opening sessions",
      "BÃ i giáº£ng, Ä‘á»‹nh hÆ°á»›ng vÃ  phiÃªn khai máº¡c",
      "Lecture, orientation and opening sessions",
    ),
    items: [
      L(
        "Lecture session for students and early-career researchers",
        "PhiÃªn bÃ i giáº£ng cho sinh viÃªn vÃ  nhÃ  nghiÃªn cá»©u tráº»",
        "Lecture session for students and early-career researchers",
      ),
      L(
        "Study-abroad and job orientation with academia and industry representatives",
        "Äá»‹nh hÆ°á»›ng du há»c vÃ  nghá» nghiá»‡p vá»›i Ä‘áº¡i diá»‡n há»c thuáº­t vÃ  doanh nghiá»‡p",
        "Study-abroad and job orientation with academia and industry representatives",
      ),
      L(
        "Opening ceremony, plenary session 1 and parallel session 1",
        "Khai máº¡c, plenary session 1 vÃ  parallel session 1",
        "Opening ceremony, plenary session 1 and parallel session 1",
      ),
      L(
        "Welcome reception and networking",
        "Welcome reception vÃ  networking",
        "Welcome reception and networking",
      ),
    ],
  },
  {
    day: L("Day 2", "NgÃ y 2", "Day 2"),
    date: S("Sep 21"),
    title: L(
      "Plenary, poster and technical tracks",
      "Plenary, poster vÃ  cÃ¡c track ká»¹ thuáº­t",
      "Plenary, poster and technical tracks",
    ),
    items: [
      L(
        "Plenary session 2 and parallel session 2",
        "Plenary session 2 vÃ  parallel session 2",
        "Plenary session 2 and parallel session 2",
      ),
      L(
        "Plenary session 3 or poster session under discussion",
        "Plenary session 3 hoáº·c poster session Ä‘ang Ä‘Æ°á»£c chá»‘t",
        "Plenary session 3 or poster session under discussion",
      ),
      L(
        "Parallel session 3 across thematic tracks",
        "Parallel session 3 theo cÃ¡c track chá»§ Ä‘á»",
        "Parallel session 3 across thematic tracks",
      ),
      L("Closing and banquet", "Báº¿ máº¡c vÃ  banquet", "Closing and banquet"),
    ],
  },
  {
    day: L("Day 3", "NgÃ y 3", "Day 3"),
    date: S("Sep 22"),
    title: L("Site visits", "CÃ¡c chuyáº¿n thÄƒm thá»±c Ä‘á»‹a", "Site visits"),
    items: [
      L(
        "Visits to local semiconductor-related facilities and laboratories",
        "ThÄƒm cÃ¡c cÆ¡ sá»Ÿ vÃ  phÃ²ng thÃ­ nghiá»‡m liÃªn quan Ä‘áº¿n bÃ¡n dáº«n táº¡i Ä‘á»‹a phÆ°Æ¡ng",
        "Visits to local semiconductor-related facilities and laboratories",
      ),
      L(
        "Innovation-center and ecosystem partner meetings",
        "LÃ m viá»‡c vá»›i trung tÃ¢m Ä‘á»•i má»›i sÃ¡ng táº¡o vÃ  Ä‘á»‘i tÃ¡c há»‡ sinh thÃ¡i",
        "Innovation-center and ecosystem partner meetings",
      ),
    ],
  },
  {
    day: L("Day 4", "NgÃ y 4", "Day 4"),
    date: S("Sep 23"),
    title: L(
      "NEXUS session and follow-up visits",
      "NEXUS session vÃ  cÃ¡c cuá»™c lÃ m viá»‡c ná»‘i tiáº¿p",
      "NEXUS session and follow-up visits",
    ),
    items: [
      L(
        "Dedicated JST NEXUS session for bilateral collaboration discussions",
        "PhiÃªn JST NEXUS chuyÃªn biá»‡t cho tháº£o luáº­n há»£p tÃ¡c song phÆ°Æ¡ng",
        "Dedicated JST NEXUS session for bilateral collaboration discussions",
      ),
      L(
        "Institutional meetings and follow-up collaboration visits",
        "CÃ¡c cuá»™c há»p thá»ƒ cháº¿ vÃ  cÃ¡c chuyáº¿n lÃ m viá»‡c tiáº¿p ná»‘i há»£p tÃ¡c",
        "Institutional meetings and follow-up collaboration visits",
      ),
    ],
  },
];

export const homeImportantDates = [
  {
    label: L("April 2026", "ThÃ¡ng 4/2026", "April 2026"),
    value: L(
      "Organizing structure, outreach draft and venue shortlist",
      "Chá»‘t khung tá»• chá»©c, báº£n outreach vÃ  shortlist Ä‘á»‹a Ä‘iá»ƒm",
      "Organizing structure, outreach draft and venue shortlist",
    ),
  },
  {
    label: L("May 2026", "ThÃ¡ng 5/2026", "May 2026"),
    value: L(
      "Sponsor outreach, speaker invitations and track confirmation",
      "Outreach nhÃ  tÃ i trá»£, gá»­i thÆ° má»i diá»…n giáº£ vÃ  xÃ¡c nháº­n track",
      "Sponsor outreach, speaker invitations and track confirmation",
    ),
  },
  {
    label: L("June 2026", "ThÃ¡ng 6/2026", "June 2026"),
    value: L(
      "Open abstract and contributed-talk process",
      "Má»Ÿ quy trÃ¬nh nháº­n abstract vÃ  contributed talk",
      "Open abstract and contributed-talk process",
    ),
  },
  {
    label: L("July 2026", "ThÃ¡ng 7/2026", "July 2026"),
    value: L(
      "Review submissions and finalize keynote and plenary shortlist",
      "RÃ  soÃ¡t bÃ i gá»­i vÃ  chá»‘t shortlist keynote, plenary",
      "Review submissions and finalize keynote and plenary shortlist",
    ),
  },
  {
    label: L("August 2026", "ThÃ¡ng 8/2026", "August 2026"),
    value: L(
      "Publish tentative program and registration updates",
      "CÃ´ng bá»‘ chÆ°Æ¡ng trÃ¬nh dá»± kiáº¿n vÃ  cáº­p nháº­t Ä‘Äƒng kÃ½",
      "Publish tentative program and registration updates",
    ),
  },
  {
    label: L("September 20-23", "20-23/9", "September 20-23"),
    value: L(
      "Symposium delivery in Hanoi",
      "Tá»• chá»©c há»™i nghá»‹ táº¡i HÃ  Ná»™i",
      "Symposium delivery in Hanoi",
    ),
  },
];

export const homePartnerNames = [
  "Vietnam Japan University",
  "AVIJ",
  "VANJ",
  "JST",
  "NIC Vietnam",
  "Sony Semiconductors",
];

export const pageCopy = {
  about: {
    title: L("About VJSS 2026", "Giá»›i thiá»‡u VJSS 2026", "About VJSS 2026"),
    intro: L(
      "VJSS 2026 is positioned as a practical Vietnam-Japan platform for semiconductor research exchange, talent development, ecosystem building and long-term bilateral cooperation.",
      "VJSS 2026 Ä‘Æ°á»£c Ä‘á»‹nh vá»‹ lÃ  má»™t ná»n táº£ng thá»±c tiá»…n Viá»‡t Nam - Nháº­t Báº£n cho trao Ä‘á»•i nghiÃªn cá»©u bÃ¡n dáº«n, phÃ¡t triá»ƒn nhÃ¢n lá»±c, xÃ¢y dá»±ng há»‡ sinh thÃ¡i vÃ  há»£p tÃ¡c song phÆ°Æ¡ng dÃ i háº¡n.",
      "VJSS 2026 is positioned as a practical Vietnam-Japan platform for semiconductor research exchange, talent development, ecosystem building and long-term bilateral cooperation.",
    ),
    visionTitle: L("Positioning", "Äá»‹nh vá»‹", "Positioning"),
    missionTitle: L("Conference design", "Thiáº¿t káº¿ há»™i nghá»‹", "Conference design"),
    objectiveTitle: L("Objectives", "Má»¥c tiÃªu", "Objectives"),
    vision: [
      L(
        "Build a high-impact forum linking research, education, industry and public-sector cooperation between Vietnam and Japan.",
        "XÃ¢y dá»±ng má»™t diá»…n Ä‘Ã n cÃ³ tÃ¡c Ä‘á»™ng cao káº¿t ná»‘i nghiÃªn cá»©u, giÃ¡o dá»¥c, cÃ´ng nghiá»‡p vÃ  há»£p tÃ¡c cÃ´ng giá»¯a Viá»‡t Nam vÃ  Nháº­t Báº£n.",
        "Build a high-impact forum linking research, education, industry and public-sector cooperation between Vietnam and Japan.",
      ),
      L(
        "Move from symbolic exchange toward concrete cooperation in joint research, workforce development and partner programs.",
        "Chuyá»ƒn tá»« giao lÆ°u mang tÃ­nh biá»ƒu tÆ°á»£ng sang há»£p tÃ¡c cá»¥ thá»ƒ trong nghiÃªn cá»©u chung, phÃ¡t triá»ƒn nguá»“n nhÃ¢n lá»±c vÃ  cÃ¡c chÆ°Æ¡ng trÃ¬nh Ä‘á»‘i tÃ¡c.",
        "Move from symbolic exchange toward concrete cooperation in joint research, workforce development and partner programs.",
      ),
    ],
    mission: [
      L(
        "Combine scientific sessions, invited talks, student-facing lectures, career exchange, policy dialogue, networking and site visits in one coherent program arc.",
        "Káº¿t há»£p cÃ¡c phiÃªn khoa há»c, invited talks, bÃ i giáº£ng hÆ°á»›ng tá»›i sinh viÃªn, trao Ä‘á»•i nghá» nghiá»‡p, Ä‘á»‘i thoáº¡i chÃ­nh sÃ¡ch, networking vÃ  site visits trong má»™t máº¡ch chÆ°Æ¡ng trÃ¬nh thá»‘ng nháº¥t.",
        "Combine scientific sessions, invited talks, student-facing lectures, career exchange, policy dialogue, networking and site visits in one coherent program arc.",
      ),
      L(
        "Use the symposium as a partner platform for semiconductor talent development, technology exchange and long-term Vietnam-Japan collaboration.",
        "Biáº¿n há»™i nghá»‹ thÃ nh má»™t ná»n táº£ng Ä‘á»‘i tÃ¡c cho phÃ¡t triá»ƒn nhÃ¢n lá»±c bÃ¡n dáº«n, trao Ä‘á»•i cÃ´ng nghá»‡ vÃ  há»£p tÃ¡c Viá»‡t Nam - Nháº­t Báº£n dÃ i háº¡n.",
        "Use the symposium as a partner platform for semiconductor talent development, technology exchange and long-term Vietnam-Japan collaboration.",
      ),
    ],
    objectives: [
      L(
        "Create a forum for Vietnam-Japan researchers to present advances and identify joint projects.",
        "Táº¡o diá»…n Ä‘Ã n Ä‘á»ƒ cÃ¡c nhÃ  nghiÃªn cá»©u Viá»‡t Nam - Nháº­t Báº£n trÃ¬nh bÃ y káº¿t quáº£ má»›i vÃ  xÃ¡c Ä‘á»‹nh cÃ¡c dá»± Ã¡n há»£p tÃ¡c.",
        "Create a forum for Vietnam-Japan researchers to present advances and identify joint projects.",
      ),
      L(
        "Offer lectures, career orientation and student-facing sessions to strengthen the semiconductor talent pipeline.",
        "Tá»• chá»©c cÃ¡c bÃ i giáº£ng, Ä‘á»‹nh hÆ°á»›ng nghá» nghiá»‡p vÃ  phiÃªn hÆ°á»›ng tá»›i sinh viÃªn Ä‘á»ƒ cá»§ng cá»‘ dÃ²ng cháº£y nhÃ¢n lá»±c bÃ¡n dáº«n.",
        "Offer lectures, career orientation and student-facing sessions to strengthen the semiconductor talent pipeline.",
      ),
      L(
        "Connect companies with universities, laboratories and young researchers through sessions, booths and networking.",
        "Káº¿t ná»‘i doanh nghiá»‡p vá»›i trÆ°á»ng Ä‘áº¡i há»c, phÃ²ng thÃ­ nghiá»‡m vÃ  nhÃ  nghiÃªn cá»©u tráº» thÃ´ng qua cÃ¡c phiÃªn tháº£o luáº­n, booth vÃ  networking.",
        "Connect companies with universities, laboratories and young researchers through sessions, booths and networking.",
      ),
      L(
        "Strengthen links among JST NEXUS teams and related Vietnam-Japan cooperation programs.",
        "TÄƒng cÆ°á»ng liÃªn káº¿t giá»¯a cÃ¡c nhÃ³m JST NEXUS vÃ  cÃ¡c chÆ°Æ¡ng trÃ¬nh há»£p tÃ¡c Viá»‡t Nam - Nháº­t Báº£n liÃªn quan.",
        "Strengthen links among JST NEXUS teams and related Vietnam-Japan cooperation programs.",
      ),
    ],
    contextTitle: L(
      "Why the timing matters",
      "VÃ¬ sao thá»i Ä‘iá»ƒm nÃ y quan trá»ng",
      "Why the timing matters",
    ),
    contextBody: L(
      "Semiconductors are foundational to AI, smart mobility, robotics, aerospace, advanced manufacturing and digital infrastructure. Japan brings deep research, manufacturing and industrial know-how, while Vietnam is rapidly building talent, policy momentum and ecosystem capacity.",
      "BÃ¡n dáº«n lÃ  ná»n táº£ng cá»§a AI, giao thÃ´ng thÃ´ng minh, robot, hÃ ng khÃ´ng vÅ© trá»¥, sáº£n xuáº¥t tiÃªn tiáº¿n vÃ  háº¡ táº§ng sá»‘. Nháº­t Báº£n cÃ³ chiá»u sÃ¢u vá» nghiÃªn cá»©u, sáº£n xuáº¥t vÃ  know-how cÃ´ng nghiá»‡p, trong khi Viá»‡t Nam Ä‘ang tÄƒng tá»‘c vá» nhÃ¢n lá»±c, Ä‘á»™ng lá»±c chÃ­nh sÃ¡ch vÃ  nÄƒng lá»±c há»‡ sinh thÃ¡i.",
      "Semiconductors are foundational to AI, smart mobility, robotics, aerospace, advanced manufacturing and digital infrastructure. Japan brings deep research, manufacturing and industrial know-how, while Vietnam is rapidly building talent, policy momentum and ecosystem capacity.",
    ),
    heritageTitle: L(
      "From Osaka 2025 to Hanoi 2026",
      "Tá»« Osaka 2025 Ä‘áº¿n HÃ  Ná»™i 2026",
      "From Osaka 2025 to Hanoi 2026",
    ),
    heritageBody: L(
      "The second edition builds directly on the first VJSS in Osaka. The 2026 plan keeps bilateral cooperation at the center, but expands the format with site visits, a dedicated NEXUS session, a fuller sponsorship structure and a stronger student-facing agenda.",
      "PhiÃªn báº£n thá»© hai káº¿ thá»«a trá»±c tiáº¿p tá»« ká»³ VJSS Ä‘áº§u tiÃªn táº¡i Osaka. Káº¿ hoáº¡ch 2026 váº«n giá»¯ há»£p tÃ¡c song phÆ°Æ¡ng á»Ÿ trung tÃ¢m, Ä‘á»“ng thá»i má»Ÿ rá»™ng Ä‘á»‹nh dáº¡ng vá»›i site visit, NEXUS session chuyÃªn biá»‡t, cáº¥u trÃºc tÃ i trá»£ Ä‘áº§y Ä‘á»§ hÆ¡n vÃ  chÆ°Æ¡ng trÃ¬nh hÆ°á»›ng tá»›i sinh viÃªn rÃµ nÃ©t hÆ¡n.",
      "The second edition builds directly on the first VJSS in Osaka. The 2026 plan keeps bilateral cooperation at the center, but expands the format with site visits, a dedicated NEXUS session, a fuller sponsorship structure and a stronger student-facing agenda.",
    ),
  },
  program: {
    title: L("Program and timeline", "ChÆ°Æ¡ng trÃ¬nh vÃ  lá»™ trÃ¬nh", "Program and timeline"),
    intro: L(
      "The current schedule is based on the April 19 working draft. Session times, poster format, site-visit hosts and some speaker assignments remain subject to program-committee confirmation.",
      "Lá»‹ch hiá»‡n táº¡i dá»±a trÃªn working draft ngÃ y 19/4. Thá»i lÆ°á»£ng tá»«ng phiÃªn, Ä‘á»‹nh dáº¡ng poster, Ä‘Æ¡n vá»‹ tiáº¿p Ä‘Ã³n site visit vÃ  má»™t sá»‘ phÃ¢n cÃ´ng diá»…n giáº£ váº«n chá» program committee xÃ¡c nháº­n.",
      "The current schedule is based on the April 19 working draft. Session times, poster format, site-visit hosts and some speaker assignments remain subject to program-committee confirmation.",
    ),
    legendTitle: L("Working status", "Tráº¡ng thÃ¡i lÃ m viá»‡c", "Working status"),
    architectureTitle: L(
      "Program architecture",
      "Kiáº¿n trÃºc chÆ°Æ¡ng trÃ¬nh",
      "Program architecture",
    ),
    architectureBody: L(
      "VJSS 2026 combines scientific exchange, student development, industry-policy dialogue and field engagement in one schedule.",
      "VJSS 2026 káº¿t há»£p trao Ä‘á»•i khoa há»c, phÃ¡t triá»ƒn sinh viÃªn, Ä‘á»‘i thoáº¡i cÃ´ng nghiá»‡p - chÃ­nh sÃ¡ch vÃ  káº¿t ná»‘i thá»±c Ä‘á»‹a trong cÃ¹ng má»™t lá»‹ch trÃ¬nh.",
      "VJSS 2026 combines scientific exchange, student development, industry-policy dialogue and field engagement in one schedule.",
    ),
    timelineTitle: L("Implementation timeline", "Timeline triá»ƒn khai", "Implementation timeline"),
    timelineBody: L(
      "The working timeline runs from April outreach and venue decisions through October reporting and partner follow-up.",
      "Timeline triá»ƒn khai kÃ©o dÃ i tá»« giai Ä‘oáº¡n outreach, quyáº¿t Ä‘á»‹nh Ä‘á»‹a Ä‘iá»ƒm trong thÃ¡ng 4 cho tá»›i bÃ¡o cÃ¡o sau sá»± kiá»‡n vÃ  follow-up Ä‘á»‘i tÃ¡c trong thÃ¡ng 10.",
      "The working timeline runs from April outreach and venue decisions through October reporting and partner follow-up.",
    ),
    noteTitle: L(
      "Critical decisions",
      "CÃ¡c quyáº¿t Ä‘á»‹nh cáº§n chá»‘t sá»›m",
      "Critical decisions",
    ),
    noteBody: L(
      "Venue, sponsorship model, invited-speaker confirmations, site-visit access, and language / recording support are the main dependencies in the current plan.",
      "Äá»‹a Ä‘iá»ƒm, mÃ´ hÃ¬nh tÃ i trá»£, xÃ¡c nháº­n diá»…n giáº£ má»i, quyá»n truy cáº­p site visit vÃ  há»— trá»£ ngÃ´n ngá»¯ / ghi hÃ¬nh lÃ  cÃ¡c phá»¥ thuá»™c lá»›n nháº¥t trong káº¿ hoáº¡ch hiá»‡n táº¡i.",
      "Venue, sponsorship model, invited-speaker confirmations, site-visit access, and language / recording support are the main dependencies in the current plan.",
    ),
  },
  speakers: {
    title: L(
      "Invited speakers and working roster",
      "Diá»…n giáº£ má»i vÃ  roster lÃ m viá»‡c",
      "Invited speakers and working roster",
    ),
    intro: L(
      "The current speaker directory consolidates confirmed chairs, scientific-committee members and named track contributors from the uploaded planning files.",
      "Danh má»¥c diá»…n giáº£ hiá»‡n táº¡i tá»•ng há»£p cÃ¡c chair, thÃ nh viÃªn scientific committee vÃ  nhá»¯ng ngÆ°á»i Ä‘Ã³ng gÃ³p theo track Ä‘Ã£ Ä‘Æ°á»£c nÃªu Ä‘Ã­ch danh trong cÃ¡c file káº¿ hoáº¡ch Ä‘Æ°á»£c táº£i lÃªn.",
      "The current speaker directory consolidates confirmed chairs, scientific-committee members and named track contributors from the uploaded planning files.",
    ),
  },
  venue: {
    title: L("Venue and logistics", "Äá»‹a Ä‘iá»ƒm vÃ  háº­u cáº§n", "Venue and logistics"),
    intro: L(
      "The host city is confirmed as Hanoi, while the final venue remains under review between a university-hosted option and a hotel-conference option.",
      "ThÃ nh phá»‘ tá»• chá»©c Ä‘Ã£ Ä‘Æ°á»£c xÃ¡c Ä‘á»‹nh lÃ  HÃ  Ná»™i, trong khi Ä‘á»‹a Ä‘iá»ƒm cuá»‘i cÃ¹ng váº«n Ä‘ang Ä‘Æ°á»£c cÃ¢n nháº¯c giá»¯a phÆ°Æ¡ng Ã¡n tá»• chá»©c táº¡i trÆ°á»ng Ä‘áº¡i há»c vÃ  phÆ°Æ¡ng Ã¡n khÃ¡ch sáº¡n - há»™i nghá»‹.",
      "The host city is confirmed as Hanoi, while the final venue remains under review between a university-hosted option and a hotel-conference option.",
    ),
    nextTitle: L(
      "Venue decision status",
      "TÃ¬nh tráº¡ng quyáº¿t Ä‘á»‹nh Ä‘á»‹a Ä‘iá»ƒm",
      "Venue decision status",
    ),
    nextBody: L(
      "The organizing committee is comparing VNU-VJU University and Sheraton Hanoi West Hotel against budget, sponsor support and operational fit.",
      "Ban tá»• chá»©c Ä‘ang so sÃ¡nh VNU-VJU University vÃ  Sheraton Hanoi West Hotel theo cÃ¡c tiÃªu chÃ­ ngÃ¢n sÃ¡ch, há»— trá»£ tá»« nhÃ  tÃ i trá»£ vÃ  má»©c Ä‘á»™ phÃ¹ há»£p váº­n hÃ nh.",
      "The organizing committee is comparing VNU-VJU University and Sheraton Hanoi West Hotel against budget, sponsor support and operational fit.",
    ),
    referenceTitle: L("Host city", "ThÃ nh phá»‘ tá»• chá»©c", "Host city"),
    referenceBody: L(
      "Hanoi serves as the anchor for the conference, partner meetings, site visits and the dedicated NEXUS session.",
      "HÃ  Ná»™i Ä‘Ã³ng vai trÃ² trung tÃ¢m cho há»™i nghá»‹, cÃ¡c cuá»™c gáº·p Ä‘á»‘i tÃ¡c, chÆ°Æ¡ng trÃ¬nh site visit vÃ  NEXUS session chuyÃªn biá»‡t.",
      "Hanoi serves as the anchor for the conference, partner meetings, site visits and the dedicated NEXUS session.",
    ),
  },
  organizers: {
    title: L(
      "Governance and committees",
      "Bá»™ mÃ¡y tá»• chá»©c vÃ  cÃ¡c committee",
      "Governance and committees",
    ),
    intro: L(
      "The governance model separates strategic leadership, scientific quality control, local execution, sponsorship outreach and secretariat operations.",
      "MÃ´ hÃ¬nh quáº£n trá»‹ tÃ¡ch báº¡ch lÃ£nh Ä‘áº¡o chiáº¿n lÆ°á»£c, kiá»ƒm soÃ¡t cháº¥t lÆ°á»£ng khoa há»c, thá»±c thi táº¡i chá»—, outreach nhÃ  tÃ i trá»£ vÃ  váº­n hÃ nh ban thÆ° kÃ½.",
      "The governance model separates strategic leadership, scientific quality control, local execution, sponsorship outreach and secretariat operations.",
    ),
    partnerPlaceholderTitle: L(
      "Host and patron organizations",
      "ÄÆ¡n vá»‹ chá»§ trÃ¬ vÃ  báº£o trá»£",
      "Host and patron organizations",
    ),
    partnerPlaceholderBody: L(
      "The public-facing site should keep organizational roles explicit so partners, sponsors and invited speakers can see who owns each part of the event.",
      "Site cÃ´ng khai nÃªn thá»ƒ hiá»‡n rÃµ vai trÃ² cá»§a tá»«ng tá»• chá»©c Ä‘á»ƒ Ä‘á»‘i tÃ¡c, nhÃ  tÃ i trá»£ vÃ  diá»…n giáº£ má»i nháº­n biáº¿t Ä‘Æ¡n vá»‹ nÃ o phá»¥ trÃ¡ch tá»«ng pháº§n cá»§a sá»± kiá»‡n.",
      "The public-facing site should keep organizational roles explicit so partners, sponsors and invited speakers can see who owns each part of the event.",
    ),
  },
  sponsors: {
    title: L(
      "Partnership and sponsorship",
      "Há»£p tÃ¡c vÃ  tÃ i trá»£",
      "Partnership and sponsorship",
    ),
    intro: L(
      "The proposal frames sponsorship as ecosystem participation: talent access, research exchange, thought leadership, recruitment visibility and documented post-event recognition.",
      "Báº£n proposal Ä‘á»‹nh nghÄ©a tÃ i trá»£ nhÆ° má»™t hÃ¬nh thá»©c tham gia há»‡ sinh thÃ¡i: tiáº¿p cáº­n nhÃ¢n lá»±c, trao Ä‘á»•i nghiÃªn cá»©u, hiá»‡n diá»‡n chuyÃªn mÃ´n, kháº£ nÄƒng tuyá»ƒn dá»¥ng vÃ  ghi nháº­n sau sá»± kiá»‡n cÃ³ chá»©ng cá»©.",
      "The proposal frames sponsorship as ecosystem participation: talent access, research exchange, thought leadership, recruitment visibility and documented post-event recognition.",
    ),
    upcomingTitle: L(
      "Working tier framework",
      "Khung háº¡ng má»¥c Ä‘ang lÃ m viá»‡c",
      "Working tier framework",
    ),
    upcomingBody: L(
      "Amounts and benefits remain subject to organizing-committee approval, but the tier logic is already defined for outreach.",
      "Má»©c Ä‘Ã³ng gÃ³p vÃ  quyá»n lá»£i váº«n chá» ban tá»• chá»©c phÃª duyá»‡t, nhÆ°ng logic phÃ¢n háº¡ng Ä‘Ã£ Ä‘Æ°á»£c xÃ¡c láº­p Ä‘á»ƒ phá»¥c vá»¥ outreach.",
      "Amounts and benefits remain subject to organizing-committee approval, but the tier logic is already defined for outreach.",
    ),
  },
  cfp: {
    title: L(
      "Call for abstracts and talks",
      "KÃªu gá»i abstract vÃ  bÃ i trÃ¬nh bÃ y",
      "Call for abstracts and talks",
    ),
    intro: L(
      "The abstract and contributed-talk process is planned for June 2026. The current page publishes the working scope so potential authors and speakers can prepare early.",
      "Quy trÃ¬nh nháº­n abstract vÃ  contributed talk dá»± kiáº¿n má»Ÿ trong thÃ¡ng 6/2026. Trang nÃ y cÃ´ng bá»‘ pháº¡m vi lÃ m viá»‡c hiá»‡n táº¡i Ä‘á»ƒ tÃ¡c giáº£ vÃ  diá»…n giáº£ tiá»m nÄƒng cÃ³ thá»ƒ chuáº©n bá»‹ sá»›m.",
      "The abstract and contributed-talk process is planned for June 2026. The current page publishes the working scope so potential authors and speakers can prepare early.",
    ),
  },
  registration: {
    title: L(
      "Registration and attendance",
      "ÄÄƒng kÃ½ vÃ  tham dá»±",
      "Registration and attendance",
    ),
    intro: L(
      "Registration content is being staged in parallel with venue, budget and sponsorship decisions. The attendee model and participation format are already clear even though fees are not yet published.",
      "Ná»™i dung Ä‘Äƒng kÃ½ Ä‘ang Ä‘Æ°á»£c chuáº©n bá»‹ song song vá»›i quyáº¿t Ä‘á»‹nh vá» Ä‘á»‹a Ä‘iá»ƒm, ngÃ¢n sÃ¡ch vÃ  tÃ i trá»£. MÃ´ hÃ¬nh ngÆ°á»i tham dá»± vÃ  hÃ¬nh thá»©c tham gia Ä‘Ã£ rÃµ, dÃ¹ má»©c phÃ­ chÆ°a Ä‘Æ°á»£c cÃ´ng bá»‘.",
      "Registration content is being staged in parallel with venue, budget and sponsorship decisions. The attendee model and participation format are already clear even though fees are not yet published.",
    ),
  },
  contact: {
    title: L("Contact and liaison", "LiÃªn há»‡ vÃ  Ä‘áº§u má»‘i", "Contact and liaison"),
    intro: L(
      "The working proposal already identifies secretariat and academic-liaison contacts for sponsor outreach, invited-speaker coordination and program questions.",
      "Báº£n proposal Ä‘ang lÃ m viá»‡c Ä‘Ã£ xÃ¡c Ä‘á»‹nh Ä‘áº§u má»‘i ban thÆ° kÃ½ vÃ  liÃªn há»‡ há»c thuáº­t cho outreach nhÃ  tÃ i trá»£, Ä‘iá»u phá»‘i diá»…n giáº£ má»i vÃ  cÃ¡c cÃ¢u há»i vá» chÆ°Æ¡ng trÃ¬nh.",
      "The working proposal already identifies secretariat and academic-liaison contacts for sponsor outreach, invited-speaker coordination and program questions.",
    ),
  },
  news: {
    title: L("Planning updates", "Cáº­p nháº­t káº¿ hoáº¡ch", "Planning updates"),
    intro: L(
      "These updates summarize the current planning package so the public site reflects the latest working assumptions without pretending the program is already final.",
      "CÃ¡c cáº­p nháº­t nÃ y tÃ³m táº¯t gÃ³i káº¿ hoáº¡ch hiá»‡n táº¡i Ä‘á»ƒ site cÃ´ng khai pháº£n Ã¡nh giáº£ Ä‘á»‹nh lÃ m viá»‡c má»›i nháº¥t mÃ  khÃ´ng táº¡o cáº£m giÃ¡c chÆ°Æ¡ng trÃ¬nh Ä‘Ã£ Ä‘Æ°á»£c chá»‘t hoÃ n toÃ n.",
      "These updates summarize the current planning package so the public site reflects the latest working assumptions without pretending the program is already final.",
    ),
  },
};

export const programSessions: ProgramSession[] = [
  {
    id: "lecture-session",
    day: L("Day 1", "NgÃ y 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "08:30 - 11:00",
    title: S("Lecture Session"),
    themeId: "Academic and talent",
    theme: L("Academic and talent", "Há»c thuáº­t vÃ  nhÃ¢n lá»±c", "Academic and talent"),
    status: "updated",
    chairs: ["Program committee"],
    summary: L(
      "Student- and young researcher-oriented lectures on semiconductor technologies and career pathways.",
      "Chuá»—i bÃ i giáº£ng hÆ°á»›ng tá»›i sinh viÃªn vÃ  nhÃ  nghiÃªn cá»©u tráº» vá» cÃ´ng nghá»‡ bÃ¡n dáº«n vÃ  cÃ¡c lá»™ trÃ¬nh nghá» nghiá»‡p.",
      "Student- and young researcher-oriented lectures on semiconductor technologies and career pathways.",
    ),
    speakerIds: ["le-duc-anh", "dang-thanh-tu", "huynh-van-nhat"],
  },
  {
    id: "study-abroad-job-orientation",
    day: L("Day 1", "NgÃ y 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "11:00 - 12:00",
    title: S("Study Abroad and Job Orientation"),
    themeId: "Academic and talent",
    theme: L("Academic and talent", "Há»c thuáº­t vÃ  nhÃ¢n lá»±c", "Academic and talent"),
    status: "updated",
    chairs: ["Local committee"],
    summary: L(
      "Q&A with academic and industry representatives on study, career and training pathways.",
      "PhiÃªn há»i Ä‘Ã¡p vá»›i Ä‘áº¡i diá»‡n há»c thuáº­t vÃ  doanh nghiá»‡p vá» con Ä‘Æ°á»ng du há»c, nghá» nghiá»‡p vÃ  Ä‘Ã o táº¡o.",
      "Q&A with academic and industry representatives on study, career and training pathways.",
    ),
    speakerIds: ["huynh-van-nhat", "luong-minh-phuong"],
  },
  {
    id: "luncheon-session",
    day: L("Day 1", "NgÃ y 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "12:00 - 13:30",
    title: S("Lunch Break / Luncheon Session"),
    themeId: "Networking",
    theme: L("Networking", "Káº¿t ná»‘i", "Networking"),
    status: "draft",
    chairs: [],
    summary: L(
      "Potential sponsor-supported luncheon or student networking format.",
      "Khung luncheon cÃ³ thá»ƒ Ä‘Æ°á»£c nhÃ  tÃ i trá»£ Ä‘á»“ng hÃ nh hoáº·c tá»• chá»©c theo Ä‘á»‹nh dáº¡ng networking cho sinh viÃªn.",
      "Potential sponsor-supported luncheon or student networking format.",
    ),
    speakerIds: [],
  },
  {
    id: "opening-ceremony",
    day: L("Day 1", "NgÃ y 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "13:30 - 14:00",
    title: S("Opening Ceremony"),
    themeId: "Plenary and opening",
    theme: L("Plenary and opening", "Khai máº¡c vÃ  plenary", "Plenary and opening"),
    status: "updated",
    chairs: ["Dr. Nguyen Hoang Oanh"],
    summary: L(
      "Welcome remarks by host organizations, patrons and core partners.",
      "Pháº§n phÃ¡t biá»ƒu chÃ o má»«ng cá»§a cÃ¡c Ä‘Æ¡n vá»‹ chá»§ trÃ¬, Ä‘Æ¡n vá»‹ báº£o trá»£ vÃ  Ä‘á»‘i tÃ¡c nÃ²ng cá»‘t.",
      "Welcome remarks by host organizations, patrons and core partners.",
    ),
    speakerIds: ["nguyen-hoang-oanh", "toshiro-hiramoto", "bui-nguyen-quoc-trinh"],
  },
  {
    id: "plenary-session-1",
    day: L("Day 1", "NgÃ y 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "14:00 - 15:30",
    title: S("Plenary Session 1"),
    themeId: "Plenary and opening",
    theme: L("Plenary and opening", "Khai máº¡c vÃ  plenary", "Plenary and opening"),
    status: "updated",
    chairs: ["Scientific committee"],
    summary: L(
      "Plenary and invited presentations setting the technical and strategic tone of the symposium.",
      "CÃ¡c bÃ i trÃ¬nh bÃ y plenary vÃ  invited Ä‘áº·t ná»n cho hÆ°á»›ng ká»¹ thuáº­t vÃ  Ä‘á»‹nh vá»‹ chiáº¿n lÆ°á»£c cá»§a há»™i nghá»‹.",
      "Plenary and invited presentations setting the technical and strategic tone of the symposium.",
    ),
    speakerIds: ["le-duc-anh", "tran-xuan-tu", "nguyen-chung-hoa"],
  },
  {
    id: "parallel-session-1",
    day: L("Day 1", "NgÃ y 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "15:45 - 17:30",
    title: S("Parallel Session 1"),
    themeId: "Technical tracks",
    theme: L("Technical tracks", "CÃ¡c track ká»¹ thuáº­t", "Technical tracks"),
    status: "draft",
    chairs: ["Track chairs"],
    summary: L(
      "Working format: one invited talk of 30 minutes and four contributed talks of 15 minutes, subject to final program design.",
      "Äá»‹nh dáº¡ng lÃ m viá»‡c hiá»‡n táº¡i gá»“m má»™t invited talk 30 phÃºt vÃ  bá»‘n contributed talk 15 phÃºt, chá» chá»‘t theo thiáº¿t káº¿ chÆ°Æ¡ng trÃ¬nh cuá»‘i cÃ¹ng.",
      "Working format: one invited talk of 30 minutes and four contributed talks of 15 minutes, subject to final program design.",
    ),
    speakerIds: ["tran-quoc-tien", "dao-thanh-toan", "nguyen-ngoc-dinh", "le-van-lich"],
  },
  {
    id: "welcome-reception",
    day: L("Day 1", "NgÃ y 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "17:30 - onward",
    title: S("Welcome Reception and Networking"),
    themeId: "Networking",
    theme: L("Networking", "Káº¿t ná»‘i", "Networking"),
    status: "draft",
    chairs: [],
    summary: L(
      "Opening-day networking for speakers, sponsors, partners and participants.",
      "PhiÃªn networking cuá»‘i ngÃ y Ä‘áº§u dÃ nh cho diá»…n giáº£, nhÃ  tÃ i trá»£, Ä‘á»‘i tÃ¡c vÃ  ngÆ°á»i tham dá»±.",
      "Opening-day networking for speakers, sponsors, partners and participants.",
    ),
    speakerIds: [],
  },
  {
    id: "plenary-session-2",
    day: L("Day 2", "NgÃ y 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "09:00 - 10:30",
    title: S("Plenary Session 2"),
    themeId: "Plenary and opening",
    theme: L("Plenary and opening", "Khai máº¡c vÃ  plenary", "Plenary and opening"),
    status: "updated",
    chairs: ["Scientific committee"],
    summary: L(
      "Second plenary block for invited and keynote-level talks.",
      "Khá»‘i plenary thá»© hai dÃ nh cho cÃ¡c bÃ i trÃ¬nh bÃ y invited vÃ  keynote-level.",
      "Second plenary block for invited and keynote-level talks.",
    ),
    speakerIds: ["nguyen-tran-thuat", "le-van-hai"],
  },
  {
    id: "parallel-session-2",
    day: L("Day 2", "NgÃ y 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "10:45 - 12:00",
    title: S("Parallel Session 2"),
    themeId: "Technical tracks",
    theme: L("Technical tracks", "CÃ¡c track ká»¹ thuáº­t", "Technical tracks"),
    status: "draft",
    chairs: ["Track chairs"],
    summary: L(
      "Technical sessions continuing across the defined thematic tracks.",
      "CÃ¡c phiÃªn ká»¹ thuáº­t tiáº¿p tá»¥c triá»ƒn khai theo cÃ¡c track chá»§ Ä‘á» Ä‘Ã£ xÃ¡c láº­p.",
      "Technical sessions continuing across the defined thematic tracks.",
    ),
    speakerIds: ["bui-duy-hieu", "nguyen-ngoc-linh"],
  },
  {
    id: "luncheon-session-2",
    day: L("Day 2", "NgÃ y 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "12:00 - 13:30",
    title: S("Lunch Break / Luncheon Session"),
    themeId: "Networking",
    theme: L("Networking", "Káº¿t ná»‘i", "Networking"),
    status: "draft",
    chairs: [],
    summary: L(
      "Optional sponsor-hosted luncheon or focused networking format.",
      "Khung luncheon cÃ³ thá»ƒ do nhÃ  tÃ i trá»£ Ä‘á»“ng hÃ nh hoáº·c Ä‘Æ°á»£c váº­n hÃ nh nhÆ° má»™t phiÃªn networking táº­p trung.",
      "Optional sponsor-hosted luncheon or focused networking format.",
    ),
    speakerIds: [],
  },
  {
    id: "plenary-session-3",
    day: L("Day 2", "NgÃ y 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "13:30 - 15:00",
    title: S("Plenary Session 3 / Poster Session"),
    themeId: "Plenary and opening",
    theme: L("Plenary and opening", "Khai máº¡c vÃ  plenary", "Plenary and opening"),
    status: "draft",
    chairs: ["Program committee"],
    summary: L(
      "Option under discussion: a plenary talk plus a poster session in the afternoon block.",
      "PhÆ°Æ¡ng Ã¡n Ä‘ang Ä‘Æ°á»£c tháº£o luáº­n: má»™t bÃ i plenary káº¿t há»£p vá»›i poster session trong khung buá»•i chiá»u.",
      "Option under discussion: a plenary talk plus a poster session in the afternoon block.",
    ),
    speakerIds: [],
  },
  {
    id: "parallel-session-3",
    day: L("Day 2", "NgÃ y 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "15:15 - 17:00",
    title: S("Parallel Session 3"),
    themeId: "Technical tracks",
    theme: L("Technical tracks", "CÃ¡c track ká»¹ thuáº­t", "Technical tracks"),
    status: "draft",
    chairs: ["Track chairs"],
    summary: L(
      "Final parallel technical block before closing and banquet.",
      "Khá»‘i ká»¹ thuáº­t song song cuá»‘i cÃ¹ng trÆ°á»›c phiÃªn báº¿ máº¡c vÃ  banquet.",
      "Final parallel technical block before closing and banquet.",
    ),
    speakerIds: ["nguyen-chung-hoa", "dang-thanh-tu"],
  },
  {
    id: "closing-banquet",
    day: L("Day 2", "NgÃ y 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "17:30 - onward",
    title: S("Closing and Banquet"),
    themeId: "Networking",
    theme: L("Networking", "Káº¿t ná»‘i", "Networking"),
    status: "updated",
    chairs: ["Organizing committee"],
    summary: L(
      "Closing remarks, awards, partner recognition and banquet networking.",
      "PhÃ¡t biá»ƒu báº¿ máº¡c, trao ghi nháº­n, vinh danh Ä‘á»‘i tÃ¡c vÃ  networking táº¡i banquet.",
      "Closing remarks, awards, partner recognition and banquet networking.",
    ),
    speakerIds: ["nguyen-hoang-oanh", "huynh-van-nhat"],
  },
  {
    id: "site-visit-am",
    day: L("Day 3", "NgÃ y 3", "Day 3"),
    date: S("September 22, 2026"),
    time: "AM",
    title: S("Site Visiting"),
    themeId: "Site visits",
    theme: L("Site visits", "Site visit", "Site visits"),
    status: "draft",
    chairs: ["Local committee"],
    summary: L(
      "Visits to semiconductor-related facilities, laboratories, innovation centers or industrial parks.",
      "ChÆ°Æ¡ng trÃ¬nh thÄƒm cÆ¡ sá»Ÿ liÃªn quan Ä‘áº¿n bÃ¡n dáº«n, phÃ²ng thÃ­ nghiá»‡m, trung tÃ¢m Ä‘á»•i má»›i sÃ¡ng táº¡o hoáº·c khu cÃ´ng nghiá»‡p.",
      "Visits to semiconductor-related facilities, laboratories, innovation centers or industrial parks.",
    ),
    speakerIds: [],
  },
  {
    id: "site-visit-pm",
    day: L("Day 3", "NgÃ y 3", "Day 3"),
    date: S("September 22, 2026"),
    time: "PM",
    title: S("Site Visiting"),
    themeId: "Site visits",
    theme: L("Site visits", "Site visit", "Site visits"),
    status: "draft",
    chairs: ["Local committee"],
    summary: L(
      "Continuation of technical and ecosystem visits with partner meetings.",
      "Tiáº¿p tá»¥c cÃ¡c chuyáº¿n thÄƒm ká»¹ thuáº­t, há»‡ sinh thÃ¡i vÃ  cÃ¡c buá»•i lÃ m viá»‡c vá»›i Ä‘á»‘i tÃ¡c.",
      "Continuation of technical and ecosystem visits with partner meetings.",
    ),
    speakerIds: [],
  },
  {
    id: "nexus-session",
    day: L("Day 4", "NgÃ y 4", "Day 4"),
    date: S("September 23, 2026"),
    time: "AM",
    title: S("NEXUS Session"),
    themeId: "NEXUS and bilateral programs",
    theme: L(
      "NEXUS and bilateral programs",
      "NEXUS vÃ  cÃ¡c chÆ°Æ¡ng trÃ¬nh song phÆ°Æ¡ng",
      "NEXUS and bilateral programs",
    ),
    status: "updated",
    chairs: ["JST NEXUS"],
    summary: L(
      "Dedicated session for JST NEXUS teams and related bilateral collaboration discussions.",
      "PhiÃªn chuyÃªn biá»‡t cho cÃ¡c nhÃ³m JST NEXUS vÃ  cÃ¡c tháº£o luáº­n há»£p tÃ¡c song phÆ°Æ¡ng liÃªn quan.",
      "Dedicated session for JST NEXUS teams and related bilateral collaboration discussions.",
    ),
    speakerIds: ["toshiro-hiramoto", "le-duc-anh", "bui-nguyen-quoc-trinh"],
  },
  {
    id: "follow-up-visits",
    day: L("Day 4", "NgÃ y 4", "Day 4"),
    date: S("September 23, 2026"),
    time: "PM",
    title: S("Follow-up Site Visit and Institutional Meetings"),
    themeId: "NEXUS and bilateral programs",
    theme: L(
      "NEXUS and bilateral programs",
      "NEXUS vÃ  cÃ¡c chÆ°Æ¡ng trÃ¬nh song phÆ°Æ¡ng",
      "NEXUS and bilateral programs",
    ),
    status: "draft",
    chairs: ["Organizing committee"],
    summary: L(
      "Follow-up site visits, institutional meetings and collaboration discussions.",
      "CÃ¡c chuyáº¿n thÄƒm ná»‘i tiáº¿p, cuá»™c há»p cáº¥p tá»• chá»©c vÃ  tháº£o luáº­n há»£p tÃ¡c sau NEXUS session.",
      "Follow-up site visits, institutional meetings and collaboration discussions.",
    ),
    speakerIds: [],
  },
];

export const programThemeFilters = [
  {
    id: "all",
    label: L("All sessions", "ToÃ n bá»™ phiÃªn", "All sessions"),
  },
  {
    id: "Plenary and opening",
    label: L("Opening and plenary", "Khai máº¡c vÃ  plenary", "Opening and plenary"),
  },
  {
    id: "Academic and talent",
    label: L("Talent and lecture", "NhÃ¢n lá»±c vÃ  bÃ i giáº£ng", "Talent and lecture"),
  },
  {
    id: "Technical tracks",
    label: L("Technical tracks", "Track ká»¹ thuáº­t", "Technical tracks"),
  },
  {
    id: "Networking",
    label: L("Networking", "Káº¿t ná»‘i", "Networking"),
  },
  {
    id: "Site visits",
    label: L("Site visits", "Site visit", "Site visits"),
  },
  {
    id: "NEXUS and bilateral programs",
    label: L("NEXUS", "NEXUS", "NEXUS"),
  },
];

export const programArchitecture: ProgramArchitectureItem[] = [
  {
    title: L("Scientific sessions", "PhiÃªn khoa há»c", "Scientific sessions"),
    description: L(
      "Plenary, invited and contributed talks across semiconductor research themes.",
      "CÃ¡c bÃ i trÃ¬nh bÃ y plenary, invited vÃ  contributed tráº£i trÃªn cÃ¡c chá»§ Ä‘á» nghiÃªn cá»©u bÃ¡n dáº«n.",
      "Plenary, invited and contributed talks across semiconductor research themes.",
    ),
    audience: L(
      "Researchers, faculty, JST NEXUS teams and graduate students",
      "NhÃ  nghiÃªn cá»©u, giáº£ng viÃªn, nhÃ³m JST NEXUS vÃ  há»c viÃªn sau Ä‘áº¡i há»c",
      "Researchers, faculty, JST NEXUS teams and graduate students",
    ),
  },
  {
    title: L(
      "Parallel technical tracks",
      "CÃ¡c track ká»¹ thuáº­t song song",
      "Parallel technical tracks",
    ),
    description: L(
      "Focused sessions on IC design, materials, devices, packaging, AI and quantum, and emerging frontiers.",
      "CÃ¡c phiÃªn táº­p trung vÃ o thiáº¿t káº¿ IC, váº­t liá»‡u, linh kiá»‡n, Ä‘Ã³ng gÃ³i, AI vÃ  lÆ°á»£ng tá»­, cÃ¹ng cÃ¡c hÆ°á»›ng cÃ´ng nghá»‡ má»›i ná»•i.",
      "Focused sessions on IC design, materials, devices, packaging, AI and quantum, and emerging frontiers.",
    ),
    audience: L(
      "Researchers, engineers, students and companies",
      "NhÃ  nghiÃªn cá»©u, ká»¹ sÆ°, sinh viÃªn vÃ  doanh nghiá»‡p",
      "Researchers, engineers, students and companies",
    ),
  },
  {
    title: L(
      "Lecture and career session",
      "BÃ i giáº£ng vÃ  Ä‘á»‹nh hÆ°á»›ng nghá» nghiá»‡p",
      "Lecture and career session",
    ),
    description: L(
      "Introductory and advanced lectures, study-abroad guidance, job orientation and Q&A.",
      "BÃ i giáº£ng ná»n táº£ng vÃ  nÃ¢ng cao, hÆ°á»›ng dáº«n du há»c, Ä‘á»‹nh hÆ°á»›ng viá»‡c lÃ m vÃ  há»i Ä‘Ã¡p.",
      "Introductory and advanced lectures, study-abroad guidance, job orientation and Q&A.",
    ),
    audience: L(
      "Students, young researchers, employers and universities",
      "Sinh viÃªn, nhÃ  nghiÃªn cá»©u tráº», Ä‘Æ¡n vá»‹ tuyá»ƒn dá»¥ng vÃ  trÆ°á»ng Ä‘áº¡i há»c",
      "Students, young researchers, employers and universities",
    ),
  },
  {
    title: L(
      "Industry and policy dialogue",
      "Äá»‘i thoáº¡i cÃ´ng nghiá»‡p vÃ  chÃ­nh sÃ¡ch",
      "Industry and policy dialogue",
    ),
    description: L(
      "Panel and networking sessions on collaboration, workforce development and ecosystem coordination.",
      "CÃ¡c panel vÃ  phiÃªn networking vá» há»£p tÃ¡c, phÃ¡t triá»ƒn nguá»“n nhÃ¢n lá»±c vÃ  Ä‘iá»u phá»‘i há»‡ sinh thÃ¡i.",
      "Panel and networking sessions on collaboration, workforce development and ecosystem coordination.",
    ),
    audience: L(
      "Companies, public agencies, innovation centers and universities",
      "Doanh nghiá»‡p, cÆ¡ quan cÃ´ng, trung tÃ¢m Ä‘á»•i má»›i sÃ¡ng táº¡o vÃ  trÆ°á»ng Ä‘áº¡i há»c",
      "Companies, public agencies, innovation centers and universities",
    ),
  },
  {
    title: L(
      "Site visits and NEXUS session",
      "Site visit vÃ  NEXUS session",
      "Site visits and NEXUS session",
    ),
    description: L(
      "Visits to local ecosystem sites and a dedicated session for JST NEXUS teams.",
      "ChÆ°Æ¡ng trÃ¬nh thÄƒm cÃ¡c Ä‘iá»ƒm trong há»‡ sinh thÃ¡i táº¡i Ä‘á»‹a phÆ°Æ¡ng vÃ  phiÃªn chuyÃªn biá»‡t cho cÃ¡c nhÃ³m JST NEXUS.",
      "Visits to local ecosystem sites and a dedicated session for JST NEXUS teams.",
    ),
    audience: L(
      "Invited participants, NEXUS teams and strategic partners",
      "KhÃ¡ch má»i, cÃ¡c nhÃ³m NEXUS vÃ  Ä‘á»‘i tÃ¡c chiáº¿n lÆ°á»£c",
      "Invited participants, NEXUS teams and strategic partners",
    ),
  },
];

export const technicalThemes: TechnicalTheme[] = [
  {
    name: L(
      "Integrated Circuit Design and Verification",
      "Thiáº¿t káº¿ vÃ  kiá»ƒm chá»©ng máº¡ch tÃ­ch há»£p",
      "Integrated Circuit Design and Verification",
    ),
    scope: L(
      "Design methodology, verification, EDA, hardware systems and circuit technologies.",
      "PhÆ°Æ¡ng phÃ¡p thiáº¿t káº¿, kiá»ƒm chá»©ng, EDA, há»‡ thá»‘ng pháº§n cá»©ng vÃ  cÃ¡c cÃ´ng nghá»‡ máº¡ch.",
      "Design methodology, verification, EDA, hardware systems and circuit technologies.",
    ),
    chairs: ["Prof. Tran Xuan Tu", "Dr. Bui Duy Hieu"],
  },
  {
    name: L(
      "Optoelectronic Devices and Semiconductor Chip Technology",
      "Linh kiá»‡n quang Ä‘iá»‡n tá»­ vÃ  cÃ´ng nghá»‡ chip bÃ¡n dáº«n",
      "Optoelectronic Devices and Semiconductor Chip Technology",
    ),
    scope: L(
      "Optoelectronic devices, integrated chip technologies and device applications.",
      "Linh kiá»‡n quang Ä‘iá»‡n tá»­, cÃ´ng nghá»‡ chip tÃ­ch há»£p vÃ  cÃ¡c á»©ng dá»¥ng linh kiá»‡n.",
      "Optoelectronic devices, integrated chip technologies and device applications.",
    ),
    chairs: ["Assoc. Prof. Dr. Tran Quoc Tien", "Assoc. Prof. Dr. Dao Thanh Toan"],
  },
  {
    name: L(
      "Advanced Materials Design and Smart Processing",
      "Thiáº¿t káº¿ váº­t liá»‡u tiÃªn tiáº¿n vÃ  xá»­ lÃ½ thÃ´ng minh",
      "Advanced Materials Design and Smart Processing",
    ),
    scope: L(
      "Silicon, SiC, compound materials, smart fabrication and materials innovation.",
      "Silicon, SiC, váº­t liá»‡u há»£p cháº¥t, cháº¿ táº¡o thÃ´ng minh vÃ  Ä‘á»•i má»›i váº­t liá»‡u.",
      "Silicon, SiC, compound materials, smart fabrication and materials innovation.",
    ),
    chairs: [
      "Assoc. Prof. Dr. Nguyen Ngoc Dinh",
      "Assoc. Prof. Dr. Do Danh Bich",
      "Dr. Do Hong Minh",
    ],
  },
  {
    name: L(
      "Advanced Packaging and Testing",
      "ÄÃ³ng gÃ³i vÃ  kiá»ƒm thá»­ tiÃªn tiáº¿n",
      "Advanced Packaging and Testing",
    ),
    scope: L(
      "Packaging architectures, reliability, testing, characterization and production readiness.",
      "Kiáº¿n trÃºc Ä‘Ã³ng gÃ³i, Ä‘á»™ tin cáº­y, kiá»ƒm thá»­, Ä‘áº·c trÆ°ng hÃ³a vÃ  má»©c sáºµn sÃ ng sáº£n xuáº¥t.",
      "Packaging architectures, reliability, testing, characterization and production readiness.",
    ),
    chairs: ["Assoc. Prof. Dr. Nguyen Tran Thuat", "Assoc. Prof. Dr. Pham Van Thanh"],
  },
  {
    name: L(
      "AI and Quantum Computing in Semiconductors",
      "AI vÃ  Ä‘iá»‡n toÃ¡n lÆ°á»£ng tá»­ trong bÃ¡n dáº«n",
      "AI and Quantum Computing in Semiconductors",
    ),
    scope: L(
      "Semiconductor technologies for AI, quantum computing, spintronics and emerging compute.",
      "CÃ¡c cÃ´ng nghá»‡ bÃ¡n dáº«n cho AI, Ä‘iá»‡n toÃ¡n lÆ°á»£ng tá»­, spintronics vÃ  cÃ¡c hÆ°á»›ng tÃ­nh toÃ¡n má»›i ná»•i.",
      "Semiconductor technologies for AI, quantum computing, spintronics and emerging compute.",
    ),
    chairs: ["Assoc. Prof. Dr. Le Van Lich", "Dr. Nguyen Ngoc Linh"],
  },
  {
    name: L(
      "Emerging Technologies in Semiconductor Frontiers",
      "CÃ¡c cÃ´ng nghá»‡ má»›i ná»•i á»Ÿ tuyáº¿n Ä‘áº§u bÃ¡n dáº«n",
      "Emerging Technologies in Semiconductor Frontiers",
    ),
    scope: L(
      "Nitrides, organic devices, smart sensors and frontier semiconductor platforms.",
      "Nitride, linh kiá»‡n há»¯u cÆ¡, cáº£m biáº¿n thÃ´ng minh vÃ  cÃ¡c ná»n táº£ng bÃ¡n dáº«n tuyáº¿n Ä‘áº§u.",
      "Nitrides, organic devices, smart sensors and frontier semiconductor platforms.",
    ),
    chairs: ["Dr. Le Van Hai", "Prof. Dr. Nguyen Chung Hoa"],
  },
  {
    name: L(
      "Human Resource Development and Academic-Industrial Collaboration",
      "PhÃ¡t triá»ƒn nguá»“n nhÃ¢n lá»±c vÃ  há»£p tÃ¡c há»c thuáº­t - cÃ´ng nghiá»‡p",
      "Human Resource Development and Academic-Industrial Collaboration",
    ),
    scope: L(
      "Education, workforce development, internships, hiring pathways and joint training.",
      "GiÃ¡o dá»¥c, phÃ¡t triá»ƒn nhÃ¢n lá»±c, thá»±c táº­p, con Ä‘Æ°á»ng tuyá»ƒn dá»¥ng vÃ  Ä‘Ã o táº¡o chung.",
      "Education, workforce development, internships, hiring pathways and joint training.",
    ),
    chairs: ["Dr. Dang Thanh Tu", "Dr. Luong Minh Phuong"],
  },
];

export const implementationTimeline: TimelineItem[] = [
  {
    period: "April 2026",
    milestones: L(
      "Confirm organizing structure, refine partner proposal, decide sponsorship targets and shortlist venues.",
      "XÃ¡c nháº­n cáº¥u trÃºc tá»• chá»©c, hoÃ n thiá»‡n proposal Ä‘á»‘i tÃ¡c, quyáº¿t Ä‘á»‹nh má»¥c tiÃªu tÃ i trá»£ vÃ  shortlist Ä‘á»‹a Ä‘iá»ƒm.",
      "Confirm organizing structure, refine partner proposal, decide sponsorship targets and shortlist venues.",
    ),
    owner: L(
      "Conference chairs, organizing committee and local committee",
      "Chá»§ trÃ¬ há»™i nghá»‹, organizing committee vÃ  local committee",
      "Conference chairs, organizing committee and local committee",
    ),
    output: L(
      "Updated proposal, outreach list and venue comparison",
      "Proposal cáº­p nháº­t, danh sÃ¡ch outreach vÃ  so sÃ¡nh Ä‘á»‹a Ä‘iá»ƒm",
      "Updated proposal, outreach list and venue comparison",
    ),
  },
  {
    period: "May 2026",
    milestones: L(
      "Launch sponsor outreach, issue speaker invitations and confirm tracks and session chairs.",
      "Triá»ƒn khai outreach nhÃ  tÃ i trá»£, gá»­i thÆ° má»i diá»…n giáº£ vÃ  xÃ¡c nháº­n track cÃ¹ng session chair.",
      "Launch sponsor outreach, issue speaker invitations and confirm tracks and session chairs.",
    ),
    owner: L(
      "Sponsorship committee and scientific committee",
      "Sponsorship committee vÃ  scientific committee",
      "Sponsorship committee and scientific committee",
    ),
    output: L(
      "Sponsor meetings, invited-speaker responses and draft program framework",
      "Cuá»™c há»p vá»›i nhÃ  tÃ i trá»£, pháº£n há»“i diá»…n giáº£ má»i vÃ  khung chÆ°Æ¡ng trÃ¬nh dá»± tháº£o",
      "Sponsor meetings, invited-speaker responses and draft program framework",
    ),
  },
  {
    period: "June 2026",
    milestones: L(
      "Open abstract process, confirm preliminary sponsor commitments and define site-visit plan.",
      "Má»Ÿ nháº­n abstract, xÃ¡c nháº­n cam káº¿t tÃ i trá»£ sÆ¡ bá»™ vÃ  xÃ¡c láº­p káº¿ hoáº¡ch site visit.",
      "Open abstract process, confirm preliminary sponsor commitments and define site-visit plan.",
    ),
    owner: L(
      "Scientific committee and local committee",
      "Scientific committee vÃ  local committee",
      "Scientific committee and local committee",
    ),
    output: L(
      "Call for abstracts, sponsor pipeline and site-visit shortlist",
      "Call for abstracts, pipeline nhÃ  tÃ i trá»£ vÃ  shortlist site visit",
      "Call for abstracts, sponsor pipeline and site-visit shortlist",
    ),
  },
  {
    period: "July 2026",
    milestones: L(
      "Review submissions, finalize keynote and plenary speakers, and confirm hybrid platform logistics.",
      "RÃ  soÃ¡t bÃ i gá»­i, chá»‘t keynote vÃ  plenary speaker, Ä‘á»“ng thá»i xÃ¡c nháº­n logistics cho hybrid platform.",
      "Review submissions, finalize keynote and plenary speakers, and confirm hybrid platform logistics.",
    ),
    owner: L(
      "Program chairs, local committee and secretariat",
      "Program chairs, local committee vÃ  secretariat",
      "Program chairs, local committee and secretariat",
    ),
    output: L(
      "Accepted talks, draft program and logistics plan",
      "Danh sÃ¡ch bÃ i Ä‘Æ°á»£c chá»n, chÆ°Æ¡ng trÃ¬nh dá»± tháº£o vÃ  káº¿ hoáº¡ch háº­u cáº§n",
      "Accepted talks, draft program and logistics plan",
    ),
  },
  {
    period: "August 2026",
    milestones: L(
      "Publish tentative program, confirm travel guidance and collect sponsor materials.",
      "CÃ´ng bá»‘ chÆ°Æ¡ng trÃ¬nh dá»± kiáº¿n, chá»‘t hÆ°á»›ng dáº«n di chuyá»ƒn vÃ  thu tháº­p materials cá»§a nhÃ  tÃ i trá»£.",
      "Publish tentative program, confirm travel guidance and collect sponsor materials.",
    ),
    owner: L(
      "Secretariat, communications and sponsors",
      "Ban thÆ° kÃ½, nhÃ³m truyá»n thÃ´ng vÃ  nhÃ  tÃ i trá»£",
      "Secretariat, communications and sponsors",
    ),
    output: L(
      "Program booklet draft, sponsor logos and registration updates",
      "Báº£n tháº£o booklet chÆ°Æ¡ng trÃ¬nh, logo nhÃ  tÃ i trá»£ vÃ  cáº­p nháº­t Ä‘Äƒng kÃ½",
      "Program booklet draft, sponsor logos and registration updates",
    ),
  },
  {
    period: "September 1-19, 2026",
    milestones: L(
      "Finalize scripts, badges, signage, banquet, AV, hybrid testing and volunteer briefing.",
      "Chá»‘t script phiÃªn há»p, badge, signage, banquet, AV, kiá»ƒm thá»­ hybrid vÃ  briefing cho tÃ¬nh nguyá»‡n viÃªn.",
      "Finalize scripts, badges, signage, banquet, AV, hybrid testing and volunteer briefing.",
    ),
    owner: L(
      "Local committee and secretariat",
      "Local committee vÃ  ban thÆ° kÃ½",
      "Local committee and secretariat",
    ),
    output: L(
      "Final run-of-show and production checklist",
      "Run-of-show cuá»‘i cÃ¹ng vÃ  checklist triá»ƒn khai",
      "Final run-of-show and production checklist",
    ),
  },
  {
    period: "September 20-23, 2026",
    milestones: L(
      "Execute the symposium, sponsor activities, speaker hosting, site visits and NEXUS session.",
      "Triá»ƒn khai há»™i nghá»‹, hoáº¡t Ä‘á»™ng vá»›i nhÃ  tÃ i trá»£, Ä‘Ã³n tiáº¿p diá»…n giáº£, site visit vÃ  NEXUS session.",
      "Execute the symposium, sponsor activities, speaker hosting, site visits and NEXUS session.",
    ),
    owner: L("All committees", "ToÃ n bá»™ cÃ¡c committee", "All committees"),
    output: L(
      "Conference delivery, media records and participation data",
      "Tá»• chá»©c há»™i nghá»‹, há»“ sÆ¡ truyá»n thÃ´ng vÃ  dá»¯ liá»‡u tham dá»±",
      "Conference delivery, media records and participation data",
    ),
  },
  {
    period: "October 2026",
    milestones: L(
      "Prepare post-event report, share sponsor deliverables, collect feedback and develop follow-up collaborations.",
      "HoÃ n thiá»‡n bÃ¡o cÃ¡o sau sá»± kiá»‡n, bÃ n giao deliverables cho nhÃ  tÃ i trá»£, láº¥y pháº£n há»“i vÃ  phÃ¡t triá»ƒn há»£p tÃ¡c ná»‘i tiáº¿p.",
      "Prepare post-event report, share sponsor deliverables, collect feedback and develop follow-up collaborations.",
    ),
    owner: L(
      "Organizing committee and secretariat",
      "Organizing committee vÃ  ban thÆ° kÃ½",
      "Organizing committee and secretariat",
    ),
    output: L(
      "Post-event report and partner follow-up plan",
      "BÃ¡o cÃ¡o sau sá»± kiá»‡n vÃ  káº¿ hoáº¡ch follow-up Ä‘á»‘i tÃ¡c",
      "Post-event report and partner follow-up plan",
    ),
  },
];

export const criticalDecisions = [
  L(
    "Venue choice and budget envelope, including whether to prioritize VNU-VJU University or Sheraton Hanoi West Hotel.",
    "Lá»±a chá»n Ä‘á»‹a Ä‘iá»ƒm vÃ  khung ngÃ¢n sÃ¡ch, bao gá»“m quyáº¿t Ä‘á»‹nh Æ°u tiÃªn VNU-VJU University hay Sheraton Hanoi West Hotel.",
    "Venue choice and budget envelope, including whether to prioritize VNU-VJU University or Sheraton Hanoi West Hotel.",
  ),
  L(
    "Sponsor package definitions and the approval process for partner benefits.",
    "Äá»‹nh nghÄ©a gÃ³i tÃ i trá»£ vÃ  quy trÃ¬nh phÃª duyá»‡t quyá»n lá»£i Ä‘á»‘i tÃ¡c.",
    "Sponsor package definitions and the approval process for partner benefits.",
  ),
  L(
    "Confirmed keynote and invited-speaker list, with travel support policy if applicable.",
    "Danh sÃ¡ch keynote vÃ  invited speaker Ä‘Ã£ xÃ¡c nháº­n, kÃ¨m chÃ­nh sÃ¡ch há»— trá»£ di chuyá»ƒn náº¿u Ã¡p dá»¥ng.",
    "Confirmed keynote and invited-speaker list, with travel support policy if applicable.",
  ),
  L(
    "Site-visit hosts and access permissions, especially for industrial or laboratory visits.",
    "ÄÆ¡n vá»‹ tiáº¿p Ä‘Ã³n site visit vÃ  quyá»n truy cáº­p, Ä‘áº·c biá»‡t vá»›i cÃ¡c chuyáº¿n thÄƒm cÃ´ng nghiá»‡p hoáº·c phÃ²ng thÃ­ nghiá»‡m.",
    "Site-visit hosts and access permissions, especially for industrial or laboratory visits.",
  ),
  L(
    "Hybrid-event platform, recording policy and language / interpretation support.",
    "Ná»n táº£ng hybrid event, chÃ­nh sÃ¡ch ghi hÃ¬nh vÃ  há»— trá»£ ngÃ´n ngá»¯ / phiÃªn dá»‹ch.",
    "Hybrid-event platform, recording policy and language / interpretation support.",
  ),
];

export const expectedOutcomes = [
  L(
    "New Vietnam-Japan research links, joint proposals, NEXUS-related collaboration and follow-up workshops.",
    "CÃ¡c liÃªn káº¿t nghiÃªn cá»©u má»›i giá»¯a Viá»‡t Nam vÃ  Nháº­t Báº£n, Ä‘á» xuáº¥t chung, há»£p tÃ¡c liÃªn quan NEXUS vÃ  workshop tiáº¿p ná»‘i.",
    "New Vietnam-Japan research links, joint proposals, NEXUS-related collaboration and follow-up workshops.",
  ),
  L(
    "Student exposure to semiconductor careers, study-abroad pathways and industry opportunities.",
    "Sinh viÃªn Ä‘Æ°á»£c tiáº¿p cáº­n cÃ¡c lá»™ trÃ¬nh nghá» nghiá»‡p bÃ¡n dáº«n, cÆ¡ há»™i du há»c vÃ  cÆ¡ há»™i tá»« doanh nghiá»‡p.",
    "Student exposure to semiconductor careers, study-abroad pathways and industry opportunities.",
  ),
  L(
    "Structured contact between companies, universities and young researchers.",
    "Káº¿t ná»‘i cÃ³ cáº¥u trÃºc giá»¯a doanh nghiá»‡p, trÆ°á»ng Ä‘áº¡i há»c vÃ  nhÃ  nghiÃªn cá»©u tráº».",
    "Structured contact between companies, universities and young researchers.",
  ),
  L(
    "Closer coordination among universities, agencies, innovation centers and semiconductor ecosystem stakeholders.",
    "TÄƒng má»©c phá»‘i há»£p giá»¯a trÆ°á»ng Ä‘áº¡i há»c, cÆ¡ quan, trung tÃ¢m Ä‘á»•i má»›i sÃ¡ng táº¡o vÃ  cÃ¡c bÃªn trong há»‡ sinh thÃ¡i bÃ¡n dáº«n.",
    "Closer coordination among universities, agencies, innovation centers and semiconductor ecosystem stakeholders.",
  ),
  L(
    "Documented sponsor value through brand visibility, recruitment access and partner meetings.",
    "GiÃ¡ trá»‹ Ä‘Æ°á»£c ghi nháº­n cho nhÃ  tÃ i trá»£ thÃ´ng qua Ä‘á»™ hiá»‡n diá»‡n thÆ°Æ¡ng hiá»‡u, kháº£ nÄƒng tiáº¿p cáº­n tuyá»ƒn dá»¥ng vÃ  cÃ¡c cuá»™c gáº·p Ä‘á»‘i tÃ¡c.",
    "Documented sponsor value through brand visibility, recruitment access and partner meetings.",
  ),
];

export const speakers = [
  {
    id: "nguyen-hoang-oanh",
    name: "Dr. Nguyen Hoang Oanh",
    role: S("Rector"),
    organization: S("Vietnam Japan University"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "opening-ceremony",
    topic: S("Conference leadership and host direction"),
    summary: S(
      "Conference chair leading the Hanoi edition and the host-side institutional coordination.",
    ),
    bio: S(
      "Named in the committee workbook as symposium chair and organizing-committee lead for VJSS 2026, representing the host university.",
    ),
    image: makePlaceholderImage("Nguyen Hoang Oanh", "#991b1b"),
  },
  {
    id: "toshiro-hiramoto",
    name: "Prof. Toshiro Hiramoto",
    role: S("JST NEXUS Program Officer"),
    organization: S("Japan Science and Technology Agency"),
    country: "Japan",
    kind: "government" as SpeakerKind,
    sessionId: "nexus-session",
    topic: S("NEXUS alignment and bilateral program development"),
    summary: S(
      "Working conference chair on the Japan side and a key figure for NEXUS-linked collaboration planning.",
    ),
    bio: S(
      "Listed in the outreach proposal as conference chair to confirm, with a central role in connecting VJSS 2026 to JST NEXUS activities.",
    ),
    image: makePlaceholderImage("Toshiro Hiramoto", "#1d4ed8"),
  },
  {
    id: "le-duc-anh",
    name: "Assoc. Prof. Le Duc Anh",
    role: S("Associate Professor"),
    organization: S("The University of Tokyo"),
    country: "Vietnam-Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "nexus-session",
    topic: S("Academic liaison and invited-speaker outreach"),
    summary: S(
      "Academic liaison for the planning package and a bridge between Vietnam and Japan research communities.",
    ),
    bio: S(
      "Appears in the organizing structure and the suggested contact block, supporting academic coordination and speaker engagement.",
    ),
    image: makePlaceholderImage("Le Duc Anh", "#0f766e"),
  },
  {
    id: "bui-nguyen-quoc-trinh",
    name: "Assoc. Prof. Dr. Bui Nguyen Quoc Trinh",
    role: S("Director of ESCT"),
    organization: S("Vietnam Japan University"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "opening-ceremony",
    topic: S("Scientific coordination and host execution"),
    summary: S("Core organizing and scientific-committee lead for VJSS 2026 on the Vietnam side."),
    bio: S(
      "Appears across the organizing, local and scientific rosters, and is named in the proposal's academic contact block.",
    ),
    image: makePlaceholderImage("Bui Nguyen Quoc Trinh", "#7c3aed"),
  },
  {
    id: "pham-tien-thanh",
    name: "Dr. Pham Tien Thanh",
    role: S("Vice Dean of FATE"),
    organization: S("Vietnam Japan University"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    topic: S("Local committee coordination and program execution"),
    summary: S(
      "Local-committee member and scientific-committee contributor supporting day-to-day program planning.",
    ),
    bio: S(
      "Listed in both the local committee and scientific committee, with responsibilities spanning operations and academic coordination.",
    ),
    image: makePlaceholderImage("Pham Tien Thanh", "#b45309"),
  },
  {
    id: "tran-xuan-tu",
    name: "Prof. Dr. Tran Xuan Tu",
    role: S("Professor"),
    organization: S("VNU Information Technology Institute"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-1",
    topic: S("Integrated circuit design and verification"),
    summary: S("Confirmed contributor for the IC design and verification track."),
    bio: S(
      "Named in the committee workbook as a confirmed chair or contributor for the Integrated Circuit Design and Verification theme.",
    ),
    image: makePlaceholderImage("Tran Xuan Tu", "#1e40af"),
  },
  {
    id: "bui-duy-hieu",
    name: "Dr. Bui Duy Hieu",
    role: S("Researcher"),
    organization: S("VNU Information Technology Institute"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-2",
    topic: S("Verification and hardware systems"),
    summary: S("Confirmed track contributor for the IC design and verification theme."),
    bio: S(
      "Named in the committee workbook as a confirmed contributor for the Integrated Circuit Design and Verification session.",
    ),
    image: makePlaceholderImage("Bui Duy Hieu", "#0f766e"),
  },
  {
    id: "tran-quoc-tien",
    name: "Assoc. Prof. Dr. Tran Quoc Tien",
    role: S("Associate Professor"),
    organization: S("Vietnam Academy of Science and Technology"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-1",
    topic: S("Optoelectronic devices and semiconductor chip technology"),
    summary: S("Confirmed chair or contributor for the optoelectronics and chip-technology theme."),
    bio: S(
      "The Vietnam-side committee workbook lists him as a confirmed contributor in the Optoelectronic Devices and Semiconductor Chip Technology track.",
    ),
    image: makePlaceholderImage("Tran Quoc Tien", "#9a3412"),
  },
  {
    id: "dao-thanh-toan",
    name: "Assoc. Prof. Dr. Dao Thanh Toan",
    role: S("Associate Professor"),
    organization: S("University of Transport and Communications"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-1",
    topic: S("Optoelectronic devices and device applications"),
    summary: S("Confirmed contributor for the optoelectronics theme on the Vietnam-side roster."),
    bio: S(
      "Listed as a confirmed track contributor for Optoelectronic Devices and Semiconductor Chip Technology.",
    ),
    image: makePlaceholderImage("Dao Thanh Toan", "#4338ca"),
  },
  {
    id: "nguyen-ngoc-dinh",
    name: "Assoc. Prof. Dr. Nguyen Ngoc Dinh",
    role: S("Associate Professor"),
    organization: S("VNU Hanoi University of Science"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-1",
    topic: S("Advanced materials design and smart processing"),
    summary: S("Confirmed contributor in the advanced materials and smart-processing theme."),
    bio: S(
      "Listed in the committee workbook as a confirmed contributor for the Advanced Materials Design and Smart Processing track.",
    ),
    image: makePlaceholderImage("Nguyen Ngoc Dinh", "#0f766e"),
  },
  {
    id: "nguyen-tran-thuat",
    name: "Assoc. Prof. Dr. Nguyen Tran Thuat",
    role: S("Associate Professor"),
    organization: S("VNU Semiconductor and Advanced Material Institute"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "plenary-session-2",
    topic: S("Advanced packaging and testing"),
    summary: S("Confirmed contributor for the advanced packaging and testing theme."),
    bio: S(
      "The working roster names him as a confirmed chair or contributor for packaging, testing and related advanced-material links.",
    ),
    image: makePlaceholderImage("Nguyen Tran Thuat", "#1d4ed8"),
  },
  {
    id: "le-van-lich",
    name: "Assoc. Prof. Dr. Le Van Lich",
    role: S("Associate Professor"),
    organization: S("VinUniversity"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-1",
    topic: S("AI and quantum computing in semiconductors"),
    summary: S("Confirmed contributor in the AI and quantum computing track."),
    bio: S(
      "Listed as a confirmed chair or contributor for the AI and Quantum Computing in Semiconductors theme.",
    ),
    image: makePlaceholderImage("Le Van Lich", "#7c2d12"),
  },
  {
    id: "nguyen-ngoc-linh",
    name: "Dr. Nguyen Ngoc Linh",
    role: S("Researcher"),
    organization: S("Phenikaa University"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-2",
    topic: S("AI, quantum and emerging compute directions"),
    summary: S("Confirmed contributor in the AI and quantum track."),
    bio: S(
      "Named in the committee workbook as a confirmed contributor for the AI and Quantum Computing in Semiconductors theme.",
    ),
    image: makePlaceholderImage("Nguyen Ngoc Linh", "#0369a1"),
  },
  {
    id: "le-van-hai",
    name: "Dr. Le Van Hai",
    role: S("Researcher"),
    organization: S("Vietnam Government Information Security Commission"),
    country: "Vietnam",
    kind: "government" as SpeakerKind,
    sessionId: "plenary-session-2",
    topic: S("Emerging technologies in semiconductor frontiers"),
    summary: S(
      "Confirmed contributor bridging frontier technologies and information-security perspectives.",
    ),
    bio: S(
      "Listed as a confirmed contributor for Emerging Technologies in Semiconductor Frontiers in the Vietnam-side committee workbook.",
    ),
    image: makePlaceholderImage("Le Van Hai", "#be123c"),
  },
  {
    id: "nguyen-chung-hoa",
    name: "Prof. Dr. Nguyen Chung Hoa",
    role: S("Professor"),
    organization: S("Hanoi University of Science and Technology"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "plenary-session-1",
    topic: S("Frontier semiconductor platforms and emerging technologies"),
    summary: S("Confirmed contributor in the emerging-technologies track."),
    bio: S(
      "The Vietnam-side workbook lists him as a confirmed contributor for Emerging Technologies in Semiconductor Frontiers.",
    ),
    image: makePlaceholderImage("Nguyen Chung Hoa", "#0f766e"),
  },
  {
    id: "dang-thanh-tu",
    name: "Dr. Dang Thanh Tu",
    role: S("Researcher"),
    organization: S("Vietnam Japan University"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "lecture-session",
    topic: S("Human resource development and academic-industrial collaboration"),
    summary: S("Working contributor on talent development and academic-industry collaboration."),
    bio: S(
      "Named in the committee workbook under the Human Resource Development and Academic-Industrial Collaboration theme.",
    ),
    image: makePlaceholderImage("Dang Thanh Tu", "#a16207"),
  },
  {
    id: "luong-minh-phuong",
    name: "Dr. Luong Minh Phuong",
    role: S("Researcher"),
    organization: S("Vietnam Japan University"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "study-abroad-job-orientation",
    topic: S("Education, training and workforce pathways"),
    summary: S("Working contributor on education and workforce-development content."),
    bio: S(
      "Listed in the planning workbook under Human Resource Development and Academic-Industrial Collaboration.",
    ),
    image: makePlaceholderImage("Luong Minh Phuong", "#6d28d9"),
  },
  {
    id: "huynh-van-nhat",
    name: "Dr. Huynh Van Nhat",
    role: S("Industry representative"),
    organization: S("Sony Semiconductors"),
    country: "Japan",
    kind: "industry" as SpeakerKind,
    sessionId: "study-abroad-job-orientation",
    topic: S("Industry dialogue, sponsorship and workforce engagement"),
    summary: S(
      "Named in the proposal under sponsorship and external relations, bringing the industry view into outreach and workforce dialogue.",
    ),
    bio: S(
      "The outreach proposal places him in the Sponsorship and External Relations function, connecting sponsor outreach with industry participation.",
    ),
    image: makePlaceholderImage("Huynh Van Nhat", "#1f2937"),
  },
];

export const featuredSpeakerIds = [
  "nguyen-hoang-oanh",
  "toshiro-hiramoto",
  "le-duc-anh",
  "huynh-van-nhat",
];

export const speakerKindLabels = {
  all: L("All", "Táº¥t cáº£", "All"),
  government: L("Government / public", "CÆ¡ quan cÃ´ng", "Government / public"),
  academia: L("Academia", "Há»c thuáº­t", "Academia"),
  industry: L("Industry", "Doanh nghiá»‡p", "Industry"),
};

export const speakerCountryLabels: Record<string, LocalizedText> = {
  all: L("All locations", "Táº¥t cáº£ khu vá»±c", "All locations"),
  Vietnam: L("Vietnam", "Viá»‡t Nam", "Vietnam"),
  Japan: L("Japan", "Nháº­t Báº£n", "Japan"),
  "Vietnam-Japan": L(
    "Vietnam-Japan bridge",
    "Cáº§u ná»‘i Viá»‡t Nam - Nháº­t Báº£n",
    "Vietnam-Japan bridge",
  ),
};

export type SpeakerRecord = (typeof speakers)[number];

export const venueReference = {
  name: "Hanoi, Vietnam",
  address: S(
    "Final venue under review: Vietnam Japan University (VNU-VJU) or Sheraton Hanoi West Hotel",
  ),
  description: L(
    "Hanoi is the confirmed host city for the symposium, partner meetings, site visits and NEXUS activities.",
    "HÃ  Ná»™i lÃ  thÃ nh phá»‘ chá»§ trÃ¬ Ä‘Ã£ Ä‘Æ°á»£c xÃ¡c nháº­n cho há»™i nghá»‹, cÃ¡c cuá»™c gáº·p Ä‘á»‘i tÃ¡c, site visit vÃ  hoáº¡t Ä‘á»™ng NEXUS.",
    "Hanoi is the confirmed host city for the symposium, partner meetings, site visits and NEXUS activities.",
  ),
  mapEmbed: "https://maps.google.com/maps?q=Hanoi%20Vietnam&z=11&hl=en&t=m&output=embed&iwloc=near",
  mapLink: "https://maps.google.com/?q=Hanoi+Vietnam",
};

export const venueDirections = [
  {
    title: L("Format and access", "HÃ¬nh thá»©c vÃ  tiáº¿p cáº­n", "Format and access"),
    body: L(
      "The event is planned as an in-person conference with hybrid participation. Venue fit will be judged against room capacity, AV requirements and sponsor-supported activities.",
      "Sá»± kiá»‡n Ä‘Æ°á»£c lÃªn káº¿ hoáº¡ch theo hÃ¬nh thá»©c trá»±c tiáº¿p káº¿t há»£p hybrid. Äá»‹a Ä‘iá»ƒm sáº½ Ä‘Æ°á»£c Ä‘Ã¡nh giÃ¡ theo sá»©c chá»©a, yÃªu cáº§u AV vÃ  kháº£ nÄƒng há»— trá»£ cÃ¡c hoáº¡t Ä‘á»™ng cÃ¹ng nhÃ  tÃ i trá»£.",
      "The event is planned as an in-person conference with hybrid participation. Venue fit will be judged against room capacity, AV requirements and sponsor-supported activities.",
    ),
  },
  {
    title: L("Operational dependencies", "Phá»¥ thuá»™c váº­n hÃ nh", "Operational dependencies"),
    body: L(
      "Hybrid platform, recording policy and language / interpretation support remain open decisions and will affect venue setup.",
      "Ná»n táº£ng hybrid, chÃ­nh sÃ¡ch ghi hÃ¬nh vÃ  há»— trá»£ ngÃ´n ngá»¯ / phiÃªn dá»‹ch váº«n Ä‘ang chá» quyáº¿t Ä‘á»‹nh vÃ  sáº½ áº£nh hÆ°á»Ÿng trá»±c tiáº¿p Ä‘áº¿n cáº¥u hÃ¬nh Ä‘á»‹a Ä‘iá»ƒm.",
      "Hybrid platform, recording policy and language / interpretation support remain open decisions and will affect venue setup.",
    ),
  },
  {
    title: L("Site-visit integration", "TÃ­ch há»£p site visit", "Site-visit integration"),
    body: L(
      "September 22 and 23 are reserved for site visits, ecosystem meetings and the NEXUS session, so logistics planning must cover movement beyond the conference hall.",
      "NgÃ y 22 vÃ  23/9 dÃ nh cho site visit, gáº·p gá»¡ há»‡ sinh thÃ¡i vÃ  NEXUS session, vÃ¬ váº­y káº¿ hoáº¡ch háº­u cáº§n pháº£i bao quÃ¡t cáº£ di chuyá»ƒn ngoÃ i khu vá»±c há»™i trÆ°á»ng.",
      "September 22 and 23 are reserved for site visits, ecosystem meetings and the NEXUS session, so logistics planning must cover movement beyond the conference hall.",
    ),
  },
];

export const venueHotels = [
  {
    area: S("Vietnam Japan University (VNU-VJU)"),
    description: L(
      "University-hosted option aligned with academic identity, campus-based scheduling and institutional visibility.",
      "PhÆ°Æ¡ng Ã¡n tá»• chá»©c táº¡i trÆ°á»ng Ä‘áº¡i há»c, phÃ¹ há»£p vá»›i báº£n sáº¯c há»c thuáº­t, lá»‹ch trÃ¬nh trÃªn campus vÃ  má»©c Ä‘á»™ hiá»‡n diá»‡n thá»ƒ cháº¿.",
      "University-hosted option aligned with academic identity, campus-based scheduling and institutional visibility.",
    ),
  },
  {
    area: S("Sheraton Hanoi West Hotel"),
    description: L(
      "Hotel-conference option aligned with hospitality support, sponsor hosting and compact event operations.",
      "PhÆ°Æ¡ng Ã¡n khÃ¡ch sáº¡n - há»™i nghá»‹, phÃ¹ há»£p vá»›i há»— trá»£ lÆ°u trÃº, hoáº¡t Ä‘á»™ng tiáº¿p Ä‘Ã³n nhÃ  tÃ i trá»£ vÃ  váº­n hÃ nh sá»± kiá»‡n táº­p trung.",
      "Hotel-conference option aligned with hospitality support, sponsor hosting and compact event operations.",
    ),
  },
  {
    area: S("Site-visit hosts"),
    description: L(
      "Local semiconductor facilities, laboratories, innovation centers or industrial parks remain under coordination for the September 22-23 program.",
      "CÃ¡c cÆ¡ sá»Ÿ bÃ¡n dáº«n, phÃ²ng thÃ­ nghiá»‡m, trung tÃ¢m Ä‘á»•i má»›i sÃ¡ng táº¡o hoáº·c khu cÃ´ng nghiá»‡p táº¡i Ä‘á»‹a phÆ°Æ¡ng váº«n Ä‘ang Ä‘Æ°á»£c Ä‘iá»u phá»‘i cho chÆ°Æ¡ng trÃ¬nh ngÃ y 22-23/9.",
      "Local semiconductor facilities, laboratories, innovation centers or industrial parks remain under coordination for the September 22-23 program.",
    ),
  },
];

export const venueVisitorNotes = [
  {
    audience: L("Delegates", "Äáº¡i biá»ƒu tham dá»±", "Delegates"),
    note: L(
      "Travel and access guidance should be published only after the venue and site-visit hosts are confirmed.",
      "HÆ°á»›ng dáº«n di chuyá»ƒn vÃ  tiáº¿p cáº­n chá»‰ nÃªn cÃ´ng bá»‘ sau khi Ä‘á»‹a Ä‘iá»ƒm vÃ  Ä‘Æ¡n vá»‹ tiáº¿p Ä‘Ã³n site visit Ä‘Æ°á»£c xÃ¡c nháº­n.",
      "Travel and access guidance should be published only after the venue and site-visit hosts are confirmed.",
    ),
  },
  {
    audience: L(
      "Sponsors and partners",
      "NhÃ  tÃ i trá»£ vÃ  Ä‘á»‘i tÃ¡c",
      "Sponsors and partners",
    ),
    note: L(
      "The venue decision should consider luncheon formats, exhibition tables, partner meetings and recognition moments during opening and closing sessions.",
      "Quyáº¿t Ä‘á»‹nh vá» Ä‘á»‹a Ä‘iá»ƒm cáº§n xÃ©t tá»›i khung luncheon, khu trÆ°ng bÃ y, cÃ¡c buá»•i gáº·p Ä‘á»‘i tÃ¡c vÃ  thá»i Ä‘iá»ƒm vinh danh trong phiÃªn khai máº¡c - báº¿ máº¡c.",
      "The venue decision should consider luncheon formats, exhibition tables, partner meetings and recognition moments during opening and closing sessions.",
    ),
  },
  {
    audience: L(
      "Speakers and committees",
      "Diá»…n giáº£ vÃ  cÃ¡c committee",
      "Speakers and committees",
    ),
    note: L(
      "Travel support policy, recording consent and interpretation support should be finalized before formal confirmations are sent.",
      "ChÃ­nh sÃ¡ch há»— trá»£ Ä‘i láº¡i, cháº¥p thuáº­n ghi hÃ¬nh vÃ  há»— trá»£ phiÃªn dá»‹ch nÃªn Ä‘Æ°á»£c chá»‘t trÆ°á»›c khi gá»­i xÃ¡c nháº­n chÃ­nh thá»©c.",
      "Travel support policy, recording consent and interpretation support should be finalized before formal confirmations are sent.",
    ),
  },
];

export const ecosystemGroups: OrganizationGroup[] = [
  {
    id: "hosts",
    title: L("Hosted by", "ÄÆ¡n vá»‹ chá»§ trÃ¬", "Hosted by"),
    items: [
      {
        name: "Vietnam Japan University (VJU)",
        meta: S("Host organization"),
        description: L(
          "Primary host institution for the Hanoi edition and the operational anchor for venue planning and local coordination.",
          "ÄÆ¡n vá»‹ chá»§ trÃ¬ chÃ­nh cá»§a phiÃªn báº£n HÃ  Ná»™i vÃ  lÃ  Ä‘áº§u má»‘i váº­n hÃ nh cho láº­p káº¿ hoáº¡ch Ä‘á»‹a Ä‘iá»ƒm cÅ©ng nhÆ° Ä‘iá»u phá»‘i táº¡i chá»—.",
          "Primary host institution for the Hanoi edition and the operational anchor for venue planning and local coordination.",
        ),
      },
      {
        name: "Association of Vietnamese Intellectuals in Japan (AVIJ)",
        meta: S("Co-host network"),
        description: L(
          "Vietnam-Japan intellectual network supporting partner outreach and bilateral visibility.",
          "Máº¡ng lÆ°á»›i trÃ­ thá»©c Viá»‡t Nam táº¡i Nháº­t há»— trá»£ outreach Ä‘á»‘i tÃ¡c vÃ  tÄƒng hiá»‡n diá»‡n song phÆ°Æ¡ng.",
          "Vietnam-Japan intellectual network supporting partner outreach and bilateral visibility.",
        ),
      },
      {
        name: "Vietnamese Academic Network in Japan (VANJ)",
        meta: S("Co-host network"),
        description: L(
          "Academic network contributing to outreach, speaker engagement and sponsorship-facing communication.",
          "Máº¡ng lÆ°á»›i há»c thuáº­t há»— trá»£ outreach, káº¿t ná»‘i diá»…n giáº£ vÃ  truyá»n thÃ´ng hÆ°á»›ng tá»›i nhÃ  tÃ i trá»£.",
          "Academic network contributing to outreach, speaker engagement and sponsorship-facing communication.",
        ),
      },
    ],
  },
  {
    id: "patrons",
    title: L("Patrons", "ÄÆ¡n vá»‹ báº£o trá»£", "Patrons"),
    items: [
      {
        name: "Japan Science and Technology Agency (JST)",
        meta: S("Patron"),
        description: L(
          "Named patron and institutional anchor for JST NEXUS participation in the 2026 plan.",
          "ÄÆ¡n vá»‹ báº£o trá»£ Ä‘Æ°á»£c nÃªu Ä‘Ã­ch danh vÃ  lÃ  Ä‘iá»ƒm tá»±a thá»ƒ cháº¿ cho sá»± tham gia cá»§a JST NEXUS trong káº¿ hoáº¡ch 2026.",
          "Named patron and institutional anchor for JST NEXUS participation in the 2026 plan.",
        ),
      },
      {
        name: "National Innovation Center (NIC), Vietnam",
        meta: S("Patron"),
        description: L(
          "Innovation-system patron supporting ecosystem visibility and public-sector engagement.",
          "ÄÆ¡n vá»‹ báº£o trá»£ thuá»™c há»‡ Ä‘á»•i má»›i sÃ¡ng táº¡o, gÃ³p pháº§n tÄƒng hiá»‡n diá»‡n há»‡ sinh thÃ¡i vÃ  káº¿t ná»‘i khu vá»±c cÃ´ng.",
          "Innovation-system patron supporting ecosystem visibility and public-sector engagement.",
        ),
      },
    ],
  },
  {
    id: "external-relations",
    title: L(
      "Sponsorship and external relations",
      "TÃ i trá»£ vÃ  Ä‘á»‘i ngoáº¡i",
      "Sponsorship and external relations",
    ),
    items: [
      {
        name: "VANJ",
        meta: S("Outreach channel"),
        description: L(
          "Supports sponsor outreach, partner relationship management and external-facing communication.",
          "Há»— trá»£ outreach nhÃ  tÃ i trá»£, quáº£n trá»‹ quan há»‡ Ä‘á»‘i tÃ¡c vÃ  truyá»n thÃ´ng hÆ°á»›ng ra bÃªn ngoÃ i.",
          "Supports sponsor outreach, partner relationship management and external-facing communication.",
        ),
      },
      {
        name: "Dr. Huynh Van Nhat, Sony Semiconductors",
        meta: S("Industry link"),
        description: L(
          "Industry-facing bridge for sponsorship conversations, workforce dialogue and company participation.",
          "Cáº§u ná»‘i vá»›i doanh nghiá»‡p cho cÃ¡c trao Ä‘á»•i vá» tÃ i trá»£, Ä‘á»‘i thoáº¡i nguá»“n nhÃ¢n lá»±c vÃ  sá»± tham gia cá»§a cÃ´ng ty.",
          "Industry-facing bridge for sponsorship conversations, workforce dialogue and company participation.",
        ),
      },
    ],
  },
];

export const committeeGroups: CommitteeGroup[] = [
  {
    id: "leadership",
    title: L(
      "Leadership and organizing committee",
      "LÃ£nh Ä‘áº¡o vÃ  organizing committee",
      "Leadership and organizing committee",
    ),
    members: [
      {
        name: "Dr. Nguyen Hoang Oanh",
        role: S("Conference Chair"),
        affiliation: S("Rector, Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Prof. Toshiro Hiramoto",
        role: S("Conference Chair"),
        affiliation: S("JST NEXUS Program Officer"),
        status: S("To confirm"),
      },
      {
        name: "Assoc. Prof. Dr. Bui Nguyen Quoc Trinh",
        role: S("Organizing Committee"),
        affiliation: S("Director of ESCT, Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Assoc. Prof. Le Duc Anh",
        role: S("Organizing Committee"),
        affiliation: S("The University of Tokyo"),
        status: S("Confirmed"),
      },
      {
        name: "Advisory Committee",
        role: S("To be nominated"),
        affiliation: S("Senior academic, industry and public-sector advisors"),
        status: S("Pending"),
      },
    ],
  },
  {
    id: "scientific",
    title: L("Scientific committee", "Scientific committee", "Scientific committee"),
    members: [
      {
        name: "Assoc. Prof. Dr. Bui Nguyen Quoc Trinh",
        role: S("Scientific Committee"),
        affiliation: S("Director of ESCT, Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Pham Tien Thanh",
        role: S("Scientific Committee"),
        affiliation: S("Vice Dean of FATE, Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Le Kim Quy",
        role: S("Scientific Committee"),
        affiliation: S("Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Assistant Prof. Nakamoto Trang",
        role: S("Scientific Committee"),
        affiliation: S("Ritsumeikan University"),
        status: S("Confirmed"),
      },
      {
        name: "Assistant Prof. Nguyen Thi Van Anh",
        role: S("Scientific Committee"),
        affiliation: S("Tohoku University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Ngo Huynh Nguyen",
        role: S("Scientific Committee"),
        affiliation: S("Osaka University"),
        status: S("Confirmed"),
      },
      {
        name: "Assistant Prof. Nguyen Thi Thanh Ngan",
        role: S("Scientific Committee"),
        affiliation: S("Tohoku University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Huynh Van Nhat",
        role: S("Scientific Committee"),
        affiliation: S("Sony Semiconductors"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Ngo Minh Chu",
        role: S("Scientific Committee"),
        affiliation: S("AIST"),
        status: S("To confirm"),
      },
    ],
  },
  {
    id: "local",
    title: L("Local committee", "Local committee", "Local committee"),
    members: [
      {
        name: "Dr. Pham Tien Thanh",
        role: S("Local Committee"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Dr. Do Ngoc Ha",
        role: S("Local Committee"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Assoc. Prof. Dr. Bui Nguyen Quoc Trinh",
        role: S("Local Committee"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Assoc. Prof. Dr. Nguyen Thi An Hang",
        role: S("Local Committee"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Dr. Vu Quang Viet",
        role: S("Local Committee"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Dr. Ta Quang Ngoc",
        role: S("Local Committee"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Dr. Duong Huu Toan",
        role: S("Local Committee"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
    ],
  },
  {
    id: "secretariat",
    title: L("Secretariat", "Ban thÆ° kÃ½", "Secretariat"),
    members: [
      {
        name: "Bui Thu Trang",
        role: S("Secretariat"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Bui The Trung",
        role: S("Secretariat"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Nguyen Van Loi",
        role: S("Secretariat"),
        affiliation: S("Academy of Cryptography Techniques"),
        status: S("Listed"),
      },
      {
        name: "Nguyen Thi Huong",
        role: S("Secretariat"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Nguyen Tien Tao",
        role: S("Secretariat"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Pham Duc Anh",
        role: S("Secretariat"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Vu Quang Viet",
        role: S("Secretariat"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
    ],
  },
  {
    id: "themes",
    title: L(
      "Thematic session chairs and contributors",
      "NhÃ³m trÆ°á»Ÿng track vÃ  thÃ nh pháº§n Ä‘Ã³ng gÃ³p",
      "Thematic session chairs and contributors",
    ),
    description: L(
      "These theme rosters come directly from the uploaded working files and should remain editable as confirmations arrive.",
      "CÃ¡c roster theo chá»§ Ä‘á» nÃ y Ä‘Æ°á»£c láº¥y trá»±c tiáº¿p tá»« file lÃ m viá»‡c Ä‘Ã£ táº£i lÃªn vÃ  cáº§n tiáº¿p tá»¥c Ä‘á»ƒ tráº¡ng thÃ¡i editable khi cÃ³ thÃªm xÃ¡c nháº­n.",
      "These theme rosters come directly from the uploaded working files and should remain editable as confirmations arrive.",
    ),
    members: [
      {
        name: "Integrated Circuit Design and Verification",
        role: S("Track chairs / contributors"),
        affiliation: S(
          "Prof. Makoto Ikeda; Prof. Ken Takeuchi; Prof. Pham Cong Kha; Prof. Tran Xuan Tu; Dr. Bui Duy Hieu",
        ),
        status: S("Working roster"),
      },
      {
        name: "Emerging Technologies in Semiconductor Frontiers",
        role: S("Track chairs / contributors"),
        affiliation: S(
          "Prof. Masakazu Nakamura; Prof. Tsutomu Araki; Prof. Nguyen Chung Hoa; Dr. Le Van Hai; Assoc. Prof. Duong Thanh Tung",
        ),
        status: S("Working roster"),
      },
      {
        name: "AI and Quantum Computing in Semiconductors",
        role: S("Track chairs / contributors"),
        affiliation: S("Assoc. Prof. Le Duc Anh; Assoc. Prof. Le Van Lich; Dr. Nguyen Ngoc Linh"),
        status: S("Working roster"),
      },
      {
        name: "Advanced Materials Design and Smart Processing",
        role: S("Track chairs / contributors"),
        affiliation: S(
          "Prof. Shinichiro Kuroki; Assoc. Prof. Nguyen Ngoc Dinh; Assoc. Prof. Do Danh Bich; Dr. Do Hong Minh",
        ),
        status: S("Working roster"),
      },
      {
        name: "Advanced Packaging and Testing",
        role: S("Track chairs / contributors"),
        affiliation: S("Assoc. Prof. Nguyen Tran Thuat; Assoc. Prof. Pham Van Thanh"),
        status: S("Working roster"),
      },
      {
        name: "Optoelectronic Devices and Semiconductor Chip Technology",
        role: S("Track chairs / contributors"),
        affiliation: S(
          "Assoc. Prof. Tran Quoc Tien; Assoc. Prof. Dao Thanh Toan; Prof. Mitsuru Takenaka",
        ),
        status: S("Working roster"),
      },
      {
        name: "Human Resource Development and Academic-Industrial Collaboration",
        role: S("Track chairs / contributors"),
        affiliation: S(
          "Dr. Dang Thanh Tu; Dr. Luong Minh Phuong; Dr. Huynh Duy Nhat; Nguyen Hoang Dao",
        ),
        status: S("Working roster"),
      },
    ],
  },
];

export const sponsorEngagementRoutes: SponsorRoute[] = [
  {
    goal: L("Talent pipeline", "DÃ²ng cháº£y nhÃ¢n lá»±c", "Talent pipeline"),
    engagement: L(
      "Career session, student lecture support, booth, recruitment networking and mentoring table.",
      "Äá»“ng hÃ nh phiÃªn nghá» nghiá»‡p, há»— trá»£ bÃ i giáº£ng cho sinh viÃªn, booth, networking tuyá»ƒn dá»¥ng vÃ  mentoring table.",
      "Career session, student lecture support, booth, recruitment networking and mentoring table.",
    ),
  },
  {
    goal: L("Research collaboration", "Há»£p tÃ¡c nghiÃªn cá»©u", "Research collaboration"),
    engagement: L(
      "Technical-session participation, university meetings, NEXUS networking and site-visit discussions.",
      "Tham gia phiÃªn ká»¹ thuáº­t, há»p vá»›i trÆ°á»ng Ä‘áº¡i há»c, networking trong khuÃ´n khá»• NEXUS vÃ  tháº£o luáº­n táº¡i cÃ¡c Ä‘iá»ƒm site visit.",
      "Technical-session participation, university meetings, NEXUS networking and site-visit discussions.",
    ),
  },
  {
    goal: L(
      "Brand and ecosystem visibility",
      "Hiá»‡n diá»‡n thÆ°Æ¡ng hiá»‡u vÃ  há»‡ sinh thÃ¡i",
      "Brand and ecosystem visibility",
    ),
    engagement: L(
      "Logo placement, opening and closing recognition, media materials and program-booklet exposure.",
      "Hiá»ƒn thá»‹ logo, vinh danh trong khai máº¡c vÃ  báº¿ máº¡c, xuáº¥t hiá»‡n trÃªn tÃ i liá»‡u truyá»n thÃ´ng vÃ  booklet chÆ°Æ¡ng trÃ¬nh.",
      "Logo placement, opening and closing recognition, media materials and program-booklet exposure.",
    ),
  },
  {
    goal: L("Thought leadership", "Dáº«n dáº¯t chuyÃªn mÃ´n", "Thought leadership"),
    engagement: L(
      "Panel participation, industry remarks, invited lecture or a sponsored discussion where appropriate.",
      "Tham gia panel, phÃ¡t biá»ƒu cá»§a doanh nghiá»‡p, bÃ i giáº£ng invited hoáº·c má»™t cuá»™c tháº£o luáº­n Ä‘Æ°á»£c tÃ i trá»£ náº¿u phÃ¹ há»£p.",
      "Panel participation, industry remarks, invited lecture or a sponsored discussion where appropriate.",
    ),
  },
  {
    goal: L(
      "Market and policy insight",
      "GÃ³c nhÃ¬n thá»‹ trÆ°á»ng vÃ  chÃ­nh sÃ¡ch",
      "Market and policy insight",
    ),
    engagement: L(
      "Dialogue with universities, public agencies, innovation centers and semiconductor ecosystem stakeholders.",
      "Äá»‘i thoáº¡i vá»›i trÆ°á»ng Ä‘áº¡i há»c, cÆ¡ quan cÃ´ng, trung tÃ¢m Ä‘á»•i má»›i sÃ¡ng táº¡o vÃ  cÃ¡c bÃªn trong há»‡ sinh thÃ¡i bÃ¡n dáº«n.",
      "Dialogue with universities, public agencies, innovation centers and semiconductor ecosystem stakeholders.",
    ),
  },
];

export const sponsorTiers: SponsorTier[] = [
  {
    name: "Strategic Partner",
    amount: S("To be agreed"),
    contributionModel: L(
      "Major institutional or flagship sponsorship package.",
      "GÃ³i Ä‘á»“ng hÃ nh cáº¥p tá»• chá»©c hoáº·c tÃ i trá»£ mÅ©i nhá»n.",
      "Major institutional or flagship sponsorship package.",
    ),
    benefits: [
      L(
        "Top-tier recognition across core event materials",
        "Vinh danh á»Ÿ cáº¥p cao nháº¥t trÃªn cÃ¡c tÃ i liá»‡u chÃ­nh cá»§a sá»± kiá»‡n",
        "Top-tier recognition across core event materials",
      ),
      L(
        "Opening-ceremony acknowledgement and priority booth placement",
        "ÄÆ°á»£c nháº¯c tÃªn táº¡i khai máº¡c vÃ  Æ°u tiÃªn bá»‘ trÃ­ booth",
        "Opening-ceremony acknowledgement and priority booth placement",
      ),
      L(
        "Panel or invited-speaker role where relevant",
        "Vai trÃ² tham gia panel hoáº·c diá»…n giáº£ má»i khi phÃ¹ há»£p",
        "Panel or invited-speaker role where relevant",
      ),
      L(
        "Student engagement opportunity and post-event report",
        "CÆ¡ há»™i Ä‘á»“ng hÃ nh cÃ¹ng sinh viÃªn vÃ  bÃ¡o cÃ¡o sau sá»± kiá»‡n",
        "Student engagement opportunity and post-event report",
      ),
    ],
  },
  {
    name: "Platinum Sponsor",
    amount: S("5,000 USD or equivalent"),
    contributionModel: L(
      "Premium financial or in-kind contribution.",
      "ÄÃ³ng gÃ³p tÃ i chÃ­nh hoáº·c hiá»‡n váº­t á»Ÿ má»©c premium.",
      "Premium financial or in-kind contribution.",
    ),
    benefits: [
      L("Prominent logo placement", "Vá»‹ trÃ­ logo ná»•i báº­t", "Prominent logo placement"),
      L(
        "Exhibition table and banquet or reception acknowledgement",
        "BÃ n trÆ°ng bÃ y vÃ  vinh danh trong banquet hoáº·c reception",
        "Exhibition table and banquet or reception acknowledgement",
      ),
      L(
        "Speaking or panel opportunity subject to program fit",
        "CÆ¡ há»™i phÃ¡t biá»ƒu hoáº·c tham gia panel náº¿u phÃ¹ há»£p vá»›i chÆ°Æ¡ng trÃ¬nh",
        "Speaking or panel opportunity subject to program fit",
      ),
      L(
        "Student engagement opportunity and complimentary registrations",
        "CÆ¡ há»™i Ä‘á»“ng hÃ nh cÃ¹ng sinh viÃªn vÃ  suáº¥t Ä‘Äƒng kÃ½ miá»…n phÃ­",
        "Student engagement opportunity and complimentary registrations",
      ),
    ],
  },
  {
    name: "Gold Sponsor",
    amount: S("3,000 USD or equivalent"),
    contributionModel: L(
      "Standard financial or in-kind contribution.",
      "ÄÃ³ng gÃ³p tÃ i chÃ­nh hoáº·c hiá»‡n váº­t á»Ÿ má»©c tiÃªu chuáº©n.",
      "Standard financial or in-kind contribution.",
    ),
    benefits: [
      L("Logo placement", "Hiá»ƒn thá»‹ logo", "Logo placement"),
      L("Exhibition table", "BÃ n trÆ°ng bÃ y", "Exhibition table"),
      L("Session acknowledgement", "Ghi nháº­n trong phiÃªn", "Session acknowledgement"),
      L(
        "Networking access and selected complimentary registrations",
        "Quyá»n tham gia networking vÃ  má»™t sá»‘ suáº¥t Ä‘Äƒng kÃ½ miá»…n phÃ­",
        "Networking access and selected complimentary registrations",
      ),
    ],
  },
  {
    name: "Silver Sponsor",
    amount: S("1,000 USD or equivalent"),
    contributionModel: L(
      "Supporting contribution.",
      "Má»©c Ä‘Ã³ng gÃ³p há»— trá»£.",
      "Supporting contribution.",
    ),
    benefits: [
      L("Logo placement", "Hiá»ƒn thá»‹ logo", "Logo placement"),
      L("Program booklet listing", "ÄÆ°á»£c liá»‡t kÃª trong booklet", "Program booklet listing"),
      L(
        "Poster or exhibition visibility",
        "Hiá»‡n diá»‡n á»Ÿ poster hoáº·c khu trÆ°ng bÃ y",
        "Poster or exhibition visibility",
      ),
      L("Networking access", "Quyá»n tham gia networking", "Networking access"),
    ],
  },
  {
    name: "In-kind Partner",
    amount: S("Value-based"),
    contributionModel: L(
      "Venue, AV, media, hospitality, travel, translation, printing or logistics support.",
      "Äá»“ng hÃ nh báº±ng Ä‘á»‹a Ä‘iá»ƒm, AV, truyá»n thÃ´ng, hospitality, há»— trá»£ di chuyá»ƒn, phiÃªn dá»‹ch, in áº¥n hoáº·c háº­u cáº§n.",
      "Venue, AV, media, hospitality, travel, translation, printing or logistics support.",
    ),
    benefits: [
      L(
        "Recognition aligned with contribution value and role",
        "Ghi nháº­n tÆ°Æ¡ng xá»©ng vá»›i giÃ¡ trá»‹ vÃ  vai trÃ² Ä‘Ã³ng gÃ³p",
        "Recognition aligned with contribution value and role",
      ),
      L(
        "Integration into event materials where relevant",
        "ÄÆ°á»£c tÃ­ch há»£p vÃ o cÃ¡c tÃ i liá»‡u sá»± kiá»‡n khi phÃ¹ há»£p",
        "Integration into event materials where relevant",
      ),
    ],
  },
];

export const sponsorDeliverables = [
  L(
    "Logo placement on selected event materials, website or registration pages, backdrops and the program booklet.",
    "Hiá»ƒn thá»‹ logo trÃªn cÃ¡c tÃ i liá»‡u phÃ¹ há»£p cá»§a sá»± kiá»‡n, website hoáº·c trang Ä‘Äƒng kÃ½, backdrop vÃ  booklet chÆ°Æ¡ng trÃ¬nh.",
    "Logo placement on selected event materials, website or registration pages, backdrops and the program booklet.",
  ),
  L(
    "Exhibition or information table where venue layout permits.",
    "Khu trÆ°ng bÃ y hoáº·c bÃ n thÃ´ng tin náº¿u máº·t báº±ng Ä‘á»‹a Ä‘iá»ƒm cho phÃ©p.",
    "Exhibition or information table where venue layout permits.",
  ),
  L(
    "Recognition during opening and closing sessions and banquet according to tier.",
    "Vinh danh trong cÃ¡c phiÃªn khai máº¡c, báº¿ máº¡c vÃ  banquet theo háº¡ng má»¥c tÃ i trá»£.",
    "Recognition during opening and closing sessions and banquet according to tier.",
  ),
  L(
    "Opportunity to provide recruitment or technical materials to participants.",
    "CÆ¡ há»™i gá»­i tÃ i liá»‡u tuyá»ƒn dá»¥ng hoáº·c tÃ i liá»‡u ká»¹ thuáº­t tá»›i ngÆ°á»i tham dá»±.",
    "Opportunity to provide recruitment or technical materials to participants.",
  ),
  L(
    "Post-event summary including participation highlights, photos and sponsor visibility records where available.",
    "Báº£n tá»•ng káº¿t sau sá»± kiá»‡n bao gá»“m cÃ¡c Ä‘iá»ƒm nháº¥n vá» tham dá»±, hÃ¬nh áº£nh vÃ  há»“ sÆ¡ hiá»‡n diá»‡n cá»§a nhÃ  tÃ i trá»£ khi cÃ³ thá»ƒ cung cáº¥p.",
    "Post-event summary including participation highlights, photos and sponsor visibility records where available.",
  ),
];

export const submissionCards: CardCopy[] = [
  {
    title: L("Current status", "Tráº¡ng thÃ¡i hiá»‡n táº¡i", "Current status"),
    body: L(
      "The abstract and contributed-talk process is planned for June 2026. The detailed portal, template and review workflow are not public yet.",
      "Quy trÃ¬nh nháº­n abstract vÃ  contributed talk dá»± kiáº¿n má»Ÿ trong thÃ¡ng 6/2026. Portal, template vÃ  quy trÃ¬nh review chi tiáº¿t hiá»‡n chÆ°a cÃ´ng bá»‘ cÃ´ng khai.",
      "The abstract and contributed-talk process is planned for June 2026. The detailed portal, template and review workflow are not public yet.",
    ),
  },
  {
    title: L("Technical scope", "Pháº¡m vi ká»¹ thuáº­t", "Technical scope"),
    body: L(
      "Contributions are expected to align with the seven working themes already defined by the program committee.",
      "CÃ¡c bÃ i Ä‘Ã³ng gÃ³p dá»± kiáº¿n sáº½ bÃ¡m theo báº£y chá»§ Ä‘á» lÃ m viá»‡c Ä‘Ã£ Ä‘Æ°á»£c program committee xÃ¡c láº­p.",
      "Contributions are expected to align with the seven working themes already defined by the program committee.",
    ),
  },
  {
    title: L(
      "What will still be confirmed",
      "Nhá»¯ng gÃ¬ cÃ²n chá» xÃ¡c nháº­n",
      "What will still be confirmed",
    ),
    body: L(
      "Deadlines, templates, poster format, final session labels and the submission URL will be published after committee approval.",
      "Deadline, template, Ä‘á»‹nh dáº¡ng poster, tÃªn phiÃªn cuá»‘i cÃ¹ng vÃ  URL ná»™p bÃ i sáº½ Ä‘Æ°á»£c cÃ´ng bá»‘ sau khi ban chuyÃªn mÃ´n phÃª duyá»‡t.",
      "Deadlines, templates, poster format, final session labels and the submission URL will be published after committee approval.",
    ),
  },
];

export const registrationCards: CardCopy[] = [
  {
    title: L("Participation format", "HÃ¬nh thá»©c tham gia", "Participation format"),
    body: L(
      "The symposium is planned as an in-person event with hybrid participation options for selected sessions.",
      "Há»™i nghá»‹ Ä‘Æ°á»£c lÃªn káº¿ hoáº¡ch theo hÃ¬nh thá»©c trá»±c tiáº¿p, Ä‘á»“ng thá»i há»— trá»£ tham gia hybrid cho má»™t sá»‘ phiÃªn Ä‘Æ°á»£c lá»±a chá»n.",
      "The symposium is planned as an in-person event with hybrid participation options for selected sessions.",
    ),
  },
  {
    title: L("Target attendees", "NhÃ³m ngÆ°á»i tham dá»±", "Target attendees"),
    body: L(
      "Researchers, students, industry experts, public agencies, universities, innovation centers and JST NEXUS teams are all in scope.",
      "NhÃ  nghiÃªn cá»©u, sinh viÃªn, chuyÃªn gia doanh nghiá»‡p, cÆ¡ quan cÃ´ng, trÆ°á»ng Ä‘áº¡i há»c, trung tÃ¢m Ä‘á»•i má»›i sÃ¡ng táº¡o vÃ  cÃ¡c nhÃ³m JST NEXUS Ä‘á»u náº±m trong pháº¡m vi ngÆ°á»i tham dá»± má»¥c tiÃªu.",
      "Researchers, students, industry experts, public agencies, universities, innovation centers and JST NEXUS teams are all in scope.",
    ),
  },
  {
    title: L(
      "Pending publication items",
      "Ná»™i dung cÃ²n chá» cÃ´ng bá»‘",
      "Pending publication items",
    ),
    body: L(
      "Fees, payment instructions, invitation-letter policy, accommodation notes and final travel guidance depend on venue and budget approvals.",
      "Má»©c phÃ­, hÆ°á»›ng dáº«n thanh toÃ¡n, chÃ­nh sÃ¡ch thÆ° má»i, ghi chÃº lÆ°u trÃº vÃ  hÆ°á»›ng dáº«n di chuyá»ƒn cuá»‘i cÃ¹ng phá»¥ thuá»™c vÃ o viá»‡c phÃª duyá»‡t Ä‘á»‹a Ä‘iá»ƒm vÃ  ngÃ¢n sÃ¡ch.",
      "Fees, payment instructions, invitation-letter policy, accommodation notes and final travel guidance depend on venue and budget approvals.",
    ),
  },
];

export const contactEntries: ContactEntry[] = [
  {
    label: L("Conference secretariat", "Ban thÆ° kÃ½ há»™i nghá»‹", "Conference secretariat"),
    value: L(
      "VJSS 2026 Secretariat, Vietnam Japan University",
      "Ban thÆ° kÃ½ VJSS 2026, Vietnam Japan University",
      "VJSS 2026 Secretariat, Vietnam Japan University",
    ),
    detail: L(
      "Primary administrative contact for program operations, registration flow and event logistics.",
      "Äáº§u má»‘i hÃ nh chÃ­nh chÃ­nh cho váº­n hÃ nh chÆ°Æ¡ng trÃ¬nh, luá»“ng Ä‘Äƒng kÃ½ vÃ  háº­u cáº§n sá»± kiá»‡n.",
      "Primary administrative contact for program operations, registration flow and event logistics.",
    ),
  },
  {
    label: L("Academic liaison", "LiÃªn há»‡ há»c thuáº­t", "Academic liaison"),
    value: S(
      "Assoc. Prof. Le Duc Anh, The University of Tokyo / Assoc. Prof. Dr. Bui Nguyen Quoc Trinh, Vietnam Japan University",
    ),
    detail: L(
      "Named in the outreach proposal for invited-speaker coordination, program framing and academic partnership discussions.",
      "ÄÆ°á»£c nÃªu trong proposal outreach nhÆ° Ä‘áº§u má»‘i cho Ä‘iá»u phá»‘i diá»…n giáº£ má»i, Ä‘á»‹nh hÃ¬nh chÆ°Æ¡ng trÃ¬nh vÃ  tháº£o luáº­n há»£p tÃ¡c há»c thuáº­t.",
      "Named in the outreach proposal for invited-speaker coordination, program framing and academic partnership discussions.",
    ),
    emails: ["anh@cryst.t.u-tokyo.ac.jp", "bnq.trinh@vju.ac.vn"],
  },
];

export const newsItems: NewsItem[] = [
  {
    date: S("April 2026"),
    status: "updated",
    title: L(
      "Working outreach package prepared",
      "ÄÃ£ hoÃ n thiá»‡n bá»™ tÃ i liá»‡u outreach lÃ m viá»‡c",
      "Working outreach package prepared",
    ),
    body: L(
      "The current website content now reflects the April 2026 proposal and committee workbook rather than the earlier 2025 reference framing.",
      "Ná»™i dung website hiá»‡n pháº£n Ã¡nh proposal vÃ  committee workbook thÃ¡ng 4/2026 thay vÃ¬ khung tham chiáº¿u 2025 trÆ°á»›c Ä‘Ã³.",
      "The current website content now reflects the April 2026 proposal and committee workbook rather than the earlier 2025 reference framing.",
    ),
  },
  {
    date: S("April 2026"),
    status: "draft",
    title: L(
      "Venue shortlist under review",
      "Shortlist Ä‘á»‹a Ä‘iá»ƒm Ä‘ang Ä‘Æ°á»£c xem xÃ©t",
      "Venue shortlist under review",
    ),
    body: L(
      "The committee is comparing Vietnam Japan University and Sheraton Hanoi West Hotel against budget, sponsor support and operational fit.",
      "Ban tá»• chá»©c Ä‘ang so sÃ¡nh Vietnam Japan University vÃ  Sheraton Hanoi West Hotel theo cÃ¡c tiÃªu chÃ­ ngÃ¢n sÃ¡ch, há»— trá»£ nhÃ  tÃ i trá»£ vÃ  má»©c Ä‘á»™ phÃ¹ há»£p váº­n hÃ nh.",
      "The committee is comparing Vietnam Japan University and Sheraton Hanoi West Hotel against budget, sponsor support and operational fit.",
    ),
  },
  {
    date: S("May 2026"),
    status: "draft",
    title: L(
      "Sponsor outreach and speaker invitations scheduled",
      "Dá»± kiáº¿n báº¯t Ä‘áº§u outreach nhÃ  tÃ i trá»£ vÃ  gá»­i thÆ° má»i diá»…n giáº£",
      "Sponsor outreach and speaker invitations scheduled",
    ),
    body: L(
      "The working timeline assigns May to sponsor meetings, invited-speaker invitations and confirmation of tracks and session chairs.",
      "Timeline lÃ m viá»‡c dÃ nh thÃ¡ng 5 cho cÃ¡c cuá»™c gáº·p nhÃ  tÃ i trá»£, thÆ° má»i diá»…n giáº£ vÃ  viá»‡c xÃ¡c nháº­n track cÃ¹ng session chair.",
      "The working timeline assigns May to sponsor meetings, invited-speaker invitations and confirmation of tracks and session chairs.",
    ),
  },
  {
    date: S("June 2026"),
    status: "draft",
    title: L(
      "Abstract process targeted for launch",
      "Má»¥c tiÃªu má»Ÿ quy trÃ¬nh nháº­n abstract",
      "Abstract process targeted for launch",
    ),
    body: L(
      "The call for abstracts and contributed talks is planned for June, together with early sponsor-commitment confirmation and site-visit scoping.",
      "Call for abstracts vÃ  contributed talk Ä‘Æ°á»£c lÃªn káº¿ hoáº¡ch má»Ÿ trong thÃ¡ng 6, song song vá»›i viá»‡c xÃ¡c nháº­n cam káº¿t tÃ i trá»£ ban Ä‘áº§u vÃ  khoanh vÃ¹ng site visit.",
      "The call for abstracts and contributed talks is planned for June, together with early sponsor-commitment confirmation and site-visit scoping.",
    ),
  },
];
