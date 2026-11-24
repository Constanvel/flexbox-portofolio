import ProjectPreview from './previews/ProjectPreview';
import { Arrow } from './Button';
export default function ProjectCard({ project, onOpen, featured = false }) {
  return (
    <article
      className={`project-card ${featured ? 'is-featured' : ''}`}
      data-reveal
    >
      <button
        className="project-open"
        onClick={(event) => onOpen(project, event.currentTarget)}
        aria-label={`Lihat studi desain ${project.name}`}
      >
        <span className="project-image">
          <ProjectPreview project={project} />
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
            Lihat studi desain <Arrow />
          </span>
        </span>
      </button>
    </article>
  );
}
