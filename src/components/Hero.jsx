import { ArrowDown, ArrowUpRight } from './Icons';
import { site } from '../data/site';
import Silk from './Silk';
import { SpecularAction } from './SpecularAction';

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <Silk
          className="hero-silk"
          color="#1b2140"
          sheenColor="#b9b1ff"
          speed={2.6}
          scale={1.16}
          rotation={-0.42}
          sheen={0.34}
          depth={0.74}
          glow={0.17}
          noiseIntensity={1.05}
          ripple={0.56}
          wave={0.7}
          mouseInteraction
          clickRipple
          intro
          fade={0.12}
          dpr={1.25}
        />
        <div className="hero-grade" />
        <div className="hero-grid-lines" />
        <div className="hero-vignette" />
      </div>

      <div className="shell hero-shell">
        <div className="hero-rail" aria-hidden="true">
          <span>PORTFOLIO / 2027</span>
          <i />
          <span>22.5431° N — 114.0579° E</span>
        </div>

        <div className="hero-main">
          <div className="hero-identity">
            <span className="hero-name">{site.name}</span>
            <span className="hero-latin">{site.latin}</span>
            <span className="hero-status">
              <i aria-hidden="true" />
              {site.heroStatus}
            </span>
          </div>

          <h1 id="hero-title" className="hero-title">
            <span className="hero-line">
              <span>把复杂的事，</span>
            </span>
            <span className="hero-line">
              <span>
                做得清楚<span className="hero-period" aria-hidden="true" />
              </span>
            </span>
          </h1>

          <div className="hero-roles" aria-label="求职方向">
            <span className="hero-roles-label">求职方向</span>
            <span>采购与供应链管理</span>
            <span>项目开发选址</span>
          </div>

          <div className="hero-caption">
            <p className="hero-script">Clarity in every detail.</p>
            <p className="hero-summary">
              {site.heroSummary}
              <br />
              2027 届财务管理本科毕业生 · 深圳 / 广州
            </p>
          </div>
        </div>

        <div className="hero-side">
          <div className="hero-side-meta">
            <span>2027 GRADUATE</span>
            <span>MANAGEMENT / LEARNING</span>
            <span>CET-6 · 普通话 2A</span>
          </div>
          <div className="hero-side-actions">
            <SpecularAction
              variant="hero"
              className="specular-hero-action"
              onClick={() => {
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>VIEW PROJECTS</span>
              <ArrowUpRight size={15} />
            </SpecularAction>
            <SpecularAction
              variant="hero"
              className="specular-hero-action"
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>CONTACT ME</span>
              <ArrowUpRight size={15} />
            </SpecularAction>
          </div>
        </div>

        <div className="hero-footer">
          <div className="hero-footer-cell hero-footer-intro">
            <span className="micro-label">PROFILE</span>
            <p>
              梁天乐，2027 届财务管理本科生。重视协作、执行与持续学习，习惯把复杂任务拆解成清晰步骤并推进落地。
            </p>
          </div>
          <div className="hero-footer-cell">
            <span className="micro-label">TARGET</span>
            <ul>
              <li>采购与供应链管理</li>
              <li>项目开发选址</li>
              <li>{site.availabilityShort}</li>
            </ul>
          </div>
          <div className="hero-footer-cell">
            <span className="micro-label">BASED IN</span>
            <p>
              {site.location}
              <br />
              <span className="muted">Open to relocation</span>
            </p>
          </div>
          <a className="hero-scroll" href="#about">
            <span className="hero-scroll-ring" aria-hidden="true">
              <ArrowDown size={16} />
            </span>
            <span>SCROLL TO EXPLORE</span>
          </a>
        </div>
      </div>
    </section>
  );
}
