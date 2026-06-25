export type Locale = "en" | "vi" | "ja";

export type LocalizedText = Record<Locale, string>;
export type MaybeLocalizedText = LocalizedText | string;

export type SessionStatus = "draft" | "updated" | "final";
export type AssetStatus = "verified" | "pending";
export type SpeakerKind = "government" | "academia" | "industry";

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

export type OrganizationItem = {
  name: string;
  meta?: MaybeLocalizedText;
  description: LocalizedText;
  link?: string;
  logo?: string;
  logoAlt?: MaybeLocalizedText;
  assetStatus?: AssetStatus;
  assetSource?: string;
};

export type SpeakerRecord = {
  id: string;
  name: string;
  role: MaybeLocalizedText;
  organization: MaybeLocalizedText;
  country: string;
  kind: SpeakerKind;
  sessionId?: string;
  topic: MaybeLocalizedText;
  summary: MaybeLocalizedText;
  bio: MaybeLocalizedText;
  image: string;
  imageAlt?: MaybeLocalizedText;
  imageStatus?: AssetStatus;
  imageSource?: string;
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
    "Hội nghị Bán dẫn Việt Nam - Nhật Bản 2026",
    "ベトナム・日本 半導体シンポジウム 2026",
  ),
  heroEyebrow: L(
    "Vietnam-Japan semiconductor research, talent and industry forum",
    "Diễn đàn nghiên cứu, nhân lực và công nghiệp bán dẫn Việt Nam - Nhật Bản",
    "ベトナム・日本 半導体研究・人材・産業フォーラム",
  ),
  tagline: L(
    "A four-day Hanoi forum for semiconductor research exchange, talent development and bilateral industry cooperation, building on the first VJSS held in Osaka in 2025.",
    "Diễn đàn bốn ngày tại Hà Nội cho trao đổi nghiên cứu bán dẫn, phát triển nhân lực và hợp tác công nghiệp song phương, kế thừa từ VJSS lần đầu tại Osaka năm 2025.",
    "2025年に大阪で開催された第1回VJSSを継承し、半導体の研究交流、人材育成、産業連携を進める4日間のハノイ・フォーラム。",
  ),
  dates: L("September 20-23, 2026", "20-23 tháng 9, 2026", "2026年9月20日-23日"),
  venue: L("Hanoi, Vietnam", "Hà Nội, Việt Nam", "ベトナム・ハノイ"),
  format: L(
    "In-person with hybrid participation options",
    "Trực tiếp, có hỗ trợ tham gia hybrid",
    "対面開催（ハイブリッド参加対応）",
  ),
  referenceNote: L(
    "The second edition of the Vietnam\u2013Japan Semiconductor Symposium, following the first VJSS held in Osaka in 2025.",
    "Phiên bản thứ hai của Hội nghị Bán dẫn Việt Nam – Nhật Bản, kế thừa từ VJSS lần đầu tại Osaka năm 2025.",
    "2025年に大阪で開催された第1回VJSSを継承するベトナム・日本半導体シンポジウム第2回大会。",
  ),
  referenceEvent: {
    date: L("VJSS 2025 — Osaka", "VJSS 2025 — Osaka", "VJSS 2025 — 大阪"),
    venue: "First VJSS held in Osaka in 2025",
    mapUrl: "https://maps.google.com/?q=Hanoi+Vietnam",
  },
};

export const homeMetrics = [
  {
    value: "150+",
    label: L("target participants", "đại biểu mục tiêu", "target participants"),
  },
  {
    value: "7",
    label: L("technical themes", "chủ đề kỹ thuật", "technical themes"),
  },
  {
    value: "4",
    label: L("event days", "ngày sự kiện", "event days"),
  },
  {
    value: "2",
    label: L("candidate venues", "phương án địa điểm", "candidate venues"),
  },
];

export const homeWelcome = {
  title: L("Executive summary", "Tóm tắt điều hành", "エグゼクティブサマリー"),
  body: L(
    "Building on the first VJSS held in Osaka in 2025, the 2026 edition convenes researchers, students, industry leaders, public agencies and JST NEXUS project teams in Hanoi from September 20 to 23. The program combines scientific sessions, plenary and invited talks, student lectures, career and study-abroad exchange, industry-policy dialogue, networking and site visits.",
    "Kế thừa từ VJSS lần đầu tại Osaka năm 2025, phiên bản 2026 quy tụ các nhà nghiên cứu, sinh viên, lãnh đạo doanh nghiệp, cơ quan công và các nhóm dự án JST NEXUS tại Hà Nội từ ngày 20 đến 23 tháng 9. Chương trình kết hợp các phiên khoa học, plenary và invited talks, bài giảng cho sinh viên, trao đổi nghề nghiệp và du học, đối thoại chính sách - công nghiệp, networking cùng các chuyến thăm thực địa.",
    "2025年に大阪で開催された第1回VJSSを継承し、2026年大会は9月20日から23日にハノイで、研究者、学生、産業界、公的機関、JST NEXUSプロジェクトチームを結集します。プログラムは学術セッション、基調・招待講演、学生向け講義、キャリア・留学交流、産業政策対話、ネットワーキング、視察を組み合わせます。",
  ),
  signature: L(
    "Hanoi · September 20\u201323, 2026",
    "Hà Nội · 20\u201323 tháng 9, 2026",
    "ハノイ · 2026年9月20–23日",
  ),
};

export const homeHighlights = [
  {
    title: L(
      "Research exchange with implementation paths",
      "Trao đổi nghiên cứu gắn với khả năng triển khai",
      "実装につながる研究交流",
    ),
    body: L(
      "The symposium is positioned as a practical bridge between research excellence and implementation through talks, panels, site visits and partner meetings.",
      "Hội nghị được định vị như một cây cầu thực tiễn giữa xuất sắc nghiên cứu và triển khai thông qua các bài trình bày, panel, chuyến thăm thực địa và các buổi gặp gỡ đối tác.",
      "講演、パネル、視察、パートナー面談を通じて、優れた研究と実装をつなぐ実践的な場として設計されています。",
    ),
  },
  {
    title: L(
      "Talent pipeline across lecture, career and industry sessions",
      "Dòng chảy nhân lực xuyên suốt từ bài giảng, định hướng nghề nghiệp đến kết nối doanh nghiệp",
      "講義、キャリア、産業連携を通じた人材パイプライン",
    ),
    body: L(
      "Student-facing lectures, study-abroad exchange and workforce dialogue are built into the core schedule rather than treated as side events.",
      "Các bài giảng cho sinh viên, trao đổi du học và đối thoại về nguồn nhân lực được đặt trong lịch chính thay vì bị đẩy thành hoạt động bên lề.",
      "学生向け講義、留学交流、人材対話を周辺企画ではなく主要プログラムの中に組み込んでいます。",
    ),
  },
  {
    title: L(
      "Seven technical themes",
      "Bảy chủ đề kỹ thuật",
      "7つの技術テーマ",
    ),
    body: L(
      "The program covers seven technical themes spanning IC design, optoelectronics, advanced materials, packaging, AI and quantum, emerging frontiers, and human-resource development.",
      "Chương trình trải trên bảy chủ đề kỹ thuật: thiết kế vi mạch, quang điện tử, vật liệu tiên tiến, đóng gói, AI và lượng tử, công nghệ mới nổi, và phát triển nguồn nhân lực.",
      "IC設計、光電子、先進材料、パッケージング、AI・量子、新興領域、人材育成までを含む7つの技術テーマをカバーします。",
    ),
  },
  {
    title: L(
      "Partnership structure beyond logo exposure",
      "Cấu trúc hợp tác vượt ra ngoài việc gắn logo",
      "ロゴ掲出にとどまらない連携設計",
    ),
    body: L(
      "The sponsorship model is framed around talent access, research collaboration, thought leadership, policy dialogue and measurable post-event deliverables.",
      "Mô hình tài trợ được xây dựng xoay quanh tiếp cận nhân lực, hợp tác nghiên cứu, vai trò dẫn dắt chuyên môn, đối thoại chính sách và các deliverable có thể đo lường sau sự kiện.",
      "協賛モデルは、人材接点、研究連携、専門的発信、政策対話、開催後に確認できる成果を中心に構成されています。",
    ),
  },
];

export const homeProgramDays = [
  {
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("Sep 20"),
    title: L(
      "Lecture, orientation and opening sessions",
      "Bài giảng, định hướng và phiên khai mạc",
      "Lecture, orientation and opening sessions",
    ),
    items: [
      L(
        "Lecture session for students and early-career researchers",
        "Phiên bài giảng cho sinh viên và nhà nghiên cứu trẻ",
        "Lecture session for students and early-career researchers",
      ),
      L(
        "Study-abroad and job orientation with academia and industry representatives",
        "Định hướng du học và nghề nghiệp với đại diện học thuật và doanh nghiệp",
        "Study-abroad and job orientation with academia and industry representatives",
      ),
      L(
        "Opening ceremony, plenary session 1 and parallel session 1",
        "Khai mạc, plenary session 1 và parallel session 1",
        "Opening ceremony, plenary session 1 and parallel session 1",
      ),
      L(
        "Welcome reception and networking",
        "Welcome reception và networking",
        "Welcome reception and networking",
      ),
    ],
  },
  {
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("Sep 21"),
    title: L(
      "Plenary, poster and technical tracks",
      "Plenary, poster và các track kỹ thuật",
      "Plenary, poster and technical tracks",
    ),
    items: [
      L(
        "Plenary session 2 and parallel session 2",
        "Plenary session 2 và parallel session 2",
        "Plenary session 2 and parallel session 2",
      ),
      L(
        "Plenary session 3 or poster session under discussion",
        "Plenary session 3 hoặc poster session đang được chốt",
        "Plenary session 3 or poster session under discussion",
      ),
      L(
        "Parallel session 3 across thematic tracks",
        "Parallel session 3 theo các track chủ đề",
        "Parallel session 3 across thematic tracks",
      ),
      L("Closing and banquet", "Bế mạc và banquet", "Closing and banquet"),
    ],
  },
  {
    day: L("Day 3", "Ngày 3", "Day 3"),
    date: S("Sep 22"),
    title: L("Site visits", "Các chuyến thăm thực địa", "Site visits"),
    items: [
      L(
        "Visits to local semiconductor-related facilities and laboratories",
        "Thăm các cơ sở và phòng thí nghiệm liên quan đến bán dẫn tại địa phương",
        "Visits to local semiconductor-related facilities and laboratories",
      ),
      L(
        "Innovation-center and ecosystem partner meetings",
        "Làm việc với trung tâm đổi mới sáng tạo và đối tác hệ sinh thái",
        "Innovation-center and ecosystem partner meetings",
      ),
    ],
  },
  {
    day: L("Day 4", "Ngày 4", "Day 4"),
    date: S("Sep 23"),
    title: L(
      "NEXUS session and follow-up visits",
      "NEXUS session và các cuộc làm việc nối tiếp",
      "NEXUS session and follow-up visits",
    ),
    items: [
      L(
        "Dedicated JST NEXUS session for bilateral collaboration discussions",
        "Phiên JST NEXUS chuyên biệt cho thảo luận hợp tác song phương",
        "Dedicated JST NEXUS session for bilateral collaboration discussions",
      ),
      L(
        "Institutional meetings and follow-up collaboration visits",
        "Các cuộc họp thể chế và các chuyến làm việc tiếp nối hợp tác",
        "Institutional meetings and follow-up collaboration visits",
      ),
    ],
  },
];

export const homeImportantDates = [
  {
    label: L("April 2026", "Tháng 4/2026", "April 2026"),
    value: L(
      "Organizing structure, outreach draft and venue shortlist",
      "Chốt khung tổ chức, bản outreach và shortlist địa điểm",
      "Organizing structure, outreach draft and venue shortlist",
    ),
  },
  {
    label: L("May 2026", "Tháng 5/2026", "May 2026"),
    value: L(
      "Sponsor outreach, speaker invitations and track confirmation",
      "Outreach nhà tài trợ, gửi thư mời diễn giả và xác nhận track",
      "Sponsor outreach, speaker invitations and track confirmation",
    ),
  },
  {
    label: L("June 2026", "Tháng 6/2026", "June 2026"),
    value: L(
      "Open abstract and contributed-talk process",
      "Mở quy trình nhận abstract và contributed talk",
      "Open abstract and contributed-talk process",
    ),
  },
  {
    label: L("July 2026", "Tháng 7/2026", "July 2026"),
    value: L(
      "Review submissions and finalize keynote and plenary shortlist",
      "Rà soát bài gửi và chốt shortlist keynote, plenary",
      "Review submissions and finalize keynote and plenary shortlist",
    ),
  },
  {
    label: L("August 2026", "Tháng 8/2026", "August 2026"),
    value: L(
      "Publish tentative program and registration updates",
      "Công bố chương trình dự kiến và cập nhật đăng ký",
      "Publish tentative program and registration updates",
    ),
  },
  {
    label: L("September 20-23", "20-23/9", "September 20-23"),
    value: L(
      "Symposium delivery in Hanoi",
      "Tổ chức hội nghị tại Hà Nội",
      "Symposium delivery in Hanoi",
    ),
  },
];

export const pageCopy = {
  about: {
    title: L("About VJSS 2026", "Giới thiệu VJSS 2026", "VJSS 2026について"),
    intro: L(
      "VJSS 2026 is the practical Vietnam\u2013Japan platform for semiconductor research exchange, talent development, ecosystem building and long-term bilateral cooperation.",
      "VJSS 2026 là nền tảng thực tiễn Việt Nam – Nhật Bản cho trao đổi nghiên cứu bán dẫn, phát triển nhân lực, xây dựng hệ sinh thái và hợp tác song phương dài hạn.",
      "VJSS 2026は、半導体研究交流、人材育成、エコシステム構築、長期的な二国間連携のためのベトナム・日本の実践プラットフォームです。",
    ),
    visionTitle: L("Positioning", "Định vị", "位置づけ"),
    missionTitle: L("Conference design", "Thiết kế hội nghị", "会議設計"),
    objectiveTitle: L("Objectives", "Mục tiêu", "目的"),
    vision: [
      L(
        "Build a high-impact forum linking research, education, industry and public-sector cooperation between Vietnam and Japan.",
        "Xây dựng một diễn đàn có tác động cao kết nối nghiên cứu, giáo dục, công nghiệp và hợp tác công giữa Việt Nam và Nhật Bản.",
        "Build a high-impact forum linking research, education, industry and public-sector cooperation between Vietnam and Japan.",
      ),
      L(
        "Move from symbolic exchange toward concrete cooperation in joint research, workforce development and partner programs.",
        "Chuyển từ giao lưu mang tính biểu tượng sang hợp tác cụ thể trong nghiên cứu chung, phát triển nguồn nhân lực và các chương trình đối tác.",
        "Move from symbolic exchange toward concrete cooperation in joint research, workforce development and partner programs.",
      ),
    ],
    mission: [
      L(
        "Combine scientific sessions, invited talks, student-facing lectures, career exchange, policy dialogue, networking and site visits in one coherent program arc.",
        "Kết hợp các phiên khoa học, invited talks, bài giảng hướng tới sinh viên, trao đổi nghề nghiệp, đối thoại chính sách, networking và site visits trong một mạch chương trình thống nhất.",
        "Combine scientific sessions, invited talks, student-facing lectures, career exchange, policy dialogue, networking and site visits in one coherent program arc.",
      ),
      L(
        "Use the symposium as a partner platform for semiconductor talent development, technology exchange and long-term Vietnam-Japan collaboration.",
        "Biến hội nghị thành một nền tảng đối tác cho phát triển nhân lực bán dẫn, trao đổi công nghệ và hợp tác Việt Nam - Nhật Bản dài hạn.",
        "Use the symposium as a partner platform for semiconductor talent development, technology exchange and long-term Vietnam-Japan collaboration.",
      ),
    ],
    objectives: [
      L(
        "Create a forum for Vietnam-Japan researchers to present advances and identify joint projects.",
        "Tạo diễn đàn để các nhà nghiên cứu Việt Nam - Nhật Bản trình bày kết quả mới và xác định các dự án hợp tác.",
        "Create a forum for Vietnam-Japan researchers to present advances and identify joint projects.",
      ),
      L(
        "Offer lectures, career orientation and student-facing sessions to strengthen the semiconductor talent pipeline.",
        "Tổ chức các bài giảng, định hướng nghề nghiệp và phiên hướng tới sinh viên để củng cố dòng chảy nhân lực bán dẫn.",
        "Offer lectures, career orientation and student-facing sessions to strengthen the semiconductor talent pipeline.",
      ),
      L(
        "Connect companies with universities, laboratories and young researchers through sessions, booths and networking.",
        "Kết nối doanh nghiệp với trường đại học, phòng thí nghiệm và nhà nghiên cứu trẻ thông qua các phiên thảo luận, booth và networking.",
        "Connect companies with universities, laboratories and young researchers through sessions, booths and networking.",
      ),
      L(
        "Strengthen links among JST NEXUS teams and related Vietnam-Japan cooperation programs.",
        "Tăng cường liên kết giữa các nhóm JST NEXUS và các chương trình hợp tác Việt Nam - Nhật Bản liên quan.",
        "Strengthen links among JST NEXUS teams and related Vietnam-Japan cooperation programs.",
      ),
    ],
    contextTitle: L(
      "Why the timing matters",
      "Vì sao thời điểm này quan trọng",
      "なぜ今、VJSSなのか",
    ),
    contextBody: L(
      "Semiconductors are foundational to AI, smart mobility, robotics, aerospace, advanced manufacturing and digital infrastructure. Japan brings deep research, manufacturing and industrial know-how, while Vietnam is rapidly building talent, policy momentum and ecosystem capacity.",
      "Bán dẫn là nền tảng của AI, giao thông thông minh, robot, hàng không vũ trụ, sản xuất tiên tiến và hạ tầng số. Nhật Bản có chiều sâu về nghiên cứu, sản xuất và know-how công nghiệp, trong khi Việt Nam đang tăng tốc về nhân lực, động lực chính sách và năng lực hệ sinh thái.",
      "Semiconductors are foundational to AI, smart mobility, robotics, aerospace, advanced manufacturing and digital infrastructure. Japan brings deep research, manufacturing and industrial know-how, while Vietnam is rapidly building talent, policy momentum and ecosystem capacity.",
    ),
    heritageTitle: L(
      "From Osaka 2025 to Hanoi 2026",
      "Từ Osaka 2025 đến Hà Nội 2026",
      "大阪2025からハノイ2026へ",
    ),
    heritageBody: L(
      "The second edition builds directly on the first VJSS held in Osaka in 2025. The Hanoi edition keeps bilateral cooperation at the center while expanding the format with site visits, a dedicated JST NEXUS session, a structured sponsorship framework and a stronger student-facing agenda.",
      "Phiên bản thứ hai kế thừa trực tiếp từ VJSS lần đầu tổ chức tại Osaka năm 2025. Phiên bản Hà Nội giữ hợp tác song phương ở trung tâm, đồng thời mở rộng định dạng với site visit, NEXUS session chuyên biệt, khung tài trợ có cấu trúc và chương trình hướng tới sinh viên rõ nét hơn.",
      "第2回大会は、2025年に大阪で開催された第1回VJSSを直接継承します。ハノイ大会は二国間連携を中心に据えつつ、視察、JST NEXUS専用セッション、体系化された協賛フレームワーク、学生向けプログラムの強化により形式を拡張します。",
    ),
  },
  program: {
    title: L("Program and timeline", "Chương trình và lộ trình", "プログラムとスケジュール"),
    intro: L(
      "Four days of plenary and invited talks, parallel technical tracks, student lectures, site visits and a dedicated JST NEXUS session. Session details are progressively confirmed as the program is finalized.",
      "Bốn ngày với các phiên plenary và invited, các track kỹ thuật song song, bài giảng cho sinh viên, chương trình site visit và phiên chuyên biệt cho JST NEXUS. Chi tiết từng phiên sẽ được xác nhận dần khi chương trình được hoàn thiện.",
      "本会議・招待講演、並行技術セッション、学生向け講義、視察、JST NEXUS専用セッションを含む、4日間のプログラム。詳細は順次確定していきます。",
    ),
    legendTitle: L("Session status", "Trạng thái phiên", "セッションステータス"),
    architectureTitle: L("Program architecture", "Kiến trúc chương trình", "プログラム構成"),
    architectureBody: L(
      "VJSS 2026 combines scientific sessions, student-facing lectures, industry-policy dialogue, networking and site visits in a single coherent program.",
      "VJSS 2026 kết hợp các phiên khoa học, bài giảng hướng tới sinh viên, đối thoại công nghiệp - chính sách, networking và site visit trong một mạch chương trình thống nhất.",
      "VJSS 2026は、学術セッション、学生向け講義、産業・政策対話、ネットワーキング、視察を一貫したプログラムに統合します。",
    ),
    timelineTitle: L("Road to September 2026", "Lộ trình tới tháng 9/2026", "2026年9月までの道程"),
    timelineBody: L(
      "Key milestones from sponsor and speaker outreach through abstract review to delivery in Hanoi in September 2026.",
      "Các mốc quan trọng từ mời tài trợ và mời diễn giả, qua quá trình review abstract, đến tổ chức hội nghị tại Hà Nội vào tháng 9/2026.",
      "スポンサー・講演者への案内からアブストラクト査読、そして2026年9月のハノイ開催までの主要マイルストーン。",
    ),
    noteTitle: L("What is being confirmed", "Nội dung đang được xác nhận", "確定中の項目"),
    noteBody: L(
      "Final venue, the full keynote roster, site-visit hosts and language support are progressively confirmed as VJSS 2026 approaches.",
      "Địa điểm cuối cùng, danh sách keynote đầy đủ, đơn vị tiếp đón site visit và hỗ trợ ngôn ngữ sẽ được xác nhận dần khi VJSS 2026 đến gần.",
      "最終会場、キーノート講演者一覧、視察訪問先、言語サポートはVJSS 2026に向けて順次確定されます。",
    ),
  },
  speakers: {
    title: L(
      "Invited speakers",
      "Diễn giả mời",
      "招待講演者",
    ),
    intro: L(
      "Plenary speakers, lecture speakers and invited speakers across seven technical themes, bringing together leading researchers from Vietnam and Japan.",
      "Diễn giả plenary, diễn giả bài giảng và các invited speaker trên bảy chủ đề kỹ thuật, quy tụ các nhà nghiên cứu hàng đầu từ Việt Nam và Nhật Bản.",
      "7つの技術テーマにわたる本会議・講義・招待講演者。ベトナムと日本を代表する研究者が一堂に会します。",
    ),
  },
  venue: {
    title: L("Venue and logistics", "Địa điểm và hậu cần", "会場とロジスティクス"),
    intro: L(
      "VJSS 2026 takes place in Hanoi, Vietnam. The conference venue is being finalized between Vietnam Japan University (VNU-VJU) and Sheraton Hanoi West Hotel.",
      "VJSS 2026 diễn ra tại Hà Nội, Việt Nam. Địa điểm hội nghị đang được hoàn thiện giữa Vietnam Japan University (VNU-VJU) và Sheraton Hanoi West Hotel.",
      "VJSS 2026はベトナム・ハノイで開催されます。会場はVietnam Japan University (VNU-VJU) とSheraton Hanoi West Hotelのいずれかに確定される予定です。",
    ),
    nextTitle: L(
      "Two venue options",
      "Hai phương án địa điểm",
      "2つの会場候補",
    ),
    nextBody: L(
      "The organizing committee is choosing between an academic campus venue at Vietnam Japan University and a hotel-conference venue at Sheraton Hanoi West Hotel.",
      "Ban tổ chức đang lựa chọn giữa phương án campus tại Vietnam Japan University và phương án hội nghị khách sạn tại Sheraton Hanoi West Hotel.",
      "組織委員会はVietnam Japan Universityのキャンパス会場とSheraton Hanoi West Hotelのホテル会議会場のいずれかを検討中です。",
    ),
    referenceTitle: L("Host city", "Thành phố tổ chức", "開催都市"),
    referenceBody: L(
      "Hanoi anchors the symposium, partner meetings, site visits and the JST NEXUS session.",
      "Hà Nội là trung tâm của hội nghị, các cuộc gặp đối tác, chương trình site visit và phiên JST NEXUS.",
      "ハノイがシンポジウム、パートナー面談、視察、JST NEXUSセッションの拠点となります。",
    ),
  },
  organizers: {
    title: L(
      "Organizers and committees",
      "Ban tổ chức và các tiểu ban",
      "主催と委員会",
    ),
    intro: L(
      "VJSS 2026 is organized through a structured committee model: conference chairs, organizing committee, scientific committee, local committee and the secretariat.",
      "VJSS 2026 được vận hành theo cấu trúc ổn định: chủ tịch hội nghị, ban tổ chức, ban khoa học, ban địa phương và ban thư ký.",
      "VJSS 2026は、コンファレンスチェア、組織委員会、サイエンティフィック委員会、ローカル委員会、事務局より構成されます。",
    ),
    partnerPlaceholderTitle: L(
      "Hosts, patrons and partners",
      "Chủ trì, bảo trợ và đối tác",
      "主催、後援、パートナー",
    ),
    partnerPlaceholderBody: L(
      "Vietnam Japan University and AVIJ host the symposium, with JST and NIC as patrons and VANJ as the partner network.",
      "Vietnam Japan University và AVIJ chủ trì hội nghị; JST và NIC là đơn vị bảo trợ; VANJ là mạng lưới đối tác.",
      "Vietnam Japan UniversityとAVIJが主催、JSTとNICが後援、VANJがパートナーネットワークとして参画します。",
    ),
  },
  sponsors: {
    title: L("Partnership and sponsorship", "Hợp tác và tài trợ", "協賛とパートナーシップ"),
    intro: L(
      "Sponsorship at VJSS 2026 is ecosystem participation: talent access, research collaboration, thought leadership, recruitment visibility and recognition before, during and after the symposium.",
      "Tài trợ tại VJSS 2026 là hình thức tham gia hệ sinh thái: tiếp cận nhân lực, hợp tác nghiên cứu, hiện diện chuyên môn, khả năng tuyển dụng và được ghi nhận trước, trong và sau hội nghị.",
      "VJSS 2026の協賛はエコシステムへの参画です—人材アクセス、研究連携、専門的発信、採用機会、会議前後の認知向上を提供します。",
    ),
    upcomingTitle: L(
      "Sponsorship tier framework",
      "Khung hạng mục tài trợ",
      "協賛ティアー体系",
    ),
    upcomingBody: L(
      "Five tiers — Strategic Partner, Platinum, Gold, Silver and In-kind — each with a defined contribution model and a clear set of benefits.",
      "Năm hạng mục — Strategic Partner, Platinum, Gold, Silver và In-kind — mỗi hạng đều có hình thức đóng góp rõ ràng và bộ quyền lợi tương ứng.",
      "5つのティアー（Strategic Partner、Platinum、Gold、Silver、In-kind）それぞれの貢献モデルと特典を明確に設定しています。",
    ),
  },
  cfp: {
    title: L(
      "Call for Abstracts",
      "Call for Abstracts",
      "アブストラクト募集",
    ),
    intro: L(
      "Submit abstracts and contributed talks across the seven technical themes of VJSS 2026. Submission opens in June 2026; deadlines, templates and the official portal will be announced on this page.",
      "Nộp abstract và contributed talk trên bảy chủ đề kỹ thuật của VJSS 2026. Quá trình nhận bài bắt đầu từ tháng 6/2026; deadline, template và portal chính thức sẽ được công bố tại đây.",
      "VJSS 2026の7つの技術テーマに沿ったアブストラクトとコントリビューション講演を募集します。2026年6月に募集開始、締切・テンプレート・提出ポータルは本ページでお知らせします。",
    ),
  },
  registration: {
    title: L("Registration", "Đăng ký tham dự", "参加登録"),
    intro: L(
      "VJSS 2026 welcomes researchers, students, industry experts, universities and public agencies. Registration fees, payment details and invitation letters will be announced ahead of the symposium.",
      "VJSS 2026 chào đón nhà nghiên cứu, sinh viên, chuyên gia doanh nghiệp, trường đại học và cơ quan công. Mức phí, hướng dẫn thanh toán và thư mời sẽ được công bố trước khi hội nghị diễn ra.",
      "VJSS 2026は研究者、学生、産業関係者、大学、公的機関を歓迎します。参加費、支払い方法、招勧状は会期前にご案内いたします。",
    ),
  },
  contact: {
    title: L("Contact", "Liên hệ", "お問い合わせ"),
    intro: L(
      "Reach the VJSS 2026 secretariat for program operations and registration, or the academic liaisons for partner, sponsor and invited-speaker coordination.",
      "Liên hệ ban thư ký VJSS 2026 cho vận hành chương trình và đăng ký, hoặc các đầu mối học thuật cho hợp tác đối tác, tài trợ và diễn giả mời.",
      "プログラム運営や参加登録はVJSS 2026事務局、パートナー・スポンサー・招待講演者に関するお問い合わせは学術窓口までご連絡ください。",
    ),
  },
  news: {
    title: L("News and updates", "Tin tức và cập nhật", "ニュースと更新"),
    intro: L(
      "Latest announcements about the program, speakers, abstract submissions, sponsorship and the road to VJSS 2026 in Hanoi.",
      "Các thông báo mới nhất về chương trình, diễn giả, quá trình nhận bài, tài trợ và lộ trình tới VJSS 2026 tại Hà Nội.",
      "VJSS 2026ハノイ開催に向けた、プログラム、講演者、アブストラクト募集、協賛に関する最新情報。",
    ),
  },
};

export const programSessions: ProgramSession[] = [
  {
    id: "lecture-session",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "08:30 - 11:00",
    title: S("Lecture Session"),
    themeId: "Academic and talent",
    theme: L("Academic and talent", "Học thuật và nhân lực", "Academic and talent"),
    status: "updated",
    chairs: ["Program committee"],
    summary: L(
      "Student- and young researcher-oriented lectures on semiconductor technologies and career pathways.",
      "Chuỗi bài giảng hướng tới sinh viên và nhà nghiên cứu trẻ về công nghệ bán dẫn và các lộ trình nghề nghiệp.",
      "Student- and young researcher-oriented lectures on semiconductor technologies and career pathways.",
    ),
    speakerIds: ["le-duc-anh", "dang-thanh-tu", "huynh-van-nhat"],
  },
  {
    id: "study-abroad-job-orientation",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "11:00 - 12:00",
    title: S("Study Abroad and Job Orientation"),
    themeId: "Academic and talent",
    theme: L("Academic and talent", "Học thuật và nhân lực", "Academic and talent"),
    status: "updated",
    chairs: ["Local committee"],
    summary: L(
      "Q&A with academic and industry representatives on study, career and training pathways.",
      "Phiên hỏi đáp với đại diện học thuật và doanh nghiệp về con đường du học, nghề nghiệp và đào tạo.",
      "Q&A with academic and industry representatives on study, career and training pathways.",
    ),
    speakerIds: ["huynh-van-nhat", "luong-minh-phuong"],
  },
  {
    id: "luncheon-session",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "12:00 - 13:30",
    title: S("Lunch Break / Luncheon Session"),
    themeId: "Networking",
    theme: L("Networking", "Kết nối", "Networking"),
    status: "draft",
    chairs: [],
    summary: L(
      "Potential sponsor-supported luncheon or student networking format.",
      "Khung luncheon có thể được nhà tài trợ đồng hành hoặc tổ chức theo định dạng networking cho sinh viên.",
      "Potential sponsor-supported luncheon or student networking format.",
    ),
    speakerIds: [],
  },
  {
    id: "opening-ceremony",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "13:30 - 14:00",
    title: S("Opening Ceremony"),
    themeId: "Plenary and opening",
    theme: L("Plenary and opening", "Khai mạc và plenary", "Plenary and opening"),
    status: "updated",
    chairs: ["Dr. Nguyen Hoang Oanh"],
    summary: L(
      "Welcome remarks by host organizations, patrons and core partners.",
      "Phần phát biểu chào mừng của các đơn vị chủ trì, đơn vị bảo trợ và đối tác nòng cốt.",
      "Welcome remarks by host organizations, patrons and core partners.",
    ),
    speakerIds: ["nguyen-hoang-oanh", "toshiro-hiramoto", "bui-nguyen-quoc-trinh"],
  },
  {
    id: "plenary-session-1",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "14:00 - 15:30",
    title: S("Plenary Session 1"),
    themeId: "Plenary and opening",
    theme: L("Plenary and opening", "Khai mạc và plenary", "Plenary and opening"),
    status: "updated",
    chairs: ["Scientific committee"],
    summary: L(
      "Plenary and invited presentations setting the technical and strategic tone of the symposium.",
      "Các bài trình bày plenary và invited đặt nền cho hướng kỹ thuật và định vị chiến lược của hội nghị.",
      "Plenary and invited presentations setting the technical and strategic tone of the symposium.",
    ),
    speakerIds: ["le-duc-anh", "tran-xuan-tu", "nguyen-chung-hoa"],
  },
  {
    id: "parallel-session-1",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "15:45 - 17:30",
    title: S("Parallel Session 1"),
    themeId: "Technical tracks",
    theme: L("Technical tracks", "Các track kỹ thuật", "Technical tracks"),
    status: "draft",
    chairs: ["Track chairs"],
    summary: L(
      "One invited talk (30 minutes) followed by four contributed talks (15 minutes each) across the technical tracks.",
      "Một invited talk (30 phút) và bốn contributed talk (15 phút mỗi bài) theo các track kỹ thuật.",
      "招待講演（30分）1件と一般講演（各15分）4件で構成される並行技術セッション。",
    ),
    speakerIds: ["tran-quoc-tien", "dao-thanh-toan", "nguyen-ngoc-dinh", "le-van-lich"],
  },
  {
    id: "welcome-reception",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "17:30 - onward",
    title: S("Welcome Reception and Networking"),
    themeId: "Networking",
    theme: L("Networking", "Kết nối", "Networking"),
    status: "draft",
    chairs: [],
    summary: L(
      "Opening-day networking for speakers, sponsors, partners and participants.",
      "Phiên networking cuối ngày đầu dành cho diễn giả, nhà tài trợ, đối tác và người tham dự.",
      "Opening-day networking for speakers, sponsors, partners and participants.",
    ),
    speakerIds: [],
  },
  {
    id: "plenary-session-2",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "09:00 - 10:30",
    title: S("Plenary Session 2"),
    themeId: "Plenary and opening",
    theme: L("Plenary and opening", "Khai mạc và plenary", "Plenary and opening"),
    status: "updated",
    chairs: ["Scientific committee"],
    summary: L(
      "Second plenary block for invited and keynote-level talks.",
      "Khối plenary thứ hai dành cho các bài trình bày invited và keynote-level.",
      "Second plenary block for invited and keynote-level talks.",
    ),
    speakerIds: ["nguyen-tran-thuat", "le-van-hai"],
  },
  {
    id: "parallel-session-2",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "10:45 - 12:00",
    title: S("Parallel Session 2"),
    themeId: "Technical tracks",
    theme: L("Technical tracks", "Các track kỹ thuật", "Technical tracks"),
    status: "draft",
    chairs: ["Track chairs"],
    summary: L(
      "Technical sessions continuing across the defined thematic tracks.",
      "Các phiên kỹ thuật tiếp tục triển khai theo các track chủ đề đã xác lập.",
      "Technical sessions continuing across the defined thematic tracks.",
    ),
    speakerIds: ["bui-duy-hieu", "nguyen-ngoc-linh"],
  },
  {
    id: "luncheon-session-2",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "12:00 - 13:30",
    title: S("Lunch Break / Luncheon Session"),
    themeId: "Networking",
    theme: L("Networking", "Kết nối", "Networking"),
    status: "draft",
    chairs: [],
    summary: L(
      "Optional sponsor-hosted luncheon or focused networking format.",
      "Khung luncheon có thể do nhà tài trợ đồng hành hoặc được vận hành như một phiên networking tập trung.",
      "Optional sponsor-hosted luncheon or focused networking format.",
    ),
    speakerIds: [],
  },
  {
    id: "plenary-session-3",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "13:30 - 15:00",
    title: S("Plenary Session 3 / Poster Session"),
    themeId: "Plenary and opening",
    theme: L("Plenary and opening", "Khai mạc và plenary", "Plenary and opening"),
    status: "draft",
    chairs: ["Program committee"],
    summary: L(
      "Option under discussion: a plenary talk plus a poster session in the afternoon block.",
      "Phương án đang được thảo luận: một bài plenary kết hợp với poster session trong khung buổi chiều.",
      "Option under discussion: a plenary talk plus a poster session in the afternoon block.",
    ),
    speakerIds: [],
  },
  {
    id: "parallel-session-3",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "15:15 - 17:00",
    title: S("Parallel Session 3"),
    themeId: "Technical tracks",
    theme: L("Technical tracks", "Các track kỹ thuật", "Technical tracks"),
    status: "draft",
    chairs: ["Track chairs"],
    summary: L(
      "Final parallel technical block before closing and banquet.",
      "Khối kỹ thuật song song cuối cùng trước phiên bế mạc và banquet.",
      "Final parallel technical block before closing and banquet.",
    ),
    speakerIds: ["nguyen-chung-hoa", "dang-thanh-tu"],
  },
  {
    id: "closing-banquet",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "17:30 - onward",
    title: S("Closing and Banquet"),
    themeId: "Networking",
    theme: L("Networking", "Kết nối", "Networking"),
    status: "updated",
    chairs: ["Organizing committee"],
    summary: L(
      "Closing remarks, awards, partner recognition and banquet networking.",
      "Phát biểu bế mạc, trao ghi nhận, vinh danh đối tác và networking tại banquet.",
      "Closing remarks, awards, partner recognition and banquet networking.",
    ),
    speakerIds: ["nguyen-hoang-oanh", "huynh-van-nhat"],
  },
  {
    id: "site-visit-am",
    day: L("Day 3", "Ngày 3", "Day 3"),
    date: S("September 22, 2026"),
    time: "AM",
    title: S("Site Visiting"),
    themeId: "Site visits",
    theme: L("Site visits", "Site visit", "Site visits"),
    status: "draft",
    chairs: ["Local committee"],
    summary: L(
      "Visits to semiconductor-related facilities, laboratories, innovation centers or industrial parks.",
      "Chương trình thăm cơ sở liên quan đến bán dẫn, phòng thí nghiệm, trung tâm đổi mới sáng tạo hoặc khu công nghiệp.",
      "Visits to semiconductor-related facilities, laboratories, innovation centers or industrial parks.",
    ),
    speakerIds: [],
  },
  {
    id: "site-visit-pm",
    day: L("Day 3", "Ngày 3", "Day 3"),
    date: S("September 22, 2026"),
    time: "PM",
    title: S("Site Visiting"),
    themeId: "Site visits",
    theme: L("Site visits", "Site visit", "Site visits"),
    status: "draft",
    chairs: ["Local committee"],
    summary: L(
      "Continuation of technical and ecosystem visits with partner meetings.",
      "Tiếp tục các chuyến thăm kỹ thuật, hệ sinh thái và các buổi làm việc với đối tác.",
      "Continuation of technical and ecosystem visits with partner meetings.",
    ),
    speakerIds: [],
  },
  {
    id: "nexus-session",
    day: L("Day 4", "Ngày 4", "Day 4"),
    date: S("September 23, 2026"),
    time: "AM",
    title: S("NEXUS Session"),
    themeId: "NEXUS and bilateral programs",
    theme: L(
      "NEXUS and bilateral programs",
      "NEXUS và các chương trình song phương",
      "NEXUS and bilateral programs",
    ),
    status: "updated",
    chairs: ["JST NEXUS"],
    summary: L(
      "Dedicated session for JST NEXUS teams and related bilateral collaboration discussions.",
      "Phiên chuyên biệt cho các nhóm JST NEXUS và các thảo luận hợp tác song phương liên quan.",
      "Dedicated session for JST NEXUS teams and related bilateral collaboration discussions.",
    ),
    speakerIds: ["toshiro-hiramoto", "le-duc-anh", "bui-nguyen-quoc-trinh"],
  },
  {
    id: "follow-up-visits",
    day: L("Day 4", "Ngày 4", "Day 4"),
    date: S("September 23, 2026"),
    time: "PM",
    title: S("Follow-up Site Visit and Institutional Meetings"),
    themeId: "NEXUS and bilateral programs",
    theme: L(
      "NEXUS and bilateral programs",
      "NEXUS và các chương trình song phương",
      "NEXUS and bilateral programs",
    ),
    status: "draft",
    chairs: ["Organizing committee"],
    summary: L(
      "Follow-up site visits, institutional meetings and collaboration discussions.",
      "Các chuyến thăm nối tiếp, cuộc họp cấp tổ chức và thảo luận hợp tác sau NEXUS session.",
      "Follow-up site visits, institutional meetings and collaboration discussions.",
    ),
    speakerIds: [],
  },
];

export const programThemeFilters = [
  {
    id: "all",
    label: L("All sessions", "Toàn bộ phiên", "All sessions"),
  },
  {
    id: "Plenary and opening",
    label: L("Opening and plenary", "Khai mạc và plenary", "Opening and plenary"),
  },
  {
    id: "Academic and talent",
    label: L("Talent and lecture", "Nhân lực và bài giảng", "Talent and lecture"),
  },
  {
    id: "Technical tracks",
    label: L("Technical tracks", "Track kỹ thuật", "Technical tracks"),
  },
  {
    id: "Networking",
    label: L("Networking", "Kết nối", "Networking"),
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
    title: L("Scientific sessions", "Phiên khoa học", "Scientific sessions"),
    description: L(
      "Plenary, invited and contributed talks across semiconductor research themes.",
      "Các bài trình bày plenary, invited và contributed trải trên các chủ đề nghiên cứu bán dẫn.",
      "Plenary, invited and contributed talks across semiconductor research themes.",
    ),
    audience: L(
      "Researchers, faculty, JST NEXUS teams and graduate students",
      "Nhà nghiên cứu, giảng viên, nhóm JST NEXUS và học viên sau đại học",
      "Researchers, faculty, JST NEXUS teams and graduate students",
    ),
  },
  {
    title: L(
      "Parallel technical tracks",
      "Các track kỹ thuật song song",
      "Parallel technical tracks",
    ),
    description: L(
      "Focused sessions on IC design, materials, devices, packaging, AI and quantum, and emerging frontiers.",
      "Các phiên tập trung vào thiết kế IC, vật liệu, linh kiện, đóng gói, AI và lượng tử, cùng các hướng công nghệ mới nổi.",
      "Focused sessions on IC design, materials, devices, packaging, AI and quantum, and emerging frontiers.",
    ),
    audience: L(
      "Researchers, engineers, students and companies",
      "Nhà nghiên cứu, kỹ sư, sinh viên và doanh nghiệp",
      "Researchers, engineers, students and companies",
    ),
  },
  {
    title: L(
      "Lecture and career session",
      "Bài giảng và định hướng nghề nghiệp",
      "Lecture and career session",
    ),
    description: L(
      "Introductory and advanced lectures, study-abroad guidance, job orientation and Q&A.",
      "Bài giảng nền tảng và nâng cao, hướng dẫn du học, định hướng việc làm và hỏi đáp.",
      "Introductory and advanced lectures, study-abroad guidance, job orientation and Q&A.",
    ),
    audience: L(
      "Students, young researchers, employers and universities",
      "Sinh viên, nhà nghiên cứu trẻ, đơn vị tuyển dụng và trường đại học",
      "Students, young researchers, employers and universities",
    ),
  },
  {
    title: L(
      "Industry and policy dialogue",
      "Đối thoại công nghiệp và chính sách",
      "Industry and policy dialogue",
    ),
    description: L(
      "Panel and networking sessions on collaboration, workforce development and ecosystem coordination.",
      "Các panel và phiên networking về hợp tác, phát triển nguồn nhân lực và điều phối hệ sinh thái.",
      "Panel and networking sessions on collaboration, workforce development and ecosystem coordination.",
    ),
    audience: L(
      "Companies, public agencies, innovation centers and universities",
      "Doanh nghiệp, cơ quan công, trung tâm đổi mới sáng tạo và trường đại học",
      "Companies, public agencies, innovation centers and universities",
    ),
  },
  {
    title: L(
      "Site visits and NEXUS session",
      "Site visit và NEXUS session",
      "Site visits and NEXUS session",
    ),
    description: L(
      "Visits to local ecosystem sites and a dedicated session for JST NEXUS teams.",
      "Chương trình thăm các điểm trong hệ sinh thái tại địa phương và phiên chuyên biệt cho các nhóm JST NEXUS.",
      "Visits to local ecosystem sites and a dedicated session for JST NEXUS teams.",
    ),
    audience: L(
      "Invited participants, NEXUS teams and strategic partners",
      "Khách mời, các nhóm NEXUS và đối tác chiến lược",
      "Invited participants, NEXUS teams and strategic partners",
    ),
  },
];

export const technicalThemes: TechnicalTheme[] = [
  {
    name: L(
      "Integrated Circuit Design and Verification",
      "Thiết kế và kiểm chứng mạch tích hợp",
      "集積回路設計と検証",
    ),
    scope: L(
      "Design methodology, verification, EDA, hardware systems and circuit technologies.",
      "Phương pháp thiết kế, kiểm chứng, EDA, hệ thống phần cứng và các công nghệ mạch.",
      "設計手法、検証、EDA、ハードウェアシステム、回路技術。",
    ),
    chairs: ["Prof. Tran Xuan Tu", "Dr. Bui Duy Hieu"],
  },
  {
    name: L(
      "Optoelectronic Devices and Semiconductor Chip Technology",
      "Linh kiện quang điện tử và công nghệ chip bán dẫn",
      "光電子デバイスと半導体チップ技術",
    ),
    scope: L(
      "Optoelectronic devices, integrated chip technologies and device applications.",
      "Linh kiện quang điện tử, công nghệ chip tích hợp và các ứng dụng linh kiện.",
      "光電子デバイス、集積チップ技術、デバイス応用。",
    ),
    chairs: ["Assoc. Prof. Dr. Tran Quoc Tien", "Assoc. Prof. Dr. Dao Thanh Toan"],
  },
  {
    name: L(
      "Advanced Materials Design and Smart Processing",
      "Thiết kế vật liệu tiên tiến và xử lý thông minh",
      "先進材料設計とスマートプロセッシング",
    ),
    scope: L(
      "Silicon, SiC, compound materials, processing, smart fabrication and materials innovation.",
      "Silicon, SiC, vật liệu hợp chất, công nghệ chế tạo, sản xuất thông minh và đổi mới vật liệu.",
      "シリコン、SiC、化合物材料、プロセス、スマート製造、材料イノベーション。",
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
      "Đóng gói và kiểm thử tiên tiến",
      "先進パッケージングとテスト",
    ),
    scope: L(
      "Packaging architectures, reliability, testing, characterization and production-readiness.",
      "Kiến trúc đóng gói, độ tin cậy, kiểm thử, đặc trưng hóa và mức sẵn sàng sản xuất.",
      "パッケージングアーキテクチャ、信頼性、テスト、評価、量産対応。",
    ),
    chairs: ["Assoc. Prof. Dr. Nguyen Tran Thuat", "Assoc. Prof. Dr. Pham Van Thanh"],
  },
  {
    name: L(
      "AI and Quantum Computing in Semiconductors",
      "AI và điện toán lượng tử trong bán dẫn",
      "半導体におけるAIと量子コンピューティング",
    ),
    scope: L(
      "Semiconductor technologies for AI, quantum computing, spintronics and emerging compute.",
      "Các công nghệ bán dẫn cho AI, điện toán lượng tử, spintronics và các hướng tính toán mới nổi.",
      "AI、量子コンピューティング、スピントロニクス、新世代コンピューティングのための半導体技術。",
    ),
    chairs: ["Assoc. Prof. Dr. Le Van Lich", "Dr. Nguyen Ngoc Linh"],
  },
  {
    name: L(
      "Emerging Technologies in Semiconductor Frontiers",
      "Công nghệ mới nổi ở tuyến đầu bán dẫn",
      "半導体フロンティアの新興技術",
    ),
    scope: L(
      "Nitrides, organic devices, smart sensors and frontier semiconductor platforms.",
      "Nitride, linh kiện hữu cơ, cảm biến thông minh và các nền tảng bán dẫn tuyến đầu.",
      "窒化物、有機デバイス、スマートセンサ、最先端半導体プラットフォーム。",
    ),
    chairs: ["Dr. Le Van Hai", "Prof. Dr. Nguyen Chung Hoa"],
  },
  {
    name: L(
      "Human Resource Development and Academic-Industrial Collaboration",
      "Phát triển nguồn nhân lực và hợp tác học thuật - công nghiệp",
      "人材育成と産学連携",
    ),
    scope: L(
      "Education, workforce development, internships, hiring pathways and joint training.",
      "Giáo dục, phát triển nhân lực, thực tập, con đường tuyển dụng và đào tạo chung.",
      "教育、人材育成、インターンシップ、採用パス、共同トレーニング。",
    ),
    chairs: ["Dr. Dang Thanh Tu", "Dr. Luong Minh Phuong"],
  },
];

export const implementationTimeline: TimelineItem[] = [
  {
    period: "April 2026",
    milestones: L(
      "Confirm organizing structure, refine partner proposal, decide sponsorship targets and shortlist venues.",
      "Xác nhận cấu trúc tổ chức, hoàn thiện proposal đối tác, quyết định mục tiêu tài trợ và shortlist địa điểm.",
      "Confirm organizing structure, refine partner proposal, decide sponsorship targets and shortlist venues.",
    ),
    owner: L(
      "Conference chairs, organizing committee and local committee",
      "Chủ trì hội nghị, organizing committee và local committee",
      "Conference chairs, organizing committee and local committee",
    ),
    output: L(
      "Updated proposal, outreach list and venue comparison",
      "Proposal cập nhật, danh sách outreach và so sánh địa điểm",
      "Updated proposal, outreach list and venue comparison",
    ),
  },
  {
    period: "May 2026",
    milestones: L(
      "Launch sponsor outreach, issue speaker invitations and confirm tracks and session chairs.",
      "Triển khai outreach nhà tài trợ, gửi thư mời diễn giả và xác nhận track cùng session chair.",
      "Launch sponsor outreach, issue speaker invitations and confirm tracks and session chairs.",
    ),
    owner: L(
      "Sponsorship committee and scientific committee",
      "Sponsorship committee và scientific committee",
      "Sponsorship committee and scientific committee",
    ),
    output: L(
      "Sponsor meetings, invited-speaker responses and draft program framework",
      "Cuộc họp với nhà tài trợ, phản hồi diễn giả mời và khung chương trình dự thảo",
      "Sponsor meetings, invited-speaker responses and draft program framework",
    ),
  },
  {
    period: "June 2026",
    milestones: L(
      "Open abstract process, confirm preliminary sponsor commitments and define site-visit plan.",
      "Mở nhận abstract, xác nhận cam kết tài trợ sơ bộ và xác lập kế hoạch site visit.",
      "Open abstract process, confirm preliminary sponsor commitments and define site-visit plan.",
    ),
    owner: L(
      "Scientific committee and local committee",
      "Scientific committee và local committee",
      "Scientific committee and local committee",
    ),
    output: L(
      "Call for abstracts, sponsor pipeline and site-visit shortlist",
      "Call for abstracts, pipeline nhà tài trợ và shortlist site visit",
      "Call for abstracts, sponsor pipeline and site-visit shortlist",
    ),
  },
  {
    period: "July 2026",
    milestones: L(
      "Review submissions, finalize keynote and plenary speakers, and confirm hybrid platform logistics.",
      "Rà soát bài gửi, chốt keynote và plenary speaker, đồng thời xác nhận logistics cho hybrid platform.",
      "Review submissions, finalize keynote and plenary speakers, and confirm hybrid platform logistics.",
    ),
    owner: L(
      "Program chairs, local committee and secretariat",
      "Program chairs, local committee và secretariat",
      "Program chairs, local committee and secretariat",
    ),
    output: L(
      "Accepted talks, draft program and logistics plan",
      "Danh sách bài được chọn, chương trình dự thảo và kế hoạch hậu cần",
      "Accepted talks, draft program and logistics plan",
    ),
  },
  {
    period: "August 2026",
    milestones: L(
      "Publish tentative program, confirm travel guidance and collect sponsor materials.",
      "Công bố chương trình dự kiến, chốt hướng dẫn di chuyển và thu thập materials của nhà tài trợ.",
      "Publish tentative program, confirm travel guidance and collect sponsor materials.",
    ),
    owner: L(
      "Secretariat, communications and sponsors",
      "Ban thư ký, nhóm truyền thông và nhà tài trợ",
      "Secretariat, communications and sponsors",
    ),
    output: L(
      "Program booklet draft, sponsor logos and registration updates",
      "Bản thảo booklet chương trình, logo nhà tài trợ và cập nhật đăng ký",
      "Program booklet draft, sponsor logos and registration updates",
    ),
  },
  {
    period: "September 1-19, 2026",
    milestones: L(
      "Finalize scripts, badges, signage, banquet, AV, hybrid testing and volunteer briefing.",
      "Chốt script phiên họp, badge, signage, banquet, AV, kiểm thử hybrid và briefing cho tình nguyện viên.",
      "Finalize scripts, badges, signage, banquet, AV, hybrid testing and volunteer briefing.",
    ),
    owner: L(
      "Local committee and secretariat",
      "Local committee và ban thư ký",
      "Local committee and secretariat",
    ),
    output: L(
      "Final run-of-show and production checklist",
      "Run-of-show cuối cùng và checklist triển khai",
      "Final run-of-show and production checklist",
    ),
  },
  {
    period: "September 20-23, 2026",
    milestones: L(
      "Execute the symposium, sponsor activities, speaker hosting, site visits and NEXUS session.",
      "Triển khai hội nghị, hoạt động với nhà tài trợ, đón tiếp diễn giả, site visit và NEXUS session.",
      "Execute the symposium, sponsor activities, speaker hosting, site visits and NEXUS session.",
    ),
    owner: L("All committees", "Toàn bộ các committee", "All committees"),
    output: L(
      "Conference delivery, media records and participation data",
      "Tổ chức hội nghị, hồ sơ truyền thông và dữ liệu tham dự",
      "Conference delivery, media records and participation data",
    ),
  },
  {
    period: "October 2026",
    milestones: L(
      "Prepare post-event report, share sponsor deliverables, collect feedback and develop follow-up collaborations.",
      "Hoàn thiện báo cáo sau sự kiện, bàn giao deliverables cho nhà tài trợ, lấy phản hồi và phát triển hợp tác nối tiếp.",
      "Prepare post-event report, share sponsor deliverables, collect feedback and develop follow-up collaborations.",
    ),
    owner: L(
      "Organizing committee and secretariat",
      "Organizing committee và ban thư ký",
      "Organizing committee and secretariat",
    ),
    output: L(
      "Post-event report and partner follow-up plan",
      "Báo cáo sau sự kiện và kế hoạch follow-up đối tác",
      "Post-event report and partner follow-up plan",
    ),
  },
];

export const criticalDecisions = [
  L(
    "Venue choice and budget envelope, including whether to prioritize VNU-VJU University or Sheraton Hanoi West Hotel.",
    "Lựa chọn địa điểm và khung ngân sách, bao gồm quyết định ưu tiên VNU-VJU University hay Sheraton Hanoi West Hotel.",
    "Venue choice and budget envelope, including whether to prioritize VNU-VJU University or Sheraton Hanoi West Hotel.",
  ),
  L(
    "Sponsor package definitions and the approval process for partner benefits.",
    "Định nghĩa gói tài trợ và quy trình phê duyệt quyền lợi đối tác.",
    "Sponsor package definitions and the approval process for partner benefits.",
  ),
  L(
    "Confirmed keynote and invited-speaker list, with travel support policy if applicable.",
    "Danh sách keynote và invited speaker đã xác nhận, kèm chính sách hỗ trợ di chuyển nếu áp dụng.",
    "Confirmed keynote and invited-speaker list, with travel support policy if applicable.",
  ),
  L(
    "Site-visit hosts and access permissions, especially for industrial or laboratory visits.",
    "Đơn vị tiếp đón site visit và quyền truy cập, đặc biệt với các chuyến thăm công nghiệp hoặc phòng thí nghiệm.",
    "Site-visit hosts and access permissions, especially for industrial or laboratory visits.",
  ),
  L(
    "Hybrid-event platform, recording policy and language / interpretation support.",
    "Nền tảng hybrid event, chính sách ghi hình và hỗ trợ ngôn ngữ / phiên dịch.",
    "Hybrid-event platform, recording policy and language / interpretation support.",
  ),
];

export const expectedOutcomes = [
  L(
    "New Vietnam-Japan research links, joint proposals, NEXUS-related collaboration and follow-up workshops.",
    "Các liên kết nghiên cứu mới giữa Việt Nam và Nhật Bản, đề xuất chung, hợp tác liên quan NEXUS và workshop tiếp nối.",
    "New Vietnam-Japan research links, joint proposals, NEXUS-related collaboration and follow-up workshops.",
  ),
  L(
    "Student exposure to semiconductor careers, study-abroad pathways and industry opportunities.",
    "Sinh viên được tiếp cận các lộ trình nghề nghiệp bán dẫn, cơ hội du học và cơ hội từ doanh nghiệp.",
    "Student exposure to semiconductor careers, study-abroad pathways and industry opportunities.",
  ),
  L(
    "Structured contact between companies, universities and young researchers.",
    "Kết nối có cấu trúc giữa doanh nghiệp, trường đại học và nhà nghiên cứu trẻ.",
    "Structured contact between companies, universities and young researchers.",
  ),
  L(
    "Closer coordination among universities, agencies, innovation centers and semiconductor ecosystem stakeholders.",
    "Tăng mức phối hợp giữa trường đại học, cơ quan, trung tâm đổi mới sáng tạo và các bên trong hệ sinh thái bán dẫn.",
    "Closer coordination among universities, agencies, innovation centers and semiconductor ecosystem stakeholders.",
  ),
  L(
    "Documented sponsor value through brand visibility, recruitment access and partner meetings.",
    "Giá trị được ghi nhận cho nhà tài trợ thông qua độ hiện diện thương hiệu, khả năng tiếp cận tuyển dụng và các cuộc gặp đối tác.",
    "Documented sponsor value through brand visibility, recruitment access and partner meetings.",
  ),
];

export const speakers: SpeakerRecord[] = [
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
      "Conference Chair of VJSS 2026 and Rector of Vietnam Japan University, leading the Hanoi edition.",
    ),
    bio: S(
      "Rector of Vietnam Japan University and Conference Chair of VJSS 2026. Leads the host institution responsible for the symposium\u2019s academic direction, local coordination and bilateral cooperation with Japanese partners.",
    ),
    image: "/assets/speakers/nguyen-hoang-oanh.jpg",
    imageAlt: S("Dr. Nguyen Hoang Oanh"),
    imageStatus: "verified",
    imageSource: "https://vju.ac.vn/wp-content/uploads/2023/10/2.-Nguyen-Hoang-Oanh.jpg",
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
      "Conference Chair on the Japan side and JST NEXUS Program Officer connecting VJSS 2026 with the NEXUS initiative.",
    ),
    bio: S(
      "JST NEXUS Program Officer and Conference Chair of VJSS 2026 on the Japan side. Anchors the symposium\u2019s alignment with NEXUS-linked semiconductor research and bilateral collaboration programs.",
    ),
    image: "/assets/speakers/toshiro-hiramoto.jpg",
    imageAlt: S("Prof. Toshiro Hiramoto"),
    imageStatus: "verified",
    imageSource: "https://www.vlsi.iis.u-tokyo.ac.jp/images/hiramoto.jpg",
  },
  {
    id: "le-duc-anh",
    name: "Assoc. Prof. Le Duc Anh",
    role: S("Associate Professor"),
    organization: S("The University of Tokyo"),
    country: "Vietnam-Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "nexus-session",
    topic: S("Bilateral research collaboration"),
    summary: S(
      "Associate Professor at The University of Tokyo and academic liaison bridging Vietnamese and Japanese semiconductor research communities.",
    ),
    bio: S(
      "Associate Professor at The University of Tokyo and a key academic liaison for VJSS 2026. Supports invited-speaker coordination, NEXUS-aligned research collaboration and Vietnam\u2013Japan academic partnerships.",
    ),
    image: "/assets/speakers/le-duc-anh.jpg",
    imageAlt: S("Assoc. Prof. Le Duc Anh"),
    imageStatus: "verified",
    imageSource: "https://cms.ee.t.u-tokyo.ac.jp/assets/re-deukku-ain.jpg",
  },
  {
    id: "bui-nguyen-quoc-trinh",
    name: "Assoc. Prof. Dr. Bui Nguyen Quoc Trinh",
    role: S("Director of ESCT"),
    organization: S("Vietnam Japan University"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "opening-ceremony",
    topic: S("Scientific program and host coordination"),
    summary: S(
      "Director of ESCT at Vietnam Japan University, leading scientific coordination for VJSS 2026 on the Vietnam side.",
    ),
    bio: S(
      "Director of the Electronics and Semiconductor Center of Technology (ESCT) at Vietnam Japan University. Member of the Organizing and Scientific Committees and one of the academic liaisons for VJSS 2026.",
    ),
    image: "/assets/speakers/bui-nguyen-quoc-trinh.jpg",
    imageAlt: S("Assoc. Prof. Dr. Bui Nguyen Quoc Trinh"),
    imageStatus: "verified",
    imageSource: "https://vju.ac.vn/wp-content/uploads/2023/10/PGS_TS_-Bui-Nguyen-Quoc-Trinh.jpg",
  },
  {
    id: "pham-tien-thanh",
    name: "Dr. Pham Tien Thanh",
    role: S("Vice Dean of FATE"),
    organization: S("Vietnam Japan University"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    topic: S("Program operations and local coordination"),
    summary: S(
      "Vice Dean of FATE at Vietnam Japan University, leading on-site program operations and scientific coordination for the Hanoi edition.",
    ),
    bio: S(
      "Vice Dean of the Faculty of Advanced Technology and Engineering (FATE) at Vietnam Japan University. Member of the Organizing, Local and Scientific Committees responsible for delivery of the symposium in Hanoi.",
    ),
    image: "/assets/speakers/pham-tien-thanh.jpg",
    imageAlt: S("Dr. Pham Tien Thanh"),
    imageStatus: "verified",
    imageSource: "https://vju.ac.vn/wp-content/uploads/2024/06/Dr.-Pham-Tien-Thanh.jpg",
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
    summary: S(
      "Invited speaker in the IC Design and Verification track, leading research on advanced VLSI design at VNU-ITI.",
    ),
    bio: S(
      "Professor at the VNU Information Technology Institute. Track lead for Integrated Circuit Design and Verification, focusing on design methodology, hardware systems and circuit technologies.",
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
    summary: S(
      "Invited speaker in the IC Design and Verification track, contributing on verification methodology and hardware systems.",
    ),
    bio: S(
      "Researcher at the VNU Information Technology Institute. Contributes to the IC Design and Verification track with a focus on verification flows and hardware system design.",
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
    summary: S(
      "Track lead for Optoelectronic Devices and Semiconductor Chip Technology, focusing on integrated chip technologies and device applications.",
    ),
    bio: S(
      "Associate Professor at the Vietnam Academy of Science and Technology. Leads the Optoelectronic Devices and Semiconductor Chip Technology track at VJSS 2026.",
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
    summary: S(
      "Invited speaker on optoelectronic devices and chip-technology applications, joining the Optoelectronic Devices track.",
    ),
    bio: S(
      "Associate Professor at the University of Transport and Communications. Contributes to the Optoelectronic Devices and Semiconductor Chip Technology track at VJSS 2026.",
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
    summary: S(
      "Track lead for Advanced Materials Design and Smart Processing, working on silicon, SiC and compound semiconductor materials.",
    ),
    bio: S(
      "Associate Professor at VNU Hanoi University of Science. Leads the Advanced Materials Design and Smart Processing track at VJSS 2026, focusing on materials innovation and smart fabrication.",
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
    summary: S(
      "Track lead for Advanced Packaging and Testing and Director of the VNU Semiconductor and Advanced Material Institute.",
    ),
    bio: S(
      "Associate Professor and Director of the VNU Semiconductor and Advanced Material Institute. Leads the Advanced Packaging and Testing track at VJSS 2026.",
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
    summary: S(
      "Track lead for AI and Quantum Computing in Semiconductors, focusing on semiconductor technologies for next-generation compute.",
    ),
    bio: S(
      "Associate Professor at VinUniversity. Leads the AI and Quantum Computing in Semiconductors track at VJSS 2026, covering AI accelerators, quantum computing and emerging compute platforms.",
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
    summary: S(
      "Invited speaker in the AI and Quantum Computing in Semiconductors track.",
    ),
    bio: S(
      "Researcher at Phenikaa University. Contributes to the AI and Quantum Computing in Semiconductors track at VJSS 2026 on emerging compute directions.",
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
      "Track lead for Emerging Technologies in Semiconductor Frontiers, bringing a security and policy perspective to spintronics and frontier platforms.",
    ),
    bio: S(
      "Researcher at the Vietnam Government Information Security Commission. Co-leads the Emerging Technologies in Semiconductor Frontiers track at VJSS 2026 with a focus on spintronics and trusted semiconductor platforms.",
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
    summary: S(
      "Co-lead of the Emerging Technologies in Semiconductor Frontiers track at Hanoi University of Science and Technology.",
    ),
    bio: S(
      "Professor at Hanoi University of Science and Technology. Co-leads the Emerging Technologies in Semiconductor Frontiers track at VJSS 2026.",
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
    summary: S(
      "Lecture speaker on semiconductor talent development and academic-industry collaboration.",
    ),
    bio: S(
      "Researcher at Vietnam Japan University. Contributes to the Human Resource Development and Academic-Industrial Collaboration track and student-facing lectures at VJSS 2026.",
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
    summary: S(
      "Contributor to the study-abroad and job-orientation session, covering education and workforce pathways for students.",
    ),
    bio: S(
      "Researcher at Vietnam Japan University. Supports the Human Resource Development and Academic-Industrial Collaboration track and the study-abroad and job-orientation session.",
    ),
    image: "/assets/speakers/luong-minh-phuong.jpg",
    imageAlt: S("Dr. Luong Minh Phuong"),
    imageStatus: "verified",
    imageSource: "https://vju.ac.vn/wp-content/uploads/2023/10/Luong-Minh-Phuong-scaled.jpg",
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
      "Industry liaison from Sony Semiconductors, bringing the industry view into workforce dialogue and sponsor engagement.",
    ),
    bio: S(
      "Industry representative from Sony Semiconductors. Liaison for sponsorship and external relations at VJSS 2026, connecting industry partners with students and the academic program.",
    ),
    image: makePlaceholderImage("Huynh Van Nhat", "#1f2937"),
  },
  {
    id: "seichi-yamasaki",
    name: "Prof. Seichi Yamasaki",
    role: S("Vice President"),
    organization: S("Hiroshima University"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "plenary-session-1",
    topic: S("Plenary keynote"),
    summary: S(
      "Plenary speaker and Vice President of Hiroshima University, representing Japanese semiconductor research leadership.",
    ),
    bio: S(
      "Vice President of Hiroshima University and plenary speaker at VJSS 2026, representing Japanese leadership in semiconductor research and education.",
    ),
    image: makePlaceholderImage("Seichi Yamasaki", "#1e3a8a"),
  },
  {
    id: "makoto-ikeda",
    name: "Prof. Makoto Ikeda",
    role: S("Professor"),
    organization: S("The University of Tokyo"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "lecture-session",
    topic: S("VLSI design and security hardware"),
    summary: S(
      "Lecture speaker on VLSI design and invited speaker on security hardware in the IC Design and Verification track.",
    ),
    bio: S(
      "Professor at The University of Tokyo. Delivers the VLSI design lecture for students and contributes to the IC Design and Verification track at VJSS 2026 on security hardware.",
    ),
    image: makePlaceholderImage("Makoto Ikeda", "#1d4ed8"),
  },
  {
    id: "ken-takeuchi",
    name: "Prof. Ken Takeuchi",
    role: S("Professor"),
    organization: S("The University of Tokyo"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-1",
    topic: S("Data-centric computing"),
    summary: S(
      "Invited speaker on data-centric computing in the IC Design and Verification track.",
    ),
    bio: S(
      "Professor at The University of Tokyo. Invited speaker on data-centric computing architectures in the IC Design and Verification track at VJSS 2026.",
    ),
    image: makePlaceholderImage("Ken Takeuchi", "#0f766e"),
  },
  {
    id: "pham-cong-kha",
    name: "Prof. Pham Cong Kha",
    role: S("Professor"),
    organization: S("The University of Electro-Communications"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-1",
    topic: S("VLSI design and RISC-V"),
    summary: S(
      "Invited speaker on VLSI design and RISC-V architecture in the IC Design and Verification track.",
    ),
    bio: S(
      "Professor at The University of Electro-Communications. Invited speaker at VJSS 2026 on VLSI design and RISC-V processor architectures.",
    ),
    image: makePlaceholderImage("Pham Cong Kha", "#7c2d12"),
  },
  {
    id: "tatsuro-endo",
    name: "Prof. Tatsuro Endo",
    role: S("Professor"),
    organization: S("Tohoku University"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-2",
    topic: S("Non-volatile memory technology"),
    summary: S(
      "Invited speaker on non-volatile memory technology in the Advanced Materials Design and Smart Processing track.",
    ),
    bio: S(
      "Professor at Tohoku University. Invited speaker at VJSS 2026 on non-volatile memory devices and materials.",
    ),
    image: makePlaceholderImage("Tatsuro Endo", "#9a3412"),
  },
  {
    id: "shinichiro-kuroki",
    name: "Prof. Shinichiro Kuroki",
    role: S("Professor"),
    organization: S("Hiroshima University"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-2",
    topic: S("SiC and resilient VLSI"),
    summary: S(
      "Invited speaker on SiC and resilient VLSI in the Advanced Materials Design and Smart Processing track.",
    ),
    bio: S(
      "Professor at Hiroshima University. Invited speaker at VJSS 2026 on silicon carbide (SiC) devices and resilient VLSI design.",
    ),
    image: makePlaceholderImage("Shinichiro Kuroki", "#155e75"),
  },
  {
    id: "tsutomu-araki",
    name: "Prof. Tsutomu Araki",
    role: S("Professor"),
    organization: S("Ritsumeikan University"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-2",
    topic: S("Nitride semiconductors"),
    summary: S(
      "Invited speaker on nitride semiconductor materials in the Advanced Materials Design and Smart Processing track.",
    ),
    bio: S(
      "Professor at Ritsumeikan University. Invited speaker at VJSS 2026 on nitride semiconductor materials and devices.",
    ),
    image: makePlaceholderImage("Tsutomu Araki", "#4338ca"),
  },
  {
    id: "yukio-sato",
    name: "Prof. Yukio Sato",
    role: S("Professor"),
    organization: S("Kumamoto University"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-2",
    topic: S("Ferroelectrics and electron microscopy"),
    summary: S(
      "Invited speaker on ferroelectric materials and electron microscopy in the Advanced Materials Design and Smart Processing track.",
    ),
    bio: S(
      "Professor at Kumamoto University. Invited speaker at VJSS 2026 on ferroelectric materials and advanced electron microscopy techniques.",
    ),
    image: makePlaceholderImage("Yukio Sato", "#a16207"),
  },
  {
    id: "do-danh-bich",
    name: "Assoc. Prof. Do Danh Bich",
    role: S("Associate Professor"),
    organization: S("Hanoi National University of Education"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-2",
    topic: S("Advanced materials design"),
    summary: S(
      "Invited speaker in the Advanced Materials Design and Smart Processing track.",
    ),
    bio: S(
      "Associate Professor at Hanoi National University of Education. Invited speaker at VJSS 2026 on advanced semiconductor materials.",
    ),
    image: makePlaceholderImage("Do Danh Bich", "#0e7490"),
  },
  {
    id: "do-hong-minh",
    name: "Dr. Do Hong Minh",
    role: S("Researcher"),
    organization: S("Le Quy Don Technical University"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-2",
    topic: S("Advanced materials and smart processing"),
    summary: S(
      "Invited speaker in the Advanced Materials Design and Smart Processing track.",
    ),
    bio: S(
      "Researcher at Le Quy Don Technical University. Invited speaker at VJSS 2026 on advanced semiconductor materials and smart processing.",
    ),
    image: makePlaceholderImage("Do Hong Minh", "#be123c"),
  },
  {
    id: "junichiro-shiomi",
    name: "Prof. Junichiro Shiomi",
    role: S("Professor"),
    organization: S("The University of Tokyo"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-3",
    topic: S("Thermal technology and phonon engineering"),
    summary: S(
      "Invited speaker on thermal technology and phonon engineering in the Advanced Packaging and Testing track.",
    ),
    bio: S(
      "Professor at The University of Tokyo. Invited speaker at VJSS 2026 on thermal management and phonon engineering for advanced semiconductor packaging.",
    ),
    image: makePlaceholderImage("Junichiro Shiomi", "#1f2937"),
  },
  {
    id: "pham-van-thanh",
    name: "Assoc. Prof. Pham Van Thanh",
    role: S("Associate Professor"),
    organization: S("VNU Hanoi University of Science"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-3",
    topic: S("Advanced packaging and testing"),
    summary: S(
      "Invited speaker in the Advanced Packaging and Testing track.",
    ),
    bio: S(
      "Associate Professor at VNU Hanoi University of Science. Invited speaker at VJSS 2026 in the Advanced Packaging and Testing track.",
    ),
    image: makePlaceholderImage("Pham Van Thanh", "#0f766e"),
  },
  {
    id: "masakazu-nakamura",
    name: "Prof. Masakazu Nakamura",
    role: S("Professor"),
    organization: S("Nara Institute of Science and Technology"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-3",
    topic: S("Organic semiconductors and flexible electronics"),
    summary: S(
      "Invited speaker on organic semiconductors and flexible electronics in the Emerging Technologies track.",
    ),
    bio: S(
      "Professor at the Nara Institute of Science and Technology. Invited speaker at VJSS 2026 on organic semiconductors and flexible electronics.",
    ),
    image: makePlaceholderImage("Masakazu Nakamura", "#7c3aed"),
  },
  {
    id: "nguyen-van-toan",
    name: "Assoc. Prof. Nguyen Van Toan",
    role: S("Associate Professor"),
    organization: S("Tohoku University"),
    country: "Vietnam-Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-3",
    topic: S("MEMS"),
    summary: S(
      "Invited speaker on MEMS in the Emerging Technologies in Semiconductor Frontiers track.",
    ),
    bio: S(
      "Associate Professor at Tohoku University and a Vietnam\u2013Japan bridge researcher. Invited speaker at VJSS 2026 on MEMS technologies.",
    ),
    image: makePlaceholderImage("Nguyen Van Toan", "#0369a1"),
  },
  {
    id: "masaaki-tanaka",
    name: "Prof. Masaaki Tanaka",
    role: S("Professor"),
    organization: S("The University of Tokyo"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-3",
    topic: S("Semiconductor spintronics"),
    summary: S(
      "Invited speaker on semiconductor spintronics in the Emerging Technologies track.",
    ),
    bio: S(
      "Professor at The University of Tokyo. Invited speaker at VJSS 2026 on semiconductor spintronics.",
    ),
    image: makePlaceholderImage("Masaaki Tanaka", "#1e40af"),
  },
  {
    id: "pham-nam-hai",
    name: "Prof. Pham Nam Hai",
    role: S("Professor"),
    organization: S("Institute of Science Tokyo"),
    country: "Vietnam-Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-3",
    topic: S("Spintronics"),
    summary: S(
      "Invited speaker on spintronics in the Emerging Technologies in Semiconductor Frontiers track.",
    ),
    bio: S(
      "Professor at the Institute of Science Tokyo and a Vietnam\u2013Japan bridge researcher. Invited speaker at VJSS 2026 on spintronics.",
    ),
    image: makePlaceholderImage("Pham Nam Hai", "#9a3412"),
  },
  {
    id: "vincent-tung",
    name: "Prof. Vincent Tung",
    role: S("Professor"),
    organization: S("The University of Tokyo"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-3",
    topic: S("2D semiconductors"),
    summary: S(
      "Invited speaker on 2D semiconductor materials and devices in the Emerging Technologies track.",
    ),
    bio: S(
      "Professor at The University of Tokyo. Invited speaker at VJSS 2026 on 2D semiconductor materials and device platforms.",
    ),
    image: makePlaceholderImage("Vincent Tung", "#0e7490"),
  },
  {
    id: "nguyen-duc-hoa",
    name: "Prof. Nguyen Duc Hoa",
    role: S("Professor"),
    organization: S("Hanoi University of Science and Technology"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-3",
    topic: S("Gas sensors and 2D materials"),
    summary: S(
      "Invited speaker on gas sensors and 2D materials in the Emerging Technologies track.",
    ),
    bio: S(
      "Professor at Hanoi University of Science and Technology. Invited speaker at VJSS 2026 on gas sensors and 2D semiconductor materials.",
    ),
    image: makePlaceholderImage("Nguyen Duc Hoa", "#155e75"),
  },
  {
    id: "duong-thanh-tung",
    name: "Assoc. Prof. Duong Thanh Tung",
    role: S("Associate Professor"),
    organization: S("Hanoi University of Science and Technology"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "parallel-session-3",
    topic: S("Perovskite materials"),
    summary: S(
      "Invited speaker on perovskite materials in the Emerging Technologies in Semiconductor Frontiers track.",
    ),
    bio: S(
      "Associate Professor at Hanoi University of Science and Technology. Invited speaker at VJSS 2026 on perovskite materials and device platforms.",
    ),
    image: makePlaceholderImage("Duong Thanh Tung", "#a16207"),
  },
  {
    id: "sadahiro-sugita",
    name: "Prof. Sadahiro Sugita",
    role: S("Professor"),
    organization: S("Institute of Science Tokyo"),
    country: "Japan",
    kind: "government" as SpeakerKind,
    sessionId: "study-abroad-job-orientation",
    topic: S("Workforce policy and industry-academia collaboration"),
    summary: S(
      "Invited speaker on semiconductor workforce policy, bringing METI policy experience into the human-resource development track.",
    ),
    bio: S(
      "Professor at the Institute of Science Tokyo with a METI background. Invited speaker at VJSS 2026 on semiconductor workforce policy and industry\u2013academia collaboration.",
    ),
    image: makePlaceholderImage("Sadahiro Sugita", "#374151"),
  },
  {
    id: "huynh-dang-chinh",
    name: "Assoc. Prof. Huynh Dang Chinh",
    role: S("Vice President"),
    organization: S("Hanoi University of Science and Technology"),
    country: "Vietnam",
    kind: "academia" as SpeakerKind,
    sessionId: "lecture-session",
    topic: S("Talent development and university-industry collaboration"),
    summary: S(
      "Invited speaker on semiconductor talent development from the Vice President of Hanoi University of Science and Technology.",
    ),
    bio: S(
      "Vice President of Hanoi University of Science and Technology. Invited speaker at VJSS 2026 on semiconductor talent development and university\u2013industry collaboration.",
    ),
    image: makePlaceholderImage("Huynh Dang Chinh", "#7c2d12"),
  },
  {
    id: "seiichi-miyazaki",
    name: "Prof. Seiichi Miyazaki",
    role: S("Vice President"),
    organization: S("Hiroshima University"),
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "lecture-session",
    topic: S("Talent development and academic-industrial collaboration"),
    summary: S(
      "Invited speaker on semiconductor talent development from the Vice President of Hiroshima University.",
    ),
    bio: S(
      "Vice President of Hiroshima University. Invited speaker at VJSS 2026 on semiconductor talent development and academic\u2013industrial collaboration.",
    ),
    image: makePlaceholderImage("Seiichi Miyazaki", "#1d4ed8"),
  },
  {
    id: "tsuyoshi-usagawa",
    name: "Prof. Tsuyoshi Usagawa",
    role: S("Professor"),
    organization: S("Kumamoto University / Vietnam Japan University"),
    country: "Vietnam-Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "lecture-session",
    topic: S("Bilateral talent and academic collaboration"),
    summary: S(
      "Invited speaker bridging Kumamoto University and Vietnam Japan University on bilateral talent development.",
    ),
    bio: S(
      "Professor with a joint appointment at Kumamoto University and Vietnam Japan University. Invited speaker at VJSS 2026 on bilateral talent development and academic collaboration.",
    ),
    image: makePlaceholderImage("Tsuyoshi Usagawa", "#0e7490"),
  },
];

export const featuredSpeakerIds = [
  "nguyen-hoang-oanh",
  "toshiro-hiramoto",
  "le-duc-anh",
  "tran-xuan-tu",
  "makoto-ikeda",
  "huynh-van-nhat",
];

export const speakerKindLabels = {
  all: L("All", "Tất cả", "すべて"),
  government: L("Government / public", "Cơ quan công", "公的機関"),
  academia: L("Academia", "Học thuật", "学術"),
  industry: L("Industry", "Doanh nghiệp", "産業界"),
};

export const speakerCountryLabels: Record<string, LocalizedText> = {
  all: L("All locations", "Tất cả khu vực", "すべての地域"),
  Vietnam: L("Vietnam", "Việt Nam", "ベトナム"),
  Japan: L("Japan", "Nhật Bản", "日本"),
  "Vietnam-Japan": L("Vietnam-Japan bridge", "Cầu nối Việt Nam - Nhật Bản", "日越ブリッジ"),
};

export const venueReference = {
  name: "Hanoi, Vietnam",
  address: S(
    "Final venue under review: Vietnam Japan University (VNU-VJU) or Sheraton Hanoi West Hotel",
  ),
  description: L(
    "Hanoi is the confirmed host city for the symposium, partner meetings, site visits and NEXUS activities.",
    "Hà Nội là thành phố chủ trì đã được xác nhận cho hội nghị, các cuộc gặp đối tác, site visit và hoạt động NEXUS.",
    "Hanoi is the confirmed host city for the symposium, partner meetings, site visits and NEXUS activities.",
  ),
  mapEmbed: "https://maps.google.com/maps?q=Hanoi%20Vietnam&z=11&hl=en&t=m&output=embed&iwloc=near",
  mapLink: "https://maps.google.com/?q=Hanoi+Vietnam",
};

export const venueDirections = [
  {
    title: L("Format and access", "Hình thức và tiếp cận", "Format and access"),
    body: L(
      "The event is planned as an in-person conference with hybrid participation. Venue fit will be judged against room capacity, AV requirements and sponsor-supported activities.",
      "Sự kiện được lên kế hoạch theo hình thức trực tiếp kết hợp hybrid. Địa điểm sẽ được đánh giá theo sức chứa, yêu cầu AV và khả năng hỗ trợ các hoạt động cùng nhà tài trợ.",
      "The event is planned as an in-person conference with hybrid participation. Venue fit will be judged against room capacity, AV requirements and sponsor-supported activities.",
    ),
  },
  {
    title: L("Operational dependencies", "Phụ thuộc vận hành", "Operational dependencies"),
    body: L(
      "Hybrid platform, recording policy and language / interpretation support remain open decisions and will affect venue setup.",
      "Nền tảng hybrid, chính sách ghi hình và hỗ trợ ngôn ngữ / phiên dịch vẫn đang chờ quyết định và sẽ ảnh hưởng trực tiếp đến cấu hình địa điểm.",
      "Hybrid platform, recording policy and language / interpretation support remain open decisions and will affect venue setup.",
    ),
  },
  {
    title: L("Site-visit integration", "Tích hợp site visit", "Site-visit integration"),
    body: L(
      "September 22 and 23 are reserved for site visits, ecosystem meetings and the NEXUS session, so logistics planning must cover movement beyond the conference hall.",
      "Ngày 22 và 23/9 dành cho site visit, gặp gỡ hệ sinh thái và NEXUS session, vì vậy kế hoạch hậu cần phải bao quát cả di chuyển ngoài khu vực hội trường.",
      "September 22 and 23 are reserved for site visits, ecosystem meetings and the NEXUS session, so logistics planning must cover movement beyond the conference hall.",
    ),
  },
];

export const venueHotels = [
  {
    area: S("Vietnam Japan University (VNU-VJU)"),
    description: L(
      "University-hosted option aligned with academic identity, campus-based scheduling and institutional visibility.",
      "Phương án tổ chức tại trường đại học, phù hợp với bản sắc học thuật, lịch trình trên campus và mức độ hiện diện thể chế.",
      "University-hosted option aligned with academic identity, campus-based scheduling and institutional visibility.",
    ),
  },
  {
    area: S("Sheraton Hanoi West Hotel"),
    description: L(
      "Hotel-conference option aligned with hospitality support, sponsor hosting and compact event operations.",
      "Phương án khách sạn - hội nghị, phù hợp với hỗ trợ lưu trú, hoạt động tiếp đón nhà tài trợ và vận hành sự kiện tập trung.",
      "Hotel-conference option aligned with hospitality support, sponsor hosting and compact event operations.",
    ),
  },
  {
    area: S("Site-visit hosts"),
    description: L(
      "Local semiconductor facilities, laboratories, innovation centers or industrial parks remain under coordination for the September 22-23 program.",
      "Các cơ sở bán dẫn, phòng thí nghiệm, trung tâm đổi mới sáng tạo hoặc khu công nghiệp tại địa phương vẫn đang được điều phối cho chương trình ngày 22-23/9.",
      "Local semiconductor facilities, laboratories, innovation centers or industrial parks remain under coordination for the September 22-23 program.",
    ),
  },
];

export const venueVisitorNotes = [
  {
    audience: L("Delegates", "Đại biểu tham dự", "Delegates"),
    note: L(
      "Travel and access guidance should be published only after the venue and site-visit hosts are confirmed.",
      "Hướng dẫn di chuyển và tiếp cận chỉ nên công bố sau khi địa điểm và đơn vị tiếp đón site visit được xác nhận.",
      "Travel and access guidance should be published only after the venue and site-visit hosts are confirmed.",
    ),
  },
  {
    audience: L("Sponsors and partners", "Nhà tài trợ và đối tác", "Sponsors and partners"),
    note: L(
      "The venue decision should consider luncheon formats, exhibition tables, partner meetings and recognition moments during opening and closing sessions.",
      "Quyết định về địa điểm cần xét tới khung luncheon, khu trưng bày, các buổi gặp đối tác và thời điểm vinh danh trong phiên khai mạc - bế mạc.",
      "The venue decision should consider luncheon formats, exhibition tables, partner meetings and recognition moments during opening and closing sessions.",
    ),
  },
  {
    audience: L("Speakers and committees", "Diễn giả và các committee", "Speakers and committees"),
    note: L(
      "Travel support policy, recording consent and interpretation support should be finalized before formal confirmations are sent.",
      "Chính sách hỗ trợ đi lại, chấp thuận ghi hình và hỗ trợ phiên dịch nên được chốt trước khi gửi xác nhận chính thức.",
      "Travel support policy, recording consent and interpretation support should be finalized before formal confirmations are sent.",
    ),
  },
];

export const ecosystemGroups: OrganizationGroup[] = [
  {
    id: "hosts",
    title: L("Hosted by", "Đơn vị chủ trì", "主催"),
    items: [
      {
        name: "Vietnam Japan University (VJU)",
        meta: L("Host institution", "Đơn vị chủ trì", "主催機関"),
        description: L(
          "Primary host institution for the Hanoi edition and the operational anchor for venue planning, local coordination and secretariat operations.",
          "Đơn vị chủ trì chính phiên bản Hà Nội và là điểm tựa vận hành cho địa điểm, điều phối tại chỗ và ban thư ký.",
          "ハノイ大会の主催機関であり、会場計画、現地調整、事務局運営の中核を担います。",
        ),
        link: "https://vju.ac.vn/",
        logo: "/assets/organizations/vju-logo.png",
        logoAlt: S("Vietnam Japan University logo"),
        assetStatus: "verified",
        assetSource: "https://vju.ac.vn/wp-content/uploads/2023/07/logo-2.png",
      },
      {
        name: "Association of Vietnamese Intellectuals in Japan (AVIJ)",
        meta: L("Co-host network", "Mạng lưới đồng chủ trì", "共同主催ネットワーク"),
        description: L(
          "Vietnam-Japan intellectual network co-hosting the symposium and supporting bilateral outreach.",
          "Mạng lưới trí thức Việt Nam tại Nhật Bản đồng chủ trì hội nghị và hỗ trợ outreach song phương.",
          "ベトナム・日本の知識人ネットワークとして共同主催し、両国間のアウトリーチを支援します。",
        ),
        link: "https://avij.org/",
        logo: "/assets/organizations/avij-logo.png",
        logoAlt: S("Association of Vietnamese Intellectuals in Japan logo"),
        assetStatus: "verified",
        assetSource:
          "https://conf.vanj.jp/2022/wp-content/uploads/2022/11/hoi-tri-thuc-VN-tai-NB-2.png",
      },
    ],
  },
  {
    id: "patrons",
    title: L("Patrons", "Đơn vị bảo trợ", "後援"),
    items: [
      {
        name: "Japan Science and Technology Agency (JST)",
        meta: L("Patron", "Đơn vị bảo trợ", "後援機関"),
        description: L(
          "Patron institution anchoring JST NEXUS participation and bilateral program alignment.",
          "Đơn vị bảo trợ, là điểm tựa thể chế cho sự tham gia của JST NEXUS và sự liên kết các chương trình song phương.",
          "JST NEXUSの参加と二国間プログラム連携を支える後援機関です。",
        ),
        link: "https://www.jst.go.jp/EN/",
        logo: "/assets/organizations/jst-logo.svg",
        logoAlt: S("Japan Science and Technology Agency logo"),
        assetStatus: "verified",
        assetSource: "https://www.jst.go.jp/EN/common/img/common/logo.svg",
      },
      {
        name: "National Innovation Center (NIC), Vietnam",
        meta: L("Patron", "Đơn vị bảo trợ", "後援機関"),
        description: L(
          "Innovation-system patron supporting ecosystem visibility and public-sector engagement in Vietnam.",
          "Đơn vị bảo trợ trong hệ đổi mới sáng tạo, hỗ trợ hiện diện hệ sinh thái và kết nối khu vực công tại Việt Nam.",
          "ベトナムのイノベーション・エコシステムにおける後援機関で、公的セクターとの連携を支援します。",
        ),
        link: "https://nic.gov.vn/",
        assetStatus: "pending",
      },
    ],
  },
  {
    id: "partners",
    title: L("Partner", "Đối tác", "パートナー"),
    items: [
      {
        name: "Vietnamese Academic Network in Japan (VANJ)",
        meta: L("Partner network", "Mạng lưới đối tác", "パートナーネットワーク"),
        description: L(
          "Academic network partner contributing to sponsor outreach, speaker engagement and bilateral communication.",
          "Mạng lưới học thuật đối tác, đóng góp vào outreach nhà tài trợ, kết nối diễn giả và truyền thông song phương.",
          "学術ネットワーク・パートナーとして、協賛アウトリーチ、講演者連携、両国間の広報を支援します。",
        ),
        link: "https://vanj.jp/",
        logo: "/assets/organizations/vanj-logo.png",
        logoAlt: S("Vietnamese Academic Network in Japan logo"),
        assetStatus: "verified",
        assetSource:
          "https://conf.vanj.jp/2020/wp-content/uploads/2020/11/logo_vanj_houjin_horizontal-01.png",
      },
    ],
  },
  {
    id: "external-relations",
    title: L("Sponsorship and external relations", "Tài trợ và đối ngoại", "協賛・対外連携"),
    items: [
      {
        name: "VANJ",
        meta: L("Outreach channel", "Kênh outreach", "アウトリーチ窓口"),
        description: L(
          "Coordinates sponsor outreach, partner relationship management and external-facing communication.",
          "Điều phối outreach nhà tài trợ, quản trị quan hệ đối tác và truyền thông hướng ra bên ngoài.",
          "協賛アウトリーチ、パートナー関係管理、対外広報を担います。",
        ),
        link: "https://vanj.jp/",
        logo: "/assets/organizations/vanj-logo.png",
        logoAlt: S("Vietnamese Academic Network in Japan logo"),
        assetStatus: "verified",
        assetSource:
          "https://conf.vanj.jp/2020/wp-content/uploads/2020/11/logo_vanj_houjin_horizontal-01.png",
      },
      {
        name: "Sony Semiconductors",
        meta: L("Industry liaison", "Kết nối doanh nghiệp", "産業界連携"),
        description: L(
          "Industry liaison through Dr. Huynh Van Nhat for sponsor outreach, workforce dialogue and company participation.",
          "Đầu mối doanh nghiệp qua Dr. Huynh Van Nhat cho outreach tài trợ, đối thoại nhân lực và sự tham gia của công ty.",
          "Huynh Van Nhat博士を窓口に、協賛アウトリーチ、人材対話、企業参加を支援します。",
        ),
        link: "https://www.sony-semicon.com/",
        logo: "/assets/organizations/sony-logo.png",
        logoAlt: S("Sony logo"),
        assetStatus: "verified",
        assetSource: "https://www.sony-semicon.com/files/62/logo_sony.svg",
      },
    ],
  },
];

export const partnerOrganizations = ecosystemGroups.flatMap((group) => group.items);

export const committeeGroups: CommitteeGroup[] = [
  {
    id: "leadership",
    title: L(
      "Leadership and organizing committee",
      "Lãnh đạo và organizing committee",
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
        status: S("Confirmed"),
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
        name: "Dr. Pham Tien Thanh",
        role: S("Organizing Committee"),
        affiliation: S("Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Do Ngoc Ha",
        role: S("Organizing Committee"),
        affiliation: S("Vietnam Japan University"),
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
    title: L("Secretariat", "Ban thư ký", "Secretariat"),
    members: [
      {
        name: "Bui Thu Trang",
        role: S("Secretariat"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Nguyen Tien Dat",
        role: S("Secretariat"),
        affiliation: S("Vietnam Japan University"),
        status: S("Listed"),
      },
      {
        name: "Nguyen Van Loi",
        role: S("Secretariat"),
        affiliation: S("Vietnam Japan University"),
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
      "Technical track contributors",
      "Diễn giả theo track kỹ thuật",
      "技術トラック登壇者",
    ),
    description: L(
      "Invited speakers and contributors confirmed across the seven technical themes of VJSS 2026.",
      "Diễn giả mời và các thành phần đóng góp đã được xác nhận trên bảy chủ đề kỹ thuật của VJSS 2026.",
      "VJSS 2026の7つの技術テーマに登壇する招待講演者・コントリビューター。",
    ),
    members: [
      {
        name: "Integrated Circuit Design and Verification",
        role: S("Invited speakers"),
        affiliation: S(
          "Prof. Ken Takeuchi; Prof. Makoto Ikeda; Prof. Pham Cong Kha; Prof. Tran Xuan Tu; Dr. Bui Duy Hieu",
        ),
        status: S("Confirmed"),
      },
      {
        name: "Optoelectronic Devices and Semiconductor Chip Technology",
        role: S("Invited speakers"),
        affiliation: S("Assoc. Prof. Tran Quoc Tien; Assoc. Prof. Dao Thanh Toan"),
        status: S("Confirmed"),
      },
      {
        name: "Advanced Materials Design and Smart Processing",
        role: S("Invited speakers"),
        affiliation: S(
          "Prof. Tatsuro Endo; Prof. Shinichiro Kuroki; Prof. Tsutomu Araki; Prof. Yukio Sato; Assoc. Prof. Nguyen Ngoc Dinh; Assoc. Prof. Do Danh Bich; Dr. Do Hong Minh",
        ),
        status: S("Confirmed"),
      },
      {
        name: "Advanced Packaging and Testing",
        role: S("Invited speakers"),
        affiliation: S(
          "Prof. Junichiro Shiomi; Assoc. Prof. Nguyen Tran Thuat; Assoc. Prof. Pham Van Thanh",
        ),
        status: S("Confirmed"),
      },
      {
        name: "AI and Quantum Computing in Semiconductors",
        role: S("Invited speakers"),
        affiliation: S("Assoc. Prof. Le Duc Anh; Assoc. Prof. Le Van Lich; Dr. Nguyen Ngoc Linh"),
        status: S("Confirmed"),
      },
      {
        name: "Emerging Technologies in Semiconductor Frontiers",
        role: S("Invited speakers"),
        affiliation: S(
          "Prof. Masakazu Nakamura; Assoc. Prof. Nguyen Van Toan; Prof. Masaaki Tanaka; Prof. Pham Nam Hai; Prof. Vincent Tung; Prof. Nguyen Duc Hoa; Assoc. Prof. Duong Thanh Tung; Dr. Le Van Hai",
        ),
        status: S("Confirmed"),
      },
      {
        name: "Human Resource Development and Academic-Industrial Collaboration",
        role: S("Invited speakers"),
        affiliation: S(
          "Prof. Sadahiro Sugita; Assoc. Prof. Huynh Dang Chinh; Prof. Seiichi Miyazaki; Prof. Tsuyoshi Usagawa",
        ),
        status: S("Confirmed"),
      },
    ],
  },
];

export const sponsorEngagementRoutes: SponsorRoute[] = [
  {
    goal: L("Talent pipeline", "Dòng chảy nhân lực", "Talent pipeline"),
    engagement: L(
      "Career session, student lecture support, booth, recruitment networking and mentoring table.",
      "Đồng hành phiên nghề nghiệp, hỗ trợ bài giảng cho sinh viên, booth, networking tuyển dụng và mentoring table.",
      "Career session, student lecture support, booth, recruitment networking and mentoring table.",
    ),
  },
  {
    goal: L("Research collaboration", "Hợp tác nghiên cứu", "Research collaboration"),
    engagement: L(
      "Technical-session participation, university meetings, NEXUS networking and site-visit discussions.",
      "Tham gia phiên kỹ thuật, họp với trường đại học, networking trong khuôn khổ NEXUS và thảo luận tại các điểm site visit.",
      "Technical-session participation, university meetings, NEXUS networking and site-visit discussions.",
    ),
  },
  {
    goal: L(
      "Brand and ecosystem visibility",
      "Hiện diện thương hiệu và hệ sinh thái",
      "Brand and ecosystem visibility",
    ),
    engagement: L(
      "Logo placement, opening and closing recognition, media materials and program-booklet exposure.",
      "Hiển thị logo, vinh danh trong khai mạc và bế mạc, xuất hiện trên tài liệu truyền thông và booklet chương trình.",
      "Logo placement, opening and closing recognition, media materials and program-booklet exposure.",
    ),
  },
  {
    goal: L("Thought leadership", "Dẫn dắt chuyên môn", "Thought leadership"),
    engagement: L(
      "Panel participation, industry remarks, invited lecture or a sponsored discussion where appropriate.",
      "Tham gia panel, phát biểu của doanh nghiệp, bài giảng invited hoặc một cuộc thảo luận được tài trợ nếu phù hợp.",
      "Panel participation, industry remarks, invited lecture or a sponsored discussion where appropriate.",
    ),
  },
  {
    goal: L(
      "Market and policy insight",
      "Góc nhìn thị trường và chính sách",
      "Market and policy insight",
    ),
    engagement: L(
      "Dialogue with universities, public agencies, innovation centers and semiconductor ecosystem stakeholders.",
      "Đối thoại với trường đại học, cơ quan công, trung tâm đổi mới sáng tạo và các bên trong hệ sinh thái bán dẫn.",
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
      "Gói đồng hành cấp tổ chức hoặc tài trợ mũi nhọn.",
      "Major institutional or flagship sponsorship package.",
    ),
    benefits: [
      L(
        "Top-tier recognition across core event materials",
        "Vinh danh ở cấp cao nhất trên các tài liệu chính của sự kiện",
        "Top-tier recognition across core event materials",
      ),
      L(
        "Opening-ceremony acknowledgement and priority booth placement",
        "Được nhắc tên tại khai mạc và ưu tiên bố trí booth",
        "Opening-ceremony acknowledgement and priority booth placement",
      ),
      L(
        "Panel or invited-speaker role where relevant",
        "Vai trò tham gia panel hoặc diễn giả mời khi phù hợp",
        "Panel or invited-speaker role where relevant",
      ),
      L(
        "Student engagement opportunity and post-event report",
        "Cơ hội đồng hành cùng sinh viên và báo cáo sau sự kiện",
        "Student engagement opportunity and post-event report",
      ),
    ],
  },
  {
    name: "Platinum Sponsor",
    amount: S("5,000 USD or equivalent"),
    contributionModel: L(
      "Premium financial or in-kind contribution.",
      "Đóng góp tài chính hoặc hiện vật ở mức premium.",
      "Premium financial or in-kind contribution.",
    ),
    benefits: [
      L("Prominent logo placement", "Vị trí logo nổi bật", "Prominent logo placement"),
      L(
        "Exhibition table and banquet or reception acknowledgement",
        "Bàn trưng bày và vinh danh trong banquet hoặc reception",
        "Exhibition table and banquet or reception acknowledgement",
      ),
      L(
        "Speaking or panel opportunity subject to program fit",
        "Cơ hội phát biểu hoặc tham gia panel nếu phù hợp với chương trình",
        "Speaking or panel opportunity subject to program fit",
      ),
      L(
        "Student engagement opportunity and complimentary registrations",
        "Cơ hội đồng hành cùng sinh viên và suất đăng ký miễn phí",
        "Student engagement opportunity and complimentary registrations",
      ),
    ],
  },
  {
    name: "Gold Sponsor",
    amount: S("3,000 USD or equivalent"),
    contributionModel: L(
      "Standard financial or in-kind contribution.",
      "Đóng góp tài chính hoặc hiện vật ở mức tiêu chuẩn.",
      "Standard financial or in-kind contribution.",
    ),
    benefits: [
      L("Logo placement", "Hiển thị logo", "Logo placement"),
      L("Exhibition table", "Bàn trưng bày", "Exhibition table"),
      L("Session acknowledgement", "Ghi nhận trong phiên", "Session acknowledgement"),
      L(
        "Networking access and selected complimentary registrations",
        "Quyền tham gia networking và một số suất đăng ký miễn phí",
        "Networking access and selected complimentary registrations",
      ),
    ],
  },
  {
    name: "Silver Sponsor",
    amount: S("1,000 USD or equivalent"),
    contributionModel: L(
      "Supporting contribution.",
      "Mức đóng góp hỗ trợ.",
      "Supporting contribution.",
    ),
    benefits: [
      L("Logo placement", "Hiển thị logo", "Logo placement"),
      L("Program booklet listing", "Được liệt kê trong booklet", "Program booklet listing"),
      L(
        "Poster or exhibition visibility",
        "Hiện diện ở poster hoặc khu trưng bày",
        "Poster or exhibition visibility",
      ),
      L("Networking access", "Quyền tham gia networking", "Networking access"),
    ],
  },
  {
    name: "In-kind Partner",
    amount: S("Value-based"),
    contributionModel: L(
      "Venue, AV, media, hospitality, travel, translation, printing or logistics support.",
      "Đồng hành bằng địa điểm, AV, truyền thông, hospitality, hỗ trợ di chuyển, phiên dịch, in ấn hoặc hậu cần.",
      "Venue, AV, media, hospitality, travel, translation, printing or logistics support.",
    ),
    benefits: [
      L(
        "Recognition aligned with contribution value and role",
        "Ghi nhận tương xứng với giá trị và vai trò đóng góp",
        "Recognition aligned with contribution value and role",
      ),
      L(
        "Integration into event materials where relevant",
        "Được tích hợp vào các tài liệu sự kiện khi phù hợp",
        "Integration into event materials where relevant",
      ),
    ],
  },
];

export const sponsorDeliverables = [
  L(
    "Logo placement on selected event materials, website or registration pages, backdrops and the program booklet.",
    "Hiển thị logo trên các tài liệu phù hợp của sự kiện, website hoặc trang đăng ký, backdrop và booklet chương trình.",
    "Logo placement on selected event materials, website or registration pages, backdrops and the program booklet.",
  ),
  L(
    "Exhibition or information table where venue layout permits.",
    "Khu trưng bày hoặc bàn thông tin nếu mặt bằng địa điểm cho phép.",
    "Exhibition or information table where venue layout permits.",
  ),
  L(
    "Recognition during opening and closing sessions and banquet according to tier.",
    "Vinh danh trong các phiên khai mạc, bế mạc và banquet theo hạng mục tài trợ.",
    "Recognition during opening and closing sessions and banquet according to tier.",
  ),
  L(
    "Opportunity to provide recruitment or technical materials to participants.",
    "Cơ hội gửi tài liệu tuyển dụng hoặc tài liệu kỹ thuật tới người tham dự.",
    "Opportunity to provide recruitment or technical materials to participants.",
  ),
  L(
    "Post-event summary including participation highlights, photos and sponsor visibility records where available.",
    "Bản tổng kết sau sự kiện bao gồm các điểm nhấn về tham dự, hình ảnh và hồ sơ hiện diện của nhà tài trợ khi có thể cung cấp.",
    "Post-event summary including participation highlights, photos and sponsor visibility records where available.",
  ),
];

export const submissionCards: CardCopy[] = [
  {
    title: L("Submission window", "Thời gian nộp bài", "投稿期間"),
    body: L(
      "Abstract and contributed-talk submissions open in June 2026. Templates, deadlines and the submission portal are announced on this page.",
      "Quy trình nhận abstract và contributed talk mở từ tháng 6/2026. Template, deadline và portal nộp bài được công bố tại trang này.",
      "アブストラクトおよびコントリビューテッド・トーク募集は2026年6月に開始します。テンプレート、締切、投稿ポータルは本ページで公開します。",
    ),
  },
  {
    title: L("Technical scope", "Phạm vi kỹ thuật", "技術スコープ"),
    body: L(
      "Submissions are accepted across the seven technical themes of VJSS 2026, from IC design to human-resource development.",
      "Các bài đóng góp được nhận trên bảy chủ đề kỹ thuật của VJSS 2026, từ thiết kế IC đến phát triển nguồn nhân lực.",
      "VJSS 2026の7つの技術テーマ（IC設計から人材育成まで）で投稿を受け付けます。",
    ),
  },
  {
    title: L(
      "Review and notification",
      "Review và thông báo kết quả",
      "査読と採否通知",
    ),
    body: L(
      "Reviewed by the Scientific Committee against the seven technical themes. Accepted talks are confirmed in July and published in the tentative program in August.",
      "Bài nộp được Scientific Committee xét theo bảy chủ đề kỹ thuật. Bài được chấp nhận sẽ được xác nhận trong tháng 7 và công bố trong chương trình dự kiến vào tháng 8.",
      "サイエンティフィック委員会が7つの技術テーマに沿って査読を実施。採択講演は7月に確定し、8月公開の暫定プログラムに掲載されます。",
    ),
  },
];

export const registrationCards: CardCopy[] = [
  {
    title: L("Participation format", "Hình thức tham gia", "参加形式"),
    body: L(
      "VJSS 2026 is held in person in Hanoi with hybrid participation options for selected sessions.",
      "VJSS 2026 diễn ra trực tiếp tại Hà Nội, đồng thời hỗ trợ tham gia hybrid cho một số phiên được lựa chọn.",
      "VJSS 2026はハノイで対面開催し、一部セッションはハイブリッド参加に対応します。",
    ),
  },
  {
    title: L("Who can attend", "Đối tượng tham dự", "対象参加者"),
    body: L(
      "Researchers, students, industry experts, public agencies, universities, innovation centers and JST NEXUS teams are all welcome.",
      "Nhà nghiên cứu, sinh viên, chuyên gia doanh nghiệp, cơ quan công, trường đại học, trung tâm đổi mới sáng tạo và các nhóm JST NEXUS đều được chào đón.",
      "研究者、学生、産業界の専門家、公的機関、大学、イノベーションセンター、JST NEXUSチームの参加を歓迎します。",
    ),
  },
  {
    title: L("Fees and invitation letters", "Phí và thư mời", "参加費と招聘状"),
    body: L(
      "Registration fees, payment instructions and invitation-letter requests will be announced ahead of the symposium.",
      "Mức phí, hướng dẫn thanh toán và yêu cầu thư mời sẽ được công bố trước khi hội nghị diễn ra.",
      "参加費、支払方法、招聘状の請求方法は会期前にご案内します。",
    ),
  },
];

export const contactEntries: ContactEntry[] = [
  {
    label: L("Conference secretariat", "Ban thư ký hội nghị", "事務局"),
    value: L(
      "VJSS 2026 Secretariat, Vietnam Japan University",
      "Ban thư ký VJSS 2026, Vietnam Japan University",
      "VJSS 2026事務局、Vietnam Japan University",
    ),
    detail: L(
      "Main contact for program operations, registration and event logistics.",
      "Đầu mối chính cho vận hành chương trình, đăng ký và hậu cần sự kiện.",
      "プログラム運営、参加登録、ロジスティクスに関する主たる窓口。",
    ),
  },
  {
    label: L("Academic liaison", "Liên hệ học thuật", "学術窓口"),
    value: S(
      "Assoc. Prof. Le Duc Anh, The University of Tokyo / Assoc. Prof. Dr. Bui Nguyen Quoc Trinh, Vietnam Japan University",
    ),
    detail: L(
      "Contact the academic liaisons for invited-speaker coordination, program questions and academic partnership discussions.",
      "Liên hệ các đầu mối học thuật cho việc điều phối diễn giả mời, câu hỏi về chương trình và thảo luận hợp tác học thuật.",
      "招待講演者の調整、プログラムに関するお問い合わせ、学術連携の説明については学術窓口までご連絡ください。",
    ),
    emails: ["anh@cryst.t.u-tokyo.ac.jp", "bnq.trinh@vju.ac.vn"],
  },
];

export const newsItems: NewsItem[] = [
  {
    date: S("June 2026"),
    status: "updated",
    title: L(
      "Call for abstracts now open",
      "Đã mở nhận abstract",
      "アブストラクト募集を開始",
    ),
    body: L(
      "Submission for abstracts and contributed talks is open across the seven technical themes. Templates, deadlines and the submission portal are published on the Call for Abstracts page.",
      "Quy trình nhận abstract và contributed talk đã mở trên cả bảy chủ đề kỹ thuật. Template, deadline và portal nộp bài được công bố tại trang Call for Abstracts.",
      "7つの技術テーマでアブストラクトおよびコントリビューテッド・トークの投稿受付を開始しました。テンプレート、締切、投稿ポータルはCall for Abstractsページに掲載しています。",
    ),
  },
  {
    date: S("May 2026"),
    status: "updated",
    title: L(
      "Sponsor outreach and invited-speaker invitations launched",
      "Đã khởi động outreach nhà tài trợ và gửi thư mời diễn giả",
      "協賛アウトリーチと招待講演者への招聘を開始",
    ),
    body: L(
      "Sponsorship outreach is under way, invited-speaker invitations have been sent and track chairs are being confirmed across the seven technical themes.",
      "Outreach nhà tài trợ đang triển khai, thư mời diễn giả đã được gửi và các session chair của bảy track kỹ thuật đang được xác nhận.",
      "協賛アウトリーチを開始し、招待講演者への招聘状を送付、7つの技術テーマのトラック議長を順次確定中です。",
    ),
  },
  {
    date: S("April 2026"),
    status: "updated",
    title: L(
      "VJSS 2026 confirmed for September 20\u201323 in Hanoi",
      "Xác nhận VJSS 2026 diễn ra 20\u201323/9 tại Hà Nội",
      "VJSS 2026をハノイで開催確定（2026年9月20–23日）",
    ),
    body: L(
      "The symposium is confirmed for September 20\u201323, 2026 in Hanoi, hosted by Vietnam Japan University and AVIJ, with JST and NIC as patrons. The program architecture, committee structure and sponsorship framework are now in place.",
      "Hội nghị đã được xác nhận tổ chức từ 20\u201323/9/2026 tại Hà Nội, chủ trì bởi Vietnam Japan University và AVIJ, với JST và NIC là đơn vị bảo trợ. Kiến trúc chương trình, cấu trúc các tiểu ban và khung tài trợ đã được thiết lập.",
      "シンポジウムは2026年9月20–23日、ハノイにてVietnam Japan UniversityとAVIJの主催、JSTとNICの後援で開催されます。プログラム構成、委員会体制、協賛フレームワークが整いました。",
    ),
  },
  {
    date: S("April 2026"),
    status: "draft",
    title: L(
      "Venue shortlist under review",
      "Shortlist địa điểm đang được xem xét",
      "会場ショートリスト検討中",
    ),
    body: L(
      "The organizing committee is comparing Vietnam Japan University (VNU-VJU) and Sheraton Hanoi West Hotel against budget, sponsor support and operational fit.",
      "Ban tổ chức đang so sánh Vietnam Japan University (VNU-VJU) và Sheraton Hanoi West Hotel theo các tiêu chí ngân sách, hỗ trợ nhà tài trợ và mức độ phù hợp vận hành.",
      "組織委員会はVietnam Japan University (VNU-VJU) とSheraton Hanoi West Hotelの2会場を、予算、協賛サポート、運営適合性の観点で比較検討中です。",
    ),
  },
];
