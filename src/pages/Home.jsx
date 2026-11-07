import projects from '../data/projects';
import {
  services,
  stages,
  team,
  plans,
  testimonials,
  stack,
} from '../data/content';
import Button from '../components/Button';
import LineTitle from '../components/LineTitle';
import ProjectPreview from '../components/previews/ProjectPreview';
import ProjectCard from '../components/ProjectCard';

const initials = (name) =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2);

export function TeamGrid() {
  return (
    <div className="team-grid">
      {team.map((member) => (
        <article className="team-card" key={member.name} data-reveal>
          <span className="team-avatar" aria-hidden="true">
            {initials(member.name)}
          </span>
          <h3>{member.name}</h3>
          <p className="team-role">{member.role}</p>
          <p>{member.focus}</p>
        </article>
      ))}
    </div>
  );
}

export default function Home({ onOpen }) {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="status-pill">
            <span className="status-dot" aria-hidden="true" />
            Menerima proyek baru
          </p>
          <LineTitle
            lines={['Website modern', 'untuk usaha', 'yang tumbuh.']}
          />
          <div data-hero-support>
            <p className="hero-description">
              Flexbox adalah tim pengembang yang merancang dan membangun website
              cepat, rapi, dan nyaman di ponsel—untuk UMKM dan usaha lokal yang
              ingin lebih mudah ditemukan pelanggan.
            </p>
            <div className="hero-actions">
              <Button href="/kontak">Mulai proyek</Button>
              <Button href="/karya" secondary>
                Lihat karya
              </Button>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>Tim</dt>
                <dd>{team.length} developer</dd>
              </div>
              <div>
                <dt>Pendekatan</dt>
                <dd>Mobile-first</dd>
              </div>
              <div>
                <dt>Komunikasi</dt>
                <dd>Langsung 1:1</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="hero-visual" data-hero-visual>
          <div className="browser">
            <div className="browser-bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <code>usaha-anda.id</code>
            </div>
            <div className="hero-preview">
              <ProjectPreview project={projects[0]} />
            </div>
          </div>
          <p className="hero-chip hero-chip-a">
            <span aria-hidden="true">⚡</span> Cepat dimuat
          </p>
          <p className="hero-chip hero-chip-b">
            <span aria-hidden="true">📱</span> Responsif
          </p>
        </div>
      </section>

      <section className="container stack" aria-labelledby="stack-title">
        <p className="eyebrow" id="stack-title">
          Teknologi yang kami pakai
        </p>
        <ul>
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section container" aria-labelledby="services-title">
        <header className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">// Layanan</p>
            <h2 id="services-title">Yang bisa kami bangun untuk Anda.</h2>
          </div>
          <Button href="/layanan" secondary>
            Detail layanan
          </Button>
        </header>
        <div className="bento">
          {services.map((service) => (
            <a
              className="bento-card"
              href="/layanan"
              key={service.title}
              data-reveal
            >
              <span className="bento-index">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.audience}</p>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </a>
          ))}
          <a className="bento-card bento-cta" href="/kontak" data-reveal>
            <h3>Punya kebutuhan lain?</h3>
            <p>Ceritakan idenya, kita cari bentuk website yang paling pas.</p>
            <span className="text-link">
              Konsultasi gratis <span className="arrow">↗</span>
            </span>
          </a>
        </div>
      </section>

      <section className="section container" aria-labelledby="work-title">
        <header className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">// Karya</p>
            <h2 id="work-title">Eksplorasi desain terbaru.</h2>
          </div>
          <Button href="/karya" secondary>
            Semua studi desain
          </Button>
        </header>
        <div className="project-grid">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={onOpen} />
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="process-title">
        <header className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">// Proses</p>
            <h2 id="process-title">Empat langkah, tanpa kejutan.</h2>
          </div>
          <Button secondary href="/layanan#proses">
            Proses lengkap
          </Button>
        </header>
        <ol className="steps">
          {stages.map((stage) => (
            <li key={stage.number} data-reveal>
              <span className="bento-index">{stage.number}</span>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section container" aria-labelledby="team-title">
        <header className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">// Tim</p>
            <h2 id="team-title">Orang di balik setiap baris kode.</h2>
          </div>
          <Button secondary href="/tentang">
            Tentang kami
          </Button>
        </header>
        <TeamGrid />
      </section>

      <section className="section container" aria-labelledby="pricing-title">
        <header className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">// Harga</p>
            <h2 id="pricing-title">Paket yang transparan.</h2>
          </div>
          <p>
            Harga awal sebagai gambaran. Penawaran akhir mengikuti jumlah
            halaman, konten, dan fitur yang disepakati.
          </p>
        </header>
        <div className="plans">
          {plans.map((plan) => (
            <article
              className={`plan ${plan.featured ? 'is-featured' : ''}`}
              key={plan.name}
              data-reveal
            >
              {plan.featured && <span className="plan-badge">Populer</span>}
              <h3>{plan.name}</h3>
              <p>{plan.note}</p>
              <p className="plan-price">
                {plan.price !== 'Diskusi' && <small>Mulai </small>}
                {plan.price}
              </p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className={`button ${plan.featured ? '' : 'button-ghost'}`}
                href="/kontak"
              >
                Pilih {plan.name}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section container"
        aria-labelledby="testimonials-title"
      >
        <header className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">// Testimoni</p>
            <h2 id="testimonials-title">Kata mereka.</h2>
          </div>
        </header>
        <div className="quotes">
          {testimonials.map((item) => (
            <figure className="quote" key={item.business} data-reveal>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.business}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
