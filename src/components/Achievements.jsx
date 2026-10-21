import { SectionHeader } from './SectionHeader';
import { achievements, credentials } from '../data/site';

function pad(value) {
  return String(value).padStart(2, '0');
}

export function Achievements() {
  return (
    <section className="achievements section" id="achievements" aria-labelledby="achievements-title">
      <div className="shell">
        <SectionHeader
          index="05"
          label="RECOGNITION / 荣誉与证明"
          aside="Awards / Certificates / Project approval"
          title={
            <span className="work-title-line expertise-title-line">
              <span>Recognition</span>
              <em>荣誉与证明</em>
            </span>
          }
          id="achievements-title"
        />

        <div className="achievements-intro" data-reveal>
          <p>
            奖项、证书与项目立项证明。
            <br />
            认真做过的事，会留下记录。
          </p>
          <p>
            为保护个人信息，部分证明材料只展示可公开区域；完整证书与项目材料可邮件索取。
          </p>
        </div>

        <div className="proof-grid">
          {achievements.map((item) => (
            <article className="proof-card" key={item.index} data-reveal>
              <div className="proof-media">
                <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              </div>
              <div className="proof-meta">
                <span>{item.type} / {pad(item.index)}</span>
                <span>VERIFIED</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.meta}</p>
            </article>
          ))}
        </div>

        <div className="credentials credentials-standalone" data-reveal>
          <div className="credentials-head">
            <span className="micro-label">CERTIFICATES &amp; HONOURS / 证书与荣誉</span>
            <span>2024 — 2025</span>
          </div>
          <div className="credentials-grid">
            {credentials.map((item) => (
              <div className="credential" key={`${item.year}-${item.title}`}>
                <span className="credential-year">{item.year}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="credentials-note">完整证书与成绩单可邮件索取。</p>
        </div>
      </div>
    </section>
  );
}
