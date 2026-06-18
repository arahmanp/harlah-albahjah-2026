# CLAUDE.md — Harlah Al-Bahjah 2026

Panduan konteks untuk Claude Code. Baca file ini sebelum memulai pekerjaan apapun di proyek ini.

---

## Gambaran Proyek

**Nama:** Harlah Al-Bahjah 2026
**Tujuan:** Website promosi & informasi acara Harlah (perayaan ulang tahun) Pesantren Al-Bahjah tahun 2026, sekaligus portal kompetisi antar-jenjang pendidikan (SD, SMP, SMA IQU).
**Tanggal Acara:** 25 Juni 2026
**Status:** Dalam pengembangan aktif — beberapa aset masih placeholder (`temp-image.jpg`, `temp-video.mp4`).

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Markup | HTML5 (Vanilla, tanpa framework) |
| Styling | CSS3 + CSS Variables + Bootstrap 5.3.8 |
| Scripting | JavaScript + jQuery 4.0.0 |
| Icons | Bootstrap Icons 1.13.1 |
| Build System | **Tidak ada** — static file, tidak perlu kompilasi |
| Backend | **Tidak ada** — pure frontend |
| Database | **Tidak ada** — data hardcoded di HTML |

**Tidak ada `package.json`, `node_modules`, `.env`, atau proses build apapun.**

Untuk menjalankan secara lokal, cukup buka `index.html` di browser, atau gunakan Live Server VSCode / `python -m http.server`.

---

## Struktur Direktori

```
harlah-albahjah-2026/
├── index.html                  ← Halaman utama (landing page)
├── competitions-list.md        ← Daftar cabang lomba per jenjang
│
├── css/
│   ├── global.css              ← CSS Variables, reset, utilitas global
│   ├── index.css               ← Styling khusus halaman index
│   ├── competitions.css        ← Styling halaman daftar kompetisi
│   ├── division.css            ← Styling halaman pemilihan divisi
│   └── banin.css               ← Styling minor tambahan
│
├── js/
│   └── index.js                ← Semua interaksi JS halaman index
│
├── assets/
│   ├── img/
│   │   ├── logo-ab.png
│   │   ├── temp-image.jpg      ← PLACEHOLDER — belum diganti
│   │   ├── temp-img.jpg        ← PLACEHOLDER — belum diganti
│   │   └── icon/
│   │       └── bootstrap-icons-1.13.1/   ← 1500+ SVG icons
│   └── video/
│       └── temp-video.mp4      ← PLACEHOLDER — belum diganti
│
├── lib/
│   ├── bootstrap5/             ← Bootstrap 5.3.8 (self-hosted)
│   └── jquery/
│       └── jquery-4.0.0.min.js
│
└── competitions/
    ├── competitions.html       ← Halaman index kompetisi
    └── banin/
        ├── banin.html          ← Pemilihan divisi santri banin
        ├── sdiqu/
        │   └── sdiqu.html      ← Cabang lomba SD IQU
        ├── smpiqu/
        │   └── smpiqu.html     ← Cabang lomba SMP IQU
        └── smaiqu/
            └── smaiqu.html     ← Cabang lomba SMA IQU
```

---

## Arsitektur & Routing

Website ini adalah **multi-page application (MPA) berbasis file statis**. Tidak ada client-side router.

```
index.html
  └── sections: #hero, #about, #events, #competitions, #faq, #sponsor, #contact

competitions/competitions.html      ← Info umum kompetisi

competitions/banin/banin.html       ← Pilih divisi (SD / SMP / SMA)
competitions/banin/sdiqu/sdiqu.html     ← Lomba SD IQU
competitions/banin/smpiqu/smpiqu.html   ← Lomba SMP IQU
competitions/banin/smaiqu/smaiqu.html   ← Lomba SMA IQU
```

Navigasi halaman menggunakan `<a href="...">` biasa. Scroll-navigation dalam satu halaman menggunakan anchor `href="#section-id"` dengan smooth scroll dari jQuery.

---

## Daftar Cabang Lomba

Daftar Perlombaan ada pada file `competitions-list.md`

---

## Sistem Tema (Light/Dark Mode)

Tema dikelola melalui atribut `data-theme` di tag `<html>` dan disimpan di `localStorage`.

- **Key localStorage:** `harlah-theme` (nilai: `"light"` atau `"dark"`)
- **Toggle button:** `#themeToggle` (menggunakan Bootstrap Icons `bi-sun-fill` / `bi-moon-stars-fill`)
- **Default:** mengikuti preferensi sistem (`prefers-color-scheme`)
- **Implementasi CSS:** via CSS Variables di `css/global.css`

```css
/* Light mode: :root { ... } */
/* Dark mode: [data-theme="dark"] { ... } */
```

Untuk menambah warna/variabel baru, selalu tambahkan di kedua blok (`:root` dan `[data-theme="dark"]`).

---

## CSS Variables & Design System

Semua token desain ada di `css/global.css`:

```css
/* Brand Colors */
--clr-green-900 → --clr-green-500   (hijau gelap ke terang)
--clr-yellow-400, --clr-yellow-300, --clr-yellow-200

/* Semantic (berubah sesuai tema) */
--bg-primary, --bg-secondary, --bg-card, --bg-glass, --bg-navbar
--text-primary, --text-secondary, --text-muted
--border-color, --shadow-sm, --shadow-md, --shadow-lg
--accent (kuning), --accent-hover

/* Typography */
--font-display, --font-body  (saat ini: system-ui — Google Fonts dikomentari)

/* Radius */
--radius-sm (10px), --radius-md (16px), --radius-lg (24px), --radius-xl (36px), --radius-pill (9999px)

/* Transitions */
--transition-fast (0.2s), --transition-base (0.35s), --transition-slow (0.6s)

/* Blur */
--blur-glass (18px), --blur-sm (8px)
```

**Catatan:** Google Fonts (`Playfair Display` + `DM Sans`) sudah disiapkan di global.css tapi masih dikomentari — jika diaktifkan, uncomment import dan ganti `--font-display`/`--font-body`.

---

## JavaScript — Fitur & Pola

Semua JS ada di `js/index.js`, ditulis dengan campuran jQuery + Vanilla JS, wrapped dalam `$(function() { ... })`.

| Fitur | Implementasi |
|---|---|
| Theme toggle | `localStorage` + `data-theme` attr |
| Navbar scroll effect | `$(window).on('scroll')` → class `.scrolled` |
| Active nav link | Deteksi section yg terlihat saat scroll |
| Mobile menu | Toggle class `.open` pada `#mobileMenu` |
| Countdown timer | `setInterval` tiap 1 detik, target: `new Date('2026-06-25T00:00:00')` |
| FAQ accordion | `.faq-item` toggle class `.open` |
| Scroll fade-in | `IntersectionObserver` → class `.visible` pada elemen `.fade-up` |
| Smooth scroll | jQuery `animate({ scrollTop })` offset 90px dari navbar |

---

## Konvensi Kode

### HTML
- IDs untuk section utama: `#hero`, `#about`, `#events`, `#competitions`, `#faq`, `#sponsor`, `#contact`
- Prefix class sesuai komponen: `.glass-card`, `.event-card`, `.comp-card`, `.fade-up`
- Gunakan Bootstrap grid (`col-lg-*`, `col-md-*`, `col-6`) untuk layout

### CSS
- Gunakan CSS Variables dari `global.css`, **jangan hardcode warna**
- Penamaan BEM-like: `.countdown-wrapper > .countdown-item`, `.event-card-body`
- CSS page-specific ditulis di file CSS-nya sendiri (bukan di global.css)

### JavaScript
- Gunakan jQuery untuk DOM manipulation & event handling
- Gunakan Vanilla JS untuk API modern (`IntersectionObserver`, `matchMedia`)
- Jangan tambahkan library baru tanpa pertimbangan — simpan di `/lib/`

---

## Aset & Placeholder

| File | Status | Keterangan |
|---|---|---|
| `assets/img/temp-image.jpg` | PLACEHOLDER | Perlu diganti foto acara nyata |
| `assets/img/temp-img.jpg` | PLACEHOLDER | Perlu diganti |
| `assets/video/temp-video.mp4` | PLACEHOLDER | Perlu diganti video trailer |
| `assets/img/logo-ab.png` | FINAL | Logo Al-Bahjah |

---

## Integrasi Eksternal

Proyek ini terhubung ke layanan Google (URL hardcoded di HTML):
- **Google Forms** — untuk link pendaftaran lomba di setiap halaman divisi
- **Google Drive** — untuk link unduh peraturan lomba (rulebook)

Tidak ada API key atau autentikasi — semua link publik.

---

## Hal-hal yang Perlu Diperhatikan

1. **Tidak ada build process** — perubahan CSS/JS langsung terefleksi di browser (pakai live-server).
2. **Library self-hosted** — Bootstrap & jQuery ada di `/lib/`, bukan CDN. Jaga konsistensi versi.
3. **Tanggal event hardcoded** — `'2026-06-25T00:00:00'` ada di `js/index.js:106`. Update jika tanggal berubah.
4. **Halaman kategori "Putri" belum ada** — saat ini baru ada `/banin/`. Halaman putri perlu dibuat dengan struktur yang sama.
5. **Font Google dikomentari** — jika ingin mengaktifkan, uncomment di `css/global.css`.
6. **README.md minimal** — file ini yang menjadi sumber kebenaran untuk struktur proyek.
7. **Selalu buat checkpoint** — lakukan commit setiap kali membuat fitur/kode baru. pastikan buat commit message yang cukup deskriptif dalam bahasa inggris.
