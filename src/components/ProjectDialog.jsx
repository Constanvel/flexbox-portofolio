import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ProjectPreview from './previews/ProjectPreview';
export default function ProjectDialog({ project, onClose, reduced, trigger }) {
  const ref = useRef(null);
  const closing = useRef(false);
  const [mobilePreview, setMobilePreview] = useState(false);
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
        <span className="eyebrow">
          <span className="project-code">{project.code}</span> · Studi konsep ·
          Bukan proyek klien
        </span>
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
        <div className="preview-toolbar">
          <p className="eyebrow" id="preview-label">
            Fig. 01 — Tampilan responsif
          </p>
          <div
            className="preview-switch"
            role="group"
            aria-label="Ukuran preview"
          >
            <button
              type="button"
              aria-pressed={!mobilePreview}
              aria-controls="responsive-preview"
              onClick={() => setMobilePreview(false)}
            >
              Desktop
            </button>
            <button
              type="button"
              aria-pressed={mobilePreview}
              aria-controls="responsive-preview"
              onClick={() => setMobilePreview(true)}
            >
              Mobile
            </button>
          </div>
        </div>
        <div
          className={`responsive-preview-stage ${mobilePreview ? 'shows-mobile' : ''}`}
          id="responsive-preview"
          aria-labelledby="preview-label"
        >
          <div className="responsive-preview-frame">
            <div className="responsive-desktop">
              <ProjectPreview project={project} />
            </div>
            <div className="responsive-mobile">
              <ProjectPreview project={project} mobile />
            </div>
          </div>
        </div>
        <p className="preview-status" role="status">
          Preview {mobilePreview ? 'mobile' : 'desktop'} · ilustrasi antarmuka,
          bukan website interaktif.
        </p>
      </div>
      <div className="study-details">
        <div>
          <p className="eyebrow">Fig. 02 — Tampilan mobile</p>
          <ProjectPreview project={project} mobile />
        </div>
        <section>
          <p className="eyebrow">Fig. 03 — Pertimbangan desain</p>
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
