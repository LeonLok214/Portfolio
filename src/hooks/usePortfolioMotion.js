import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MASK = 'inset(0% 0% 100% 0%)';
const OPEN = 'inset(0% 0% 0% 0%)';
const EASE = 'expo.out';
const SOFT = 'power4.out';

function revealSectionHeader(section) {
  const header = section.querySelector('.section-header');
  if (!header) return;

  const top = header.querySelector('.section-topline');
  const title = header.querySelector('.section-title');

  if (top) gsap.set(top, { autoAlpha: 0, y: 18 });
  if (title) {
    gsap.set(title, {
      clipPath: MASK,
      y: 70,
      scaleY: 1.075,
      transformOrigin: '50% 100%',
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: header,
      start: 'top 84%',
      once: true,
    },
  });

  if (top) {
    tl.to(top, { autoAlpha: 1, y: 0, duration: 1.05, ease: SOFT });
  }
  if (title) {
    tl.to(
      title,
      { clipPath: OPEN, y: 0, scaleY: 1, duration: 1.65, ease: EASE },
      top ? 0.12 : 0
    );
  }
}

function animateHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const nav = document.querySelector('.site-nav');
  const media = hero.querySelector('.hero-media');
  const identity = hero.querySelector('.hero-identity');
  const lines = hero.querySelectorAll('.hero-line > span');
  const period = hero.querySelector('.hero-period');
  const roles = hero.querySelector('.hero-roles');
  const caption = hero.querySelector('.hero-caption');
  const side = hero.querySelector('.hero-side');
  const rail = hero.querySelector('.hero-rail');
  const footer = hero.querySelector('.hero-footer');
  const scroll = hero.querySelector('.hero-scroll');

  if (nav) gsap.set(nav, { y: -22 });
  if (media) gsap.set(media, { scale: 1.045 });
  if (identity) gsap.set(identity, { autoAlpha: 0, y: 22 });
  if (lines.length) {
    gsap.set(lines, {
      yPercent: 116,
      scaleY: 1.16,
      skewY: 1.2,
      transformOrigin: '50% 100%',
    });
  }
  if (period) gsap.set(period, { scale: 0 });
  if (roles) gsap.set(roles, { autoAlpha: 0, y: 22 });
  if (caption) gsap.set(caption, { autoAlpha: 0, y: 24 });
  if (side) gsap.set(side, { autoAlpha: 0, x: 28 });
  if (rail) gsap.set(rail, { autoAlpha: 0, x: 14 });
  if (footer) gsap.set(footer, { autoAlpha: 0, y: 20 });
  if (scroll) gsap.set(scroll, { autoAlpha: 0, y: 10 });

  const tl = gsap.timeline({ defaults: { ease: EASE } });

  if (nav) tl.to(nav, { y: 0, duration: 1.15 }, 0.12);
  if (media) tl.to(media, { scale: 1, duration: 2.5 }, 0);
  if (identity) tl.to(identity, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.34);
  if (lines.length) {
    tl.to(
      lines,
      { yPercent: 0, scaleY: 1, skewY: 0, duration: 1.55, stagger: 0.15 },
      0.46
    );
  }
  if (period) tl.to(period, { scale: 1, duration: 0.9, ease: 'power3.out' }, 1.18);
  if (roles) tl.to(roles, { autoAlpha: 1, y: 0, duration: 1.05 }, 0.98);
  if (caption) tl.to(caption, { autoAlpha: 1, y: 0, duration: 1.15 }, 1.08);
  if (side) tl.to(side, { autoAlpha: 1, x: 0, duration: 1.15 }, 1.12);
  if (rail) tl.to(rail, { autoAlpha: 1, x: 0, duration: 1.05 }, 1.2);
  if (footer) tl.to(footer, { autoAlpha: 1, y: 0, duration: 1.1 }, 1.22);
  if (scroll) tl.to(scroll, { autoAlpha: 1, y: 0, duration: 0.85 }, 1.55);
}

function animateAbout() {
  const section = document.querySelector('#about');
  if (!section) return;
  revealSectionHeader(section);

  const grid = section.querySelector('.profile-grid');
  const portrait = section.querySelector('.portrait-block');
  const frame = section.querySelector('.portrait-frame');
  const heading = section.querySelector('.profile-heading');
  const items = section.querySelectorAll(
    '.profile-heading-wrap, .profile-copy, .profile-contact, .education-card, .timeline, .profile-quote'
  );

  if (portrait) gsap.set(portrait, { autoAlpha: 0, y: 46 });
  if (frame) gsap.set(frame, { clipPath: MASK });
  if (heading) {
    gsap.set(heading, {
      clipPath: MASK,
      y: 54,
      scaleY: 1.06,
      transformOrigin: '50% 100%',
    });
  }
  if (items.length) gsap.set(items, { autoAlpha: 0, y: 40 });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
  });

  if (portrait) tl.to(portrait, { autoAlpha: 1, y: 0, duration: 1.3, ease: SOFT }, 0);
  if (frame) tl.to(frame, { clipPath: OPEN, duration: 1.5, ease: EASE }, 0.12);
  if (items.length) {
    tl.to(
      items,
      { autoAlpha: 1, y: 0, duration: 1.15, ease: SOFT, stagger: 0.1 },
      0.2
    );
  }
  if (heading) {
    tl.to(
      heading,
      { clipPath: OPEN, y: 0, scaleY: 1, duration: 1.5, ease: EASE },
      0.28
    );
  }
}

function animateWork() {
  const section = document.querySelector('#work');
  if (!section) return;
  revealSectionHeader(section);

  const header = section.querySelector('.section-header');
  const intro = section.querySelector('.work-intro');
  const slots = section.querySelectorAll('.project-slot');
  const stats = section.querySelector('.work-stats');
  const statCards = section.querySelectorAll('.work-stat');
  const cards = section.querySelectorAll('.project-card');

  if (intro) gsap.set(intro, { autoAlpha: 0, y: 26 });
  if (slots.length) gsap.set(slots, { autoAlpha: 0, y: 62 });
  if (stats) gsap.set(stats, { autoAlpha: 0, y: 44 });
  if (statCards.length) gsap.set(statCards, { autoAlpha: 0, y: 26 });
  if (cards.length) gsap.set(cards, { clipPath: MASK });

  const introTl = gsap.timeline({
    scrollTrigger: { trigger: header || section, start: 'top 82%', once: true },
  });
  if (intro) introTl.to(intro, { autoAlpha: 1, y: 0, duration: 1.1, ease: SOFT }, 0.18);

  const firstSlot = slots[0];
  const restSlots = Array.from(slots).slice(1);

  if (firstSlot) {
    const firstTl = gsap.timeline({
      scrollTrigger: { trigger: firstSlot, start: 'top 84%', once: true },
    });
    firstTl.to(firstSlot, { autoAlpha: 1, y: 0, duration: 1.3, ease: SOFT }, 0);
    if (cards[0]) {
      firstTl.to(cards[0], { clipPath: OPEN, duration: 1.45, ease: EASE }, 0.08);
    }
  }

  if (stats) {
    const statsTl = gsap.timeline({
      scrollTrigger: { trigger: stats, start: 'top 88%', once: true },
    });
    statsTl.to(stats, { autoAlpha: 1, y: 0, duration: 1.1, ease: SOFT }, 0);
    if (statCards.length) {
      statsTl.to(
        statCards,
        { autoAlpha: 1, y: 0, duration: 1, ease: SOFT, stagger: 0.08 },
        0.08
      );
    }
  }

  if (restSlots.length) {
    const restTl = gsap.timeline({
      scrollTrigger: { trigger: restSlots[0], start: 'top 84%', once: true },
    });
    restTl.to(
      restSlots,
      { autoAlpha: 1, y: 0, duration: 1.3, ease: SOFT, stagger: 0.13 },
      0
    );
    const restCards = Array.from(cards).slice(1);
    if (restCards.length) {
      restTl.to(
        restCards,
        { clipPath: OPEN, duration: 1.45, ease: EASE, stagger: 0.13 },
        0.08
      );
    }
  }
}

function animateArchive() {
  const section = document.querySelector('#archive');
  if (!section) return;
  revealSectionHeader(section);

  const intro = section.querySelector('.archive-intro');
  const footnote = section.querySelector('.archive-footnote');
  if (intro) gsap.set(intro, { autoAlpha: 0, y: 30 });
  if (footnote) gsap.set(footnote, { autoAlpha: 0, y: 20 });

  const introTl = gsap.timeline({
    scrollTrigger: { trigger: section.querySelector('.section-header'), start: 'top 82%', once: true },
  });
  if (intro) introTl.to(intro, { autoAlpha: 1, y: 0, duration: 1.15, ease: SOFT }, 0.12);
  if (footnote) {
    gsap.to(footnote, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: SOFT,
      scrollTrigger: { trigger: footnote, start: 'top 92%', once: true },
    });
  }

  section.querySelectorAll('.archive-group').forEach((group, index) => {
    const head = group.querySelector('.archive-group-head');
    const items = group.querySelectorAll('.media-frame, .photo-category-card');
    const masks = group.querySelectorAll('.media-visual, .photo-category-cover');

    if (head) gsap.set(head, { autoAlpha: 0, y: 24 });
    if (items.length) gsap.set(items, { autoAlpha: 0, y: 48 });
    if (masks.length) gsap.set(masks, { clipPath: MASK });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: group, start: 'top 82%', once: true },
      delay: index === 0 ? 0.08 : 0,
    });
    if (head) tl.to(head, { autoAlpha: 1, y: 0, duration: 1.1, ease: SOFT }, 0);
    if (items.length) {
      tl.to(
        items,
        { autoAlpha: 1, y: 0, duration: 1.2, ease: SOFT, stagger: 0.09 },
        0.08
      );
    }
    if (masks.length) {
      tl.to(
        masks,
        { clipPath: OPEN, duration: 1.3, ease: EASE, stagger: 0.08 },
        0.12
      );
    }
  });
}

function animateExpertise() {
  const section = document.querySelector('#expertise');
  if (!section) return;
  revealSectionHeader(section);

  const intro = section.querySelector('.expertise-intro');
  const grid = section.querySelector('.cap-grid');
  const cards = section.querySelectorAll('.cap-card');

  if (intro) gsap.set(intro, { autoAlpha: 0, y: 30 });
  if (cards.length) gsap.set(cards, { autoAlpha: 0, y: 52 });

  const introTl = gsap.timeline({
    scrollTrigger: { trigger: section.querySelector('.section-header'), start: 'top 82%', once: true },
  });
  if (intro) introTl.to(intro, { autoAlpha: 1, y: 0, duration: 1.15, ease: SOFT }, 0.1);

  if (cards.length) {
    gsap.to(cards, {
      autoAlpha: 1,
      y: 0,
      duration: 1.2,
      ease: SOFT,
      stagger: 0.11,
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
    });
  }
}

function animateAchievements() {
  const section = document.querySelector('#achievements');
  if (!section) return;
  revealSectionHeader(section);

  const intro = section.querySelector('.achievements-intro');
  const grid = section.querySelector('.proof-grid');
  const cards = section.querySelectorAll('.proof-card');
  const media = section.querySelectorAll('.proof-media');
  const credentials = section.querySelector('.credentials');

  if (intro) gsap.set(intro, { autoAlpha: 0, y: 30 });
  if (cards.length) gsap.set(cards, { autoAlpha: 0, y: 50 });
  if (media.length) gsap.set(media, { clipPath: MASK });
  if (credentials) gsap.set(credentials, { autoAlpha: 0, y: 30 });

  const introTl = gsap.timeline({
    scrollTrigger: { trigger: section.querySelector('.section-header'), start: 'top 82%', once: true },
  });
  if (intro) introTl.to(intro, { autoAlpha: 1, y: 0, duration: 1.15, ease: SOFT }, 0.1);

  if (cards.length) {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
    });
    tl.to(cards, { autoAlpha: 1, y: 0, duration: 1.2, ease: SOFT, stagger: 0.12 }, 0);
    if (media.length) {
      tl.to(
        media,
        { clipPath: OPEN, duration: 1.3, ease: EASE, stagger: 0.12 },
        0.08
      );
    }
  }
  if (credentials) {
    gsap.to(credentials, {
      autoAlpha: 1,
      y: 0,
      duration: 1.1,
      ease: SOFT,
      scrollTrigger: { trigger: credentials, start: 'top 88%', once: true },
    });
  }
}

function animateContact() {
  const section = document.querySelector('#contact');
  if (!section) return;
  const top = section.querySelector('.contact-topline');
  const micro = section.querySelector('.contact-main > .micro-label');
  const lines = section.querySelectorAll('.contact-line > span');
  const copy = section.querySelector('.contact-copy');
  const email = section.querySelector('.contact-email-wrap');
  const footer = section.querySelector('.contact-footer');

  if (top) gsap.set(top, { autoAlpha: 0, y: 18 });
  if (micro) gsap.set(micro, { autoAlpha: 0, y: 16 });
  if (lines.length) gsap.set(lines, { yPercent: 112 });
  if (copy) gsap.set(copy, { autoAlpha: 0, y: 30 });
  if (email) gsap.set(email, { autoAlpha: 0, y: 30 });
  if (footer) gsap.set(footer, { autoAlpha: 0, y: 20 });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 78%', once: true },
  });
  if (top) tl.to(top, { autoAlpha: 1, y: 0, duration: 1, ease: SOFT }, 0);
  if (micro) tl.to(micro, { autoAlpha: 1, y: 0, duration: 1, ease: SOFT }, 0.08);
  if (lines.length) {
    tl.to(
      lines,
      { yPercent: 0, duration: 1.5, ease: EASE, stagger: 0.12 },
      0.14
    );
  }
  if (copy) tl.to(copy, { autoAlpha: 1, y: 0, duration: 1.1, ease: SOFT }, 0.55);
  if (email) tl.to(email, { autoAlpha: 1, y: 0, duration: 1.1, ease: SOFT }, 0.62);
  if (footer) tl.to(footer, { autoAlpha: 1, y: 0, duration: 1, ease: SOFT }, 0.76);
}

export function usePortfolioMotion() {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      animateHero();
      animateAbout();
      animateWork();
      animateArchive();
      animateExpertise();
      animateAchievements();
      animateContact();

      const silk = document.querySelector('.hero-silk');
      if (silk) {
        gsap.to(silk, {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, document.body);

    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 700);
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});
    window.addEventListener('load', refresh);
    ScrollTrigger.config({ ignoreMobileResize: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);
}
