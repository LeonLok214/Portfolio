import { ArrowUpRight, PlusMark } from './Icons';
import { SectionHeader } from './SectionHeader';
import { experience, site } from '../data/site';

export function About() {
  return (
    <section className="profile section" id="about" aria-labelledby="about-title">
      <div className="shell">
        <SectionHeader
          index="01"
          label="PROFILE / 关于我"
          aside="2027 graduate — management / continuous learning"
        />

        <div className="profile-grid">
          <figure className="portrait-block" data-reveal>
            <div className={`portrait-frame ${site.portrait ? 'portrait-illustration' : 'portrait-placeholder'}`}>
              {site.portrait ? (
                <>
                  <img
                    src={site.portrait}
                    alt={`${site.name} 本人绘制的个人插画`}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                  <div className="portrait-tone" aria-hidden="true" />
                  <div className="portrait-credit">
                    <span>SELF-PORTRAIT / 本人绘制</span>
                    <span>2026</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="portrait-placeholder-grid" aria-hidden="true" />
                  <div className="portrait-meta">
                    <span>PORTRAIT / 01</span>
                    <span>2027</span>
                  </div>
                  <span className="portrait-monogram" aria-hidden="true">
                    {site.monogram}
                  </span>
                  <span className="portrait-pending">PHOTO / 待上传</span>
                </>
              )}
              <div className="portrait-crosshair" aria-hidden="true">
                <PlusMark className="crosshair crosshair-tl" />
                <PlusMark className="crosshair crosshair-tr" />
                <PlusMark className="crosshair crosshair-bl" />
                <PlusMark className="crosshair crosshair-br" />
              </div>
              <div className="portrait-caption">
                <span>{site.latin}</span>
                <span>SHENZHEN / GUANGZHOU</span>
              </div>
              {site.idPhoto ? (
                <span className="portrait-id-photo">
                  <img
                    src={site.idPhoto}
                    alt={`${site.name} 证件照`}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                  <span>证件照 / ID PHOTO</span>
                </span>
              ) : null}
            </div>
            <figcaption className="portrait-foot">
              <span className="portrait-status">
                <i aria-hidden="true" />
                {site.availability}
              </span>
              <span className="portrait-sign">RL®</span>
            </figcaption>
            <div className="portrait-target">
              <span>求职方向</span>
              <span>{site.targetShort}</span>
            </div>
          </figure>

          <div className="profile-content">
            <div className="profile-heading-wrap">
              <span className="micro-label" data-reveal>
                ABOUT / 关于我
              </span>
              <h2 id="about-title" className="profile-heading" data-reveal style={{ '--delay': '80ms' }}>
                在协作中把事推进，
                <br />
                在学习中<span className="serif-italic">持续更新</span>自己。
              </h2>
            </div>

            <div className="profile-copy" data-reveal style={{ '--delay': '140ms' }}>
              <p className="profile-intro">{site.intro}</p>
              <p className="profile-bio">{site.bio}</p>
            </div>

            <div className="profile-contact" data-reveal style={{ '--delay': '180ms' }}>
              <a className="inline-link" href={`mailto:${site.email}`}>
                {site.email}
                <ArrowUpRight size={14} />
              </a>
              <span>
                <span className="muted">TARGET</span> {site.targetShort}
              </span>
              <span>
                <span className="muted">BASE</span> {site.location}
              </span>
            </div>

            <div className="education-card" data-reveal style={{ '--delay': '210ms' }}>
              <span className="micro-label">EDUCATION / 教育背景</span>
              <div className="education-main">
                <h3>{site.education.school}</h3>
                <p>
                  {site.education.college} · {site.education.major} · {site.education.degree}
                </p>
              </div>
              <span className="education-period">{site.education.period}</span>
            </div>

            <div className="timeline" data-reveal style={{ '--delay': '240ms' }}>
              <div className="timeline-head">
                <span>EXPERIENCE / 经历</span>
                <span>2024 — 2026</span>
              </div>
              {experience.map((item) => (
                <div className="timeline-row" key={item.period}>
                  <span className="timeline-period">{item.period}</span>
                  <span className="timeline-role">{item.role}</span>
                  <span className="timeline-company">{item.company}</span>
                  <span className="timeline-note">{item.note}</span>
                  <ArrowUpRight size={15} className="timeline-arrow" />
                </div>
              ))}
            </div>

            <p className="profile-quote" data-reveal style={{ '--delay': '320ms' }}>
              <span className="serif-italic">“{site.manifesto}”</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
