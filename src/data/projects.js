export const projects = [
  {
    id: 'profil-bisnis',
    code: 'FBX-01',
    name: 'Profil bisnis usaha lokal',
    type: 'Website bisnis',
    summary:
      'Profil studio interior yang memperkenalkan layanan, proses kerja, dan jalur konsultasi dengan jelas.',
    need: 'Calon pelanggan perlu memahami layanan dan karakter usaha sebelum memulai percakapan.',
    goal: 'Membuat usaha terasa tepercaya dan memudahkan pengunjung menemukan layanan yang sesuai.',
    decisions: [
      'Warna ivory dan navy membangun kesan hangat sekaligus profesional.',
      'Layanan dan tahapan kerja disusun berurutan agar informasi mudah dipindai.',
      'Ajakan konsultasi ditempatkan dekat penjelasan manfaat, bukan memenuhi seluruh halaman.',
    ],
    kind: 'business',
  },
  {
    id: 'katalog-produk',
    code: 'FBX-02',
    name: 'Katalog produk',
    type: 'Katalog digital',
    summary:
      'Koleksi furnitur dengan kategori, harga, dan spesifikasi yang mudah dibandingkan.',
    need: 'Pembeli membutuhkan informasi produk yang konsisten tanpa harus bertanya satu per satu.',
    goal: 'Membantu pengunjung menemukan produk dan memahami material serta ukurannya lebih cepat.',
    decisions: [
      'Latar netral memberi ruang bagi bentuk dan material produk untuk menjadi fokus.',
      'Kategori terlihat sejak awal untuk memperpendek pencarian produk.',
      'Harga, material, dan ukuran memakai susunan seragam agar mudah dibandingkan.',
    ],
    kind: 'catalog',
  },
  {
    id: 'panel-katalog',
    code: 'FBX-03',
    name: 'Panel pengelolaan katalog',
    type: 'Dashboard administrasi',
    summary:
      'Panel katalog dengan ringkasan inventaris, tabel produk, dan contoh validasi formulir.',
    need: 'Pengelola perlu melihat status produk dan mengenali data yang belum lengkap dengan cepat.',
    goal: 'Menyederhanakan pembacaan inventaris dan memperjelas langkah saat menambahkan produk.',
    decisions: [
      'Navigasi samping memisahkan pengelolaan produk dari ringkasan dan pengaturan.',
      'Status memakai teks dan warna agar informasi tidak bergantung pada warna saja.',
      'Keadaan kosong dan pesan validasi menjelaskan data yang dibutuhkan secara spesifik.',
    ],
    kind: 'dashboard',
  },
];

export default projects;
