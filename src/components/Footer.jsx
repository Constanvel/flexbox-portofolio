import { navigation } from './Navbar';
import { contact } from '../data/content';

const channels = [
  contact.whatsapp && ['WhatsApp', `https://wa.me/${contact.whatsapp}`],
  contact.email && ['Email', `mailto:${contact.email}`],
  contact.instagram && [
    'Instagram',
    `https://instagram.com/${contact.instagram.replace(/^@/, '')}`,
  ],
].filter(Boolean);

export default function Footer({ scrollTo }) {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <p className="footer-lead">
          Website bisnis, katalog produk, dan pembaruan website untuk UMKM dan
          usaha lokal.
        </p>
        <nav className="footer-col" aria-label="Navigasi footer">
          <p className="label">Halaman</p>
          {navigation.map(([href, label]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="footer-col">
          <p className="label">Kontak</p>
          <a href="/kontak">Formulir kontak</a>
          {channels.map(([label, href]) => (
            <a href={href} key={label} target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
          <a href="/layanan#faq">Pertanyaan umum</a>
          <button className="back-top" onClick={() => scrollTo(0)}>
            Kembali ke atas <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Flexbox</span>
        <span>Tim pengembang website untuk UMKM.</span>
      </div>
      <p className="footer-wordmark" aria-hidden="true">
        Flexbox
      </p>
    </footer>
  );
}
