import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from './Icons';
import { site } from '../data/site';
import { SpecularAction } from './SpecularAction';

const links = [
  { href: '#about', index: '01', cn: '关于', en: 'Profile' },
  { href: '#work', index: '02', cn: '项目', en: 'Projects' },
  { href: '#archive', index: '03', cn: '影像', en: 'Archive' },
  { href: '#expertise', index: '04', cn: '能力', en: 'Skills' },
  { href: '#achievements', index: '05', cn: '荣誉', en: 'Recognition' },
  { href: '#contact', index: '06', cn: '联系', en: 'Contact' },
];

export function Nav() {
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    let frame = 0;
    let currentActive = '';

    const update = () => {
      frame = 0;
      const top = window.scrollY || 0;
      setScrolled(top > 32);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      headerRef.current?.style.setProperty('--scroll', max > 0 ? Math.min(top / max, 1) : 0);

      const probe = top + window.innerHeight * 0.34;
      let nextActive = '';
      let closestTop = -Infinity;
      links.forEach((link) => {
        const section = document.querySelector(link.href);
        if (!section) return;
        const sectionTop = section.getBoundingClientRect().top + top;
        if (sectionTop <= probe && sectionTop > closestTop) {
          closestTop = sectionTop;
          nextActive = link.href;
        }
      });

      if (nextActive !== currentActive) {
        currentActive = nextActive;
        setActive(nextActive);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className={`site-nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`}
      >
        <div className="shell nav-shell">
          <a className="brand" href="#top" onClick={close} aria-label={`${site.name}，返回首页`}>
            <span className="brand-symbol" aria-hidden="true">
              {site.monogram}
            </span>
            <span className="brand-lockup">
              <span className="brand-name">
                {site.latin}
                <sup>®</sup>
              </span>
              <span className="brand-role">Management Graduate / Lifelong Learner</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="主导航">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${active === link.href ? 'is-active' : ''}`}
              >
                <span className="nav-index">{link.index}</span>
                <span>{link.cn}</span>
                <span className="nav-en">{link.en}</span>
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <span className="nav-status">
              <i aria-hidden="true" />
              OPEN TO WORK
            </span>
            <SpecularAction
              variant="nav"
              className="specular-nav-cta"
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>联系我</span>
              <ArrowUpRight size={14} />
            </SpecularAction>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
              <span className={`menu-icon ${menuOpen ? 'is-open' : ''}`} aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
        <div className="nav-progress" aria-hidden="true">
          <span />
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner shell">
          <span className="eyebrow">INDEX / 2027</span>
          <nav aria-label="移动端导航">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={close} tabIndex={menuOpen ? 0 : -1}>
                <span className="mobile-index">{link.index}</span>
                <span className="mobile-cn">{link.cn}</span>
                <span className="mobile-en">{link.en}</span>
                <ArrowUpRight size={22} />
              </a>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </>
  );
}
