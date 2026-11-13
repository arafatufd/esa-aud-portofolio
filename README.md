# ESA | Digital Solutions by Arafat UFD

Website portofolio dan etalase layanan untuk **ESA | Digital Solutions by Arafat UFD**, freelancer independen di bidang solusi digital (website, dokumen, dan presentasi).

Dibuat dengan **HTML5, CSS3, dan JavaScript murni**. Tanpa framework, tanpa backend, tanpa proses build. Cocok untuk hosting statis seperti GitHub Pages.

Teks website berbahasa Indonesia. Bahasa Inggris hanya dipakai untuk headline, key skills, CTA, nama layanan, dan nama proyek.

---

## Struktur folder

```
esa-portfolio/
├── index.html                      Beranda
├── 404.html                        Halaman "tidak ditemukan"
├── robots.txt
├── sitemap.xml
├── README.md
│
├── services/
│   ├── website-development.html
│   ├── document-formatting.html
│   └── presentation-design.html
│
├── projects/
│   ├── business-presentation.html
│   ├── professional-document.html
│   └── business-landing-page.html
│
└── assets/
    ├── css/
    │   ├── tokens.css              Warna, font, ukuran, jarak (design tokens)
    │   ├── base.css                Reset dan utilitas dasar
    │   ├── components.css          Tombol, kartu, navbar, dan komponen bersama
    │   ├── sections.css            Bagian-bagian beranda dan footer
    │   └── pages.css               Halaman layanan, halaman proyek, dan 404
    ├── js/
    │   ├── config.js               Detail kontak (satu-satunya tempat mengubahnya)
    │   └── main.js                 Menu mobile, tautan kontak, penanda bagian aktif
    └── img/
        └── favicon.svg
```

Beranda memuat `tokens`, `base`, `components`, dan `sections`. Halaman lain memuat keempatnya ditambah `pages.css`.

## Melihat di komputer sendiri

Buka `index.html` di browser, atau jalankan server lokal kecil dari folder proyek:

```
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Mengisi detail kontak

Semua detail kontak ada di satu file: **`assets/js/config.js`**. Isi nilai yang masih kosong (`""`), simpan, lalu unggah ulang.

| Bagian | Isi | Format |
|---|---|---|
| `whatsapp.number` | nomor WhatsApp | hanya angka, dengan kode negara, tanpa `+`, spasi, atau `0` di depan. Contoh format: `62xxxxxxxxxxx` |
| `whatsapp.display` | teks nomor yang tampil di halaman (opsional) | misalnya `+62 xxx-xxxx-xxxx` |
| `whatsapp.message` | pesan awal di chat WhatsApp | bebas diubah atau dikosongkan |
| `email.address` | alamat email | `nama@contoh.com` |
| `marketplace.url` | alamat profil marketplace freelance | diawali `https://` |
| `marketplace.display` | teks tautan yang tampil (opsional) | bebas |

Nilai yang kosong membuat teks placeholder (misalnya `[PLACEHOLDER — WHATSAPP NUMBER]`) tetap tampil dan tautannya hanya menuju bagian Kontak. Tidak perlu mengedit halaman HTML.

## Placeholder yang masih perlu diisi

Cari teks `[PLACEHOLDER — ...]` di file HTML untuk menemukan semuanya.

- **Kontak:** nomor WhatsApp, alamat email, alamat profil marketplace (di `config.js`).
- **Beranda:** foto pribadi (bagian Tentang Saya) dan tiga gambar pratinjau proyek.
- **Halaman layanan (ketiganya):** jumlah revisi dan estimasi waktu pengerjaan.
  - Website Development: jumlah halaman dan fitur dalam paket Basic.
  - Document Formatting: format dokumen yang didukung.
  - Presentation Design: jumlah slide dalam harga awal dan format file yang diserahkan.
- **Halaman proyek (ketiganya):** satu gambar pratinjau utama, tiga gambar galeri beserta keterangannya, alat yang digunakan, dan tahun pembuatan.
  - Business Landing Page juga memerlukan konsep bisnis dan (opsional) tautan demo.
- **Situs:** gambar untuk berbagi di media sosial (`assets/img/og-image.png`, lihat bagian Setelah situs terbit).

### Mengganti bingkai placeholder dengan gambar

Bingkai pratinjau dan foto pribadi dibuat dengan CSS, jadi belum ada file gambar. Di setiap tempat, HTML memuat komentar berisi tag `<img>` yang bisa dipakai. Ganti blok `<div class="placeholder">...</div>` dengan tag `<img>` tersebut, isi atribut `alt`, dan simpan gambarnya di `assets/img/`.

## Menerbitkan di GitHub Pages

- Username GitHub: `arafatufd`
- Nama repositori: `esa-aud-portofolio`
- Alamat situs: https://arafatufd.github.io/esa-aud-portofolio/

Langkah umum:

1. Buat repositori baru di GitHub.
2. Unggah **isi** folder proyek, sehingga `index.html` berada di root repositori.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**, lalu pilih branch `main` dan folder `/ (root)`.
5. Tunggu beberapa menit sampai alamat situs muncul di halaman Pages.

Halaman biasa memakai path relatif, jadi situs bekerja di alamat repositori proyek maupun di root domain. Pengecualiannya `404.html`, yang memakai path dari root situs (lihat bagian Halaman 404).

## Setelah situs terbit

Alamat situs final sudah dipasang di `robots.txt`, `sitemap.xml`, serta tag `canonical` dan `og:url` pada ketujuh halaman (`index.html`, tiga halaman layanan, tiga halaman proyek).

Yang masih perlu dilakukan:

1. Siapkan gambar berbagi sosial berukuran 1200 × 630 px (PNG) dan simpan sebagai `assets/img/og-image.png`.
2. Aktifkan tag `og:image`: di bagian `<head>` ketujuh halaman, hapus penanda komentar (`<!--` dan `-->`) yang mengelilingi baris `<meta property="og:image" ...>`. Alamat gambarnya sudah terisi.
3. Periksa tampilan di perangkat nyata (lihat bagian status pengujian).
4. Uji pratinjau tautan dengan membagikan alamat situs di aplikasi pesan, atau dengan alat pemeriksa Open Graph.

## Halaman 404

GitHub Pages menampilkan `404.html` untuk **semua** alamat yang tidak ada, termasuk yang dalam seperti `/esa-aud-portofolio/projects/tidak-ada`. Karena itu `404.html` memakai path dari root situs (diawali `/esa-aud-portofolio/`), bukan path relatif.

Konsekuensinya:

- Jika nama repositori atau alamat hosting berubah, perbarui semua path yang diawali `/esa-aud-portofolio/` di `404.html`.
- Jika `404.html` dibuka langsung dari komputer (`file://`), gayanya tidak akan dimuat. Untuk mengujinya, jalankan server lokal yang meniru path `/esa-aud-portofolio/`, atau uji langsung di GitHub Pages.
- Jangan memakai tag `<base>`, karena akan merusak tautan `#` dan tautan lompat ke konten.

## Catatan desain

- **Warna:** Deep Navy `#142B4A`, Midnight Navy `#0B1728`, Light Blue `#DCEAF7`, White `#FFFFFF`, Warm Cream `#F7F4ED`, Charcoal `#202631`, dan Soft Gold `#C5A46D` (hanya aksen dekoratif).
- **Font:** Plus Jakarta Sans (heading, navigasi, tombol) dan Inter (teks isi), dimuat dari Google Fonts. Tidak ada font serif.
- **Layout:** lebar konten maksimum 1.160 px. Breakpoint: di bawah 768 px, 768–1023 px, dan 1024 px ke atas. Menu hamburger tampil di bawah 1024 px.
- **Penamaan kelas CSS:** `.blok`, `.blok__elemen`, `.blok--modifier`.
- **Aksesibilitas:** tersedia tautan lompat ke konten utama, fokus keyboard terlihat, target sentuh minimal 44 px, dan animasi mengikuti pengaturan `prefers-reduced-motion`. Tanpa JavaScript, menu navigasi tetap tampil sebagai daftar biasa di layar kecil.

## Status pengujian

Diperiksa di Chromium headless pada lebar 320, 375, 768, 1024, dan 1440 px:

- tidak ada overflow horizontal
- tidak ada tautan atau tombol di bawah 44 px
- audit aksesibilitas (axe-core) tanpa pelanggaran
- validator HTML (Nu) tanpa masalah
- tidak ada error JavaScript

**Belum diuji:**

- perangkat nyata
- Safari dan Firefox
- pemuatan Google Fonts dari jaringan
- `404.html` di GitHub Pages sungguhan (hanya diuji dengan server lokal yang meniru path `/esa-aud-portofolio/`, termasuk alamat yang dalam)
