import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight } from './Icons';
import { SectionHeader } from './SectionHeader';
import { archive } from '../data/site';
import { photoCategories } from '../data/photos';

function pad(value) {
  return String(value).padStart(2, '0');
}

function EmptyMedia({ type, index }) {
  return (
    <div className="media-empty" aria-hidden="true">
      <span className="media-grid" />
      <span className="media-index">{index}</span>
      {type === 'video' && (
        <span className="media-play">
          <i />
        </span>
      )}
      {type === 'photo' && (
        <span className="media-aperture">
          <i />
          <i />
        </span>
      )}
      {type === 'poster' && <span className="media-poster-word">POSTER</span>}
      <span className="media-status">作品待上传 / COMING SOON</span>
    </div>
  );
}

function MediaFrame({ item, type, onOpen }) {
  const hasMedia = Boolean(item.src);
  const isVideo = type === 'video';

  return (
    <figure className={`media-frame media-frame-${type} ${hasMedia ? 'has-media' : 'is-empty'}`}>
      <div className="media-visual">
        {hasMedia && isVideo ? (
          <img src={item.poster || item.src} alt={`${item.title} 视频封面`} loading="lazy" decoding="async" />
        ) : null}
        {hasMedia && !isVideo ? <img src={item.src} alt={item.title} loading="lazy" decoding="async" /> : null}
        {!hasMedia ? <EmptyMedia type={type} index={item.index} /> : null}

        {hasMedia && isVideo ? (
          <span className="media-play media-play-overlay" aria-hidden="true">
            <i />
          </span>
        ) : null}
      </div>

      <figcaption>
        <span className="media-caption-meta">{item.meta}</span>
        <span className="media-caption-title">{item.title}</span>
        <span className="media-caption-state">
          {isVideo ? item.duration || 'PLAY' : hasMedia ? 'VIEW' : 'COMING SOON'}
        </span>
      </figcaption>

      {hasMedia ? (
        <button
          type="button"
          className="media-hit"
          data-cursor="VIEW"
          onClick={() => onOpen({ type, item })}
          aria-label={`${isVideo ? '播放' : '查看'}：${item.title}`}
        />
      ) : null}
    </figure>
  );
}

function ArchiveGroup({ number, title, en, count, countLabel, children }) {
  return (
    <div className={`archive-group archive-group-${number}`} data-reveal>
      <div className="archive-group-head">
        <span className="archive-group-number">{number}</span>
        <h3>{title}</h3>
        <span className="archive-group-en">{en}</span>
        <span className="archive-group-count">{countLabel || pad(count)}</span>
      </div>
      {children}
    </div>
  );
}

function PhotoCategoryCard({ category, number, cover, onOpen }) {
  return (
    <button
      type="button"
      className="photo-category-card"
      onClick={onOpen}
      data-cursor="OPEN"
      data-reveal
      aria-label={`查看${category.title}系列，共 ${category.items.length} 张`}
    >
      <span className="photo-category-cover">
        <img
          src={cover.thumb || cover.src}
          alt={`${category.title}系列封面：${cover.title}`}
          loading="lazy"
          decoding="async"
        />
        <span className="photo-category-shadow" aria-hidden="true" />
        <span className="photo-category-index">PHOTO / {number}</span>
        <span className="photo-category-count">{pad(category.items.length)} WORKS</span>
        <span className="photo-category-arrow" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </span>
      <span className="photo-category-info">
        <span className="photo-category-title">{category.title}</span>
        <span className="photo-category-en">{category.en}</span>
        <span className="photo-category-desc">{category.desc}</span>
      </span>
    </button>
  );
}

function PhotoCategoryModal({ category, onClose, onOpenMedia, mediaOpen }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!category) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [category]);

  useEffect(() => {
    if (!category || mediaOpen) return;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [category, mediaOpen, onClose]);

  if (!category) return null;

  return createPortal(
    <div
      className="photo-category-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-category-title"
    >
      <button type="button" className="photo-category-backdrop" onClick={onClose} aria-label="关闭摄影系列" />
      <div className="photo-category-panel" ref={panelRef}>
        <div className="photo-category-bar">
          <span>PHOTO SERIES / {category.en.toUpperCase()}</span>
          <button ref={closeRef} type="button" className="modal-close" onClick={onClose}>
            <span>CLOSE</span>
            <span className="close-icon" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>

        <div className="photo-category-scroll">
          <div className="photo-category-heading">
            <span className="micro-label">PHOTOGRAPHY / 摄影</span>
            <h2 id="photo-category-title">{category.title}</h2>
            <div>
              <p>{category.desc}</p>
              <span>{pad(category.items.length)} photographs</span>
            </div>
          </div>

          <div className="photo-category-gallery">
            {category.items.map((item) => (
              <button
                type="button"
                className="category-photo"
                key={item.index}
                data-cursor="VIEW"
                onClick={() => onOpenMedia({ type: 'photo', item })}
                aria-label={`查看摄影作品：${item.title}`}
              >
                <img src={item.thumb || item.src} alt={item.title} loading="lazy" decoding="async" />
                <span>{item.index}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function MediaLightbox({ active, onClose }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll('button, a[href], video[controls]');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [active, onClose]);

  if (!active) return null;
  const { type, item } = active;
  const isVideo = type === 'video';

  return createPortal(
    <div className="media-lightbox" role="dialog" aria-modal="true" aria-labelledby="media-lightbox-title">
      <button type="button" className="media-lightbox-backdrop" onClick={onClose} aria-label="关闭预览" />
      <div className={`media-lightbox-panel ${isVideo ? 'is-video' : 'is-image'}`} ref={panelRef}>
        <div className="media-lightbox-bar">
          <span>{item.meta || `PHOTO / ${item.index}`}</span>
          <button ref={closeRef} type="button" className="media-lightbox-close" onClick={onClose}>
            <span>CLOSE</span>
            <span className="close-icon" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>

        <div className="media-lightbox-stage">
          {isVideo ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          ) : (
            <img src={item.src} alt={item.title} />
          )}
        </div>

        <div className="media-lightbox-caption">
          <h3 id="media-lightbox-title">{item.title}</h3>
          <span>{isVideo ? item.duration || 'VIDEO' : type.toUpperCase()}</span>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function Archive() {
  const [activeMedia, setActiveMedia] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [photoCovers] = useState(() =>
    Object.fromEntries(
      photoCategories.map((category) => [
        category.id,
        category.items[Math.floor(Math.random() * category.items.length)],
      ])
    )
  );

  const videoCount = archive.videos.length;
  const photoCount = photoCategories.reduce((total, category) => total + category.items.length, 0);
  const posterCount = archive.posters.length;

  const closeCategory = () => {
    setActiveCategory(null);
    setActiveMedia(null);
  };

  return (
    <section className="archive section" id="archive" aria-labelledby="archive-title">
      <div className="shell">
        <SectionHeader
          index="03"
          label="CREATIVE ARCHIVE / 影像与视觉"
          aside={`Video ${pad(videoCount)} / Photo ${photoCount} / Poster ${pad(posterCount)}`}
          title={
            <span className="work-title-line">
              <span>Creative</span>
              <em>Archive</em>
              <span className="work-title-cn">影像与视觉</span>
            </span>
          }
          id="archive-title"
        />

        <div className="archive-intro" data-reveal>
          <p>
            影像、摄影与海报作品。
            <br />
            用镜头和画面，记录观察、情绪与想法。
          </p>
          <span className="archive-intro-note">
            MEDIA / VISUAL
            <i aria-hidden="true" />
          </span>
        </div>

        <ArchiveGroup number="01" title="影像" en="Motion / Video" count={videoCount}>
          <div className="motion-grid">
            {archive.videos.map((item) => (
              <MediaFrame key={item.index} item={item} type="video" onOpen={setActiveMedia} />
            ))}
          </div>
        </ArchiveGroup>

        <ArchiveGroup
          number="02"
          title="摄影"
          en="Photography"
          count={photoCount}
          countLabel={`${photoCount} / ${pad(photoCategories.length)} SERIES`}
        >
          <div className="photo-category-grid">
            {photoCategories.map((category, index) => (
              <PhotoCategoryCard
                key={category.id}
                category={category}
                number={pad(index + 1)}
                cover={photoCovers[category.id]}
                onOpen={() => setActiveCategory(category)}
              />
            ))}
          </div>
        </ArchiveGroup>

        <ArchiveGroup number="03" title="海报" en="Poster Design" count={posterCount}>
          <div className="poster-grid">
            {archive.posters.map((item) => (
              <MediaFrame key={item.index} item={item} type="poster" onOpen={setActiveMedia} />
            ))}
          </div>
        </ArchiveGroup>

        <p className="archive-footnote" data-reveal>
          更多影像与设计作品可持续补充。
          <span>VIDEO / PHOTO / POSTER — UPDATING</span>
        </p>
      </div>

      <PhotoCategoryModal
        category={activeCategory}
        onClose={closeCategory}
        onOpenMedia={setActiveMedia}
        mediaOpen={Boolean(activeMedia)}
      />
      <MediaLightbox active={activeMedia} onClose={() => setActiveMedia(null)} />
    </section>
  );
}
