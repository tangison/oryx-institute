/**
 * Oryx Institute · Chinese content mirror.
 *
 * Same shapes as site.ts, so any page can pick the language object and
 * keep its render code unchanged. Brand names, legal names and the
 * wordmark stay exactly as the master package prints them; every
 * sentence around them carries the institute's voice in Chinese:
 * state the fact, cite the source, stop.
 */

export const siteZh = {
  tradingName: "Oryx 理工学院",
  legalName: "Oryx Polytechnic Institute",
  headline: "Oryx 理工学院。",
  heroSub: "纳米比亚的一所新理工学校。研究、实务，以及证明这一切的企业。",
  closingLine: "Oryx 理工学院的毕业生安静地解决问题，决断地收尾。",
  credentialLine: "以创新与实用解题见长。",
  tagline: "工欲善其事。我们打造工具。",
  description:
    "Oryx 理工学院，温得和克：纳米比亚的一所新理工学校。速成课与短期课程、经营咨询、市场调研，以及证明这一切的实业。学院开办之前即如实陈述现状：正向 NQA 与 NTA 申请认证，暂无公开场所，不设公开电话；一切垂询经 info@oryxinstitute.org 由院长办公室亲自回复。",
  country: "纳米比亚",
  areaServed: "纳米比亚温得和克",
} as const;

export const statusZh = {
  stage: "开办前",
  accreditation:
    "Oryx 正在向 NQA 与 NTA 申请认证。目前尚未获得认证。",
  liveNow: [
    {
      name: "经营者案头",
      line: "一对一经营咨询。结果落在纸面。",
    },
    {
      name: "工商管理",
      line: "账目、申报、登记册方面的速成课与短期课程。",
    },
    {
      name: "信息技术及相关领域",
      line: "教业务赖以运转的系统。每一件工具都有名字。",
    },
    {
      name: "市场调研",
      line: "可行性、市场规模、对手研判、入市路径，都在纳米比亚的土地上取材。",
    },
    {
      name: "快速响应培训",
      line: "约请行家，搭好课程，按标准交付。",
    },
    {
      name: "Oryx 资源目录",
      line: "免费的纳米比亚专题速成课与商业模板。",
    },
  ],
  inDevelopment: [
    {
      name: "AI 培训课程",
      line: "与 Tangison Technologies 共建，2026 年 10 月 18 日公布。课程正在编写，一款旗舰产品在造。",
    },
    {
      name: "技能营（卡里比布 VTC）",
      line: "实体职业培训中心在调研与筹建中，另有路线图。",
    },
    {
      name: "基础课程主线",
      line: "AI、商业、财务常识、领导力与同理心，作为必修主线：认证落地即成真。",
    },
  ],
  partnerships:
    "Oryx 愿与目标相近的机构合作：培训机构、认证伙伴、企业赞助方，以及业务互补的公司。",
  instructors: {
    title: "铁匠",
    formalTitle: "匠师",
    note: "教师被称为铁匠，正式场合称匠师，取自那句格言：我们打造自己的工具。",
  },
} as const;

export const offersZh = [
  {
    id: "owners-desk",
    name: "经营者案头",
    tag: "实务",
    line: "一对一经营咨询。结果落在纸面。",
    cta: { label: "预约", href: "/apply#owners-desk" },
    body: "为纳米比亚的经营者提供一对一咨询，专挑代价最高的时刻：开张、注册、雇人、定价、转向，或者体面地收尾。面谈在院长办公室进行，也可邮件往来，结果落在纸面：定了什么，接下来做什么。",
  },
  {
    id: "business-administration",
    name: "工商管理",
    tag: "教学",
    line: "账目、申报、登记册方面的速成课与短期课程。",
    cta: { label: "垂询", href: "/apply#business-administration" },
    body: "这个系教一门生意怎么运转：账目、申报、登记册，以及背后的日常流程。只开速成课与短期课程，每门课都窄、都实用、都收尾。",
  },
  {
    id: "it",
    name: "信息技术及相关领域",
    tag: "教学",
    line: "教业务赖以运转的系统。每一件工具都有名字。",
    cta: { label: "垂询", href: "/apply#it" },
    body: "这个系教一门生意赖以运转的系统与软件，从第一性原理讲到用得有把握。只开速成课与短期课程，每一件工具都有名字。",
  },
  {
    id: "market-rd",
    name: "市场调研",
    tag: "研究",
    line: "可行性、市场规模、对手研判、入市路径，都在纳米比亚的土地上取材。",
    cta: { label: "委托", href: "/apply#market-rd" },
    body: "可行性研究、市场规模测算、对手研判与入市路径规划，都在纳米比亚的土地上取材，写成能直接用的东西。学院自己的申报文件练出了这套方法；同样的严谨，现在对外接单。",
  },
  {
    id: "rapid-response",
    name: "快速响应培训",
    tag: "实务",
    line: "约请行家，搭好课程，按标准交付。",
    cta: { label: "说明需求", href: "/apply#rapid-response" },
    body: "当一家企业需要团队学会新东西，Oryx 去约请行家，围绕这个需求搭课程，然后交付。它为这段差距而设：团队已经会的，与下一步必须会的之间。",
  },
  {
    id: "directory",
    name: "Oryx 资源目录",
    tag: "免费",
    line: "免费的纳米比亚专题速成课与商业模板。",
    cta: { label: "自取", href: "/resources" },
    body: "纳米比亚专题的速成课与商业模板，版权归学院，免费取用。它先于任何报价，证明这个学院怎么写作、怎么取材、怎么教学。",
  },
] as const;

export const registerZh = [
  { date: "2026-10-25", entry: "BIPA 注册确认：Oryx Polytechnic Institute。" },
  { date: "2026-10-25", entry: "网站改版上线。" },
  { date: "2026-10-18", entry: "与 Tangison Technologies 共同公布 AI 培训课程。" },
  /* TODO founder: Gids-publikasiedatum */
  { date: null, entry: "Oryx 资源目录发布：四门速成课，七套商业模板。" },
  /* TODO founder: Corner Spa-aankondigingsdatum */
  { date: null, entry: "Corner Spa 概念公布。" },
] as const;

export const venturesZh = {
  lead: "小公司，真客户。",
  body: "Oryx 想弄懂一个行业时，就在这个行业里开一家小公司。客户说了算，登记册公布结果。",
  cornerSpa: {
    name: "Corner Spa",
    status: "概念",
    line: "康养与服务运营：第一个实作实验室。",
    body: "Corner Spa 是学院的第一项实业：一门小型康养与服务生意，先以概念公布，再以企业开业。它有两个用途：在温得和克为真客户提供真服务，以及一间活的课堂：工商管理、服务标准、前台运营，就在生意现场教。概念正在推进：场地、执照与服务单，逐项落实。开业那天，开业一事会带着日期登上本站的登记册。在那之前，它是一个概念。",
  },
  futureLine: "下一项实业还没有名字。开业之时，开业一事会带着日期进入登记册。",
} as const;

export const disciplinesZh = [
  {
    id: "science",
    glyph: "理",
    name: "科学",
    summary: "理工教育的推理内核：观察、证据、有纪律的思考。",
  },
  {
    id: "engineering",
    glyph: "工",
    name: "工程",
    summary: "制作的内核：做得出、立得住的活，有度量，按标准收尾。",
  },
  {
    id: "technology",
    glyph: "TECH",
    name: "技术",
    summary: "现代工具拆开再装回去，直到弄懂为止，不只是会用。",
  },
  {
    id: "applied",
    glyph: "SOLVE",
    name: "实用解题",
    summary: "学院自己的标准，印在每张证书上：实践中的创新。",
  },
] as const;

export const approvedLinesZh = [
  { line: "看着无害。并不是。", source: "招聘传单" },
  {
    line: "Oryx 理工学院的毕业生安静地解决问题，决断地收尾。",
    source: "招聘传单",
  },
  {
    line: "以创新与实用解题见长。",
    source: "结业证书",
  },
  { line: "安静的活，利落的尾。", source: "策略笔记" },
  { line: "要决定，不要汇报图。", source: "实务" },
  { line: "先有证据，钱再动。", source: "市场调研" },
  {
    line: "每个数字注明出处，否则不发。",
    source: "Oryx 公报",
  },
  { line: "没准备好的，直说。", source: "登记册" },
  { line: "把话说完。就到这里。", source: "文风" },
  { line: "安静是一种语域，不是音量。", source: "文风" },
  {
    line: "印不出来的，绝不自称。",
    source: "品牌",
  },
] as const;

export const partnersZh = [
  {
    id: "tangison",
    note: "AI 培训课程与旗舰产品，共同建设。",
  },
  {
    id: "mendozer",
    note: "Corner Spa 与其后的实业，共同构思。",
  },
] as const;

export const faqsZh = [
  {
    q: "怎么申请？",
    a: "给办公室写信。发一封邮件到 info@oryxinstitute.org，写上你的名字、一个便于回复的联系方式，以及你感兴趣的领域。申请从这封邮件开始。",
  },
  {
    q: "学院开设哪些课程？",
    a: "速成课与短期课程，两个系：工商管理，信息技术及相关领域。这就是今天全部的教学课程，没有更长的项目。教学之外，实务也在运转：经营者案头的一对一咨询、市场调研、快速响应培训。各个学校随认证进展逐步开设。具体课程在申请时由院长办公室确认，所以更具体的答案只有一句：在申请邮件里问。",
  },
  {
    q: "Oryx 给企业做咨询吗？",
    a: "做，这正是学院的在营实务。经营者案头在院长办公室提供一对一咨询；市场调研（可行性、规模测算、入市路径）按项目接单。给办公室写信，把问题原样写来；第一封回信会讲明学院能做什么、不能做什么。",
  },
  {
    q: "理工是什么意思？",
    a: "理工（li gong）：科学与工程。在字标里，这两个字占的位置，正是学院全名 Oryx Polytechnic Institute 中 Polytechnic 一词的位置，以栗色印在 ORYX 旁边。",
  },
  {
    q: "学院在哪里？",
    a: "学院在纳米比亚温得和克开展工作。学院正在筹建，尚无对外场地，所以不印街道地址，也不设信箱。办公室通过 info@oryxinstitute.org 回复每一封咨询，到访按预约安排。",
  },
  {
    q: "谁在主持学院？",
    a: "Tangi Iigonda 是院长。申请由院长办公室阅处。",
  },
  {
    q: "有证书吗？",
    a: "有。结业时学院颁发结业证书，表彰创新与实用解题上的出色表现。证书由院长签名，手写日期。",
  },
  {
    q: "可以去办公室拜访吗？",
    a: "可以，按预约。在第一封邮件里说明想见面，办公室会定一个双方都合适的温得和克的时间与地点。",
  },
  {
    q: "Oryx 得到认证了吗？",
    a: "还没有。Oryx 正在向 NQA 与 NTA 申请认证。今天在运转的东西，即速成课与短期课程、快速响应培训、Oryx 资源目录，在认证到来之前就已经有用。本站不自称学院并不持有的任何资质。",
  },
  {
    q: "什么是快速响应培训？",
    a: "一家企业需要团队学会新东西。Oryx 去约请行家，围绕需求搭课程，然后交付。它为这段差距而设：团队已经会的，与下一步必须会的之间。向办公室垂询。",
  },
  {
    q: "什么是 Oryx 资源目录？",
    a: "学院的免费资源库：纳米比亚专题的速成课与商业模板，版权归 Oryx Polytechnic Institute，免费取用。它先于任何报价，证明学院的做事标准。可以从四门速成课开始，或者直接取用七套模板。",
  },
  {
    q: "调研业务覆盖什么？",
    a: "同一张桌子的两面。对客户：可行性研究、市场规模测算、对手研判、入市路径规划，都在纳米比亚的土地上取材。对学院自己：正与 Tangison Technologies 共建的 AI 培训课程、在其上建造的旗舰产品，以及技能营概念。研究页写明哪些在营、哪些在建。",
  },
  {
    q: "Oryx 与伙伴合作吗？",
    a: "公开合作，指名道姓。AI 培训课程与 Tangison Technologies 共建；概念工作与 Mendozer 共同推进。在这些已公布的合作之外，学院愿与目标相近的机构合作：培训机构、认证伙伴、企业赞助方，以及业务互补的公司。给办公室写信，讲讲你的想法。",
  },
  {
    q: "什么是实业？",
    a: "学院为了弄懂一个行业，就在这个行业里开一家小型运营公司。实业同时是活的课堂：学生在它的现场上课，客户判断它行不行。实业先以概念公布，开业时记入登记册。",
  },
  {
    q: "什么是 Corner Spa？",
    a: "学院的第一项实业，先以概念公布：温得和克一门小型康养与服务生意，用来在现场教工商管理、服务标准与前台运营。场地、执照与服务单正逐项落实。开业那天，开业一事会带着日期进入登记册。",
  },
  {
    q: "研究内容可以读吗？",
    a: "可以，而且免费。Oryx 公报是学院关于纳米比亚真实营商现实的文集，每个数字都注明出处，全文在本站发表，不收费、不开账户。Oryx 资源目录在旁提供免费的速成课与模板。",
  },
] as const;

/** Primary navigation: the brief's links, top bar and mobile list.
 * The wordmark already carries Home. */
export const navZh = {
  navLinks: [
    { href: "/research", label: "研究" },
    { href: "/practice", label: "实务" },
    { href: "/ventures", label: "实业" },
    { href: "/resources", label: "资源目录" },
    { href: "/apply", label: "申请" },
  ],
  footerNav: [
    { href: "/research", label: "研究" },
    { href: "/practice", label: "实务" },
    { href: "/ventures", label: "实业" },
    { href: "/resources", label: "资源目录" },
    { href: "/resources#bulletin", label: "公报" },
    { href: "/register", label: "登记册" },
    { href: "/about", label: "关于" },
    { href: "/brand", label: "品牌" },
    { href: "/apply", label: "申请" },
    { href: "/contact", label: "联系" },
    { href: "/faq", label: "常见问题" },
    { href: "/legal/privacy", label: "隐私" },
    { href: "/legal/terms", label: "条款" },
  ],
} as const;
