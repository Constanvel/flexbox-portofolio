import { titles, channels, contact } from '../data/content';
import '../pages.css';

export default function Contact() {
  function sendWhatsApp(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name').trim();
    const text = `Halo Flexbox, saya ${name}.\n\n${data.get('needs').trim()}`;
    const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
    const tab = window.open(url, '_blank');
    if (tab) tab.opener = null;
    else window.location.href = url;
  }

  return (
    <div className="support-page contact-page">
      <header className="container page-intro support-intro" data-reveal>
        <p className="eyebrow">Kontak</p>
        <h1>{titles.contact}</h1>
        <p>
          Ceritakan usaha, kebutuhan website, dan perkiraan waktu pengerjaan.
          Tidak perlu menyiapkan brief lengkap.
        </p>
      </header>
      <section
        className="container section contact-layout"
        aria-labelledby="contact-form-title"
      >
        <aside className="contact-context" data-reveal>
          <p className="eyebrow">Siapkan percakapan</p>
          <h2 id="contact-form-title">Mulai dengan cerita singkat.</h2>
          <p>
            Agar kebutuhan Anda lebih mudah dipahami, Anda bisa menyertakan:
          </p>
          <ul>
            <li>Jenis usaha dan pelanggan yang Anda tuju.</li>
            <li>Layanan atau produk yang ingin ditampilkan.</li>
            <li>Website yang sudah ada, jika ingin diperbarui.</li>
            <li>Perkiraan waktu dan anggaran, jika sudah ada.</li>
          </ul>
          <div className="contact-channels">
            <h3>Atau hubungi langsung</h3>
            <ul>
              {channels.map(([label, href, text]) => (
                <li key={label}>
                  <span>{label}</span>
                  <a
                    href={href}
                    {...(href.startsWith('http') && {
                      target: '_blank',
                      rel: 'noreferrer',
                    })}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="contact-disclosure">
            <h3>Dikirim lewat WhatsApp.</h3>
            <p>
              Formulir ini tidak menyimpan data. Tombolnya membuka WhatsApp
              dengan pesan yang sudah tersusun, dan pesan baru terkirim setelah
              Anda menekan kirim di sana.
            </p>
          </div>
        </aside>
        <div className="contact-form-column" data-reveal>
          <form className="contact-form" onSubmit={sendWhatsApp}>
            <p className="support-note">Semua kolom wajib diisi.</p>
            <div className="contact-field">
              <label htmlFor="contact-name">Nama Anda</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                pattern=".*\S.*"
                placeholder="Nama yang bisa kami sapa"
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-needs">Kebutuhan website Anda</label>
              <textarea
                id="contact-needs"
                name="needs"
                rows={7}
                required
                maxLength={4000}
                placeholder="Ceritakan usaha Anda dan apa yang ingin Anda tampilkan di website."
              />
            </div>
            <button className="button" type="submit">
              Lanjut ke WhatsApp <span aria-hidden="true">↗</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
