# 📊 Data Flow Diagram (DFD) - Hendra Prop

**Dokumen Data Flow Diagram**  
Proyek: Hendra Prop - Sistem Manajemen Properti  
Tanggal: 31 Oktober 2025  
Versi: 1.0.0

---

## 1. DFD Overview

Data Flow Diagram (DFD) menunjukkan bagaimana data mengalir melalui sistem, dari input pengguna hingga penyimpanan dan output. DFD ini menggunakan notasi standar dengan 4 komponen utama:

**Notasi:**
- **External Entity (□)** - Pengguna atau sistem eksternal
- **Process (○)** - Proses/transformasi data
- **Data Store (═)** - Database/storage
- **Data Flow (→)** - Aliran data

---

## 2. DFD Level 0 (Context Diagram)

### 2.1 System Context

```
┌──────────────────────────────────────────────────────────────────┐
│                         SISTEM HENDRA PROP                        │
│                    (Property Management System)                   │
│                                                                    │
│  Input:                                Output:                    │
│  • Property Data                       • Listing Information      │
│  • Transaction Data                    • Performance Reports      │
│  • User Credentials                    • Commission Reports       │
│  • Search Queries                      • Notifications            │
└──────────────────────────────────────────────────────────────────┘
         ▲                 ▲                 ▲                 ▲
         │                 │                 │                 │
    ┌────┴────┐       ┌────┴────┐      ┌────┴────┐      ┌────┴────┐
    │  Admin  │       │  Admin  │      │  Agen   │      │  Buyer  │
    │  Master │       │ Kantor  │      │ Properti│      │(Public) │
    └─────────┘       └─────────┘      └─────────┘      └─────────┘
```

### 2.2 External Entities

| Entity | Role | Interaction |
|--------|------|-------------|
| **Admin Master** | Super Administrator | Full CRUD on all entities, view all reports |
| **Admin Kantor** | Office Manager | Manage office agents & properties, view office reports |
| **Agen Properti** | Sales Agent | Create listings, view personal performance |
| **Buyer (Public)** | Property Seeker | Browse/search listings, contact agents |

---

## 3. DFD Level 1 (Main Processes)

### 3.1 Complete Level 1 DFD

```
┌─────────────┐                                           ┌─────────────┐
│   Admin     │                                           │   Buyer     │
│   Master    │                                           │  (Public)   │
└──────┬──────┘                                           └──────┬──────┘
       │                                                         │
       │ [Credentials]                            [Search Query]│
       ▼                                                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         1.0 AUTHENTICATION                              │
│                      (Login/Logout/Verify)                              │
└──────┬─────────────────────────────────────────────────────────────────┘
       │ [User Session]
       ▼
   ═════════════════
   ║ USER_SESSION  ║
   ═════════════════
       │
       │ [Authenticated User Data]
       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      2.0 USER MANAGEMENT                                │
│              (CRUD Kantor, Agen, Assign Roles)                          │
└──────┬─────────────────────────────────────────────────────────────────┘
       │ [User/Office/Agent Data]
       ▼
   ═════════════════
   ║  USERS_DB     ║
   ║  OFFICES_DB   ║
   ║  AGENTS_DB    ║
   ═════════════════
       │
       │ [Agent Info]
       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    3.0 PROPERTY MANAGEMENT                              │
│           (Create Listing, Upload Photos, Publish)                      │
└──────┬─────────────────────────────────────────────────────────────────┘
       │ [Property Data + Photos]
       ▼
   ═════════════════════════
   ║  PROPERTIES_DB        ║
   ║  PROPERTY_PHOTOS_DB   ║
   ║  PROPERTY_LINKS_DB    ║
   ═════════════════════════
       │                                 │
       │ [Public Properties]             │ [Private Link]
       ▼                                 ▼
┌──────────────────────────┐    ┌───────────────────────┐
│  4.0 PUBLIC MARKETPLACE  │    │ 5.0 PRIVATE VIEWING   │
│    (Browse/Search)       │    │   (Token Access)      │
└──────┬───────────────────┘    └───────────────────────┘
       │                                 │
       │ [Property View]                 │ [View Count]
       ▼                                 ▼
   ═════════════════
   ║  PROPERTIES   ║ ← [Update Views]
   ═════════════════
       │
       │ [Agent Contact Info]
       ▼
   [Buyer Contacts Agent via WA/Phone]
       │
       │ [Transaction Details]
       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   6.0 TRANSACTION MANAGEMENT                            │
│          (Input Sale/Rent, Link Agents, Buyer Info)                     │
└──────┬─────────────────────────────────────────────────────────────────┘
       │ [Transaction Data]
       ▼
   ═════════════════════
   ║  TRANSACTIONS_DB  ║
   ═════════════════════
       │
       │ [Transaction Record]
       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   7.0 COMMISSION CALCULATION                            │
│              (Auto-Calculate, Split 70/30 or 35/35/30)                  │
└──────┬─────────────────────────────────────────────────────────────────┘
       │ [Commission Records]
       ▼
   ═════════════════════
   ║  COMMISSIONS_DB   ║
   ═════════════════════
       │
       │ [Commission Data]
       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    8.0 PERFORMANCE DASHBOARD                            │
│         (Aggregate Metrics, Generate Charts, Reports)                   │
└──────┬─────────────────────────────────────────────────────────────────┘
       │ [Performance Reports]
       ▼
   [Admin/Agen View Dashboard]
       │
       │ [Activity Data]
       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      9.0 ACTIVITY LOGGING                               │
│              (Track Changes, Audit Trail)                               │
└──────┬─────────────────────────────────────────────────────────────────┘
       │ [Activity Logs]
       ▼
   ═════════════════════
   ║  ACTIVITY_LOG_DB  ║
   ═════════════════════
       │
       │ [Notification Triggers]
       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     10.0 NOTIFICATION SYSTEM                            │
│            (Email & Database Notifications)                             │
└──────┬─────────────────────────────────────────────────────────────────┘
       │ [Notifications]
       ▼
   ═════════════════════
   ║  NOTIFICATIONS_DB ║
   ═════════════════════
       │
       ▼
   [User Receives Notification]
```

---

## 4. DFD Level 2 (Detailed Processes)

### 4.1 Process 3.0 - Property Management (Detailed)

```
┌──────────────┐
│    Agen      │
└──────┬───────┘
       │
       │ [Property Input Data]
       ▼
┌──────────────────────────────────────────┐
│  3.1 VALIDATE PROPERTY DATA              │
│  (Check required fields, formats)        │
└──────┬───────────────────────────────────┘
       │ [Validated Data]
       ▼
┌──────────────────────────────────────────┐
│  3.2 UPLOAD & OPTIMIZE PHOTOS            │
│  (Max 10, resize, compress)              │
└──────┬───────────────────────────────────┘
       │ [Photos URLs]
       ▼
   ═════════════════════
   ║  PROPERTY_PHOTOS  ║
   ═════════════════════
       │
       │ [Property + Photos]
       ▼
┌──────────────────────────────────────────┐
│  3.3 GENERATE SLUG & METADATA            │
│  (SEO slug, timestamps)                  │
└──────┬───────────────────────────────────┘
       │ [Complete Property Record]
       ▼
┌──────────────────────────────────────────┐
│  3.4 PUBLISH DECISION                    │
│  (Set is_public, published_at)           │
└──────┬───────────────────────────────────┘
       │
       ├─[is_public=true]──────────────────┐
       │                                    │
       │ [Save to DB]                       │ [Index for Search]
       ▼                                    ▼
   ═══════════════                  ┌──────────────┐
   ║ PROPERTIES ║──────────────────▶│  3.5 INDEX   │
   ═══════════════                  │  FOR SEARCH  │
       │                            └──────────────┘
       │ [Property Created]
       ▼
┌──────────────────────────────────────────┐
│  3.6 LOG ACTIVITY                        │
│  (Record creation in audit log)          │
└──────┬───────────────────────────────────┘
       │ [Activity Log Entry]
       ▼
   ═════════════════
   ║ ACTIVITY_LOG  ║
   ═════════════════
       │
       │ [Trigger Notification]
       ▼
┌──────────────────────────────────────────┐
│  3.7 SEND NOTIFICATION                   │
│  (Notify Admin Kantor for review)        │
└──────────────────────────────────────────┘
```

---

### 4.2 Process 6.0 - Transaction Management (Detailed)

```
┌──────────────┐
│ Admin Kantor │
└──────┬───────┘
       │
       │ [Transaction Input]
       ▼
┌──────────────────────────────────────────┐
│  6.1 SELECT PROPERTY                     │
│  (Dropdown available properties)         │
└──────┬───────────────────────────────────┘
       │ [Property ID]
       ▼
   ═══════════════
   ║ PROPERTIES ║────────[Property Data]────┐
   ═══════════════                           │
                                             ▼
┌──────────────────────────────────────────────────────┐
│  6.2 AUTO-FILL AGENT OWNER                           │
│  (Get agent from property.agent_id)                  │
└──────┬───────────────────────────────────────────────┘
       │ [Agent Owner Data]
       ▼
┌──────────────────────────────────────────┐
│  6.3 INPUT TRANSACTION DETAILS           │
│  • Agent Buyer (optional)                │
│  • Buyer Name & Contact                  │
│  • Final Price                           │
│  • Transaction Type (sale/rent)          │
│  • Commission % (default 2%)             │
└──────┬───────────────────────────────────┘
       │ [Transaction Data]
       ▼
┌──────────────────────────────────────────┐
│  6.4 CALCULATE COMMISSION PREVIEW        │
│  (Show: total, agent split, office)      │
└──────┬───────────────────────────────────┘
       │ [Confirmed Transaction]
       ▼
┌──────────────────────────────────────────┐
│  6.5 SAVE TRANSACTION                    │
└──────┬───────────────────────────────────┘
       │ [Transaction Record]
       ▼
   ═════════════════
   ║ TRANSACTIONS ║
   ═════════════════
       │
       │ [Transaction ID]
       ▼
┌──────────────────────────────────────────┐
│  6.6 GENERATE COMMISSIONS                │
│  (Create records for agents & office)    │
└──────┬───────────────────────────────────┘
       │ [Commission Records]
       ▼
   ═════════════════
   ║ COMMISSIONS  ║
   ═════════════════
       │
       │ [Property ID]
       ▼
┌──────────────────────────────────────────┐
│  6.7 UPDATE PROPERTY STATUS              │
│  (Set to sold/rented)                    │
└──────┬───────────────────────────────────┘
       │ [Updated Property]
       ▼
   ═══════════════
   ║ PROPERTIES ║
   ═══════════════
       │
       │ [Log Entry]
       ▼
┌──────────────────────────────────────────┐
│  6.8 LOG TRANSACTION                     │
│  (Audit trail)                           │
└──────┬───────────────────────────────────┘
       │ [Activity Log]
       ▼
   ═════════════════
   ║ ACTIVITY_LOG ║
   ═════════════════
       │
       │ [Notification Triggers]
       ▼
┌──────────────────────────────────────────┐
│  6.9 NOTIFY AGENTS                       │
│  (Property sold, commission pending)     │
└──────────────────────────────────────────┘
```

---

### 4.3 Process 7.0 - Commission Calculation (Detailed)

```
┌──────────────────┐
│  Transaction     │
│  Created Event   │
└──────┬───────────┘
       │ [Transaction Data]
       ▼
┌──────────────────────────────────────────┐
│  7.1 GET COMMISSION PERCENTAGE           │
│  (Default 2% or custom from transaction) │
└──────┬───────────────────────────────────┘
       │ [Commission %]
       ▼
┌──────────────────────────────────────────┐
│  7.2 CALCULATE TOTAL COMMISSION          │
│  (final_price × commission_percentage)   │
└──────┬───────────────────────────────────┘
       │ [Total Commission Amount]
       ▼
┌──────────────────────────────────────────┐
│  7.3 CHECK AGENT COUNT                   │
│  (1 agent or 2 agents?)                  │
└──────┬───────────────────────────────────┘
       │
       ├─[1 Agent]────────────────┐
       │                          │
       │                          ▼
       │                   ┌──────────────────────────┐
       │                   │  7.4a SPLIT 70/30        │
       │                   │  • Agent: 70%            │
       │                   │  • Office: 30%           │
       │                   └──────┬───────────────────┘
       │                          │
       │                          │
       ├─[2 Agents]──────────────┐│
       │                          ││
       │                          ▼▼
       │                   ┌──────────────────────────┐
       │                   │  7.4b SPLIT 35/35/30     │
       │                   │  • Agent Owner: 35%      │
       │                   │  • Agent Buyer: 35%      │
       │                   │  • Office: 30%           │
       │                   └──────┬───────────────────┘
       │                          │
       ▼                          ▼
       └──────────────┬───────────┘
                      │ [Commission Array]
                      ▼
┌──────────────────────────────────────────┐
│  7.5 CREATE COMMISSION RECORDS           │
│  (One for each agent + one for office)   │
└──────┬───────────────────────────────────┘
       │ [Commission Records]
       ▼
   ═════════════════
   ║ COMMISSIONS  ║
   ═════════════════
       │ [Status: pending]
       ▼
   [Agents can view in dashboard]
```

**Example Calculation:**
```
Transaction: Rp 1.000.000.000
Commission %: 2%
Total Commission: Rp 20.000.000

Scenario A (1 Agent):
→ Agent Owner: Rp 14.000.000 (70%)
→ Office: Rp 6.000.000 (30%)

Scenario B (2 Agents):
→ Agent Owner: Rp 7.000.000 (35%)
→ Agent Buyer: Rp 7.000.000 (35%)
→ Office: Rp 6.000.000 (30%)
```

---

### 4.4 Process 8.0 - Performance Dashboard (Detailed)

```
┌──────────────┐
│ Agen/Admin   │
└──────┬───────┘
       │ [Dashboard Request + Date Range]
       ▼
┌──────────────────────────────────────────┐
│  8.1 IDENTIFY USER ROLE                  │
│  (Agen: personal, Admin: office/master)  │
└──────┬───────────────────────────────────┘
       │ [User Role]
       │
       ├─[Agen]──────────────────────────┐
       │                                  │
       │                                  ▼
       │                   ┌────────────────────────────┐
       │                   │  8.2a QUERY AGENT DATA     │
       │                   │  • Listings count          │
       │                   │  • Transactions sum        │
       │                   │  • Commissions sum         │
       │                   └──────┬─────────────────────┘
       │                          │
       │                          │
       ├─[Admin Kantor]──────────┐│
       │                          ││
       │                          ▼▼
       │                   ┌────────────────────────────┐
       │                   │  8.2b QUERY OFFICE DATA    │
       │                   │  (Aggregate all agents)    │
       │                   └──────┬─────────────────────┘
       │                          │
       │                          │
       └─[Admin Master]──────────┐│
                                  ││
                                  ▼▼
                          ┌────────────────────────────┐
                          │  8.2c QUERY GLOBAL DATA    │
                          │  (Aggregate all offices)   │
                          └──────┬─────────────────────┘
                                 │
       ┌─────────────────────────┴─────────────┐
       │                                       │
       ▼                                       ▼
   ═══════════════                    ═════════════════
   ║ PROPERTIES ║                    ║ TRANSACTIONS ║
   ═══════════════                    ═════════════════
       │                                       │
       └───────────────┬───────────────────────┘
                       │ [Raw Data]
                       ▼
┌──────────────────────────────────────────┐
│  8.3 CALCULATE METRICS                   │
│  • Total Listings                        │
│  • Total Omzet (sum final_price)         │
│  • Total Commission                      │
│  • Closing Rate (sold/total × 100%)     │
└──────┬───────────────────────────────────┘
       │ [Calculated Metrics]
       ▼
┌──────────────────────────────────────────┐
│  8.4 GENERATE CHARTS DATA                │
│  • Omzet per month (line chart)          │
│  • Listings by status (pie chart)        │
│  • Performance comparison (bar chart)    │
└──────┬───────────────────────────────────┘
       │ [Chart Data JSON]
       ▼
┌──────────────────────────────────────────┐
│  8.5 CACHE RESULTS                       │
│  (TTL: 1 hour for performance)           │
└──────┬───────────────────────────────────┘
       │ [Cached Metrics + Charts]
       ▼
   ═══════════════
   ║ REDIS CACHE║
   ═══════════════
       │
       │ [Dashboard Response]
       ▼
   [User Views Dashboard]
```

---

## 5. Data Stores Detail

### 5.1 Database Tables & Their Usage

| Data Store | Used By Processes | Purpose |
|------------|-------------------|---------|
| **users** | 1.0, 2.0 | Authentication & user management |
| **offices** | 2.0 | Office information |
| **agents** | 2.0, 3.0, 6.0 | Agent profiles & relationships |
| **properties** | 3.0, 4.0, 5.0, 6.0, 8.0 | Property listings |
| **property_photos** | 3.0, 4.0, 5.0 | Property images |
| **property_links** | 5.0 | Private tokenized access |
| **transactions** | 6.0, 7.0, 8.0 | Sale/rent records |
| **commissions** | 7.0, 8.0 | Commission tracking |
| **activity_log** | 9.0 | Audit trail |
| **notifications** | 10.0 | User notifications |

---

## 6. Critical Data Flows

### 6.1 End-to-End: Property Listing to Commission

```
1. Agen → [Property Data] → Process 3.0 → PROPERTIES_DB
2. Buyer → [Search] → Process 4.0 → PROPERTIES_DB → [Results] → Buyer
3. Buyer → [Contact] → Agen (External: WA/Phone)
4. Admin → [Transaction] → Process 6.0 → TRANSACTIONS_DB
5. Process 6.0 → [Trigger] → Process 7.0 → COMMISSIONS_DB
6. Process 7.0 → [Status Update] → PROPERTIES_DB (sold/rented)
7. Process 6.0 → [Log] → Process 9.0 → ACTIVITY_LOG_DB
8. Process 9.0 → [Notify] → Process 10.0 → NOTIFICATIONS_DB
9. Agen → [Dashboard] → Process 8.0 → Query COMMISSIONS_DB → [Report]
```

### 6.2 Data Flow Summary Table

| From | Data | To | Process |
|------|------|-----|---------|
| Agen | Property Info | System | 3.0 Property Mgmt |
| System | Property Record | PROPERTIES_DB | Store |
| Buyer | Search Query | System | 4.0 Marketplace |
| PROPERTIES_DB | Listing Results | Buyer | Display |
| Admin | Transaction Info | System | 6.0 Transaction Mgmt |
| System | Transaction Record | TRANSACTIONS_DB | Store |
| System | Commission Data | COMMISSIONS_DB | 7.0 Calculation |
| System | Activity Record | ACTIVITY_LOG_DB | 9.0 Logging |
| System | Notification | User | 10.0 Notification |

---

## 7. Data Validation & Business Rules

### 7.1 Process-Level Validation

**Process 3.0 - Property Management:**
- Validate: required fields (title, price, type, agent_id)
- Check: photo count ≤ 10, file size ≤ 5MB
- Generate: unique slug
- Default: status = 'available', is_public = true

**Process 6.0 - Transaction Management:**
- Validate: property must be 'available' or 'pending'
- Check: agent_owner from property.agent_id
- Optional: agent_buyer (different from agent_owner)
- Auto-set: property.status = 'sold'/'rented'

**Process 7.0 - Commission Calculation:**
- Validate: commission_percentage > 0
- Check: agent count (1 or 2)
- Calculate: split based on agent count
- Default: status = 'pending'

---

## 8. Performance Considerations

### 8.1 Data Flow Optimization

**Caching Strategy:**
- Cache dashboard queries (TTL: 1 hour)
- Cache public listing (TTL: 5 minutes)
- Cache search results (TTL: 10 minutes)

**Query Optimization:**
- Eager load relationships to avoid N+1
- Index frequently queried columns
- Use pagination for large result sets

**Async Processing:**
- Image optimization → Queue
- Email notifications → Queue
- Activity logging → Queue (for bulk operations)
- Report generation → Queue

---

**Prepared by:** AI Project Analysis System  
**Date:** 31 Oktober 2025  
**Version:** 1.0.0  
**Status:** Ready for Development Reference

