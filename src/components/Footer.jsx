import Button from './Button';
import { navigation } from './Navbar';
export default function Footer({ scrollTo }) {
  return (
    <footer className="footer">
      <div className="footer-panel">
        <button className="back-top" onClick={() => scrollTo(0)}>
          Kembali ke atas <span aria-hidden="true">↑</span>
        </button>
        <div className="footer-main">
          <div>
            <p className="eyebrow">Mulai dari kebutuhan Anda</p>
            <h2>Sedang merencanakan website?</h2>
            <Button href="/kontak">Diskusikan proyek</Button>
          </div>
          <nav aria-label="Navigasi footer">
            {navigation.map(([href, label]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <a className="footer-wordmark" href="/">
            Flexbox.
          </a>
          <p>Desain yang jelas. Pengembangan yang terarah.</p>
          <span>© {new Date().getFullYear()} Flexbox</span>
        </div>
      </div>
    </footer>
  );
}
