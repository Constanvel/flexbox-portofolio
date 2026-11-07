import projects from '../data/projects';
import { services, stages, questions } from '../data/content';
import LineTitle from '../components/LineTitle';
import Button from '../components/Button';
import ProjectCard from '../components/ProjectCard';

const photos = [
  [
    '/images/process-meeting.jpg',
    'Beberapa orang bekerja bersama di depan laptop',
    'is-meeting',
  ],
  [
    '/images/process-sketch.jpg',
    'Dinding penuh catatan tulisan tangan di atas meja kerja',
    'is-sketch',
  ],
  [
    '/images/process-phone.jpg',
    'Tangan mengetik di laptop dengan ponsel di sampingnya',
    'is-phone',
  ],
];

export default function Home({ onOpen }) {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-inner">
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
      </section>

      <section
        className="section container studio"
        aria-labelledby="studio-title"
      >
        <figure className="studio-media media-card" data-reveal="media">
          <img
            src="/images/studio-workspace.jpg"
            alt="Meja dan kursi di dekat jendela lengkung sebuah kafe kecil"
            width="1536"
            height="2048"
            loading="lazy"
          />
        </figure>
        <div className="studio-copy" data-reveal>
          <p className="label">Tentang studio</p>
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
            <p className="label">Layanan</p>
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
              <p className="label">Eksplorasi</p>
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
        <div className="process-cluster" data-reveal="media">
          {photos.map(([src, alt, name]) => (
            <figure className={`process-photo ${name}`} key={src}>
              <img src={src} alt={alt} loading="lazy" />
            </figure>
          ))}
        </div>
        <div className="process-copy">
          <header data-reveal>
            <p className="label">Proses</p>
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
          <p className="label">Pertanyaan umum</p>
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
          <h2 id="closing-title">
            Ceritakan usaha Anda. Kami bantu susun websitenya.
          </h2>
          <Button href="/kontak">Hubungi kami</Button>
        </div>
      </section>
    </>
  );
}
