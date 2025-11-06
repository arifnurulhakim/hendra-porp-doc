# JavaScript Module Structure

Struktur JavaScript untuk aplikasi dokumentasi Hendra Prop telah diorganisir menjadi modul-modul terpisah menggunakan ES6 Modules.

## Struktur Folder

```
public/
├── js/
│   ├── main.js              # Entry point aplikasi
│   └── modules/
│       ├── toc.js           # Table of Contents module
│       ├── navigation.js    # Navigation & smooth scroll module
│       ├── headings.js      # Heading links & copy functionality
│       └── toast.js         # Toast notification module
└── index.html
```

## Modul

### 1. `main.js`
Entry point aplikasi yang menginisialisasi semua modul dan mengkoordinasikan fungsionalitas.

**Fitur:**
- Inisialisasi semua modul
- Setup global functions untuk backward compatibility dengan inline event handlers
- Auto-initialization saat DOM ready

### 2. `modules/toc.js` - TableOfContents
Menangani floating Table of Contents (TOC) dan tracking section aktif.

**Methods:**
- `toggle()` - Toggle collapsed/expanded state
- `updateActiveItem()` - Update active TOC item berdasarkan scroll position
- `getActiveSection()` - Get current active section ID

### 3. `modules/navigation.js` - Navigation
Menangani smooth scrolling dan navigasi anchor links.

**Methods:**
- `setupSmoothScroll()` - Setup smooth scroll untuk semua anchor links
- `scrollTo(target, options)` - Scroll ke element tertentu
- `getScrollPosition()` - Get current scroll position

### 4. `modules/headings.js` - Headings
Menangani pembuatan heading links dan copy-to-clipboard functionality.

**Methods:**
- `setupHeadings()` - Setup heading links untuk semua headings
- `generateId(text)` - Generate ID dari text content
- `createHeadingLink(heading)` - Create heading link element
- `copyHeadingLink(headingId)` - Copy heading link ke clipboard
- `getAllHeadings()` - Get semua heading elements

### 5. `modules/toast.js` - Toast
Menangani toast notification untuk feedback user.

**Methods:**
- `show(message, duration)` - Show toast notification
- `hide()` - Hide toast notification

## Penggunaan

### Di HTML
Modul di-load menggunakan ES6 module:

```html
<script type="module" src="js/main.js"></script>
```

### Global Functions (untuk backward compatibility)
- `window.toggleToc()` - Toggle TOC (dipanggil dari inline onclick)
- `window.showToast(message)` - Show toast notification

## Browser Support

ES6 Modules didukung di semua browser modern:
- Chrome 61+
- Firefox 60+
- Safari 10.1+
- Edge 16+

## Development

Untuk development, pastikan menggunakan HTTP server (bukan file:// protocol) karena ES6 modules memerlukan CORS. 

Contoh menggunakan Python:
```bash
python -m http.server 8000
```

Atau menggunakan Node.js:
```bash
npx serve .
```

## Keuntungan Struktur Ini

1. **Modularity** - Setiap modul memiliki tanggung jawab yang jelas
2. **Maintainability** - Mudah untuk maintain dan update
3. **Reusability** - Modul dapat digunakan kembali
4. **Testability** - Mudah untuk di-test secara terpisah
5. **Scalability** - Mudah untuk menambah modul baru


