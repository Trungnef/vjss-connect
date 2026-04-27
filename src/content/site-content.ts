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
    "Partner, sponsor and invited speaker proposal",
    "Đề xuất gửi đối tác, nhà tài trợ và diễn giả mời",
    "Partner, sponsor and invited speaker proposal",
  ),
  tagline: L(
    "A four-day forum linking research, education, industry and public-sector cooperation between Vietnam and Japan.",
    "Diễn đàn kéo dài bốn ngày kết nối nghiên cứu, đào tạo, công nghiệp và hợp tác công giữa Việt Nam và Nhật Bản.",
    "ベトナムと日本の研究、教育、産業、公共連携をつなぐ4日間のフォーラム。",
  ),
  dates: L("September 20-23, 2026", "20-23 tháng 9, 2026", "2026年9月20日-23日"),
  venue: L("Hanoi, Vietnam", "Hà Nội, Việt Nam", "ベトナム・ハノイ"),
  format: L(
    "In-person conference with hybrid participation",
    "Hội nghị trực tiếp kết hợp tham dự hybrid",
    "対面開催（一部ハイブリッド参加対応）",
  ),
  referenceNote: L(
    "Prepared from the April 2026 conference plan and committee/program workbook.",
    "Nội dung được tổng hợp từ conference plan và workbook committee/program cập nhật tháng 4/2026.",
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
  title: L("Executive summary", "Tóm tắt điều hành", "Executive summary"),
  body: L(
    "VJSS 2026 is designed as a high-impact forum linking research, education, industry and public-sector cooperation between Vietnam and Japan. The Hanoi edition combines scientific sessions, plenary and invited talks, student-oriented lectures, career and study-abroad exchange, industry-policy dialogue, networking, and site visits.",
    "VJSS 2026 được thiết kế như một diễn đàn có tác động cao, kết nối nghiên cứu, giáo dục, công nghiệp và hợp tác công giữa Việt Nam và Nhật Bản. Phiên bản tại Hà Nội kết hợp các phiên khoa học, báo cáo plenary và invited, bài giảng hướng tới sinh viên, trao đổi nghề nghiệp và du học, đối thoại chính sách - công nghiệp, networking và các chuyến thăm thực địa.",
    "VJSS 2026 is designed as a high-impact forum linking research, education, industry and public-sector cooperation between Vietnam and Japan. The Hanoi edition combines scientific sessions, plenary and invited talks, student-oriented lectures, career and study-abroad exchange, industry-policy dialogue, networking, and site visits.",
  ),
  signature: L(
    "Prepared for outreach in April 2026",
    "Bản phục vụ outreach tháng 4/2026",
    "Prepared for outreach in April 2026",
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
      "Seven technical themes already mapped",
      "Bảy chủ đề kỹ thuật đã được xác lập",
      "7つの技術テーマを整理済み",
    ),
    body: L(
      "The working program already defines seven technical themes spanning IC design, optoelectronics, materials, packaging, AI and quantum, emerging devices, and human-resource development.",
      "Bản chương trình làm việc đã xác lập bảy chủ đề kỹ thuật bao trùm thiết kế vi mạch, quang điện tử, vật liệu, đóng gói, AI và lượng tử, công nghệ mới nổi và phát triển nguồn nhân lực.",
      "IC設計、光電子、材料、パッケージング、AI・量子、新興デバイス、人材育成までを含む7つの技術テーマを設定しています。",
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
    title: L("About VJSS 2026", "Giới thiệu VJSS 2026", "About VJSS 2026"),
    intro: L(
      "VJSS 2026 is positioned as a practical Vietnam-Japan platform for semiconductor research exchange, talent development, ecosystem building and long-term bilateral cooperation.",
      "VJSS 2026 được định vị là một nền tảng thực tiễn Việt Nam - Nhật Bản cho trao đổi nghiên cứu bán dẫn, phát triển nhân lực, xây dựng hệ sinh thái và hợp tác song phương dài hạn.",
      "VJSS 2026 is positioned as a practical Vietnam-Japan platform for semiconductor research exchange, talent development, ecosystem building and long-term bilateral cooperation.",
    ),
    visionTitle: L("Positioning", "Định vị", "Positioning"),
    missionTitle: L("Conference design", "Thiết kế hội nghị", "Conference design"),
    objectiveTitle: L("Objectives", "Mục tiêu", "Objectives"),
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
      "Why the timing matters",
    ),
    contextBody: L(
      "Semiconductors are foundational to AI, smart mobility, robotics, aerospace, advanced manufacturing and digital infrastructure. Japan brings deep research, manufacturing and industrial know-how, while Vietnam is rapidly building talent, policy momentum and ecosystem capacity.",
      "Bán dẫn là nền tảng của AI, giao thông thông minh, robot, hàng không vũ trụ, sản xuất tiên tiến và hạ tầng số. Nhật Bản có chiều sâu về nghiên cứu, sản xuất và know-how công nghiệp, trong khi Việt Nam đang tăng tốc về nhân lực, động lực chính sách và năng lực hệ sinh thái.",
      "Semiconductors are foundational to AI, smart mobility, robotics, aerospace, advanced manufacturing and digital infrastructure. Japan brings deep research, manufacturing and industrial know-how, while Vietnam is rapidly building talent, policy momentum and ecosystem capacity.",
    ),
    heritageTitle: L(
      "From Osaka 2025 to Hanoi 2026",
      "Từ Osaka 2025 đến Hà Nội 2026",
      "From Osaka 2025 to Hanoi 2026",
    ),
    heritageBody: L(
      "The second edition builds directly on the first VJSS in Osaka. The 2026 plan keeps bilateral cooperation at the center, but expands the format with site visits, a dedicated NEXUS session, a fuller sponsorship structure and a stronger student-facing agenda.",
      "Phiên bản thứ hai kế thừa trực tiếp từ kỳ VJSS đầu tiên tại Osaka. Kế hoạch 2026 vẫn giữ hợp tác song phương ở trung tâm, đồng thời mở rộng định dạng với site visit, NEXUS session chuyên biệt, cấu trúc tài trợ đầy đủ hơn và chương trình hướng tới sinh viên rõ nét hơn.",
      "The second edition builds directly on the first VJSS in Osaka. The 2026 plan keeps bilateral cooperation at the center, but expands the format with site visits, a dedicated NEXUS session, a fuller sponsorship structure and a stronger student-facing agenda.",
    ),
  },
  program: {
    title: L("Program and timeline", "Chương trình và lộ trình", "Program and timeline"),
    intro: L(
      "The current schedule is based on the April 19 working draft. Session times, poster format, site-visit hosts and some speaker assignments remain subject to program-committee confirmation.",
      "Lịch hiện tại dựa trên working draft ngày 19/4. Thời lượng từng phiên, định dạng poster, đơn vị tiếp đón site visit và một số phân công diễn giả vẫn chờ program committee xác nhận.",
      "The current schedule is based on the April 19 working draft. Session times, poster format, site-visit hosts and some speaker assignments remain subject to program-committee confirmation.",
    ),
    legendTitle: L("Working status", "Trạng thái làm việc", "Working status"),
    architectureTitle: L("Program architecture", "Kiến trúc chương trình", "Program architecture"),
    architectureBody: L(
      "VJSS 2026 combines scientific exchange, student development, industry-policy dialogue and field engagement in one schedule.",
      "VJSS 2026 kết hợp trao đổi khoa học, phát triển sinh viên, đối thoại công nghiệp - chính sách và kết nối thực địa trong cùng một lịch trình.",
      "VJSS 2026 combines scientific exchange, student development, industry-policy dialogue and field engagement in one schedule.",
    ),
    timelineTitle: L("Implementation timeline", "Timeline triển khai", "Implementation timeline"),
    timelineBody: L(
      "The working timeline runs from April outreach and venue decisions through October reporting and partner follow-up.",
      "Timeline triển khai kéo dài từ giai đoạn outreach, quyết định địa điểm trong tháng 4 cho tới báo cáo sau sự kiện và follow-up đối tác trong tháng 10.",
      "The working timeline runs from April outreach and venue decisions through October reporting and partner follow-up.",
    ),
    noteTitle: L("Critical decisions", "Các quyết định cần chốt sớm", "Critical decisions"),
    noteBody: L(
      "Venue, sponsorship model, invited-speaker confirmations, site-visit access, and language / recording support are the main dependencies in the current plan.",
      "Địa điểm, mô hình tài trợ, xác nhận diễn giả mời, quyền truy cập site visit và hỗ trợ ngôn ngữ / ghi hình là các phụ thuộc lớn nhất trong kế hoạch hiện tại.",
      "Venue, sponsorship model, invited-speaker confirmations, site-visit access, and language / recording support are the main dependencies in the current plan.",
    ),
  },
  speakers: {
    title: L(
      "Invited speakers and working roster",
      "Diễn giả mời và roster làm việc",
      "Invited speakers and working roster",
    ),
    intro: L(
      "The current speaker directory consolidates confirmed chairs, scientific-committee members and named track contributors from the uploaded planning files.",
      "Danh mục diễn giả hiện tại tổng hợp các chair, thành viên scientific committee và những người đóng góp theo track đã được nêu đích danh trong các file kế hoạch được tải lên.",
      "The current speaker directory consolidates confirmed chairs, scientific-committee members and named track contributors from the uploaded planning files.",
    ),
  },
  venue: {
    title: L("Venue and logistics", "Địa điểm và hậu cần", "Venue and logistics"),
    intro: L(
      "The host city is confirmed as Hanoi, while the final venue remains under review between a university-hosted option and a hotel-conference option.",
      "Thành phố tổ chức đã được xác định là Hà Nội, trong khi địa điểm cuối cùng vẫn đang được cân nhắc giữa phương án tổ chức tại trường đại học và phương án khách sạn - hội nghị.",
      "The host city is confirmed as Hanoi, while the final venue remains under review between a university-hosted option and a hotel-conference option.",
    ),
    nextTitle: L(
      "Venue decision status",
      "Tình trạng quyết định địa điểm",
      "Venue decision status",
    ),
    nextBody: L(
      "The organizing committee is comparing VNU-VJU University and Sheraton Hanoi West Hotel against budget, sponsor support and operational fit.",
      "Ban tổ chức đang so sánh VNU-VJU University và Sheraton Hanoi West Hotel theo các tiêu chí ngân sách, hỗ trợ từ nhà tài trợ và mức độ phù hợp vận hành.",
      "The organizing committee is comparing VNU-VJU University and Sheraton Hanoi West Hotel against budget, sponsor support and operational fit.",
    ),
    referenceTitle: L("Host city", "Thành phố tổ chức", "Host city"),
    referenceBody: L(
      "Hanoi serves as the anchor for the conference, partner meetings, site visits and the dedicated NEXUS session.",
      "Hà Nội đóng vai trò trung tâm cho hội nghị, các cuộc gặp đối tác, chương trình site visit và NEXUS session chuyên biệt.",
      "Hanoi serves as the anchor for the conference, partner meetings, site visits and the dedicated NEXUS session.",
    ),
  },
  organizers: {
    title: L(
      "Governance and committees",
      "Bộ máy tổ chức và các committee",
      "Governance and committees",
    ),
    intro: L(
      "The governance model separates strategic leadership, scientific quality control, local execution, sponsorship outreach and secretariat operations.",
      "Mô hình quản trị tách bạch lãnh đạo chiến lược, kiểm soát chất lượng khoa học, thực thi tại chỗ, outreach nhà tài trợ và vận hành ban thư ký.",
      "The governance model separates strategic leadership, scientific quality control, local execution, sponsorship outreach and secretariat operations.",
    ),
    partnerPlaceholderTitle: L(
      "Host and patron organizations",
      "Đơn vị chủ trì và bảo trợ",
      "Host and patron organizations",
    ),
    partnerPlaceholderBody: L(
      "The public-facing site should keep organizational roles explicit so partners, sponsors and invited speakers can see who owns each part of the event.",
      "Site công khai nên thể hiện rõ vai trò của từng tổ chức để đối tác, nhà tài trợ và diễn giả mời nhận biết đơn vị nào phụ trách từng phần của sự kiện.",
      "The public-facing site should keep organizational roles explicit so partners, sponsors and invited speakers can see who owns each part of the event.",
    ),
  },
  sponsors: {
    title: L("Partnership and sponsorship", "Hợp tác và tài trợ", "Partnership and sponsorship"),
    intro: L(
      "The proposal frames sponsorship as ecosystem participation: talent access, research exchange, thought leadership, recruitment visibility and documented post-event recognition.",
      "Bản proposal định nghĩa tài trợ như một hình thức tham gia hệ sinh thái: tiếp cận nhân lực, trao đổi nghiên cứu, hiện diện chuyên môn, khả năng tuyển dụng và ghi nhận sau sự kiện có chứng cứ.",
      "The proposal frames sponsorship as ecosystem participation: talent access, research exchange, thought leadership, recruitment visibility and documented post-event recognition.",
    ),
    upcomingTitle: L(
      "Working tier framework",
      "Khung hạng mục đang làm việc",
      "Working tier framework",
    ),
    upcomingBody: L(
      "Amounts and benefits remain subject to organizing-committee approval, but the tier logic is already defined for outreach.",
      "Mức đóng góp và quyền lợi vẫn chờ ban tổ chức phê duyệt, nhưng logic phân hạng đã được xác lập để phục vụ outreach.",
      "Amounts and benefits remain subject to organizing-committee approval, but the tier logic is already defined for outreach.",
    ),
  },
  cfp: {
    title: L(
      "Submission / Call for Abstracts",
      "Nộp bài / Call for Abstracts",
      "投稿案内 / Call for Abstracts",
    ),
    intro: L(
      "The abstract and contributed-talk process is planned for June 2026. The current page publishes the working scope so potential authors and speakers can prepare early.",
      "Quy trình nhận abstract và contributed talk dự kiến mở trong tháng 6/2026. Trang này công bố phạm vi làm việc hiện tại để tác giả và diễn giả tiềm năng có thể chuẩn bị sớm.",
      "The abstract and contributed-talk process is planned for June 2026. The current page publishes the working scope so potential authors and speakers can prepare early.",
    ),
  },
  registration: {
    title: L("Registration and attendance", "Đăng ký và tham dự", "Registration and attendance"),
    intro: L(
      "Registration content is being staged in parallel with venue, budget and sponsorship decisions. The attendee model and participation format are already clear even though fees are not yet published.",
      "Nội dung đăng ký đang được chuẩn bị song song với quyết định về địa điểm, ngân sách và tài trợ. Mô hình người tham dự và hình thức tham gia đã rõ, dù mức phí chưa được công bố.",
      "Registration content is being staged in parallel with venue, budget and sponsorship decisions. The attendee model and participation format are already clear even though fees are not yet published.",
    ),
  },
  contact: {
    title: L("Contact and liaison", "Liên hệ và đầu mối", "Contact and liaison"),
    intro: L(
      "The working proposal already identifies secretariat and academic-liaison contacts for sponsor outreach, invited-speaker coordination and program questions.",
      "Bản proposal đang làm việc đã xác định đầu mối ban thư ký và liên hệ học thuật cho outreach nhà tài trợ, điều phối diễn giả mời và các câu hỏi về chương trình.",
      "The working proposal already identifies secretariat and academic-liaison contacts for sponsor outreach, invited-speaker coordination and program questions.",
    ),
  },
  news: {
    title: L("Planning updates", "Cập nhật kế hoạch", "Planning updates"),
    intro: L(
      "These updates summarize the current planning package so the public site reflects the latest working assumptions without pretending the program is already final.",
      "Các cập nhật này tóm tắt gói kế hoạch hiện tại để site công khai phản ánh giả định làm việc mới nhất mà không tạo cảm giác chương trình đã được chốt hoàn toàn.",
      "These updates summarize the current planning package so the public site reflects the latest working assumptions without pretending the program is already final.",
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
      "Working format: one invited talk of 30 minutes and four contributed talks of 15 minutes, subject to final program design.",
      "Định dạng làm việc hiện tại gồm một invited talk 30 phút và bốn contributed talk 15 phút, chờ chốt theo thiết kế chương trình cuối cùng.",
      "Working format: one invited talk of 30 minutes and four contributed talks of 15 minutes, subject to final program design.",
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
      "Integrated Circuit Design and Verification",
    ),
    scope: L(
      "Design methodology, verification, EDA, hardware systems and circuit technologies.",
      "Phương pháp thiết kế, kiểm chứng, EDA, hệ thống phần cứng và các công nghệ mạch.",
      "Design methodology, verification, EDA, hardware systems and circuit technologies.",
    ),
    chairs: ["Prof. Tran Xuan Tu", "Dr. Bui Duy Hieu"],
  },
  {
    name: L(
      "Optoelectronic Devices and Semiconductor Chip Technology",
      "Linh kiện quang điện tử và công nghệ chip bán dẫn",
      "Optoelectronic Devices and Semiconductor Chip Technology",
    ),
    scope: L(
      "Optoelectronic devices, integrated chip technologies and device applications.",
      "Linh kiện quang điện tử, công nghệ chip tích hợp và các ứng dụng linh kiện.",
      "Optoelectronic devices, integrated chip technologies and device applications.",
    ),
    chairs: ["Assoc. Prof. Dr. Tran Quoc Tien", "Assoc. Prof. Dr. Dao Thanh Toan"],
  },
  {
    name: L(
      "Advanced Materials Design and Smart Processing",
      "Thiết kế vật liệu tiên tiến và xử lý thông minh",
      "Advanced Materials Design and Smart Processing",
    ),
    scope: L(
      "Silicon, SiC, compound materials, smart fabrication and materials innovation.",
      "Silicon, SiC, vật liệu hợp chất, chế tạo thông minh và đổi mới vật liệu.",
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
      "Đóng gói và kiểm thử tiên tiến",
      "Advanced Packaging and Testing",
    ),
    scope: L(
      "Packaging architectures, reliability, testing, characterization and production readiness.",
      "Kiến trúc đóng gói, độ tin cậy, kiểm thử, đặc trưng hóa và mức sẵn sàng sản xuất.",
      "Packaging architectures, reliability, testing, characterization and production readiness.",
    ),
    chairs: ["Assoc. Prof. Dr. Nguyen Tran Thuat", "Assoc. Prof. Dr. Pham Van Thanh"],
  },
  {
    name: L(
      "AI and Quantum Computing in Semiconductors",
      "AI và điện toán lượng tử trong bán dẫn",
      "AI and Quantum Computing in Semiconductors",
    ),
    scope: L(
      "Semiconductor technologies for AI, quantum computing, spintronics and emerging compute.",
      "Các công nghệ bán dẫn cho AI, điện toán lượng tử, spintronics và các hướng tính toán mới nổi.",
      "Semiconductor technologies for AI, quantum computing, spintronics and emerging compute.",
    ),
    chairs: ["Assoc. Prof. Dr. Le Van Lich", "Dr. Nguyen Ngoc Linh"],
  },
  {
    name: L(
      "Emerging Technologies in Semiconductor Frontiers",
      "Các công nghệ mới nổi ở tuyến đầu bán dẫn",
      "Emerging Technologies in Semiconductor Frontiers",
    ),
    scope: L(
      "Nitrides, organic devices, smart sensors and frontier semiconductor platforms.",
      "Nitride, linh kiện hữu cơ, cảm biến thông minh và các nền tảng bán dẫn tuyến đầu.",
      "Nitrides, organic devices, smart sensors and frontier semiconductor platforms.",
    ),
    chairs: ["Dr. Le Van Hai", "Prof. Dr. Nguyen Chung Hoa"],
  },
  {
    name: L(
      "Human Resource Development and Academic-Industrial Collaboration",
      "Phát triển nguồn nhân lực và hợp tác học thuật - công nghiệp",
      "Human Resource Development and Academic-Industrial Collaboration",
    ),
    scope: L(
      "Education, workforce development, internships, hiring pathways and joint training.",
      "Giáo dục, phát triển nhân lực, thực tập, con đường tuyển dụng và đào tạo chung.",
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
      "Conference chair leading the Hanoi edition and the host-side institutional coordination.",
    ),
    bio: S(
      "Named in the committee workbook as symposium chair and organizing-committee lead for VJSS 2026, representing the host university.",
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
      "Working conference chair on the Japan side and a key figure for NEXUS-linked collaboration planning.",
    ),
    bio: S(
      "Listed in the outreach proposal as conference chair to confirm, with a central role in connecting VJSS 2026 to JST NEXUS activities.",
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
    topic: S("Academic liaison and invited-speaker outreach"),
    summary: S(
      "Academic liaison for the planning package and a bridge between Vietnam and Japan research communities.",
    ),
    bio: S(
      "Appears in the organizing structure and the suggested contact block, supporting academic coordination and speaker engagement.",
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
    topic: S("Scientific coordination and host execution"),
    summary: S("Core organizing and scientific-committee lead for VJSS 2026 on the Vietnam side."),
    bio: S(
      "Appears across the organizing, local and scientific rosters, and is named in the proposal's academic contact block.",
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
    topic: S("Local committee coordination and program execution"),
    summary: S(
      "Local-committee member and scientific-committee contributor supporting day-to-day program planning.",
    ),
    bio: S(
      "Listed in both the local committee and scientific committee, with responsibilities spanning operations and academic coordination.",
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
        meta: L("Host organization", "Đơn vị chủ trì", "主催機関"),
        description: L(
          "Primary host institution for the Hanoi edition and the operational anchor for venue planning and local coordination.",
          "Đơn vị chủ trì chính của phiên bản Hà Nội và là đầu mối vận hành cho lập kế hoạch địa điểm cũng như điều phối tại chỗ.",
          "Primary host institution for the Hanoi edition and the operational anchor for venue planning and local coordination.",
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
          "Vietnam-Japan intellectual network supporting partner outreach and bilateral visibility.",
          "Mạng lưới trí thức Việt Nam tại Nhật hỗ trợ outreach đối tác và tăng hiện diện song phương.",
          "Vietnam-Japan intellectual network supporting partner outreach and bilateral visibility.",
        ),
        link: "https://avij.org/",
        logo: "/assets/organizations/avij-logo.png",
        logoAlt: S("Association of Vietnamese Intellectuals in Japan logo"),
        assetStatus: "verified",
        assetSource:
          "https://conf.vanj.jp/2022/wp-content/uploads/2022/11/hoi-tri-thuc-VN-tai-NB-2.png",
      },
      {
        name: "Vietnamese Academic Network in Japan (VANJ)",
        meta: L("Co-host network", "Mạng lưới đồng chủ trì", "共同主催ネットワーク"),
        description: L(
          "Academic network contributing to outreach, speaker engagement and sponsorship-facing communication.",
          "Mạng lưới học thuật hỗ trợ outreach, kết nối diễn giả và truyền thông hướng tới nhà tài trợ.",
          "Academic network contributing to outreach, speaker engagement and sponsorship-facing communication.",
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
    id: "patrons",
    title: L("Patrons", "Đơn vị bảo trợ", "後援"),
    items: [
      {
        name: "Japan Science and Technology Agency (JST)",
        meta: L("Patron", "Đơn vị bảo trợ", "後援機関"),
        description: L(
          "Named patron and institutional anchor for JST NEXUS participation in the 2026 plan.",
          "Đơn vị bảo trợ được nêu đích danh và là điểm tựa thể chế cho sự tham gia của JST NEXUS trong kế hoạch 2026.",
          "Named patron and institutional anchor for JST NEXUS participation in the 2026 plan.",
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
          "Innovation-system patron supporting ecosystem visibility and public-sector engagement.",
          "Đơn vị bảo trợ thuộc hệ đổi mới sáng tạo, góp phần tăng hiện diện hệ sinh thái và kết nối khu vực công.",
          "Innovation-system patron supporting ecosystem visibility and public-sector engagement.",
        ),
        link: "https://nic.gov.vn/",
        assetStatus: "pending",
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
          "Supports sponsor outreach, partner relationship management and external-facing communication.",
          "Hỗ trợ outreach nhà tài trợ, quản trị quan hệ đối tác và truyền thông hướng ra bên ngoài.",
          "Supports sponsor outreach, partner relationship management and external-facing communication.",
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
        meta: L("Industry link", "Kết nối doanh nghiệp", "産業界連携"),
        description: L(
          "Industry-facing bridge for sponsorship conversations, workforce dialogue and company participation, with liaison through Dr. Huynh Van Nhat.",
          "Cầu nối với doanh nghiệp cho các trao đổi về tài trợ, đối thoại nguồn nhân lực và sự tham gia của công ty, với đầu mối qua Dr. Huynh Van Nhat.",
          "Industry-facing bridge for sponsorship conversations, workforce dialogue and company participation, with liaison through Dr. Huynh Van Nhat.",
        ),
        link: "https://www.sony-semicon.com/",
        logo: "/assets/organizations/sony-logo.svg",
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
    title: L("Secretariat", "Ban thư ký", "Secretariat"),
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
      "Nhóm trưởng track và thành phần đóng góp",
      "Thematic session chairs and contributors",
    ),
    description: L(
      "These theme rosters come directly from the uploaded working files and should remain editable as confirmations arrive.",
      "Các roster theo chủ đề này được lấy trực tiếp từ file làm việc đã tải lên và cần tiếp tục để trạng thái editable khi có thêm xác nhận.",
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
    title: L("Current status", "Trạng thái hiện tại", "Current status"),
    body: L(
      "The abstract and contributed-talk process is planned for June 2026. The detailed portal, template and review workflow are not public yet.",
      "Quy trình nhận abstract và contributed talk dự kiến mở trong tháng 6/2026. Portal, template và quy trình review chi tiết hiện chưa công bố công khai.",
      "The abstract and contributed-talk process is planned for June 2026. The detailed portal, template and review workflow are not public yet.",
    ),
  },
  {
    title: L("Technical scope", "Phạm vi kỹ thuật", "Technical scope"),
    body: L(
      "Contributions are expected to align with the seven working themes already defined by the program committee.",
      "Các bài đóng góp dự kiến sẽ bám theo bảy chủ đề làm việc đã được program committee xác lập.",
      "Contributions are expected to align with the seven working themes already defined by the program committee.",
    ),
  },
  {
    title: L(
      "What will still be confirmed",
      "Những gì còn chờ xác nhận",
      "What will still be confirmed",
    ),
    body: L(
      "Deadlines, templates, poster format, final session labels and the submission URL will be published after committee approval.",
      "Deadline, template, định dạng poster, tên phiên cuối cùng và URL nộp bài sẽ được công bố sau khi ban chuyên môn phê duyệt.",
      "Deadlines, templates, poster format, final session labels and the submission URL will be published after committee approval.",
    ),
  },
];

export const registrationCards: CardCopy[] = [
  {
    title: L("Participation format", "Hình thức tham gia", "Participation format"),
    body: L(
      "The symposium is planned as an in-person event with hybrid participation options for selected sessions.",
      "Hội nghị được lên kế hoạch theo hình thức trực tiếp, đồng thời hỗ trợ tham gia hybrid cho một số phiên được lựa chọn.",
      "The symposium is planned as an in-person event with hybrid participation options for selected sessions.",
    ),
  },
  {
    title: L("Target attendees", "Nhóm người tham dự", "Target attendees"),
    body: L(
      "Researchers, students, industry experts, public agencies, universities, innovation centers and JST NEXUS teams are all in scope.",
      "Nhà nghiên cứu, sinh viên, chuyên gia doanh nghiệp, cơ quan công, trường đại học, trung tâm đổi mới sáng tạo và các nhóm JST NEXUS đều nằm trong phạm vi người tham dự mục tiêu.",
      "Researchers, students, industry experts, public agencies, universities, innovation centers and JST NEXUS teams are all in scope.",
    ),
  },
  {
    title: L("Pending publication items", "Nội dung còn chờ công bố", "Pending publication items"),
    body: L(
      "Fees, payment instructions, invitation-letter policy, accommodation notes and final travel guidance depend on venue and budget approvals.",
      "Mức phí, hướng dẫn thanh toán, chính sách thư mời, ghi chú lưu trú và hướng dẫn di chuyển cuối cùng phụ thuộc vào việc phê duyệt địa điểm và ngân sách.",
      "Fees, payment instructions, invitation-letter policy, accommodation notes and final travel guidance depend on venue and budget approvals.",
    ),
  },
];

export const contactEntries: ContactEntry[] = [
  {
    label: L("Conference secretariat", "Ban thư ký hội nghị", "Conference secretariat"),
    value: L(
      "VJSS 2026 Secretariat, Vietnam Japan University",
      "Ban thư ký VJSS 2026, Vietnam Japan University",
      "VJSS 2026 Secretariat, Vietnam Japan University",
    ),
    detail: L(
      "Primary administrative contact for program operations, registration flow and event logistics.",
      "Đầu mối hành chính chính cho vận hành chương trình, luồng đăng ký và hậu cần sự kiện.",
      "Primary administrative contact for program operations, registration flow and event logistics.",
    ),
  },
  {
    label: L("Academic liaison", "Liên hệ học thuật", "Academic liaison"),
    value: S(
      "Assoc. Prof. Le Duc Anh, The University of Tokyo / Assoc. Prof. Dr. Bui Nguyen Quoc Trinh, Vietnam Japan University",
    ),
    detail: L(
      "Named in the outreach proposal for invited-speaker coordination, program framing and academic partnership discussions.",
      "Được nêu trong proposal outreach như đầu mối cho điều phối diễn giả mời, định hình chương trình và thảo luận hợp tác học thuật.",
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
      "Đã hoàn thiện bộ tài liệu outreach làm việc",
      "Working outreach package prepared",
    ),
    body: L(
      "The current website content now reflects the April 2026 proposal and committee workbook rather than the earlier 2025 reference framing.",
      "Nội dung website hiện phản ánh proposal và committee workbook tháng 4/2026 thay vì khung tham chiếu 2025 trước đó.",
      "The current website content now reflects the April 2026 proposal and committee workbook rather than the earlier 2025 reference framing.",
    ),
  },
  {
    date: S("April 2026"),
    status: "draft",
    title: L(
      "Venue shortlist under review",
      "Shortlist địa điểm đang được xem xét",
      "Venue shortlist under review",
    ),
    body: L(
      "The committee is comparing Vietnam Japan University and Sheraton Hanoi West Hotel against budget, sponsor support and operational fit.",
      "Ban tổ chức đang so sánh Vietnam Japan University và Sheraton Hanoi West Hotel theo các tiêu chí ngân sách, hỗ trợ nhà tài trợ và mức độ phù hợp vận hành.",
      "The committee is comparing Vietnam Japan University and Sheraton Hanoi West Hotel against budget, sponsor support and operational fit.",
    ),
  },
  {
    date: S("May 2026"),
    status: "draft",
    title: L(
      "Sponsor outreach and speaker invitations scheduled",
      "Dự kiến bắt đầu outreach nhà tài trợ và gửi thư mời diễn giả",
      "Sponsor outreach and speaker invitations scheduled",
    ),
    body: L(
      "The working timeline assigns May to sponsor meetings, invited-speaker invitations and confirmation of tracks and session chairs.",
      "Timeline làm việc dành tháng 5 cho các cuộc gặp nhà tài trợ, thư mời diễn giả và việc xác nhận track cùng session chair.",
      "The working timeline assigns May to sponsor meetings, invited-speaker invitations and confirmation of tracks and session chairs.",
    ),
  },
  {
    date: S("June 2026"),
    status: "draft",
    title: L(
      "Abstract process targeted for launch",
      "Mục tiêu mở quy trình nhận abstract",
      "Abstract process targeted for launch",
    ),
    body: L(
      "The call for abstracts and contributed talks is planned for June, together with early sponsor-commitment confirmation and site-visit scoping.",
      "Call for abstracts và contributed talk được lên kế hoạch mở trong tháng 6, song song với việc xác nhận cam kết tài trợ ban đầu và khoanh vùng site visit.",
      "The call for abstracts and contributed talks is planned for June, together with early sponsor-commitment confirmation and site-visit scoping.",
    ),
  },
];
