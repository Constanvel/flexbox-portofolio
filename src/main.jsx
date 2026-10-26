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
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/hanken-grotesk';
import './styles.css';
import PageSections from './PageSections';
import './editorial.css';
import './navbar.css';
import './sculpted.css';
import { canAnimate, showcaseScrollPosition } from './motion-policy';

gsap.registerPlugin(ScrollTrigger);

const pageRoutes = {
  main: '/',
  karya: '/karya',
  layanan: '/layanan',
  proses: '/layanan#proses',
  tim: '/tentang',
  faq: '/layanan#faq',
  kontak: '/kontak',
};
// Keep links from the former single-page site working.
const legacySection = window.location.hash.slice(1);
if (
  window.location.pathname === '/' &&
  pageRoutes[legacySection] &&
  legacySection !== 'main'
) {
  window.location.replace(pageRoutes[legacySection]);
}
const pathname = window.location.pathname.replace(/\/$/, '') || '/';
const currentPage =
  {
    '/': 'home',
    '/karya': 'karya',
    '/layanan': 'layanan',
    '/tentang': 'tentang',
    '/kontak': 'kontak',
  }[pathname] || 'not-found';
const routeFor = (id) => pageRoutes[id] || '/';

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
  const [headerHidden, setHeaderHidden] = useState(false);
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame;
    let directionAnchor = window.scrollY;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY);
        setScrolled(y > 120);
        if (y < 400) {
          setHeaderHidden(false);
          directionAnchor = y;
        } else if (Math.abs(y - directionAnchor) > 10) {
          setHeaderHidden(y > directionAnchor);
          directionAnchor = y;
        }
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogClosing, setDialogClosing] = useState(false);
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)');
  const finePointer = useMedia('(hover: hover) and (pointer: fine)');
  const forcedColors = useMedia('(forced-colors: active)');
  const enhancedPointer = false; // Keep the native cursor with smooth scrolling.
  const animated = canAnimate({ reducedMotion, paused: false });
  // Keep the work in the normal document flow on every screen.
  const horizontalEnabled = false;
  const overlayOpen = menuOpen || dialogOpen;

  useEffect(() => {
    const titles = {
      home: 'Website untuk usaha Anda',
      karya: 'Eksplorasi karya',
      layanan: 'Layanan & cara kerja',
      tentang: 'Tentang kami',
      kontak: 'Ceritakan proyekmu',
      'not-found': 'Halaman tidak ditemukan',
    };
    document.title = `${titles[currentPage]} — Flexbox`;
    if (window.location.hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(window.location.hash.slice(1))
          ?.scrollIntoView(),
      );
    }
  }, []);

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

  useLayoutEffect(() => {
    if (!dialogOpen || selected === null) return;
    const dialog = projectDialog.current;
    if (!animated) {
      if (dialogClosing) dialog.close();
      return;
    }
    const ctx = gsap.context(() => {
      if (dialogClosing) {
        gsap.to(dialog, {
          y: 14,
          autoAlpha: 0,
          scale: 0.985,
          duration: 0.18,
          ease: 'power2.in',
          onComplete: () => dialog.close(),
        });
      } else {
        const source = lastProjectTrigger.current?.getBoundingClientRect();
        const destination = dialog.getBoundingClientRect();
        const origin = source
          ? `${source.x + source.width / 2 - destination.x}px ${source.y + source.height / 2 - destination.y}px`
          : 'center';
        gsap.fromTo(
          dialog,
          { y: 22, scale: 0.96, autoAlpha: 0, transformOrigin: origin },
          { y: 0, scale: 1, autoAlpha: 1, duration: 0.38, ease: 'power3.out' },
        );
        gsap.from('.dialog-art, .project-dialog-copy', {
          y: 16,
          opacity: 0,
          stagger: 0.06,
          duration: 0.38,
          delay: 0.1,
          ease: 'power2.out',
        });
      }
    }, dialog);
    return () => ctx.revert();
  }, [dialogOpen, dialogClosing, selected, animated]);

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
      if (currentPage === 'home') {
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
      }
      gsap.utils.toArray('.section-reveal').forEach((element) => {
        gsap.from(element, {
          y: 22,
          opacity: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      });
      if (currentPage === 'home' || currentPage === 'karya')
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
      gsap.set(element, { clearProps: 'transform' });
    };
  }, [horizontalEnabled]);

  useEffect(() => {
    if (
      !enhancedPointer ||
      !animated ||
      !finePointer ||
      forcedColors ||
      overlayOpen
    )
      return;
    const el = cursor.current;
    const moveX = gsap.quickTo(el, 'x', { duration: 0.16, ease: 'power2.out' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.16, ease: 'power2.out' });
    const move = (event) => {
      moveX(event.clientX);
      moveY(event.clientY);
      const interactive = event.target.closest('a, button, summary');
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
    const destination = routeFor(id);
    const [destinationPath, hash] = destination.split('#');
    if (destinationPath !== pathname) {
      window.location.assign(destination);
      return;
    }
    const element = document.getElementById(
      hash || (id === 'main' ? 'main' : id),
    );
    if (!element) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const y =
      id === 'karya' && horizontal.current
        ? horizontal.current.start
        : Math.max(
            0,
            element.getBoundingClientRect().top +
              window.scrollY -
              (root.current.querySelector('.header')?.offsetHeight || 80) -
              32,
          );
    const focusTarget = () => element.focus({ preventScroll: true });
    if (lenis.current && animated)
      lenis.current.scrollTo(y, { onComplete: focusTarget });
    else {
      window.scrollTo({ top: y, behavior: 'instant' });
      focusTarget();
    }
    window.history.pushState(null, '', hash ? destination : destinationPath);
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
    setDialogClosing(false);
    lastProjectTrigger.current = trigger;
    setDialogOpen(true);
  }
  function closeProject() {
    if (dialogClosing) return;
    if (animated) setDialogClosing(true);
    else projectDialog.current.close();
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
    <div ref={root} className={`app ${animated ? 'motion-on' : 'motion-off'}`}>
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        Lewati navigasi
      </a>
      <header
        className={`header ${scrolled ? 'is-scrolled' : ''} ${headerHidden && !menuOpen ? 'is-hidden' : ''}`}
      >
        <a
          href="/"
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
          {[
            ['karya', 'Karya'],
            ['layanan', 'Layanan'],
            ['tim', 'Tentang'],
          ].map(([id, label]) => (
            <a
              key={id}
              href={routeFor(id)}
              aria-current={pathname === routeFor(id) ? 'page' : undefined}
              onClick={(e) => goTo(id, e)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <a
            className="nav-contact"
            href="/kontak"
            onClick={(e) => goTo('kontak', e)}
          >
            <span>Ceritakan proyekmu</span>
            <span className="nav-contact-arrow">
              <Arrow />
            </span>
          </a>
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
            <span>Menu +</span>
            <span className="menu-lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {currentPage === 'home' && (
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow hero-reveal">
                <span className="square" /> WEBSITE UNTUK UMKM & BISNIS LOKAL
              </p>
              <SplitTitle
                id="hero-title"
                lines={['Website yang', 'memahami', 'usaha Anda.']}
              />
              <p className="hero-description hero-reveal">
                Kami membantu usaha lokal menjelaskan produknya, membangun
                kepercayaan, dan memudahkan pelanggan menghubungi mereka.
              </p>
              <div className="hero-actions hero-reveal">
                <a
                  className="button button-primary"
                  href="/karya"
                  onClick={(e) => goTo('karya', e)}
                >
                  <span>Lihat karya</span>
                  <span className="button-orb">
                    <Arrow />
                  </span>
                </a>
                <a
                  className="text-link"
                  href="/kontak"
                  onClick={(e) => goTo('kontak', e)}
                >
                  Ceritakan usahamu <Arrow />
                </a>
              </div>
            </div>
            <div
              className="hero-landscape"
              aria-label="Eksplorasi visual modular Flexbox"
            >
              <div className="landscape-caption">
                <span>FLEXBOX / RUANG EKSPLORASI</span>
                <span>01 — 03</span>
              </div>
              <div className="landscape-grid" aria-hidden="true" />
              <div className="landscape-monogram" aria-hidden="true">
                f<span>.</span>
              </div>
              <div
                className="landscape-window window-profile"
                aria-hidden="true"
              >
                <div className="window-toolbar">
                  <span>ruang / cerita</span>
                  <span>● ● ●</span>
                </div>
                <span className="window-kicker">USAHA LOKAL, RUANG BARU.</span>
                <strong>
                  Cerita baik.
                  <br />
                  Tempat yang tepat.
                </strong>
                <div className="window-blocks">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="window-link">Kenali lebih dekat ↗</span>
              </div>
              <div
                className="landscape-window window-system"
                aria-hidden="true"
              >
                <div className="window-toolbar">
                  <span>flex / system</span>
                  <span>↗</span>
                </div>
                <div className="landscape-modules">
                  <span>f.</span>
                  <span>↗</span>
                  <span>+</span>
                  <span>○</span>
                </div>
              </div>
              <div className="landscape-note">
                <span className="square" /> Potongan berbeda. Satu arah.
              </div>
              <a className="landscape-discover" href="/karya">
                Jelajahi konsep <Arrow />
              </a>
            </div>
            <div className="hero-bottom hero-reveal">
              <span>Desain dengan arah. Teknologi dengan tujuan.</span>
              <a
                href="/karya"
                onClick={(e) => goTo('karya', e)}
                aria-label="Turun ke eksplorasi karya"
              >
                SCROLL TO EXPLORE <Arrow down />
              </a>
            </div>
          </section>
        )}

        {(currentPage === 'home' || currentPage === 'karya') && (
          <section
            id="karya"
            tabIndex={-1}
            aria-labelledby="work-title"
            className={`showcase ${currentPage === 'home' ? 'home-showcase' : 'work-page'} ${horizontalEnabled ? 'is-horizontal' : ''}`}
          >
            <div ref={stage} className="showcase-stage">
              <div className="showcase-heading">
                <div>
                  <p className="eyebrow">01 / EKSPLORASI TERPILIH</p>
                  <SplitTitle
                    id="work-title"
                    as={currentPage === 'karya' ? 'h1' : 'h2'}
                    lines={['Bukan sekadar', 'terlihat berbeda.']}
                  />
                </div>
                <div className="showcase-note">
                  <span className="concept-tag">
                    KONSEP, BUKAN PROYEK KLIEN
                  </span>
                  <p>
                    {currentPage === 'home'
                      ? 'Sekilas dari ruang eksplorasi kami.'
                      : 'Tiga kemungkinan. Satu cara berpikir:'}
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
                  {(currentPage === 'home'
                    ? projects.slice(0, 1)
                    : projects
                  ).map((project, index) => (
                    <article
                      className={`project-card ${project.className}`}
                      key={project.id}
                      data-project-index={index}
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
                          <span className="project-category">
                            {project.type}
                            <span>Proyek konsep</span>
                          </span>
                          <span
                            className="project-open-icon"
                            aria-hidden="true"
                          >
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
                        <p className="project-purpose">{project.text}</p>
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
                  href={currentPage === 'home' ? '/karya' : '/layanan'}
                  className="text-link"
                  onClick={(e) =>
                    goTo(currentPage === 'home' ? 'karya' : 'layanan', e)
                  }
                >
                  {currentPage === 'home'
                    ? 'Semua eksplorasi'
                    : 'Lihat layanan'}{' '}
                  <Arrow />
                </a>
              </div>
            </div>
          </section>
        )}
        {currentPage === 'not-found' && (
          <section className="route-intro">
            <p className="eyebrow">404 / HALAMAN TIDAK DITEMUKAN</p>
            <h1>Sepertinya salah ruang.</h1>
            <p>Halaman ini tidak tersedia. Mulai lagi dari beranda.</p>
            <a className="button button-primary" href="/">
              Kembali ke beranda <Arrow />
            </a>
          </section>
        )}
        <PageSections page={currentPage} goTo={goTo} />
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
          <a href="/karya" onClick={(e) => goTo('karya', e)}>
            Eksplorasi <Arrow />
          </a>
          <a href="/layanan" onClick={(e) => goTo('layanan', e)}>
            Layanan <Arrow />
          </a>
          <a href="/layanan#proses" onClick={(e) => goTo('proses', e)}>
            Proses <Arrow />
          </a>
          <a href="/tentang" onClick={(e) => goTo('tim', e)}>
            Tim <Arrow />
          </a>
          <a href="/kontak" onClick={(e) => goTo('kontak', e)}>
            Hubungi <Arrow />
          </a>
        </nav>
        <p>Different parts. One direction.</p>
      </dialog>
      <dialog
        ref={projectDialog}
        className="project-dialog"
        onCancel={(event) => {
          event.preventDefault();
          closeProject();
        }}
        onClose={() => {
          setDialogOpen(false);
          setDialogClosing(false);
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
            <div className="project-dialog-copy">
              <p className="eyebrow">{projects[selected].type}</p>
              <h2 id="project-dialog-title">{projects[selected].name}</h2>
              <p id="project-dialog-description">
                {projects[selected].description}
              </p>
              <dl className="project-facts">
                <div>
                  <dt>Fokus</dt>
                  <dd>{projects[selected].text}</dd>
                </div>
                <div>
                  <dt>Lingkup konsep</dt>
                  <dd>
                    Struktur konten, arah visual, dan interaksi responsif.
                  </dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>
                    Studi desain internal. Tidak memiliki hasil bisnis
                    terverifikasi.
                  </dd>
                </div>
              </dl>
            </div>
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
