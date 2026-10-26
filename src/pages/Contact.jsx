import { useRef, useState } from 'react';
import { titles } from '../data/content';
import '../pages.css';

export default function Contact() {
  const [preview, setPreview] = useState(null);
  const previewRef = useRef(null);

  function createPreview(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPreview({
      name: data.get('name').trim(),
      contact: data.get('contact').trim(),
      needs: data.get('needs').trim(),
    });
    requestAnimationFrame(() => previewRef.current?.focus());
  }

  return (
    <div className="support-page contact-page">
      <header className="container page-intro support-intro" data-reveal>
        <p className="eyebrow">Kontak / Flexbox</p>
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
          <div className="contact-disclosure">
            <h3>Pratinjau lokal, bukan pengiriman.</h3>
            <p>
              Formulir ini hanya menyusun pesan di halaman ini. Pesan tidak
              dikirim, tidak disimpan ke server, dan tidak membuat permintaan
              konsultasi. Jangan masukkan kata sandi atau informasi sensitif.
            </p>
          </div>
        </aside>
        <div className="contact-form-column" data-reveal>
          <form className="contact-form" onSubmit={createPreview}>
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
              <label htmlFor="contact-detail">Email atau nomor WhatsApp</label>
              <input
                id="contact-detail"
                name="contact"
                autoComplete="off"
                required
                maxLength={160}
                pattern=".*\S.*"
                aria-describedby="contact-detail-hint"
                placeholder="Contoh: nama@usaha.id"
              />
              <p id="contact-detail-hint">
                Tulis salah satu kontak Anda. Tidak ada pesan otomatis yang
                dikirim.
              </p>
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
              Buat pratinjau pesan <span aria-hidden="true">↗</span>
            </button>
            <p className="support-note">
              Tombol ini tidak mengirim pesan. Pratinjau akan muncul di bawah.
            </p>
          </form>
          <div
            className="contact-preview"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            ref={previewRef}
            tabIndex={-1}
          >
            {preview && (
              <>
                <p className="eyebrow">Pratinjau pesan</p>
                <h2>Pesan Anda belum dikirim.</h2>
                <p>
                  Berikut susunan pesan untuk Anda periksa atau salin secara
                  manual. Tidak ada data yang dikirim melalui formulir ini.
                </p>
                <dl>
                  <div>
                    <dt>Nama</dt>
                    <dd>{preview.name}</dd>
                  </div>
                  <div>
                    <dt>Kontak</dt>
                    <dd>{preview.contact}</dd>
                  </div>
                  <div>
                    <dt>Kebutuhan</dt>
                    <dd>{preview.needs}</dd>
                  </div>
                </dl>
                <p className="support-note">
                  Mengubah isian? Tekan “Buat pratinjau pesan” lagi untuk
                  memperbarui teks ini.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
