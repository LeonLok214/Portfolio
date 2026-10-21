import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, ArrowUpRight } from './Icons';
import { ProjectCover } from './ProjectCover';
import { SpecularAction } from './SpecularAction';
import { projects, site } from '../data/site';

export function ProjectModal({ project, onClose, onNext }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll(
        'button, a[href], video[controls], [tabindex]:not([tabindex="-1"])'
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
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button type="button" className="modal-backdrop" onClick={onClose} aria-label="关闭项目详情" />
      <div className="modal-panel" ref={panelRef}>
        <div className="modal-bar">
          <span className="modal-index">
            PROJECT {project.index} / {String(projects.length).padStart(2, '0')}
          </span>
          <button ref={closeRef} type="button" className="modal-close" onClick={onClose}>
            <span>CLOSE</span>
            <span className="close-icon" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>

        <div className="modal-hero">
          <ProjectCover project={project} context="modal" />
          <div className="modal-hero-overlay" aria-hidden="true" />
          <div className="modal-hero-title">
            <span>{project.cn}</span>
            <h2 id="project-modal-title">{project.title}</h2>
          </div>
          <span className="modal-year">{project.year}</span>
        </div>

        <div className="modal-body">
          {project.video ? (
            <div className="modal-film">
              <div className="modal-film-head">
                <span>PROJECT FILM / 项目视频</span>
                <span>{project.video.duration}</span>
              </div>
              <div className="modal-film-frame">
                <video
                  src={project.video.src}
                  poster={project.video.poster}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={project.video.title}
                />
              </div>
              <div className="modal-film-caption">
                <h3>{project.video.title}</h3>
                <span>{project.video.caption}</span>
              </div>
            </div>
          ) : null}

          <div className="modal-summary">
            <span className="micro-label">OVERVIEW / 项目概述</span>
            <p>{project.summary}</p>
          </div>

          <div className="modal-meta">
            <div className="modal-meta-block">
              <span className="micro-label">ROLE</span>
              <p>{project.role}</p>
            </div>
            <div className="modal-meta-block">
              <span className="micro-label">KEY POINTS</span>
              <ul>
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="modal-meta-block">
              <span className="micro-label">DELIVERABLES</span>
              <ul>
                {project.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="modal-meta-block">
              <span className="micro-label">YEAR</span>
              <p>{project.year}</p>
            </div>
          </div>

          {project.record ? (
            <figure className="modal-record">
              <div className="modal-record-head">
                <span>{project.record.label}</span>
                <span>PROJECT RECORD</span>
              </div>
              <div className="modal-record-media">
                <img src={project.record.src} alt={project.record.alt} loading="lazy" />
              </div>
              <figcaption>
                <span>{project.record.caption}</span>
                <p>{project.record.note}</p>
              </figcaption>
            </figure>
          ) : null}

          <div className="modal-footer">
            <span>完整简历可邮件索取 / Full resume available on request.</span>
            <div className="modal-footer-actions">
              <SpecularAction
                variant="modal"
                className="specular-modal-action"
                onClick={() => {
                  window.location.href = `mailto:${site.email}?subject=来自作品集网站的联系`;
                }}
              >
                EMAIL ME
                <ArrowUpRight size={15} />
              </SpecularAction>
              <SpecularAction
                variant="modal"
                className="specular-modal-action"
                onClick={onNext}
              >
                NEXT PROJECT
                <ArrowRight size={16} />
              </SpecularAction>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
