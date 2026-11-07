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

## Font lokal

Figtree (variable, 300–900) karya Erik Kennedy, SIL Open Font License 1.1. File TTF disalin ke `public/fonts/` dan dimuat lokal; tidak memakai Google Fonts saat runtime. Teks lisensi: `public/licenses/Figtree-OFL.txt`.

- https://github.com/erikdkennedy/figtree

## Foto

Foto di beranda berasal dari WordPress Photo Directory dengan lisensi CC0. Foto hanya menggambarkan suasana kerja dan bukan dokumentasi tim atau klien Flexbox.

| File                                 | Sumber                                         |
| ------------------------------------ | ---------------------------------------------- |
| `public/images/studio-workspace.jpg` | https://wordpress.org/photos/photo/807640e093/ |
| `public/images/process-meeting.jpg`  | https://wordpress.org/photos/photo/83563ef334/ |
| `public/images/process-sketch.jpg`   | https://wordpress.org/photos/photo/75969730cd/ |
| `public/images/process-phone.jpg`    | https://wordpress.org/photos/photo/27464819a1/ |

## Visual dan referensi

Ilustrasi pratinjau studi konsep dibuat di source demo ini menggunakan CSS/SVG. Palet terang hangat dengan satu aksen kuning; tanpa gradien.
