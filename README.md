# 梁天乐 — 2027 届求职作品集

一个面向 PC 展示的求职型个人作品集。整体保持深色、克制、带一点视觉张力的方向，但内容主线已经从“视觉设计师作品集”调整为“2027 届财务管理毕业生的求职主页”，重点呈现：

- 求职方向：采购与供应链管理、项目开发选址
- 教育背景、项目统筹、审计实习、创业项目
- 语言、证书与可迁移能力
- 视频、摄影、海报与本人绘制插画
- 奖项、证书与项目立项证明

版心最大 1700px，开发环境为 React 19 + Vite 7。

## 本地运行

```bash
pnpm install
pnpm dev
```

打开 `http://127.0.0.1:5173`。

生产构建：

```bash
pnpm build
pnpm preview
```

## 当前内容

- **Hero**：姓名、2027 届财务管理身份、求职方向、求职状态、Silk WebGL 织物背景与联系入口
- **关于**：
  - 主视觉使用梁天乐本人绘制的插画
  - 左侧使用彩色证件照，不再做黑白处理
  - 个人介绍、求职方向、邮箱、教育背景、三段经历
  - 文案围绕协作、执行、自学与持续进步，不再强行把财务和影像 / 设计联系起来
- **项目经历**：3 个大型卡片，中间夹一排 4 个项目数据卡
  - 《创业之路》国家级慕课课程制作
  - 课程制作团队 10 人 / 17 期视频课程 / 170+ 分钟成片 / 6500+ 平台学习者
  - 鹏盛会计师事务所审计实习
  - 《创赛无边界》大学生创新创业项目
- **影像与视觉**：
  - 4 个视频：个人 AE 动画、个人 AE 作品展示、茶文化快剪、红色主题宣传片（等宽 2×2）
  - 原“课程工作总结”视频移入 01 项目《创业之路》，封面使用视频第 35 帧，点击封面直接播放
  - 摄影按原始文件夹拆成 6 个系列：蓝色系 8 张、绿色系 6 张、人像 9 张、风光 18 张、花鸟 10 张、人文 14 张，共 65 张
  - 首页每个摄影系列**随机展示一张封面**，点击分类打开全系列画廊，再点击单张进入大图
  - 4 张精选海报
- **能力矩阵**：项目统筹、财务与数据、影像与设计、语言与沟通、证书与学习
- **荣誉与证明**：3 张大卡片（三下乡一等奖、英语课本剧优胜奖、校级大创项目立项）和证书清单
  - 为保护个人信息，证明材料只展示可公开部分
  - 英语课本剧证书原文为“优胜奖”，已按证书更正
- **整屏联系页**：公开邮箱、求职状态、完整简历索取入口、实时深圳时间
- 交互：导航高亮、滚动进度、项目弹窗、摄影分类弹窗、图片 / 视频灯箱、SpecularButton 镜面按钮、自定义光标、移动端菜单、`prefers-reduced-motion`
- SpecularButton 已覆盖导航联系按钮、Hero 的两个入口、项目弹窗的邮件 / 下一项目、联系页的复制邮箱 / 简历索取 / 回到顶部

## 动效

- **Opening**：导航、Silk 背景、姓名、两行主标题、求职方向、介绍、右侧入口和页脚按顺序进入；主标题使用 `clip` 遮罩、纵向位移和轻微压缩后归位，节奏约 2.5 秒，`expo.out` 缓动。
- **ScrollTrigger**：每个模块的大标题先用遮罩 / 位移 / 压缩进场，随后卡片按 `stagger` 出现；图片容器使用 `clip-path` reveal，不做廉价弹跳。
- **数据卡**：从 01 移到 02，位于《创业之路》项目卡和下方两个项目卡之间，随项目组按顺序进入。
- **性能**：滚动动画只在首次进入时播放，绝大多数字段使用 transform / opacity / clip-path；只有 Hero 的 Silk 有轻微 scrub 视差，并在 `prefers-reduced-motion` 下完全跳过动画。

## 性能

本地 production preview、1440×900、空缓存的实测基线：

- FCP 约 **0.36s**，LCP 约 **1.06s**，CLS **0**
- 首屏传输约 **828KB**（JS 143KB gzip、CSS 18KB、字体 229KB、首屏图片 299KB）
- 首屏只初始化 **3 个 SpecularButton WebGL 上下文**，其余按钮进入视口附近后才初始化
- Silk 的 DPR 上限由 1.5 降到 1.25，1440 下画布像素约减少 30%
- 65 张摄影作品保留 1600px 原图用于灯箱，分类封面和分类画廊使用 760px 缩略图
- 视频压缩后总计约 **29.4MB**，其中两个较长的视频由 17.5MB / 15.3MB 降到 11.4MB / 10.4MB；视频卡 `preload="none"`，只有点击播放才加载
- ScrollTrigger 全部 `once`，图片 reveal 使用 clip-path，滚动动画只播放一次；只有 Hero Silk 保留轻微 scrub 视差
- TTFB 与真实部署环境有关，以上数字用于横向检查和回归

## 素材说明

素材已经接入站点：

```text
public/media/
  portrait.jpg                      彩色证件照（左侧小图）
  self-portrait.jpg                 本人绘制插画（关于模块主图）
  projects/                         项目 01 视频、审计照片、创赛路演与立项记录
  archive/videos/                   4 个压缩后的网页版视频
  archive/video-posters/            视频封面
  archive/photos/<分类>/             65 张分类摄影作品
  archive/posters/                  4 张精选海报
  achievements/                     3 张隐私处理后的证明 / 证书图片
```

本轮素材处理：

- 4 个视频统一压缩为 720p，在影像区以等宽 2×2 排列；项目 01 的视频封面直接放在项目卡上，点击卡片就地播放。
- 项目 02 使用审计实习工作照作为背景，项目 03 使用路演现场作为背景，并将入驻名单做成隐私裁剪后的项目记录。
- 摄影保留原始分类，未选成封面时也不会丢失；分类弹窗中展示该分类的全部作品。
- 海报从 10 张中精选 4 张，其余保留在原始素材包中。
- 项目立项公示清单包含其他学生的姓名和学号，因此没有直接公开原图，只保留项目名称 / 类型单元格，并重新排版为证明摘要。
- 英语证书按你的要求完整展示；证书上包含其他同学姓名，发布前请确认是否接受。
- 联系页仅公开邮箱；手机号与微信没有放入网站。

> 如果人像摄影中包含他人肖像，正式对外发布前请确认已获得被拍摄者同意。

## 内容维护

主要内容集中在：

```text
src/data/site.js       个人信息、视频、海报、能力、证书、成就
src/data/photos.js     六个摄影分类与 65 张图片路径
```

- `site`：姓名、英文名、标识字母、求职方向、城市、邮箱、主视觉插画、证件照、教育信息、介绍
- `stats`：项目 02 中、01 和 02 / 03 项目卡之间的四个数据
- `experience`：三段经历
- `projects`：三个项目卡与弹窗内容
- `archive`：视频 / 海报；摄影分类在 `photos.js`
- `capabilities`：五张能力卡片
- `credentials`：证书与荣誉
- `achievements`：证明卡片与图片

### 完整简历 PDF

素材包中没有简历 PDF，所以网站目前使用“完整简历可邮件索取”，没有放置可能失效的下载链接。拿到 PDF 后可以放到 `public/media/`，并把 `Contact.jsx` 的 `contact-resume-link` 改成下载链接。

## 目录结构

```text
src/
  components/
    Nav.jsx             导航与移动端菜单
    Hero.jsx            求职者首屏
    Silk.jsx / Silk.css Hero WebGL 织物背景
    SpecularButton.jsx / SpecularButton.css  镜面光照按钮
    SpecularAction.jsx  站点统一的按钮参数封装
    About.jsx           个人档案 / 教育 / 经历 / 数据
    Work.jsx            项目经历卡片
    ProjectCover.jsx    项目卡片的图形封面
    ProjectModal.jsx    项目详情弹窗
    Archive.jsx         影像 / 摄影分类 / 海报 + 灯箱
    Expertise.jsx       能力卡片
    Achievements.jsx    荣誉与证明
    Contact.jsx         整屏联系页
    Cursor.jsx          项目卡片跟随光标
  data/
    site.js             全站内容、视频、海报、能力、证书、成就
    photos.js           摄影分类与全部作品路径
  hooks/usePortfolioMotion.js  GSAP opening / ScrollTrigger 动效
  hooks/useReveal.js    时钟
  styles.css            全站样式、响应式、动效
public/
  fonts/                本地字体
  media/                个人照片、项目与作品素材
scripts/
  make-cjk-fonts.mjs    中文字体子集生成脚本
  process_photo_categories.py / process_achievements.py  素材整理与隐私处理
  make_photo_thumbs.py       摄影分类缩略图生成
```

## 技术栈

React 19 + Vite 7 + GSAP / ScrollTrigger，无 UI 组件库。首屏背景为 WebGL2 的 Silk 织物 shader；主要 CTA 使用 WebGL2 的 SpecularButton 镜面光照；模块进场由 GSAP 驱动，摄影分类与媒体灯箱使用 React portal。

## 素材版权

- 字体：Inter Tight、Instrument Serif、Noto Sans SC、Noto Serif SC（SIL Open Font License），已本地化。
- 个人照片、本人绘制插画、视频、摄影、海报、证书与证明素材由梁天乐提供。
- Hero Silk 与 SpecularButton 均基于 React Bits 的开源实现，并按本项目的 StrictMode 生命周期做了兼容调整。
