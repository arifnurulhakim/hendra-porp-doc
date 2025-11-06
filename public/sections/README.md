# HTML Sections Structure

Struktur HTML untuk dokumentasi Hendra Prop telah dipisahkan menjadi section-section terpisah yang di-load secara dinamis.

## Struktur Folder

```
public/
├── index.html              # Template utama (sederhana)
├── sections/              # Folder berisi semua section HTML
│   ├── cover.html
│   ├── table-of-contents.html
│   ├── implementation-status.html
│   ├── section-01.html    # BRD
│   ├── section-02.html    # SRS
│   ├── section-03.html    # ERD
│   ├── section-04.html    # DFD
│   ├── section-05.html    # Use Cases
│   ├── section-06.html    # Activity Diagrams
│   ├── section-07.html    # Technical Specs
│   ├── section-08.html    # Database Design
│   ├── section-09.html    # API Specs
│   └── section-10.html    # Sprint Planning
└── js/
    └── modules/
        └── section-loader.js  # Module untuk load sections
```

## Section Files

### 1. `cover.html`
Cover page dengan judul dan meta informasi dokumentasi.

### 2. `table-of-contents.html`
Daftar isi lengkap dengan semua section dan nomor halaman.

### 3. `implementation-status.html`
Status implementasi fitur-fitur yang sudah dikembangkan.

### 4. `section-01.html` - BRD
Business Requirements Document - Functional requirements dan business rules.

### 5. `section-02.html` - SRS
Software Requirements Specification - Technical requirements detail.

### 6. `section-03.html` - ERD
Entity Relationship Diagram - Database schema dan relationships.

### 7. `section-04.html` - DFD
Data Flow Diagram - Alur data dalam sistem.

### 8. `section-05.html` - Use Cases
Use Case Diagram & Specifications - Use case scenarios.

### 9. `section-06.html` - Activity Diagrams
Activity Diagrams & Business Process Flows - Business process flows.

### 10. `section-07.html` - Technical Specs
Technical Specifications & Architecture - Arsitektur dan spesifikasi teknis.

### 11. `section-08.html` - Database Design
Database Design & Schema - Design database lengkap.

### 12. `section-09.html` - API Specs
API Specifications - Endpoint API dan dokumentasi.

### 13. `section-10.html` - Sprint Planning
Sprint Planning & Project Timeline - Timeline dan planning project.

## Cara Kerja

### 1. Dynamic Loading
Sections di-load secara dinamis menggunakan JavaScript Fetch API melalui `SectionLoader` module.

### 2. Loading Sequence
1. `index.html` di-load dengan container kosong (`#sections-container`)
2. JavaScript `main.js` dijalankan
3. `SectionLoader` menginisialisasi dan mulai load sections secara berurutan
4. Setiap section di-append ke container setelah di-load
5. Event `sectionsLoaded` di-dispatch setelah semua section loaded
6. Module lain (TOC, Navigation, Headings) diinisialisasi setelah sections loaded

### 3. Section Loader Module
`js/modules/section-loader.js`:
- Load semua sections secara berurutan
- Handle error jika section tidak ditemukan
- Dispatch event ketika semua sections loaded
- Support lazy loading untuk section tertentu

## Keuntungan Struktur Ini

1. **Modularity** - Setiap section independen dan mudah di-edit
2. **Maintainability** - Edit satu section tanpa mempengaruhi yang lain
3. **Performance** - Browser dapat cache file HTML individual
4. **Scalability** - Mudah menambah section baru
5. **Collaboration** - Multiple developer bisa edit section berbeda secara paralel
6. **Version Control** - Perubahan section lebih mudah di-track
7. **Reusability** - Section bisa digunakan di tempat lain jika perlu

## Menambah Section Baru

1. **Buat file HTML baru** di folder `sections/` (contoh: `section-11.html`)
2. **Update `section-loader.js`**:
   ```javascript
   const sections = [
       // ... existing sections
       { id: 'section-11', file: 'sections/section-11.html' }
   ];
   ```
3. **Update `index.html`** - Tambahkan link di Floating TOC:
   ```html
   <li><a href="#section-11"><span class="toc-title">11. New Section</span></a></li>
   ```
4. **Update `table-of-contents.html`** - Tambahkan entry di daftar isi

## Format File Section

Setiap file section harus:
- Berisi HTML valid (tanpa `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`)
- Memiliki container dengan class `content-section` dan ID yang sesuai
- Format: `<div class="content-section page-break" id="section-XX">...</div>`

## Browser Support

- Modern browsers dengan ES6 Fetch API support
- Chrome 42+, Firefox 39+, Safari 10.1+, Edge 14+

## Development Notes

- Sections di-load secara synchronous (berurutan) untuk maintain order
- Error handling: Jika section gagal di-load, akan muncul error message
- Loading indicator bisa ditambahkan jika diperlukan


