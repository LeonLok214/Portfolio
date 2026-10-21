/**
 * 梁天乐 / TIANLE LIANG
 * 2027 届财务管理本科毕业生 · 求职作品集
 *
 * 修改说明：
 * - 个人信息、求职方向与介绍集中在 `site`
 * - 经历、教育、证书与项目分别在对应数组中
 * - 项目视频与项目照片在 `projects` 中；影像 / 海报在 `archive` 中
 * - 摄影分类与全部作品路径在 `photos.js` 中
 */

export const site = {
  name: '梁天乐',
  latin: 'TIANLE LIANG',
  monogram: 'RL',
  role: 'Management Graduate / Lifelong Learner',
  roleCn: '2027 届财务管理本科毕业生',
  target: '采购与供应链管理 / 项目开发选址',
  targetShort: '采购与供应链 · 项目开发选址',
  location: '深圳 / 广州',
  coordinates: '22.5431° N / 114.0579° E',
  portrait: '/media/self-portrait.jpg',
  idPhoto: '/media/portrait.jpg',
  email: '1482704023@qq.com',
  availability: '2027 届 · 随时可入职',
  heroStatus: '2027 届 · 财务管理 · 随时可入职',
  availabilityShort: '随时可入职',
  languages: '普通话 · 粤语 · 英语 CET-6',
  intro:
    '2027 届财务管理本科生，目标采购与供应链管理、项目开发选址。重视协作、执行与持续学习，习惯先把问题拆清楚，再把细节做到位。',
  bio:
    '曾管理约 10 人的课程制作团队，参与 17 期视频课程从策划到上线；也在会计师事务所做过审计实习，处理函证、核对与归档。这些经历让我养成了拆解问题、协调资源和按时交付的习惯。课外我持续自学视频、摄影与设计工具，把兴趣变成另一种表达能力。',
  heroSummary:
    '把复杂任务拆解成清晰步骤，推动团队把事情做完；保持自学，也保持进步。',
  manifesto: '进步，是一生的事。',
  resumeNote: '完整简历可邮件索取',
  education: {
    period: '2023.09 — 2027.06',
    school: '广东技术师范大学',
    college: '财经学院',
    major: '财务管理',
    degree: '管理学学士',
  },
};

export const stats = [
  { value: '10', suffix: '人', label: '课程制作团队', en: 'Team size' },
  { value: '17', suffix: '期', label: '课程视频产出', en: 'Episodes' },
  { value: '170', suffix: '+', label: '分钟视频成片', en: 'Minutes' },
  { value: '6500', suffix: '+', label: '平台学习者', en: 'Learners' },
];

export const experience = [
  {
    period: '2024.09 — 2026.09',
    role: '课程制作团队负责人',
    company: '广东技术师范大学',
    note: '10 人团队 · 17 期课程 · 6500+ 学习者',
  },
  {
    period: '2026.03 — 2026.05',
    role: '审计实习生',
    company: '鹏盛会计师事务所',
    note: '函证核对 · 证据归档 · 细节把控',
  },
  {
    period: '2025.03 — 2026.09',
    role: '项目负责人 / 众创空间入孵',
    company: '广东技术师范大学',
    note: '2 次入孵 · 2 项校级大创',
  },
];

export const projects = [
  {
    id: 'course',
    index: '01',
    title: '创业之路',
    cn: '国家级慕课课程制作',
    category: 'Project Management / Video',
    year: '2024 — 2026',
    visual: 'course',
    accent: '#c8f36c',
    video: {
      src: '/media/projects/course-summary.mp4',
      poster: '/media/projects/course-frame-35.jpg',
      title: '《创业之路》课程工作总结',
      duration: '00:38',
      caption: '课程制作团队工作总结 / 第 35 帧封面',
    },
    summary:
      '作为课程制作团队负责人，统筹约 10 人团队，参与《创业之路》国家级一流本科课程的内容生产与视频制作。从案例筛选、逐字稿到 AI 与媒体工具辅助的动画成片，推动 17 期课程上线中国大学 MOOC。',
    role: '团队负责人 / 内容统筹',
    highlights: [
      '管理约 10 人团队，协调策划、脚本、制作与交付',
      '主导 17 期课程视频，累计视频时长 170+ 分钟',
      '课程上线中国大学 MOOC，服务 6500+ 平台学习者',
      '随团队赴外校开展创新创业培训，协助教学对接与交流',
    ],
    deliverables: ['课程策划', '案例筛选', '逐字稿', 'AI 辅助制作', '视频成片'],
  },
  {
    id: 'audit',
    index: '02',
    title: '审计实习',
    cn: '鹏盛会计师事务所',
    category: 'Finance / Audit',
    year: '2026.03 — 05',
    visual: 'audit',
    accent: '#d8c6a4',
    image: '/media/projects/audit-work.jpg',
    imageAlt: '梁天乐在鹏盛会计师事务所审计实习工作现场',
    summary:
      '在鹏盛会计师事务所完成审计实习，独立完成审计函证的收发、核对、整理与归档，确保函证信息准确、审计证据完整。',
    role: '审计实习生',
    highlights: [
      '独立完成审计函证收发与信息核对',
      '整理归档审计资料，保证证据链完整有效',
      '在细节与时效要求下推进日常工作',
    ],
    deliverables: ['函证处理', '信息核对', '底稿归档'],
  },
  {
    id: 'venture',
    index: '03',
    title: '创赛无边界',
    cn: '大学生创新创业项目',
    category: 'Research / Entrepreneurship',
    year: '2025 — 2026',
    visual: 'venture',
    accent: '#9eb6ff',
    image: '/media/projects/venture-stage.jpg',
    imageAlt: '梁天乐在创赛无边界项目路演现场',
    record: {
      src: '/media/projects/venture-record.jpg',
      alt: '创赛无边界入驻团队名单公示，仅展示本人所在团队信息',
      label: 'INCUBATION / 2025',
      caption: '入驻团队名单公示 / 白云校区',
      note: '名单节选，仅展示本人所在团队；其他团队信息已隐藏。',
    },
    summary:
      '作为《创赛无边界》团队负责人，推动项目两度入孵学校众创空间；围绕大学生创业学习与一人公司主题，完成两项校级大创项目立项。',
    role: '项目负责人',
    highlights: [
      '两度入孵学校众创空间',
      '两项校级大学生创新创业训练项目立项',
      '参与项目研究、申报与团队协作',
    ],
    deliverables: ['项目申报', '研究整理', '团队协作'],
  },
];

export const archive = {
  videos: [
    {
      index: '01',
      meta: 'MOTION / 01',
      title: '个人 AE 动画作品',
      duration: '00:08',
      src: '/media/archive/videos/video-03-ae-animation.mp4',
      poster: '/media/archive/video-posters/video-03.jpg',
    },
    {
      index: '02',
      meta: 'MOTION / 02',
      title: '个人 AE 作品展示',
      duration: '01:18',
      src: '/media/archive/videos/video-04-ae-works.mp4',
      poster: '/media/archive/video-posters/video-04.jpg',
    },
    {
      index: '03',
      meta: 'VIDEO / 03',
      title: '茶文化实拍快剪',
      duration: '00:14',
      src: '/media/archive/videos/video-02-tea.mp4',
      poster: '/media/archive/video-posters/video-02.jpg',
    },
    {
      index: '04',
      meta: 'VIDEO / 04',
      title: '红色主题实拍宣传片',
      duration: '00:58',
      src: '/media/archive/videos/video-05-red-film.mp4',
      poster: '/media/archive/video-posters/video-05.jpg',
    },
  ],
  posters: [
    {
      index: '01',
      meta: 'POSTER / 01',
      title: '尊老主题创新创业实践海报',
      src: '/media/archive/posters/poster-01.jpg',
    },
    {
      index: '02',
      meta: 'POSTER / 02',
      title: '母亲节海报',
      src: '/media/archive/posters/poster-02.jpg',
    },
    {
      index: '03',
      meta: 'POSTER / 03',
      title: '劳动节海报',
      src: '/media/archive/posters/poster-03.jpg',
    },
    {
      index: '04',
      meta: 'POSTER / 04',
      title: '青年节海报',
      src: '/media/archive/posters/poster-04.jpg',
    },
  ],
};

export const capabilities = [
  {
    index: '01',
    title: '项目统筹',
    en: 'Project Coordination',
    desc: '从目标拆解、进度推进到交付复盘，习惯把复杂任务整理成清晰的行动路径。',
    tags: ['10 人团队', '课程制作', '跨校协作'],
    visual: 'rings',
    size: 'wide',
  },
  {
    index: '02',
    title: '财务与数据',
    en: 'Finance & Data',
    desc: '具备财务管理专业基础，熟悉用友 U8 与 MS Office，能处理数据核对、函证与归档等细致工作。',
    tags: ['用友 U8', 'Excel', '审计函证'],
    visual: 'grid',
    size: 'narrow',
  },
  {
    index: '03',
    title: '影像与设计',
    en: 'Visual Storytelling',
    desc: '使用 PR、PS、LR、AE、达芬奇与万彩动画，完成视频剪辑、动效、摄影与海报设计。',
    tags: ['PR / AE', 'PS / LR', '摄影'],
    visual: 'frame',
    size: 'third',
  },
  {
    index: '04',
    title: '语言与沟通',
    en: 'Communication',
    desc: '普通话母语，粤语熟练，英语 CET-6；能在跨团队、跨学校的协作中清楚表达与推进。',
    tags: ['CET-6', '粤语', '普通话 2A'],
    visual: 'signal',
    size: 'third',
  },
  {
    index: '05',
    title: '证书与学习',
    en: 'Credentials',
    desc: '优秀学生奖学金、计算机一级、英语课本剧优胜奖等；具备 AI Vibe Coding 实操经验，保持对新工具的好奇。',
    tags: ['奖学金', '计算机一级', 'AI Vibe Coding'],
    visual: 'orb',
    size: 'third',
  },
];

export const credentials = [
  { year: '2025.10', title: '优秀学生奖学金', meta: '广东技术师范大学' },
  { year: '2024.12', title: 'CET-6', meta: '英语六级' },
  { year: '2024.09', title: '“三下乡”暑期社会实践 院级一等奖', meta: '广东技术师范大学' },
  { year: '—', title: '普通话二级甲等', meta: '语言能力' },
  { year: '—', title: '计算机一级', meta: '计算机基础' },
  { year: '2024', title: '英语课本剧大赛 优胜奖', meta: '英语表达' },
];

export const achievements = [
  {
    index: '01',
    type: 'AWARD',
    title: '“三下乡”暑期社会实践 院级一等奖',
    meta: '2024.09 · 广东技术师范大学财经学院',
    image: '/media/achievements/rural-award.jpg',
    alt: '“三下乡”暑期社会实践一等奖证书',
  },
  {
    index: '02',
    type: 'CERTIFICATE',
    title: '英语课本剧大赛 优胜奖',
    meta: '2024.12 · 广东技术师范大学',
    image: '/media/achievements/english-award.jpg',
    alt: '英语课本剧大赛荣誉证书完整版',
  },
  {
    index: '03',
    type: 'PROJECT',
    title: '校级大学生创新创业训练项目 立项',
    meta: '2025 · 项目成员 / 创新训练项目',
    image: '/media/achievements/project-approval.jpg',
    alt: '校级大学生创新创业训练项目立项信息摘要',
  },
];
