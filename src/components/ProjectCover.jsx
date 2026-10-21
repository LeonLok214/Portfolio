export function ProjectCover({ project, context = 'card' }) {
  if (project.image) {
    return (
      <img
        className={`project-cover-image project-cover-${project.visual}`}
        src={project.image}
        alt={project.imageAlt || `${project.title} 项目视觉`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  if (project.visual === 'course') {
    return (
      <div
        className={`project-canvas project-canvas-course ${context === 'modal' ? 'is-modal' : ''}`}
        aria-hidden="true"
      >
        <span className="canvas-grid" />
        <span className="canvas-label canvas-label-tl">COURSE PRODUCTION / 01</span>
        <span className="canvas-label canvas-label-tr">2024 — 2026</span>
        <span className="canvas-play">
          <i />
        </span>
        <span className="canvas-play-label">VIDEO / COURSE</span>
        <span className="canvas-word">COURSE</span>
        <div className="course-metrics">
          <span>
            <b>10</b>
            <small>人团队</small>
          </span>
          <span>
            <b>17</b>
            <small>期课程</small>
          </span>
          <span>
            <b>6500<em>+</em></b>
            <small>学习者</small>
          </span>
        </div>
        <span className="canvas-cross canvas-cross-a">+</span>
        <span className="canvas-cross canvas-cross-b">+</span>
      </div>
    );
  }

  if (project.visual === 'audit') {
    return (
      <div
        className={`project-canvas project-canvas-audit ${context === 'modal' ? 'is-modal' : ''}`}
        aria-hidden="true"
      >
        <span className="canvas-grid" />
        <span className="canvas-label canvas-label-tl">FINANCE / AUDIT</span>
        <span className="canvas-label canvas-label-tr">2026.03 — 05</span>
        <div className="audit-sheet">
          <span className="audit-sheet-head">AUDIT WORKPAPER / 2026</span>
          <span className="audit-sheet-mark">A</span>
          <div className="audit-lines">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="audit-sheet-foot">CONFIRMATION · CHECK · ARCHIVE</span>
          <span className="audit-stamp">VERIFIED</span>
        </div>
        <span className="audit-word">DETAIL</span>
        <span className="canvas-cross canvas-cross-a">+</span>
        <span className="canvas-cross canvas-cross-b">+</span>
      </div>
    );
  }

  return (
    <div
      className={`project-canvas project-canvas-venture ${context === 'modal' ? 'is-modal' : ''}`}
      aria-hidden="true"
    >
      <span className="canvas-grid" />
      <span className="canvas-label canvas-label-tl">RESEARCH / ENTREPRENEURSHIP</span>
      <span className="canvas-label canvas-label-tr">2025 — 2026</span>
      <svg className="venture-network" viewBox="0 0 760 460" fill="none">
        <path d="M80 330 220 170 380 260 520 120 690 220" stroke="currentColor" strokeOpacity=".22" />
        <path d="M80 160 220 170 300 360 520 120 610 330 690 220" stroke="currentColor" strokeOpacity=".12" />
        <path d="M220 170 300 360 380 260 610 330" stroke="currentColor" strokeOpacity=".18" strokeDasharray="3 7" />
        <circle cx="80" cy="330" r="4" />
        <circle cx="220" cy="170" r="5" />
        <circle cx="380" cy="260" r="3" />
        <circle cx="520" cy="120" r="6" />
        <circle cx="690" cy="220" r="4" />
        <circle cx="610" cy="330" r="3" />
      </svg>
      <span className="venture-number">02</span>
      <span className="venture-caption">IDEAS → IMPACT</span>
      <span className="venture-tags">2 次入孵 · 2 项大创</span>
      <span className="canvas-cross canvas-cross-a">+</span>
      <span className="canvas-cross canvas-cross-b">+</span>
    </div>
  );
}
