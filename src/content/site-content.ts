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

// Structs
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

// Data Layer
export const conferenceIdentity = {
  shortName: "VJSS-2026",
  fullName: L(
    "The 2nd Vietnam–Japan Semiconductor Symposium 2026",
    "Hội nghị Bán dẫn Việt Nam - Nhật Bản lần thứ 2 năm 2026",
    "The 2nd Vietnam–Japan Semiconductor Symposium 2026"
  ),
  heroEyebrow: L(
    "The 2nd Vietnam–Japan Semiconductor Symposium 2026 (VJSS-2026)",
    "Hội nghị Bán dẫn Việt Nam - Nhật Bản lần thứ 2 năm 2026 (VJSS-2026)",
    "The 2nd Vietnam–Japan Semiconductor Symposium 2026 (VJSS-2026)"
  ),
  tagline: L(
    "Advancing Research, Education, Human Resource Development, and Industry Collaboration in Semiconductors.",
    "Thúc đẩy Nghiên cứu, Giáo dục, Phát triển Nguồn nhân lực và Hợp tác Công nghiệp trong lĩnh vực Bán dẫn.",
    "Advancing Research, Education, Human Resource Development, and Industry Collaboration in Semiconductors."
  ),
  dates: L("September 20-23, 2026", "20-23 tháng 9, 2026", "2026年9月20日-23日"),
  venue: L("Hanoi, Vietnam", "Hà Nội, Việt Nam", "ベトナム・ハノイ"),
  format: L(
    "In-person with hybrid participation support",
   "Trực tiếp, có hỗ trợ tham gia hybrid",
    "対面開催（ハイブリッド参加対応）"
  ),
  referenceNote: L(
    "The 2nd Vietnam–Japan Semiconductor Symposium 2026 (VJSS-2026)",
    "Hội nghị Bán dẫn Việt Nam - Nhật Bản lần thứ 2 năm 2026 (VJSS-2026)",
    "The 2nd Vietnam–Japan Semiconductor Symposium 2026 (VJSS-2026)"
  ),
  referenceEvent: {
    date: L("Sep 20-23, 2026", "20-23/9/2026", "2026年9月20-23日"),
    venue: "Hanoi, Vietnam",
    mapUrl: "https://maps.google.com/?q=Hanoi+Vietnam",
  },
};

// Removed mock metrics
export const homeMetrics: { value: string; label: LocalizedText }[] = [];

export const homeWelcome = {
  title: L("Welcome to VJSS-2026", "Chào mừng đến với VJSS-2026", "Welcome to VJSS-2026"),
  body: L(
    "The 2nd Vietnam–Japan Semiconductor Symposium 2026 (VJSS-2026): Advancing Research, Education, Human Resource Development, and Industry Collaboration in Semiconductors, hosted by VNU Vietnam Japan University (VNU-VJU) and the Association of Vietnamese Intellectuals in Japan (AVIJ), will be held on September 20–23, 2026, in Hanoi, Vietnam. VJSS-2026 aims to provide a platform for researchers, educators, students, industry leaders, policymakers, and innovation stakeholders from around the world to exchange knowledge, showcase cutting-edge research, strengthen academic–industry partnerships, and foster collaborative initiatives that advance semiconductor science, technology, education, and ecosystem development.",
    "Hội nghị Bán dẫn Việt Nam – Nhật Bản lần thứ 2 năm 2026 (VJSS-2026): Thúc đẩy Nghiên cứu, Giáo dục, Phát triển Nguồn nhân lực và Hợp tác Công nghiệp trong lĩnh vực Bán dẫn, do Trường Đại học Việt Nhật, ĐHQGHN (VNU-VJU) và Hội Trí thức Việt Nam tại Nhật Bản (AVIJ) đồng tổ chức, sẽ diễn ra từ ngày 20 đến ngày 23 tháng 9 năm 2026 tại Hà Nội, Việt Nam. VJSS-2026 nhằm mục đích cung cấp một diễn đàn cho các nhà nghiên cứu, nhà giáo dục, sinh viên, lãnh đạo doanh nghiệp, nhà hoạch định chính sách và các bên liên quan đổi mới sáng tạo từ khắp nơi trên thế giới trao đổi tri thức, trình bày các nghiên cứu tiên tiến, tăng cường quan hệ đối tác giữa học thuật và công nghiệp, và thúc đẩy các sáng kiến hợp tác nhằm phát triển khoa học, công nghệ, giáo dục và hệ sinh thái bán dẫn.",
    "The 2nd Vietnam–Japan Semiconductor Symposium 2026 (VJSS-2026): Advancing Research, Education, Human Resource Development, and Industry Collaboration in Semiconductors, hosted by VNU Vietnam Japan University (VNU-VJU) and the Association of Vietnamese Intellectuals in Japan (AVIJ), will be held on September 20–23, 2026, in Hanoi, Vietnam. VJSS-2026 aims to provide a platform for researchers, educators, students, industry leaders, policymakers, and innovation stakeholders from around the world to exchange knowledge, showcase cutting-edge research, strengthen academic–industry partnerships, and foster collaborative initiatives that advance semiconductor science, technology, education, and ecosystem development."
  ),
  signature: L(
    "Hanoi · September 20–23, 2026",
    "Hà Nội · 20–23 tháng 9, 2026",
    "ハノイ · 2026年9月20–23日"
  ),
};

// Removed speculative highlights
export const homeHighlights: { title: LocalizedText; body: LocalizedText }[] = [];

// Snapshot schedule strictly from schedule docx
export const homeProgramDays = [
  {
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("Sep 20"),
    title: L(
      "Lecture, orientation and opening sessions",
      "Bài giảng, định hướng và phiên khai mạc",
      "Lecture, orientation and opening sessions"
    ),
    items: [
      L("Lecture Session", "Phiên bài giảng", "Lecture Session"),
      L("Study abroad and job orientation", "Định hướng du học và nghề nghiệp", "Study abroad and job orientation"),
      L("Lunch break / luncheon session", "Nghỉ trưa / phiên ăn trưa", "Lunch break / luncheon session"),
      L("Opening Ceremony", "Lễ khai mạc", "Opening Ceremony"),
      L("Plenary Session 1", "Phiên toàn thể 1", "Plenary Session 1"),
      L("Coffee Break", "Nghỉ giải lao", "Coffee Break"),
      L("Parallel Session 1", "Phiên song song 1", "Parallel Session 1"),
      L("Welcome Reception and Networking", "Tiệc chiêu đãi chào mừng và kết nối", "Welcome Reception and Networking")
    ],
  },
  {
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("Sep 21"),
    title: L(
      "Plenary, poster and parallel sessions",
      "Phiên toàn thể, poster và song song",
      "Plenary, poster and parallel sessions"
    ),
    items: [
      L("Plenary Session 2", "Phiên toàn thể 2", "Plenary Session 2"),
      L("Coffee Break", "Nghỉ giải lao", "Coffee Break"),
      L("Parallel Session 2", "Phiên song song 2", "Parallel Session 2"),
      L("Lunch break / luncheon session", "Nghỉ trưa / phiên ăn trưa", "Lunch break / luncheon session"),
      L("Plenary Session 3 / Poster Session", "Phiên toàn thể 3 / Phiên poster", "Plenary Session 3 / Poster Session"),
      L("Coffee Break", "Nghỉ giải lao", "Coffee Break"),
      L("Parallel Session 3", "Phiên song song 3", "Parallel Session 3"),
      L("Closing and Banquet", "Lễ bế mạc và tiệc tối", "Closing and Banquet")
    ],
  },
  {
    day: L("Day 3", "Ngày 3", "Day 3"),
    date: S("Sep 22"),
    title: L("Site Visiting", "Chương trình tham quan thực tế", "Site Visiting"),
    items: [
      L("Site Visiting (AM)", "Tham quan thực tế (Sáng)", "Site Visiting (AM)"),
      L("Site Visiting (PM)", "Tham quan thực tế (Chiều)", "Site Visiting (PM)")
    ],
  },
  {
    day: L("Day 4", "Ngày 4", "Day 4"),
    date: S("Sep 23"),
    title: L("NEXUS Session and Site Visit", "Phiên NEXUS và Tham quan thực tế", "NEXUS Session and Site Visit"),
    items: [
      L("NEXUS Session (AM)", "Phiên NEXUS (Sáng)", "NEXUS Session (AM)"),
      L("Site Visit (PM)", "Tham quan thực tế (Chiều)", "Site Visit (PM)")
    ],
  },
];

// Removed timeline dates
export const homeImportantDates: { label: LocalizedText; value: LocalizedText }[] = [];

export const pageCopy = {
  about: {
    title: L("About VJSS-2026", "Giới thiệu VJSS-2026", "About VJSS-2026"),
    intro: L("Redirected", "Redirected", "Redirected"),
  },
  program: {
    title: L("Program", "Chương trình", "プログラム"),
    intro: L(
      "Detailed conference schedule for VJSS-2026 from Day 1 to Day 4.",
      "Lịch trình chi tiết hội thảo VJSS-2026 từ Ngày 1 đến Ngày 4.",
      "Detailed conference schedule for VJSS-2026 from Day 1 to Day 4."
    ),
    legendTitle: L("Session status", "Trạng thái phiên", "セッションステータス"),
    architectureTitle: L("Program architecture", "Kiến trúc chương trình", "プログラム構成"),
    architectureBody: L(
      "VJSS-2026 combines scientific sessions, student lectures, job orientation, networking and site visits.",
      "VJSS-2026 kết hợp các phiên khoa học, bài giảng cho sinh viên, định hướng nghề nghiệp, networking và tham quan thực tế.",
      "VJSS-2026 combines scientific sessions, student lectures, job orientation, networking and site visits."
    ),
    timelineTitle: L("Road to September 2026", "Lộ trình tới tháng 9/2026", "2026年9月までの道程"),
    timelineBody: L("Timeline placeholder", "Timeline placeholder", "Timeline placeholder"),
    noteTitle: L("What is being confirmed", "Nội dung đang được xác nhận", "確定中の項目"),
    noteBody: L(
      "Final venue confirmation is pending between Vietnam National University, Hanoi and Sheraton Hanoi West.",
      "Địa điểm tổ chức cuối cùng đang được hoàn thiện giữa Đại học Quốc gia Hà Nội và Sheraton Hanoi West.",
      "Final venue confirmation is pending between Vietnam National University, Hanoi and Sheraton Hanoi West."
    ),
  },
  speakers: {
    title: L("Invited Speakers", "Diễn giả Mời", "招待講演者"),
    intro: L(
      "Speakers will be updated soon.",
      "Danh sách diễn giả sẽ được cập nhật sớm.",
      "Speakers will be updated soon."
    ),
  },
  venue: {
    title: L("Venue & Accommodation", "Địa điểm & Lưu trú", "会場 & 宿泊"),
    intro: L(
      "The conference will be held in Hanoi, Vietnam, September 20-23, 2026.",
      "Hội thảo sẽ được tổ chức tại Hà Nội, Việt Nam, ngày 20-23 tháng 9 năm 2026.",
      "The conference will be held in Hanoi, Vietnam, September 20-23, 2026."
    ),
    nextTitle: L("Candidate Venues", "Các phương án địa điểm", "2つの会場候補"),
    nextBody: L(
      "Venue: Vietnam National University, Hanoi / Sheraton Hanoi West, final confirmation pending.",
      "Địa điểm: Đại học Quốc gia Hà Nội / Sheraton Hanoi West, đang chờ xác nhận cuối cùng.",
      "Venue: Vietnam National University, Hanoi / Sheraton Hanoi West, final confirmation pending."
    ),
    referenceTitle: L("Host city", "Thành phố tổ chức", "開催都市"),
    referenceBody: L(
      "Hanoi will host the symposium sessions, site visits, and the JST NEXUS session.",
      "Hà Nội sẽ chủ trì các phiên hội nghị, tham quan thực tế và phiên JST NEXUS.",
      "Hanoi will host the symposium sessions, site visits, and the JST NEXUS session."
    ),
  },
  organizers: {
    title: L("Organizers and committees", "Ban tổ chức và các tiểu ban", "主催と委員会"),
    intro: L(
      "VJSS-2026 is hosted by VNU Vietnam Japan University and AVIJ.",
      "VJSS-2026 được chủ trì tổ chức bởi Trường Đại học Việt Nhật và AVIJ.",
      "VJSS-2026 is hosted by VNU Vietnam Japan University and AVIJ."
    ),
    partnerPlaceholderTitle: L("Hosts and Patrons", "Đơn vị chủ trì và bảo trợ", "主催と後援"),
    partnerPlaceholderBody: L(
      "VNU Vietnam Japan University (VNU-VJU) and AVIJ host the symposium, with Japan Science and Technology Agency (JST) and National Innovation Center (NIC) as patrons.",
      "Trường Đại học Việt Nhật (VNU-VJU) và AVIJ chủ trì hội thảo, với Cơ quan Khoa học và Công nghệ Nhật Bản (JST) và Trung tâm Đổi mới sáng tạo Quốc gia (NIC) là các đơn vị bảo trợ.",
      "VNU Vietnam Japan University (VNU-VJU) and AVIJ host the symposium, with Japan Science and Technology Agency (JST) and National Innovation Center (NIC) as patrons."
    ),
  },
  sponsors: {
    title: L("Partners & Sponsors", "Đối tác & Nhà tài trợ", "パートナー & スポンサー"),
    intro: L(
      "Sponsors will be updated soon.",
      "Thông tin nhà tài trợ sẽ được cập nhật sớm.",
      "Sponsors will be updated soon."
    ),
  },
  cfp: {
    title: L("Call for Papers", "Call for Papers", "アブストラクト募集"),
    intro: L(
      "Authors wishing to present their work at VJSS-2026 are invited to submit an abstract in English.",
      "Các tác giả muốn trình bày công trình tại VJSS-2026 được mời nộp tóm tắt bằng tiếng Anh.",
      "Authors wishing to present their work at VJSS-2026 are invited to submit an abstract in English."
    ),
  },
  registration: {
    title: L("Symposium Registration", "Đăng ký Hội thảo", "シンポジウム参加登録"),
    intro: L(
      "Registration fees will be announced later. Details will be provided on the official symposium website.",
      "Lệ phí đăng ký sẽ được công bố sau. Chi tiết sẽ được cung cấp trên website chính thức của hội thảo.",
      "Registration fees will be announced later. Details will be provided on the official symposium website."
    ),
  },
  contact: {
    title: L("Contact Information", "Thông tin Liên hệ", "連絡先情報"),
    intro: L(
      "Reach out to the academic liaisons or conference secretariat for inquiries.",
      "Liên hệ với các đầu mối học thuật hoặc ban thư ký hội nghị nếu có câu hỏi.",
      "Reach out to the academic liaisons or conference secretariat for inquiries."
    ),
  },
  news: {
    title: L("News", "Tin tức", "ニュース"),
    intro: L("News placeholder", "News placeholder", "News placeholder"),
  },
};

// 16 sessions matching the schedule docx
export const programSessions: ProgramSession[] = [
  // Day 1: Sep 20, 2026
  {
    id: "d1-s1",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "08:30-11:00",
    title: S("Lecture Session"),
    themeId: "talent",
    theme: L("Academic and Talent", "Học thuật và nhân lực", "Academic and Talent"),
    status: "final",
    chairs: [],
    summary: L(
      "Student- and young researcher-oriented lectures on semiconductor technologies and career pathways.",
      "Bài giảng hướng tới sinh viên và nhà nghiên cứu trẻ về công nghệ bán dẫn và định hướng nghề nghiệp.",
      "Student- and young researcher-oriented lectures on semiconductor technologies and career pathways."
    ),
    speakerIds: [],
  },
  {
    id: "d1-s2",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "11:00-12:00",
    title: S("Study abroad and job orientation"),
    themeId: "talent",
    theme: L("Academic and Talent", "Học thuật và nhân lực", "Academic and Talent"),
    status: "final",
    chairs: [],
    summary: L(
      "Q&A with academic and industry representatives.",
      "Hỏi đáp với đại diện từ các viện nghiên cứu, trường đại học và doanh nghiệp.",
      "Q&A with academic and industry representatives."
    ),
    speakerIds: [],
  },
  {
    id: "d1-s3",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "12:00-13:30",
    title: S("Lunch break / luncheon session"),
    themeId: "networking",
    theme: L("Networking", "Kết nối", "Networking"),
    status: "final",
    chairs: [],
    summary: L(
      "Potential sponsor-supported luncheon or student networking format.",
      "Khung ăn trưa đồng hành bởi nhà tài trợ hoặc định dạng kết nối mạng lưới sinh viên.",
      "Potential sponsor-supported luncheon or student networking format."
    ),
    speakerIds: [],
  },
  {
    id: "d1-s4",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "13:30-14:00",
    title: S("Opening Ceremony"),
    themeId: "opening",
    theme: L("Opening and Plenary", "Khai mạc và Toàn thể", "Opening and Plenary"),
    status: "final",
    chairs: [],
    summary: L(
      "Welcome remarks by host organizations, patrons and key partners.",
      "Phát biểu khai mạc của các đơn vị chủ trì, bảo trợ và đối tác chính.",
      "Welcome remarks by host organizations, patrons and key partners."
    ),
    speakerIds: [],
  },
  {
    id: "d1-s5",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "14:00-15:30",
    title: S("Plenary Session 1"),
    themeId: "plenary",
    theme: L("Opening and Plenary", "Khai mạc và Toàn thể", "Opening and Plenary"),
    status: "final",
    chairs: [],
    summary: L(
      "Plenary and invited presentations.",
      "Các bài trình bày toàn thể và diễn giả khách mời.",
      "Plenary and invited presentations."
    ),
    speakerIds: [],
  },
  {
    id: "d1-s6",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "15:30-15:45",
    title: S("Coffee Break"),
    themeId: "networking",
    theme: L("Networking", "Kết nối", "Networking"),
    status: "final",
    chairs: [],
    summary: L(
      "Sponsor visibility and networking.",
      "Trưng bày của nhà tài trợ và giao lưu kết nối.",
      "Sponsor visibility and networking."
    ),
    speakerIds: [],
  },
  {
    id: "d1-s7",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "15:45-17:30",
    title: S("Parallel Session 1"),
    themeId: "parallel",
    theme: L("Parallel Sessions", "Phiên song song", "Parallel Sessions"),
    status: "final",
    chairs: [],
    summary: L(
      "Working format: 1 invited talk (30 min) and 4 contributed talks (15 min each), subject to final program.",
      "Định dạng: 1 bài trình bày khách mời (30 phút) và 4 bài trình bày đóng góp (15 phút mỗi bài), tùy thuộc chương trình cuối cùng.",
      "Working format: 1 invited talk (30 min) and 4 contributed talks (15 min each), subject to final program."
    ),
    speakerIds: [],
  },
  {
    id: "d1-s8",
    day: L("Day 1", "Ngày 1", "Day 1"),
    date: S("September 20, 2026"),
    time: "17:30-",
    title: S("Welcome Reception and Networking"),
    themeId: "networking",
    theme: L("Networking", "Kết nối", "Networking"),
    status: "final",
    chairs: [],
    summary: L(
      "Opening-day networking for speakers, sponsors, partners and participants.",
      "Tiệc chiêu đãi chào mừng dành cho diễn giả, nhà tài trợ, đối tác và người tham dự.",
      "Opening-day networking for speakers, sponsors, partners and participants."
    ),
    speakerIds: [],
  },
  // Day 2: Sep 21, 2026
  {
    id: "d2-s1",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "09:00-10:30",
    title: S("Plenary Session 2"),
    themeId: "plenary",
    theme: L("Opening and Plenary", "Khai mạc và Toàn thể", "Opening and Plenary"),
    status: "final",
    chairs: [],
    summary: L(
      "Plenary and invited presentations.",
      "Các bài trình bày toàn thể và diễn giả khách mời.",
      "Plenary and invited presentations."
    ),
    speakerIds: [],
  },
  {
    id: "d2-s2",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "10:30-10:45",
    title: S("Coffee Break"),
    themeId: "networking",
    theme: L("Networking", "Kết nối", "Networking"),
    status: "final",
    chairs: [],
    summary: L(
      "Sponsor visibility and networking.",
      "Trưng bày của nhà tài trợ và giao lưu kết nối.",
      "Sponsor visibility and networking."
    ),
    speakerIds: [],
  },
  {
    id: "d2-s3",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "10:45-12:00",
    title: S("Parallel Session 2"),
    themeId: "parallel",
    theme: L("Parallel Sessions", "Phiên song song", "Parallel Sessions"),
    status: "final",
    chairs: [],
    summary: L(
      "Technical sessions across thematic tracks.",
      "Các phiên kỹ thuật theo các chủ đề chuyên đề.",
      "Technical sessions across thematic tracks."
    ),
    speakerIds: [],
  },
  {
    id: "d2-s4",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "12:00-13:30",
    title: S("Lunch break / luncheon session"),
    themeId: "networking",
    theme: L("Networking", "Kết nối", "Networking"),
    status: "final",
    chairs: [],
    summary: L(
      "Optional sponsor-hosted luncheon or focused networking.",
      "Phiên ăn trưa tùy chọn do nhà tài trợ chủ trì hoặc kết nối tập trung.",
      "Optional sponsor-hosted luncheon or focused networking."
    ),
    speakerIds: [],
  },
  {
    id: "d2-s5",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "13:30-15:00",
    title: S("Plenary Session 3 / Poster Session"),
    themeId: "plenary",
    theme: L("Opening and Plenary", "Khai mạc và Toàn thể", "Opening and Plenary"),
    status: "final",
    chairs: [],
    summary: L(
      "Option under discussion: plenary talk plus poster session.",
      "Phương án đang thảo luận: bài trình bày toàn thể kết hợp phiên poster.",
      "Option under discussion: plenary talk plus poster session."
    ),
    speakerIds: [],
  },
  {
    id: "d2-s6",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "15:00-15:15",
    title: S("Coffee Break"),
    themeId: "networking",
    theme: L("Networking", "Kết nối", "Networking"),
    status: "final",
    chairs: [],
    summary: L("Networking.", "Giao lưu kết nối.", "Networking."),
    speakerIds: [],
  },
  {
    id: "d2-s7",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "15:15-17:00",
    title: S("Parallel Session 3"),
    themeId: "parallel",
    theme: L("Parallel Sessions", "Phiên song song", "Parallel Sessions"),
    status: "final",
    chairs: [],
    summary: L(
      "Working format: 1 invited talk (30 min) and 4 contributed talks (15 min each), subject to final program.",
      "Định dạng: 1 bài trình bày khách mời (30 phút) và 4 bài trình bày đóng góp (15 phút mỗi bài), tùy thuộc chương trình cuối cùng.",
      "Working format: 1 invited talk (30 min) and 4 contributed talks (15 min each), subject to final program."
    ),
    speakerIds: [],
  },
  {
    id: "d2-s8",
    day: L("Day 2", "Ngày 2", "Day 2"),
    date: S("September 21, 2026"),
    time: "17:30-",
    title: S("Closing and Banquet"),
    themeId: "networking",
    theme: L("Networking", "Kết nối", "Networking"),
    status: "final",
    chairs: [],
    summary: L(
      "Awards, closing remarks and partner recognition.",
      "Trao giải thưởng, phát biểu bế mạc và vinh danh đối tác.",
      "Awards, closing remarks and partner recognition."
    ),
    speakerIds: [],
  },
  // Day 3: Sep 22, 2026
  {
    id: "d3-s1",
    day: L("Day 3", "Ngày 3", "Day 3"),
    date: S("September 22, 2026"),
    time: "AM",
    title: S("Site Visiting"),
    themeId: "sitevisit",
    theme: L("Site Visiting", "Tham quan thực tế", "Site Visiting"),
    status: "final",
    chairs: [],
    summary: L(
      "Visits to local semiconductor-related facilities, laboratories, innovation centers or industrial parks.",
      "Tham quan các cơ sở liên quan đến bán dẫn, phòng thí nghiệm, trung tâm đổi mới sáng tạo hoặc khu công nghiệp tại địa phương.",
      "Visits to local semiconductor-related facilities, laboratories, innovation centers or industrial parks."
    ),
    speakerIds: [],
  },
  {
    id: "d3-s2",
    day: L("Day 3", "Ngày 3", "Day 3"),
    date: S("September 22, 2026"),
    time: "PM",
    title: S("Site Visiting"),
    themeId: "sitevisit",
    theme: L("Site Visiting", "Tham quan thực tế", "Site Visiting"),
    status: "final",
    chairs: [],
    summary: L(
      "Continuation of technical / ecosystem visits and partner meetings.",
      "Tiếp tục các chuyến tham quan kỹ thuật / hệ sinh thái và gặp gỡ đối tác.",
      "Continuation of technical / ecosystem visits and partner meetings."
    ),
    speakerIds: [],
  },
  // Day 4: Sep 23, 2026
  {
    id: "d4-s1",
    day: L("Day 4", "Ngày 4", "Day 4"),
    date: S("September 23, 2026"),
    time: "AM",
    title: S("NEXUS Session"),
    themeId: "nexus",
    theme: L("NEXUS Session", "Phiên NEXUS", "NEXUS Session"),
    status: "final",
    chairs: [],
    summary: L(
      "Dedicated session for JST NEXUS teams and related bilateral collaboration discussions.",
      "Phiên chuyên đề dành riêng cho các nhóm JST NEXUS và thảo luận hợp tác song phương liên quan.",
      "Dedicated session for JST NEXUS teams and related bilateral collaboration discussions."
    ),
    speakerIds: [],
  },
  {
    id: "d4-s2",
    day: L("Day 4", "Ngày 4", "Day 4"),
    date: S("September 23, 2026"),
    time: "PM",
    title: S("Site Visit"),
    themeId: "sitevisit",
    theme: L("Site Visiting", "Tham quan thực tế", "Site Visiting"),
    status: "final",
    chairs: [],
    summary: L(
      "Follow-up site visit, institutional meetings or collaboration discussions.",
      "Tham quan thực tế tiếp nối, gặp gỡ cấp tổ chức hoặc thảo luận hợp tác.",
      "Follow-up site visit, institutional meetings or collaboration discussions."
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
    id: "talent",
    label: L("Academic and Talent", "Học thuật và nhân lực", "Academic and Talent"),
  },
  {
    id: "parallel",
    label: L("Parallel Sessions", "Phiên song song", "Parallel Sessions"),
  },
  {
    id: "networking",
    label: L("Networking", "Kết nối", "Networking"),
  },
  {
    id: "sitevisit",
    label: L("Site Visiting", "Tham quan thực tế", "Site Visiting"),
  },
  {
    id: "nexus",
    label: L("NEXUS Session", "Phiên NEXUS", "NEXUS Session"),
  },
];

export const programArchitecture: ProgramArchitectureItem[] = [];

// Themes matching exact lists (no chairs rendering)
export const technicalThemes: TechnicalTheme[] = [
  {
    name: L(
      "Integrated Circuit Design and Verification",
      "Thiết kế và Kiểm chứng Mạch tích hợp",
      "集積回路設計と検証"
    ),
    scope: L(
      "IC and VLSI design methodologies; Electronic Design Automation (EDA) and design technologies; Circuit and system verification; RISC-V and hardware architecture; Security hardware; Data-centric and energy-efficient computing systems.",
      "Phương pháp thiết kế IC và VLSI; Tự động hóa thiết kế điện tử (EDA) và công nghệ thiết kế; Kiểm chứng mạch và hệ thống; Kiến trúc phần cứng RISC-V; Phần cứng bảo mật; Hệ thống tính toán tập trung dữ liệu và tiết kiệm năng lượng.",
      "IC and VLSI design methodologies; Electronic Design Automation (EDA) and design technologies; Circuit and system verification; RISC-V and hardware architecture; Security hardware; Data-centric and energy-efficient computing systems."
    ),
    chairs: [],
  },
  {
    name: L(
      "Optoelectronic Devices and Semiconductor Chip Technology",
      "Linh kiện Quang điện tử và Công nghệ Chip Bán dẫn",
      "光電子デバイスと半導体チップ技術"
    ),
    scope: L(
      "Semiconductor devices, device physics and applications; Optoelectronic and photonic devices; Electronic-photonic integrated circuits and chip technologies; Sensors, imaging, and optical communication devices; Device integration and chip-level platforms.",
      "Linh kiện bán dẫn, vật lý linh kiện và ứng dụng; Linh kiện quang điện tử và photonics; Mạch tích hợp điện tử-quang và công nghệ chip; Cảm biến, hình ảnh và thiết bị truyền thông quang; Tích hợp linh kiện và các nền tảng cấp chip.",
      "Semiconductor devices, device physics and applications; Optoelectronic and photonic devices; Electronic-photonic integrated circuits and chip technologies; Sensors, imaging, and optical communication devices; Device integration and chip-level platforms."
    ),
    chairs: [],
  },
  {
    name: L(
      "Advanced Materials Design and Smart Processing",
      "Thiết kế Vật liệu Tiên tiến và Xử lý Thông minh",
      "先端材料設計とスマートプロセス"
    ),
    scope: L(
      "Silicon, SiC, compound semiconductors, and nitride semiconductors; Ferroelectric, magnetic, organic, perovskite, and two-dimensional materials; Materials design, characterization, and processing; Smart manufacturing and semiconductor process innovation; Defects, interfaces, reliability, and materials informatics.",
      "Silicon, SiC, bán dẫn hợp chất và bán dẫn nitride; Vật liệu sắt điện, từ tính, hữu cơ, perovskite và vật liệu hai chiều; Thiết kế, đặc trưng hóa và xử lý vật liệu; Sản xuất thông minh và đổi mới quy trình bán dẫn; Sai hỏng, giao diện, độ tin cậy và tin học vật liệu.",
      "Silicon, SiC, compound semiconductors, and nitride semiconductors; Ferroelectric, magnetic, organic, perovskite, and two-dimensional materials; Materials design, characterization, and processing; Smart manufacturing and semiconductor process innovation; Defects, interfaces, reliability, and materials informatics."
    ),
    chairs: [],
  },
  {
    name: L(
      "Advanced Packaging and Testing",
      "Đóng gói và Kiểm thử Tiên tiến",
      "先端パッケージングとテスト"
    ),
    scope: L(
      "Advanced packaging technologies; Heterogeneous integration; Thermal management and phonon engineering; Reliability, testing, and evaluation; Packaging for high-performance, high-reliability, and mass-production-ready systems.",
      "Công nghệ đóng gói tiên tiến; Tích hợp dị thể; Quản lý nhiệt và kỹ thuật phonon; Độ tin cậy, kiểm thử và đánh giá; Đóng gói cho các hệ thống hiệu năng cao, độ tin cậy cao và sẵn sàng sản xuất hàng loạt.",
      "Advanced packaging technologies; Heterogeneous integration; Thermal management and phonon engineering; Reliability, testing, and evaluation; Packaging for high-performance, high-reliability, and mass-production-ready systems."
    ),
    chairs: [],
  },
  {
    name: L(
      "AI and Quantum Computing in Semiconductors",
      "AI và Điện toán Lượng tử trong Bán dẫn",
      "半導体におけるAIと量子コンピューティング"
    ),
    scope: L(
      "AI-assisted semiconductor design, processing, and characterization; Quantum materials and quantum devices; Spintronics and new computing paradigms; Semiconductor platforms for quantum and neuromorphic computing; AI, data science, and automation in semiconductor research and manufacturing.",
      "Thiết kế, xử lý và đặc trưng hóa bán dẫn được hỗ trợ bởi AI; Vật liệu lượng tử và linh kiện lượng tử; Spintronics và các mô hình tính toán mới; Nền tảng bán dẫn cho tính toán lượng tử và phỏng sinh học (neuromorphic); AI, khoa học dữ liệu và tự động hóa trong nghiên cứu và sản xuất bán dẫn.",
      "AI-assisted semiconductor design, processing, and characterization; Quantum materials and quantum devices; Spintronics and new computing paradigms; Semiconductor platforms for quantum and neuromorphic computing; AI, data science, and automation in semiconductor research and manufacturing."
    ),
    chairs: [],
  },
  {
    name: L(
      "Emerging Semiconductor Frontiers",
      "Các Lĩnh vực Tiên phong Mới nổi trong Bán dẫn",
      "半導体の新フロンティア"
    ),
    scope: L(
      "MEMS and sensor technologies; Flexible and organic electronics; Gas sensors and environmental sensing technologies; Frontier semiconductor materials and novel devices; Emerging concepts and next-generation semiconductor applications.",
      "Công nghệ MEMS và cảm biến; Điện tử hữu cơ và linh hoạt; Cảm biến khí và công nghệ cảm biến môi trường; Vật liệu bán dẫn tiên phong và linh kiện mới lạ; Khái niệm mới nổi và các ứng dụng bán dẫn thế hệ tiếp theo.",
      "MEMS and sensor technologies; Flexible and organic electronics; Gas sensors and environmental sensing technologies; Frontier semiconductor materials and novel devices; Emerging concepts and next-generation semiconductor applications."
    ),
    chairs: [],
  },
  {
    name: L(
      "Human Resource Development and Academic-Industrial Collaboration",
      "Phát triển Nguồn nhân lực và Hợp tác Học thuật - Công nghiệp",
      "人材育成と産学連携"
    ),
    scope: L(
      "Semiconductor education and curriculum development; Joint training programs and international education models; Internships, recruitment, and career development; University-industry collaboration and technology transfer; Policy, innovation ecosystems, and Vietnam-Japan semiconductor cooperation.",
      "Giáo dục bán dẫn và phát triển chương trình đào tạo; Các chương trình đào tạo chung và mô hình giáo dục quốc tế; Thực tập, tuyển dụng và phát triển nghề nghiệp; Hợp tác đại học-doanh nghiệp và chuyển giao công nghệ; Chính sách, hệ sinh thái đổi mới sáng tạo và hợp tác bán dẫn Việt Nam - Nhật Bản.",
      "Semiconductor education and curriculum development; Joint training programs and international education models; Internships, recruitment, and career development; University-industry collaboration and technology transfer; Policy, innovation ecosystems, and Vietnam-Japan semiconductor cooperation."
    ),
    chairs: [],
  },
];

// Removed arrays to enforce document scope
export const implementationTimeline: TimelineItem[] = [];
export const criticalDecisions: LocalizedText[] = [];
export const expectedOutcomes: LocalizedText[] = [];

// Empty speakers list to match placeholder requirements
export const speakers: SpeakerRecord[] = [];
export const featuredSpeakerIds: string[] = [];

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
    "Vietnam National University, Hanoi / Sheraton Hanoi West, final confirmation pending"
  ),
  description: L(
    "The conference will be held in Hanoi, Vietnam, September 20-23, 2026.",
    "Hội thảo sẽ diễn ra tại Hà Nội, Việt Nam, ngày 20-23 tháng 9 năm 2026.",
    "The conference will be held in Hanoi, Vietnam, September 20-23, 2026."
  ),
  mapEmbed: "https://www.openstreetmap.org/export/embed.html?bbox=105.6%2C20.9%2C106.0%2C21.1&layer=mapnik&marker=21.0285%2C105.8542",
  mapLink: "https://maps.google.com/?q=Hanoi+Vietnam",
};

export const venueDirections = [
  {
    title: L("Conference Format and Venue", "Hình thức và Địa điểm hội thảo", "Conference Format and Venue"),
    body: L(
      "Venue: Hanoi, Vietnam. Format: In-person with hybrid participation support.",
      "Địa điểm: Hà Nội, Việt Nam. Hình thức: Trực tiếp kết hợp hybrid.",
      "Venue: Hanoi, Vietnam. Format: In-person with hybrid participation support."
    ),
  },
];

export const venueHotels = [
  {
    area: S("Vietnam National University, Hanoi"),
    description: L(
      "Venue option 1, final confirmation pending.",
      "Phương án địa điểm 1, đang chờ xác nhận cuối cùng.",
      "Venue option 1, final confirmation pending."
    ),
  },
  {
    area: S("Sheraton Hanoi West"),
    description: L(
      "Venue option 2, final confirmation pending.",
      "Phương án địa điểm 2, đang chờ xác nhận cuối cùng.",
      "Venue option 2, final confirmation pending."
    ),
  },
];

export const venueVisitorNotes = [
  {
    audience: L("Notice", "Ghi chú", "Notice"),
    note: L(
      "Detailed travel and access directions to be updated soon.",
      "Hướng dẫn di chuyển và tiếp cận chi tiết sẽ được cập nhật sớm.",
      "Detailed travel and access directions to be updated soon."
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
          "ハノイ大会の主催機関であり、会場計画、現地調整、事務局運営の中核を担います。"
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
          "ベトナム・日本の知識人ネットワークとして共同主催し、両国間のアウトリーチを支援します。"
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
          "JST NEXUSの参加と二国間プログラム連携を支える後援機関です。"
        ),
        link: "https://www.jst.go.jp/EN/",
        logo: "/assets/organizations/jst-logo.png",
        logoAlt: S("Japan Science and Technology Agency logo"),
        assetStatus: "verified",
        assetSource: "https://www.jst.go.jp/EN/common/img/common/logo.svg",
      },
      {
        name: "Consulate General of the Socialist Republic of Vietnam in Osaka, Japan",
        meta: L("Patron", "Đơn vị bảo trợ", "後援機関"),
        description: L(
          "Official diplomatic support from the Vietnamese consulate in Osaka, strengthening bilateral academic and scientific collaboration.",
          "Hỗ trợ ngoại giao chính thức từ Tổng Lãnh sự quán Việt Nam tại Osaka, củng cố hợp tác học thuật và khoa học song phương.",
          "大阪のベトナム総領事館による公式な外交支援で、二国間の学術・科学協力を強化します。"
        ),
        link: "https://osaka.mofa.gov.vn/",
        logo: "/assets/organizations/cgtsrvn.png",
        logoAlt: S("Consulate General of the Socialist Republic of Vietnam in Osaka, Japan logo"),
        assetStatus: "verified",
      },
    ],
  },
];

export const partnerOrganizations = ecosystemGroups.flatMap((group) => group.items);

// Complete committee groups word-for-word from DOCX
export const committeeGroups: CommitteeGroup[] = [
  {
    id: "organizing",
    title: L("Organizing Committee", "Ban Tổ chức", "組織委員会"),
    members: [
      {
        name: "Dr. Nguyen Hoang Oanh",
        role: S("Chairman"),
        affiliation: S("Rector of VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Prof. Toshiro Hiramoto",
        role: S("Chairman"),
        affiliation: S("JST NEXUS Program Officer"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Do Ngoc Ha",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Assoc. Prof. Le Duc Anh",
        role: S("Member"),
        affiliation: S("The University of Tokyo, Japan"),
        status: S("Confirmed"),
      },
      {
        name: "Assoc. Prof. Bui Nguyen Quoc Trinh",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Pham Tien Thanh",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Assoc. Prof. Hoang Thi Minh Thao",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Assoc. Prof. Nguyen Thi An Hang",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Dang Thanh Tu",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Vu Quang Viet",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "MA. Nguyen Ngoc Huong",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "BA. Bui Thu Trang",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
    ],
  },
  {
    id: "local",
    title: L("Local Organizing Committee", "Ban Tổ chức Địa phương", "現地組織委員会"),
    members: [
      {
        name: "Assoc. Prof. Hoang Thi Minh Thao",
        role: S("Chairman"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Do Ngoc Ha",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Assoc. Prof. Bui Nguyen Quoc Trinh",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Pham Tien Thanh",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Assoc. Prof. Nguyen Thi An Hang",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Assoc. Prof. Dao Quang Duy",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Ta Quang Ngoc",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Duong Huu Toan",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Pham Duc Tho",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Vu Quang Viet",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
    ],
  },
  {
    id: "scientific",
    title: L("Scientific Committee", "Ban Khoa học", "科学委員会"),
    members: [
      {
        name: "Assoc. Prof. Bui Nguyen Quoc Trinh",
        role: S("Chairman"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Pham Tien Thanh",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Assoc. Prof. Le Duc Anh",
        role: S("Member"),
        affiliation: S("The University of Tokyo, Japan"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Le Kim Quy",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Hoang Thi Thanh Tam",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Assoc. Prof. Dao Quang Duy",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Nakamoto Trang",
        role: S("Member"),
        affiliation: S("Ritsumeikan University, Japan"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Nguyen Thi Thanh Ngan",
        role: S("Member"),
        affiliation: S("Tohoku University, Japan"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Nguyen Thi Van Anh",
        role: S("Member"),
        affiliation: S("Tohoku University, Japan"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Ngo Hoai Nguyen",
        role: S("Member"),
        affiliation: S("The University of Osaka, Japan"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Huynh Van Nhat",
        role: S("Member"),
        affiliation: S("Sony Semiconductor Solutions Corporation"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Ngo Minh Chu",
        role: S("Member"),
        affiliation: S("Institute of Construction Science and Technology"),
        status: S("Confirmed"),
      },
      {
        name: "BS. Pham Duc Anh",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
    ],
  },
  {
    id: "secretariat",
    title: L("Conference Secretariat", "Ban Thư ký Hội nghị", "会議事務局"),
    members: [
      {
        name: "Dr. Vu Quang Viet",
        role: S("Chairman"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "Dr. Do Hong Minh",
        role: S("Member"),
        affiliation: S("Le Quy Don Technical University"),
        status: S("Confirmed"),
      },
      {
        name: "BA. Bui Thu Trang",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "BS. Bui The Trung",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "BS. Pham Duc Anh",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "BS. Nguyen Tien Tao",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "BS. Nguyen Van Loi",
        role: S("Member"),
        affiliation: S("Vietnam Academy of Cryptography Techniques"),
        status: S("Confirmed"),
      },
      {
        name: "BS. Ngo Quang Truong",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "BA. Nguyen Thuy Lien",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
      {
        name: "BS. Vu Van Hoi",
        role: S("Member"),
        affiliation: S("VNU Vietnam Japan University"),
        status: S("Confirmed"),
      },
    ],
  },
];

// Removed arrays to enforce document scope
export const sponsorEngagementRoutes: SponsorRoute[] = [];
export const sponsorTiers: SponsorTier[] = [];
export const sponsorDeliverables: LocalizedText[] = [];

export const submissionCards: CardCopy[] = [
  {
    title: L("Background", "Bối cảnh", "背景"),
    body: L(
      "Semiconductors are driving the next generation of technologies, including artificial intelligence, advanced manufacturing, quantum computing, and digital infrastructure. As the global semiconductor landscape continues to evolve, international collaboration in research, education, talent development, and industry has become increasingly important.\n\nJapan has long been a global leader in semiconductor science and technology, while Vietnam is rapidly emerging as a promising semiconductor hub through strategic investments in education, research, and innovation. Building on these complementary strengths, VJSS 2026 aims to bring together researchers, students, universities, industry leaders, and policymakers from Vietnam, Japan, and around the world to exchange knowledge, foster collaboration, and promote sustainable development of the global semiconductor ecosystem.",
      "Chất bán dẫn đang thúc đẩy thế hệ công nghệ tiếp theo, bao gồm trí tuệ nhân tạo, sản xuất tiên tiến, máy tính lượng tử và cơ sở hạ tầng số. Khi bối cảnh bán dẫn toàn cầu tiếp tục phát triển, hợp tác quốc tế trong nghiên cứu, giáo dục, phát triển nhân tài và công nghiệp ngày càng trở nên quan trọng.\n\nNhật Bản từ lâu đã là quốc gia đi đầu toàn cầu trong khoa học và công nghệ bán dẫn, trong khi Việt Nam đang nhanh chóng nổi lên như một trung tâm bán dẫn đầy hứa hẹn thông qua các khoản đầu tư chiến lược vào giáo dục, nghiên cứu và đổi mới. Dựa trên những thế mạnh bổ sung này, VJSS 2026 nhằm mục đích quy tụ các nhà nghiên cứu, sinh viên, trường đại học, lãnh đạo ngành và nhà hoạch định chính sách từ Việt Nam, Nhật Bản và trên toàn thế giới để trao đổi kiến thức, thúc đẩy hợp tác và phát triển bền vững hệ sinh thái bán dẫn toàn cầu.",
      "半導体は、人工知能、先進製造、量子コンピューティング、デジタルインフラストラクチャなど、次世代技術を推進しています。グローバルな半導体業界が進化し続ける中、研究、教育、人材育成、産業における国際協力がますます重要になっています。\n\n日本は長年にわたり半導体科学技術のグローバルリーダーであり、ベトナムは教育、研究、イノベーションへの戦略的投資を通じて有望な半導体ハブとして急速に台頭しています。これらの相互補完的な強みを基盤として、VJSS 2026はベトナム、日本、そして世界中から研究者、学生、大学、産業リーダー、政策立案者を集め、知識の交換、協力の促進、グローバルな半導体エコシステムの持続可能な発展を目指します。"
    ),
  },
];

export const registrationCards: CardCopy[] = [
  {
    title: L("Registration details", "Chi tiết đăng ký", "参加登録詳細"),
    body: L(
      "Registration fees will be announced later. The registration fee is expected to cover access to symposium sessions, conference materials, coffee breaks, and selected official networking activities.",
      "Phí đăng ký sẽ được công báo sau. Phí dự kiến bao gồm quyền tham gia các phiên họp, tài liệu hội nghị, nghỉ giải lao và một số hoạt động networking chính thức.",
      "Registration fees will be announced later. The registration fee is expected to cover access to symposium sessions, conference materials, coffee breaks, and selected official networking activities."
    ),
  },
];

export const contactEntries: ContactEntry[] = [
  {
    label: L("Academic liaison", "Liên hệ học thuật", "学術窓口"),
    value: S(
      "1. Assoc. Prof. Le Duc Anh — University of Tokyo\n2. Assoc. Prof. Bui Nguyen Quoc Trinh — VNU Vietnam Japan University"
    ),
    detail: L(
      "Reach the academic liaisons for program queries.",
      "Liên hệ các đầu mối học thuật cho các câu hỏi về chương trình.",
      "Reach the academic liaisons for program queries."
    ),
    emails: ["vjss-info@vju.ac.vn"],
  },
  {
    label: L("Conference secretariat", "Ban thư ký hội nghị", "事務局"),
    value: L(
      "BA. Bui Thu Trang — VNU Vietnam Japan University\nPhone: +84 856389040\nEmail: vjss-info@vju.ac.vn",
      "BA. Bùi Thu Trang — Trường Đại học Việt Nhật\nĐiện thoại: +84 856389040\nEmail: vjss-info@vju.ac.vn",
      "BA. Bui Thu Trang — VNU Vietnam Japan University\n電話: +84 856389040\nメール: vjss-info@vju.ac.vn"
    ),
    detail: L(
      "Main contact for program operations and registration.",
      "Liên hệ chính cho vận hành chương trình và đăng ký.",
      "Main contact for program operations and registration."
    ),
    emails: ["vjss-info@vju.ac.vn"],
  },
];

// Cleaned news items (only empty list to be populated under home route)
export const newsItems: NewsItem[] = [];

// Strict Important Dates from document
export const keyDates = [
  {
    label: L("Abstract Submission Deadline", "Hạn nộp tóm tắt", "アブストラクト提出締切"),
    date: L("July 24, 2026", "24/7/2026", "2026年7月24日"),
  },
  {
    label: L("Notification of Acceptance", "Thông báo chấp nhận", "採否通知"),
    date: L("August 8, 2026", "8/8/2026", "2026年8月8日"),
  },
  {
    label: L("Early Bird Registration Deadline", "Hạn đăng ký ưu đãi sớm", "早期登録締切"),
    date: L("August 10, 2026", "10/8/2026", "2026年8月10日"),
  },
  {
    label: L("Symposium Dates", "Ngày Hội thảo", "シンポジウム日程"),
    date: L("September 20-23, 2026", "20-23/9/2026", "2026年9月20-23日"),
  },
  {
    label: L("Full Paper Submission Deadline", "Hạn nộp bài toàn văn", "フルペーパー提出締切"),
    date: L("October 30, 2026", "30/10/2026", "2026年10月30日"),
    note: L("Tentative", "Dự kiến", "暫定"),
  },
];

export const submissionGuidelines = {
  intro: L(
    "Authors wishing to present their work at VJSS-2026 are invited to submit an abstract in English.",
    "Các tác giả muốn trình bày công trình tại VJSS-2026 được mời nộp tóm tắt bằng tiếng Anh.",
    "Authors wishing to present their work at VJSS-2026 are invited to submit an abstract in English."
  ),
  requirements: [
    L("Title of the presentation", "Tiêu đề bài trình bày", "発表タイトル"),
    L("Author names and affiliations", "Tên tác giả và cơ quan trực thuộc", "著者名と所属"),
    L("Corresponding author's full contact details", "Thông tin liên hệ đầy đủ của tác giả liên lạc", "連絡著者の詳細な連絡先"),
    L("Preferred presentation format (oral or poster)", "Hình thức trình bày ưa thích (thuyết trình hoặc poster)", "希望する発表形式（口頭またはポスター）"),
    L("Relevant theme cluster", "Chủ đề liên quan", "関連するテーマクラスター"),
    L("Abstract of approximately 200-300 words", "Tóm tắt khoảng 200-300 từ", "200〜300語程度のアブストラクト"),
    L("Three to five keywords", "Ba đến năm từ khóa", "3〜5個のキーワード"),
  ],
  encouragement: L(
    "Submissions from graduate students, early-career professionals, and industry researchers are strongly encouraged.",
    "Đặc biệt khuyến khích bài nộp từ nghiên cứu sinh, chuyên gia trẻ và nhà nghiên cứu trong ngành công nghiệp.",
    "Submissions from graduate students, early-career professionals, and industry researchers are strongly encouraged."
  ),
  publishingOpportunity: L(
    "Selected contributions may be invited to submit full papers for conference proceedings, special issues, or other post-symposium publication opportunities. Detailed information regarding full-paper preparation, templates, and submission procedures will be announced in due course.",
    "Một số bài viết được chọn có thể được mời nộp bài toàn văn cho kỷ yếu hội thảo, số đặc biệt, hoặc các cơ hội xuất bản khác sau hội nghị. Thông tin chi tiết về chuẩn bị bài toàn văn, mẫu và quy trình nộp bài sẽ được thông báo sau.",
    "Selected contributions may be invited to submit full papers for conference proceedings, special issues, or other post-symposium publication opportunities. Detailed information regarding full-paper preparation, templates, and submission procedures will be announced in due course."
  ),
  submissionUrl: "https://vjss2026.vju.ac.vn/",
  easyChairUrl: "", // EasyChair link placeholder
  abstractTemplateUrl: "", // Attached placeholder
  fullPaperTemplateUrl: "", // Attached placeholder
};

export const conferenceBackground = L(
  "Semiconductors are driving the next generation of technologies, including artificial intelligence, advanced manufacturing, quantum computing, and digital infrastructure. As the global semiconductor landscape continues to evolve, international collaboration in research, education, talent development, and industry has become increasingly important. Japan has long been a global leader in semiconductor science and technology, while Vietnam is rapidly emerging as a promising semiconductor hub through strategic investments in education, research, and innovation. Building on these complementary strengths, VJSS-2026 aims to bring together researchers, students, universities, industry leaders, and policymakers from Vietnam, Japan, and around the world to exchange knowledge, foster collaboration, and promote sustainable development of the global semiconductor ecosystem.",
  "Bán dẫn đang dẫn dắt thế hệ công nghệ tiếp theo, bao gồm trí tuệ nhân tạo, sản xuất tiên tiến, điện toán lượng tử và hạ tầng số. Khi bối cảnh bán dẫn toàn cầu tiếp tục phát triển, hợp tác quốc tế trong nghiên cứu, giáo dục, phát triển nhân lực và công nghiệp ngày càng trở nên quan trọng. Nhật Bản từ lâu đã là quốc gia dẫn đầu thế giới về khoa học và công nghệ bán dẫn, trong khi Việt Nam đang nhanh chóng nổi lên như một trung tâm bán dẫn đầy triển vọng thông qua các đầu tư chiến lược vào giáo dục, nghiên cứu và đổi mới sáng tạo. Dựa trên các thế mạnh bổ sung này, VJSS-2026 nhằm quy tụ các nhà nghiên cứu, sinh viên, trường đại học, lãnh đạo doanh nghiệp và nhà hoạch định chính sách từ Việt Nam, Nhật Bản và trên toàn thế giới để trao đổi tri thức, thúc đẩy hợp tác và phát triển bền vững hệ sinh thái bán dẫn toàn cầu.",
  "Semiconductors are driving the next generation of technologies, including artificial intelligence, advanced manufacturing, quantum computing, and digital infrastructure. As the global semiconductor landscape continues to evolve, international collaboration in research, education, talent development, and industry has become increasingly important. Japan has long been a global leader in semiconductor science and technology, while Vietnam is rapidly emerging as a promising semiconductor hub through strategic investments in education, research, and innovation. Building on these complementary strengths, VJSS-2026 aims to bring together researchers, students, universities, industry leaders, and policymakers from Vietnam, Japan, and around the world to exchange knowledge, foster collaboration, and promote sustainable development of the global semiconductor ecosystem."
);

export const conferenceObjectives = [
  L(
    "Advance Vietnam-Japan academic exchange and research collaboration in semiconductor science and engineering",
    "Thúc đẩy trao đổi học thuật và hợp tác nghiên cứu Việt Nam-Nhật Bản trong khoa học và kỹ thuật bán dẫn",
    "半導体科学・工学分野における日越学術交流と研究協力を推進"
  ),
  L(
    "Foster interdisciplinary dialogue across semiconductor design, devices, materials, processing, packaging, testing, AI, quantum technologies, and emerging frontiers",
    "Thúc đẩy đối thoại liên ngành trong thiết kế, linh kiện, vật liệu, xử lý, đóng gói, kiểm thử, AI, công nghệ lượng tử và các lĩnh vực mới nổi về bán dẫn",
    "半導体設計、デバイス、材料、プロセス、パッケージング、テスト、AI、量子技術、新領域にわたる学際的対話を促進"
  ),
  L(
    "Provide opportunities for young researchers and students to present their work and develop international research networks",
    "Tạo cơ hội cho nhà nghiên cứu trẻ và sinh viên trình bày công trình và phát triển mạng lưới nghiên cứu quốc tế",
    "若手研究者や学生が研究成果を発表し、国際的な研究ネットワークを構築する機会を提供"
  ),
  L(
    "Strengthen human resource development through lectures, career-oriented sessions, mentoring, internships, and industry-academia interaction",
    "Tăng cường phát triển nguồn nhân lực thông qua bài giảng, phiên định hướng nghề nghiệp, mentoring, thực tập và tương tác giữa doanh nghiệp-học thuật",
    "講義、キャリア志向セッション、メンタリング、インターンシップ、産学連携を通じた人材育成を強化"
  ),
  L(
    "Create structured dialogue among universities, companies, public agencies, and innovation centers on semiconductor cooperation",
    "Tạo đối thoại có cấu trúc giữa trường đại học, doanh nghiệp, cơ quan công và trung tâm đổi mới sáng tạo về hợp tác bán dẫn",
    "大学、企業、公的機関、イノベーションセンター間での半導体協力に関する体系的な対話を構築"
  ),
  L(
    "Support long-term collaboration among Vietnam, Japan, and international partners in semiconductor education, research, and industrial ecosystem development",
    "Hỗ trợ hợp tác dài hạn giữa Việt Nam, Nhật Bản và các đối tác quốc tế trong giáo dục, nghiên cứu và phát triển hệ sinh thái công nghiệp bán dẫn",
    "半導体教育、研究、産業エコシステム開発におけるベトナム、日本、国際パートナー間の長期的な協力を支援"
  ),
];
