import React, {
  StrictMode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles.css';
import {
  canAnimate,
  useHorizontalShowcase,
  showcaseScrollPosition,
} from './motion-policy';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    name: 'Ruang untuk cerita.',
    type: 'Profil bisnis',
    className: 'story',
    text: 'Usaha lokal, diperkenalkan dengan lebih dekat.',
    description:
      'Eksplorasi struktur profil usaha: cerita, layanan, dan jalur kontak. Bukan pekerjaan klien atau hasil bisnis terverifikasi.',
  },
  {
    id: '02',
    name: 'Produk jadi percakapan.',
    type: 'Katalog digital',
    className: 'catalog',
    text: 'Ruang yang rapi untuk hal-hal yang Anda buat.',
    description:
      'Eksplorasi katalog: kategori, informasi produk, dan jalur pertanyaan. Nama, produk, dan ilustrasi di sini hanya materi demonstrasi.',
  },
  {
    id: '03',
    name: 'Ide bertemu bentuk.',
    type: 'Sistem digital',
    className: 'system',
    text: 'Potongan berbeda. Pengalaman yang menyatu.',
    description:
      'Eksplorasi visual sistem modular untuk pengalaman digital. Tidak menyatakan fitur, klien, atau proyek yang sudah dikerjakan Flexbox.',
  },
];

function useMedia(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}

function Arrow({ down = false }) {
  return (
    <span aria-hidden="true" className="arrow">
      {down ? '↓' : '↗'}
    </span>
  );
}

function SplitTitle({ lines, className = '', as: Tag = 'h1', id }) {
  return (
    <Tag
      id={id}
      className={`split-title ${className}`}
      aria-label={lines.join(' ')}
    >
      {lines.map((line, index) => (
        <span className="title-line" aria-hidden="true" key={line}>
          {line.split(' ').map((word, wi) => (
            <React.Fragment key={wi}>
              <span className="title-word">
                {Array.from(word).map((char, ci) => (
                  <span className="char" key={ci}>
                    {char}
                  </span>
                ))}
              </span>
              {wi < line.split(' ').length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
          {index === lines.length - 1 && <span className="title-period" />}
        </span>
      ))}
    </Tag>
  );
}

function Cube({ small = false }) {
  return (
    <svg
      className={small ? 'brand-cube' : 'hero-cube'}
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
    >
      <g
        className="cube-body"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      >
        <path d="M85 210 300 85 515 210 300 335Z" fill="#ffffff" />
        <path d="M85 210 300 335 300 550 85 425Z" fill="#454a54" />
        <path d="M300 335 515 210 515 425 300 550Z" fill="#3f83c5" />
        <path d="M85 210 192 148 407 273 300 335Z" fill="#d5dff0" />
        <path d="M300 335 407 273 407 397 300 459Z" fill="#050505" />
      </g>
      {!small && (
        <g
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5 10"
          opacity=".35"
        >
          <path d="M70 475H540M125 160V505M475 160V505" />
        </g>
      )}
    </svg>
  );
}

function ProjectArt({ project }) {
  if (project.className === 'story')
    return (
      <div className="art story-art" aria-hidden="true">
        <div className="browser-bar">
          <span>ruang / cerita</span>
          <span>● ● ●</span>
        </div>
        <div className="story-copy">
          <span className="mini-label">RUANG UNTUK TUMBUH</span>
          <strong>
            Dari sini,
            <br />
            cerita dimulai<span>.</span>
          </strong>
          <span className="mini-pill">Kenali usaha kami ↗</span>
        </div>
        <div className="story-orbit">
          <div />
          <div />
          <div />
        </div>
        <div className="art-caption">LOCAL STORIES, DIGITAL SPACES.</div>
      </div>
    );
  if (project.className === 'catalog')
    return (
      <div className="art catalog-art" aria-hidden="true">
        <div className="browser-bar">
          <span>koleksi / objek</span>
          <span>Menu +</span>
        </div>
        <div className="catalog-heading">Bentuk sehari-hari.</div>
        <div className="product-grid">
          {['01', '02', '03'].map((id) => (
            <div className={`product product-${id}`} key={id}>
              <div className="object" />
              <span>OBJEK / {id}</span>
            </div>
          ))}
        </div>
        <div className="art-caption">A COLLECTION OF SIMPLE THINGS.</div>
      </div>
    );
  return (
    <div className="art system-art" aria-hidden="true">
      <div className="browser-bar">
        <span>flex / system</span>
        <span>01 — 03</span>
      </div>
      <div className="module-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <div className={`module module-${i}`} key={i}>
            <span>{i % 3 === 0 ? '↗' : i % 3 === 1 ? '+' : '○'}</span>
          </div>
        ))}
      </div>
      <div className="art-caption">DIFFERENT PARTS. ONE DIRECTION.</div>
    </div>
  );
}

function App() {
  const root = useRef(null);
  const track = useRef(null);
  const stage = useRef(null);
  const cursor = useRef(null);
  const lenis = useRef(null);
  const horizontal = useRef(null);
  const menuDialog = useRef(null);
  const projectDialog = useRef(null);
  const lastProjectTrigger = useRef(null);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)');
  const finePointer = useMedia('(hover: hover) and (pointer: fine)');
  const forcedColors = useMedia('(forced-colors: active)');
  const wideScreen = useMedia('(min-width: 1024px) and (min-height: 650px)');
  const animated = canAnimate({ reducedMotion, paused });
  const horizontalEnabled = useHorizontalShowcase({
    animated,
    finePointer,
    width: wideScreen ? 1024 : 0,
    height: wideScreen ? 650 : 0,
  });
  const overlayOpen = menuOpen || dialogOpen;

  useEffect(() => {
    if (!animated || !finePointer) return;
    const instance = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
    });
    lenis.current = instance;
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      instance.off('scroll', ScrollTrigger.update);
      instance.destroy();
      lenis.current = null;
    };
  }, [animated, finePointer]);

  useEffect(() => {
    if (overlayOpen) lenis.current?.stop();
    else lenis.current?.start();
  }, [overlayOpen, animated, finePointer]);

  useLayoutEffect(() => {
    if (!overlayOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [overlayOpen]);

  useLayoutEffect(() => {
    if (dialogOpen && selected !== null && !projectDialog.current.open) {
      projectDialog.current.showModal();
    }
  }, [dialogOpen, selected]);

  useEffect(() => {
    const visuals = [...root.current.querySelectorAll('.project-visual')];
    const clear = () => {
      gsap.killTweensOf(visuals);
      gsap.set(visuals, { clearProps: 'transform' });
    };
    clear();
    return clear;
  }, [animated, finePointer, forcedColors]);

  useLayoutEffect(() => {
    if (!animated) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero .char', {
        yPercent: 110,
        rotate: 5,
        opacity: 0,
        stagger: 0.018,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.hero-reveal', {
        y: 20,
        opacity: 0,
        stagger: 0.09,
        duration: 0.7,
        delay: 0.3,
        ease: 'power3.out',
      });
      gsap.from('.hero-cube .cube-body', {
        y: 35,
        opacity: 0,
        duration: 1.1,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.showcase-heading .char', {
        yPercent: 105,
        opacity: 0,
        stagger: 0.018,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.showcase-heading',
          start: 'top 92%',
          once: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [animated]);

  useLayoutEffect(() => {
    if (!horizontalEnabled) {
      horizontal.current = null;
      return;
    }
    const ctx = gsap.context(() => {
      const distance = () =>
        Math.max(0, track.current.scrollWidth - stage.current.clientWidth);
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: stage.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.65,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) =>
            setActive(Math.round(self.progress * (projects.length - 1))),
        },
      });
      horizontal.current = tween.scrollTrigger;
    }, root);
    const resize = new ResizeObserver(() => ScrollTrigger.refresh());
    resize.observe(track.current);
    const onFocus = (event) => {
      const card = event.target.closest('[data-project-index]');
      if (!card || !horizontal.current) return;
      const st = horizontal.current;
      const y = showcaseScrollPosition(
        st.start,
        st.end,
        Number(card.dataset.projectIndex),
        projects.length,
      );
      if (lenis.current) lenis.current.scrollTo(y, { immediate: true });
      else window.scrollTo({ top: y, behavior: 'instant' });
      ScrollTrigger.update();
      st.getTween()?.progress(1);
    };
    track.current.addEventListener('focusin', onFocus);
    const element = track.current;
    return () => {
      resize.disconnect();
      element.removeEventListener('focusin', onFocus);
      horizontal.current = null;
      ctx.revert();
    };
  }, [horizontalEnabled]);

  useEffect(() => {
    if (!animated || !finePointer || forcedColors || overlayOpen) return;
    const el = cursor.current;
    const moveX = gsap.quickTo(el, 'x', { duration: 0.16, ease: 'power2.out' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.16, ease: 'power2.out' });
    const move = (event) => {
      moveX(event.clientX);
      moveY(event.clientY);
      const interactive = event.target.closest('a, button');
      const form = event.target.closest('input, textarea, select, dialog');
      el.dataset.visible = form ? 'false' : 'true';
      el.dataset.interactive = interactive ? 'true' : 'false';
      el.textContent =
        event.target.closest('[data-cursor]')?.dataset.cursor ||
        (interactive ? '↗' : '+');
    };
    const leave = () => {
      el.dataset.visible = 'false';
    };
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      gsap.killTweensOf(el);
      el.dataset.visible = 'false';
    };
  }, [animated, finePointer, forcedColors, overlayOpen]);

  function goTo(id, event) {
    if (
      event &&
      (event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0)
    )
      return;
    event?.preventDefault();
    closeMenu();
    const element = document.getElementById(id);
    if (!element) return;
    const y =
      id === 'karya' && horizontal.current
        ? horizontal.current.start
        : element.getBoundingClientRect().top + window.scrollY;
    const focusTarget = () => element.focus({ preventScroll: true });
    if (lenis.current && animated)
      lenis.current.scrollTo(y, { onComplete: focusTarget });
    else {
      window.scrollTo({ top: y, behavior: 'instant' });
      focusTarget();
    }
    window.history.pushState(null, '', `#${id}`);
  }
  function closeMenu() {
    if (menuDialog.current?.open) {
      menuDialog.current.close();
      lenis.current?.start();
    }
    setMenuOpen(false);
  }
  function openProject(index, trigger) {
    setSelected(index);
    lastProjectTrigger.current = trigger;
    setDialogOpen(true);
  }
  function closeProject() {
    projectDialog.current.close();
  }
  function tilt(event) {
    if (!animated || !finePointer || forcedColors) return;
    const rect = event.currentTarget.getBoundingClientRect();
    gsap.to(event.currentTarget.querySelector('.project-visual'), {
      rotateY: ((event.clientX - rect.left) / rect.width - 0.5) * 5,
      rotateX: ((event.clientY - rect.top) / rect.height - 0.5) * -5,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: true,
    });
  }
  function resetTilt(event) {
    gsap.to(event.currentTarget.querySelector('.project-visual'), {
      rotateX: 0,
      rotateY: 0,
      duration: animated ? 0.5 : 0,
      overwrite: true,
    });
  }

  return (
    <div
      ref={root}
      className={`app ${animated ? 'motion-on' : 'motion-off'} ${animated && finePointer && !forcedColors && !overlayOpen ? 'custom-cursor-on' : ''}`}
    >
      <a href="#main" className="skip-link" onClick={(e) => goTo('main', e)}>
        Lewati navigasi
      </a>
      <header className="header">
        <a
          href="#main"
          className="brand"
          aria-label="Flexbox, kembali ke awal"
          onClick={(e) => goTo('main', e)}
        >
          <Cube small />
          <span>
            flexbox
            <span className="brand-dot" aria-hidden="true">
              ✳
            </span>
          </span>
        </a>
        <nav aria-label="Navigasi utama" className="desktop-nav">
          <a href="#karya" onClick={(e) => goTo('karya', e)}>
            Eksplorasi karya <Arrow down />
          </a>
          <a href="#catatan" onClick={(e) => goTo('catatan', e)}>
            Tentang percobaan <Arrow />
          </a>
        </nav>
        <div className="header-controls">
          <button
            className="motion-toggle"
            type="button"
            onClick={() => setPaused((v) => !v)}
            disabled={reducedMotion}
          >
            <span className="motion-dot" />
            {reducedMotion
              ? 'Gerak sistem: minim'
              : paused
                ? 'Aktifkan gerak'
                : 'Matikan gerak'}
          </button>
          <button
            className="menu-trigger"
            type="button"
            aria-haspopup="dialog"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => {
              menuDialog.current.showModal();
              setMenuOpen(true);
            }}
          >
            Menu +
          </button>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-reveal">
              <span className="square" /> INDEPENDENT DIGITAL STUDIO
            </p>
            <SplitTitle
              id="hero-title"
              lines={['Ide Anda.', 'Ruang digital', 'yang berarti.']}
            />
            <p className="hero-description hero-reveal">
              Kami merangkai desain, teknologi, dan cerita usaha menjadi
              pengalaman digital yang terasa dekat.
            </p>
            <div className="hero-actions hero-reveal">
              <a
                className="button button-primary shimmer"
                href="#karya"
                onClick={(e) => goTo('karya', e)}
              >
                Jelajahi eksplorasi <Arrow />
              </a>
              <a
                className="text-link"
                href="#catatan"
                onClick={(e) => goTo('catatan', e)}
              >
                Dibangun bersama <Arrow />
              </a>
            </div>
          </div>
          <div className="hero-object hero-reveal">
            <div className="object-topline">
              <span>FB / MOTION STUDY</span>
              <span>001</span>
            </div>
            <Cube />
            <div className="object-bottomline">
              <span>
                DIFFERENT PARTS.
                <br />
                ONE DIRECTION.
              </span>
              <span className="cross">+</span>
            </div>
          </div>
          <div className="hero-bottom hero-reveal">
            <span>Desain dengan arah. Teknologi dengan tujuan.</span>
            <a
              href="#karya"
              onClick={(e) => goTo('karya', e)}
              aria-label="Turun ke eksplorasi karya"
            >
              SCROLL TO EXPLORE <Arrow down />
            </a>
          </div>
        </section>

        <div className="marquee-shell">
          <div className="marquee-caption">RUANG KERJA BERSAMA</div>
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              {[0, 1].map((i) => (
                <span key={i}>
                  CERITA ANDA <b>✳</b> IDE BERSAMA <b>✳</b> BENTUK BARU{' '}
                  <b>✳</b>{' '}
                </span>
              ))}
            </div>
          </div>
        </div>

        <section
          id="karya"
          tabIndex={-1}
          aria-labelledby="work-title"
          className={`showcase ${horizontalEnabled ? 'is-horizontal' : ''}`}
        >
          <div ref={stage} className="showcase-stage">
            <div className="showcase-heading">
              <div>
                <p className="eyebrow">01 / EKSPLORASI TERPILIH</p>
                <SplitTitle
                  id="work-title"
                  as="h2"
                  lines={['Bukan sekadar', 'terlihat berbeda.']}
                />
              </div>
              <div className="showcase-note">
                <span className="concept-tag">KONSEP, BUKAN PROYEK KLIEN</span>
                <p>
                  Tiga kemungkinan. Satu cara berpikir:
                  <br />
                  mulai dari kebutuhan, bukan template.
                </p>
                <span className="scroll-hint">
                  {horizontalEnabled
                    ? 'SCROLL UNTUK MENJELAJAHI →'
                    : 'JELAJAHI KONSEP DI BAWAH ↓'}
                </span>
              </div>
            </div>
            <div className="showcase-window">
              <div className="project-track" ref={track}>
                {projects.map((project, index) => (
                  <article
                    className={`project-card ${project.className}`}
                    key={project.id}
                    data-project-index={index}
                    onPointerMove={tilt}
                    onPointerLeave={resetTilt}
                  >
                    <button
                      type="button"
                      className="project-open"
                      aria-label={`Lihat konsep ${project.name}`}
                      data-cursor="Lihat"
                      onClick={(event) =>
                        openProject(index, event.currentTarget)
                      }
                    >
                      <div className="project-visual">
                        <ProjectArt project={project} />
                        <span className="project-open-icon" aria-hidden="true">
                          ↗
                        </span>
                      </div>
                    </button>
                    <div className="project-meta">
                      <span className="project-number">/{project.id}</span>
                      <div>
                        <p>{project.type} / Eksplorasi</p>
                        <h3>{project.name}</h3>
                      </div>
                      <span className="project-meta-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="showcase-footer">
              <span>
                {horizontalEnabled
                  ? `${String(active + 1).padStart(2, '0')} / 03`
                  : '03 KONSEP / BELUM DIPUBLIKASIKAN SEBAGAI KARYA'}
              </span>
              <div className="progress-track" aria-hidden="true">
                <span style={{ transform: `translateX(${active * 100}%)` }} />
              </div>
              <a
                href="#catatan"
                className="text-link"
                onClick={(e) => goTo('catatan', e)}
              >
                Lewati showcase <Arrow down />
              </a>
            </div>
          </div>
        </section>
        <section
          id="catatan"
          tabIndex={-1}
          className="closing"
          aria-labelledby="closing-title"
        >
          <p className="eyebrow">EKSPRESIF. TETAP TERARAH.</p>
          <h2 id="closing-title">
            Gerak punya peran.
            <br />
            <span>Bukan sekadar hiasan.</span>
          </h2>
          <div className="closing-bottom">
            <p>
              Ini laboratorium interaksi Flexbox. Seluruh visual karya merupakan
              ilustrasi editable berbasis CSS, bukan bukti proyek atau klien.
              Tidak ada formulir atau data yang dikirim.
            </p>
            <a
              href="#main"
              className="button button-outline"
              onClick={(e) => goTo('main', e)}
            >
              Kembali ke awal <Arrow />
            </a>
          </div>
          <footer>
            <span>FLEXBOX / MOTION STUDY 01</span>
            <span>REACT · GSAP · LENIS</span>
          </footer>
        </section>
      </main>

      <dialog
        ref={menuDialog}
        id="mobile-menu"
        className="menu-dialog"
        onCancel={() => setMenuOpen(false)}
        onClose={() => setMenuOpen(false)}
        aria-labelledby="menu-title"
        data-lenis-prevent
      >
        <div className="dialog-top">
          <span id="menu-title">FLEXBOX / NAVIGASI</span>
          <button
            type="button"
            onClick={closeMenu}
            autoFocus
            aria-label="Tutup menu"
          >
            Tutup ×
          </button>
        </div>
        <nav aria-label="Navigasi mobile">
          <a href="#karya" onClick={(e) => goTo('karya', e)}>
            Eksplorasi <Arrow />
          </a>
          <a href="#catatan" onClick={(e) => goTo('catatan', e)}>
            Tentang demo <Arrow />
          </a>
        </nav>
        <p>Different parts. One direction.</p>
      </dialog>
      <dialog
        ref={projectDialog}
        className="project-dialog"
        onClose={() => {
          setDialogOpen(false);
          lastProjectTrigger.current?.focus({ preventScroll: true });
        }}
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-description"
        data-lenis-prevent
      >
        <div className="dialog-top">
          <span>KONSEP / BUKAN PROYEK KLIEN</span>
          <button
            type="button"
            autoFocus
            onClick={closeProject}
            aria-label="Tutup detail konsep"
          >
            Tutup ×
          </button>
        </div>
        {selected !== null && (
          <>
            <div className="dialog-art">
              <ProjectArt project={projects[selected]} />
            </div>
            <p className="eyebrow">{projects[selected].type}</p>
            <h2 id="project-dialog-title">{projects[selected].name}</h2>
            <p id="project-dialog-description">
              {projects[selected].description}
            </p>
          </>
        )}
      </dialog>
      <div
        ref={cursor}
        className="custom-cursor"
        aria-hidden="true"
        data-visible="false"
      >
        +
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
