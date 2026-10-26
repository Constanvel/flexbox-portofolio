import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ProjectPreview from './previews/ProjectPreview';
export default function ProjectDialog({ project, onClose, reduced, trigger }) {
  const ref = useRef(null);
  const closing = useRef(false);
  useLayoutEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    let context;
    if (!reduced)
      context = gsap.context(
        () =>
          gsap.from(dialog, {
            y: 12,
            opacity: 0,
            duration: 0.28,
            ease: 'power3.out',
          }),
        dialog,
      );
    return () => {
      context?.revert();
      gsap.killTweensOf(dialog);
      if (closing.current && dialog.open) dialog.close();
    };
  }, [reduced]);
  const close = () => {
    if (closing.current) return;
    closing.current = true;
    const finish = () => ref.current?.close();
    if (reduced) finish();
    else
      gsap.to(ref.current, {
        opacity: 0,
        y: 8,
        duration: 0.18,
        ease: 'power2.out',
        onComplete: finish,
      });
  };
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="study-title"
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={() => {
        onClose();
        requestAnimationFrame(() => trigger?.focus({ preventScroll: true }));
      }}
      onClick={(event) => {
        if (event.target === ref.current) close();
      }}
    >
      <div className="study-top">
        <span className="eyebrow">Studi konsep · Bukan proyek klien</span>
        <button
          className="close-button"
          onClick={close}
          aria-label="Tutup studi desain"
        >
          ×
        </button>
      </div>
      <div className="study-intro">
        <h2 id="study-title">{project.name}</h2>
        <p>{project.summary}</p>
      </div>
      <div className="study-brief">
        <section>
          <h3>Kebutuhan yang diasumsikan</h3>
          <p>{project.need}</p>
        </section>
        <section>
          <h3>Sasaran desain</h3>
          <p>{project.goal}</p>
        </section>
      </div>
      <div className="study-preview">
        <p className="eyebrow">01 / Tampilan desktop</p>
        <ProjectPreview project={project} />
      </div>
      <div className="study-details">
        <div>
          <p className="eyebrow">02 / Tampilan mobile</p>
          <ProjectPreview project={project} mobile />
        </div>
        <section>
          <p className="eyebrow">03 / Pertimbangan desain</p>
          <h3>Keputusan di balik tampilannya.</h3>
          <ol>
            {project.decisions.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ol>
        </section>
      </div>
      <p className="study-notice">
        Studi desain internal dengan materi demonstrasi. Bukan sistem produksi,
        pekerjaan klien, atau hasil bisnis terverifikasi.
      </p>
    </dialog>
  );
}
