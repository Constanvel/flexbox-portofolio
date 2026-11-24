import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import projects from '../data/projects';
import LineTitle from '../components/LineTitle';
import ProjectCard from '../components/ProjectCard';

gsap.registerPlugin(Flip);

// The studio is named after CSS flexbox, so the gallery literally re-flows.
const layouts = [
  ['wrap', 'Grid'],
  ['row', 'Baris'],
  ['column', 'Daftar'],
];

export default function Work({ onOpen }) {
  const [layout, setLayout] = useState('wrap');
  const list = useRef(null);
  const flipState = useRef(null);

  const choose = (next) => {
    if (next === layout) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!reduced.matches)
      flipState.current = Flip.getState(list.current.children);
    setLayout(next);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    const tween = Flip.from(state, {
      duration: 0.6,
      ease: 'power3.inOut',
      stagger: 0.04,
    });
    return () => tween.kill();
  }, [layout]);

  return (
    <div className="container work-page">
      <header className="page-intro work-intro">
        <p className="eyebrow">Karya · 3 studi konsep</p>
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
      <div className="flex-toggle" role="group" aria-label="Tata letak karya">
        <code className="flex-toggle-prop" aria-hidden="true">
          display: flex;
        </code>
        {layouts.map(([value, label]) => (
          <button
            type="button"
            key={value}
            aria-pressed={layout === value}
            onClick={() => choose(value)}
          >
            <code>{value}</code>
            <span>{label}</span>
          </button>
        ))}
      </div>
      <section
        ref={list}
        className="project-flex"
        data-layout={layout}
        aria-label="Studi desain"
        data-lenis-prevent-horizontal
      >
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
