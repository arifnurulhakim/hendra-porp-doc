# 📋 Hendra Prop - Dokumentasi Sistem

Dokumentasi lengkap untuk proyek Hendra Prop - Sistem Manajemen Properti Multi-Kantor.

## 📖 Dokumentasi

Dokumentasi lengkap tersedia dalam format HTML yang dapat diakses melalui browser atau di-deploy ke Netlify.

### Struktur Dokumentasi

1. **Business Requirements Document (BRD)** - Kebutuhan bisnis lengkap
2. **Software Requirements Specification (SRS)** - Spesifikasi sistem
3. **Entity Relationship Diagram (ERD)** - Desain database
4. **Data Flow Diagram (DFD)** - Alur data sistem
5. **Use Case Diagram & Specifications** - 39 use cases
6. **Activity Diagrams & Business Process Flows** - Proses bisnis
7. **Technical Specifications & Architecture** - Arsitektur teknis
8. **Database Design & Schema** - 12 tables lengkap
9. **API Specifications** - REST API endpoints
10. **Sprint Planning & Project Timeline** - Timeline 6 sprints

## 🚀 Deploy ke Netlify

### Option 1: Netlify UI (Paling Mudah)

1. Push repository ke GitHub/GitLab/Bitbucket
2. Login ke [Netlify](https://app.netlify.com/)
3. Klik "Add new site" → "Import an existing project"
4. Pilih repository `hendra-prop`
5. Build settings:
   - **Build command:** (kosongkan atau `echo 'No build'`)
   - **Publish directory:** `public`
6. Klik "Deploy site"

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy (dari root folder hendra-prop)
netlify deploy --prod
```

### Option 3: Drag & Drop

1. Buka [Netlify Drop](https://app.netlify.com/drop)
2. Drag folder `public/` ke browser
3. Selesai! URL langsung aktif

## 📂 Struktur Folder

```
hendra-prop/
├── public/                          # Deploy folder
│   └── index.html                   # Dokumentasi lengkap (11,000+ baris)
├── docs/                            # Source documentation
│   ├── FULL_DOCUMENTATION.html      # Same as public/index.html
│   ├── generate_pdf.html            # Summary version (60 pages)
│   ├── 01-ANALISIS-SISTEM.md
│   ├── 02-BUSINESS-REQUIREMENTS.md
│   ├── 03-TECHNICAL-SPECIFICATIONS.md
│   ├── 04-DATABASE-DESIGN.md
│   ├── 05-USER-STORIES.md
│   ├── 06-API-SPECIFICATIONS.md
│   ├── 07-SPRINT-PLANNING.md
│   ├── 08-DATA-FLOW-DIAGRAM.md
│   ├── 09-USE-CASE-DIAGRAM.md
│   └── 10-ACTIVITY-DIAGRAMS.md
├── netlify.toml                     # Netlify configuration
├── .gitignore
└── README.md
```

## 🖨️ Generate PDF

1. Buka dokumentasi di browser (local atau Netlify URL)
2. Tekan `Cmd + P` (Mac) atau `Ctrl + P` (Windows)
3. Settings:
   - Destination: Save as PDF
   - Paper: A4
   - Margins: Default
   - Background graphics: ON
4. Save

Hasil: PDF ~150 halaman dengan cover, daftar isi, dan semua detail.

## 📊 Informasi Proyek

- **Proyek:** Hendra Prop - Sistem Manajemen Properti Multi-Kantor
- **Target Launch:** 3 Maret 2026
- **Stack:** Laravel 11 + Filament 3 + MySQL + Redis
- **Dokumentasi:** Complete (10 sections, 150+ pages)

## 🔗 Links

- **Local:** `file://./public/index.html`
- **Netlify:** (akan tersedia setelah deploy)

## 📝 Update Dokumentasi

Jika ada perubahan pada markdown files di `docs/`:

```bash
# Re-generate HTML
cd docs/
python3 generate_html.py  # (script belum dibuat, manual update untuk sekarang)

# Copy ke public/
cp FULL_DOCUMENTATION.html ../public/index.html

# Deploy update ke Netlify
netlify deploy --prod
```

## 📞 Support

Untuk pertanyaan atau update dokumentasi, hubungi tim development.

---

© 2025 Hendra Prop. All rights reserved.

