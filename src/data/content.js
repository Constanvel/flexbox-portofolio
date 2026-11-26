export const services = [
  {
    number: '01',
    title: 'Website bisnis',
    audience:
      'Untuk usaha jasa dan bisnis yang ingin lebih mudah dikenali dan dihubungi.',
    need: 'Calon pelanggan perlu memahami apa yang Anda tawarkan, siapa yang Anda bantu, dan cara menghubungi Anda.',
    deliverables: [
      'Halaman utama dan profil usaha',
      'Penjelasan layanan yang mudah dipahami',
      'Informasi kontak dan tautan WhatsApp',
    ],
    scope:
      'Jumlah halaman, bahan tulisan, dan kebutuhan fitur ditentukan bersama sebelum pengerjaan.',
  },
  {
    number: '02',
    title: 'Katalog produk',
    audience:
      'Untuk usaha yang ingin menampilkan pilihan produk dalam satu tempat yang rapi.',
    need: 'Pelanggan perlu melihat produk, membaca detailnya, lalu menanyakan ketersediaan tanpa mencari informasi di banyak tempat.',
    deliverables: [
      'Susunan kategori dan daftar produk',
      'Detail produk, foto, dan informasi harga',
      'Tautan pemesanan melalui kanal Anda',
    ],
    scope:
      'Katalog bukan toko dengan pembayaran otomatis. Jumlah produk dan cara pembaruan dibahas sejak awal.',
  },
  {
    number: '03',
    title: 'Pembaruan website',
    audience:
      'Untuk pemilik website yang isinya sudah berubah atau tampilannya sulit digunakan.',
    need: 'Website Anda perlu mencerminkan kondisi usaha saat ini dan tetap nyaman dibuka melalui ponsel.',
    deliverables: [
      'Peninjauan halaman dan alur informasi',
      'Pembaruan tampilan atau konten yang disepakati',
      'Pemeriksaan tampilan di beberapa ukuran layar',
    ],
    scope:
      'Kelayakan pembaruan bergantung pada sistem dan akses website Anda. Pemeriksaan awal menentukan batas pekerjaan.',
  },
];

export const stages = [
  {
    number: '01',
    title: 'Ceritakan kebutuhan Anda',
    description:
      'Kita membahas usaha, calon pelanggan, tujuan website, dan bahan yang sudah Anda punya.',
  },
  {
    number: '02',
    title: 'Sepakati arah dan lingkup',
    description:
      'Susunan halaman, kebutuhan konten, biaya, dan perkiraan waktu disepakati sebelum pengerjaan dimulai.',
  },
  {
    number: '03',
    title: 'Bangun dan tinjau bersama',
    description:
      'Anda meninjau rancangan dan versi website. Masukan dikumpulkan sesuai tahapan revisi yang disepakati.',
  },
  {
    number: '04',
    title: 'Periksa sebelum tayang',
    description:
      'Tampilan, tautan, dan isi diperiksa bersama. Setelah persetujuan Anda, website disiapkan untuk dipublikasikan.',
  },
];

export const questions = [
  {
    question: 'Berapa biaya pembuatan website?',
    answer:
      'Biaya mengikuti jumlah halaman, kesiapan konten, dan fitur yang Anda perlukan. Ceritakan kebutuhan Anda terlebih dahulu agar lingkup pekerjaan dan penawarannya bisa dibuat dengan jelas.',
  },
  {
    question: 'Berapa lama pengerjaannya?',
    answer:
      'Perkiraan waktu ditentukan setelah lingkup dan bahan awal diketahui. Kesiapan foto, tulisan, akses website, dan waktu pemberian masukan ikut memengaruhi jadwal.',
  },
  {
    question: 'Apakah saya perlu menyiapkan tulisan dan foto?',
    answer:
      'Siapkan informasi usaha, daftar layanan atau produk, logo, dan foto yang boleh digunakan. Jika bahannya belum lengkap, kebutuhan penyusunan konten dapat dibahas sebagai bagian dari lingkup pekerjaan.',
  },
  {
    question: 'Apakah domain dan hosting sudah termasuk?',
    answer:
      'Kebutuhan domain dan hosting dibahas terpisah dalam penawaran. Jika Anda sudah memilikinya, akses dan kecocokannya diperiksa terlebih dahulu. Tidak ada asumsi biaya berlangganan sudah termasuk.',
  },
  {
    question: 'Bagaimana dengan perubahan setelah website tayang?',
    answer:
      'Batas revisi, bantuan setelah peluncuran, dan kebutuhan pemeliharaan disepakati sebelum pekerjaan dimulai. Pembaruan tambahan dapat dibahas sebagai pekerjaan terpisah.',
  },
];

export const titles = {
  services: 'Layanan yang jelas, hasil yang terukur.',
  about: 'Tim kecil, kerja yang rapi.',
  contact: 'Mari bangun website Anda.',
  notFound: 'Halaman ini tidak ditemukan',
};

// Anggota tim, urut dari ketua.
export const team = [
  {
    name: 'Adit',
    role: 'Ketua',
    focus: 'Memimpin tim, mengatur jadwal, dan menjaga arah setiap proyek.',
  },
  {
    name: 'Rainer',
    role: 'Wakil · Frontend',
    focus: 'Halaman responsif dan interaksi yang ringan.',
  },
  {
    name: 'Fahkri',
    role: 'UI/UX',
    focus: 'Susunan informasi, riset kebutuhan, dan tampilan.',
  },
  {
    name: 'Bima',
    role: 'UI/UX',
    focus: 'Susunan informasi, riset kebutuhan, dan tampilan.',
  },
  {
    name: 'Kiandra',
    role: 'Backend',
    focus: 'Formulir, data, dan integrasi bila dibutuhkan.',
  },
];

// Kontak bisnis. Isi nilainya; baris yang kosong tidak ditampilkan.
// whatsapp: format internasional tanpa + atau spasi, mis. '6281234567890'.
export const contact = {
  whatsapp: '6285136971361',
  email: 'admin@flexboxstudio.site',
  instagram: 'flexbox.dev',
};

// [label, href, teks tampilan] untuk footer dan halaman kontak.
export const channels = [
  contact.whatsapp && [
    'WhatsApp',
    `https://wa.me/${contact.whatsapp}`,
    `0${contact.whatsapp.slice(2)}`.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3'),
  ],
  contact.email && ['Email', `mailto:${contact.email}`, contact.email],
  contact.instagram && [
    'Instagram',
    `https://instagram.com/${contact.instagram.replace(/^@/, '')}`,
    `@${contact.instagram.replace(/^@/, '')}`,
  ],
].filter(Boolean);
