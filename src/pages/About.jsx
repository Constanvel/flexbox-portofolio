import { titles, roles } from '../data/content';
import '../pages.css';

const principles = [
  [
    'Isi sebelum hiasan',
    'Informasi penting ditaruh di tempat yang mudah ditemukan. Pengunjung paham penawaran Anda tanpa menebak.',
  ],
  [
    'Cepat & nyaman di ponsel',
    'Kebanyakan pelanggan membuka dari HP. Ukuran teks, tombol, dan kecepatan muat jadi prioritas.',
  ],
  [
    'Lingkup yang terbuka',
    'Fitur, revisi, biaya, dan tanggung jawab konten dibahas di awal—bukan diasumsikan.',
  ],
];

export default function About() {
  return (
    <div className="support-page about-page">
      <header className="container page-intro support-intro" data-reveal>
        <p className="eyebrow">Tentang Flexbox</p>
        <h1>{titles.about}</h1>
        <p>
          Kami tim pengembang website yang fokus membantu UMKM dan usaha lokal
          tampil profesional di internet—dari struktur konten sampai website
          yang siap dipakai pelanggan.
        </p>
      </header>

      <section className="container section" aria-labelledby="team-title">
        <div className="support-section-heading" data-reveal>
          <p className="eyebrow">Tim</p>
          <h2 id="team-title">Siapa mengerjakan apa.</h2>
        </div>
        <div className="role-grid">
          {roles.map((item) => (
            <article className="role-card" key={item.role} data-reveal>
              <h3>{item.role}</h3>
              <p>{item.focus}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="support-band section"
        aria-labelledby="principles-title"
      >
        <div className="container">
          <div className="support-section-heading" data-reveal>
            <p className="eyebrow">Prinsip</p>
            <h2 id="principles-title">Cara kami mengambil keputusan.</h2>
          </div>
          <div className="about-principles">
            {principles.map(([title, copy], i) => (
              <article key={title} data-reveal>
                <span className="support-index">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container support-bottom-cta" data-reveal>
        <div>
          <p className="eyebrow">Langkah berikutnya</p>
          <h2>Apa yang perlu diketahui pelanggan Anda?</h2>
          <p>
            Ceritakan usaha Anda, lalu kita bahas bentuk website yang masuk akal
            untuk kebutuhan tersebut.
          </p>
        </div>
        <a className="button" href="/kontak">
          Bahas kebutuhan Anda <span aria-hidden="true">↗</span>
        </a>
      </section>
    </div>
  );
}
