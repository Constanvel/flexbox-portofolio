import ProjectPreview from './previews/ProjectPreview';
import { Arrow } from './Button';
export default function ProjectCard({ project, onOpen, featured = false }) {
  const live = Boolean(project.url);
  const action = live ? 'Lihat karya' : 'Lihat studi desain';
  return (
    <article
      className={`project-card ${featured ? 'is-featured' : ''}`}
      data-reveal
    >
      <button
        className="project-open"
        onClick={(event) => onOpen(project, event.currentTarget)}
        aria-label={`${action} ${project.name}`}
      >
        <span className="project-image">
          {live ? (
            <img
              className="project-shot"
              src={`/images/works/${project.image}.webp`}
              alt=""
              width="1200"
              height="750"
              loading="lazy"
            />
          ) : (
            <ProjectPreview project={project} />
          )}
          <span className="project-cutout">
            <Arrow />
          </span>
        </span>
        <span className="project-meta">
          <span className="eyebrow">
            <span className="project-code">{project.code}</span> ·{' '}
            {project.type}
          </span>
          <span className="project-card-title">{project.name}</span>
          <span className="project-summary">{project.summary}</span>
          <span className="text-link">
            {action} <Arrow />
          </span>
        </span>
      </button>
    </article>
  );
}
