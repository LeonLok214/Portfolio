import { useState } from 'react';
import { ArrowUpRight, PlusMark } from './Icons';
import { site } from '../data/site';
import { SpecularAction } from './SpecularAction';
import { useClock } from '../hooks/useReveal';

export function Contact() {
  const clock = useClock('Asia/Shanghai');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-bg" aria-hidden="true">
        <div className="contact-glow" />
        <div className="contact-orbit contact-orbit-a" />
        <div className="contact-orbit contact-orbit-b" />
        <div className="contact-grid-lines" />
        <div className="contact-floor" />
        <span className="contact-cross contact-cross-a">
          <PlusMark />
        </span>
        <span className="contact-cross contact-cross-b">
          <PlusMark />
        </span>
      </div>

      <div className="shell contact-shell">
        <div className="contact-topline">
          <div>
            <span className="section-index">06</span>
            <span className="section-label">CONTACT / 联系</span>
          </div>
          <span className="contact-availability">
            <i aria-hidden="true" />
            {site.availability}
          </span>
        </div>

        <div className="contact-main">
          <span className="micro-label">
            OPEN TO WORK / 欢迎联系
          </span>

          <h2 className="contact-title" id="contact-title">
            <span className="contact-line">
              <span>OPEN TO</span>
            </span>
            <span className="contact-line">
              <span>
                <em>What&apos;s</em> NEXT
              </span>
            </span>
            <span className="contact-line">
              <span>
                TOGETHER<span className="contact-dot">.</span>
              </span>
            </span>
          </h2>

          <div className="contact-bottom">
            <div className="contact-copy">
              <p>
                2027 届财务管理毕业生，
                <br />
                寻找采购与供应链管理、项目开发选址方向的机会。
                <br />
                愿意从基础工作做起，持续学习，把每件小事做扎实。
                <br />
                欢迎邮件联系，完整简历可邮件索取。
              </p>
              <div className="contact-response">
                <span className="status-dot" aria-hidden="true" />
                <span>通常在 3 小时内回复</span>
              </div>
            </div>

            <div className="contact-email-wrap">
              <span className="micro-label">EMAIL / 邮箱</span>
              <a
                className="contact-email"
                href={`mailto:${site.email}?subject=来自作品集网站的联系`}
              >
                <span>{site.email}</span>
                <ArrowUpRight size={26} strokeWidth={1.1} />
              </a>
              <SpecularAction
                variant="copy"
                className="specular-copy-email"
                onClick={copyEmail}
                aria-label={copied ? '邮箱已复制' : '复制邮箱'}
              >
                {copied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}
              </SpecularAction>
            </div>
          </div>
        </div>

        <footer className="contact-footer">
          <a className="contact-brand" href="#top" aria-label="回到顶部">
            <span className="brand-symbol">{site.monogram}</span>
            <span>
              {site.latin}
              <sup>®</sup>
            </span>
          </a>

          <SpecularAction
            variant="resume"
            className="contact-resume-link specular-resume-link"
            onClick={() => {
              window.location.href = `mailto:${site.email}?subject=申请获取梁天乐的完整简历`;
            }}
          >
            {site.resumeNote}
            <ArrowUpRight size={11} />
          </SpecularAction>

          <div className="contact-meta">
            <span>
              {site.location} <span className="contact-time">{clock}</span> CST
            </span>
            <span>© 2026 {site.name} — ALL RIGHTS RESERVED</span>
          </div>

          <SpecularAction
            variant="back"
            className="back-to-top specular-back-top"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>BACK TO TOP</span>
            <ArrowUpRight size={13} />
          </SpecularAction>
        </footer>
      </div>
    </section>
  );
}
