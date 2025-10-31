# 🎭 Use Case Diagram - Hendra Prop

**Dokumen Use Case Diagram & Scenarios**  
Proyek: Hendra Prop - Sistem Manajemen Properti  
Tanggal: 31 Oktober 2025  
Versi: 1.0.0

---

## 1. Use Case Overview

Use Case Diagram menunjukkan interaksi antara actor (pengguna) dengan sistem. Diagram ini mengidentifikasi siapa yang bisa melakukan apa dalam sistem.

**Notasi:**
- **Actor (🧑)** - Pengguna atau role
- **Use Case (○)** - Fungsi/fitur sistem
- **Association (─)** - Actor menggunakan use case
- **Include (««include»»)** - Use case wajib memanggil use case lain
- **Extend (««extend»»)** - Use case opsional dipanggil jika kondisi tertentu
- **Generalization (▲)** - Inheritance/parent-child relationship

---

## 2. Actors & Their Roles

| Actor | Description | Primary Goals |
|-------|-------------|---------------|
| **Admin Master** | Super administrator | Manage seluruh sistem, view all reports |
| **Admin Kantor** | Office manager | Manage office agents & properties |
| **Agen Properti** | Sales agent | Create listings, view commissions |
| **Buyer (Public)** | Property seeker | Browse & search properties |
| **System** | Automated system | Run scheduled tasks, send notifications |

---

## 3. Complete Use Case Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      SISTEM HENDRA PROP                                  │
│                                                                           │
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │                    AUTHENTICATION                             │      │
│  │                                                               │      │
│  │    ○ Login                   ○ Logout                        │      │
│  │    ○ Forgot Password         ○ Reset Password                │      │
│  └──────────────────────────────────────────────────────────────┘      │
│           │                                                              │
│           │                                                              │
│  ┌────────┼──────────────────────────────────────────────────────────┐ │
│  │        │            PROPERTY MANAGEMENT                            │ │
│  │        │                                                            │ │
│  │    ○ Create Property           ○ Edit Property                    │ │
│  │    ○ Delete Property           ○ Upload Photos                    │ │
│  │    ○ Publish to Marketplace    ○ Generate Private Link           │ │
│  │    ○ Set Property Status       ○ View Property List              │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │                    PUBLIC MARKETPLACE                          │      │
│  │                                                               │      │
│  │    ○ Browse Listings           ○ Search Properties           │      │
│  │    ○ Filter by Criteria        ○ View Property Detail        │      │
│  │    ○ Contact Agent (WA/Phone)  ○ Access Private Link         │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │                 TRANSACTION MANAGEMENT                         │      │
│  │                                                               │      │
│  │    ○ Input Transaction         ○ View Transactions           │      │
│  │    ○ Edit Transaction          ○ Calculate Commission        │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │                 COMMISSION MANAGEMENT                          │      │
│  │                                                               │      │
│  │    ○ View Commissions          ○ Mark as Paid                │      │
│  │    ○ Track Payment Status      ○ View Commission History     │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │                   PERFORMANCE DASHBOARD                        │      │
│  │                                                               │      │
│  │    ○ View Personal Dashboard   ○ View Office Dashboard       │      │
│  │    ○ View Master Dashboard     ○ Export Reports              │      │
│  │    ○ View Closing Rate         ○ Filter by Date Range        │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │                    USER MANAGEMENT                             │      │
│  │                                                               │      │
│  │    ○ Manage Offices            ○ Manage Agents               │      │
│  │    ○ Assign Roles              ○ Activate/Deactivate User    │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │                 ACTIVITY LOG & AUDIT                           │      │
│  │                                                               │      │
│  │    ○ View Activity Log         ○ Search Audit Trail          │      │
│  │    ○ Filter by User/Action     ○ Export Activity Log         │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │                    NOTIFICATIONS                               │      │
│  │                                                               │      │
│  │    ○ View Notifications        ○ Mark as Read                │      │
│  │    ○ Receive Email Alerts      ○ Manage Preferences          │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘

🧑 Admin Master          🧑 Admin Kantor          🧑 Agen          🧑 Buyer
     │                        │                      │               │
     └────────────────────────┴──────────────────────┴───────────────┘
                  (All connect to relevant use cases above)
```

---

## 4. Use Cases by Actor

### 4.1 Admin Master Use Cases

```
┌──────────────────┐
│  Admin Master    │
│      🧑         │
└────────┬─────────┘
         │
         ├────────○ UC-01: Login
         │
         ├────────○ UC-02: Manage Offices (CRUD)
         │           ├── Create Office
         │           ├── Edit Office
         │           ├── Delete Office (soft)
         │           └── View All Offices
         │
         ├────────○ UC-03: Manage Agents (CRUD)
         │           ├── Create Agent
         │           ├── Edit Agent
         │           ├── Assign to Office
         │           └── Deactivate Agent
         │
         ├────────○ UC-04: Manage Properties
         │           ├── View All Properties
         │           ├── Edit Any Property
         │           ├── Delete Property
         │           ├── Approve Property
         │           └── Force Unpublish
         │
         ├────────○ UC-05: Manage Transactions
         │           ├── Input Transaction
         │           ├── Edit Transaction
         │           ├── View All Transactions
         │           └── ««include»» Calculate Commission
         │
         ├────────○ UC-06: Manage Commissions
         │           ├── View All Commissions
         │           ├── Edit Commission Split
         │           ├── Mark as Paid
         │           └── Override Commission %
         │
         ├────────○ UC-07: View Master Dashboard
         │           ├── View Global Metrics
         │           ├── View All Offices Performance
         │           ├── View All Agents Performance
         │           └── ««extend»» Export Reports
         │
         ├────────○ UC-08: View Activity Log
         │           ├── View All Activities
         │           ├── Filter by User/Date/Action
         │           └── ««extend»» Export Audit Trail
         │
         ├────────○ UC-09: Manage System Settings
         │           ├── Configure Defaults
         │           └── Manage Notifications
         │
         └────────○ UC-10: Restore Deleted Data
                     └── Undelete Soft-Deleted Records
```

---

### 4.2 Admin Kantor Use Cases

```
┌──────────────────┐
│  Admin Kantor    │
│      🧑         │
└────────┬─────────┘
         │
         ├────────○ UC-11: Login
         │
         ├────────○ UC-12: Manage Office Agents
         │           ├── Create Agent (own office only)
         │           ├── Edit Agent
         │           └── View Office Agents
         │
         ├────────○ UC-13: Manage Office Properties
         │           ├── Create Property
         │           ├── Edit Property
         │           ├── Delete Property
         │           ├── Approve Property
         │           ├── Publish to Marketplace
         │           └── Generate Private Link
         │
         ├────────○ UC-14: Manage Transactions
         │           ├── Input Transaction (office properties)
         │           ├── View Office Transactions
         │           └── ««include»» Calculate Commission
         │
         ├────────○ UC-15: Manage Commissions
         │           ├── View Office Commissions
         │           ├── Mark as Paid (office agents)
         │           └── Edit Commission Notes
         │
         ├────────○ UC-16: View Office Dashboard
         │           ├── View Office Metrics
         │           ├── View Agents Performance
         │           ├── View Closing Rates
         │           └── ««extend»» Export Office Report
         │
         ├────────○ UC-17: View Activity Log
         │           └── View Office Activities
         │
         └────────○ UC-18: Manage Notifications
                     ├── View Notifications
                     └── Mark as Read
```

---

### 4.3 Agen Properti Use Cases

```
┌──────────────────┐
│  Agen Properti   │
│      🧑         │
└────────┬─────────┘
         │
         ├────────○ UC-19: Login
         │
         ├────────○ UC-20: Manage Profile
         │           ├── Edit Profile Info
         │           ├── Upload Photo
         │           └── Update Contact Info
         │
         ├────────○ UC-21: Manage Own Properties
         │           ├── Create Property
         │           │    ├── ««include»» Upload Photos
         │           │    └── ««include»» Generate Slug
         │           ├── Edit Property
         │           ├── Delete Property
         │           ├── Set Property Status
         │           └── ««extend»» Generate Private Link
         │
         ├────────○ UC-22: View Property List
         │           ├── View Own Properties
         │           └── Filter by Status
         │
         ├────────○ UC-23: View Commissions
         │           ├── View Pending Commissions
         │           ├── View Paid Commissions
         │           └── View Commission History
         │
         ├────────○ UC-24: View Personal Dashboard
         │           ├── View Total Listings
         │           ├── View Total Omzet
         │           ├── View Total Commission
         │           ├── View Closing Rate
         │           └── View Performance Charts
         │
         └────────○ UC-25: Manage Notifications
                     ├── View Notifications
                     ├── Mark as Read
                     └── Configure Preferences
```

---

### 4.4 Buyer (Public) Use Cases

```
┌──────────────────┐
│   Buyer          │
│   (Public) 🧑   │
└────────┬─────────┘
         │
         ├────────○ UC-26: Browse Marketplace
         │           ├── View All Listings
         │           └── Pagination
         │
         ├────────○ UC-27: Search Properties
         │           ├── Search by Keyword
         │           └── ««include»» Filter Results
         │
         ├────────○ UC-28: Filter Properties
         │           ├── Filter by Type
         │           ├── Filter by Price Range
         │           ├── Filter by Location
         │           ├── Filter by Listing Type (Jual/Sewa)
         │           └── Filter by Area Size
         │
         ├────────○ UC-29: View Property Detail
         │           ├── View Photos Gallery
         │           ├── View Full Description
         │           ├── View Location Map
         │           └── View Agent Info
         │
         ├────────○ UC-30: Contact Agent
         │           ├── Call via Phone
         │           └── Chat via WhatsApp
         │
         ├────────○ UC-31: Access Private Link
         │           ├── Enter Token URL
         │           ├── ««include»» Validate Token
         │           └── View Private Property
         │
         └────────○ UC-32: (Optional) Register Account
                     ├── Create Buyer Account
                     └── Save Favorite Properties
```

---

### 4.5 System (Automated) Use Cases

```
┌──────────────────┐
│   System         │
│   ⚙️            │
└────────┬─────────┘
         │
         ├────────○ UC-33: Auto-Expire Private Links
         │           ├── Check expired links (hourly)
         │           └── Mark as expired
         │
         ├────────○ UC-34: Clean Old Notifications
         │           └── Delete notifications >30 days (daily)
         │
         ├────────○ UC-35: Generate Daily Reports
         │           ├── Cache performance metrics
         │           └── Pre-calculate dashboard data
         │
         ├────────○ UC-36: Archive Activity Logs
         │           └── Archive logs >90 days (weekly)
         │
         ├────────○ UC-37: Send Email Notifications
         │           ├── Property Approved Email
         │           ├── Property Sold Email
         │           └── Commission Paid Email
         │
         ├────────○ UC-38: Log Activities
         │           ├── Auto-log CRUD operations
         │           └── Track user actions
         │
         └────────○ UC-39: Optimize Images
                     ├── Resize uploaded photos
                     └── Compress for performance
```

---

## 5. Detailed Use Case Specifications

### 5.1 UC-21: Create Property (Agen)

**Use Case ID:** UC-21  
**Use Case Name:** Create Property  
**Actor:** Agen Properti  
**Priority:** High  
**Preconditions:**
- Agen sudah login
- Agen memiliki status active

**Main Flow:**
1. Agen memilih menu "Create New Property"
2. System menampilkan form input property
3. Agen mengisi data property:
   - Judul, deskripsi, tipe, harga, luas tanah/bangunan, alamat
4. Agen mengupload foto (max 10)
   - ««include»» UC-21a: Upload & Optimize Photos
5. Agen memilih publish option (Public/Private)
6. Agen submit form
7. System validates input
   - ««include»» UC-21b: Validate Property Data
8. System generates slug dari judul
9. System saves property to database
10. System logs activity
11. System sends notification ke Admin Kantor
12. System menampilkan success message
13. Property tersimpan dengan status "available"

**Alternative Flows:**
- **7a. Validation Error:**
  - System shows error messages
  - Return to step 3
  
- **4a. Photo Upload Fail:**
  - System shows error message
  - Agen bisa retry atau skip photo

**Postconditions:**
- Property tersimpan di database
- Property muncul di admin panel
- Activity log tercatat
- Notification sent ke Admin Kantor

**Business Rules:**
- Max 10 photos per property
- Each photo max 5MB
- Slug must be unique
- Price must be > 0
- Property auto-assigned to logged-in agent

---

### 5.2 UC-05: Input Transaction (Admin)

**Use Case ID:** UC-05  
**Use Case Name:** Input Transaction  
**Actor:** Admin Master / Admin Kantor  
**Priority:** Critical  
**Preconditions:**
- Admin sudah login
- Ada property dengan status available/pending

**Main Flow:**
1. Admin memilih menu "Create Transaction"
2. System menampilkan form transaction
3. Admin select property dari dropdown
4. System auto-fill agent owner dari property
5. Admin optionally select agent buyer
6. Admin input buyer information:
   - Nama, phone, email
7. Admin input transaction details:
   - Transaction type (sale/rent)
   - Final price
   - Commission % (default 2%)
   - Transaction date
8. System calculate commission preview
   - ««include»» UC-05a: Calculate Commission
9. Admin review commission split
10. Admin confirm & submit
11. System saves transaction
12. System generates commission records
    - ««include»» UC-05b: Generate Commissions
13. System updates property status to sold/rented
14. System logs transaction
15. System sends notifications to involved agents
16. System shows success message

**Alternative Flows:**
- **3a. No Available Property:**
  - System shows "No properties available"
  - Process ends
  
- **9a. Admin Override Commission %:**
  - Admin changes commission percentage
  - System recalculates
  - Continue to step 10

**Postconditions:**
- Transaction tersimpan
- Commission records created with status "pending"
- Property status updated
- Agents receive notifications
- Activity log recorded

**Business Rules:**
- Agent buyer must be different from agent owner
- Commission % must be > 0
- Final price can be different from listing price
- Commission split: 70/30 (1 agent) or 35/35/30 (2 agents)

---

### 5.3 UC-27: Search Properties (Buyer)

**Use Case ID:** UC-27  
**Use Case Name:** Search Properties  
**Actor:** Buyer (Public)  
**Priority:** Critical  
**Preconditions:**
- None (public access)

**Main Flow:**
1. Buyer opens marketplace page
2. Buyer enters search keyword in search box
3. Buyer optionally applies filters
   - ««include»» UC-28: Filter Properties
4. System searches database
   - Match: title, description, address (FULLTEXT)
   - Filter by: type, price, location, listing_type
   - Only show: is_public = true, status = available/pending
5. System returns paginated results (20 per page)
6. System displays results with:
   - Cover photo, title, price, location, agent name
7. Buyer clicks on property card
8. System redirects to property detail page
   - ««continue»» UC-29: View Property Detail

**Alternative Flows:**
- **5a. No Results Found:**
  - System shows "No properties found"
  - Suggest remove some filters
  
- **3a. Save Search Filters to URL:**
  - System updates URL with filter params
  - URL is shareable

**Postconditions:**
- Search results displayed
- View count not incremented (only on detail view)

**Business Rules:**
- Only show properties with is_public = true
- Hide properties with status = sold/rented
- Search is case-insensitive
- Results sorted by: published_at DESC (newest first)
- Debounce search input (300ms)

---

## 6. Use Case Relationships

### 6.1 Include Relationships

| Base Use Case | Includes | Description |
|---------------|----------|-------------|
| UC-21: Create Property | UC-21a: Upload Photos | Wajib upload minimal 1 foto |
| UC-21: Create Property | UC-21b: Validate Data | Wajib validasi sebelum save |
| UC-05: Input Transaction | UC-05a: Calculate Commission | Auto-calculate saat input |
| UC-05: Input Transaction | UC-05b: Generate Commission Records | Auto-create records |
| UC-27: Search Properties | UC-28: Filter Properties | Filter applied during search |
| UC-29: View Property Detail | UC-29a: Increment View Counter | Auto-increment views |
| UC-31: Access Private Link | UC-31a: Validate Token | Check token validity |

### 6.2 Extend Relationships

| Base Use Case | Extends | Condition |
|---------------|---------|-----------|
| UC-07: View Dashboard | UC-07a: Export Report | If user clicks export button |
| UC-21: Create Property | UC-21c: Generate Private Link | If user wants private link |
| UC-24: View Dashboard | UC-24a: Download Excel | If user wants export |
| UC-29: View Property Detail | UC-29b: View Map | If property has lat/long |

### 6.3 Generalization

```
           ○ Manage User
                │
        ┌───────┴───────┐
        │               │
○ Manage Admin     ○ Manage Agent
        │
    ┌───┴───┐
    │       │
○ Create  ○ Edit
```

---

## 7. Use Case Priority Matrix

### 7.1 Critical Use Cases (Must Have for MVP)

| ID | Use Case | Actor | Dependency |
|----|----------|-------|------------|
| UC-01 | Login | All | - |
| UC-02 | Manage Offices | Admin Master | UC-01 |
| UC-03 | Manage Agents | Admin Master/Kantor | UC-02 |
| UC-21 | Create Property | Agen | UC-01 |
| UC-27 | Search Properties | Buyer | - |
| UC-29 | View Property Detail | Buyer | UC-27 |
| UC-30 | Contact Agent | Buyer | UC-29 |
| UC-05 | Input Transaction | Admin | UC-21 |
| UC-05a | Calculate Commission | System | UC-05 |
| UC-24 | View Personal Dashboard | Agen | UC-01 |

### 7.2 High Priority (Should Have)

| ID | Use Case | Actor | Phase |
|----|----------|-------|-------|
| UC-13 | Manage Office Properties | Admin Kantor | Sprint 2 |
| UC-15 | Manage Commissions | Admin Kantor | Sprint 4 |
| UC-16 | View Office Dashboard | Admin Kantor | Sprint 5 |
| UC-31 | Access Private Link | Buyer | Sprint 3 |
| UC-17 | View Activity Log | Admin | Sprint 5 |

### 7.3 Medium Priority (Nice to Have - Phase 2)

| ID | Use Case | Actor | Phase |
|----|----------|-------|-------|
| UC-09 | Manage System Settings | Admin Master | Phase 2 |
| UC-07a | Export Reports | Admin | Phase 2 |
| UC-32 | Register Buyer Account | Buyer | Phase 2 |
| UC-37 | Send Email Notifications | System | Phase 2 |

---

## 8. Actor Permission Matrix

| Use Case | Admin Master | Admin Kantor | Agen | Buyer | System |
|----------|--------------|--------------|------|-------|--------|
| Login | ✅ | ✅ | ✅ | ⚪ | ❌ |
| Manage Offices | ✅ | ❌ | ❌ | ❌ | ❌ |
| Manage Agents | ✅ | ✅ (own) | ❌ | ❌ | ❌ |
| Create Property | ✅ | ✅ | ✅ | ❌ | ❌ |
| Edit Property | ✅ (all) | ✅ (office) | ✅ (own) | ❌ | ❌ |
| Delete Property | ✅ | ✅ | ✅ (own) | ❌ | ❌ |
| Browse Marketplace | ✅ | ✅ | ✅ | ✅ | ❌ |
| Search Properties | ✅ | ✅ | ✅ | ✅ | ❌ |
| View Property Detail | ✅ | ✅ | ✅ | ✅ | ❌ |
| Contact Agent | ✅ | ✅ | ✅ | ✅ | ❌ |
| Input Transaction | ✅ | ✅ (office) | ❌ | ❌ | ❌ |
| View Commissions | ✅ (all) | ✅ (office) | ✅ (own) | ❌ | ❌ |
| Mark Commission Paid | ✅ | ✅ (office) | ❌ | ❌ | ❌ |
| View Dashboard | ✅ (master) | ✅ (office) | ✅ (personal) | ❌ | ❌ |
| View Activity Log | ✅ (all) | ✅ (office) | ❌ | ❌ | ❌ |
| Auto-Expire Links | ❌ | ❌ | ❌ | ❌ | ✅ |
| Send Notifications | ❌ | ❌ | ❌ | ❌ | ✅ |

**Legend:**
- ✅ Full Access
- ✅ (scope) Limited Access
- ⚪ Optional (if implemented)
- ❌ No Access

---

**Prepared by:** AI Project Analysis System  
**Date:** 31 Oktober 2025  
**Version:** 1.0.0  
**Status:** Ready for Development Reference

