import { titles } from '../data/content';
import '../pages.css';

export default function About() {
  return (
    <div className="support-page about-page">
      <header className="container page-intro support-intro" data-reveal>
        <p className="eyebrow">Tentang / Flexbox</p>
        <h1>{titles.about}</h1>
        <p>
          Website yang berguna dimulai dari pemahaman tentang usaha Anda: apa
          yang ditawarkan, siapa yang membutuhkan, dan apa langkah berikutnya
          bagi pengunjung.
        </p>
      </header>
      <section
        className="container section about-statement"
        aria-labelledby="about-purpose"
        data-reveal
      >
        <p className="eyebrow">Dasar pendekatan</p>
        <div>
          <h2 id="about-purpose">
            Informasi yang jelas. Pilihan yang beralasan.
          </h2>
          <p>
            Flexbox membantu menyusun informasi usaha menjadi website yang mudah
            dibaca dan digunakan. Tampilan bukan titik awal satu-satunya.
            Struktur halaman, isi, dan cara menghubungi Anda perlu bekerja
            bersama.
          </p>
          <p>
            Karena kebutuhan setiap usaha berbeda, lingkup pekerjaan dibicarakan
            sebelum pengerjaan. Anda mengetahui apa yang dibuat, bahan apa yang
            diperlukan, dan bagian mana yang belum termasuk.
          </p>
        </div>
      </section>
      <section
        className="support-band section"
        aria-labelledby="principles-title"
      >
        <div className="container">
          <div className="support-section-heading" data-reveal>
            <p className="eyebrow">Cara mengambil keputusan</p>
            <h2 id="principles-title">Kebutuhan Anda menjadi acuan.</h2>
          </div>
          <div className="about-principles">
            <article data-reveal>
              <span className="support-index">01</span>
              <h3>Isi sebelum hiasan</h3>
              <p>
                Informasi penting diberi tempat yang mudah ditemukan. Pengunjung
                perlu memahami penawaran Anda tanpa menebak-nebak.
              </p>
            </article>
            <article data-reveal>
              <span className="support-index">02</span>
              <h3>Nyaman di layar kecil</h3>
              <p>
                Susunan halaman, ukuran teks, dan tombol diperhatikan agar
                website tetap mudah digunakan melalui ponsel.
              </p>
            </article>
            <article data-reveal>
              <span className="support-index">03</span>
              <h3>Lingkup yang terbuka</h3>
              <p>
                Kebutuhan fitur, revisi, biaya, dan tanggung jawab penyediaan
                konten dibahas sejak awal, bukan diasumsikan.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section
        className="container section about-collaboration"
        aria-labelledby="collaboration-title"
        data-reveal
      >
        <div>
          <p className="eyebrow">Bekerja bersama</p>
          <h2 id="collaboration-title">
            Pengetahuan tentang usaha datang dari Anda.
          </h2>
        </div>
        <div>
          <p>
            Anda mengenal pelanggan, produk, dan kegiatan usaha Anda. Informasi
            itu menjadi bahan untuk menyusun halaman yang sesuai, bukan sekadar
            mengisi sebuah templat.
          </p>
          <p>
            Siapkan bahan yang sudah ada: profil usaha, daftar layanan atau
            produk, foto, dan contoh website yang Anda rasa mudah digunakan.
            Bahan yang belum tersedia dapat kita petakan bersama.
          </p>
          <a className="text-link" href="/layanan#proses">
            Lihat tahapan kerja <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section className="container support-bottom-cta" data-reveal>
        <div>
          <p className="eyebrow">Mulai dari kebutuhan nyata</p>
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
