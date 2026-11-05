/**
 * The safety officer training programme ("Smatrac" working codename),
 * delivered through the Practice engine. Curriculum, assessment and
 * delivery model per SAFETY-COURSE-PLAN.md; nothing here invents a
 * fee, a date, or an instructor. Fields that are not yet confirmed
 * print their publication date instead: 15 November 2026.
 *
 * The programme is positioned as industry-orientated professional
 * development. NTA provider registration and NQA accreditation are
 * pursued in parallel and stated plainly on every page, per
 * CONTENT-CORRECTIONS §3 and §4.
 */

export type SafetyModule = {
  no: string;
  name: string;
  line: string;
  /** The plate anchored to this module row, if the bible assigns one. */
  plate?: { src: string; alt: string; altZh: string };
};

export type SafetyLevel = {
  slug: "level-1-induction" | "level-2-officer" | "level-3-management";
  code: string;
  durationIso: "P1D" | "P5D" | "P10D";
  hero: { src: string; width: number; height: number };
  en: SafetyLevelCopy;
  zh: SafetyLevelCopy;
};

type SafetyLevelCopy = {
  navName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  audience: { label: string; body: string };
  outlineEyebrow: string;
  modules: SafetyModule[];
  assessmentEyebrow: string;
  assessment: string[];
  outcomesEyebrow: string;
  outcomes: string[];
  credentialEyebrow: string;
  credential: string;
  credentialNote: string;
  feeEyebrow: string;
  fee: string;
  datesEyebrow: string;
  dates: string;
  applyCta: string;
};

export const SAFETY_LANDING_PATH = "/practice/safety-officer-course";

export const safetyLevels: SafetyLevel[] = [
  {
    slug: "level-1-induction",
    code: "ORYX-SAFETY-1",
    durationIso: "P1D",
    hero: {
      src: "/images/kinfolk/safety/40-green-helmet.jpg",
      width: 1254,
      height: 1254,
    },
    en: {
      navName: "Level 1 · Induction",
      metaTitle: "General Worker Safety Induction (1 day) · Oryx Institute",
      metaDescription:
        "One-day General Worker Safety Induction. Hazard identification, PPE, emergency procedures, and legal duties. Certificate issued on completion. Book your place.",
      h1: "General Worker Safety Induction.",
      lede: "One day, six contact hours, one outcome: a worker who can spot a hazard, wear the right protection, and raise the alarm the right way. The induction every new employee on any Namibian site should sit through before their first shift.",
      audience: {
        label: "Who sits this level",
        body: "Every new employee on any site: general workers, cleaners, drivers, contractors' labour. No prior training is assumed, and none is required.",
      },
      outlineEyebrow: "The day, module by module",
      modules: [
        {
          no: "01",
          name: "What occupational safety is, and why it matters",
          line: "The register of the day: what a hazard is, what harm looks like, and what the law expects of everyone on site.",
        },
        {
          no: "02",
          name: "Legal duties of employer and employee",
          line: "The Labour Act and its occupational health and safety regulations, stated as duties: what the employer must provide, what the worker must do.",
        },
        {
          no: "03",
          name: "Hazard identification and reporting",
          line: "Seeing the thing before it bites: spotting, naming and reporting hazards, and what happens to the report afterwards.",
        },
        {
          no: "04",
          name: "Personal protective equipment",
          line: "What PPE is, when each piece is worn, how it is checked, and why the cheapest helmet is the most expensive thing on site.",
          plate: {
            src: "/images/kinfolk/safety/48-hi-vis.jpg",
            alt: "A folded lime hi-vis vest with two reflective strips, resting on grey concrete",
            altZh: "一件折叠的荧光黄反光背心，带两条反光条，放在灰色混凝土上",
          },
        },
        {
          no: "05",
          name: "Emergency procedures",
          line: "Fire, first aid and evacuation: who calls whom, where everyone goes, and how a drill differs from the real thing.",
        },
        {
          no: "06",
          name: "Manual handling and basic ergonomics",
          line: "Lifting, carrying and working positions that keep a back whole, demonstrated and practised on the day.",
        },
      ],
      assessmentEyebrow: "Assessment",
      assessment: [
        "A 20-question multiple-choice test at the end of the day.",
        "Pass mark: 80 percent.",
        "Results within five working days of the sitting.",
      ],
      outcomesEyebrow: "Outcomes",
      outcomes: [
        "Identify and report hazards on a working site",
        "Select, inspect and wear the PPE a task requires",
        "Act correctly under fire, injury and evacuation procedures",
        "State the legal duties of employer and employee",
        "Lift and handle loads without injury",
      ],
      credentialEyebrow: "The document",
      credential: "Certificate of Attendance",
      credentialNote:
        "An internal record of completion, signed by the Principal. It is not an NQF-credit-bearing qualification and cannot be submitted to NQA as accredited prior learning. It is a record that you completed an Oryx course.",
      feeEyebrow: "Fee",
      fee: "Published 15 November 2026, in Namibia dollars.",
      datesEyebrow: "Dates",
      dates:
        "Cohort 1 is planned for January 2027. Intake dates publish on this page and in the register on 15 November 2026.",
      applyCta: "Register interest",
    },
    zh: {
      navName: "一级 · 准入",
      metaTitle: "员工安全准入培训（一天），温得和克 · Oryx 理工学院 · Oryx Institute",
      metaDescription:
        "一日制员工安全准入培训，在温得和克开课：危险源辨识、个人防护装备、应急程序、雇主与员工的法律义务，结业颁发结业证书。当天六个学时，二十道选择题考核，及格线八十分，考后五个工作日出结果。首期班计划于 2027 年 1 月开课，现在向 Oryx 登记意向，报名一开放，办公室当天与你联系。",
      h1: "员工安全准入培训。",
      lede: "一天，六个学时，一个结果：一名能看出危险、会穿对防护、知道怎么正确报警的员工。任何纳米比亚工地上的新员工，上第一个班之前都该听这一课。",
      audience: {
        label: "谁来上这一级",
        body: "任何工地上的每一位新员工：普工、清洁、司机、承包商劳工。不要求任何前置培训。",
      },
      outlineEyebrow: "这一天的模块",
      modules: [
        {
          no: "01",
          name: "职业安全是什么，为什么重要",
          line: "全天的基调：什么是危险源，伤害长什么样，法律对现场每个人有什么要求。",
        },
        {
          no: "02",
          name: "雇主与员工的法律义务",
          line: "《劳工法》及其职业健康与安全条例，按义务来讲：雇主必须提供什么，员工必须做到什么。",
        },
        {
          no: "03",
          name: "危险源辨识与报告",
          line: "在出事之前看见它：发现、指认、报告危险源，以及报告提交之后会发生什么。",
        },
        {
          no: "04",
          name: "个人防护装备",
          line: "什么是 PPE，每件什么时候穿、怎么检查，以及为什么最便宜的头盔是现场最贵的东西。",
          plate: {
            src: "/images/kinfolk/safety/48-hi-vis.jpg",
            alt: "一件折叠的荧光黄反光背心，带两条反光条，放在灰色混凝土上",
            altZh: "一件折叠的荧光黄反光背心，带两条反光条，放在灰色混凝土上",
          },
        },
        {
          no: "05",
          name: "应急程序",
          line: "火灾、急救与疏散：谁给谁打电话，所有人去哪里，演练和真事差在哪里。",
        },
        {
          no: "06",
          name: "人工搬运与基础人体工学",
          line: "搬运、负重与能保住腰的作业姿势，当天示范并练习。",
        },
      ],
      assessmentEyebrow: "考核",
      assessment: [
        "当天结束时 20 道选择题。",
        "及格线：80 分。",
        "考后五个工作日内出结果。",
      ],
      outcomesEyebrow: "学完能做什么",
      outcomes: [
        "辨识并报告作业现场的危险源",
        "按任务选择、检查并穿戴防护装备",
        "在火灾、受伤与疏散程序下正确行动",
        "说出雇主与员工的法律义务",
        "无损伤地搬运与处理货物",
      ],
      credentialEyebrow: "文书",
      credential: "结业证书",
      credentialNote:
        "由院长签名的内部结业记录。它不是 NQF 学分资格，不能作为认证的先前学习提交给 NQA；它证明你完成了 Oryx 的一门课。",
      feeEyebrow: "费用",
      fee: "2026 年 11 月 15 日公布，以纳元计。",
      datesEyebrow: "日期",
      dates:
        "首期班计划于 2027 年 1 月开课。开班日期将于 2026 年 11 月 15 日公布在本页与登记册。",
      applyCta: "登记意向",
    },
  },
  {
    slug: "level-2-officer",
    code: "ORYX-SAFETY-2",
    durationIso: "P5D",
    hero: {
      src: "/images/kinfolk/safety/41-helmet-boots.jpg",
      width: 1122,
      height: 1402,
    },
    en: {
      navName: "Level 2 · Officer",
      metaTitle: "Safety Officer course (5 days), Windhoek · Oryx Institute",
      metaDescription:
        "Five-day Safety Officer course. HIRA, incident investigation, construction hazards, first aid awareness, and a practical site assessment. Enrol with Oryx.",
      h1: "Safety Representative and Site Safety Officer.",
      lede: "Five days that end in an officer the site can use: the legal framework, the HIRA method, the incident file, the toolbox talk, and a practical walkthrough assessed on a live site. For the person the law expects to know why, not just what.",
      audience: {
        label: "Who sits this level",
        body: "Designated workplace representatives, junior officers, and supervisors who carry the safety responsibility beside their own trade.",
      },
      outlineEyebrow: "The week, module by module",
      modules: [
        {
          no: "01",
          name: "The Namibian legal framework",
          line: "The Labour Act and the sector regulations that follow it: construction, mining, factories. What each demands of a site, and who is answerable.",
        },
        {
          no: "02",
          name: "Hazard identification and risk assessment",
          line: "HIRA methodology: scoring likelihood against severity, writing the assessment a supervisor can act on, and revisiting it when the site changes.",
        },
        {
          no: "03",
          name: "Incident investigation and reporting",
          line: "Near-miss, injury and fatality: securing the scene, taking statements, and the paperwork that must exist afterwards.",
        },
        {
          no: "04",
          name: "PPE inspection and management",
          line: "Issuing, inspecting, recording and replacing: running a PPE store that passes an audit.",
        },
        {
          no: "05",
          name: "Emergency preparedness and fire safety",
          line: "Preparedness planning, and the practical: extinguisher use, live, with the theory behind each class of fire.",
        },
        {
          no: "06",
          name: "First aid awareness",
          line: "What to do in the first minutes and how to support a first aider. This is awareness, not certification: the Level 1 first-aid course itself is delivered by a registered training partner.",
          plate: {
            src: "/images/kinfolk/safety/43-first-aid.jpg",
            alt: "A plain matte green metal first-aid box, centred on cream paper",
            altZh: "一只素面哑光绿的金属急救箱，居中放在米色纸上",
          },
        },
        {
          no: "07",
          name: "Construction-site hazards",
          line: "Scaffolds, working at heights, excavation and electrical awareness: the four that hurt most, taught as inspection points.",
        },
        {
          no: "08",
          name: "Toolbox talks and crew briefings",
          line: "Running the ten minutes that keep a week safe: preparing, delivering and recording a talk that workers actually keep.",
        },
        {
          no: "09",
          name: "Safety file management and records",
          line: "The file an inspector asks for first: registers, permits, certificates, and how to keep them current without heroics.",
        },
        {
          no: "10",
          name: "Practical site walkthrough",
          line: "A guided walkthrough at a partner site, closed by observation against the rubric you saw in advance.",
        },
      ],
      assessmentEyebrow: "Assessment",
      assessment: [
        "A 50-question written examination. Pass mark: 80 percent.",
        "A practical risk-assessment exercise at the partner worksite.",
        "A ten-minute toolbox talk, delivered to the cohort.",
        "A walkthrough observation, scored against the published rubric.",
        "Results within five working days of the final exercise.",
      ],
      outcomesEyebrow: "Outcomes",
      outcomes: [
        "Run a HIRA on a working site and write it up",
        "Investigate and document an incident to statutory standard",
        "Inspect, issue and manage PPE across a workforce",
        "Deliver a recorded toolbox talk and chair the weekly meeting",
        "Keep a safety file that stands up to inspection",
        "Act as the designated representative on a Namibian site",
      ],
      credentialEyebrow: "The document",
      credential: "Certificate of Completion, Safety Officer Level 2",
      credentialNote:
        "An internal credential, non-NQF at launch. When accreditation is awarded, the level maps to NQF-aligned unit standards and the mapping is announced on the register.",
      feeEyebrow: "Fee",
      fee: "Published 15 November 2026, in Namibia dollars.",
      datesEyebrow: "Dates",
      dates:
        "Cohort 1 is planned for January 2027. Intake dates publish on this page and in the register on 15 November 2026.",
      applyCta: "Register interest",
    },
    zh: {
      navName: "二级 · 安全员",
      metaTitle: "安全员课程（五天），温得和克 · Oryx 理工学院 · Oryx Institute",
      metaDescription:
        "五日制安全员课程，在温得和克开课：HIRA 风险评估方法、事故调查与报告、建筑工地安全、安全档案管理、急救意识与班前会，最终在伙伴工地完成实操巡查考核。五十道笔试、实操作业与班前会讲授，及格线八十分，结果五个工作日内送达。现在向 Oryx 登记意向，报名一开放，办公室当天与你联系。",
      h1: "安全代表与现场安全员。",
      lede: "五天，结业时得到一名能用的安全员：法律框架、HIRA 方法、事故档案、班前会，以及在真实工地上接受考核的实操巡查。为法律期待的那个人准备：不仅要知其然，还要知其所以然。",
      audience: {
        label: "谁来上这一级",
        body: "指定的职场安全代表、初级安全员，以及在自身工种之外还背着安全责任的现场主管。",
      },
      outlineEyebrow: "这一周的模块",
      modules: [
        {
          no: "01",
          name: "纳米比亚法律框架",
          line: "《劳工法》及随之而来的行业条例：建筑、矿山、工厂。每一条对现场要求什么，谁负其责。",
        },
        {
          no: "02",
          name: "危险源辨识与风险评估",
          line: "HIRA 方法：可能性对照严重度打分，写出主管拿去就能用的评估，并在现场变化时回头修订。",
        },
        {
          no: "03",
          name: "事故调查与报告",
          line: "险情、受伤与死亡：保护现场、取得陈述，以及事后必须存在的那叠文书。",
        },
        {
          no: "04",
          name: "PPE 检查与管理",
          line: "发放、检查、记录、更换：把一间防护用品库管到经得起审计。",
        },
        {
          no: "05",
          name: "应急准备与消防安全",
          line: "应急预案的编制，加上实操：各类火灾的原理，亲手使用灭火器。",
        },
        {
          no: "06",
          name: "急救意识",
          line: "头几分钟做什么，以及如何协助急救员。这是意识课，不是资格课：一级急救课程本身由注册培训伙伴交付。",
          plate: {
            src: "/images/kinfolk/safety/43-first-aid.jpg",
            alt: "一只素面哑光绿的金属急救箱，居中放在米色纸上",
            altZh: "一只素面哑光绿的金属急救箱，居中放在米色纸上",
          },
        },
        {
          no: "07",
          name: "建筑工地安全",
          line: "脚手架、高处作业、开挖与用电安全：伤人最多的四项，按检查点来教。",
        },
        {
          no: "08",
          name: "班前会与安全会议",
          line: "开好保一周平安的那十分钟：准备、讲授、记录一场工人真听得进去的班前会。",
        },
        {
          no: "09",
          name: "安全档案管理与现场文书",
          line: "稽查员第一件要看的档案：登记簿、许可证、证书，以及不靠拼命也能保持更新的办法。",
        },
        {
          no: "10",
          name: "现场实操巡查",
          line: "在伙伴工地上的导览巡查，最后按事先公开的评分表接受观察考核。",
        },
      ],
      assessmentEyebrow: "考核",
      assessment: [
        "50 道笔试。及格线：80 分。",
        "在巡查工地完成一次实操风险评估。",
        "向全班讲授一场十分钟的班前会。",
        "现场巡查观察考核，按公开评分表打分。",
        "最后一项考核后五个工作日内出结果。",
      ],
      outcomesEyebrow: "学完能做什么",
      outcomes: [
        "在作业现场开展 HIRA 并成文",
        "按法定标准调查并记录事故",
        "为整支队伍检查、发放并管理 PPE",
        "讲授一场有记录的班前会，主持安全会议",
        "维护一份经得起检查的现场安全档案",
        "在纳米比亚现场担任指定安全代表",
      ],
      credentialEyebrow: "文书",
      credential: "结业证书，安全员二级",
      credentialNote:
        "开办之初为内部证书，非 NQF。取得认证后，本级别将对应 NQF 相关单元标准，并在登记册上公布对应关系。",
      feeEyebrow: "费用",
      fee: "2026 年 11 月 15 日公布，以纳元计。",
      datesEyebrow: "日期",
      dates:
        "首期班计划于 2027 年 1 月开课。开班日期将于 2026 年 11 月 15 日公布在本页与登记册。",
      applyCta: "登记意向",
    },
  },
  {
    slug: "level-3-management",
    code: "ORYX-SAFETY-3",
    durationIso: "P10D",
    hero: {
      src: "/images/kinfolk/safety/42-clipboard.jpg",
      width: 1254,
      height: 1254,
    },
    en: {
      navName: "Level 3 · Management",
      metaTitle: "Advanced Safety Management course · Oryx Institute",
      metaDescription:
        "Advanced Safety Management. SHEQ systems, construction regulations, contractor management, auditing, and train-the-trainer. Modular ten-day programme.",
      h1: "Advanced Safety Management.",
      lede: "Ten days, modular: the systems layer above the officer. SHEQ management, regulation in depth, contractor control, root-cause investigation and audit. Modules can be taken separately; the certificate wants them all.",
      audience: {
        label: "Who sits this level",
        body: "Senior safety officers, SHE managers and compliance managers: the people who sign off systems, not just shifts.",
      },
      outlineEyebrow: "The programme, module by module",
      modules: [
        {
          no: "01",
          name: "SHEQ management systems",
          line: "Safety, health, environment and quality as one system: the SANS and ISO 45001 family read as a working manual, not a binder on a shelf.",
        },
        {
          no: "02",
          name: "Construction regulations in depth",
          line: "SANS 10400 and the construction regulations where they apply: permits, notifications, and the paperwork that precedes a pour.",
        },
        {
          no: "03",
          name: "Mining safety regulations",
          line: "For clients in mining: the additional duties, the additional paperwork, and where the thresholds bite.",
        },
        {
          no: "04",
          name: "Occupational hygiene and environmental monitoring",
          line: "Noise, dust, ventilation and exposure: what to measure, how often, and what the numbers oblige you to do.",
        },
        {
          no: "05",
          name: "Contractor management",
          line: "Selecting, inducting, supervising and closing out contractors so their safety file is as good as yours.",
        },
        {
          no: "06",
          name: "Accident investigation",
          line: "Root cause analysis, with ICAM and TapRooT fundamentals: finding the failure in the system, not the person to blame.",
        },
        {
          no: "07",
          name: "Training of trainers",
          line: "Feeding instructors back into Levels 1 and 2: teaching technique, assessment design, and keeping a room.",
        },
        {
          no: "08",
          name: "Auditing and inspection techniques",
          line: "Building and running an audit programme: checklists, evidence, findings, and the follow-up that makes the next audit shorter.",
        },
      ],
      assessmentEyebrow: "Assessment",
      assessment: [
        "A written examination at the end of each module. Pass mark: 80 percent.",
        "A practical audit report, produced against a live site.",
        "A management-system assignment, marked to the rubric you saw in advance.",
        "Results within five working days of each sitting.",
      ],
      outcomesEyebrow: "Outcomes",
      outcomes: [
        "Design and maintain a SHEQ management system",
        "Audit a site or a contractor and write findings that hold",
        "Lead a root-cause investigation after a serious incident",
        "Manage contractor safety from tender to close-out",
        "Instruct others: deliver Level 1 and 2 material to standard",
      ],
      credentialEyebrow: "The document",
      credential: "Advanced Safety Management Certificate",
      credentialNote:
        "An internal credential. It is written to serve as CPD recognition once the institute aligns with the relevant professional bodies; that alignment will be announced on the register.",
      feeEyebrow: "Fee",
      fee: "Published 15 November 2026, in Namibia dollars. Modules can be taken separately and priced singly.",
      datesEyebrow: "Dates",
      dates:
        "Cohort 1 is planned for January 2027. Intake dates publish on this page and in the register on 15 November 2026.",
      applyCta: "Register interest",
    },
    zh: {
      navName: "三级 · 管理",
      metaTitle: "高级安全管理课程（十天），温得和克 · Oryx 理工学院 · Oryx Institute",
      metaDescription:
        "十日制模块化高级安全管理课程，在温得和克开课：SHEQ 管理体系、建筑与矿山条例深读、承包商管控、职业卫生监测、根因分析与审计技术，另有培训师培训模块。由注册安全专家授课，每个模块单独考核，模块可单修单计价，全修拿证书。现在向 Oryx 登记意向，报名一开放即锁定席位。",
      h1: "高级安全管理。",
      lede: "十天，模块化：安全员之上的体系层。SHEQ 管理、条例深读、承包商管控、根因调查与审计。模块可以单修；证书要全修。",
      audience: {
        label: "谁来上这一级",
        body: "高级安全员、SHE 经理与合规经理：签字放行的是体系，而不只是一个班次的人。",
      },
      outlineEyebrow: "课程模块",
      modules: [
        {
          no: "01",
          name: "SHEQ 管理体系",
          line: "安全、健康、环境与质量作为一个体系：把 SANS 与 ISO 45001 家族读成一本在用的手册，不是架子上的活页夹。",
        },
        {
          no: "02",
          name: "建筑条例深读",
          line: "SANS 10400 与适用的建筑条例：许可、报批，以及浇筑之前就该存在的文书。",
        },
        {
          no: "03",
          name: "矿山安全条例",
          line: "面向矿山客户：额外的义务、额外的文书，以及红线在哪里。",
        },
        {
          no: "04",
          name: "职业卫生与环境监测",
          line: "噪声、粉尘、通风与暴露：测什么、多久测一次、测出来的数字要求你做什么。",
        },
        {
          no: "05",
          name: "承包商管理",
          line: "挑选、入场培训、监督与结项，让承包商的安全档案和你自己的一样好。",
        },
        {
          no: "06",
          name: "事故调查",
          line: "根因分析，ICAM 与 TapRooT 基础：在体系里找失效，而不是找人顶罪。",
        },
        {
          no: "07",
          name: "培训师培训",
          line: "为一级、二级输送讲师：授课技法、考核设计，以及如何压住一间教室。",
        },
        {
          no: "08",
          name: "审计与检查技术",
          line: "建立并运转一套审计程序：检查表、证据、发现项，以及让下一轮审计变短的跟进。",
        },
      ],
      assessmentEyebrow: "考核",
      assessment: [
        "每个模块结束各有一场笔试。及格线：80 分。",
        "针对真实现场产出一份实操审计报告。",
        "一份体系管理作业，按事先公开的评分表批阅。",
        "每场考核后五个工作日内出结果。",
      ],
      outcomesEyebrow: "学完能做什么",
      outcomes: [
        "设计并维护 SHEQ 管理体系",
        "审计一个现场或一家承包商，写出站得住的发现项",
        "在严重事故后主导根因调查",
        "从招标到结项管理承包商安全",
        "执教他人：按标准讲授一级与二级课程",
      ],
      credentialEyebrow: "文书",
      credential: "高级安全管理证书",
      credentialNote:
        "内部证书。待学院与相关职业团体建立互认后，可作为 CPD 进修证明；互认进展将在登记册上公布。",
      feeEyebrow: "费用",
      fee: "2026 年 11 月 15 日公布，以纳元计。模块可单修、单计价。",
      datesEyebrow: "日期",
      dates:
        "首期班计划于 2027 年 1 月开课。开班日期将于 2026 年 11 月 15 日公布在本页与登记册。",
      applyCta: "登记意向",
    },
  },
];

export function getSafetyLevel(slug: string): SafetyLevel | undefined {
  return safetyLevels.find((l) => l.slug === slug);
}

/* ------------------------------------------------------------------ */
/* The landing page copy                                               */
/* ------------------------------------------------------------------ */

export const safetyLanding = {
  en: {
    metaTitle: "Safety officer training, Windhoek · Oryx Institute",
    metaDescription:
      "One, five, and ten-day occupational training in Windhoek for Namibian sites: worker induction, safety officer certification, and SHEQ management. Enrol now.",
    ogTitle: "Safety officer training, Windhoek | Oryx Institute",
    h1: "Safety officer training for Namibian sites.",
    lede: "A Namibian occupational programme, taught in Windhoek by a registered professional and examined on paper and on site: one day of worker induction, five days to a safety officer, ten days to advanced safety management.",
    statusLine:
      "Curriculum and pricing publish on 15 November 2026. Register your interest now and the office contacts you the day enrolments open.",
    levelsEyebrow: "Three levels",
    levelsTitle: "Induction, officer, management.",
    howEyebrow: "How we teach",
    howBody: [
      "Examinations are written on paper, not clicked through online. Practical assessments run against a rubric the learner sees in advance, and results arrive within five working days. Every learner receives the printed course manual, a clipboard and a pen on day one; Level 2 upwards adds the green hard hat.",
      "Courses run at a hired training venue in Windhoek, disclosed as a hired venue. The practical walkthroughs happen at a real partner site. The lead instructor is a Namibian professional with recognised credentials, hired and named before Cohort 1 opens.",
    ],
    instructorEyebrow: "The instructor",
    instructorName: "The lead instructor.",
    instructorRole: "LEAD INSTRUCTOR · SAFETY PROGRAMME",
    instructorBody:
      "Appointed once curriculum sign-off is complete. Credentials and biography publish alongside the course outline on 15 November 2026. Oryx does not teach the subject without a credentialed lead instructor.",
    knowEyebrow: "What you need to know",
    knowNta:
      "This programme is industry-orientated professional development. The Practice engine currently offers fee-for-service business counselling, market research, and corporate Rapid Response Training under commercial services agreements. Formal vocational training programmes, including the National Occupational Standards in Business Administration, will commence only after NTA provider registration has been granted. NQA accreditation for registered qualifications is being pursued in parallel and will be announced on the public register.",
    knowCertificate:
      "Certificates issued before accreditation are internal records of completion: the Certificate of Attendance for short courses, the Certificate of Completion for the officer levels. They are not NQF-credit-bearing qualifications and cannot be submitted to NQA as accredited prior learning. First Aid Level 1, where required, is certified by a registered Namibian first-aid training partner, not by Oryx.",
    applyCta: "Register interest",
    seeCurriculum: "See the curriculum",
    outlineLabel: "Outline",
    durationLabel: "Duration",
  },
  zh: {
    metaTitle: "安全员培训课程，温得和克 · Oryx 理工学院 · Oryx Institute",
    metaDescription:
      "面向纳米比亚现场的职业安全培训，在温得和克开课：一天的安全准入培训、五天的安全员认证课程、十天的高级安全管理（SHEQ）。由注册安全专家授课，纸面笔试加现场实操考核，教材、写字板与文具第一天发放。课程大纲已发布，现在登记意向，报名一开放，办公室当天与你联系，锁定首期班的席位。",
    ogTitle: "安全员培训，温得和克 | Oryx 理工学院",
    h1: "为纳米比亚现场而来的安全员培训。",
    lede: "一套纳米比亚职业安全课程，在温得和克由注册安全专家授课，纸面笔试加现场考核：一天完成员工准入，五天成为安全员，十天进阶高级安全管理。",
    statusLine:
      "课程大纲与定价将于 2026 年 11 月 15 日公布。现在登记意向，报名一开放，办公室当天就与你联系。",
    levelsEyebrow: "三个级别",
    levelsTitle: "准入、安全员、管理。",
    howEyebrow: "我们怎么教",
    howBody: [
      "考试写在纸上，不是在网上点选。实操考核对照学员事先见过的评分表进行，结果五个工作日内送达。每位学员第一天领取印刷的课程手册、一块写字板和一支笔；二级及以上加发绿色安全帽。",
      "课程在温得和克租用的培训场地进行，并如实说明是租用场地。实操巡查在真实的伙伴工地完成。主任讲师是持有公认资质的纳米比亚安全专家，将在首期班开课之前完成聘用并公布姓名。",
    ],
    instructorEyebrow: "讲师",
    instructorName: "安全课程主任讲师",
    instructorRole: "主任讲师 · 安全课程",
    instructorBody:
      "课程大纲定稿后完成聘用。资历与简介将于 2026 年 11 月 15 日随课程大纲一并公布。没有持证的主任讲师，Oryx 不教安全。",
    knowEyebrow: "你需要知道的事",
    knowNta:
      "本课程属于面向行业的专业进修。实务引擎目前以商业服务协议提供收费的企业咨询、市场调研与公司快速响应培训。正式的职业教育课程，包括工商管理国家职业标准，将在获得 NTA 培训机构注册之后才会开始。注册资格的 NQA 认证正在同步申请中，结果将在公开登记册上公布。",
    knowCertificate:
      "认证取得之前签发的证书均为内部结业记录：短期课程为结业证书，安全员级别为结业证书（安全员）。它们不是 NQF 学分资格，不能作为认证的先前学习提交给 NQA。如有需要，一级急救由注册的纳米比亚急救培训伙伴认证，而非 Oryx。",
    applyCta: "登记意向",
    seeCurriculum: "看课程大纲",
    outlineLabel: "大纲",
    durationLabel: "时长",
  },
} as const;

/* The homepage announcement pin, ANNOUNCEMENT.md verbatim structure. */
export const safetyAnnouncement = {
  en: {
    eyebrow: "Announcement · 01 Nov 2026",
    title: "Safety officer training, starting soon.",
    body: "Oryx Institute is opening enrolments for a Namibian occupational safety programme: one-day worker induction, five-day safety officer certification, and a ten-day advanced safety management course. Taught by a registered safety professional, examined on paper and on site. Cohort 1 intake dates and fees are published on the Practice page.",
    seeCurriculum: "See the curriculum",
    registerInterest: "Register interest",
    pill: "New · Safety officer training",
    helmetAlt:
      "A matte forest-green hard hat seen from underneath, the X-strap suspension centred on cream",
    hornAlt:
      "A brass horn resting on cream paper, photographed as a quiet announcement object",
  },
  zh: {
    eyebrow: "公告 · 2026 年 11 月 1 日",
    title: "安全员培训，即将开课。",
    body: "Oryx Institute 即将开放纳米比亚职业安全课程的报名：一日制的员工安全准入培训、五日制的安全员认证，以及十日制的高级安全管理课程。由注册安全专家授课，纸面笔试加现场实操考核。首期班的日期与费用将在实务页面公布。",
    seeCurriculum: "看课程大纲",
    registerInterest: "登记意向",
    pill: "新 · 安全员培训",
    helmetAlt: "一顶哑光森林绿安全帽的仰视图，X 形帽带悬吊系统居中于米色纸上",
    hornAlt: "一只铜制号角静置于米色纸上，作为一件安静的公告之物拍摄",
  },
} as const;
