# 📝 User Stories - Hendra Prop

**Dokumen User Stories & Acceptance Criteria**  
Proyek: Hendra Prop - Sistem Manajemen Properti  
Tanggal: 31 Oktober 2025  
Versi: 1.0.0

---

## 1. Epic Overview

### Epic 1: Authentication & User Management 🔐
Manage users, roles, and permissions untuk Admin Master, Admin Kantor, dan Agen

### Epic 2: Office & Agent Management 🏢
Manage kantor cabang dan agen-agen properti

### Epic 3: Property Management 🏠
Manage listing properti dengan foto dan detail lengkap

### Epic 4: Public Listing 🌐
Public website untuk buyer mencari dan melihat properti

### Epic 5: Transaction Management 💰
Record transaksi jual/sewa properti

### Epic 6: Commission Management 💵
Manage komisi agen dan kantor dengan tracking pembayaran

### Epic 7: Dashboard & Reports 📊
Performance dashboard untuk setiap role

---

## 2. User Stories per Epic

### EPIC 1: Authentication & User Management 🔐

#### US-AUTH-001: Login sebagai Admin Master
**As a** Super Admin  
**I want to** login ke sistem dengan email dan password  
**So that** saya bisa manage seluruh sistem

**Acceptance Criteria:**
- ✅ Halaman login dengan form email & password
- ✅ Validasi: email format valid, password min 8 karakter
- ✅ Error message jika credentials salah
- ✅ Redirect ke dashboard setelah login berhasil
- ✅ Session active selama 24 jam
- ✅ Remember me option (7 hari)

**Priority:** P0 - CRITICAL  
**Story Points:** 3  
**Sprint:** 1

---

#### US-AUTH-002: Login sebagai Admin Kantor
**As a** Admin Kantor  
**I want to** login dan hanya lihat data kantor saya  
**So that** saya bisa manage agen dan properti di kantor saya

**Acceptance Criteria:**
- ✅ Login dengan role admin_kantor
- ✅ Dashboard hanya show data kantor yang di-assign
- ✅ Tidak bisa akses data kantor lain
- ✅ Bisa manage agen di kantornya

**Priority:** P0 - CRITICAL  
**Story Points:** 2  
**Sprint:** 1

---

#### US-AUTH-003: Login sebagai Agen
**As a** Agen Properti  
**I want to** login dan lihat listing & komisi saya  
**So that** saya bisa track performa saya

**Acceptance Criteria:**
- ✅ Login dengan role agent
- ✅ Dashboard personal show: listing, omzet, komisi
- ✅ Hanya bisa edit properti miliknya
- ✅ Tidak bisa akses properti agen lain

**Priority:** P0 - CRITICAL  
**Story Points:** 2  
**Sprint:** 1

---

#### US-AUTH-004: Forgot Password
**As a** User  
**I want to** reset password jika lupa  
**So that** saya bisa login lagi

**Acceptance Criteria:**
- ✅ Link "Forgot Password" di halaman login
- ✅ Form input email
- ✅ Send email dengan reset link
- ✅ Reset link valid selama 1 jam
- ✅ Form set password baru

**Priority:** P1 - HIGH  
**Story Points:** 5  
**Sprint:** 2

---

### EPIC 2: Office & Agent Management 🏢

#### US-OFFICE-001: Create Kantor Baru
**As a** Admin Master  
**I want to** create kantor cabang baru  
**So that** saya bisa expand bisnis ke kota lain

**Acceptance Criteria:**
- ✅ Form input: nama kantor, alamat, telepon, email
- ✅ Validation: nama & telepon required
- ✅ Success notification setelah create
- ✅ Redirect ke list kantor
- ✅ New kantor muncul di dropdown

**Priority:** P0 - CRITICAL  
**Story Points:** 3  
**Sprint:** 1

---

#### US-OFFICE-002: Edit & Delete Kantor
**As a** Admin Master  
**I want to** edit atau delete kantor  
**So that** saya bisa update info atau non-aktifkan kantor

**Acceptance Criteria:**
- ✅ Button edit di list kantor
- ✅ Form pre-filled dengan data existing
- ✅ Soft delete (status inactive)
- ✅ Confirm dialog sebelum delete
- ✅ Tidak bisa delete jika ada agen active

**Priority:** P0 - CRITICAL  
**Story Points:** 2  
**Sprint:** 1

---

#### US-AGENT-001: Create Agen Baru
**As a** Admin Master/Admin Kantor  
**I want to** create agen baru dan assign ke kantor  
**So that** agen bisa mulai input listing

**Acceptance Criteria:**
- ✅ Form input: nama, email, phone, WA, kantor
- ✅ Auto-create user account (role: agent)
- ✅ Send email dengan password default
- ✅ Agen langsung bisa login
- ✅ Admin Kantor hanya bisa assign ke kantornya

**Priority:** P0 - CRITICAL  
**Story Points:** 5  
**Sprint:** 1

---

#### US-AGENT-002: Edit Profile Agen
**As a** Agen  
**I want to** edit profile saya (foto, bio, kontak)  
**So that** buyer bisa lihat info saya dengan jelas

**Acceptance Criteria:**
- ✅ Form edit profile
- ✅ Upload foto profile (max 2MB)
- ✅ Edit bio, phone, WA
- ✅ Field kantor read-only (tidak bisa pindah sendiri)
- ✅ Auto-save dengan notification

**Priority:** P1 - HIGH  
**Story Points:** 3  
**Sprint:** 2

---

### EPIC 3: Property Management 🏠

#### US-PROP-001: Create Listing Properti
**As a** Agen  
**I want to** create listing properti baru dengan foto  
**So that** properti bisa dilihat buyer di public page

**Acceptance Criteria:**
- ✅ Form input: judul, deskripsi, tipe, harga, luas, alamat
- ✅ Upload max 10 foto (JPG/PNG, max 5MB each)
- ✅ Drag & drop foto untuk reorder
- ✅ Set cover image (foto pertama default)
- ✅ Auto-generate slug dari judul
- ✅ Auto-assign ke agen yang login
- ✅ Status default: available
- ✅ Preview before submit

**Priority:** P0 - CRITICAL  
**Story Points:** 8  
**Sprint:** 2

---

#### US-PROP-002: Edit Listing Properti
**As a** Agen  
**I want to** edit listing saya  
**So that** saya bisa update harga atau info terbaru

**Acceptance Criteria:**
- ✅ Button edit di list properti
- ✅ Form pre-filled dengan data existing
- ✅ Bisa add/remove foto
- ✅ Bisa change status (available → pending → sold)
- ✅ Audit trail: track perubahan harga
- ✅ Agen hanya bisa edit properti miliknya

**Priority:** P0 - CRITICAL  
**Story Points:** 5  
**Sprint:** 2

---

#### US-PROP-003: Delete Listing
**As a** Admin Master/Admin Kantor  
**I want to** delete listing yang invalid  
**So that** public page hanya show properti valid

**Acceptance Criteria:**
- ✅ Soft delete (bukan permanent delete)
- ✅ Confirm dialog
- ✅ Tidak bisa delete jika sudah ada transaksi
- ✅ Deleted listing tidak muncul di public
- ✅ Admin bisa restore jika perlu

**Priority:** P1 - HIGH  
**Story Points:** 3  
**Sprint:** 3

---

#### US-PROP-004: Upload Foto Properti
**As a** Agen  
**I want to** upload multiple foto sekaligus  
**So that** buyer bisa lihat properti dari berbagai sudut

**Acceptance Criteria:**
- ✅ Upload max 10 foto per properti
- ✅ Validation: JPG/PNG only, max 5MB
- ✅ Auto-resize ke 1200x800px
- ✅ Auto-compress tanpa quality loss signifikan
- ✅ Progress bar saat upload
- ✅ Error handling jika upload gagal

**Priority:** P0 - CRITICAL  
**Story Points:** 5  
**Sprint:** 2

---

### EPIC 4: Public Listing 🌐

#### US-PUBLIC-001: Browse Listing Properti
**As a** Buyer  
**I want to** lihat semua properti available  
**So that** saya bisa cari properti yang sesuai

**Acceptance Criteria:**
- ✅ Grid view dengan foto cover, judul, harga, lokasi
- ✅ Responsive design (mobile & desktop)
- ✅ Pagination (20 item per page)
- ✅ Sort by: harga, tanggal, views
- ✅ Show jumlah hasil: "Ditemukan 45 properti"

**Priority:** P0 - CRITICAL  
**Story Points:** 5  
**Sprint:** 3

---

#### US-PUBLIC-002: Search & Filter Properti
**As a** Buyer  
**I want to** search dan filter properti  
**So that** saya bisa cari properti sesuai budget dan lokasi

**Acceptance Criteria:**
- ✅ Search box (keyword: judul, deskripsi, alamat)
- ✅ Filter: tipe, status (jual/sewa), harga range, lokasi
- ✅ Multiple filter bisa digabung
- ✅ Filter tersimpan di URL (shareable)
- ✅ Button "Reset Filter"
- ✅ Real-time search (debounce 300ms)

**Priority:** P0 - CRITICAL  
**Story Points:** 8  
**Sprint:** 3

---

#### US-PUBLIC-003: View Detail Properti
**As a** Buyer  
**I want to** lihat detail lengkap properti  
**So that** saya bisa evaluasi sebelum kontak agen

**Acceptance Criteria:**
- ✅ All info ditampilkan: harga, luas, kamar, alamat, deskripsi
- ✅ Photo gallery dengan lightbox
- ✅ Map lokasi (Google Maps embedded)
- ✅ Info agen: nama, foto, phone, WA
- ✅ Button: Call & WhatsApp (pre-filled message)
- ✅ Share button (copy link, WA, FB)
- ✅ View counter +1 setiap page load

**Priority:** P0 - CRITICAL  
**Story Points:** 8  
**Sprint:** 3

---

#### US-PUBLIC-004: Kontak Agen via WhatsApp
**As a** Buyer  
**I want to** kontak agen via WA dengan 1 klik  
**So that** saya bisa tanya langsung tentang properti

**Acceptance Criteria:**
- ✅ Button "Chat via WhatsApp"
- ✅ Pre-filled message: "Halo, saya tertarik dengan [Judul Properti] - [Link]"
- ✅ Open WhatsApp web/app
- ✅ Mobile: deep link ke WA app
- ✅ Desktop: open wa.me link

**Priority:** P0 - CRITICAL  
**Story Points:** 3  
**Sprint:** 3

---

### EPIC 5: Transaction Management 💰

#### US-TRANS-001: Input Transaksi Jual/Sewa
**As a** Admin Master/Admin Kantor  
**I want to** input transaksi ketika deal  
**So that** komisi bisa dihitung otomatis

**Acceptance Criteria:**
- ✅ Form input: properti, agen owner (auto-fill), agen buyer (optional)
- ✅ Input: buyer name, phone, harga final, tanggal
- ✅ Tipe: jual atau sewa
- ✅ Komisi %: default 2%, bisa diubah
- ✅ Auto-calculate total komisi
- ✅ Preview komisi split sebelum submit
- ✅ Submit → auto-generate commissions
- ✅ Property status auto-change ke sold/rented

**Priority:** P0 - CRITICAL  
**Story Points:** 8  
**Sprint:** 4

---

#### US-TRANS-002: View List Transaksi
**As a** Admin/Agen  
**I want to** lihat list transaksi  
**So that** saya bisa track sales

**Acceptance Criteria:**
- ✅ Table view: properti, agen, buyer, harga, tanggal
- ✅ Filter by: date range, kantor, agen, status
- ✅ Sort by: tanggal, harga
- ✅ Pagination
- ✅ Admin Master: all transactions
- ✅ Admin Kantor: kantornya saja
- ✅ Agen: transaksi yang involve dia

**Priority:** P1 - HIGH  
**Story Points:** 5  
**Sprint:** 4

---

#### US-TRANS-003: View Detail Transaksi
**As a** Admin/Agen  
**I want to** lihat detail transaksi  
**So that** saya bisa review komisi breakdown

**Acceptance Criteria:**
- ✅ Info properti: judul, foto, alamat
- ✅ Info agen owner & buyer (jika ada)
- ✅ Info buyer: nama, kontak
- ✅ Harga listing vs harga final
- ✅ Komisi breakdown: total, agen, kantor
- ✅ Status pembayaran komisi
- ✅ Tanggal transaksi & created

**Priority:** P1 - HIGH  
**Story Points:** 3  
**Sprint:** 4

---

### EPIC 6: Commission Management 💵

#### US-COMM-001: Auto-Calculate Komisi
**As a** Admin  
**I want to** sistem auto-calculate komisi saat input transaksi  
**So that** saya tidak perlu hitung manual

**Acceptance Criteria:**
- ✅ Input harga final → auto-calculate total komisi (% × price)
- ✅ Scenario 1 agen: 70% agen, 30% kantor
- ✅ Scenario 2 agen: 35% + 35% agen, 30% kantor
- ✅ Preview sebelum submit
- ✅ Bisa override % manual jika perlu

**Priority:** P0 - CRITICAL  
**Story Points:** 8  
**Sprint:** 4

---

#### US-COMM-002: Mark Komisi sebagai Paid
**As a** Admin Master/Admin Kantor  
**I want to** mark komisi sebagai paid  
**So that** agen tahu komisinya sudah dibayar

**Acceptance Criteria:**
- ✅ Button "Mark as Paid" di list komisi
- ✅ Input: tanggal bayar, metode (transfer/cash), notes
- ✅ Status change: pending → paid
- ✅ Notifikasi ke agen (email/WA)
- ✅ Tidak bisa unmark (audit trail)

**Priority:** P0 - CRITICAL  
**Story Points:** 5  
**Sprint:** 5

---

#### US-COMM-003: View Komisi Pending & Paid
**As a** Agen  
**I want to** lihat komisi pending dan paid  
**So that** saya tahu berapa yang harus saya terima

**Acceptance Criteria:**
- ✅ Tab: Pending | Paid | All
- ✅ Table: transaksi, properti, amount, tanggal, status
- ✅ Total pending di header
- ✅ Total paid (bulan ini, total)
- ✅ Filter by date range
- ✅ Export ke Excel

**Priority:** P1 - HIGH  
**Story Points:** 5  
**Sprint:** 5

---

### EPIC 7: Dashboard & Reports 📊

#### US-DASH-001: Dashboard Personal Agen
**As a** Agen  
**I want to** lihat dashboard performa saya  
**So that** saya tahu produktivitas saya

**Acceptance Criteria:**
- ✅ Widget:
  - Total Listing Active
  - Total Omzet (sum harga final)
  - Total Komisi
  - Komisi Pending
  - Komisi Paid
- ✅ Filter by date range (bulan ini, 3 bulan, 1 tahun, custom)
- ✅ Chart: Omzet per bulan (line chart)
- ✅ Chart: Listing by status (pie chart)
- ✅ Real-time data (no caching)

**Priority:** P0 - CRITICAL  
**Story Points:** 8  
**Sprint:** 5

---

#### US-DASH-002: Dashboard Kantor
**As a** Admin Kantor  
**I want to** lihat dashboard performa kantor saya  
**So that** saya bisa monitor agen-agen saya

**Acceptance Criteria:**
- ✅ Widget:
  - Total Agen Active
  - Total Listing Active
  - Total Omzet Kantor
  - Total Komisi Kantor
- ✅ Table: Performance per agen (nama, listing, omzet, komisi)
- ✅ Sort by omzet/komisi
- ✅ Chart: Omzet per agen (bar chart)
- ✅ Click agen → detail performance agen

**Priority:** P1 - HIGH  
**Story Points:** 8  
**Sprint:** 6

---

#### US-DASH-003: Dashboard Master (Global)
**As a** Admin Master  
**I want to** lihat dashboard global semua kantor  
**So that** saya bisa monitor bisnis secara keseluruhan

**Acceptance Criteria:**
- ✅ Widget:
  - Total Kantor
  - Total Agen
  - Total Listing
  - Total Omzet Global
  - Total Komisi
- ✅ Table: Performance per kantor (nama, agen, listing, omzet)
- ✅ Chart: Omzet per kantor (bar chart)
- ✅ Chart: Trend omzet (line chart)
- ✅ Click kantor → detail performance kantor

**Priority:** P1 - HIGH  
**Story Points:** 8  
**Sprint:** 6

---

## 3. User Story Summary per Sprint

### Sprint 1 (Week 1-2): Foundation 🏗️
**Goal:** Setup authentication & basic CRUD

| ID | Story | Points | Priority |
|----|-------|--------|----------|
| US-AUTH-001 | Login Admin Master | 3 | P0 |
| US-AUTH-002 | Login Admin Kantor | 2 | P0 |
| US-AUTH-003 | Login Agen | 2 | P0 |
| US-OFFICE-001 | Create Kantor | 3 | P0 |
| US-OFFICE-002 | Edit & Delete Kantor | 2 | P0 |
| US-AGENT-001 | Create Agen | 5 | P0 |

**Total Points:** 17  
**Velocity Target:** 20

---

### Sprint 2 (Week 3-4): Property Management 🏠
**Goal:** CRUD Properti dengan foto upload

| ID | Story | Points | Priority |
|----|-------|--------|----------|
| US-AUTH-004 | Forgot Password | 5 | P1 |
| US-AGENT-002 | Edit Profile Agen | 3 | P1 |
| US-PROP-001 | Create Listing | 8 | P0 |
| US-PROP-002 | Edit Listing | 5 | P0 |
| US-PROP-004 | Upload Foto | 5 | P0 |

**Total Points:** 26  
**Velocity Target:** 25

---

### Sprint 3 (Week 5-6): Public Listing 🌐
**Goal:** Public website untuk buyer

| ID | Story | Points | Priority |
|----|-------|--------|----------|
| US-PROP-003 | Delete Listing | 3 | P1 |
| US-PUBLIC-001 | Browse Listing | 5 | P0 |
| US-PUBLIC-002 | Search & Filter | 8 | P0 |
| US-PUBLIC-003 | View Detail | 8 | P0 |
| US-PUBLIC-004 | Kontak Agen WA | 3 | P0 |

**Total Points:** 27  
**Velocity Target:** 25

---

### Sprint 4 (Week 7-8): Transaction & Commission 💰
**Goal:** Input transaksi & auto-calculate komisi

| ID | Story | Points | Priority |
|----|-------|--------|----------|
| US-TRANS-001 | Input Transaksi | 8 | P0 |
| US-TRANS-002 | View List Transaksi | 5 | P1 |
| US-TRANS-003 | View Detail Transaksi | 3 | P1 |
| US-COMM-001 | Auto-Calculate Komisi | 8 | P0 |

**Total Points:** 24  
**Velocity Target:** 25

---

### Sprint 5 (Week 9-10): Commission Management & Dashboard 💵📊
**Goal:** Mark komisi paid & dashboard personal

| ID | Story | Points | Priority |
|----|-------|--------|----------|
| US-COMM-002 | Mark Komisi Paid | 5 | P0 |
| US-COMM-003 | View Komisi Pending/Paid | 5 | P1 |
| US-DASH-001 | Dashboard Personal Agen | 8 | P0 |

**Total Points:** 18  
**Velocity Target:** 20

---

### Sprint 6 (Week 11-12): Dashboard Kantor & Master 📊
**Goal:** Dashboard agregat & final polish

| ID | Story | Points | Priority |
|----|-------|--------|----------|
| US-DASH-002 | Dashboard Kantor | 8 | P1 |
| US-DASH-003 | Dashboard Master | 8 | P1 |
| - | Bug Fixing & Polish | 10 | P0 |

**Total Points:** 26  
**Velocity Target:** 25

---

## 4. Total Summary

**Total User Stories:** 26  
**Total Story Points:** 138  
**Average Velocity:** 23 points/sprint  
**Total Sprints:** 6 (12 weeks)  
**Estimated Completion:** End of February 2026  
**Buffer for Testing:** 2 weeks  
**Target Launch:** Maret 2026 ✅

---

**Prepared by:** AI Project Analysis System  
**Date:** 31 Oktober 2025  
**Version:** 1.0.0

