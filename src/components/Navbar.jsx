import { useRef } from 'react';
import useNavbarScroll from '../hooks/useNavbarScroll';
import Button from './Button';
export const navigation = [
  ['/', 'Beranda'],
  ['/karya', 'Karya'],
  ['/layanan', 'Layanan'],
  ['/tentang', 'Tentang'],
  ['/kontak', 'Kontak'],
];
export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Flexbox — Beranda">
      <svg viewBox="0 0 48 48" width="35" height="35" aria-hidden="true">
        <defs>
          <linearGradient id="brand-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2f8cff" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path d="M5 14 24 3l19 11-19 11Z" fill="#e9eef5" />
        <path d="m5 14 19 11v21L5 35Z" fill="#1b2433" />
        <path d="m24 25 19-11v21L24 46Z" fill="url(#brand-g)" />
      </svg>
      <span>
        Flexbox<span className="brand-dot">.</span>
      </span>
    </a>
  );
}
export default function Navbar({ pathname, open, setOpen }) {
  const { compact, hidden } = useNavbarScroll();
  const dialog = useRef(null);
  const trigger = useRef(null);
  const close = () => dialog.current?.close();
  return (
    <>
      <header
        className={`header ${compact ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''}`}
      >
        <div className="nav-inner">
          <Brand />
          <nav aria-label="Navigasi utama">
            {navigation.slice(1, 4).map(([href, label]) => (
              <a
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <Button href="/kontak">Mulai proyek</Button>
          <button
            ref={trigger}
            className="menu-trigger"
            aria-haspopup="dialog"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => {
              dialog.current.showModal();
              setOpen(true);
            }}
          >
            Menu <span aria-hidden="true">+</span>
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="menu-dialog"
        aria-labelledby="menu-title"
        data-lenis-prevent
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="menu-top">
          <p id="menu-title" className="eyebrow">
            Flexbox / Navigasi
          </p>
          <button
            className="close-button"
            onClick={close}
            aria-label="Tutup menu"
          >
            ×
          </button>
        </div>
        <nav aria-label="Navigasi seluler">
          {navigation.map(([href, label], i) => (
            <a
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
            >
              <span className="eyebrow">0{i + 1}</span>
              {label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <p>Desain & pengembangan website.</p>
      </dialog>
    </>
  );
}
