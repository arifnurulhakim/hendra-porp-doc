# 🚀 Deploy Hendra Prop Documentation ke Netlify

Panduan lengkap untuk deploy dokumentasi Hendra Prop ke Netlify.

---

## 📋 Prerequisites

- Account Netlify (gratis): https://app.netlify.com/signup
- Git repository (GitHub, GitLab, atau Bitbucket) - *opsional*
- Netlify CLI (opsional): `npm install -g netlify-cli`

---

## 🎯 Method 1: Netlify UI (Recommended - Paling Mudah)

### Step 1: Push ke Git Repository

```bash
cd /Users/hakim/Documents/hubton/hendra-prop

# Initialize git (jika belum)
git init

# Add files
git add .
git commit -m "Initial commit: Hendra Prop documentation"

# Push ke GitHub/GitLab
git remote add origin https://github.com/USERNAME/hendra-prop.git
git branch -M main
git push -u origin main
```

### Step 2: Connect ke Netlify

1. Login ke [Netlify](https://app.netlify.com/)
2. Klik **"Add new site"** → **"Import an existing project"**
3. Pilih **GitHub** / **GitLab** / **Bitbucket**
4. Authorize Netlify untuk akses repository
5. Pilih repository **hendra-prop**

### Step 3: Configure Build Settings

```
Site name: hendra-prop-docs (atau nama custom)
Branch to deploy: main
Build command: (kosongkan atau ketik: echo 'Static HTML')
Publish directory: public
```

### Step 4: Deploy!

- Klik **"Deploy site"**
- Tunggu ~30 detik
- Site akan live di: `https://[site-name].netlify.app`

### Step 5: Custom Domain (Opsional)

1. Di Netlify dashboard → **"Domain settings"**
2. Klik **"Add custom domain"**
3. Masukkan domain (misal: `docs.hendraprop.com`)
4. Ikuti instruksi DNS settings

---

## 🎯 Method 2: Netlify CLI (Fast & Easy)

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login

```bash
netlify login
```

Browser akan terbuka untuk authorize.

### Step 3: Deploy

**Deploy Draft (untuk test):**
```bash
cd /Users/hakim/Documents/hubton/hendra-prop
netlify deploy
```

Pilih:
- Create & configure a new site: **YES**
- Team: Pilih team Anda
- Site name: `hendra-prop-docs`
- Publish directory: `./public`

**Deploy Production:**
```bash
netlify deploy --prod
```

**Output:**
```
✔ Deploy is live!
Website URL: https://hendra-prop-docs.netlify.app
```

---

## 🎯 Method 3: Netlify Drop (Super Simple - No Git Required!)

### Step 1: Buka Netlify Drop

https://app.netlify.com/drop

### Step 2: Drag & Drop

1. Buka Finder
2. Navigate ke folder: `/Users/hakim/Documents/hubton/hendra-prop/public/`
3. **Drag** folder `public/` ke browser (ke area Netlify Drop)
4. Drop!

### Step 3: Done!

- Site langsung live dalam 10 detik
- URL: `https://random-name-123456.netlify.app`
- Bisa rename site di settings

---

## ⚙️ Configuration Otomatis

File `netlify.toml` sudah di-setup dengan:

✅ **Publish directory:** `public`  
✅ **Redirects:** SPA-friendly  
✅ **Headers:** Security headers (X-Frame-Options, CSP, dll)  
✅ **Cache:** Optimized caching untuk HTML & assets  
✅ **404 handling:** Redirect ke index.html

---

## 🔄 Update Dokumentasi

### Jika ada perubahan:

**Method 1 (Git + Netlify):**
```bash
# Update files
git add .
git commit -m "Update documentation"
git push

# Netlify auto-deploy dalam 1 menit
```

**Method 2 (Netlify CLI):**
```bash
netlify deploy --prod
```

**Method 3 (Manual):**
1. Copy updated file: `cp docs/FULL_DOCUMENTATION.html public/index.html`
2. Drag & drop folder `public/` ke Netlify Drop lagi
3. Confirm overwrite

---

## 🌐 Accessing Deployed Site

### Production URL:
```
https://hendra-prop-docs.netlify.app
```

### Custom Domain (setelah setup):
```
https://docs.hendraprop.com
```

### Features:
- ✅ HTTPS otomatis (SSL certificate gratis)
- ✅ CDN global (super fast)
- ✅ Auto-deploy dari Git (continuous deployment)
- ✅ Rollback ke version sebelumnya
- ✅ Preview deployments untuk branch

---

## 📊 Monitoring

### Netlify Dashboard

1. **Deploy log:** Lihat status deploy
2. **Analytics:** Traffic, page views (paid feature)
3. **Functions:** Jika butuh serverless functions
4. **Forms:** Jika ada contact form (paid feature)
5. **Split testing:** A/B testing (paid feature)

### Free Tier Limits:
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ HTTPS included
- ✅ Continuous deployment

**Dokumentasi HTML statis ini sangat kecil (~390KB), jauh di bawah limit!**

---

## 🔒 Security Headers

`netlify.toml` sudah include security headers:

```toml
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 🎨 Custom Features (Opsional)

### Password Protection

Edit `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/.netlify/functions/auth"
  status = 200
  force = true
  conditions = {Role = ["admin"]}
```

### Custom 404 Page

Buat `public/404.html`:
```html
<!DOCTYPE html>
<html>
<head><title>404 - Not Found</title></head>
<body>
  <h1>Halaman tidak ditemukan</h1>
  <a href="/">Kembali ke dokumentasi</a>
</body>
</html>
```

---

## 📱 Sharing Documentation

### Internal Team:
```
https://hendra-prop-docs.netlify.app
```

### External Stakeholders:
Bisa tambah password protection atau gunakan private link.

### Print to PDF:
1. Buka URL deployed site
2. Cmd/Ctrl + P
3. Save as PDF
4. Share PDF file

---

## 🐛 Troubleshooting

### Deploy Failed?
- Check `netlify.toml` syntax
- Pastikan folder `public/` ada
- Pastikan `public/index.html` ada

### Site Tidak Update?
- Clear cache: Netlify dashboard → Deploys → Clear cache
- Force re-deploy: Trigger deploy di dashboard

### 404 Error?
- Check publish directory: harus `public` bukan `docs`
- Check file name: harus `index.html` bukan `FULL_DOCUMENTATION.html`

---

## ✅ Checklist

Sebelum deploy, pastikan:

- [ ] Folder `public/` ada
- [ ] File `public/index.html` ada (11,000+ baris)
- [ ] File `netlify.toml` ada di root
- [ ] File `.gitignore` exclude `.netlify/`
- [ ] Git repository ready (untuk Method 1)
- [ ] Netlify account created

---

## 🎉 Done!

Dokumentasi Hendra Prop sekarang bisa diakses online 24/7 dengan URL yang shareable!

**Next Steps:**
1. Share URL ke team
2. Bookmark untuk reference
3. Setup custom domain (opsional)
4. Enable analytics (opsional)

---

**Need Help?**
- Netlify Docs: https://docs.netlify.com/
- Netlify Community: https://answers.netlify.com/

© 2025 Hendra Prop

