export type Locale = "en" | "vi" | "ja";

export type LocalizedText = Record<Locale, string>;

export type SessionStatus = "draft" | "updated" | "final";

type SpeakerKind = "government" | "academia" | "industry";

const L = (en: string, vi: string, ja: string): LocalizedText => ({
  en,
  vi,
  ja,
});

export function resolveLocale(language?: string | null): Locale {
  const normalized = language?.split("-")[0];

  if (normalized === "vi" || normalized === "ja") {
    return normalized;
  }

  return "en";
}

export function pickLocalized(locale: Locale, value: LocalizedText) {
  return value[locale];
}

const toHttps = (url: string) => url.replace(/^http:\/\//i, "https://");

export const conferenceIdentity = {
  shortName: "VJSS 2026",
  fullName: L(
    "Vietnam-Japan Semiconductor Symposium 2026",
    "Hoi nghi Ban dan Viet Nam - Nhat Ban 2026",
    "ベトナム・日本半導体シンポジウム 2026",
  ),
  heroEyebrow: L(
    "Reference-based conference platform",
    "Nen tang hoi nghi dua tren nguon tham chieu 2025",
    "2025年参照コンテンツを基にしたカンファレンス基盤",
  ),
  tagline: L(
    "A cleaner, more academic, and easier-to-edit 2026 site seeded from the strongest VJSS 2025 content blocks.",
    "Phien ban 2026 duoc tai cau truc tu VJSS 2025 theo huong hoc thuat hon, gon hon, va de ban to chuc cap nhat hon.",
    "VJSS 2025 の強いコンテンツ資産を引き継ぎつつ、2026 年版をより学術的で、整理され、更新しやすい形に再構成します。",
  ),
  dates: L(
    "2026 dates to be announced",
    "Thoi gian 2026 se duoc cong bo sau",
    "2026年の日程は後日公開",
  ),
  venue: L(
    "2026 venue to be announced",
    "Dia diem 2026 se duoc cong bo sau",
    "2026年の会場は後日公開",
  ),
  referenceNote: L(
    "Content architecture seeded from the first VJSS edition archived online on October 17, 2025 in Osaka.",
    "Cau truc noi dung duoc khoi tao tu phien VJSS dau tien da duoc luu tru truc tuyen vao ngay 17/10/2025 tai Osaka.",
    "コンテンツ構成は、2025年10月17日に大阪で開催された初回 VJSS のオンライン記録を基盤にしています。",
  ),
  referenceEvent: {
    date: "October 17, 2025",
    venue: "Consulate General of Vietnam in Osaka, Japan",
    mapUrl: "https://maps.app.goo.gl/kWHZeTjo9XGjYkgZ9",
  },
  heroImage: toHttps(
    "https://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/z7116667912017_d8bb12856a5f889063afa9f2ca49b587-scaled.jpg",
  ),
  logo: toHttps(
    "https://vjsemiconductor.vanj.jp/wp-content/uploads/2025/09/cropped-VJSS-Logo-ngang@2x-scaled-1.png",
  ),
};

export const homeMetrics = [
  {
    value: "19",
    label: L("Referenced speakers", "Dien gia tham chieu", "参照スピーカー数"),
  },
  {
    value: "3",
    label: L("Core session themes", "Cum chu de cot loi", "主要セッションテーマ"),
  },
  {
    value: "4",
    label: L("Ecosystem groupings", "Nhom he sinh thai", "エコシステム区分"),
  },
  {
    value: "3",
    label: L("Site languages", "Ngon ngu giao dien", "対応言語"),
  },
];

export const homeWelcome = {
  title: L("Welcome message", "Loi chao", "ウェルカムメッセージ"),
  body: L(
    "The 2025 edition made the symposium legible: diplomacy, university research, talent development, and ecosystem partners appeared in one coherent narrative. The 2026 build keeps that clarity, but removes filler, replaces static WordPress blocks with editable conference data, and rewrites the key pages with stronger academic framing.",
    "Phien ban 2025 da cho thay mot cau truc ro rang: ngoai giao, nghien cuu dai hoc, phat trien nhan luc va he sinh thai doi tac cung xuat hien trong mot mach noi dung thong nhat. Phien ban 2026 giu lai tinh than do, nhung loai bo noi dung thua, thay khoi WordPress tinh bang du lieu hoi nghi co the cap nhat, va viet lai cac trang chinh theo chuan hoc thuat hon.",
    "2025 年版は、外交、大学研究、人材育成、そしてエコシステムの関係者を一つの物語として見せることに成功しました。2026 年版ではその明快さを継承しつつ、不要な情報を削り、静的な WordPress ブロックを編集可能な会議データへ置き換え、主要ページをより学術的な視点で再構成します。",
  ),
  signature: L(
    "Drafted for the 2026 organizing team",
    "Du thao cho ban to chuc 2026",
    "2026 年実行委員会向けドラフト",
  ),
};

export const homeHighlights = [
  {
    title: L(
      "Vietnam-Japan cooperation as a serious agenda",
      "Hop tac Viet Nam - Nhat Ban duoc trinh bay nhu mot chuong trinh hanh dong",
      "ベトナム・日本協力を実務的アジェンダとして提示",
    ),
    body: L(
      "The strongest 2025 sessions framed semiconductors as bilateral strategy, not only as a conference topic.",
      "Nhung phien manh nhat cua 2025 dat ban dan vao boi canh chien luoc song phuong, khong chi la mot chu de hoi nghi.",
      "2025 年版の核となるセッションは、半導体を単なる発表テーマではなく、二国間戦略として位置づけていました。",
    ),
  },
  {
    title: L(
      "Talent pipeline is visible from policy to early career",
      "Truc nhan luc duoc hien ro tu chinh sach den giai doan dau su nghiep",
      "政策から若手研究者まで人材育成の流れが見える",
    ),
    body: L(
      "The 2025 program linked ministries, universities, industry mentors, and young-researcher voices in one program arc.",
      "Chuong trinh 2025 ket noi bo nganh, dai hoc, nguoi huong dan doanh nghiep va cac giong noi tre trong mot mach chuong trinh lien tuc.",
      "2025 年プログラムは、省庁、大学、産業界のメンター、若手研究者を一つの流れで結びました。",
    ),
  },
  {
    title: L(
      "Research themes are already strong enough for a 2026 skeleton",
      "Cac huong nghien cuu da du manh de lam khung cho 2026",
      "研究テーマは 2026 年の骨格として十分に強い",
    ),
    body: L(
      "Materials, devices, spintronics, wide-bandgap electronics, THz systems, and secure AI SoC research can seed the next program.",
      "Vat lieu, linh kien, spintronics, wide-bandgap, he THz va AI SoC an toan da du de lam hat giong cho chuong trinh tiep theo.",
      "材料、デバイス、スピントロニクス、ワイドバンドギャップ、THz、セキュア AI SoC は次回プログラムの核になります。",
    ),
  },
  {
    title: L(
      "Ecosystem visibility needs a cleaner publishing layer",
      "He sinh thai can mot lop hien thi sach va de cap nhat hon",
      "エコシステムの可視化にはより整理された公開構造が必要",
    ),
    body: L(
      "Organizer, patron, and sponsor logos should move into repeatable cards and tiers instead of image-only sections.",
      "Logo ban to chuc, patron va nha tai tro nen duoc dua ve card lap lai va tier ro rang thay vi cac khoi anh tinh.",
      "主催・後援・スポンサーのロゴは、画像だけのセクションではなく、繰り返し可能なカードと階層で管理すべきです。",
    ),
  },
];

export const homeStory = [
  {
    step: "01",
    title: L("Legacy", "Di san", "継承"),
    body: L(
      "The symposium should keep the academic bridge associated with Professor Dang Luong Mo, but express it as current collaboration, talent exchange, and shared research infrastructure.",
      "Hoi nghi can giu nhip cau hoc thuat gan voi giao su Dang Luong Mo, nhung the hien no bang hop tac hien tai, trao doi nhan luc va ha tang nghien cuu dung chung.",
      "シンポジウムはダン・ルオン・モ教授に結び付く学術的な橋を継承しつつ、それを現在の共同研究、人材交流、研究基盤共有として語るべきです。",
    ),
  },
  {
    step: "02",
    title: L("People", "Con nguoi", "人"),
    body: L(
      "The 2025 speaker list already balances government, academia, and industry. The 2026 UX should make that mix easier to browse, filter, and compare.",
      "Danh sach dien gia 2025 da can bang giua chinh phu, hoc thuat va doanh nghiep. UX 2026 can giup viec duyet, loc va doi chieu cac nhom nay de dang hon.",
      "2025 年の登壇者構成は、政府・学術・産業のバランスが取れています。2026 年版では、その構成をさらに閲覧しやすく、比較しやすくする必要があります。",
    ),
  },
  {
    step: "03",
    title: L("Platform", "Nen tang", "基盤"),
    body: L(
      "The new site should behave like an event database: editable schedules, speaker records, partner groups, sponsor tiers, and multilingual copy managed separately from layout.",
      "Site moi phai van hanh nhu mot co so du lieu su kien: lich, ho so dien gia, nhom doi tac, tier tai tro va ban dich da ngon ngu duoc quan ly tach khoi giao dien.",
      "新サイトはイベントデータベースとして動くべきです。スケジュール、登壇者、パートナー区分、スポンサー階層、多言語原稿をレイアウトと分離して管理します。",
    ),
  },
];

export const pageCopy = {
  about: {
    title: L("About the symposium", "Gioi thieu hoi nghi", "シンポジウムについて"),
    intro: L(
      "VJSS is positioned as a bilateral academic and industry platform for semiconductor collaboration between Vietnam and Japan. The 2026 site keeps the strongest framing from the first edition while rewriting the message around strategy, talent, and research outcomes.",
      "VJSS duoc dinh vi la mot nen tang hoc thuat va cong nghiep song phuong cho hop tac ban dan giua Viet Nam va Nhat Ban. Phien ban site 2026 giu lai khung noi dung manh nhat tu lan dau tien, dong thoi viet lai thong diep xoay quanh chien luoc, nhan luc va ket qua nghien cuu.",
      "VJSS は、ベトナムと日本の半導体協力を支える学術・産業の二国間プラットフォームとして位置づけられています。2026 年版サイトでは、初回の強みを継承しつつ、戦略・人材・研究成果を軸にメッセージを再構成します。",
    ),
    visionTitle: L("Vision", "Tam nhin", "ビジョン"),
    missionTitle: L("Mission", "Su menh", "ミッション"),
    objectiveTitle: L("Objectives", "Muc tieu", "目的"),
    vision: [
      L(
        "Position VJSS as a serious semiconductor bridge between universities, research institutes, policy actors, and industry.",
        "Dinh vi VJSS nhu mot cau noi ban dan nghiem tuc giua dai hoc, vien nghien cuu, co quan chinh sach va doanh nghiep.",
        "VJSS を大学、研究機関、政策主体、産業界を結ぶ本格的な半導体プラットフォームとして確立する。",
      ),
      L(
        "Move from symbolic exchange toward durable collaboration models.",
        "Chuyen tu giao luu mang tinh bieu tuong sang cac mo hinh hop tac ben vung.",
        "象徴的交流から持続的な協働モデルへ移行する。",
      ),
    ],
    mission: [
      L(
        "Make the Vietnam-Japan semiconductor agenda visible through structured sessions, curated speakers, and clear partner visibility.",
        "Lam ro chuong trinh hop tac ban dan Viet Nam - Nhat Ban thong qua phien hop co cau truc, dien gia duoc tuyen chon va su hien dien ro rang cua doi tac.",
        "構造化されたセッション、厳選された登壇者、明確なパートナー表示を通じて、ベトナム・日本の半導体協力アジェンダを可視化する。",
      ),
      L(
        "Support talent exchange, joint research, and the translation of research into ecosystem building.",
        "Ho tro trao doi nhan luc, nghien cuu chung va chuyen hoa ket qua nghien cuu thanh xay dung he sinh thai.",
        "人材交流、共同研究、研究成果のエコシステム化を支える。",
      ),
    ],
    objectives: [
      L(
        "Give organizers an editable publishing structure instead of image-heavy pages.",
        "Mang lai cho ban to chuc mot cau truc xuat ban de chinh sua thay vi cac trang phu thuoc qua nhieu vao anh.",
        "画像中心のページではなく、主催者が編集しやすい公開構造を提供する。",
      ),
      L(
        "Raise academic credibility through stronger page copy, metadata, and clearer session narratives.",
        "Nang tam do tin cay hoc thuat bang copy tot hon, metadata ro hon va cach ke chuyen cho tung session mach lac hon.",
        "より強いコピー、メタデータ、セッション文脈によって学術的信頼性を高める。",
      ),
      L(
        "Support multilingual delivery without duplicating page structure three times.",
        "Ho tro da ngon ngu ma khong phai lap lai cau truc trang ba lan.",
        "ページ構造を三重に複製せず、多言語対応を実現する。",
      ),
    ],
    contextTitle: L(
      "Why Vietnam-Japan semiconductor collaboration matters",
      "Vi sao boi canh hop tac ban dan Viet Nam - Nhat Ban quan trong",
      "なぜベトナム・日本の半導体協力が重要か",
    ),
    contextBody: L(
      "The 2025 program showed that bilateral cooperation is not a single track: it spans diplomacy, university-led research, public funding, workforce training, and industry pathways. The 2026 information architecture should preserve that breadth while making each layer easier to update and explain.",
      "Chuong trinh 2025 cho thay hop tac song phuong khong chi la mot track duy nhat: no trai rong tu ngoai giao, nghien cuu dai hoc, tai tro cong, dao tao nhan luc den cac lo trinh cong nghiep. IA cho 2026 can giu duoc do rong ay, dong thoi lam cho tung lop thong tin de cap nhat va de giai thich hon.",
      "2025 年プログラムは、二国間協力が単一トラックではなく、外交、大学主導研究、公的資金、人材育成、産業実装まで広がっていることを示しました。2026 年版 IA はその広がりを維持しながら、各層を更新しやすく、説明しやすくする必要があります。",
    ),
    heritageTitle: L(
      "Academic heritage and Professor Dang Luong Mo",
      "Di san hoc thuat va Giao su Dang Luong Mo",
      "学術的遺産とダン・ルオン・モ教授",
    ),
    heritageBody: L(
      "The 2025 tribute established Professor Dang Luong Mo not only as a memorial figure, but as a model for institution building, VLSI education, and long-term Vietnam-Japan scientific trust. The 2026 site should therefore move beyond ceremonial language and express his legacy through concrete research and talent pathways.",
      "Bai tribute 2025 da dat Giao su Dang Luong Mo khong chi nhu mot nhan vat tuong niem, ma nhu mot hinh mau ve xay dung the che, giao duc VLSI va niem tin khoa hoc Viet Nam - Nhat Ban ben vung. Vi vay, site 2026 can vuot qua ngon ngu nghi le va the hien di san ay bang cac lo trinh nghien cuu va nhan luc cu the.",
      "2025 年の追悼ページは、ダン・ルオン・モ教授を単なる追悼対象ではなく、制度づくり、VLSI 教育、長期的な越日科学的信頼のモデルとして描きました。したがって 2026 年サイトでは、儀礼的表現を超えて、その遺産を具体的な研究・人材の導線として示すべきです。",
    ),
  },
  program: {
    title: L("Program and schedule", "Chuong trinh va lich trinh", "プログラムとスケジュール"),
    intro: L(
      "This page is built as a CMS-ready schedule model. It starts from the 2025 reference program and already supports day grouping, theme tags, session chairs, speaker mapping, status labels, and PDF export.",
      "Trang nay duoc dung nhu mot mo hinh lich trinh san sang cho CMS. No bat dau tu chuong trinh tham chieu 2025 va da ho tro nhom theo ngay, tag chu de, session chair, mapping dien gia, nhan trang thai va xuat PDF.",
      "このページは CMS で扱いやすいスケジュールモデルとして構築されています。2025 年参照プログラムを起点に、日別グループ、テーマタグ、座長、登壇者連携、ステータス、PDF 出力をすでに備えています。",
    ),
    legendTitle: L("Status legend", "Chu giai trang thai", "ステータス凡例"),
    pdfTitle: L("Detailed program PDF", "PDF chuong trinh chi tiet", "詳細プログラム PDF"),
    editableTitle: L("Editable structure", "Cau truc de cap nhat", "更新しやすい構造"),
    editableBody: L(
      "Each session is modeled as data, not as one-off layout blocks.",
      "Moi session duoc mo hinh hoa thanh du lieu, khong phai cac khoi giao dien dung mot lan.",
      "各セッションは単発レイアウトではなくデータとして設計されています。",
    ),
    referenceBody: L(
      "The current PDF is a one-page reference export based on the VJSS 2025 schedule structure.",
      "PDF hien tai la ban xuat tham chieu mot trang dua tren cau truc lich trinh VJSS 2025.",
      "現在の PDF は VJSS 2025 スケジュール構造を基にした1ページの参照版です。",
    ),
  },
  speakers: {
    title: L("Speakers", "Dien gia", "スピーカー"),
    intro: L(
      "The 2025 speaker roster is already strong enough to seed a proper 2026 directory. Cards show role and organization first; the modal keeps the longer academic or professional profile.",
      "Danh sach dien gia 2025 da du manh de lam hat giong cho mot directory 2026 dung nghia. Card uu tien chuc danh va don vi; modal giu phan ho so hoc thuat hoac chuyen mon dai hon.",
      "2025 年の登壇者リストは、2026 年版ディレクトリの土台として十分です。カードでは役職と所属を優先表示し、詳細はモーダルに保持します。",
    ),
  },
  venue: {
    title: L("Venue", "Dia diem", "会場"),
    intro: L(
      "The 2026 venue is still open, so this page is seeded with the fully structured 2025 host venue. The layout is ready for a future venue swap without rebuilding the page.",
      "Dia diem 2026 chua chot, vi vay trang nay duoc khoi tao bang venue 2025 da co cau truc day du. Bo cuc da san sang de thay venue moi ma khong can dung lai trang tu dau.",
      "2026 年会場は未確定のため、このページは構造が整った 2025 年会場情報をもとに作られています。将来の会場差し替えもページ再構築なしで対応できます。",
    ),
    nextTitle: L("2026 venue status", "Trang thai dia diem 2026", "2026年会場の状況"),
    nextBody: L(
      "Publish the confirmed city, venue name, address, and transport notes here once the organizing committee finalizes them.",
      "Cong bo thanh pho, ten venue, dia chi va ghi chu di chuyen tai day khi ban to chuc chot thong tin chinh thuc.",
      "実行委員会で確定後、この欄に都市、会場名、住所、交通案内を公開します。",
    ),
    referenceTitle: L("2025 reference venue", "Venue tham chieu 2025", "2025年の参照会場"),
    referenceBody: L(
      "The 2025 edition took place at the Consulate General of Vietnam in Osaka, Japan, with a compact embassy-style venue model suitable for high-level academic and diplomatic programming.",
      "Phien 2025 dien ra tai Tong Lanh su quan Viet Nam tai Osaka, Nhat Ban, voi mo hinh dia diem gon, phu hop cho cac chuong trinh hoc thuat va doi ngoai cap cao.",
      "2025 年版は在大阪ベトナム総領事館で開催され、学術・外交色の強いプログラムに適したコンパクトな会場構成でした。",
    ),
  },
  organizers: {
    title: L(
      "Organizers, co-organizers, partners, and patrons",
      "Ban to chuc, dong to chuc, doi tac va don vi bao tro",
      "主催・共催・パートナー・後援",
    ),
    intro: L(
      "The 2025 site grouped ecosystem actors visually, but not as reusable data. This page keeps the hierarchy while turning each organization into an editable record.",
      "Site 2025 nhom cac chu the he sinh thai theo hinh anh, nhung chua bien thanh du lieu tai su dung. Trang nay giu lai thu bac do nhung chuyen moi to chuc thanh mot record co the cap nhat.",
      "2025 年サイトはエコシステムの主体を視覚的にまとめていましたが、再利用できるデータにはなっていませんでした。このページでは階層を維持しつつ、各組織を編集可能なレコードに変換しています。",
    ),
    partnerPlaceholderTitle: L("2026 partner roster", "Danh sach doi tac 2026", "2026年パートナー一覧"),
    partnerPlaceholderBody: L(
      "Keep this block CMS-driven so new university, industry, and research partners can be added without touching layout code.",
      "Khoi nay nen de CMS quan ly de co the bo sung doi tac dai hoc, doanh nghiep va nghien cuu ma khong can sua code giao dien.",
      "このブロックは CMS 管理にしておき、大学・産業・研究機関の新規パートナーをレイアウトコードに触れず追加できるようにします。",
    ),
  },
  sponsors: {
    title: L("Sponsors", "Nha tai tro", "スポンサー"),
    intro: L(
      "Sponsorship is the area that most clearly needs 2026 refreshes. The page therefore shows a compact 2025 reference wall and a cleaner tier model ready for new logos, links, and banner placements.",
      "Tai tro la phan can cap nhat 2026 ro nhat. Vi vay trang nay vua giu mot wall tham chieu gon cua 2025, vua dua ra mo hinh tier sach hon de them logo, link va banner moi.",
      "スポンサー情報は 2026 年更新が最も必要な領域です。そのため、このページでは 2025 年参照ウォールをコンパクトに見せつつ、新しいロゴ・外部リンク・バナーを追加しやすい階層モデルを提示します。",
    ),
    upcomingTitle: L("2026 tier framework", "Khung hang muc 2026", "2026年スポンサー階層"),
    upcomingBody: L(
      "Use this tier model for the next edition and keep entries editable from an admin source.",
      "Su dung khung tier nay cho ky tiep theo va giu tung muc co the cap nhat tu nguon admin.",
      "次回版ではこの階層モデルを使い、各項目を管理画面から更新できるようにします。",
    ),
  },
  cfp: {
    title: L("Submission", "Submission", "投稿案内"),
    intro: L(
      "The 2026 submission portal is not yet open. This page exists so the homepage CTA lands on a structured placeholder instead of a dead button.",
      "Cong submission 2026 chua mo. Trang nay ton tai de CTA tren homepage dan den mot diem den co cau truc, thay vi mot nut khong hoat dong.",
      "2026 年の投稿ポータルはまだ公開されていません。このページは、ホーム CTA が死んだボタンにならず、構造化された案内先を持つために用意されています。",
    ),
  },
  registration: {
    title: L("Registration", "Dang ky", "参加登録"),
    intro: L(
      "Registration is intentionally lightweight until the 2026 venue and dates are confirmed. The content model is ready for fees, deadlines, visa-letter notes, and attendee categories.",
      "Trang dang ky duoc giu gon cho den khi thoi gian va dia diem 2026 duoc xac nhan. Mo hinh noi dung da san sang cho phi, han dang ky, visa letter va nhom nguoi tham du.",
      "2026 年の日程と会場が確定するまで、登録ページは意図的に軽く保っています。料金、締切、招聘状、参加区分を追加できる構造になっています。",
    ),
  },
};

export const programSessions = [
  {
    id: "opening",
    day: L("Reference day", "Ngay tham chieu", "参照日"),
    date: "October 17, 2025",
    time: "12:45 - 13:30",
    title: "Opening Ceremony",
    theme: L("Diplomatic opening", "Khai mac doi ngoai", "外交オープニング"),
    status: "final" as const,
    chairs: ["Assoc. Prof. Le Duc Anh"],
    summary: L(
      "A formal opening anchored by the Ambassador of Vietnam to Japan, the Consul General in Osaka, and MEXT's international cooperation leadership.",
      "Phan khai mac chinh thuc quy tu Dai su Viet Nam tai Nhat, Tong lanh su tai Osaka va lanh dao hop tac quoc te cua MEXT.",
      "駐日ベトナム大使、大阪総領事、MEXT の国際協力責任者による正式なオープニングです。",
    ),
    speakerIds: ["pham-quang-hieu", "ngo-trinh-ha", "shinsuke-okada"],
  },
  {
    id: "cooperation",
    day: L("Reference day", "Ngay tham chieu", "参照日"),
    date: "October 17, 2025",
    time: "13:30 - 14:30",
    title: "Perspectives on Vietnam-Japan Bilateral Cooperation",
    theme: L(
      "Cooperation and ecosystem building",
      "Hop tac va xay dung he sinh thai",
      "協力とエコシステム形成",
    ),
    status: "updated" as const,
    chairs: ["Prof. Pham Nam Hai", "Assoc. Prof. Nguyen Van Toan"],
    summary: L(
      "This session is the clearest reusable skeleton for 2026: policy, funding, research infrastructure, and national roadmap in one block.",
      "Day la session de tai su dung ro nhat cho 2026: chinh sach, tai tro, ha tang nghien cuu va lo trinh quoc gia trong mot khoi thong nhat.",
      "2026 年へ最も再利用しやすい骨格であり、政策、資金、研究基盤、国家ロードマップを一つに束ねています。",
    ),
    speakerIds: [
      "kazuya-masu",
      "atsushi-arakawa",
      "tetsuo-endoh",
      "truong-gia-bao",
    ],
  },
  {
    id: "talent",
    day: L("Reference day", "Ngay tham chieu", "参照日"),
    date: "October 17, 2025",
    time: "14:45 - 15:45",
    title: "Vietnam-Japan Roundtable: Nurturing Semiconductor Talents",
    theme: L("Talent development", "Phat trien nhan luc", "人材育成"),
    status: "updated" as const,
    chairs: ["Mr. Huynh Van Nhat", "Mr. Nguyen Hoang Dao"],
    summary: L(
      "The strongest workforce-oriented content in the 2025 edition. This block should survive into 2026 with refreshed speakers and industry commitments.",
      "Day la cum noi dung ve nhan luc manh nhat cua phien 2025. Cum nay nen duoc giu lai cho 2026 voi dien gia va cam ket cong nghiep cap nhat hon.",
      "2025 年版で最も人材育成色が強いブロックです。2026 年でも登壇者と産業界コミットメントを更新して継続すべきです。",
    ),
    speakerIds: [
      "richard-nakajima",
      "pham-cong-kha",
      "kuroki-shinichiro",
      "le-duc-anh",
      "trang-nakamoto",
      "tran-van-nam",
      "masakazu-nakamura",
    ],
  },
  {
    id: "young-researchers",
    day: L("Reference day", "Ngay tham chieu", "参照日"),
    date: "October 17, 2025",
    time: "16:00 - 17:00",
    title: "Young Researchers Career Building",
    theme: L("Early-career pathways", "Lo trinh nghien cuu vien tre", "若手研究者の進路"),
    status: "updated" as const,
    chairs: ["Dr. Nguyen Thi Van Anh", "Dr. Ngo Hoai Nguyen"],
    summary: L(
      "This is the most distinctive academic-to-career bridge in the source program and should remain a signature UX block in 2026.",
      "Day la khoi noi dung dac trung nhat noi nghien cuu hoc thuat voi lo trinh nghe nghiep trong nguon 2025 va nen tro thanh diem nhan UX cho 2026.",
      "学術からキャリアへの橋渡しとして最も特徴的なブロックであり、2026 年版でも象徴的な UX 要素として残すべきです。",
    ),
    speakerIds: [
      "masataka-higashiwaki",
      "pham-nam-hai",
      "nguyen-hoang-dao",
      "nguyen-thi-van-anh",
      "ngo-hoai-nguyen",
    ],
  },
  {
    id: "closing",
    day: L("Reference day", "Ngay tham chieu", "参照日"),
    date: "October 17, 2025",
    time: "17:15 - 17:30",
    title: "Closing Ceremony",
    theme: L("Closing", "Be mac", "クロージング"),
    status: "draft" as const,
    chairs: ["Assoc. Prof. Le Thi Thanh Thuy"],
    summary: L(
      "Keep the slot, but update the host, tone, and handoff message for the 2026 edition.",
      "Giu slot nay nhung can cap nhat nguoi dieu phoi, sac thai va thong diep chuyen tiep cho 2026.",
      "枠は維持しつつ、司会、トーン、次年度への引き継ぎメッセージは 2026 年版に合わせて更新します。",
    ),
    speakerIds: [],
  },
  {
    id: "networking",
    day: L("Reference day", "Ngay tham chieu", "参照日"),
    date: "October 17, 2025",
    time: "17:30 - 19:30",
    title: "Gala Dinner and Networking",
    theme: L("Community building", "Ket noi cong dong", "コミュニティ形成"),
    status: "draft" as const,
    chairs: [],
    summary: L(
      "The networking block should remain, but future details will depend on the 2026 city and venue capacity.",
      "Khoi ket noi nen duoc giu lai, nhung chi tiet se phu thuoc vao thanh pho va suc chua venue cua 2026.",
      "ネットワーキング枠は維持しつつ、詳細は 2026 年の都市と会場規模に応じて更新します。",
    ),
    speakerIds: [],
  },
];

export const programThemeFilters = [
  {
    id: "all",
    label: L("All sessions", "Tat ca session", "全セッション"),
  },
  {
    id: "Cooperation and ecosystem building",
    label: L("Cooperation", "Hop tac", "協力"),
  },
  {
    id: "Talent development",
    label: L("Talent", "Nhan luc", "人材"),
  },
  {
    id: "Early-career pathways",
    label: L("Young researchers", "Nghien cuu vien tre", "若手研究者"),
  },
  {
    id: "Community building",
    label: L("Networking", "Ket noi", "交流"),
  },
];

export const speakers = [
  {
    id: "pham-quang-hieu",
    name: "H.E. Ambassador Pham Quang Hieu",
    role: "Ambassador of Vietnam to Japan",
    organization: "Embassy of Vietnam in Japan",
    country: "Vietnam",
    kind: "government" as SpeakerKind,
    sessionId: "opening",
    topic: "Opening address",
    summary:
      "Diplomatic representative opening the 2025 symposium from a bilateral science and technology perspective.",
    bio:
      "Served as one of the principal diplomatic voices in the opening ceremony, reinforcing the state-level importance of Vietnam-Japan cooperation in semiconductors.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/144601_TT_Pham_Quang_Hieu_1-e1759538140175.webp",
    ),
  },
  {
    id: "ngo-trinh-ha",
    name: "Consul General Ngo Trinh Ha",
    role: "Consul General of Vietnam in Osaka",
    organization: "Consulate General of Vietnam in Osaka, Japan",
    country: "Vietnam",
    kind: "government" as SpeakerKind,
    sessionId: "opening",
    topic: "Opening remarks",
    summary:
      "Host representative connecting the symposium with the diplomatic venue and the local Vietnam-Japan community in Kansai.",
    bio:
      "Represented the host institution for the 2025 edition and anchored the symposium in Osaka's diplomatic and community context.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Trinh-Ha-e1759538314694.jpg",
    ),
  },
  {
    id: "shinsuke-okada",
    name: "Mr. Shinsuke Okada",
    role: "Director for International Cooperation",
    organization: "Ministry of Education, Culture, Sports, Science and Technology (MEXT), Japan",
    country: "Japan",
    kind: "government" as SpeakerKind,
    sessionId: "opening",
    topic: "Opening remarks",
    summary:
      "Science-policy speaker bringing experience in international cooperation across JST, MEXT, and NEDO.",
    bio:
      "The 2025 program introduced him as MEXT's Director for International Cooperation, with prior leadership across JST, public outreach, planning, and global collaboration functions.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Okada-e1759543192928.png",
    ),
  },
  {
    id: "kazuya-masu",
    name: "Prof. Kazuya Masu",
    role: "Director, G-QuAT Center",
    organization: "National Institute of Advanced Industrial Science and Technology (AIST), Japan",
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "cooperation",
    topic:
      "Agile-Dynamic Society and the Future of Semiconductor Education and Collaboration",
    summary:
      "Senior academic leader connecting semiconductor education, industry reform, and future collaboration models.",
    bio:
      "The 2025 program described him as a former Tokyo Tech president who now leads AIST's G-QuAT Center, with a career spanning integrated circuits, CMOS-MEMS, and university-industry reform.",
    image: toHttps(
      "https://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Masu.png",
    ),
  },
  {
    id: "atsushi-arakawa",
    name: "Mr. Atsushi Arakawa",
    role: "International cooperation and program lead",
    organization: "Japan Science and Technology Agency (JST)",
    country: "Japan",
    kind: "government" as SpeakerKind,
    sessionId: "cooperation",
    topic:
      "Introduction of NEXUS (Networked Exchange, United Strength for Stronger Partnerships between Japan and ASEAN)",
    summary:
      "Funding and partnership expert introducing the NEXUS framework for Japan-ASEAN semiconductor collaboration.",
    bio:
      "The 2025 program presented him as a JST leader involved in ASPIRE and NEXUS, with prior roles across international cooperation, strategic planning, and science communication.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Arakawa-e1759540055856.png",
    ),
  },
  {
    id: "tetsuo-endoh",
    name: "Prof. Tetsuo Endoh",
    role: "Professor and Director, Center for Innovative Integrated Electronic Systems",
    organization: "Tohoku University",
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "cooperation",
    topic:
      "Industry-Academia-Government Collaboration on Semiconductor at Tohoku University",
    summary:
      "Research infrastructure leader known for MRAM, spintronics, and low-power AI processors.",
    bio:
      "The 2025 source positioned him as a central figure in Tohoku University's semiconductor ecosystem, with work spanning 3D NAND, novel memory, and beyond-CMOS power and AI devices.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/09/Tetsuo-Endoh-e1757993876397.webp",
    ),
  },
  {
    id: "truong-gia-bao",
    name: "Dr. Truong Gia Bao",
    role: "Semiconductor ecosystem strategist",
    organization: "Vietnam semiconductor industry and alliance network",
    country: "Vietnam",
    kind: "industry" as SpeakerKind,
    sessionId: "cooperation",
    topic: "Vietnam's Semiconductor Landscape and Future Roadmap",
    summary:
      "Vietnam-based speaker focusing on national roadmap, ecosystem coordination, and workforce scale-up.",
    bio:
      "Appeared in the 2025 bilateral-cooperation session as the Vietnam-side roadmap voice, representing ecosystem-building and semiconductor talent development perspectives.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/GiaBao-e1759541658720.webp",
    ),
  },
  {
    id: "richard-nakajima",
    name: "Mr. Richard Nakajima",
    role: "Founder and advisor",
    organization: "Cubic Micro",
    country: "Japan",
    kind: "industry" as SpeakerKind,
    sessionId: "talent",
    topic: "Vietnam-Japan Collaboration in Semiconductor Human Resource Development",
    summary:
      "Industry veteran focused on cross-border semiconductor talent pipelines and practical collaboration models.",
    bio:
      "The 2025 program highlighted more than four decades of semiconductor industry experience across NEC, Renesas, advisory roles, and Japan-ASEAN bridge building.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Richard-e1759540654435.jpg",
    ),
  },
  {
    id: "pham-cong-kha",
    name: "Prof. Pham Cong Kha",
    role: "Professor",
    organization:
      "Department of Computer and Network Engineering, The University of Electro-Communications",
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "talent",
    topic:
      "Implementation of Secure AI System-on-Chip based on Multi-core RISC-V CPU and AI Accelerator for AI-IoMT Devices and Applications",
    summary:
      "Hardware systems researcher working across FPGA, integrated circuits, and secure AI SoC implementation.",
    bio:
      "The source program introduced him as a professor at the University of Electro-Communications with expertise in hardware design, energy-aware systems, and integrated circuit implementation.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Kha-1-1024x1024.jpg",
    ),
  },
  {
    id: "kuroki-shinichiro",
    name: "Prof. Kuroki Shinichiro",
    role: "Professor and Vice-Director, Research Institute for Semiconductor Engineering",
    organization: "Hiroshima University",
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "talent",
    topic: "Semiconductor Research and Education in Hiroshima University",
    summary:
      "Semiconductor engineering leader focused on SiC CMOS, TFT technologies, and research facility development.",
    bio:
      "The 2025 program described him as Vice-Director of Hiroshima University's Research Institute for Semiconductor Engineering, with a career centered on CMOS fabrication, devices, and circuit research.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Kuroki-e1759541381942.png",
    ),
  },
  {
    id: "le-duc-anh",
    name: "Assoc. Prof. Le Duc Anh",
    role: "Associate Professor",
    organization: "Graduate School of Engineering, The University of Tokyo",
    country: "Vietnam-Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "talent",
    topic:
      "Building Global Talent Through Japan-Vietnam Collaboration in Advanced Electronics",
    summary:
      "Materials and device researcher building bilateral exchange through advanced electronics programs.",
    bio:
      "The 2025 source framed him as a leading connector between the University of Tokyo and Vietnamese institutions through NEXUS-linked research and researcher training.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Anh-e1759541084914.png",
    ),
  },
  {
    id: "trang-nakamoto",
    name: "Assist. Prof. Trang Nakamoto",
    role: "Assistant Professor",
    organization: "Ritsumeikan University",
    country: "Vietnam-Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "talent",
    topic:
      "Engineering Materials for Advanced Nitride Semiconductor HEMT Devices",
    summary:
      "Nitride semiconductor researcher combining fabrication, modeling, and cross-border training.",
    bio:
      "The 2025 program introduced him as a Ritsumeikan University assistant professor focused on nitride crystal growth, device evaluation, and international collaboration in HEMT development.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Trang-e1759540943435.png",
    ),
  },
  {
    id: "tran-van-nam",
    name: "Mr. Tran Van Nam",
    role: "Vice-Rector / Director",
    organization: "FPT Polytechnic College - Ho Chi Minh City Campus",
    country: "Vietnam",
    kind: "industry" as SpeakerKind,
    sessionId: "talent",
    topic: "Talent pipeline perspective",
    summary:
      "Training-system voice connecting vocational education, FPT's ecosystem, and semiconductor workforce development.",
    bio:
      "The 2025 schedule identified him through FPT Polytechnic leadership and the Vietnam Semiconductor Human Resources Development Alliance, making him a practical voice on training scale-up.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/tranvannam-e1760615015313.png",
    ),
  },
  {
    id: "masakazu-nakamura",
    name: "Prof. Masakazu Nakamura",
    role: "Professor",
    organization:
      "Graduate School of Science and Technology, Nara Institute of Science and Technology",
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "talent",
    topic:
      "Total development of next-generation semiconductor thin-film technologies for energy and sensing devices",
    summary:
      "Thin-film electronics researcher connecting materials, devices, and sensing applications.",
    bio:
      "The 2025 program presented him as a NAIST professor whose work spans organic electronics, thermoelectrics, and scanning probe microscopy.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Picture1-e1760408034246.jpg",
    ),
  },
  {
    id: "masataka-higashiwaki",
    name: "Prof. Masataka Higashiwaki",
    role: "Professor",
    organization: "Osaka Metropolitan University",
    country: "Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "young-researchers",
    topic: "Advances in gallium oxide devices",
    summary:
      "Internationally recognized gallium oxide electronics researcher and highly cited scholar.",
    bio:
      "The 2025 program described him as a pioneer of gallium oxide device R&D, now at Osaka Metropolitan University after long-term work at NICT and UC Santa Barbara.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Higashiwaki-e1759541708781.png",
    ),
  },
  {
    id: "pham-nam-hai",
    name: "Prof. Pham Nam Hai",
    role: "Professor and Vice-Head of Electrical and Electronic Engineering",
    organization: "Institute of Science Tokyo",
    country: "Vietnam-Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "young-researchers",
    topic: "From semiconductor to topological spintronics",
    summary:
      "Spintronics leader bridging semiconductor materials, topological physics, and applied memory research.",
    bio:
      "The source program described him as a senior researcher in semiconductor and topological spintronics with extensive JST, industry, and editorial leadership experience.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/NamHai-e1759841414282.png",
    ),
  },
  {
    id: "nguyen-hoang-dao",
    name: "Mr. Nguyen Hoang Dao",
    role: "Design verification engineer",
    organization: "Infineon Technologies Japan",
    country: "Vietnam-Japan",
    kind: "industry" as SpeakerKind,
    sessionId: "young-researchers",
    topic: "From Vietnam to Japan - Building a Semiconductor Career",
    summary:
      "Industry practitioner sharing a career path across Renesas and Infineon in Japan.",
    bio:
      "The 2025 session used his career story to translate semiconductor jobs, verification work, and expatriate experience into practical guidance for younger participants.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Dao-e1759542709792.jpg",
    ),
  },
  {
    id: "nguyen-thi-van-anh",
    name: "Assist. Prof. Nguyen Thi Van Anh",
    role: "Assistant Professor",
    organization:
      "Center for Science and Innovation in Spintronics, Tohoku University",
    country: "Vietnam-Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "young-researchers",
    topic:
      "From materials science research to R&D of integrated fast-writing, low-power Magnetoresistive Random-Access Memory",
    summary:
      "Spintronic-memory researcher connecting materials science with integrated MRAM development.",
    bio:
      "The 2025 source described her path from physics teaching in Vietnam to advanced spintronics research at Tohoku University, focusing on low-power, highly integrated memory devices.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/VanAnh-1024x769.png",
    ),
  },
  {
    id: "ngo-hoai-nguyen",
    name: "Dr. Ngo Hoai Nguyen",
    role: "Postdoctoral researcher",
    organization: "Graduate School of Engineering Science, The University of Osaka",
    country: "Vietnam-Japan",
    kind: "academia" as SpeakerKind,
    sessionId: "young-researchers",
    topic: "Terahertz Engineering for Beyond 6G Applications",
    summary:
      "THz systems researcher working on resonant tunneling diode platforms for 6G and beyond.",
    bio:
      "The 2025 program introduced him as a postdoctoral researcher at the University of Osaka focused on integrated terahertz communication and sensing systems.",
    image: toHttps(
      "http://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/nguyen-e1759542616660.jpg",
    ),
  },
];

export const featuredSpeakerIds = [
  "kazuya-masu",
  "richard-nakajima",
  "le-duc-anh",
  "masataka-higashiwaki",
  "pham-nam-hai",
  "nguyen-thi-van-anh",
];

export const speakerKindLabels = {
  all: L("All", "Tat ca", "すべて"),
  government: L("Government", "Chinh phu", "政府"),
  academia: L("Academia", "Hoc thuat", "学術"),
  industry: L("Industry", "Doanh nghiep", "産業"),
};

export const speakerCountryLabels: Record<string, LocalizedText> = {
  all: L("All locations", "Tat ca khu vuc", "全地域"),
  Vietnam: L("Vietnam", "Viet Nam", "ベトナム"),
  Japan: L("Japan", "Nhat Ban", "日本"),
  "Vietnam-Japan": L("Vietnam-Japan", "Viet Nam - Nhat Ban", "ベトナム・日本"),
};

export type SpeakerRecord = (typeof speakers)[number];

export const venueReference = {
  name: "7F Hall, Consulate General of Vietnam in Osaka - Japan",
  address:
    "4-2-15 Ichinocho Higashi, Sakai-ku, Sakai-shi, Osaka 590-0952, Japan",
  description: L(
    "A diplomatic venue model suited to curated academic exchange, small-format networking, and high-level opening protocol.",
    "Mo hinh dia diem mang tinh doi ngoai, phu hop cho giao luu hoc thuat co chon loc, networking quy mo vua va nghi thuc khai mac cap cao.",
    "選抜型の学術交流、小規模ネットワーキング、外交儀礼を伴う開会に適した会場モデルです。",
  ),
  mapEmbed:
    "https://maps.google.com/maps?q=Consulate%20General%20Of%20Vietnam%20In%20Osaka%20-%20Japan&z=12&hl=en&t=m&output=embed&iwloc=near",
  mapLink: "https://maps.app.goo.gl/kWHZeTjo9XGjYkgZ9",
};

export const venueDirections = [
  {
    title: L("Airport arrival", "Di chuyen tu san bay", "空港から"),
    body: L(
      "For the 2025 reference venue, Kansai International Airport was the most practical arrival point. Keep airport guidance modular so it can be replaced once the 2026 city is fixed.",
      "Voi venue tham chieu 2025, san bay Kansai la diem den thuc te nhat. Huong dan tu san bay nen duoc tach module de thay ngay khi thanh pho 2026 duoc chot.",
      "2025 年参照会場では関西国際空港が最も実用的な到着地点でした。2026 年の開催都市が決まり次第、空港案内を差し替えられるようにモジュール化しておきます。",
    ),
  },
  {
    title: L("Local transit", "Di chuyen noi thanh", "市内交通"),
    body: L(
      "Use concise rail, taxi, and walking notes rather than embedding long prose. This page is designed so organizers can swap routes without redesigning the layout.",
      "Nen dung ghi chu ngan cho tau, taxi va di bo thay vi van dai. Trang nay duoc thiet ke de ban to chuc thay lo trinh ma khong can doi giao dien.",
      "長文ではなく、鉄道・タクシー・徒歩の簡潔な案内で十分です。このページはルート差し替えを前提に設計されています。",
    ),
  },
  {
    title: L("On-site wayfinding", "Huong dan tai cho", "会場内導線"),
    body: L(
      "For future editions, publish floor, registration desk, and interpretation support notes as short operational cards.",
      "Cho cac ky sau, nen cong bo thong tin tang, ban dang ky va ho tro phien dich duoi dang card van hanh ngan gon.",
      "今後の開催では、フロア、受付、通訳支援を短い運営カードとして掲載すると効果的です。",
    ),
  },
];

export const venueHotels = [
  {
    area: "Sakai",
    description: L(
      "Best for proximity to the 2025 reference venue and short same-day transfers.",
      "Phu hop nhat neu uu tien gan venue tham chieu 2025 va di chuyen trong ngay ngan.",
      "2025 年参照会場に最も近く、当日の移動を短くできます。",
    ),
  },
  {
    area: "Namba",
    description: L(
      "Good balance between direct access, dining, and evening networking options.",
      "Can bang giua di chuyen, an uong va cac hoat dong networking buoi toi.",
      "アクセス、食事、夜の交流のバランスが良いエリアです。",
    ),
  },
  {
    area: "Umeda / Osaka Station",
    description: L(
      "Useful for delegates extending meetings or connecting onward by Shinkansen.",
      "Phu hop cho khach can hop them hoac di tiep bang Shinkansen.",
      "追加面談や新幹線接続がある参加者に向いています。",
    ),
  },
];

export const venueVisitorNotes = [
  {
    audience: L("Vietnamese delegates", "Khach Viet Nam", "ベトナム参加者"),
    note: L(
      "Keep practical travel checklists short: passport validity, invitation letter status, and venue address in both English and Japanese.",
      "Danh sach viec can lam nen ngan gon: han ho chieu, trang thai thu moi va dia chi venue bang ca tieng Anh lan tieng Nhat.",
      "実務的チェックリストは簡潔に。旅券有効期限、招待状の要否、会場住所を英日両方で示します。",
    ),
  },
  {
    audience: L("Japan-based delegates", "Khach dang o Nhat", "日本国内参加者"),
    note: L(
      "Show rail access, registration opening time, and language-support notes first.",
      "Uu tien hien thi cach di bang tau, gio mo ban dang ky va thong tin ho tro ngon ngu.",
      "鉄道アクセス、受付開始時刻、言語支援情報を優先表示します。",
    ),
  },
  {
    audience: L("International guests", "Khach quoc te", "海外参加者"),
    note: L(
      "Use concise arrival, connectivity, and local payment guidance. Avoid country-specific visa text until official information is confirmed.",
      "Chi can huong dan ngan ve den noi, ket noi va thanh toan dia phuong. Khong nen viet qua chi tiet ve visa khi chua co thong tin chinh thuc.",
      "到着、通信、決済の簡潔な案内に留め、査証情報は公式確定後にのみ詳述します。",
    ),
  },
];

export const ecosystemGroups = [
  {
    id: "organizers",
    title: L("Organizers", "Ban to chuc", "主催"),
    items: [
      {
        name: "Association of Vietnamese Intellectuals in Japan (AVIJ)",
        description: L(
          "A long-running network of Vietnamese intellectuals in Japan, historically connected to Vietnam Summit in Japan and broader community convening.",
          "Mang luoi tri thuc Viet Nam tai Nhat co lich su lau nam, gan voi Vietnam Summit in Japan va cac hoat dong quy tu cong dong chuyen gia.",
          "在日ベトナム知識人の長年のネットワークであり、Vietnam Summit in Japan など広範なコミュニティ集結ともつながっています。",
        ),
        link: "https://vietnamsummit.org/",
        logo: toHttps(
          "https://vjsemiconductor.vanj.jp/wp-content/uploads/2025/09/HTT-1-scaled.jpg",
        ),
      },
      {
        name: "Vietnam Japan Intellectual Women's Union (VJIWU)",
        description: L(
          "Women-led Vietnam-Japan intellectual network highlighted on the 2025 site as one of the organizing entities.",
          "Mang luoi nu tri thuc Viet - Nhat duoc site 2025 gioi thieu nhu mot trong cac don vi to chuc.",
          "2025 年サイトで主催側の一員として紹介された、越日女性知識人ネットワークです。",
        ),
        link: "https://www.facebook.com/VJIWU",
        logo: toHttps(
          "https://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/Nu-tri-thuc-Logo.png",
        ),
      },
      {
        name: "Vietnamese Academic Network in Japan (VANJ)",
        description: L(
          "Academic network in Japan focused on connecting Vietnamese researchers, institutions, and applied collaboration opportunities.",
          "Mang hoc thuat tai Nhat Ban tap trung ket noi nha nghien cuu Viet Nam, cac to chuc va co hoi hop tac ung dung.",
          "日本で活動するベトナム系研究者、機関、実装型協力をつなぐ学術ネットワークです。",
        ),
        link: "https://vanj.jp/",
        logo: toHttps(
          "https://vjsemiconductor.vanj.jp/wp-content/uploads/2025/09/VANJ_logo_vanj_houjin_horizontal-1.png",
        ),
      },
    ],
  },
  {
    id: "co-organizers",
    title: L("Co-organizers", "Dong to chuc", "共催"),
    items: [
      {
        name: "Consulate General of Vietnam in Osaka, Japan",
        description: L(
          "Diplomatic co-host and venue partner for the 2025 edition.",
          "Dong don vi to chuc mang tinh doi ngoai va la doi tac dia diem cua phien 2025.",
          "2025 年版の外交的共催・会場パートナーです。",
        ),
        link: "https://vnconsulate-osaka.org/en/",
        logo: toHttps(
          "https://vjsemiconductor.vanj.jp/wp-content/uploads/2025/09/LSQ-1.png",
        ),
      },
      {
        name: "JSIRD",
        description: L(
          "Listed by acronym on the 2025 source site. Keep the full official naming editable in the 2026 admin source before public launch.",
          "Site 2025 chi hien thi bang viet tat. Ban 2026 nen giu ten day du cua don vi nay o nguon admin de xac nhan truoc khi cong bo.",
          "2025 年ソースサイトでは略称のみ表示されていました。2026 年版では公開前に管理データ側で正式名称を確定できるようにしておくべきです。",
        ),
        link: "",
        logo: toHttps(
          "https://vjsemiconductor.vanj.jp/wp-content/uploads/2025/09/JSIRD.png",
        ),
      },
    ],
  },
  {
    id: "partners",
    title: L("Partners", "Doi tac", "パートナー"),
    items: [],
  },
  {
    id: "patrons",
    title: L("Patrons", "Don vi bao tro", "後援"),
    items: [
      {
        name: "Japan Science and Technology Agency (JST)",
        description: L(
          "Public funding and international cooperation agency referenced in the 2025 patron block and repeatedly in the NEXUS-aligned sessions.",
          "Co quan tai tro cong va hop tac quoc te duoc nhac trong khoi patron 2025 va lap lai trong cac session gan voi NEXUS.",
          "2025 年の後援ブロックと NEXUS 関連セッションで繰り返し登場した公的資金・国際協力機関です。",
        ),
        link: "https://www.jst.go.jp/",
        logo: toHttps(
          "https://vjsemiconductor.vanj.jp/wp-content/uploads/2025/09/jstlogo_rgb4t.png",
        ),
      },
      {
        name: "National Innovation Center (NIC Vietnam)",
        description: L(
          "Vietnam's innovation platform highlighted as a patron on the 2025 source site.",
          "Nen tang doi moi sang tao quoc gia cua Viet Nam, duoc site 2025 dat trong nhom patron.",
          "2025 年ソースサイトで後援として表示されたベトナムのイノベーション基盤です。",
        ),
        link: "https://nic.gov.vn/",
        logo: toHttps(
          "https://vjsemiconductor.vanj.jp/wp-content/uploads/2025/09/Logo-NIC-01.webp",
        ),
      },
    ],
  },
];

export const sponsorReference = {
  referenceTitle: L(
    "2025 reference sponsor wall",
    "Wall nha tai tro tham chieu 2025",
    "2025年参照スポンサーウォール",
  ),
  items: [
    {
      tier: "Diamond",
      name: "FPT",
      description: L(
        "Displayed as the diamond sponsor on the 2025 source site.",
        "Duoc hien thi la nha tai tro kim cuong tren site nguon 2025.",
        "2025 年ソースサイトでダイヤモンドスポンサーとして表示されました。",
      ),
      link: "https://fpt.com/en",
      logo: toHttps(
        "https://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/LogoFPT.png",
      ),
    },
    {
      tier: "Bronze",
      name: "2025 bronze sponsor banner",
      description: L(
        "The 2025 source grouped bronze sponsors into a shared banner. The 2026 build should split these into individual records where possible.",
        "Site 2025 gom cac nha tai tro dong thanh mot banner chung. Ban 2026 nen tach thanh cac record rieng khi co du du lieu.",
        "2025 年ソースではブロンズスポンサーが共通バナーにまとめられていました。2026 年版では可能な限り個別レコードに分割すべきです。",
      ),
      link: "",
      logo: toHttps(
        "https://vjsemiconductor.vanj.jp/wp-content/uploads/2025/10/image-2.png",
      ),
    },
  ],
};

export const sponsorTiers = [
  {
    name: "Diamond",
    description: L(
      "Primary naming partner with large-format logo and premium placement.",
      "Nha dong hanh cap cao nhat voi logo lon va vi tri uu tien.",
      "大判ロゴと最上位配置を持つ最上位パートナー。",
    ),
  },
  {
    name: "Gold",
    description: L(
      "Major sponsors with strong home-page and section-page visibility.",
      "Nha tai tro chinh voi muc hien thi ro tren trang chu va cac trang thanh phan.",
      "ホームと主要セクションで高い可視性を持つ主要スポンサー。",
    ),
  },
  {
    name: "Silver",
    description: L(
      "Supporting sponsors with logo-wall placement and external-link support.",
      "Nha tai tro dong hanh voi hien thi tren logo wall va link ngoai.",
      "ロゴウォール掲載と外部リンクを伴う支援スポンサー。",
    ),
  },
  {
    name: "Bronze",
    description: L(
      "Entry tier suitable for grouped or banner-style presentation.",
      "Hang muc dau vao, phu hop cho hien thi nhom hoac kieu banner.",
      "グループ表示やバナー表示に適したエントリーティア。",
    ),
  },
  {
    name: "Academic / Community",
    description: L(
      "Non-commercial support from universities, labs, and ecosystem communities.",
      "Muc ho tro phi thuong mai tu truong dai hoc, phong thi nghiem va cong dong he sinh thai.",
      "大学、研究室、コミュニティからの非商業的支援枠。",
    ),
  },
];

export const submissionCards = [
  {
    title: L("2026 portal status", "Trang thai cong 2026", "2026年ポータル状況"),
    body: L(
      "Submission portal to be announced together with the final 2026 dates and venue.",
      "Cong submission se duoc cong bo cung voi thoi gian va venue 2026 chinh thuc.",
      "投稿ポータルは 2026 年の日程・会場確定後に公開されます。",
    ),
  },
  {
    title: L("Reusable 2025 themes", "Chu de co the ke thua tu 2025", "2025年から継承できるテーマ"),
    body: L(
      "Bilateral cooperation, talent development, advanced materials and devices, spintronics, THz systems, and research infrastructure are already strong foundations.",
      "Hop tac song phuong, phat trien nhan luc, vat lieu va linh kien tien tien, spintronics, THz va ha tang nghien cuu da la nen tang rat tot.",
      "二国間協力、人材育成、先端材料・デバイス、スピントロニクス、THz、研究基盤はすでに強い土台です。",
    ),
  },
  {
    title: L("What still needs 2026 updates", "Noi dung can cap nhat cho 2026", "2026年版で更新が必要な項目"),
    body: L(
      "Track taxonomy, deadlines, templates, review policy, and final submission URL should come from a central admin source.",
      "Taxonomy track, deadline, template, chinh sach review va URL nop bai cuoi can duoc lay tu mot nguon admin trung tam.",
      "トラック分類、締切、テンプレート、査読方針、最終投稿 URL は中央管理ソースから供給すべきです。",
    ),
  },
];

export const registrationCards = [
  {
    title: L("Attendee categories", "Nhom nguoi tham du", "参加区分"),
    body: L(
      "Researchers, students, policy stakeholders, and industry delegates should each have a clear registration path.",
      "Nha nghien cuu, sinh vien, ben chinh sach va dai bieu doanh nghiep moi nhom nen co luong dang ky ro rang.",
      "研究者、学生、政策関係者、産業界参加者ごとに明確な登録導線を設けるべきです。",
    ),
  },
  {
    title: L("Operational data", "Du lieu van hanh", "運営データ"),
    body: L(
      "Fees, early-bird cutoff, invitation letters, and confirmation emails should be editable fields, not hard-coded copy.",
      "Phi, han early-bird, thu moi va email xac nhan nen la truong co the chinh sua, khong phai doan van hard-code.",
      "料金、早期登録締切、招聘状、確認メールは固定文ではなく編集可能フィールドにするべきです。",
    ),
  },
  {
    title: L("Current status", "Trang thai hien tai", "現在の状態"),
    body: L(
      "Registration will open once the 2026 venue, program scope, and pricing policy are approved.",
      "Dang ky se mo khi venue 2026, pham vi chuong trinh va chinh sach gia duoc phe duyet.",
      "参加登録は 2026 年の会場、プログラム範囲、料金方針の承認後に開始されます。",
    ),
  },
];
