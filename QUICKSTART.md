# Quick Start Guide

## ⚠️ Penting: Butuh HTTP Server

File HTML ini menggunakan ES6 modules dan Fetch API yang **TIDAK bisa** dijalankan langsung dengan `file://` protocol.

## 🚀 Cara Menjalankan

### Option 1: Menggunakan Script (Termudah)

```bash
./start-server.sh
```

Atau dengan port custom:
```bash
./start-server.sh 3000
```

Kemudian buka browser: `http://localhost:8000`

### Option 2: Python HTTP Server

```bash
cd public
python3 -m http.server 8000
```

Atau Python 2:
```bash
cd public
python -m SimpleHTTPServer 8000
```

### Option 3: Node.js (npx serve)

```bash
npx serve public
```

### Option 4: PHP Built-in Server

```bash
cd public
php -S localhost:8000
```

## 📝 Note

- File harus diakses melalui `http://localhost` bukan `file://`
- Port default: 8000
- Tekan `Ctrl+C` untuk stop server

## ✅ Setelah Server Berjalan

1. Buka browser
2. Navigate ke: `http://localhost:8000`
3. Sections akan otomatis di-load
4. Check console (F12) untuk melihat progress loading


