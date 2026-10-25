# Flexbox / Motion Study 01

Percobaan React untuk **hero + showcase karya**, dengan arah “ekspresif terkontrol”. Bukan website produksi atau portofolio klien final. Semua karya diberi label konsep; tidak ada kontak, testimoni, metrik, atau identitas tim rekaan.

## Menjalankan

Gunakan Node.js **22.12+ atau 24 LTS**; lingkungan pengembangan awal memakai Node 24.16.0 dan npm 12.2.0.

```sh
npm ci
npm run dev
```

Buka alamat yang dicetak Vite, biasanya http://127.0.0.1:5173. Server hanya di localhost, tidak dibuka ke jaringan lokal.

```sh
npm test                 # kebijakan motion dan pemetaan scroll
npm run build           # hasil produksi dalam dist/
npm run preview         # pratinjau build, bukan server produksi
npx playwright install chromium
npm run test:browser    # browser headless + axe
npm run format:check
```

## Interaksi

- Hero: reveal karakter satu kali per aktivasi motion, ilustrasi kubus SVG orisinal.
- Desktop fine pointer: Lenis untuk wheel scroll, disinkronkan dengan GSAP ScrollTrigger.
- Showcase horizontal hanya pada viewport minimal **1024 × 650**, fine pointer, dan motion aktif. Scroll vertikal menggerakkan tiga kartu, tanpa drag atau gyroscope.
- Tilt ringan pada visual karya; cursor kontekstual; shimmer pada CTA; satu marquee dekoratif.
- Mobile/touch, viewport pendek, dan reduced-motion: daftar karya vertikal, tanpa horizontal pin.
- Tombol **Matikan gerak** menonaktifkan efek. Preferensi sistem `prefers-reduced-motion` tidak dapat ditimpa. Pengaturan manual berlaku selama sesi halaman, belum disimpan.
- Menu mobile dan detail konsep memakai native `<dialog>`: Escape, fokus kembali, dan penguncian scroll dokumen.
- Navigasi anchor dan **Lewati showcase** tidak mewajibkan pengunjung menyelesaikan showcase.

## Palet

Warna dasar diverifikasi dari CSS situs referensi screenshot: https://flexbox-tau-five.vercel.app/.

| Token     | HEX       | Peran                                               |
| --------- | --------- | --------------------------------------------------- |
| Paper     | `#F7F7F3` | Latar                                               |
| Ink       | `#050505` | Teks utama                                          |
| Blue      | `#3F83C5` | Judul besar, ilustrasi, aksen                       |
| Pale      | `#D5DFF0` | Panel/grid                                          |
| Graphite  | `#454A54` | Teks pendamping                                     |
| Line      | `#D8D8D5` | Pemisah                                             |
| Blue text | `#2C659C` | Varian kontras untuk teks kecil dan latar CTA putih |

Blue text adalah adaptasi aksesibilitas, bukan HEX yang diklaim berasal dari screenshot.

## Struktur

- `src/main.jsx`: tampilan React, karya konsep, dialog, navigasi, GSAP/Lenis.
- `src/styles.css`: token, responsif, ilustrasi CSS, motion dan fallback.
- `src/motion-policy.js`: aturan motion dan pemetaan tujuan keyboard.
- `tests/motion-policy.test.js`: unit test Node.
- `tests/browser/demo.spec.js`: uji Chromium desktop/mobile emulasi/reduced-motion dan axe.
- `.playwright/`: screenshot, trace kegagalan, dan hasil lokal; diabaikan Git.
- `THIRD_PARTY_NOTICES.md`: catatan dependency, font, dan lisensi.

## Cakupan verifikasi

- Build Vite dan 4 unit test dijalankan.
- Empat skenario Chromium headless mencakup horizontal desktop, keyboard antar kartu, dialog/Escape/fokus, anchor bypass, toggle gerak, menu narrow desktop, mobile touch emulasi, reduced-motion, dan perubahan tinggi viewport.
- Pemeriksaan axe memakai tag WCAG 2 A/AA dan WCAG 2.1 AA pada halaman dan dialog yang diuji. Ini **bukan sertifikasi WCAG** atau pengganti uji pembaca layar.
- Screenshot desktop dan mobile diperiksa. Screenshot full-page saat motion aktif tidak mewakili hasil scroll secara akurat karena reveal dan pin bergantung viewport.
- Belum diuji pada Safari/Firefox, perangkat touch fisik, pembaca layar, atau browser desktop interaktif. Belum ada pengukuran FPS atau Lighthouse.

## Batas dan privasi

Google Fonts memuat **DM Sans** dan **Space Grotesk** melalui jaringan eksternal, dengan fallback Arial. Tidak ada analytics atau pengiriman formulir, tetapi permintaan font tetap menghubungi layanan Google. Untuk produksi, pertimbangkan self-host font beserta lisensinya.

Ilustrasi memakai CSS/SVG; tidak ada foto atau aset proyek pihak lain. Sebelum publikasi, ganti konten konsep dengan karya berizin, lengkapi identitas/kontak nyata, audit legal dependency, dan lakukan pengujian lintas perangkat.

Tidak ada deployment, commit, atau push otomatis. `LICENSE` repository yang sudah ada tidak diubah.
