import projects from '../data/projects';
import { services, stages, questions } from '../data/content';
import LineTitle from '../components/LineTitle';
import Button from '../components/Button';
import ProjectCard from '../components/ProjectCard';
import ProjectPreview from '../components/previews/ProjectPreview';

const photos = [
  [
    '/images/process-phone.jpg',
    'Tangan mengetik di laptop dengan ponsel di sampingnya',
  ],
  [
    '/images/process-sketch.jpg',
    'Dinding penuh catatan tulisan tangan di atas meja kerja',
  ],
];

export default function Home({ onOpen }) {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="label" data-hero-support>
              Flexbox · Studio website untuk UMKM
            </p>
            <LineTitle
              id="hero-title"
              lines={['Website yang jelas', 'untuk usaha Anda.']}
            />
            <div className="hero-foot" data-hero-support>
              <p>
                Kami menyusun informasi usaha Anda menjadi website yang mudah
                dibaca, cepat dibuka di ponsel, dan memudahkan pelanggan
                menghubungi Anda.
              </p>
              <div className="hero-actions">
                <Button href="/kontak">Hubungi kami</Button>
                <a className="button-outline" href="/karya">
                  Lihat eksplorasi
                </a>
              </div>
            </div>
          </div>
          <figure className="hero-visual" data-hero-visual>
            <div className="device-laptop">
              <div className="device-bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="hero-preview">
                <ProjectPreview project={projects[0]} />
                {projects[0].annotations.map((note, i) => (
                  <span
                    className="fig-pin"
                    key={note.text}
                    style={{ left: `${note.x}%`, top: `${note.y}%` }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
            <div className="device-phone">
              <ProjectPreview project={projects[0]} mobile />
            </div>
            <figcaption>
              <span className="fig-title">
                <span className="project-code">Fig. 01</span> Studi konsep ·{' '}
                {projects[0].name}
              </span>
              <ol className="fig-notes">
                {projects[0].annotations.map((note) => (
                  <li key={note.text}>{note.text}</li>
                ))}
              </ol>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className="section container studio"
        aria-labelledby="studio-title"
      >
        <figure className="studio-media media-card" data-reveal="media">
          <img
            src="/images/process-meeting.jpg"
            alt="Beberapa orang bekerja bersama di depan laptop"
            width="2048"
            height="1536"
            loading="lazy"
          />
        </figure>
        <div className="studio-copy" data-reveal>
          <p className="label" data-index="01">
            Tentang studio
          </p>
          <h2 id="studio-title">
            Untuk kedai, toko, dan jasa yang ingin mudah ditemukan.
          </h2>
          <p>
            Pelanggan Anda membuka website untuk mencari jawaban: apa yang Anda
            tawarkan, di mana Anda berada, dan bagaimana cara menghubungi Anda.
            Kami memastikan jawaban itu ada di tempat yang tepat.
          </p>
          <Button href="/tentang" secondary>
            Kenali cara kerja kami
          </Button>
        </div>
      </section>

      <section
        className="section container home-services"
        aria-labelledby="services-title"
      >
        <header className="section-heading" data-reveal>
          <div>
            <p className="label" data-index="02">
              Layanan
            </p>
            <h2 id="services-title">Tiga cara kami membantu.</h2>
          </div>
          <Button href="/layanan" secondary>
            Detail layanan
          </Button>
        </header>
        <div className="service-cards">
          {services.map((service) => (
            <article className="service-card" key={service.number} data-reveal>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.audience}</p>
            </article>
          ))}
          <div className="service-card-dark-wrap" data-reveal>
            <a className="service-card service-card-dark" href="/kontak">
              <span className="service-number">04</span>
              <h3>Belum yakin yang mana?</h3>
              <p>Ceritakan usaha Anda. Kami bantu memilih.</p>
            </a>
          </div>
        </div>
      </section>

      <section className="explorations" aria-labelledby="work-title">
        <div className="container">
          <header className="section-heading" data-reveal>
            <div>
              <p className="label" data-index="03">
                Eksplorasi
              </p>
              <h2 id="work-title">Studi desain yang kami buat sendiri.</h2>
              <p className="concept-note">
                Ini eksplorasi, bukan proyek klien.
              </p>
            </div>
            <Button href="/karya" secondary>
              Semua studi desain
            </Button>
          </header>
          <div className="project-fan">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={onOpen} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="section container process"
        aria-labelledby="process-title"
      >
        <div className="process-media" data-reveal="media">
          {photos.map(([src, alt]) => (
            <figure className="media-card" key={src}>
              <img src={src} alt={alt} loading="lazy" />
            </figure>
          ))}
        </div>
        <div className="process-copy">
          <header data-reveal>
            <p className="label" data-index="04">
              Proses
            </p>
            <h2 id="process-title">Jelas dari percakapan pertama.</h2>
          </header>
          <ol className="process-steps">
            {stages.map((stage) => (
              <li key={stage.number} data-reveal>
                <span className="service-number">{stage.number}</span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section container home-faq"
        aria-labelledby="home-faq-title"
      >
        <header data-reveal>
          <p className="label" data-index="05">
            Pertanyaan umum
          </p>
          <h2 id="home-faq-title">Yang sering ditanyakan.</h2>
        </header>
        <div className="faq-list" data-reveal>
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

      <section className="container closing" aria-labelledby="closing-title">
        <div className="closing-inner" data-reveal>
          <p className="label">Mulai sekarang</p>
          <h2 id="closing-title">
            Ceritakan usaha Anda. Kami bantu susun websitenya.
          </h2>
          <p>
            Tidak perlu brief lengkap. Cerita singkat tentang usaha Anda sudah
            cukup.
          </p>
          <Button href="/kontak">Hubungi kami</Button>
        </div>
      </section>
    </>
  );
}
