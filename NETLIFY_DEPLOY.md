# 🚀 Panduan Deploy ke Netlify - Step by Step

## 📋 Persiapan

### 1. Pastikan File Sudah Ready
```
✅ netlify.toml ada di root project
✅ Folder public/ berisi semua file
✅ Semua sections ada di public/sections/
✅ CSS ada di public/css/
✅ JS ada di public/js/
```

### 2. Pastikan Code Sudah di Git
```bash
# Check status
git status

# Jika ada perubahan, commit dulu
git add .
git commit -m "Prepare for Netlify deployment"
git push
```

## 🎯 Cara Deploy ke Netlify

### **Option 1: Via Netlify Dashboard (Rekomendasi untuk Pemula)**

#### Step 1: Login/Buat Akun Netlify
1. Buka [app.netlify.com](https://app.netlify.com)
2. Klik "Sign up" atau "Log in"
3. Login dengan GitHub/GitLab/Bitbucket (pilih yang punya repo Anda)

#### Step 2: Add New Site
1. Klik tombol **"Add new site"** (di pojok kanan atas)
2. Pilih **"Import an existing project"**
3. Pilih **GitHub/GitLab/Bitbucket** (sesuai repo Anda)
4. Authorize Netlify untuk akses repository

#### Step 3: Pilih Repository
1. Cari repository Anda: `hendra-porp-doc` atau sesuai nama repo
2. Klik repository tersebut

#### Step 4: Configure Build Settings
Netlify akan auto-detect `netlify.toml`, tapi pastikan:

**Build settings:**
- **Base directory:** (kosongkan)
- **Build command:** `echo 'No build required'` (atau kosongkan)
- **Publish directory:** `public`

**Atau biarkan otomatis** - Netlify akan membaca `netlify.toml`

#### Step 5: Deploy!
1. Klik tombol **"Deploy site"**
2. Tunggu proses deploy (sekitar 1-2 menit)
3. Setelah selesai, Anda dapat URL: `https://your-site-name.netlify.app`

#### Step 6: Test
1. Buka URL yang diberikan Netlify
2. Check apakah semua sections load dengan benar
3. Test navigation (TOC, anchor links)
4. Check console browser (F12) untuk error

---

### **Option 2: Via Netlify CLI (Untuk Developer)**

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login
```bash
netlify login
```
Browser akan terbuka untuk login

#### Step 3: Initialize Site (Pertama kali)
```bash
cd /Users/hakim/Documents/hubton/hendra-prop-doc-bk/hendra-porp-doc
netlify init
```

Follow prompts:
- **Create & configure a new site** (pilih yes)
- Pilih **team** (default)
- Site name: `hendra-prop-doc` (atau sesuai keinginan)
- Build command: `echo 'No build required'`
- Directory to deploy: `public`

#### Step 4: Deploy
```bash
# Deploy preview (test)
netlify deploy

# Production deploy
netlify deploy --prod
```

#### Step 5: Set Site URL
Setelah deploy pertama, Netlify akan memberikan URL. Catat URL tersebut.

---

### **Option 3: Drag & Drop (Quick Test)**

#### Step 1: Zip Folder Public
```bash
cd public
zip -r ../hendra-prop-doc.zip .
```

#### Step 2: Deploy via Netlify Dashboard
1. Buka [app.netlify.com](https://app.netlify.com)
2. Klik **"Sites"** → **"Add new site"** → **"Deploy manually"**
3. Drag & drop file `hendra-prop-doc.zip`
4. Tunggu deploy selesai

**Note:** Method ini tidak support auto-deploy. Harus manual setiap kali update.

---

## ⚙️ Konfigurasi Netlify

### File `netlify.toml` Sudah Dikonfigurasi

Konfigurasi yang sudah ada:
- ✅ Build directory: `public`
- ✅ SPA routing: semua route → `index.html`
- ✅ CORS headers: untuk fetch API sections
- ✅ Cache control: CSS/JS cached, HTML fresh
- ✅ Security headers: XSS protection, dll

### Custom Domain (Opsional)

1. Di Netlify Dashboard → Pilih site Anda
2. **Site settings** → **Domain management**
3. Klik **"Add custom domain"**
4. Masukkan domain Anda (contoh: `docs.hendraprop.com`)
5. Follow instruksi DNS setup
6. Netlify akan auto-generate SSL certificate (gratis)

---

## 🔍 Troubleshooting

### ❌ Problem: Sections tidak load

**Symptoms:**
- Halaman blank putih
- Console error: "Failed to fetch"

**Solutions:**
1. Check Netlify deploy logs:
   - Dashboard → Deploys → Klik deploy terbaru → View logs
2. Pastikan file sections ada di `public/sections/`
3. Check `netlify.toml` ada CORS headers untuk `/sections/*`
4. Pastikan URL menggunakan HTTPS (bukan HTTP)

### ❌ Problem: JavaScript modules error

**Symptoms:**
- Console error: "Failed to load module"
- Error: "CORS policy"

**Solutions:**
1. Pastikan file `.js` memiliki Content-Type header (sudah di-set di `netlify.toml`)
2. Check deploy logs untuk error
3. Pastikan semua file JS ada di `public/js/`

### ❌ Problem: CSS tidak load

**Symptoms:**
- Halaman tanpa style
- Console error loading CSS

**Solutions:**
1. Check path CSS di `index.html`: `href="css/style.css"`
2. Pastikan file CSS ada di `public/css/`
3. Check deploy logs

### ❌ Problem: Routing tidak bekerja

**Symptoms:**
- 404 error saat akses langsung ke section
- Anchor links tidak bekerja

**Solutions:**
1. Pastikan redirect rule ada di `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```
2. Redeploy site

---

## ✅ Checklist Setelah Deploy

- [ ] Buka URL Netlify
- [ ] Check semua sections load dengan benar
- [ ] Test navigation (click TOC items)
- [ ] Test anchor links (click heading links)
- [ ] Test print to PDF
- [ ] Check console (F12) - tidak ada error
- [ ] Test di mobile browser
- [ ] Verify HTTPS is working (lock icon di browser)

---

## 🔄 Auto Deploy dari Git

### Setup Auto Deploy (Recommended)

1. **Connect Repository** (jika belum):
   - Site settings → **Build & deploy** → **Continuous Deployment**
   - Klik **"Link site to Git"**
   - Pilih repository

2. **Configure Branch:**
   - Branch to deploy: `main` atau `master`
   - Build command: (kosongkan atau `echo 'No build'`)
   - Publish directory: `public`

3. **Auto Deploy:**
   - Setiap push ke `main` branch → auto deploy
   - Pull request → deploy preview otomatis

### Deploy Preview

Setiap pull request akan dapat:
- URL preview: `https://deploy-preview-X--your-site.netlify.app`
- Helpful untuk review sebelum merge

---

## 📊 Monitoring & Analytics

### Netlify Analytics (Pro Plan)
- Site analytics
- Performance metrics
- Visitor stats

### Netlify Functions (Opsional)
Jika perlu backend function:
- Create `netlify/functions/` folder
- Netlify akan auto-detect dan deploy

---

## 🎯 Quick Commands

```bash
# Login Netlify CLI
netlify login

# Deploy preview
netlify deploy --dir=public

# Production deploy
netlify deploy --prod --dir=public

# View site info
netlify status

# Open site in browser
netlify open

# View logs
netlify logs
```

---

## 💡 Tips

1. **Git Workflow:**
   - Develop di branch `develop`
   - Merge ke `main` untuk production deploy
   - Netlify otomatis deploy dari `main`

2. **Environment Variables:**
   - Site settings → Environment variables
   - Add variables jika perlu (API keys, dll)

3. **Build Hooks:**
   - Trigger deploy via webhook
   - Useful untuk CI/CD integration

4. **Form Handling:**
   - Netlify support form handling
   - Submit form → Netlify receives data

---

## 🆘 Support

Jika ada masalah:
1. Check Netlify docs: [docs.netlify.com](https://docs.netlify.com)
2. Netlify support: [netlify.com/support](https://www.netlify.com/support)
3. Community: [community.netlify.com](https://community.netlify.com)

---

## 📝 Summary

**File yang penting:**
- ✅ `netlify.toml` - Konfigurasi Netlify
- ✅ `public/` - Folder yang di-deploy
- ✅ Semua file sections, CSS, JS harus di `public/`

**Deploy via:**
1. Dashboard (termudah) - Import dari Git
2. CLI (untuk developer) - `netlify deploy --prod`
3. Drag & drop (quick test) - Manual upload zip

**Setelah deploy:**
- URL production: `https://your-site.netlify.app`
- Auto HTTPS: Gratis SSL certificate
- Auto deploy: Setiap push ke Git
