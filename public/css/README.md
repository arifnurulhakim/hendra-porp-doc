# CSS Module Structure

Struktur CSS untuk aplikasi dokumentasi Hendra Prop telah diorganisir menjadi modul-modul terpisah berdasarkan fungsinya.

## Struktur Folder

```
public/css/
├── style.css          # Main stylesheet (imports all modules)
├── base.css           # Base styles (reset, typography base, body)
├── typography.css     # Typography (headings, paragraphs, lists)
├── components.css     # Components (cover, sections, tables, code, alerts)
├── toc.css            # Table of Contents styles
├── floating-toc.css   # Floating TOC sidebar styles
├── utilities.css      # Utility classes (print-button, toast, etc.)
└── print.css          # Print media queries
```

## Modul CSS

### 1. `base.css`
Base styles dan reset CSS.

**Berisi:**
- Font import (Google Fonts - Inter)
- CSS reset (* { margin: 0; padding: 0; box-sizing: border-box; })
- Body styles
- HR styles

### 2. `typography.css`
Typography dan text formatting.

**Berisi:**
- Heading styles (h1-h6)
- Paragraph styles
- List styles (ul, ol, li)
- Heading anchor links (.heading-link)

### 3. `components.css`
Reusable components.

**Berisi:**
- Cover page styles (.cover)
- Content sections (.content-section)
- Tables (table, th, td)
- Code blocks (pre, code)
- Alerts (.alert, .alert-info, .alert-success)
- Mermaid diagrams (.mermaid)

### 4. `toc.css`
Static Table of Contents styles.

**Berisi:**
- TOC container (.toc)
- TOC list styles (.toc-list)
- TOC items (li)
- TOC links (a)
- TOC title and page number styles

### 5. `floating-toc.css`
Floating Table of Contents sidebar styles.

**Berisi:**
- Floating TOC container (.floating-toc)
- Collapsed state (.floating-toc.collapsed)
- TOC header (.floating-toc-header)
- TOC toggle button (.floating-toc-toggle)
- TOC content area (.floating-toc-content)
- Custom scrollbar styles
- Active state styles (.floating-toc .toc-list li.active)

### 6. `utilities.css`
Utility classes dan helper components.

**Berisi:**
- Print button (.print-button)
- Copy toast notification (.copy-toast)
- Utility classes (.no-print, .page-break)

### 7. `print.css`
Print media queries untuk PDF generation.

**Berisi:**
- Print-specific styles (@media print)
- Page break utilities
- Print font sizes
- Hidden elements (.no-print)
- Page break controls (.page-break)

### 8. `style.css`
Main stylesheet yang mengimport semua modul.

**Berisi:**
- @import statements untuk semua modul CSS
- Urutan import penting untuk cascade order

## Urutan Import

Urutan import di `style.css` penting untuk cascade order:

1. `base.css` - Base styles harus pertama
2. `typography.css` - Typography setelah base
3. `components.css` - Components menggunakan typography
4. `toc.css` - Static TOC
5. `floating-toc.css` - Floating TOC (overrides static TOC jika perlu)
6. `utilities.css` - Utilities bisa override styles sebelumnya
7. `print.css` - Print styles terakhir (media query)

## Penggunaan

### Di HTML
Load main stylesheet di `<head>`:

```html
<link rel="stylesheet" href="css/style.css">
```

### Development
Untuk development, edit file CSS individual sesuai kebutuhan. Semua perubahan akan otomatis ter-compile melalui `style.css`.

### Customization
Untuk menambahkan custom styles:

1. **Buat file baru** di folder `css/` (contoh: `custom.css`)
2. **Import di `style.css`**: `@import 'custom.css';`
3. **Atau edit modul yang sesuai** langsung

## Keuntungan Struktur Ini

1. **Modularity** - Setiap modul memiliki tanggung jawab yang jelas
2. **Maintainability** - Mudah untuk maintain dan update
3. **Reusability** - Modul dapat digunakan kembali
4. **Performance** - Browser dapat cache file CSS individual
5. **Scalability** - Mudah untuk menambah modul baru
6. **Organization** - Kode lebih terorganisir dan mudah dicari

## Best Practices

1. **Jangan edit `style.css`** kecuali untuk menambah import baru
2. **Gunakan specificity yang tepat** untuk menghindari conflicts
3. **Gunakan CSS variables** untuk colors dan spacing jika perlu
4. **Test print styles** sebelum deploy
5. **Minify CSS** untuk production jika perlu


