import { PlusMark } from './Icons';
import { SectionHeader } from './SectionHeader';
import { capabilities } from '../data/site';

function CapabilityVisual({ type }) {
  if (type === 'rings') {
    return (
      <div className="cap-visual visual-rings" aria-hidden="true">
        <svg viewBox="0 0 260 260" fill="none">
          <circle cx="130" cy="130" r="104" stroke="currentColor" strokeOpacity=".18" />
          <circle cx="130" cy="130" r="80" stroke="currentColor" strokeOpacity=".32" strokeDasharray="2 5" />
          <ellipse cx="130" cy="130" rx="104" ry="38" stroke="currentColor" strokeOpacity=".42" transform="rotate(-24 130 130)" />
          <ellipse cx="130" cy="130" rx="104" ry="38" stroke="currentColor" strokeOpacity=".22" transform="rotate(34 130 130)" />
          <circle cx="130" cy="130" r="4" fill="currentColor" />
          <path d="M130 18v28M130 214v28M18 130h28M214 130h28" stroke="currentColor" strokeOpacity=".35" />
        </svg>
        <span className="visual-tag">ORGANIZE / 001</span>
      </div>
    );
  }

  if (type === 'orb') {
    return (
      <div className="cap-visual visual-orb" aria-hidden="true">
        <span className="orb-core" />
        <span className="orb-ring orb-ring-a" />
        <span className="orb-ring orb-ring-b" />
        <span className="visual-tag">LEARN / 005</span>
      </div>
    );
  }

  if (type === 'frame') {
    return (
      <div className="cap-visual visual-frame" aria-hidden="true">
        <span className="frame-corner frame-tl" />
        <span className="frame-corner frame-tr" />
        <span className="frame-corner frame-bl" />
        <span className="frame-corner frame-br" />
        <span className="frame-crosshair" />
        <span className="visual-tag">VISUAL / 003</span>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="cap-visual visual-grid" aria-hidden="true">
        <svg viewBox="0 0 220 150" fill="none">
          {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={16 + col * 21}
                cy={16 + row * 20}
                r={row === 2 && col > 2 && col < 8 ? 2.4 : 1.1}
                fill="currentColor"
                fillOpacity={row === 2 && col > 2 && col < 8 ? 0.9 : 0.28}
              />
            ))
          )}
          <path d="M58 40h63v40H58z" stroke="currentColor" strokeOpacity=".55" strokeDasharray="2 3" />
        </svg>
        <span className="visual-tag">FINANCE / 002</span>
      </div>
    );
  }

  return (
    <div className="cap-visual visual-signal" aria-hidden="true">
      <svg viewBox="0 0 220 110" fill="none">
        <path d="M0 55h38l8-24 12 48 11-42 9 30 12-12h12l9-28 12 52 10-34 8 10h69" stroke="currentColor" strokeOpacity=".6" />
        <path d="M0 55h220" stroke="currentColor" strokeOpacity=".13" strokeDasharray="2 4" />
        <circle cx="168" cy="55" r="3" fill="currentColor" />
      </svg>
      <span className="visual-tag">LANGUAGE / 004</span>
    </div>
  );
}

function CapabilityCard({ item }) {
  const onPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <article
      className={`cap-card cap-${item.size}`}
      data-reveal
      onPointerMove={onPointerMove}
    >
      <div className="cap-spotlight" aria-hidden="true" />
      <div className="cap-top">
        <span className="cap-index">{item.index}</span>
        <span className="cap-en">{item.en}</span>
      </div>

      <CapabilityVisual type={item.visual} />

      <div className="cap-body">
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        <ul className="cap-tags">
          {item.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>

      <span className="cap-plus" aria-hidden="true">
        <PlusMark />
      </span>
    </article>
  );
}

export function Expertise() {
  return (
    <section className="expertise section" id="expertise" aria-labelledby="expertise-title">
      <div className="shell">
        <SectionHeader
          index="04"
          label="CAPABILITIES / 个人优势"
          aside="Coordination / Finance / Visual / Language"
          title={
            <span className="work-title-line expertise-title-line">
              <span>Capabilities</span>
              <em>能力矩阵</em>
            </span>
          }
          id="expertise-title"
        />

        <div className="expertise-intro" data-reveal>
          <p>
            专业训练让我重视数据与流程，
            <br />
            项目经历让我习惯把事推进到底。
          </p>
          <p className="expertise-intro-note">
            从课程制作到审计实习，再到创业项目，我积累的是可迁移的统筹、沟通与执行能力；课外也持续自学影像与设计，让表达多一种可能。
          </p>
        </div>

        <div className="cap-grid">
          {capabilities.map((item) => (
            <CapabilityCard key={item.index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
