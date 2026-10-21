import { Fragment, useRef, useState } from 'react';
import { ArrowUpRight } from './Icons';
import { SectionHeader } from './SectionHeader';
import { ProjectCover } from './ProjectCover';
import { ProjectModal } from './ProjectModal';
import { projects, stats } from '../data/site';

function ProjectCard({ project, featured, onOpen }) {
  return (
    <button
      type="button"
      className={`project-card project-card-${project.visual} ${featured ? 'is-featured' : ''}`}
      onClick={onOpen}
      data-cursor="READ"
      aria-label={`查看项目 ${project.title} — ${project.cn}`}
      data-reveal
    >
      <ProjectCover project={project} />
      <span className="project-sheen" aria-hidden="true" />

      <span className="project-top">
        <span className="project-number">{project.index}</span>
        <span className="project-category">{project.category}</span>
        <span className="project-year">{project.year}</span>
      </span>

      <span className="project-bottom">
        <span className="project-title-wrap">
          <span className="project-cn">{project.cn}</span>
          <span className="project-title">{project.title}</span>
        </span>
        <span className="project-action">
          <span>READ MORE</span>
          <span className="project-action-icon">
            <ArrowUpRight size={18} />
          </span>
        </span>
      </span>
    </button>
  );
}

function VideoProjectCard({ project, featured, onOpenDetails }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setPlaying(true);
    const promise = video.play();
    if (promise) promise.catch(() => setPlaying(false));
  };

  return (
    <article
      className={`project-card project-card-${project.visual} is-video-card ${featured ? 'is-featured' : ''} ${playing ? 'is-playing' : ''}`}
    >
      <video
        ref={videoRef}
        className="project-video-bg"
        src={project.video.src}
        poster={project.video.poster}
        preload="none"
        playsInline
        controls={playing}
        onEnded={(event) => {
          event.currentTarget.currentTime = 0;
          event.currentTarget.load();
          setPlaying(false);
        }}
      />
      <span className="project-sheen" aria-hidden="true" />

      <span className="project-top">
        <span className="project-number">{project.index}</span>
        <span className="project-category">{project.category}</span>
        <span className="project-year">{project.year}</span>
      </span>

      <button
        type="button"
        className="project-details-link"
        onClick={onOpenDetails}
        data-cursor="READ"
      >
        PROJECT DETAILS
        <ArrowUpRight size={12} />
      </button>

      <span className="project-bottom">
        <span className="project-title-wrap">
          <span className="project-cn">{project.cn}</span>
          <span className="project-title">{project.title}</span>
        </span>
        <span className="project-action">
          <span>PLAY FILM / {project.video.duration}</span>
          <span className="project-action-icon project-play-icon">
            <i aria-hidden="true" />
          </span>
        </span>
      </span>

      {!playing ? (
        <button
          type="button"
          className="project-video-hit"
          onClick={play}
          data-cursor="PLAY"
          aria-label={`播放视频：${project.video.title}`}
        />
      ) : null}
    </article>
  );
}

function WorkStats() {
  return (
    <div className="work-stats">
      <div className="work-stats-head">
        <span className="micro-label">PROJECT IMPACT / 课程制作数据</span>
        <span>COURSE PRODUCTION — 2024 / 2026</span>
      </div>
      <div className="work-stats-grid">
        {stats.map((stat) => (
          <div className="work-stat" key={stat.label}>
            <div className="work-stat-value">
              {stat.value}
              <span>{stat.suffix}</span>
            </div>
            <div className="work-stat-label">
              {stat.label}
              <span>{stat.en}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Work() {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeProject = activeIndex === null ? null : projects[activeIndex];

  const next = () => setActiveIndex((current) => (current + 1) % projects.length);

  return (
    <section className="work section" id="work" aria-labelledby="work-title">
      <div className="shell">
        <SectionHeader
          index="02"
          label="SELECTED PROJECTS / 项目经历"
          aside="03 projects — 2024 / 2026"
          title={
            <span className="work-title-line">
              <span>Selected</span>
              <em>Projects</em>
              <span className="work-title-cn">项目经历</span>
            </span>
          }
          id="work-title"
        />

        <div className="work-intro" data-reveal>
          <p>
            用具体的工作过程与结果，
            <br />
            说明我能为团队带来什么。
          </p>
          <span className="work-intro-note">
            CLICK TO EXPLORE
            <i aria-hidden="true" />
          </span>
        </div>

        <div className="work-grid">
          {projects.map((project, index) => (
            <Fragment key={project.id}>
              <div className={`project-slot ${index === 0 ? 'slot-full' : 'slot-six'}`}>
                {project.video ? (
                  <VideoProjectCard
                    project={project}
                    featured={index === 0}
                    onOpenDetails={() => setActiveIndex(index)}
                  />
                ) : (
                  <ProjectCard
                    project={project}
                    featured={index === 0}
                    onOpen={() => setActiveIndex(index)}
                  />
                )}
              </div>
              {index === 0 ? <WorkStats /> : null}
            </Fragment>
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveIndex(null)}
        onNext={next}
      />
    </section>
  );
}
