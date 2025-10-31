# ⚡ Quick Start: Deploy ke Netlify (5 Menit)

## 🎯 Cara Tercepat (Drag & Drop - No Git Required!)

### Step 1: Buka Netlify Drop
👉 https://app.netlify.com/drop

### Step 2: Login/Signup
- Pakai GitHub, GitLab, atau email

### Step 3: Drag & Drop
```
Drag folder ini: /Users/hakim/Documents/hubton/hendra-prop/public/
```
Drop ke browser!

### Step 4: Done! ✅
Site langsung live: `https://[random-name].netlify.app`

---

## 🔧 Cara dengan Git + Auto-Deploy

### Step 1: Push ke GitHub

```bash
cd /Users/hakim/Documents/hubton/hendra-prop

git init
git add .
git commit -m "Initial commit: Hendra Prop documentation"

# Ganti dengan repo Anda
git remote add origin https://github.com/YOUR-USERNAME/hendra-prop.git
git push -u origin main
```

### Step 2: Connect ke Netlify

1. https://app.netlify.com/
2. **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select repository: **hendra-prop**
5. Settings:
   - Build command: (kosongkan)
   - Publish directory: `public`
6. **Deploy!**

**Benefit:** Setiap `git push` auto-deploy!

---

## 📱 Access Your Site

```
https://[your-site-name].netlify.app
```

**Features:**
- ✅ HTTPS otomatis (secure)
- ✅ Global CDN (super cepat)
- ✅ Unlimited bandwidth (free tier: 100GB/month)
- ✅ Bisa custom domain

---

## 🎨 Optional: Rename Site

Di Netlify dashboard:
1. Site settings → Site details
2. Change site name: `hendra-prop-docs`
3. New URL: `https://hendra-prop-docs.netlify.app`

---

## 📖 Full Guide

Lihat **DEPLOY.md** untuk panduan lengkap!

---

**Need Help?** Check DEPLOY.md atau ping team!

© 2025 Hendra Prop

