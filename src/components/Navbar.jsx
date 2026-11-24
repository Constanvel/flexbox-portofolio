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
      <span className="brand-mark" aria-hidden="true" />
      Flexbox
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
            {navigation.slice(1, 4).map(([href, label], i) => (
              <a
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
              >
                <span className="nav-index" aria-hidden="true">
                  0{i + 1}
                </span>
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
              <span className="menu-index">0{i + 1}</span>
              {label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <p className="menu-note">Desain & pengembangan website.</p>
      </dialog>
    </>
  );
}
