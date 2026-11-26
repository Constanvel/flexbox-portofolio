// Live websites built by the team. Copy is based on what each site shows.
export const works = [
  {
    id: 'sagara',
    code: 'WEB-01',
    name: 'SAGARA Rumah Sunat Modern',
    type: 'Website profil usaha',
    url: 'https://sagara-vert.vercel.app/',
    image: 'sagara',
    summary:
      'Website layanan khitan modern di Banteran, Sumbang, yang menenangkan keluarga dan mengarahkan mereka berkonsultasi lewat WhatsApp.',
    context:
      'Keluarga datang dengan banyak pertanyaan dan rasa cemas. Website perlu menjelaskan pilihan metode, pembiusan, dan perawatan dengan nada yang tenang, lalu memudahkan konsultasi.',
    features: [
      'Penjelasan metode: Smart Klamp, bius Comfort-In tanpa jarum, dan laser',
      'Layanan per kebutuhan: anak, bayi, dewasa, dan kebutuhan khusus',
      'Galeri foto, FAQ, lokasi, dan kebijakan privasi',
      'Tombol konsultasi WhatsApp di setiap layanan',
    ],
    stack: ['Next.js'],
  },
  {
    id: 'smktelkom',
    code: 'WEB-02',
    name: 'SMK Telkom Purwokerto',
    type: 'Website sekolah',
    url: 'https://mainweb.smktelkom-pwt.sch.id/',
    image: 'smktelkom',
    summary:
      'Website utama sekolah vokasi teknologi: jurusan, prestasi, dan pendaftaran siswa baru dalam satu halaman yang mudah dijelajahi.',
    context:
      'Calon siswa dan orang tua perlu menemukan jurusan, fasilitas, prestasi, dan jalur pendaftaran SPMB tanpa berpindah-pindah halaman.',
    features: [
      'Hero bergilir dengan akses cepat ke SPMB, asisten NEXA AI, dan pencari jurusan NextTel',
      'Profil empat jurusan: RPL, Pengembangan Game, TKJ, dan TJAT',
      'Fasilitas, mitra industri, prestasi, dan hall of fame alumni',
      'FAQ jurusan dan pilihan bahasa',
    ],
    stack: ['Vite'],
  },
  {
    id: 'menfess',
    code: 'WEB-03',
    name: 'Menfess Spenthree',
    type: 'Platform komunitas sekolah',
    url: 'https://menfess-spenthree.vercel.app/',
    image: 'menfess',
    summary:
      'Ruang menfess anonim untuk warga SMP Negeri 3 Sokaraja: titip pesan, cerita, apresiasi, dan aspirasi ke OSIS.',
    context:
      'Siswa ingin menyampaikan pesan tanpa menyebut nama, tetapi isinya harus tetap saling menghargai. Setiap kiriman perlu diperiksa sebelum tayang.',
    features: [
      'Nama pengirim tidak ditampilkan; setiap menfess divalidasi sebelum tayang',
      'Linimasa dengan filter Menfess, Aspirasi, Curhat, dan Apresiasi',
      'Status tayang di website dan antrean unggah ke Instagram',
      'Navigasi bawah ala aplikasi: Tulis, Peringkat, Status, Panduan',
    ],
    stack: ['Vite'],
  },
  {
    id: 'flexboard',
    code: 'WEB-04',
    name: 'FlexBoard',
    type: 'Aplikasi internal tim',
    url: 'https://flexboard-zeta.vercel.app/',
    image: 'flexboard',
    summary:
      'Workspace internal tim Flexbox untuk membagi tugas, memantau progres, dan melihat aktivitas anggota.',
    context:
      'Tim butuh satu tempat untuk melihat siapa mengerjakan apa. Leader mengatur tugas, anggota mengerjakan checklist sesuai izinnya.',
    features: [
      'Beranda dengan ringkasan tugas bersama dan akumulasi progres',
      'Halaman Tugas Kami, Progres Tim, Anggota, dan Aktivitas',
      'Pencarian tugas berdasarkan judul atau deskripsi',
      'Hak akses berbeda untuk leader dan anggota',
    ],
    stack: ['Vite'],
  },
  {
    id: 'kas',
    code: 'WEB-05',
    name: 'FlexKas',
    type: 'Aplikasi keuangan tim',
    url: 'https://kas.flexboxstudio.site/',
    image: 'kas',
    summary:
      'Pencatatan kas dan iuran tim Flexbox. Satu tim, satu kas, dan semua anggota bisa memeriksanya.',
    context:
      'Iuran dan pengeluaran tim perlu tercatat terbuka, supaya anggota bisa mengecek status iurannya tanpa harus bertanya ke bendahara.',
    features: [
      'Catatan pemasukan, pengeluaran, dan status iuran anggota',
      'Akun tim dengan peran: pengelola kas dan anggota yang melihat',
      'Bisa dipasang di layar utama ponsel',
    ],
    stack: ['Vite'],
  },
];

export default works;
