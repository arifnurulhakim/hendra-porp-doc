# 📊 Analisis Sistem - Hendra Prop

**Dokumen Analisis Sistem**  
Proyek: Hendra Prop - Sistem Manajemen Properti Multi-Kantor  
Tanggal: 31 Oktober 2025  
Versi: 1.0.0

---

## 1. Executive Summary

### 1.1 Gambaran Umum
Hendra Prop adalah sistem manajemen properti berbasis web yang dirancang untuk mengelola multiple kantor cabang dengan agen-agen properti yang terstruktur. Sistem ini memfasilitasi manajemen listing properti, tracking performa agen, serta kalkulasi komisi otomatis.

### 1.2 Tujuan Utama
- Centralized management untuk multi-kantor properti
- Tracking performa dan komisi agen secara transparan
- Digitalisasi proses listing dan transaksi properti
- Memudahkan buyer dalam mencari dan menghubungi agen

### 1.3 Target Pengguna
1. **Admin Master** - Super administrator dengan akses penuh
2. **Admin Kantor** - Manager cabang yang mengelola agen di kantornya
3. **Agen Properti** - Sales yang mengelola listing dan transaksi
4. **Buyer/Customer** - Pencari properti (publik)

### 1.4 Timeline
- **Deadline:** Maret 2026
- **Development Period:** 3-4 bulan (Desember 2025 - Maret 2026)
- **Target:** MVP (Minimum Viable Product)

---

## 2. Latar Belakang & Masalah

### 2.1 Kondisi Saat Ini
- Manajemen properti masih manual atau menggunakan spreadsheet
- Sulit tracking performa agen di multiple kantor
- Perhitungan komisi tidak transparan
- Buyer sulit mendapat informasi terpusat

### 2.2 Masalah yang Harus Diselesaikan
1. **Fragmentasi Data** - Data tersebar di berbagai kantor
2. **Tracking Performance** - Sulit mengukur produktivitas agen
3. **Komisi Manual** - Rawan error dan tidak transparan
4. **Akses Informasi** - Buyer kesulitan cari properti yang sesuai

### 2.3 Solusi yang Diusulkan
Sistem terintegrasi berbasis web dengan fitur:
- User management multi-level (Master, Kantor, Agen)
- Database terpusat untuk listing properti
- Dashboard performance real-time
- Kalkulasi komisi otomatis
- Public listing page untuk buyer

---

## 3. Struktur Organisasi

### 3.1 Hierarki Bisnis

```
Hendra Prop (Pusat)
├── HP 1 (Kantor Cabang 1)
│   ├── Agent 1
│   ├── Agent 2
│   └── Agent 3
├── HP 2 (Kantor Cabang 2)
│   ├── Agent Z1
│   ├── Agent Z2
│   └── Agent Z3
└── HP 3 (Kantor Cabang 3)
    └── [Multiple Agents]
```

### 3.2 Business Rules

#### Rule 1: Relasi Kantor - Agen
- ✅ Satu kantor bisa memiliki banyak agen (1:N)
- ✅ Satu agen hanya dedicated ke 1 kantor (N:1)
- ❌ Agen tidak bisa pindah kantor (atau butuh proses approval)

#### Rule 2: Relasi Properti - Agen
- ✅ Satu properti owned oleh 1 agen (pemilik listing)
- ✅ Maksimal ada 1 agen pembawa buyer untuk properti tersebut
- ✅ Total maksimal: 1 Agen Owner + 1 Agen Buyer per transaksi
- ⚠️ Agen buyer harus koordinasi dengan agen owner

#### Rule 3: Komisi
- 📌 **Default Split:** 70% untuk Agen, 30% untuk Kantor
- 📌 Khusus untuk transaksi **sewa**
- 📌 Komisi untuk jual-beli bisa berbeda (customizable)
- 📌 Diatur manual oleh Admin Master/Kantor per transaksi

#### Rule 4: Akses & Permission
- **Admin Master:** Full akses ke semua kantor & agen
- **Admin Kantor:** Akses terbatas ke kantor & agen di bawahnya
- **Agen:** Akses terbatas ke properti & transaksi miliknya
- **Buyer:** Read-only untuk listing publik

---

## 4. Analisis Stakeholder

### 4.1 Admin Master

**Kebutuhan:**
- Manajemen kantor cabang (CRUD)
- Manajemen agen di semua kantor
- Monitoring performa global
- Setting komisi dan approval transaksi
- Dashboard overview seluruh bisnis

**Pain Points:**
- Sulit kontrol multi-kantor secara real-time
- Tidak ada data agregat performa
- Perhitungan komisi manual rawan error

**Ekspektasi:**
- Dashboard real-time untuk semua kantor
- Laporan performa per kantor & per agen
- Sistem komisi otomatis namun bisa di-override manual

---

### 4.2 Admin Kantor

**Kebutuhan:**
- Manajemen agen di kantornya
- Input & edit properti di kantornya
- Monitoring performa agen
- Setting komisi untuk agen di kantornya
- Dashboard kantor

**Pain Points:**
- Sulit track produktivitas agen
- Manual hitung komisi setiap bulan
- Tidak ada history transaksi yang terstruktur

**Ekspektasi:**
- Dashboard khusus untuk kantornya
- Laporan performa agen
- Export data untuk accounting

---

### 4.3 Agen Properti

**Kebutuhan:**
- Input & edit listing properti
- Share listing ke buyer
- Track komisi yang diterima
- Dashboard personal performance
- Contact management (buyer)

**Pain Points:**
- Sulit track listing yang masih available
- Tidak tahu status komisi (pending/paid)
- Manual share listing via WA/sosmed

**Ekspektasi:**
- Dashboard personal (total listing, omzet, komisi)
- Notifikasi jika ada inquiry dari buyer
- Link sharing yang mudah untuk promosi

---

### 4.4 Buyer/Customer

**Kebutuhan:**
- Cari properti dengan filter (lokasi, harga, tipe)
- Lihat detail properti (foto, harga, luas)
- Kontak agen pemilik langsung
- Save favorit (nice to have)

**Pain Points:**
- Informasi properti tersebar di berbagai channel
- Harus hubungi banyak agen untuk compare
- Tidak tahu siapa agen yang handle properti tertentu

**Ekspektasi:**
- Platform terpusat untuk semua listing
- Search & filter yang mudah
- Kontak langsung ke agen via WA/phone

---

## 5. MVP Scope Definition

### 5.1 Prinsip MVP: "Minimum Viable Scope Only"

Hanya fitur yang **BENAR-BENAR ESENSIAL** untuk operasional dasar bisnis yang masuk MVP.

### 5.2 ✅ FITUR YANG MASUK MVP (Must Have)

#### A. Authentication & User Management
- [x] Multi-role login (Admin Master, Admin Kantor, Agen, Buyer)
- [x] User profile management
- [x] Role-based access control (RBAC)

#### B. Kantor Management
- [x] CRUD Kantor (oleh Admin Master)
- [x] Assign Admin Kantor ke kantor tertentu

#### C. Agen Management
- [x] CRUD Agen (oleh Admin Master & Admin Kantor)
- [x] Assign agen ke kantor (1:1 relationship)
- [x] Status agen (Active/Inactive)

#### D. Property Management
- [x] CRUD Properti oleh Admin Master, Admin Kantor, Agen
- [x] Upload multiple foto properti
- [x] Detail properti: Judul, Deskripsi, Harga, Harga/m², Luas, Alamat
- [x] Tipe properti (Rumah, Apartemen, Tanah, Komersial)
- [x] Status properti (Available, Pending, Sold, Rented)
- [x] Contact info (Phone, WhatsApp)

#### E. Public Listing (Buyer)
- [x] Browse semua properti available
- [x] Search & Filter dasar (lokasi, harga range, tipe)
- [x] Detail view properti
- [x] Kontak agen via phone/WA

#### F. Transaction Management
- [x] Input transaksi manual (oleh Admin Master/Kantor)
- [x] Record: Properti + Agen Owner + Agen Buyer (optional) + Buyer Info
- [x] Tipe transaksi (Jual/Sewa)
- [x] Harga final
- [x] Tanggal transaksi

#### G. Commission System
- [x] Setting komisi per transaksi (customizable %)
- [x] Split komisi: Agen vs Kantor
- [x] Split komisi antar agen (jika ada agen buyer)
- [x] Status komisi (Pending, Paid)

#### H. Performance Dashboard
- [x] Dashboard Personal Agen (Total Listing, Omzet, Komisi)
- [x] Dashboard Kantor (Aggregate agen di kantornya)
- [x] Dashboard Master (Aggregate semua kantor)

---

### 5.3 ❌ FITUR YANG TIDAK MASUK MVP (Phase 2)

#### Moderasi & Approval
- [ ] Moderasi properti sebelum publish (B2)
- [ ] Approval workflow untuk transaksi

#### Sharing & Marketing
- [ ] Link terbatas dengan hidden detail (B4)
- [ ] Share link dengan no-phone & detail tersembunyi
- [ ] Social media integration

#### Advanced Features
- [ ] Tag properti serupa (recommendation)
- [ ] Reward system (gamification)
- [ ] Add-on HPDM / Premiere listing
- [ ] Performance Board Master & Kantor (agregat dashboard)

#### Customer Features
- [ ] Buyer registration & login
- [ ] Favorit/Wishlist untuk buyer
- [ ] Inquiry tracking
- [ ] Email notification otomatis

#### Reporting & Analytics
- [ ] Export laporan ke Excel/PDF
- [ ] Advanced analytics & charts
- [ ] Forecasting & trend analysis

---

## 6. Analisis Fitur per Role

### 6.1 Admin Master - Fungsi Utama

| Kode | Fungsi | Prioritas | Status MVP |
|------|--------|-----------|------------|
| A1 | Input & Edit Kantor | P0 - CRITICAL | ✅ MVP |
| A2 | Input & Edit Agen | P0 - CRITICAL | ✅ MVP |
| B1 | Input & Edit Properti | P0 - CRITICAL | ✅ MVP |
| B2 | Moderasi Properti | P2 - LOW | ❌ Phase 2 |
| B3 | Atur Performance Agen & Komisi | P0 - CRITICAL | ✅ MVP |
| B4 | Buat Link Terbatas | P2 - LOW | ❌ Phase 2 |
| B5 | Cek Performance & Komisi | P0 - CRITICAL | ✅ MVP |

**Total MVP Features: 5/7**

---

### 6.2 Admin Kantor - Fungsi Utama

| Kode | Fungsi | Prioritas | Status MVP |
|------|--------|-----------|------------|
| A2 | Input & Edit Agen (di kantornya) | P0 - CRITICAL | ✅ MVP |
| B1 | Input & Edit Properti | P0 - CRITICAL | ✅ MVP |
| B2 | Moderasi Properti | P2 - LOW | ❌ Phase 2 |
| B3 | Atur Performance Agen & Komisi | P0 - CRITICAL | ✅ MVP |
| B4 | Buat Link Terbatas | P2 - LOW | ❌ Phase 2 |
| B5 | Cek Performance & Komisi | P0 - CRITICAL | ✅ MVP |

**Total MVP Features: 4/6**

---

### 6.3 Agen - Fungsi Utama

| Kode | Fungsi | Prioritas | Status MVP |
|------|--------|-----------|------------|
| B1 | Input & Edit Properti | P0 - CRITICAL | ✅ MVP |
| B4 | Buat Link Terbatas | P2 - LOW | ❌ Phase 2 |
| B5 | Cek Performance & Komisi | P0 - CRITICAL | ✅ MVP |

**Total MVP Features: 2/3**

---

### 6.4 Buyer - Fungsi Utama

| Kode | Fungsi | Prioritas | Status MVP |
|------|--------|-----------|------------|
| C1 | Cek Properti & Kontak Agen | P0 - CRITICAL | ✅ MVP |
| - | Login & Save Favorit | P2 - LOW | ❌ Phase 2 |
| - | Inquiry Tracking | P2 - LOW | ❌ Phase 2 |

**Total MVP Features: 1/3**

---

## 7. Pertanyaan Klarifikasi & Asumsi

### 7.1 Pertanyaan yang Sudah Terjawab ✅

| No | Pertanyaan | Jawaban | Impact |
|----|------------|---------|--------|
| 1 | What is HPDM? | Hanya nama, skip | No functional impact |
| 2 | Relasi Agen-Kantor? | 1 Kantor : N Agen, 1 Agen : 1 Kantor | Database schema |
| 3 | Relasi Properti-Agen? | 1 Properti : 1 Owner + 1 Buyer (max) | Transaction logic |
| 4 | Komisi flat atau dynamic? | Dynamic, diisi admin | Commission module |

---

### 7.2 Pertanyaan yang Masih Perlu Dijawab ⚠️

#### CRITICAL - Harus Dijawab Sebelum Development

**Q1: Flow Transaksi & Status Properti**
- Apakah ada status properti: Available → Pending → Sold/Rented?
- Ketika agen input transaksi, apakah status properti otomatis berubah?
- Apakah properti yang sudah Sold/Rented masih ditampilkan di public listing?

**Asumsi Sementara:**
- Ada 4 status: Available, Pending, Sold, Rented
- Saat transaksi di-input, status otomatis jadi Sold/Rented
- Properti sold/rented tidak muncul di public listing

---

**Q2: Pencatatan Transaksi**
- Siapa yang bisa input transaksi? (Admin saja atau Agen juga?)
- Apakah ada approval workflow? (Agen input → Admin approve)
- Bagaimana flow jika agen buyer membawa pembeli?

**Asumsi Sementara:**
- Hanya Admin Master & Admin Kantor yang bisa input transaksi
- No approval workflow (langsung final)
- Agen buyer bisa di-tag saat input transaksi

---

**Q3: Komisi Detail**
- Komisi 70/30 untuk sewa. Bagaimana untuk jual-beli?
- Jika ada 2 agen (owner + buyer), bagaimana split-nya?
  - Contoh: 70% dibagi 2 agen? Atau masing-masing tetap dapat 70%?
- Apakah komisi dihitung dari harga final atau harga listing?

**Asumsi Sementara:**
- Jual-beli juga pakai 70/30 (customizable)
- Jika ada 2 agen: 70% dibagi 2 (35% each), 30% tetap ke kantor
- Komisi dari harga final (closing price)

---

**Q4: Data Properti**
- Berapa maksimal foto per properti? (5? 10? Unlimited?)
- Apakah perlu video/virtual tour? (Phase 2)
- Apakah ada sertifikat/dokumen properti yang perlu di-upload?

**Asumsi Sementara:**
- Max 10 foto per properti
- Video/VR tour = Phase 2
- Dokumen legal = Phase 2

---

#### MEDIUM - Bisa Ditentukan Kemudian

**Q5: Buyer Access**
- Apakah buyer perlu login untuk lihat listing? (Public = no login)
- Apakah buyer bisa save favorit tanpa login? (Phase 2)
- Apakah perlu tracking inquiry dari buyer? (Phase 2)

**Asumsi Sementara:**
- Public access, no login required
- Favorit & inquiry = Phase 2

---

**Q6: Search & Filter**
- Filter apa yang paling prioritas?
  - Lokasi (kota, kecamatan)
  - Harga (range)
  - Tipe (rumah, apartemen, tanah, komersial)
  - Luas (m²)
  - Status (jual/sewa)

**Asumsi Sementara:**
- Filter: Lokasi, Harga Range, Tipe, Status (Jual/Sewa)
- Advanced filter (luas, kamar, dll) = Phase 2

---

**Q7: Hosting & Infrastructure**
- Estimasi jumlah agen di tahun pertama? (10? 50? 100?)
- Estimasi jumlah listing? (100? 1000? 10000?)
- Apakah perlu cloud storage atau VPS storage cukup?

**Asumsi Sementara:**
- Max 50 agen, 500 listing di tahun 1
- VPS storage cukup untuk MVP
- Cloud (S3) untuk production scaling

---

## 8. Risk Analysis & Mitigation

### 8.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Database design error | Medium | High | Review ERD dengan stakeholder sebelum development |
| Performance issue (banyak foto) | Medium | Medium | Implementasi image optimization & lazy loading |
| Security breach (data sensitif) | Low | Critical | Implement standard Laravel security + encryption |
| Integration error (WA/Email) | Low | Low | Build as separate module, fail gracefully |

---

### 8.2 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Komisi logic salah | High | Critical | **Manual testing** dengan sample data real sebelum launch |
| Role permission salah | Medium | High | Test setiap role dengan different scenarios |
| User adoption rendah | Medium | Medium | Training & onboarding untuk admin & agen |
| Data migration dari sistem lama | High | Medium | Prepare import tool & validation |

---

### 8.3 Timeline Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Scope creep (fitur tambahan) | High | High | **Strict MVP scope**, tolak fitur non-esensial |
| Klarifikasi lambat | Medium | High | Set SLA untuk response: 2-3 hari max |
| Bug critical saat testing | Medium | Medium | Buffer 2 minggu untuk bug fixing |

**Timeline Buffer:**
- Development: 2.5 bulan (10 weeks)
- Testing: 2 minggu
- Bug fixing: 2 minggu
- **Total:** 3.5 bulan (Desember - Maret)

---

## 9. Success Criteria

### 9.1 MVP Launch Criteria (Maret 2026)

#### Must Have (Go/No-Go)
- ✅ 3 kantor cabang sudah ter-input dengan minimal 5 agen
- ✅ Minimal 50 listing properti available
- ✅ Transaksi & komisi bisa dicatat dengan benar
- ✅ Public listing accessible & mobile responsive
- ✅ No critical bug pada core features

#### Should Have (Nice to Have)
- ✅ Performance dashboard showing real data
- ✅ Export laporan basic (Excel)
- ✅ Email notification untuk transaksi baru

#### Could Have (Post-Launch)
- Buyer login & favorit
- Advanced analytics
- Mobile app (PWA)

---

### 9.2 Key Performance Indicators (KPI)

**Technical KPI:**
- System uptime: > 99%
- Page load time: < 2 detik
- Mobile responsive: 100% pages
- Zero critical bugs after launch

**Business KPI:**
- User adoption: > 80% agen aktif menggunakan sistem
- Listing growth: +20 listing/bulan
- Transaction recording: 100% transaksi tercatat di sistem
- Commission accuracy: 100% (no dispute)

---

## 10. Kesimpulan & Next Steps

### 10.1 Kesimpulan
Proyek Hendra Prop adalah sistem manajemen properti multi-kantor dengan scope MVP yang **realistis dan achievable** dalam timeline Maret 2026. Fokus pada fitur esensial dengan prinsip "Minimum Viable Scope Only" memastikan delivery tepat waktu dengan kualitas terjaga.

### 10.2 Next Steps

#### Immediate (Minggu 1-2)
1. ✅ Review & approval dokumen analisis ini
2. ⏳ Jawab pertanyaan klarifikasi (Q1-Q7)
3. ⏳ Finalize database schema
4. ⏳ Setup project & repository

#### Short Term (Minggu 3-4)
5. ⏳ Create wireframe/mockup UI (optional tapi recommended)
6. ⏳ Setup development environment
7. ⏳ Kickoff development sprint 1

#### Long Term (Minggu 5-14)
8. ⏳ Development (10 sprints @ 1 week each)
9. ⏳ Testing & QA (2 weeks)
10. ⏳ Bug fixing & refinement (2 weeks)
11. ⏳ Soft launch (Maret 2026)

---

**Prepared by:** AI Project Analysis System  
**Date:** 31 Oktober 2025  
**Version:** 1.0.0  
**Status:** Draft - Pending Stakeholder Review

