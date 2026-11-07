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

// Data contoh: ganti dengan data tim asli.
export const team = [
  { name: 'Rainer', role: 'Lead Developer', focus: 'Arsitektur & performa' },
  { name: 'Anggota 2', role: 'UI/UX Designer', focus: 'Riset & antarmuka' },
  { name: 'Anggota 3', role: 'Frontend Developer', focus: 'React & animasi' },
  { name: 'Anggota 4', role: 'Backend Developer', focus: 'API & database' },
];

// Harga contoh: ganti dengan harga asli.
export const plans = [
  {
    name: 'Starter',
    price: 'Rp1,5 jt',
    note: 'Untuk usaha yang baru online.',
    features: [
      'Landing page 1 halaman',
      'Desain responsif',
      'Tombol WhatsApp & peta',
      '2x revisi',
    ],
  },
  {
    name: 'Bisnis',
    price: 'Rp4 jt',
    note: 'Paling sering dipilih UMKM.',
    featured: true,
    features: [
      'Hingga 6 halaman',
      'Katalog produk/layanan',
      'SEO dasar & Google Maps',
      'Bantuan 30 hari setelah tayang',
    ],
  },
  {
    name: 'Custom',
    price: 'Diskusi',
    note: 'Untuk kebutuhan fitur khusus.',
    features: [
      'Fitur sesuai kebutuhan',
      'Panel admin / dashboard',
      'Integrasi sistem lain',
      'Pemeliharaan berkala',
    ],
  },
];

// Testimoni contoh: ganti dengan testimoni klien asli.
export const testimonials = [
  {
    quote:
      'Prosesnya jelas dari awal. Sekarang pelanggan bisa lihat menu dan langsung pesan lewat WhatsApp.',
    name: 'Nama Klien',
    business: 'Kedai kopi · Contoh',
  },
  {
    quote:
      'Katalog kami jadi rapi dan mudah diperbarui. Pertanyaan berulang dari pembeli berkurang.',
    name: 'Nama Klien',
    business: 'Toko furnitur · Contoh',
  },
  {
    quote:
      'Tampilannya modern dan cepat dibuka di HP. Tim responsif setiap kali ada revisi.',
    name: 'Nama Klien',
    business: 'Studio foto · Contoh',
  },
];

export const stack = [
  'React',
  'Next.js',
  'Vite',
  'Tailwind CSS',
  'Node.js',
  'Laravel',
  'WordPress',
  'Figma',
];
