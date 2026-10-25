# Dependency dan lisensi

Catatan pengembangan, bukan nasihat hukum. Versi pasti terdapat dalam `package-lock.json`. Teks lisensi bawaan paket tetap berlaku dan tidak digantikan oleh lisensi repository.

| Dependency langsung          | Versi terpasang awal | Lisensi yang dinyatakan                          |
| ---------------------------- | -------------------- | ------------------------------------------------ |
| React / React DOM            | 19.3.1               | MIT                                              |
| GSAP, termasuk ScrollTrigger | 3.15.0               | GSAP Standard “no charge” license, **bukan MIT** |
| Lenis                        | 1.3.27               | MIT                                              |
| Vite                         | 8.3.5                | MIT                                              |
| @vitejs/plugin-react         | 6.1.2                | MIT                                              |
| @playwright/test             | 1.64.1               | Apache-2.0                                       |
| @axe-core/playwright         | 4.14.0               | MPL-2.0                                          |
| Prettier                     | lihat lockfile       | MIT                                              |

- GSAP mencantumkan https://gsap.com/standard-license pada metadata paket. Pernyataan gratis untuk penggunaan komersial bukan berarti bebas dari seluruh pembatasan. Teks legal penuh belum diaudit; periksa ketentuan terbaru sebelum redistribusi, penjualan template/tool, atau publikasi produksi.
- Dependency transitif mempunyai lisensi masing-masing. Daftar ini hanya dependency langsung, bukan inventaris lisensi transitif lengkap.
- Playwright mengunduh Chromium untuk pengujian lokal; browser tersebut bukan bagian dari bundle aplikasi.
- React Bits, Aceternity, Magic UI, Motion, dan Radix tidak dimasukkan.

## Font eksternal

DM Sans dan Space Grotesk dimuat dari Google Fonts. Keduanya dipublikasikan dengan SIL Open Font License 1.1 di repositori Google Fonts:

- https://github.com/google/fonts/tree/main/ofl/dmsans
- https://github.com/google/fonts/tree/main/ofl/spacegrotesk

Font tidak disalin ke repository. Jika self-host dilakukan, sertakan teks OFL dari distribusi font yang dipakai.

## Visual dan referensi

Ilustrasi kartu dan kubus dibuat di source demo ini menggunakan CSS/SVG. Palet dasar mengikuti CSS situs referensi screenshot pengguna. MadeByShape/Humaan menjadi inspirasi arah interaksi, bukan sumber kode, foto, identitas, atau proyek yang disalin.
