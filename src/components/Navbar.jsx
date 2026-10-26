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
        <path d="M5 14 24 3l19 11-19 11Z" fill="#d5dff0" />
        <path d="m5 14 19 11v21L5 35Z" fill="#454a54" />
        <path d="m24 25 19-11v21L24 46Z" fill="#3f83c5" />
        <path d="m14 9 19 11-9 5L5 14Z" fill="#050505" />
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
          <Button href="/kontak">Diskusikan proyek</Button>
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
