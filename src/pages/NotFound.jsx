import { titles } from '../data/content';
import '../pages.css';

export default function NotFound() {
  return (
    <section className="container section support-page not-found" data-reveal>
      <p className="eyebrow">404 / Alamat tidak tersedia</p>
      <h1>{titles.notFound}</h1>
      <p>
        Alamatnya mungkin berubah atau tidak lengkap. Anda bisa kembali ke
        beranda atau melihat layanan Flexbox.
      </p>
      <div className="support-jump-links">
        <a className="button" href="/">
          Kembali ke beranda <span aria-hidden="true">↗</span>
        </a>
        <a className="text-link" href="/layanan">
          Lihat layanan <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
