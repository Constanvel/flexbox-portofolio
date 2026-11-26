import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectDialog from './components/ProjectDialog';
import Home from './pages/Home';
import Work from './pages/Work';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import useSmoothScroll from './hooks/useSmoothScroll';
import useReveal from './hooks/useReveal';
const legacy = {
  karya: '/karya',
  layanan: '/layanan',
  proses: '/layanan#proses',
  faq: '/layanan#faq',
  tim: '/tentang',
  kontak: '/kontak',
};
const pathname = window.location.pathname.replace(/\/$/, '') || '/';
if (pathname === '/' && legacy[window.location.hash.slice(1)])
  window.location.replace(legacy[window.location.hash.slice(1)]);
const SITE = 'https://flexbox-portofolio.vercel.app';
// [judul tab, deskripsi untuk Google dan pratinjau share]
const meta = {
  '/': [
    'Website yang jelas untuk usaha Anda',
    'Tim kecil yang membuat website bisnis, katalog produk, dan pembaruan website untuk UMKM dan usaha lokal.',
  ],
  '/karya': [
    'Karya kami',
    'Website yang sudah kami bangun: SAGARA, SMK Telkom Purwokerto, Menfess Spenthree, FlexBoard, dan FlexKas.',
  ],
  '/layanan': [
    'Layanan & cara kerja',
    'Website bisnis, katalog produk, dan pembaruan website. Lingkup, biaya, dan tahapannya dibahas di awal.',
  ],
  '/tentang': [
    'Tim Flexbox',
    'Kenali tim Flexbox: Adit, Rainer, Fahkri, Bima, dan Kiandra, serta cara kami mengambil keputusan.',
  ],
  '/kontak': [
    'Mari bahas website Anda',
    'Ceritakan usaha Anda lewat WhatsApp 0851-3697-1361, email admin@flexboxstudio.site, atau Instagram @flexbox.dev.',
  ],
};
export default function App() {
  const root = useRef(null);
  const [menu, setMenu] = useState(false);
  const [selection, setSelection] = useState(null);
  const { reduced, scrollTo } = useSmoothScroll(menu || Boolean(selection));
  useReveal(root, reduced);
  useEffect(() => {
    const [title, description] = meta[pathname] || ['Halaman tidak ditemukan'];
    document.title = `${title} — Flexbox`;
    const set = (selector, value) =>
      value && document.querySelector(selector)?.setAttribute('content', value);
    set('meta[name="description"]', description);
    set('meta[property="og:description"]', description);
    set('meta[property="og:title"]', document.title);
    set('meta[property="og:url"]', SITE + pathname);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', SITE + pathname);
    if (!meta[pathname] && !document.querySelector('meta[name="robots"]'))
      document.head.insertAdjacentHTML(
        'beforeend',
        '<meta name="robots" content="noindex" />',
      );
  }, []);
  useEffect(() => {
    const handle = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (
        !link ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const hash = link.getAttribute('href');
      if (hash.length < 2 || !document.getElementById(hash.slice(1))) return;
      event.preventDefault();
      scrollTo(hash);
      window.history.pushState(null, '', hash);
    };
    document.addEventListener('click', handle);
    return () => document.removeEventListener('click', handle);
  }, [scrollTo]);
  const onOpen = (project, trigger) => setSelection({ project, trigger });
  const pages = {
    '/': <Home onOpen={onOpen} />,
    '/karya': <Work onOpen={onOpen} />,
    '/layanan': <Services />,
    '/tentang': <About />,
    '/kontak': <Contact />,
  };
  return (
    <div ref={root}>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main').focus();
          scrollTo(0);
        }}
      >
        Lewati navigasi
      </a>
      <Navbar pathname={pathname} open={menu} setOpen={setMenu} />
      <main id="main" tabIndex={-1}>
        {pages[pathname] || <NotFound />}
      </main>
      <Footer scrollTo={scrollTo} />
      {selection && (
        <ProjectDialog
          key={selection.project.id}
          {...selection}
          reduced={reduced}
          onClose={() => setSelection(null)}
        />
      )}
    </div>
  );
}
