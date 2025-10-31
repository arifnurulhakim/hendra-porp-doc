# 🔄 Activity Diagrams & Flowcharts - Hendra Prop

**Dokumen Activity Diagrams (Business Process Flows)**  
Proyek: Hendra Prop - Sistem Manajemen Properti  
Tanggal: 31 Oktober 2025  
Versi: 1.0.0

---

## 1. Activity Diagram Overview

Activity Diagram menunjukkan alur aktivitas/proses bisnis dari awal hingga akhir, dengan decision points dan parallel activities.

**Notasi:**
- **Start (●)** - Titik mulai
- **End (◉)** - Titik selesai
- **Activity [□]** - Aksi/proses
- **Decision {◇}** - Decision point (if/else)
- **Fork/Join (═)** - Parallel activities
- **Swimlane (│)** - Responsibility area per actor

---

## 2. Activity Diagram: End-to-End Property Listing to Sale

```
═══════════════════════════════════════════════════════════════════════════
SWIMLANE: AGEN          │  SYSTEM         │  BUYER      │  ADMIN KANTOR
═══════════════════════════════════════════════════════════════════════════

    ●  START                │                │             │
    │                       │                │             │
    ▼                       │                │             │
[Login ke Sistem]          │                │             │
    │                       │                │             │
    ▼                       │                │             │
[Create New Property]      │                │             │
    │                       │                │             │
    ▼                       │                │             │
[Input Data Properti]      │                │             │
(Judul, harga, deskripsi)  │                │             │
    │                       │                │             │
    ▼                       │                │             │
[Upload Foto (max 10)]     │                │             │
    │                       │                │             │
    ▼                       ▼                │             │
[Submit Form]          [Validate Data]      │             │
    │                       │                │             │
    │                       ▼                │             │
    │                  {Valid?}              │             │
    │                    /    \              │             │
    │               [No]      [Yes]          │             │
    │                /            \          │             │
    ◀──[Error Msg]──              │         │             │
    │                              ▼         │             │
    │                    [Optimize Photos]   │             │
    │                    (Resize & Compress) │             │
    │                              │         │             │
    │                              ▼         │             │
    │                    [Generate Slug]     │             │
    │                              │         │             │
    │                              ▼         │             │
    │                    [Save to Database]  │             │
    │                              │         │             │
    │                              ▼         │             │
    │                    {Publish Mode?}     │             │
    │                      /          \      │             │
    │                [Public]      [Private]│             │
    │                  /                \    │             │
    │                 ▼                  ▼   │             │
    │      [Set is_public=true]  [Set is_public=false]    │
    │      [Set published_at]    [Generate Token Link]    │
    │                  │                  │  │             │
    │                  └─────────┬────────┘  │             │
    │                            ▼            │             │
    │                    [Log Activity]       │             │
    │                            │            │             │
    │                            ▼            │             │
    │                    [Send Notification]──────────────▶│
    ◀──[Success Msg]────                     │             │
    │                                         │             ▼
    │                                         │    [Receive Notification]
    │                                         │             │
    │                                         │             ▼
    │                                         │    {Approve/Reject?}
    │                                         │       /        \
    │                                         │  [Approve]  [Reject]
    │                                         │     /            \
    │                                         ▼    ▼              ▼
    │                                    [Set Status]     [Send Reason]
    │                                    [Approved]             │
    │                                         │                 ▼
    │◀────[Notification: Approved]────────────┘         [Notify Agen]
    │                                         │                 │
    │                                         ▼                 ◀─┐
    │                              {Property on Marketplace}      │
    │                                         │                   │
    │                                         │                   │
    │                                         ▼                   │
    ┼─────────────────────────────────────────┼───────────────────┼───
    │                                         │                   │
    │                                         │  ● Buyer START    │
    │                                         │        │          │
    │                                         │        ▼          │
    │                                         │  [Browse Listings]│
    │                                         │        │          │
    │                                         │        ▼          │
    │                                         │  [Search & Filter]│
    │                                         │        │          │
    │                                         │        ▼          │
    │                                         ▼  [View Detail]   │
    │                                [Query Database]│           │
    │                                         │      ▼           │
    │                                         │ [Display Info]   │
    │                                         │      │           │
    │                                         │      ▼           │
    │                                         │ {Interested?}    │
    │                                         │   /      \       │
    │                                         │[No]      [Yes]   │
    │                                         │ /          \     │
    │                                         ▼◉         [Contact Agent]
    │                                         END           │    │
    │                                                       ▼    │
    │                                              [Open WhatsApp]
    │                                                       │    │
    │                                                       ▼    │
    │◀──────────[Buyer Contact via WA]────────────────────────┘│
    │                                                            │
    │ (Negotiation happens externally)                          │
    │                                                            │
    ▼                                                            │
[Deal Reached]                                                  │
    │                                                            │
    ▼                                                            │
[Inform Admin Kantor]──────────────────────────────────────────▶│
    │                                                            ▼
    │                                                   [Input Transaction]
    │                                                            │
    │                                                            ▼
    │                          ┌────────────────────[Select Property]
    │                          │                                 │
    │                          │                                 ▼
    │                          │                    [Auto-fill Agent Owner]
    │                          │                                 │
    │                          │                                 ▼
    │                          │                    [Input Buyer Info]
    │                          │                                 │
    │                          │                                 ▼
    │                          │                    [Input Final Price]
    │                          │                                 │
    │                          │                                 ▼
    │                          ▼                    [Calculate Commission]
    │                   [Commission Preview]                     │
    │                          │                                 ▼
    │                          │                        {Commission OK?}
    │                          │                          /          \
    │                          │                     [Yes]          [No]
    │                          │                      /                \
    │                          │                     ▼                  ▼
    │                          │              [Save Transaction]  [Adjust %]
    │                          │                     │                  │
    │                          │                     ▼                  │
    │                          │           [Generate Commissions]◀──────┘
    │                          │                     │
    │                          │     ┌───────────────┼───────────────┐
    │                          │     │               │               │
    │                          │     ▼               ▼               ▼
    │                          │ [Comm Agent]  [Comm Buyer]  [Comm Office]
    │                          │     │               │               │
    │                          │     └───────────────┼───────────────┘
    │                          │                     │
    │                          │                     ▼
    │                          │          [Update Property Status]
    │                          │          (Status → Sold/Rented)
    │                          │                     │
    │                          │                     ▼
    │                          │             [Log Activity]
    │                          │                     │
    │                          │                     ▼
    │                          │          [Send Notifications]
    │                          │            /              \
    │                          │           ▼                ▼
    │◀──[Notif: Property Sold]─┘     [To Agen Owner]  [To Agen Buyer]
    │                                                       │
    ▼                                                       ▼
[View Dashboard]                                    [View Dashboard]
    │                                                       │
    ▼                                                       ▼
[See Pending Commission]                        [See Pending Commission]
    │                                                       │
    │                                                       │
    │        (Later: Admin marks as Paid)                   │
    │                      │                                │
    │                      ▼                                │
    │             [Mark Commission as Paid]◀────────────────┘
    │                      │                                │
    │                      ▼                                │
    │           [Set status = paid]                         │
    │           [Set paid_date]                             │
    │                      │                                │
    │                      ▼                                │
    │           [Send Payment Notification]                 │
    │                  /          \                         │
    │                 ▼            ▼                        │
    │◀──[Email Notif]   [Dashboard Notif]──────────────────▶│
    │                                                        │
    ▼                                                        ▼
[See Paid Commission]                          [See Paid Commission]
    │                                                        │
    ▼                                                        ▼
   ◉  END                                                  ◉  END
```

---

## 3. Flowchart: Commission Calculation Logic

```
                    ● START
                    │
                    ▼
        ┌───────────────────────────┐
        │ Get Transaction Data      │
        │ • Final Price             │
        │ • Commission %            │
        │ • Agent Owner ID          │
        │ • Agent Buyer ID (or null)│
        └─────────────┬─────────────┘
                      │
                      ▼
        ┌───────────────────────────┐
        │ Calculate Total Commission│
        │ total = price × comm_%    │
        └─────────────┬─────────────┘
                      │
                      ▼
                {Agent Buyer exists?}
                  /              \
             [YES]              [NO]
              /                    \
             ▼                      ▼
┌──────────────────────┐  ┌──────────────────────┐
│ SCENARIO A: 2 Agents │  │ SCENARIO B: 1 Agent  │
├──────────────────────┤  ├──────────────────────┤
│ Agent Owner: 35%     │  │ Agent Owner: 70%     │
│ Agent Buyer: 35%     │  │ Office: 30%          │
│ Office: 30%          │  │                      │
└──────────┬───────────┘  └──────────┬───────────┘
           │                         │
           ▼                         ▼
   ┌──────────────┐          ┌──────────────┐
   │ Create 3     │          │ Create 2     │
   │ Commission   │          │ Commission   │
   │ Records      │          │ Records      │
   └──────┬───────┘          └──────┬───────┘
          │                         │
          └────────────┬────────────┘
                       │
                       ▼
           ┌───────────────────────┐
           │ Save to commissions   │
           │ table with status     │
           │ = 'pending'           │
           └─────────┬─────────────┘
                     │
                     ▼
           ┌───────────────────────┐
           │ Return Commission     │
           │ Records Array         │
           └─────────┬─────────────┘
                     │
                     ▼
                    ◉ END
```

**Sample Output:**
```json
// Scenario A (2 Agents): Rp 1M, 2% commission
[
  {
    "agent_id": 3,
    "amount": 7000000,
    "percentage": 35,
    "type": "agent_owner"
  },
  {
    "agent_id": 5,
    "amount": 7000000,
    "percentage": 35,
    "type": "agent_buyer"
  },
  {
    "office_id": 1,
    "amount": 6000000,
    "percentage": 30,
    "type": "office"
  }
]
```

---

## 4. Flowchart: Public vs Private Property Access

```
                        ● Buyer START
                             │
                             ▼
                    {Access Method?}
                      /            \
            [Public URL]          [Private URL with Token]
                  /                        \
                 ▼                          ▼
    ┌─────────────────────┐    ┌─────────────────────────┐
    │ Access Marketplace  │    │ Extract Token from URL  │
    │ (No Auth Required)  │    │                         │
    └──────────┬──────────┘    └──────────┬──────────────┘
               │                           │
               ▼                           ▼
    [Query: is_public=true]     ┌──────────────────────┐
    [AND status=available]      │ Validate Token       │
               │                 │ • Exists?            │
               ▼                 │ • Not expired?       │
    [Display Listings]           │ • Not fully used?    │
               │                 └──────────┬───────────┘
               ▼                            │
    {Select Property?}              {Token Valid?}
         /      \                      /         \
    [No]       [Yes]               [No]         [Yes]
      │          │                  │             │
      ▼          ▼                  ▼             ▼
     END   [Click Detail]   [Show Error]  [Increment Access]
               │             • Link Expired       │
               │             • Already Used       ▼
               │                  │        [Load Property]
               │                  ▼               │
               │                 END              │
               │                                  │
               └──────────────┬───────────────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │ Display Property     │
                   │ Detail Page          │
                   │ • Photos Gallery     │
                   │ • Description        │
                   │ • Price & Specs      │
                   │ • Agent Contact      │
                   └──────────┬───────────┘
                              │
                              ▼
                   [Increment views_count]
                              │
                              ▼
                   {Interested to Contact?}
                         /         \
                    [No]           [Yes]
                      │              │
                      ▼              ▼
                     END    ┌───────────────┐
                            │ Click WA/Phone│
                            │ Button        │
                            └───────┬───────┘
                                    │
                                    ▼
                            [Open WhatsApp]
                            (Pre-filled message)
                                    │
                                    ▼
                            [Contact Agent]
                            (External to system)
                                    │
                                    ▼
                                   ◉ END
```

---

## 5. Activity Diagram: Transaction & Commission Flow

```
═══════════════════════════════════════════════════════════════════════════
SWIMLANE: ADMIN KANTOR  │  SYSTEM               │  AGEN OWNER  │  AGEN BUYER
═══════════════════════════════════════════════════════════════════════════

    ● START                 │                      │             │
    │                       │                      │             │
    ▼                       │                      │             │
[Login to Admin Panel]     │                      │             │
    │                       │                      │             │
    ▼                       │                      │             │
[Navigate to Transactions] │                      │             │
    │                       │                      │             │
    ▼                       │                      │             │
[Click "New Transaction"]  │                      │             │
    │                       │                      │             │
    ▼                       ▼                      │             │
[Select Property]      [Load Available]           │             │
                       [Properties List]           │             │
    │                       │                      │             │
    ▼                       ▼                      │             │
[Property Selected]    [Auto-fill Agent Owner]────────────────▶│
    │                       │                                    │
    ▼                       │                                    │
{Need Agent Buyer?}         │                                    │
   /        \               │                                    │
[No]       [Yes]            │                                    │
  │          │               │                                    │
  │          ▼               │                                    │
  │   [Select Agent Buyer]──────────────────────────────────────────────▶│
  │          │               │                                    │       │
  └──────────┼───────────────┤                                    │       │
             │               │                                    │       │
             ▼               │                                    │       │
[Input Buyer Info]          │                                    │       │
(Name, phone, email)        │                                    │       │
             │               │                                    │       │
             ▼               │                                    │       │
[Input Transaction Details] │                                    │       │
• Type (sale/rent)          │                                    │       │
• Final price               │                                    │       │
• Commission % (default 2%) │                                    │       │
• Transaction date          │                                    │       │
             │               │                                    │       │
             ▼               ▼                                    │       │
[Submit]         ┌──────────────────────┐                       │       │
                 │ Calculate Commission │                       │       │
                 │ (CommissionService)  │                       │       │
                 └──────────┬───────────┘                       │       │
                            │                                    │       │
                            ▼                                    │       │
                  {How many agents?}                            │       │
                      /          \                               │       │
                  [1 Agent]    [2 Agents]                       │       │
                    /              \                             │       │
                   ▼                ▼                            │       │
        ┌──────────────┐  ┌──────────────────┐                 │       │
        │ Split 70/30  │  │ Split 35/35/30   │                 │       │
        └──────┬───────┘  └──────┬───────────┘                 │       │
               │                 │                              │       │
               └────────┬────────┘                              │       │
                        │                                       │       │
                        ▼                                       │       │
              [Display Preview]                                 │       │
              • Agent Owner: Rp X                               │       │
              • Agent Buyer: Rp Y (if any)                      │       │
              • Office: Rp Z                                    │       │
                        │                                       │       │
◀──[Review Preview]─────┘                                       │       │
    │                                                            │       │
    ▼                                                            │       │
{Confirm?}                                                       │       │
  /    \                                                         │       │
[No]  [Yes]                                                      │       │
 │      │                                                        │       │
 │      ▼                                                        │       │
 │  [Save Transaction]                                           │       │
 │      │                                                        │       │
 │      ▼                                                        │       │
 │  [Create Commission Records]                                  │       │
 │      │  ════════════════════════════                          │       │
 │      │  ║ Parallel Execution      ║                          │       │
 │      ▼  ════════════════════════════                          │       │
 │   ┌──────────┬──────────┬──────────┐                         │       │
 │   ▼          ▼          ▼          ▼                          │       │
 │[Comm 1]  [Comm 2]  [Comm 3]  [Update Status]                  │       │
 │(Agent)   (Agent)  (Office)   (Sold/Rented)                    │       │
 │   │          │          │          │                           │       │
 │   └──────────┴──────────┴──────────┘                          │       │
 │              │                                                  │       │
 │              ▼                                                  │       │
 │      [Log to Activity Log]                                     │       │
 │              │                                                  │       │
 │              ▼                                                  │       │
 │      [Send Notifications]                                      │       │
 │        /           \                                            │       │
 │       ▼             ▼                                           │       │
 │ [To Agent Owner] [To Agent Buyer]─────────────────────────────▶│──────▶│
 │                                                                 ▼       ▼
 ▼                                                    [Notif Received] [Notif]
[Success Message]                                               │       │
 │                                                               ▼       ▼
 ▼                                                      [View Dashboard]  │
◉ Admin END                                                     │       │
                                                                 ▼       ▼
                                                    [See Pending Commission]
                                                                 │       │
                                                                 ▼       ▼
                                                                ◉ END   ◉ END
```

---

## 6. Activity Diagram: Mark Commission as Paid

```
═══════════════════════════════════════════════════════════════
SWIMLANE: ADMIN KANTOR  │  SYSTEM         │  AGEN
═══════════════════════════════════════════════════════════════

    ● START                 │                │
    │                       │                │
    ▼                       │                │
[Navigate to Commissions]  │                │
    │                       │                │
    ▼                       ▼                │
[Filter: Pending Only] [Query Pending]      │
                       [Commissions]         │
    │                       │                │
    ▼                       ▼                │
[Display List]         [Show List]          │
    │                       │                │
    ▼                       │                │
[Select Commission]        │                │
    │                       │                │
    ▼                       │                │
[Click "Mark as Paid"]     │                │
    │                       │                │
    ▼                       ▼                │
[Input Payment Details][Validate Input]     │
• Paid Date                 │                │
• Payment Method            │                │
• Notes                     │                │
    │                       ▼                │
    │                  {Valid?}              │
    │                   /    \               │
    │              [No]      [Yes]           │
    │               /            \           │
    ◀─[Error]─────              │           │
    │                            ▼           │
    │                    [Update Status]     │
    │                    • status = 'paid'   │
    │                    • paid_date = input │
    │                    • notes = input     │
    │                            │           │
    │                            ▼           │
    │                    [Log Activity]      │
    │                    (Audit Trail)       │
    │                            │           │
    │                            ▼           │
    │                  [Send Notification]───────────▶│
    ◀─[Success Msg]────                              │
    │                                                  ▼
    ▼                                        [Receive Notif]
   ◉ END                                              │
                                                      ▼
                                            [Check Dashboard]
                                                      │
                                                      ▼
                                            [See Paid Commission]
                                                      │
                                                      ▼
                                                     ◉ END
```

---

## 7. Swimlane Diagram: Property Approval Workflow

```
═══════════════════════════════════════════════════════════════════════════
│    AGEN         │  SYSTEM           │  ADMIN KANTOR    │  PUBLIC BUYER
═══════════════════════════════════════════════════════════════════════════

  ● START           │                  │                  │
     │              │                  │                  │
     ▼              │                  │                  │
[Create Property]   │                  │                  │
     │              │                  │                  │
     ▼              ▼                  │                  │
[Submit]     [Set status='pending']   │                  │
     │              │                  │                  │
     │              ▼                  │                  │
     │       [Log Activity]            │                  │
     │              │                  │                  │
     │              ▼                  │                  │
     │       [Send Notification]───────────▶│            │
     ◀─[Pending]    │                       │            │
     │              │                       ▼            │
     │              │              [Receive Notification]│
     │              │                       │            │
     │              │                       ▼            │
     │              │              [Review Property]     │
     │              │              • Check photos        │
     │              │              • Check description   │
     │              │                       │            │
     │              │                       ▼            │
     │              │              {Decision?}           │
     │              │                /        \          │
     │              │          [Approve]   [Reject]      │
     │              │            /              \        │
     │              │           ▼                ▼       │
     │              │   [Set Approved]   [Set Reason]   │
     │              │   [Set is_public]   [Send Reason] │
     │              │           │                │       │
     │              ▼           ▼                │       │
     │       [Log Decision]                      │       │
     │              │                             │       │
     │              ▼                             │       │
     │       [Send Notification]                 │       │
     │           /                 \              │       │
     │          ▼                   ▼             │       │
     ◀─[Approved Notif]       [Rejected]─────────▶       │
     │                             │                      │
     ▼                             ◀─[Fix & Resubmit]    │
{Approved?}                        │                      │
   /    \                          └──────────────▶[Loop]│
[No]   [Yes]                                              │
  │      │                                                │
  ▼      ▼                                                │
 END [Now Public]──────────────────────────────────────────────▶│
          │                                                       ▼
          │                                              [Property Visible]
          │                                              [in Marketplace]
          │                                                       │
          │                                                       ▼
          │                                              [Can Browse & View]
          │                                                       │
          └───────────────────────────────────────────────────────┘
                                                                  │
                                                                  ▼
                                                                 ◉ END
```

---

## 8. Decision Tables

### 8.1 Property Visibility Decision Table

| is_public | status | deleted_at | Show in Marketplace? | Accessible via Link? |
|-----------|--------|------------|----------------------|----------------------|
| TRUE | available | NULL | ✅ YES | ✅ YES |
| TRUE | pending | NULL | ✅ YES | ✅ YES |
| TRUE | sold | NULL | ❌ NO | ✅ YES (read-only) |
| TRUE | rented | NULL | ❌ NO | ✅ YES (read-only) |
| FALSE | available | NULL | ❌ NO | ✅ YES (if has valid token) |
| FALSE | * | NULL | ❌ NO | ✅ YES (if has valid token) |
| * | * | NOT NULL | ❌ NO | ❌ NO |

**Rules:**
1. Soft-deleted properties tidak accessible sama sekali
2. Public properties dengan status sold/rented hanya untuk referensi (no contact agent)
3. Private properties hanya accessible via valid token link

---

### 8.2 Commission Split Decision Table

| Agent Owner | Agent Buyer | Total Commission | Agent Owner Gets | Agent Buyer Gets | Office Gets |
|-------------|-------------|------------------|------------------|------------------|-------------|
| ✅ | ❌ | Rp 20M | Rp 14M (70%) | - | Rp 6M (30%) |
| ✅ | ✅ | Rp 20M | Rp 7M (35%) | Rp 7M (35%) | Rp 6M (30%) |
| ✅ | ❌ | Rp 10M | Rp 7M (70%) | - | Rp 3M (30%) |
| ✅ | ✅ | Rp 10M | Rp 3.5M (35%) | Rp 3.5M (35%) | Rp 3M (30%) |

**Override Rules:**
- Admin bisa ubah % split manual
- Total percentage harus = 100%
- Office minimum 20% (business rule)

---

### 8.3 Token Validation Decision Table

| Token Exists | Expired | Access Count | is_used | Result |
|--------------|---------|--------------|---------|--------|
| ❌ | - | - | - | ❌ Invalid (404) |
| ✅ | YES | - | - | ❌ Expired |
| ✅ | NO | 0 | TRUE | ✅ Valid (first access) |
| ✅ | NO | >0 | TRUE | ❌ Already Used |
| ✅ | NO | - | FALSE | ✅ Valid (reusable) |

---

## 9. Exception Handling Flows

### 9.1 Upload Photo Failed

```
[Upload Photo] → {Success?}
                   /      \
              [Yes]       [No]
               /            \
              ▼              ▼
         [Continue]   {Error Type?}
                        /    |    \
                [Size]  [Format] [Network]
                  /        |         \
                 ▼         ▼          ▼
         [Show: Max 5MB] [Show: JPG/PNG only] [Show: Retry]
                  │         │          │
                  └─────────┴──────────┘
                            │
                            ▼
                      [User Action]
                       /         \
                  [Retry]      [Skip]
                    /              \
                   ▼                ▼
            [Re-upload]        [Continue without]
```

### 9.2 Transaction Conflict

```
[Input Transaction] → {Property Status?}
                         /        \
                  [Available]   [Sold/Rented]
                      /              \
                     ▼                ▼
               [Continue]    [Show Error]
                                "Property sudah terjual"
                                      │
                                      ▼
                                [Refresh List]
                                      │
                                      ▼
                                [Select Another]
```

---

## 10. Critical Path Analysis

### 10.1 Minimum Path to First Sale

```
1. [Admin Master Login] → 2 min
2. [Create Office] → 3 min
3. [Create Agent] → 5 min
4. [Agent Login] → 1 min
5. [Create Property + Upload Photos] → 10 min
6. [Publish to Marketplace] → 1 min
7. [Buyer Browse & Search] → 5 min
8. [Contact Agent via WA] → 1 min
9. (External: Negotiation) → varies
10. [Admin Input Transaction] → 5 min
11. [Commission Auto-Generated] → instant
12. [Agent View Dashboard] → 2 min

TOTAL: ~35 minutes (excluding negotiation)
```

---

## 11. Flow Summary per Role

### 11.1 Agen Daily Workflow

```
Login → View Dashboard → Create/Edit Listings → Upload Photos → 
Set Public/Private → Monitor Views → Respond to Buyer Contacts → 
View Commission Status → Logout
```

### 11.2 Admin Kantor Daily Workflow

```
Login → View Office Dashboard → Review New Properties → 
Approve/Reject → Input Transactions → Mark Commissions Paid → 
View Activity Log → Generate Reports → Logout
```

### 11.3 Buyer Journey

```
Visit Website → Browse Listings → Search & Filter → 
View Property Details → Contact Agent (WA) → 
(External: Visit & Negotiate) → Purchase Decision
```

---

**Prepared by:** AI Project Analysis System  
**Date:** 31 Oktober 2025  
**Version:** 1.0.0  
**Status:** Ready for Development Reference

