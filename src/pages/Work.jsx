import projects from '../data/projects';
import LineTitle from '../components/LineTitle';
import ProjectCard from '../components/ProjectCard';
export default function Work({ onOpen }) {
  return (
    <div className="container work-page">
      <header className="page-intro work-intro">
        <p className="eyebrow">Eksplorasi / 03 studi konsep</p>
        <LineTitle>Eksplorasi website.</LineTitle>
        <div className="work-description">
          <p>
            Studi desain internal untuk profil bisnis, katalog produk, dan
            pengelolaan informasi. Setiap konsep menjelaskan kebutuhan yang
            dituju dan keputusan desainnya.
          </p>
          <span className="concept-note">Bukan proyek klien</span>
        </div>
      </header>
      <section className="project-grid" aria-label="Studi desain">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={index === 0}
            onOpen={onOpen}
          />
        ))}
      </section>
    </div>
  );
}
