import './previews.css';

function InteriorArt() {
  return (
    <svg viewBox="0 0 440 340" fill="none" focusable="false">
      <path fill="#e5d8c4" d="M0 0h440v340H0z" />
      <path fill="#f4ebdc" d="M0 0h282v248H0z" />
      <path fill="#cfbda5" d="m282 0 158 0v340l-158-92z" />
      <path fill="#b9a58b" d="M0 248h282l158 92H0z" />
      <path fill="#1e3541" d="M34 34h129v167H34z" />
      <path fill="#a8b6ae" d="M42 42h113v151H42z" />
      <path fill="#d8ded0" d="m42 140 65-65 48 42v76H42z" />
      <path stroke="#f0e7d5" strokeWidth="5" d="M98 42v151M42 120h113" />
      <path fill="#d7c7af" d="M190 68h60v87h-60z" />
      <path stroke="#94826c" strokeWidth="2" d="M200 81h40v62h-40z" />
      <path fill="#6f7969" d="M207 124c-18-33 27-41 19-7l-6 19z" />
      <path fill="#435654" d="M65 214q0-22 23-22h130q23 0 23 22v62H65z" />
      <path
        fill="#60716b"
        d="M53 235q0-11 12-11h12v44h152v-44h12q12 0 12 11v46H53z"
      />
      <path stroke="#273f40" strokeWidth="4" d="M69 281v13m168-13v13" />
      <path fill="#acb0a0" d="m86 205 35 2-5 35-34-4z" />
      <path fill="#d8c6a5" d="m174 208 33-5 6 35-34 5z" />
      <path fill="#d7c6ad" d="m129 281 141-3 54 35-148 5z" />
      <path fill="#805e42" d="m163 268 104-3 27 16-107 4z" />
      <path stroke="#70523d" strokeWidth="5" d="m179 283-2 25m103-26 4 24" />
      <path fill="#e9dfcb" d="M224 248h15l-2 20h-11z" />
      <path
        stroke="#485b4b"
        strokeWidth="3"
        d="M231 250v-26m0 18-10-10m10 4 9-12"
      />
      <path stroke="#283d42" strokeWidth="4" d="M333 250V119m-24 133h48" />
      <path fill="#f3e4c5" d="m312 91 41 0 16 35h-72z" />
      <path
        fill="#6d7c5c"
        d="M382 240c-42-38-16-70 0-27-12-57 28-65 16-12 29-31 43-1-7 46z"
      />
      <path fill="#a17553" d="M369 242h37l-6 41h-25z" />
      <path stroke="#c7b398" d="m286 0 0 248 154 89" />
    </svg>
  );
}

function FurnitureArt({ kind = 'chair' }) {
  return (
    <svg viewBox="0 0 240 180" fill="none" focusable="false">
      <ellipse cx="123" cy="156" rx="77" ry="9" fill="#d9d0c2" />
      {kind === 'chair' ? (
        <>
          <path
            stroke="#77593e"
            strokeWidth="8"
            d="m75 113-8 45m93-45 11 45M78 103 69 48m91 55 9-55"
          />
          <path fill="#b19a72" d="M78 39q42-14 82 0v58H78z" />
          <path
            stroke="#dac8a3"
            strokeWidth="3"
            d="M89 43v45m12-48v48m12-50v50m12-50v50m12-48v48m12-45v45"
          />
          <path fill="#79634b" d="m70 99 89-3 18 21-94 5z" />
          <path fill="#b9a689" d="m70 96 89-3 18 17-94 5z" />
        </>
      ) : kind === 'table' ? (
        <>
          <path
            stroke="#8c6547"
            strokeWidth="11"
            d="m73 100-9 56m106-56 10 56m-51-63v54"
          />
          <ellipse cx="122" cy="92" rx="83" ry="30" fill="#8f694b" />
          <ellipse cx="122" cy="86" rx="83" ry="30" fill="#bc9670" />
          <path
            stroke="#a7815d"
            d="M58 77q54 25 128-4M49 87q64 25 145-3m-123 18q55 12 103-2"
          />
        </>
      ) : (
        <>
          <path stroke="#72543d" strokeWidth="7" d="m52 133-3 24m141-24 3 24" />
          <path fill="#9f7957" d="M46 57h151v80H46z" />
          <path fill="#bb9470" d="m46 57 17-10h148l-14 10z" />
          <path fill="#866344" d="m197 57 14-10v78l-14 12z" />
          <path stroke="#72543d" strokeWidth="2" d="M120 61v71" />
          <path
            stroke="#d3b38b"
            strokeWidth="2"
            d="M56 66h54v60H56zm74 0h57v60h-57z"
          />
          <path stroke="#634c39" strokeWidth="3" d="M108 92v12m24-12v12" />
          <path fill="#e0dacd" d="M155 29h19l-2 20h-14z" />
          <path
            stroke="#61745b"
            strokeWidth="3"
            d="M165 30V12m0 10-9-8m9 2 8-9"
          />
        </>
      )}
    </svg>
  );
}

function BusinessPreview() {
  return (
    <div className="pv-business">
      <div className="pv-site-nav">
        <strong>
          ruang<span>karya.</span>
        </strong>
        <div>
          Layanan <span>Proyek</span> Tentang kami
        </div>
        <span className="pv-nav-contact">Mari bicara ↗</span>
      </div>
      <div className="pv-business-hero">
        <div className="pv-business-copy">
          <span className="pv-eyebrow">STUDIO INTERIOR · YOGYAKARTA</span>
          <h3>
            Ruang yang baik,
            <br />
            bermula dari cerita.
          </h3>
          <p>
            Interior dan furnitur kustom untuk ruang yang benar-benar terasa
            milik Anda.
          </p>
          <span className="pv-solid-label">Ceritakan ruang Anda ↗</span>
          <div className="pv-business-note">
            <span>01 / 03</span>
            <span>
              Dirancang dekat.
              <br />
              Dikerjakan dengan hati.
            </span>
          </div>
        </div>
        <div className="pv-interior">
          <InteriorArt />
          <span>RUMAH TEDUH — SLEMAN, 2025</span>
        </div>
      </div>
      <div className="pv-services">
        <span>
          Ruang Anda,
          <br />
          <strong>keahlian kami.</strong>
        </span>
        <div>
          <b>01</b>
          <strong>Desain interior</strong>
          <small>Dari ide hingga detail ruang.</small>
        </div>
        <div>
          <b>02</b>
          <strong>Furnitur kustom</strong>
          <small>Pas untuk setiap sudut.</small>
        </div>
        <div>
          <b>03</b>
          <strong>Penataan ruang</strong>
          <small>Fungsi bertemu kenyamanan.</small>
        </div>
      </div>
      <div className="pv-business-bottom">
        KONSULTASI <span>—</span> DESAIN <span>—</span> PRODUKSI <span>—</span>{' '}
        RUANG SIAP DINIKMATI
      </div>
    </div>
  );
}

const products = [
  {
    name: 'Kursi Sela',
    category: 'KURSI MAKAN',
    price: 'Rp1.250.000',
    spec: 'Jati solid · 48 × 52 × 78 cm',
    kind: 'chair',
  },
  {
    name: 'Meja Temu',
    category: 'MEJA KOPI',
    price: 'Rp2.400.000',
    spec: 'Jati solid · Ø 80 × 42 cm',
    kind: 'table',
  },
  {
    name: 'Kabinet Nara',
    category: 'PENYIMPANAN',
    price: 'Rp3.800.000',
    spec: 'Jati solid · 120 × 40 × 75 cm',
    kind: 'cabinet',
  },
];

function CatalogPreview() {
  return (
    <div className="pv-catalog">
      <div className="pv-site-nav">
        <strong>
          nara<span> / living</span>
        </strong>
        <div>
          Koleksi <span>Cerita kami</span> Material
        </div>
        <span className="pv-nav-contact">Katalog 2025 ↗</span>
      </div>
      <div className="pv-catalog-intro">
        <div>
          <span className="pv-eyebrow">DIBUAT UNTUK KESEHARIAN</span>
          <h3>Sederhana. Bertahan lama.</h3>
        </div>
        <p>
          Furnitur jati dengan bentuk yang tenang.
          <br />
          Dibuat oleh tangan-tangan terampil.
        </p>
      </div>
      <div className="pv-category-row">
        <div>
          <span className="pv-category-active">
            Semua produk <small>12</small>
          </span>
          <span>Kursi</span>
          <span>Meja</span>
          <span>Penyimpanan</span>
        </div>
        <span>Urutkan: Pilihan kami ↓</span>
      </div>
      <div className="pv-product-grid">
        {products.map((product, index) => (
          <div className="pv-product" key={product.name}>
            <div className="pv-product-art">
              <span>
                {index === 0
                  ? 'TERLARIS'
                  : index === 1
                    ? 'JATI PILIHAN'
                    : 'BUATAN LOKAL'}
              </span>
              <FurnitureArt kind={product.kind} />
            </div>
            <span className="pv-eyebrow">{product.category}</span>
            <div className="pv-product-name">
              <h4>{product.name}</h4>
              <span>↗</span>
            </div>
            <p>{product.spec}</p>
            <strong>{product.price}</strong>
          </div>
        ))}
      </div>
      <div className="pv-catalog-foot">
        <span>Material alami. Karakter yang tak terganti.</span>
        <span>Jati legal · Finishing water-based · Buatan Indonesia</span>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="pv-dashboard">
      <aside className="pv-sidebar">
        <strong>
          nara<span> workspace</span>
        </strong>
        <small>RUANG KERJA</small>
        <div>
          ▦ <span>Ringkasan</span>
        </div>
        <div className="pv-sidebar-active">
          ▤ <span>Produk</span>
          <b>12</b>
        </div>
        <div>
          ▧ <span>Kategori</span>
        </div>
        <div>
          ⚙ <span>Pengaturan</span>
        </div>
        <p>
          <i>AD</i>
          <span>
            Admin Nara<small>Pengelola katalog</small>
          </span>
        </p>
      </aside>
      <div className="pv-dashboard-main">
        <div className="pv-dash-topline">
          <span>
            Katalog / <b>Produk</b>
          </span>
          <span>
            Ruang kerja Nara <i>AD</i>
          </span>
        </div>
        <div className="pv-dash-heading">
          <div>
            <span className="pv-eyebrow">PENGELOLAAN KATALOG</span>
            <h3>Produk</h3>
            <p>Kelola informasi dan ketersediaan produk Anda.</p>
          </div>
          <span className="pv-solid-label">+ Tambah produk</span>
        </div>
        <div className="pv-stats">
          <div>
            <span>Total produk</span>
            <strong>
              12 <small>di katalog</small>
            </strong>
          </div>
          <div>
            <span>Ditampilkan</span>
            <strong>
              10 <small className="pv-green">Aktif</small>
            </strong>
          </div>
          <div>
            <span>Perlu dilengkapi</span>
            <strong>
              02 <small>Draf</small>
            </strong>
          </div>
        </div>
        <div className="pv-dash-columns">
          <div className="pv-inventory">
            <div className="pv-table-toolbar">
              <strong>
                Daftar produk <small>12</small>
              </strong>
              <span>⌕ Cari produk…</span>
            </div>
            <div className="pv-table-row pv-table-head">
              <span>Nama produk</span>
              <span>Harga</span>
              <span>Status</span>
            </div>
            {products.slice(0, 2).map((product) => (
              <div className="pv-table-row" key={product.name}>
                <span className="pv-table-product">
                  <i>
                    <FurnitureArt kind={product.kind} />
                  </i>
                  <span>
                    <b>{product.name}</b>
                    <small>{product.category.toLowerCase()}</small>
                  </span>
                </span>
                <span>{product.price}</span>
                <span className="pv-status">Aktif</span>
              </div>
            ))}
            <div className="pv-table-row">
              <span className="pv-table-product">
                <i>
                  <FurnitureArt kind="cabinet" />
                </i>
                <span>
                  <b>Kabinet Nara</b>
                  <small>penyimpanan</small>
                </span>
              </span>
              <span>—</span>
              <span className="pv-status pv-draft">Draf</span>
            </div>
            <div className="pv-empty">
              <span>▧</span>
              <div>
                <strong>Belum ada arsip</strong>
                <small>Produk yang diarsipkan akan tampil di sini.</small>
              </div>
            </div>
            <div className="pv-table-footer">
              Menampilkan 3 dari 12 produk{' '}
              <span>‹ &nbsp; 1 &nbsp; 2 &nbsp; ›</span>
            </div>
          </div>
          <div className="pv-form">
            <div>
              <strong>Produk baru</strong>
              <span>DRAF</span>
            </div>
            <p>Lengkapi detail sebelum diterbitkan.</p>
            <label>
              Nama produk <em>*</em>
            </label>
            <div className="pv-field">Kabinet Nara</div>
            <label>Kategori</label>
            <div className="pv-field">
              Penyimpanan <span>⌄</span>
            </div>
            <label>
              Harga <em>*</em>
            </label>
            <div className="pv-field pv-field-error">
              Rp <span>Masukkan harga</span>
            </div>
            <small className="pv-error">Harga wajib diisi, minimal Rp1.</small>
            <label>Foto produk</label>
            <div className="pv-upload">
              ＋<span>Belum ada foto</span>
              <small>JPG atau PNG, maks. 2 MB</small>
            </div>
            <div className="pv-form-foot">
              <span>Simpan draf</span>
              <span>Terbitkan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectPreview({ project, mobile = false }) {
  const kind = project?.kind || 'business';
  return (
    <div
      className={`project-preview project-preview--${kind}${mobile ? ' is-mobile' : ''}`}
      aria-hidden="true"
    >
      {kind === 'catalog' ? (
        <CatalogPreview />
      ) : kind === 'dashboard' ? (
        <DashboardPreview />
      ) : (
        <BusinessPreview />
      )}
    </div>
  );
}
