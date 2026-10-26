import { useState } from 'react';
import './sections.css';
import './pages.css';
import './sculpted-footer.css';

const services = [
  {
    title: 'Website bisnis',
    description:
      'Perkenalkan usaha dengan cerita yang jelas. Dari profil bisnis hingga halaman layanan, bantu calon pelanggan menemukan alasan untuk menghubungi Anda.',
    detail: 'Profil usaha · Landing page · Informasi layanan',
  },
  {
    title: 'Katalog digital',
    description:
      'Beri produk ruang untuk menjelaskan dirinya. Susun foto, spesifikasi, dan kategori agar pelanggan lebih mudah memilih sebelum bertanya.',
    detail: 'Katalog produk · Kategori · Alur pemesanan',
  },
  {
    title: 'Pengembangan',
    description:
      'Kembangkan yang sudah berjalan. Rapikan tampilan, perbaiki pengalaman di ponsel, atau tambahkan fitur sesuai kebutuhan usaha.',
    detail: 'Pembaruan website · Fitur khusus · Optimasi',
  },
];

const stages = [
  {
    title: 'Dengarkan',
    description:
      'Mulai dari usaha Anda: siapa pelanggannya, apa yang ingin disampaikan, dan masalah apa yang perlu diselesaikan.',
  },
  {
    title: 'Susun arah',
    description:
      'Sepakati struktur halaman, kebutuhan konten, dan arah visual. Ruang lingkup serta urutan kerja dibuat jelas sebelum membangun.',
  },
  {
    title: 'Bangun & uji',
    description:
      'Wujudkan desain menjadi website. Tinjau bersama, rapikan detail, lalu uji tampilan dan fungsi di berbagai ukuran layar.',
  },
  {
    title: 'Luncurkan',
    description:
      'Periksa konten terakhir, siapkan publikasi, dan bahas cara mengelola website agar langkah berikutnya tetap jelas.',
  },
];

const questions = [
  {
    question: 'Belum punya materi lengkap. Bisa mulai dari mana?',
    answer:
      'Mulai dari penjelasan singkat tentang usaha, produk atau layanan, dan tujuan website. Dari sana, kita bisa menyusun daftar konten yang dibutuhkan. Foto, tulisan, dan identitas visual yang belum tersedia dibahas sejak awal.',
  },
  {
    question: 'Berapa biaya dan waktu pengerjaannya?',
    answer:
      'Keduanya bergantung pada jumlah halaman, kesiapan materi, dan fitur yang diperlukan. Ruang lingkup, estimasi biaya, serta jadwal perlu disepakati setelah kebutuhan dipahami, bukan ditentukan dari satu paket untuk semua usaha.',
  },
  {
    question: 'Bagaimana dengan pengelolaan setelah website terbit?',
    answer:
      'Kebutuhan pembaruan konten, panduan penggunaan, dan dukungan setelah peluncuran dibahas dalam ruang lingkup proyek. Domain, hosting, serta layanan pihak ketiga juga perlu diperjelas agar tanggung jawab dan biayanya tidak membingungkan.',
  },
];

function SectionLabel({ children }) {
  return <p className="eyebrow ps-label">{children}</p>;
}

const pageIntros = {
  layanan: {
    eyebrow: 'Layanan / Dari kebutuhan ke arah',
    title: 'Website dengan tujuan yang jelas.',
    description:
      'Pilih kebutuhan Anda. Kita susun arah, proses, dan langkah berikutnya bersama.',
  },
  tentang: {
    eyebrow: 'Tentang / Di balik Flexbox',
    title: 'Partner berpikir. Teman membangun.',
    description:
      'Studio digital dengan ruang untuk mendengar, berdiskusi, dan menerjemahkan cerita usaha Anda.',
  },
  kontak: {
    eyebrow: 'Kontak / Percakapan pertama',
    title: 'Mulai dengan cerita Anda.',
    description:
      'Tidak perlu brief yang sempurna. Susun kebutuhan Anda lewat pratinjau pesan di bawah.',
  },
};

export default function PageSections({ page = 'home', goTo }) {
  const intro = pageIntros[page];
  const [preview, setPreview] = useState(null);

  function previewMessage(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPreview({
      name: String(data.get('name') || '').trim(),
      contact: String(data.get('contact') || '').trim(),
      needs: String(data.get('needs') || '').trim(),
    });
  }

  return (
    <div className="page-sections">
      {intro && (
        <header className="ps-page-intro">
          <SectionLabel>{intro.eyebrow}</SectionLabel>
          <h1>{intro.title}</h1>
          <p>{intro.description}</p>
        </header>
      )}

      {page === 'home' && (
        <section
          className="ps-section ps-home-preview"
          aria-labelledby="preview-title"
        >
          <header className="ps-heading section-reveal">
            <div>
              <SectionLabel>02 / Ruang untuk usaha Anda</SectionLabel>
              <h2 id="preview-title">Kebutuhan Anda. Titik berangkat kita.</h2>
            </div>
            <a className="text-link" href="/layanan">
              Jelajahi layanan <span aria-hidden="true">↗</span>
            </a>
          </header>
          <div className="ps-preview-services">
            {services.map((service, index) => (
              <a
                href="/layanan"
                className="ps-preview-service section-reveal"
                key={service.title}
              >
                <span className="ps-index">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <div className="ps-home-next section-reveal">
            <div>
              <SectionLabel>Percakapan dulu. Website kemudian.</SectionLabel>
              <p>
                Kenali cara kami berpikir, lalu ceritakan apa yang ingin Anda
                bangun.
              </p>
            </div>
            <nav aria-label="Kenali Flexbox">
              <a className="text-link" href="/tentang">
                Tentang Flexbox <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="/kontak">
                Mulai percakapan <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </div>
        </section>
      )}

      {page === 'layanan' && (
        <>
          <section
            id="layanan"
            className="ps-section ps-services"
            tabIndex={-1}
            aria-labelledby="services-title"
          >
            <div className="ps-services-panel">
              <header className="ps-heading section-reveal">
                <div>
                  <SectionLabel>02 / Layanan</SectionLabel>
                  <h2 id="services-title">
                    Kebutuhan berbeda.
                    <br />
                    Arah yang tepat.
                  </h2>
                </div>
                <p className="ps-intro">
                  Bukan sekadar hadir di internet. Website yang membantu orang
                  memahami usaha Anda dan tahu langkah selanjutnya.
                </p>
              </header>
              <div className="ps-service-grid">
                {services.map((service, index) => (
                  <article
                    className="ps-service-card section-reveal"
                    key={service.title}
                  >
                    <span className="ps-index" aria-hidden="true">
                      / 0{index + 1}
                    </span>
                    <h3>{service.title}</h3>
                    <div className="ps-service-copy">
                      <p>{service.description}</p>
                      <p className="ps-service-detail">{service.detail}</p>
                    </div>
                    <a className="text-link ps-service-link" href="/kontak">
                      Bahas {service.title.toLowerCase()}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="proses"
            className="ps-section ps-process"
            tabIndex={-1}
            aria-labelledby="process-title"
          >
            <header className="ps-heading section-reveal">
              <div>
                <SectionLabel>03 / Cara kerja</SectionLabel>
                <h2 id="process-title">Satu meja. Arah yang sama.</h2>
              </div>
              <p className="ps-intro">
                Ada ruang untuk bertanya, meninjau, dan menyepakati. Dari
                percakapan pertama sampai website siap digunakan.
              </p>
            </header>
            <ol className="ps-process-list">
              {stages.map((stage, index) => (
                <li className="ps-process-row section-reveal" key={stage.title}>
                  <span className="ps-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </li>
              ))}
            </ol>
          </section>
        </>
      )}

      {page === 'tentang' && (
        <section
          id="tim"
          className="ps-section ps-team"
          tabIndex={-1}
          aria-labelledby="team-title"
        >
          <div className="ps-team-brand section-reveal">
            <span className="ps-index">Flexbox / Studio digital</span>
            <p className="ps-team-statement">
              Ide Anda.
              <br />
              Ruang kita.
            </p>
            <div className="ps-team-signature">
              <span>Percakapan dulu. Website kemudian.</span>
              <span aria-hidden="true">f.</span>
            </div>
          </div>
          <div className="ps-team-copy section-reveal">
            <SectionLabel>04 / Di balik Flexbox</SectionLabel>
            <h2 id="team-title">Tim kecil. Ruang diskusi terbuka.</h2>
            <p>
              Anda paling mengenal usaha Anda. Kami membantu menerjemahkannya
              menjadi pengalaman digital yang mudah dipahami dan nyaman
              digunakan.
            </p>
            <p>
              Kami memilih percakapan yang langsung, keputusan desain yang punya
              alasan, dan proses yang bisa diikuti bersama. Tidak perlu datang
              dengan istilah teknis. Mulai dengan cerita Anda.
            </p>
            <a className="text-link ps-team-link" href="/kontak">
              Mulai percakapan <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      )}

      {page === 'layanan' && (
        <section
          id="faq"
          className="ps-section ps-faq"
          tabIndex={-1}
          aria-labelledby="faq-title"
        >
          <header className="section-reveal">
            <SectionLabel>05 / Pertanyaan umum</SectionLabel>
            <h2 id="faq-title">Sebelum kita mulai.</h2>
            <p className="ps-intro">
              Beberapa hal yang mungkin sedang Anda pikirkan.
            </p>
          </header>
          <div className="ps-faq-list">
            {questions.map(({ question, answer }) => (
              <details className="ps-faq-item section-reveal" key={question}>
                <summary>
                  <h3>{question}</h3>
                  <span className="ps-faq-indicator" aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {page === 'kontak' && (
        <section
          id="kontak"
          className="ps-section ps-contact"
          tabIndex={-1}
          aria-labelledby="contact-title"
        >
          <div className="ps-contact-copy section-reveal">
            <SectionLabel>06 / Mulai dari cerita</SectionLabel>
            <h2 id="contact-title">
              Usaha Anda punya cerita. <span>Mari kita bawa ke website.</span>
            </h2>
            <p>
              Tuliskan usaha Anda, apa yang dibutuhkan, dan apa yang ingin
              dicapai. Tidak harus berupa brief yang sempurna.
            </p>
          </div>
          <form
            className="ps-contact-form section-reveal"
            onSubmit={previewMessage}
            onChange={() => setPreview(null)}
            aria-labelledby="contact-form-title"
            aria-describedby="contact-form-note"
          >
            <h3 id="contact-form-title">Susun pesan Anda</h3>
            <p id="contact-form-note" className="ps-form-note">
              Formulir demo — hanya pratinjau lokal. Pesan tidak dikirim ke
              siapa pun dan tidak disimpan permanen. Semua kolom wajib diisi.
            </p>
            <div className="ps-field">
              <label htmlFor="contact-name">Nama</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="off"
                maxLength={120}
                required
              />
            </div>
            <div className="ps-field">
              <label htmlFor="contact-address">Email atau nomor WhatsApp</label>
              <input
                id="contact-address"
                name="contact"
                type="text"
                autoComplete="off"
                maxLength={160}
                aria-describedby="contact-address-hint"
                required
              />
              <span id="contact-address-hint" className="ps-field-hint">
                Pilih salah satu. Contoh: email Anda atau nomor dengan kode
                negara.
              </span>
            </div>
            <div className="ps-field">
              <label htmlFor="contact-needs">Ceritakan kebutuhan Anda</label>
              <textarea
                id="contact-needs"
                name="needs"
                rows={4}
                maxLength={3000}
                required
              />
            </div>
            <button type="submit" className="button ps-preview-button">
              Pratinjau pesan <span aria-hidden="true">↗</span>
            </button>
            <p className="ps-form-status" role="status" aria-atomic="true">
              {preview
                ? 'Pratinjau lokal tersedia di bawah. Pesan belum dikirim dan tidak akan dikirim oleh formulir ini.'
                : ''}
            </p>
            {preview && (
              <div className="ps-message-preview">
                <h3>Pratinjau pesan</h3>
                <dl>
                  <dt>Nama</dt>
                  <dd>{preview.name}</dd>
                  <dt>Email atau WhatsApp</dt>
                  <dd>{preview.contact}</dd>
                  <dt>Kebutuhan</dt>
                  <dd>{preview.needs}</dd>
                </dl>
                <p>Pratinjau ini hilang saat halaman dimuat ulang.</p>
              </div>
            )}
          </form>
        </section>
      )}

      <footer className="sculpted-footer" aria-labelledby="footer-title">
        <div className="sculpted-footer__cutout">
          <button
            className="sculpted-footer__top"
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                  .matches
                  ? 'instant'
                  : 'smooth',
              })
            }
          >
            Kembali ke atas <span aria-hidden="true">↑</span>
          </button>
        </div>
        <div className="sculpted-footer__content">
          <p className="sculpted-footer__eyebrow">
            Percakapan dulu. Website kemudian.
          </p>
          <div className="sculpted-footer__invitation">
            <h2 id="footer-title">
              Ada ide?
              <br />
              Beri ruang untuk tumbuh.
            </h2>
            <a className="sculpted-footer__cta" href="/kontak">
              Mulai percakapan
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="sculpted-footer__details">
            <p>Website yang berangkat dari cerita usaha Anda.</p>
            <nav aria-label="Navigasi footer">
              {[
                ['/', 'Beranda'],
                ['/karya', 'Karya'],
                ['/layanan', 'Layanan'],
                ['/tentang', 'Tentang'],
                ['/kontak', 'Kontak'],
              ].map(([href, label]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <p className="sculpted-footer__wordmark">
            Flexbox<span aria-hidden="true">.</span>
          </p>
          <p className="sculpted-footer__signature">
            Desain yang jelas. Percakapan yang terbuka.
          </p>
        </div>
      </footer>
    </div>
  );
}
