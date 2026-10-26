import projects from '../data/projects';
import { services } from '../data/content';
import Button from '../components/Button';
import LineTitle from '../components/LineTitle';
import ProjectPreview from '../components/previews/ProjectPreview';
import ProjectCard from '../components/ProjectCard';
export default function Home({ onOpen }) {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">Desain & pengembangan website</p>
          <LineTitle
            lines={['Usaha Anda,', 'diperkenalkan', 'dengan jelas.']}
          />
          <div data-hero-support>
            <p className="hero-description">
              Flexbox merancang dan membangun website bisnis, katalog produk,
              dan antarmuka digital—dari struktur konten hingga tampilan yang
              nyaman digunakan di ponsel.
            </p>
            <div className="hero-actions">
              <Button href="/karya">Lihat eksplorasi</Button>
              <Button href="/kontak" secondary>
                Diskusikan proyek
              </Button>
            </div>
          </div>
        </div>
        <div className="hero-visual" data-hero-visual>
          <div className="hero-preview">
            <ProjectPreview project={projects[0]} />
          </div>
          <div className="hero-visual-caption">
            <span className="eyebrow">01 / Studi konsep</span>
            <span>Profil bisnis usaha lokal</span>
          </div>
        </div>
        <div className="hero-foot">
          <span>Struktur konten. Desain. Pengembangan.</span>
          <a href="/layanan">
            Kenali layanan kami <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section className="section container">
        <header className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Pilihan eksplorasi</p>
            <h2>
              Bentuk berbeda.
              <br />
              Kebutuhan yang spesifik.
            </h2>
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
      <section className="section container home-services">
        <header className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Layanan Flexbox</p>
            <h2>
              Mulai dari yang
              <br />
              Anda butuhkan.
            </h2>
          </div>
          <p>
            Website baru atau pembaruan yang sudah ada. Lingkup pekerjaan
            disusun berdasarkan tujuan dan kesiapan materi Anda.
          </p>
        </header>
        <div>
          {services.map((service, index) => (
            <a
              className="home-service"
              href="/layanan"
              key={service.title}
              data-reveal
            >
              <span className="eyebrow">0{index + 1}</span>
              <h3>{service.title}</h3>
              <span>{service.audience}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
      <section className="section container">
        <header className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Cara kerja</p>
            <h2>Jelas di setiap tahap.</h2>
          </div>
          <Button secondary href="/layanan#proses">
            Lihat proses lengkap
          </Button>
        </header>
        <ol className="home-process" data-reveal>
          {[
            [
              'Pahami kebutuhan',
              'Tentukan tujuan website, pengguna, dan informasi yang perlu disampaikan.',
            ],
            [
              'Rancang struktur',
              'Susun halaman dan arah visual sebelum masuk ke pengembangan.',
            ],
            [
              'Bangun dan uji',
              'Kembangkan desain, tinjau bersama, lalu periksa fungsi dan tampilan.',
            ],
          ].map(([title, copy], i) => (
            <li key={title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="section container home-about" data-reveal>
        <p className="eyebrow">Pendekatan Flexbox</p>
        <div>
          <h2>Keputusan desain dimulai dari kebutuhan, bukan efek.</h2>
          <p>
            Kami menyusun informasi, merancang antarmuka, dan membangun website
            sebagai satu proses. Setiap pilihan perlu punya alasan yang dapat
            dibahas bersama.
          </p>
          <Button secondary href="/tentang">
            Kenali pendekatan kami
          </Button>
        </div>
      </section>
    </>
  );
}
