import { services, stages, questions, titles } from '../data/content';
import '../pages.css';

export default function Services() {
  return (
    <div className="support-page services-page">
      <header className="container page-intro support-intro" data-reveal>
        <p className="eyebrow">Layanan</p>
        <h1>{titles.services}</h1>
        <p>
          Mulai dari informasi yang perlu diketahui pelanggan Anda. Pilih
          kebutuhan yang paling dekat, lalu kita tentukan lingkupnya bersama.
        </p>
        <nav className="support-jump-links" aria-label="Bagian layanan">
          <a className="text-link" href="#layanan">
            Pilihan layanan <span aria-hidden="true">↓</span>
          </a>
          <a className="text-link" href="#proses">
            Proses kerja <span aria-hidden="true">↓</span>
          </a>
          <a className="text-link" href="#faq">
            Pertanyaan umum <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </header>
      <section
        className="container section"
        id="layanan"
        aria-label="Pilihan layanan"
      >
        <div className="service-editorial-list">
          {services.map((service) => (
            <article
              className="service-editorial-row"
              key={service.number}
              data-reveal
            >
              <span className="support-index">{service.number}</span>
              <div className="service-editorial-heading">
                <h2>{service.title}</h2>
                <p>{service.audience}</p>
              </div>
              <div className="service-editorial-detail">
                <p>{service.need}</p>
                <h3>Yang disiapkan untuk Anda</h3>
                <ul>
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="support-note">{service.scope}</p>
                <a className="text-link" href="/kontak">
                  Bahas {service.title.toLowerCase()}{' '}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        className="support-band section"
        id="proses"
        aria-labelledby="process-title"
      >
        <div className="container">
          <div className="support-section-heading" data-reveal>
            <p className="eyebrow">Proses kerja</p>
            <h2 id="process-title">Jelas dari percakapan pertama.</h2>
            <p>
              Setiap tahap memberi Anda ruang untuk memahami, meninjau, dan
              menyetujui langkah berikutnya.
            </p>
          </div>
          <ol className="support-stages">
            {stages.map((stage) => (
              <li key={stage.number} data-reveal>
                <span className="support-index">{stage.number}</span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        className="container section support-faq"
        id="faq"
        aria-labelledby="faq-title"
      >
        <div className="support-section-heading" data-reveal>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title">Hal yang mungkin ingin Anda tanyakan.</h2>
          <a className="text-link" href="/kontak">
            Punya pertanyaan lain? <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="support-faq-list" data-reveal>
          {questions.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span className="faq-indicator" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="container support-bottom-cta" data-reveal>
        <div>
          <p className="eyebrow">Langkah berikutnya</p>
          <h2>Belum tahu harus mulai dari mana?</h2>
          <p>
            Ceritakan usaha Anda dan informasi yang ingin Anda sampaikan. Tidak
            perlu menyiapkan brief yang lengkap.
          </p>
        </div>
        <a className="button" href="/kontak">
          Ceritakan kebutuhan Anda <span aria-hidden="true">↗</span>
        </a>
      </section>
    </div>
  );
}
