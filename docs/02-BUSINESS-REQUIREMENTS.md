# 📋 Business Requirements - Hendra Prop

**Dokumen Business Requirements Document (BRD)**  
Proyek: Hendra Prop - Sistem Manajemen Properti  
Tanggal: 31 Oktober 2025  
Versi: 1.0.0

---

## 1. Functional Requirements

### 1.1 Authentication & Authorization

#### FR-AUTH-001: Multi-Role Login
**Priority:** P0 - CRITICAL  
**User Story:** Sebagai user, saya ingin login dengan role yang berbeda agar bisa akses fitur sesuai permission  

**Requirements:**
- System harus support 4 role: Admin Master, Admin Kantor, Agen, Buyer
- Login menggunakan email & password
- Session management dengan timeout 24 jam
- Remember me option (7 hari)
- Forgot password functionality

**Acceptance Criteria:**
- ✅ User bisa login dengan email & password
- ✅ System mengarahkan ke dashboard sesuai role
- ✅ Invalid credentials menampilkan error message
- ✅ User bisa logout dan session ter-invalidate

---

#### FR-AUTH-002: Role-Based Access Control (RBAC)
**Priority:** P0 - CRITICAL  

**Permission Matrix:**

| Feature | Admin Master | Admin Kantor | Agen | Buyer |
|---------|--------------|--------------|------|-------|
| Manage Kantor | ✅ Full | ❌ | ❌ | ❌ |
| Manage Agen | ✅ All | ✅ Own Office | ❌ | ❌ |
| Manage Property | ✅ All | ✅ Own Office | ✅ Own Only | ❌ |
| Input Transaction | ✅ All | ✅ Own Office | ❌ | ❌ |
| Set Commission | ✅ All | ✅ Own Office | ❌ | ❌ |
| View Performance | ✅ All | ✅ Own Office | ✅ Own Only | ❌ |
| View Public Listing | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria:**
- ✅ User hanya bisa akses fitur sesuai role
- ✅ Unauthorized access menampilkan 403 Forbidden
- ✅ URL protection (tidak bisa bypass via direct link)

---

### 1.2 Kantor Management

#### FR-OFFICE-001: CRUD Kantor
**Priority:** P0 - CRITICAL  
**Actor:** Admin Master  

**Requirements:**
- Create kantor baru dengan data: nama, alamat, telepon, email
- Read/View daftar semua kantor
- Update data kantor
- Soft delete kantor (tidak hard delete jika sudah ada agen)

**Acceptance Criteria:**
- ✅ Admin Master bisa create kantor baru
- ✅ Validation: nama, telepon, email required
- ✅ List kantor show jumlah agen di masing-masing kantor
- ✅ Delete kantor yang sudah punya agen harus confirm dulu

---

#### FR-OFFICE-002: Assign Admin Kantor
**Priority:** P0 - CRITICAL  
**Actor:** Admin Master  

**Requirements:**
- Assign user dengan role Admin Kantor ke kantor tertentu
- Satu kantor bisa punya multiple Admin Kantor
- Satu Admin Kantor bisa manage multiple kantor

**Acceptance Criteria:**
- ✅ Admin Master bisa assign Admin Kantor ke kantor
- ✅ Admin Kantor hanya lihat data kantor yang di-assign ke dia
- ✅ Bisa unassign Admin Kantor dari kantor

---

### 1.3 Agen Management

#### FR-AGENT-001: CRUD Agen
**Priority:** P0 - CRITICAL  
**Actor:** Admin Master, Admin Kantor  

**Requirements:**
- Create agen baru dengan data: nama, email, telepon, foto, kantor
- Satu agen hanya bisa assigned ke 1 kantor (dedicated)
- Update data agen
- Activate/Deactivate agen (soft delete)

**Acceptance Criteria:**
- ✅ Create agen dengan assign ke kantor
- ✅ Validation: email unique, telepon required
- ✅ Admin Kantor hanya bisa create agen untuk kantornya
- ✅ Admin Master bisa create agen untuk semua kantor
- ✅ Agen inactive tidak bisa login dan tidak muncul di listing

---

#### FR-AGENT-002: Agen Profile
**Priority:** P1 - HIGH  
**Actor:** Agen  

**Requirements:**
- Agen bisa edit profile sendiri (foto, bio, kontak)
- Tidak bisa pindah kantor sendiri (harus lewat admin)

**Acceptance Criteria:**
- ✅ Agen bisa update foto profile
- ✅ Agen bisa update nomor WA & telepon
- ✅ Field kantor read-only (tidak bisa edit)

---

### 1.4 Property Management

#### FR-PROP-001: Create Property
**Priority:** P0 - CRITICAL  
**Actor:** Admin Master, Admin Kantor, Agen  

**Requirements:**
- Input properti dengan field:
  - Judul listing
  - Deskripsi (rich text)
  - Tipe (Rumah, Apartemen, Tanah, Komersial)
  - Status listing (Jual/Sewa/Keduanya)
  - Harga (IDR)
  - Harga per m² (auto-calculate)
  - Luas tanah (m²)
  - Luas bangunan (m²)
  - Alamat lengkap
  - Koordinat (optional - for map)
  - Jumlah kamar tidur
  - Jumlah kamar mandi
  - Foto (max 10 foto)
  - Sertifikat (SHM, HGB, dll)

**Acceptance Criteria:**
- ✅ Form input properti dengan validation
- ✅ Upload multiple foto (max 10, max 5MB per foto)
- ✅ Auto-calculate harga/m² dari harga / luas tanah
- ✅ Properti otomatis assigned ke agen yang create
- ✅ Admin bisa assign properti ke agen lain

---

#### FR-PROP-002: Edit Property
**Priority:** P0 - CRITICAL  
**Actor:** Admin Master, Admin Kantor, Agen (owner)  

**Requirements:**
- Agen hanya bisa edit properti miliknya
- Admin Kantor bisa edit properti di kantornya
- Admin Master bisa edit semua properti

**Acceptance Criteria:**
- ✅ Edit semua field termasuk foto
- ✅ Add/remove foto
- ✅ Change status (Available → Sold/Rented)
- ✅ Log history perubahan (audit trail)

---

#### FR-PROP-003: Property Status
**Priority:** P0 - CRITICAL  

**Status Flow:**
```
Available → Pending → Sold/Rented
    ↑                      |
    └──────────────────────┘
         (Batalkan transaksi)
```

**Requirements:**
- Available: Properti bisa dilihat public
- Pending: Ada calon buyer, nego berjalan (masih show di public)
- Sold/Rented: Transaksi selesai (hide dari public)

**Acceptance Criteria:**
- ✅ Status available show di public listing
- ✅ Status sold/rented hide dari public (hanya internal view)
- ✅ Bisa revert status jika transaksi gagal

---

#### FR-PROP-004: Property Photos
**Priority:** P0 - CRITICAL  

**Requirements:**
- Upload max 10 foto per properti
- Format: JPG, PNG
- Max size: 5MB per foto
- Auto-resize & compress untuk performance
- Drag & drop untuk reorder foto
- Foto pertama = cover image

**Acceptance Criteria:**
- ✅ Upload multiple foto sekaligus
- ✅ Drag & drop reorder
- ✅ Delete foto
- ✅ Set cover image
- ✅ Foto ter-compress tanpa degradasi kualitas signifikan

---

#### FR-PROP-005: Public Marketplace
**Priority:** P0 - CRITICAL  
**Actor:** Admin Master, Admin Kantor, Agen

**Requirements:**
- Admin/Agen bisa toggle properti untuk ditampilkan di public marketplace
- Field: `is_public` (boolean) - default TRUE untuk auto-publish
- Field: `published_at` (datetime) - timestamp publikasi
- Properti dengan `is_public = true` dan `status = available/pending` muncul di marketplace
- Properti dengan `status = sold/rented` atau `is_public = false` tidak muncul

**Acceptance Criteria:**
- ✅ Toggle "Publish to Marketplace" di form property
- ✅ Auto-set `published_at` saat pertama kali di-publish
- ✅ Unpublish tidak menghapus property, hanya hide dari public
- ✅ Filter di public marketplace: hanya show property yang `is_public = true`
- ✅ View counter (`views_count`) increment setiap property detail dibuka

**Business Rules:**
- Hanya properti yang sudah approved yang bisa di-publish
- Soft-deleted properties otomatis unpublish
- Admin bisa force unpublish property agen

---

#### FR-PROP-006: Private Tokenized Link
**Priority:** P1 - HIGH  
**Actor:** Admin Master, Admin Kantor, Agen

**Requirements:**
- Generate private link dengan token unik untuk properti tertentu
- Link format: `/property/{slug}?token={random_token}`
- Token expiration: default 7 hari (customizable)
- Single-use option: link hanya bisa dibuka 1x
- Track access: siapa/kapan link dibuka

**Acceptance Criteria:**
- ✅ Button "Generate Private Link" di property detail (admin panel)
- ✅ Form: expiration date, is_single_use checkbox
- ✅ Generate random token (64 characters)
- ✅ Copy link to clipboard functionality
- ✅ List all generated links per property (dengan status: active/expired/used)
- ✅ Expired link show "Link Expired" page
- ✅ Used single-use link show "Link Already Used" page
- ✅ Valid link show property detail (tanpa agent contact info)

**Business Logic:**
```php
// Check if link is valid
- Token exists in property_links table
- expires_at > now()
- If is_used = true: access_count must be 0
- Property must not be deleted
```

**Use Cases:**
- Exclusive/premium property untuk VIP customer
- Pre-launch property viewing
- Agent share ke specific buyer (tanpa publish publik)

---

### 1.5 Public Listing (Buyer)

#### FR-PUBLIC-001: Browse Listing
**Priority:** P0 - CRITICAL  
**Actor:** Buyer (public, no login)  

**Requirements:**
- List semua properti dengan status Available atau Pending
- Grid view dengan foto cover, judul, harga, lokasi
- Pagination (20 item per page)
- Responsive design (mobile & desktop)

**Acceptance Criteria:**
- ✅ Show semua properti available
- ✅ Card show: foto cover, judul, harga, tipe, lokasi
- ✅ Click card → detail page
- ✅ Mobile responsive

---

#### FR-PUBLIC-002: Search & Filter
**Priority:** P0 - CRITICAL  
**Actor:** Buyer  

**Requirements:**
- Search by keyword (judul, lokasi, deskripsi)
- Filter:
  - Tipe properti (Rumah, Apartemen, Tanah, Komersial)
  - Status (Jual/Sewa)
  - Harga range (min-max)
  - Lokasi (dropdown kota/area)
  - Luas range (min-max m²)

**Acceptance Criteria:**
- ✅ Search real-time (debounce 300ms)
- ✅ Multiple filter bisa digabung
- ✅ Filter tersimpan di URL (shareable link)
- ✅ Show jumlah hasil: "Ditemukan 45 properti"

---

#### FR-PUBLIC-003: Property Detail
**Priority:** P0 - CRITICAL  
**Actor:** Buyer  

**Requirements:**
- Show semua detail properti
- Gallery foto (full screen)
- Map lokasi (if koordinat tersedia)
- Kontak agen: Nama, Foto, Telepon, WA
- Button: Call & WhatsApp direct link

**Acceptance Criteria:**
- ✅ All fields ditampilkan dengan layout rapi
- ✅ Photo gallery dengan lightbox
- ✅ Click WA button → open WA dengan pre-filled message
- ✅ Click phone → call direct (di mobile)
- ✅ Share button (copy link)

---

### 1.6 Transaction Management

#### FR-TRANS-001: Input Transaction
**Priority:** P0 - CRITICAL  
**Actor:** Admin Master, Admin Kantor  

**Requirements:**
- Input transaksi dengan data:
  - Properti (dropdown)
  - Agen Owner (auto-fill dari properti)
  - Agen Buyer (optional, dropdown agen lain)
  - Buyer name & contact
  - Tipe transaksi (Jual/Sewa)
  - Harga final (bisa beda dari harga listing)
  - Tanggal transaksi
  - Catatan (optional)

**Acceptance Criteria:**
- ✅ Form input transaksi dengan validation
- ✅ Pilih properti → auto-fill agen owner
- ✅ Optional: pilih agen buyer (jika ada)
- ✅ Harga final default = harga listing, bisa diubah
- ✅ Submit → status properti otomatis jadi Sold/Rented

---

#### FR-TRANS-002: Transaction List
**Priority:** P1 - HIGH  
**Actor:** Admin Master, Admin Kantor, Agen  

**Requirements:**
- Admin Master: lihat semua transaksi
- Admin Kantor: lihat transaksi di kantornya
- Agen: lihat transaksi yang involve dia (owner atau buyer)

**Acceptance Criteria:**
- ✅ List transaksi dengan filter by date, kantor, agen
- ✅ Show: properti, agen, buyer, harga, tanggal, status
- ✅ Click row → detail transaksi

---

### 1.7 Commission Management

#### FR-COMM-001: Set Commission
**Priority:** P0 - CRITICAL  
**Actor:** Admin Master, Admin Kantor  

**Requirements:**
- Setting komisi per transaksi (bukan global)
- Default: 70% agen, 30% kantor (untuk sewa)
- Customizable per transaksi:
  - % komisi dari harga final
  - Split agen vs kantor
  - Jika 2 agen: split antar agen

**Acceptance Criteria:**
- ✅ Input transaksi → auto-calculate komisi dengan default split
- ✅ Admin bisa override split komisi
- ✅ Jika ada 2 agen: split 70% dibagi 2 (35% each)
- ✅ Komisi kantor tetap 30%

**Example:**
```
Harga final: Rp 1.000.000.000
Default komisi: 2% = Rp 20.000.000

Scenario 1: Hanya agen owner
- Agen owner: 70% × Rp 20jt = Rp 14jt
- Kantor: 30% × Rp 20jt = Rp 6jt

Scenario 2: Agen owner + agen buyer
- Agen owner: 35% × Rp 20jt = Rp 7jt
- Agen buyer: 35% × Rp 20jt = Rp 7jt
- Kantor: 30% × Rp 20jt = Rp 6jt
```

---

#### FR-COMM-002: Commission Status
**Priority:** P0 - CRITICAL  

**Status:**
- Pending: Transaksi selesai, komisi belum dibayar
- Paid: Komisi sudah dibayar ke agen
- Cancelled: Transaksi dibatalkan

**Requirements:**
- Admin bisa mark komisi sebagai Paid (dengan tanggal bayar)
- Agen bisa lihat status komisi mereka

**Acceptance Criteria:**
- ✅ Admin bisa update status komisi
- ✅ Notifikasi ke agen saat komisi di-mark Paid
- ✅ Log history payment (tanggal, amount, metode)

---

### 1.8 Performance Dashboard

#### FR-DASH-001: Agen Personal Dashboard
**Priority:** P0 - CRITICAL  
**Actor:** Agen  

**Requirements:**
- Widget:
  1. Total Listing Active
  2. Total Omzet (sum harga final transaksi)
  3. Total Komisi (sum komisi)
  4. Komisi Pending (belum dibayar)
  5. Komisi Paid (sudah dibayar)
- Filter by date range (bulan ini, 3 bulan, 1 tahun, custom)
- Chart: Omzet per bulan (line chart)

**Acceptance Criteria:**
- ✅ Dashboard show data real-time
- ✅ Filter date range update chart & numbers
- ✅ Click widget → detail list

---

#### FR-DASH-002: Kantor Dashboard
**Priority:** P1 - HIGH  
**Actor:** Admin Kantor  

**Requirements:**
- Widget (aggregate agen di kantornya):
  1. Total Agen Active
  2. Total Listing Active
  3. Total Omzet
  4. Total Komisi Kantor
- Table: Performance per agen (nama, listing, omzet, komisi)
- Chart: Omzet per agen (bar chart)

**Acceptance Criteria:**
- ✅ Dashboard show aggregate data
- ✅ Table sortable by omzet/komisi
- ✅ Click agen → detail performance agen tersebut

---

#### FR-DASH-003: Master Dashboard
**Priority:** P1 - HIGH  
**Actor:** Admin Master  

**Requirements:**
- Widget (aggregate semua kantor):
  1. Total Kantor
  2. Total Agen
  3. Total Listing
  4. Total Omzet
  5. Total Komisi
- Table: Performance per kantor
- Chart: Omzet per kantor (bar chart)

**Acceptance Criteria:**
- ✅ Dashboard show global data
- ✅ Table sortable
- ✅ Click kantor → detail performance kantor tersebut

---

### 1.9 Activity Log & Audit Trail

#### FR-AUDIT-001: Activity Logging
**Priority:** P1 - HIGH  
**Actor:** System (automatic logging)

**Requirements:**
- Log semua perubahan penting di sistem (using spatie/laravel-activitylog)
- Track siapa (causer) melakukan apa (action) pada data apa (subject)
- Simpan old values & new values untuk audit trail
- Log category: property, transaction, commission, user, approval

**Activities yang di-log:**
- Create/Update/Delete properti (track: harga, status, is_public)
- Create/Update transaksi
- Update komisi (track: amount, status)
- Approval/Rejection properti
- User login/logout
- Generate private link

**Acceptance Criteria:**
- ✅ Auto-logging tanpa manual intervention
- ✅ Activity log viewable di admin panel (per entity & per user)
- ✅ Show: timestamp, user, action, entity, old/new values
- ✅ Filter by: date range, user, log category
- ✅ Search by keyword
- ✅ Export activity log ke Excel

**Example Log Entry:**
```
User: Admin Kantor 1
Action: Updated property price
Property: Rumah Mewah Jakarta #123
Changes:
  - price: 1.000.000.000 → 900.000.000
  - status: available → pending
Timestamp: 2025-11-15 14:30:00
```

---

#### FR-AUDIT-002: Transaction Audit Trail
**Priority:** P0 - CRITICAL  
**Actor:** Admin Master, Admin Kantor

**Requirements:**
- Simpan semua perubahan komisi & harga jual dalam transaksi
- Tidak bisa delete transaction history (hard constraint)
- Track manual override komisi oleh admin

**Acceptance Criteria:**
- ✅ Transaction detail page show full audit trail
- ✅ Show: created by, created at, modified by, modified at
- ✅ List semua perubahan komisi dengan reason
- ✅ Cannot delete/hard delete transactions

---

### 1.10 Notification System

#### FR-NOTIF-001: Internal Notifications
**Priority:** P2 - MEDIUM  
**Actor:** Admin Master, Admin Kantor, Agen

**Requirements:**
- Notification di dashboard (bell icon dengan counter)
- Notification categories:
  - Property approved/rejected
  - Property sold (untuk agen owner)
  - Commission paid (untuk agen)
  - New property needs review (untuk admin kantor)

**Acceptance Criteria:**
- ✅ Bell icon di navbar dengan unread count
- ✅ Dropdown list showing latest 10 notifications
- ✅ Click notification → redirect ke related page
- ✅ Mark as read functionality
- ✅ Mark all as read button
- ✅ Notification auto-expire setelah 30 hari

---

#### FR-NOTIF-002: Email Notifications
**Priority:** P2 - MEDIUM (Phase 2)  
**Actor:** System (automatic)

**Email Triggers:**
- Property approved → Email ke agen
- Property sold → Email ke agen owner & agen buyer
- Commission paid → Email ke agen dengan detail
- New property submitted → Email ke admin kantor untuk review

**Acceptance Criteria:**
- ✅ Email template dengan branding Hendra Prop
- ✅ Include relevant links (view property, view commission)
- ✅ Toggle email notification ON/OFF per user (settings)
- ✅ Email queue (tidak send synchronous)

---

### 1.11 Performance Board Enhanced

#### FR-PERF-001: Closing Rate Calculation
**Priority:** P1 - HIGH  
**Actor:** Admin Master, Admin Kantor

**Requirements:**
- Calculate & display closing rate di performance board
- Formula: `(Jumlah Properti Terjual / Total Listing) × 100%`
- Show per agen & per kantor
- Filter by date range

**Acceptance Criteria:**
- ✅ Closing rate column di performance table
- ✅ Color coding: >50% = green, 30-50% = yellow, <30% = red
- ✅ Sort by closing rate
- ✅ Include dalam export Excel

**Example Display:**
```
Agent A: 15 sold / 30 listings = 50% closing rate ✅
Agent B: 5 sold / 25 listings = 20% closing rate ⚠️
```

---

#### FR-PERF-002: Export Reports
**Priority:** P2 - MEDIUM (Phase 2)  
**Actor:** Admin Master, Admin Kantor

**Requirements:**
- Export performance board ke Excel/PDF
- Include: charts, tables, metrics
- Customizable date range
- Auto-generate filename with timestamp

**Acceptance Criteria:**
- ✅ Button "Export to Excel" & "Export to PDF"
- ✅ Excel: multiple sheets (summary, per-agent, per-kantor)
- ✅ PDF: professional layout dengan logo
- ✅ Download langsung (tidak email)

---

## 2. Non-Functional Requirements

### 2.1 Performance

#### NFR-PERF-001: Page Load Time
**Requirement:** Page load time < 2 detik (avg)  
**Measurement:** Google PageSpeed Insights score > 80

**Implementation:**
- Image lazy loading
- CSS/JS minification
- CDN untuk static assets
- Database query optimization
- Caching (Redis)

---

#### NFR-PERF-002: Concurrent Users
**Requirement:** Support 100 concurrent users tanpa degradasi performance  

**Implementation:**
- Load testing dengan JMeter/K6
- Server scaling plan (vertical/horizontal)
- Database connection pooling

---

### 2.2 Security

#### NFR-SEC-001: Authentication
**Requirement:** Secure authentication & session management  

**Implementation:**
- Password hashing dengan bcrypt
- CSRF protection (Laravel default)
- XSS protection
- SQL injection protection (Eloquent ORM)
- Session timeout: 24 jam
- Remember me: encrypted cookie

---

#### NFR-SEC-002: Authorization
**Requirement:** Strict role-based access control  

**Implementation:**
- Laravel Gate & Policy
- Middleware untuk setiap route
- Database-level permission check
- Audit trail untuk sensitive actions

---

#### NFR-SEC-003: Data Privacy
**Requirement:** Protect sensitive data  

**Implementation:**
- HTTPS only (SSL certificate)
- Database encryption untuk sensitive fields
- No password storage in plain text
- GDPR compliance (user data deletion)

---

### 2.3 Usability

#### NFR-USA-001: Responsive Design
**Requirement:** 100% responsive di mobile, tablet, desktop  

**Breakpoints:**
- Mobile: 320px - 768px
- Tablet: 769px - 1024px
- Desktop: > 1024px

**Implementation:**
- Mobile-first design
- Touch-friendly buttons (min 44x44px)
- Readable font size (min 16px)

---

#### NFR-USA-002: User Experience
**Requirement:** Intuitive & easy to use  

**Metrics:**
- User bisa input listing tanpa training
- Max 3 clicks untuk reach any feature
- Consistent UI/UX across pages

**Implementation:**
- Follow Laravel Filament design patterns
- Form validation dengan helpful error messages
- Loading indicators untuk async actions
- Success/error notifications

---

### 2.4 Reliability

#### NFR-REL-001: Uptime
**Requirement:** 99% uptime (max 7.2 jam downtime per bulan)  

**Implementation:**
- Monitoring dengan UptimeRobot
- Automated backup daily
- Disaster recovery plan

---

#### NFR-REL-002: Data Backup
**Requirement:** Daily backup dengan retention 30 hari  

**Implementation:**
- Automated database backup (MySQL dump)
- File backup (foto properti)
- Off-site backup storage
- Tested recovery procedure

---

### 2.5 Scalability

#### NFR-SCALE-001: Data Growth
**Requirement:** Support up to 10,000 listing & 1,000 agen  

**Implementation:**
- Database indexing
- Query optimization
- Archive old data (> 2 tahun)

---

#### NFR-SCALE-002: Feature Growth
**Requirement:** Arsitektur yang mudah di-extend untuk Phase 2  

**Implementation:**
- Modular architecture
- Service-oriented design
- API-first approach (untuk future mobile app)

---

### 2.6 Compatibility

#### NFR-COMP-001: Browser Support
**Requirement:** Support modern browsers  

**Browsers:**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

---

#### NFR-COMP-002: Mobile OS
**Requirement:** Support mobile browsers  

**Mobile OS:**
- iOS Safari (iOS 14+)
- Android Chrome (Android 10+)

---

### 2.7 Scheduled Tasks & Automation

#### NFR-SCHED-001: Cron Jobs
**Requirement:** Automated background tasks (using Laravel Scheduler)

**Scheduled Tasks:**
1. **Auto-expire Private Links** (Hourly)
   - Check `property_links` where `expires_at < now()`
   - Mark as expired atau soft delete
   
2. **Clean Old Notifications** (Daily at 2 AM)
   - Delete notifications older than 30 days
   
3. **Generate Daily Reports** (Daily at 8 AM)
   - Cache performance metrics untuk faster dashboard load
   
4. **Clean Activity Log** (Weekly)
   - Archive activity logs older than 90 days

**Implementation:**
```php
// app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    $schedule->command('links:expire')->hourly();
    $schedule->command('notifications:clean')->daily()->at('02:00');
    $schedule->command('reports:cache')->daily()->at('08:00');
    $schedule->command('logs:archive')->weekly();
}
```

**Monitoring:**
- Log setiap scheduled task execution
- Alert jika task fail
- Track execution time

---

#### NFR-SCHED-002: Queue Workers
**Requirement:** Asynchronous job processing

**Queued Jobs:**
- Email notifications
- Image optimization setelah upload
- Export reports (Excel/PDF)
- Activity logging (untuk heavy operations)

**Implementation:**
- Laravel Queue with database driver (MVP)
- Upgrade to Redis for production
- Supervisor untuk keep queue worker running

---

### 2.8 Data Integrity & Soft Delete

#### NFR-DATA-001: Soft Delete
**Requirement:** Protect important data from accidental deletion

**Tables with Soft Delete:**
- `offices` - Kantor tidak bisa hard delete jika ada agen
- `agents` - Agen tidak bisa hard delete jika ada transaksi
- `properties` - Properti soft delete, bisa restore
- `users` - User soft delete, bisa restore

**Implementation:**
```php
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model {
    use SoftDeletes;
}

// Query exclude soft-deleted
Property::all(); // Only non-deleted

// Query include soft-deleted
Property::withTrashed()->get();

// Restore
$property->restore();
```

**Business Rules:**
- Only Admin Master can permanently delete (force delete)
- Soft-deleted data tidak muncul di dropdown/select
- Soft-deleted properties tidak muncul di public marketplace
- Report tetap include soft-deleted data dengan indicator

**Acceptance Criteria:**
- ✅ Deleted data not showing in normal queries
- ✅ Admin panel show "Deleted" tab untuk view soft-deleted items
- ✅ Restore button available untuk Admin Master
- ✅ Cascade soft delete: Delete office → soft delete all agents

---

## 3. Business Rules Summary

### BR-001: Kantor-Agen Relationship
- Satu kantor memiliki banyak agen (1:N)
- Satu agen hanya dedicated ke 1 kantor (N:1)
- Agen tidak bisa pindah kantor tanpa approval Admin Master

---

### BR-002: Properti-Agen Relationship
- Satu properti owned oleh 1 agen
- Maksimal 1 agen tambahan sebagai agen buyer
- Total maksimal: 1 agen owner + 1 agen buyer per transaksi

---

### BR-003: Komisi Calculation
- Default split: 70% agen, 30% kantor
- Jika 2 agen: 35% owner + 35% buyer + 30% kantor
- Customizable per transaksi oleh Admin
- Komisi dihitung dari harga final (bukan listing price)

---

### BR-004: Property Status Flow
- New listing → Available (show public)
- Nego → Pending (masih show public)
- Deal → Sold/Rented (hide dari public)
- Cancel → back to Available

---

### BR-005: Permission Hierarchy
1. Admin Master: Full access semua fitur & data
2. Admin Kantor: Access terbatas ke kantor & agen di bawahnya
3. Agen: Access terbatas ke properti & transaksi miliknya
4. Buyer: Read-only public listing

---

## 4. User Acceptance Test (UAT) Scenarios

### UAT-001: End-to-End Listing Flow
**Actor:** Agen

**Steps:**
1. Login sebagai agen
2. Create listing baru (input semua field + upload foto)
3. Submit listing
4. Verify listing muncul di public page
5. Buyer lihat listing & kontak agen via WA
6. Agen update status → Pending
7. Admin input transaksi → status jadi Sold
8. Verify listing hilang dari public
9. Agen cek dashboard → komisi muncul sebagai Pending
10. Admin mark komisi sebagai Paid
11. Agen cek dashboard → komisi Paid

**Expected Result:** ✅ All steps berhasil tanpa error

---

### UAT-002: Multi-Agen Transaction
**Actor:** Admin Kantor

**Scenario:**
- Agen A punya listing rumah Rp 1M
- Agen B bawa buyer untuk rumah tersebut
- Deal di Rp 900jt (nego)

**Steps:**
1. Login sebagai Admin Kantor
2. Input transaksi:
   - Properti: Rumah Agen A
   - Agen Owner: Agen A
   - Agen Buyer: Agen B
   - Harga final: Rp 900jt
3. Submit → auto-calculate komisi
4. Verify komisi split:
   - Komisi total: 2% × Rp 900jt = Rp 18jt
   - Agen A: 35% × Rp 18jt = Rp 6.3jt
   - Agen B: 35% × Rp 18jt = Rp 6.3jt
   - Kantor: 30% × Rp 18jt = Rp 5.4jt
5. Agen A & B cek dashboard → masing-masing lihat komisi Rp 6.3jt

**Expected Result:** ✅ Komisi ter-split dengan benar

---

### UAT-003: Permission Test
**Actor:** Multiple

**Steps:**
1. Login sebagai Agen A
2. Try akses list semua agen → ❌ Forbidden
3. Try edit properti milik Agen B → ❌ Forbidden
4. Try input transaksi → ❌ Forbidden
5. Logout, login sebagai Admin Kantor
6. Access list agen di kantornya → ✅ Success
7. Try access agen di kantor lain → ❌ Forbidden
8. Logout, login sebagai Admin Master
9. Access semua data → ✅ Success

**Expected Result:** ✅ Permission enforcement work correctly

---

## 5. Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 31 Okt 2025 | Initial BRD | AI Analysis System |

---

**Prepared by:** AI Project Analysis System  
**Reviewed by:** [Pending]  
**Approved by:** [Pending]  
**Date:** 31 Oktober 2025

