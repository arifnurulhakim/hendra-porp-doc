# 🗄️ Database Design - Hendra Prop

**Dokumen Database Design & Schema**  
Proyek: Hendra Prop - Sistem Manajemen Properti  
Tanggal: 31 Oktober 2025  
Versi: 1.0.0

---

## 1. Database Overview

### 1.1 Database Information
- **Type:** Relational Database
- **DBMS:** MySQL 8.0+ / PostgreSQL 15+
- **Charset:** utf8mb4_unicode_ci
- **Engine:** InnoDB (untuk transactions & foreign keys)
- **Collation:** utf8mb4_unicode_ci

### 1.2 Naming Conventions
- **Tables:** plural, snake_case (e.g., `properties`, `property_photos`)
- **Columns:** snake_case (e.g., `created_at`, `agent_id`)
- **Primary Keys:** `id` (BIGINT UNSIGNED AUTO_INCREMENT)
- **Foreign Keys:** `{table}_id` (e.g., `agent_id`, `office_id`)
- **Indexes:** `idx_{column}` atau `idx_{purpose}`
- **Unique Indexes:** `unique_{column}`

---

## 2. Complete ERD (Entity Relationship Diagram)

```
                    ┌─────────────────────┐
                    │       USERS         │
                    ├─────────────────────┤
                    │ PK: id              │
                    │     name            │
                    │     email (UNIQUE)  │
                    │     password        │
                    │     role (ENUM)     │
                    │     phone           │
                    │     avatar          │
                    │     is_active       │
                    │     created_at      │
                    └──────┬──────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          │ 1:1            │                │ N:M
          │                │                │
          ▼                │                ▼
┌──────────────────┐       │      ┌──────────────────┐
│     AGENTS       │       │      │  OFFICE_ADMINS   │
├──────────────────┤       │      │  (Pivot Table)   │
│ PK: id           │       │      ├──────────────────┤
│ FK: user_id      │       │      │ PK: id           │
│ FK: office_id    │       │      │ FK: user_id      │
│     phone        │       │      │ FK: office_id    │
│     whatsapp     │       │      └────────┬─────────┘
│     bio          │       │               │
│     status       │       │               │
│     created_at   │       │               │
└─────┬────────────┘       │               │
      │                    │               │
      │ N:1                │ 1:N           │ N:1
      │                    │               │
      ▼                    ▼               ▼
┌─────────────────────────────────────────────────┐
│                   OFFICES                       │
├─────────────────────────────────────────────────┤
│ PK: id                                          │
│     name                                        │
│     address                                     │
│     phone                                       │
│     email                                       │
│     is_active                                   │
│     created_at                                  │
└─────────────────────────────────────────────────┘


      ┌──────────────────┐
      │     AGENTS       │ (from above)
      └─────┬────────────┘
            │
            │ 1:N (owner)
            │
            ▼
┌────────────────────────────────────┐
│          PROPERTIES                │
├────────────────────────────────────┤
│ PK: id                             │
│ FK: agent_id                       │
│     slug (UNIQUE)                  │
│     title                          │
│     description (TEXT)             │
│     type (ENUM)                    │
│     listing_type (ENUM)            │
│     price (DECIMAL)                │
│     price_per_sqm (DECIMAL)        │
│     land_area (DECIMAL)            │
│     building_area (DECIMAL)        │
│     bedrooms (INT)                 │
│     bathrooms (INT)                │
│     address (TEXT)                 │
│     city                           │
│     province                       │
│     latitude (DECIMAL)             │
│     longitude (DECIMAL)            │
│     certificate_type               │
│     status (ENUM)                  │
│     approval_status (ENUM)         │
│     submitted_at (DATETIME)        │
│     reviewed_by (user_id)          │
│     reviewed_at (DATETIME)         │
│     revision_notes (TEXT)          │
│     is_featured (BOOLEAN)          │
│     is_public (BOOLEAN)            │
│     published_at (DATETIME)        │
│     views_count (INT)              │
│     created_at                     │
│     deleted_at (DATETIME)          │
└─────┬──────────────────────────────┘
      │
      │ 1:N
      │
      ▼
┌────────────────────────────┐
│    PROPERTY_PHOTOS         │
├────────────────────────────┤
│ PK: id                     │
│ FK: property_id            │
│     photo_url              │
│     order_number           │
│     is_cover (BOOLEAN)     │
│     created_at             │
└────────────────────────────┘

      │ (from properties)
      │ 1:N
      ▼
┌────────────────────────────┐
│    PROPERTY_LINKS          │
├────────────────────────────┤
│ PK: id                     │
│ FK: property_id            │
│ FK: created_by (user_id)   │
│     token (UNIQUE)         │
│     expires_at (DATETIME)  │
│     is_used (BOOLEAN)      │
│     access_count (INT)     │
│     created_at             │
└────────────────────────────┘

      │ (from property_links)
      │ 1:N
      ▼
┌────────────────────────────┐
│   PROPERTY_VISITORS        │
├────────────────────────────┤
│ PK: id                     │
│ FK: property_link_id       │
│ FK: property_id            │
│     visitor_name           │
│     visitor_email          │
│     visitor_phone          │
│     visitor_whatsapp       │
│     interest_level (ENUM)  │
│     message (TEXT)         │
│     visited_at (DATETIME)  │
│     ip_address             │
│     created_at             │
└────────────────────────────┘


┌────────────────────────────────────┐
│          PROPERTIES                │ (from above)
└─────┬──────────────────────────────┘
      │
      │ 1:1 (per transaction)
      │
      ▼
┌────────────────────────────────────────────┐
│              TRANSACTIONS                  │
├────────────────────────────────────────────┤
│ PK: id                                     │
│ FK: property_id                            │
│ FK: agent_owner_id (→ agents.id)           │
│ FK: agent_buyer_id (→ agents.id, NULLABLE) │
│     buyer_name                             │
│     buyer_phone                            │
│     buyer_email                            │
│     transaction_type (ENUM)                │
│     final_price (DECIMAL)                  │
│     commission_percentage (DECIMAL)        │
│     transaction_date (DATE)                │
│     status (ENUM)                          │
│     notes (TEXT)                           │
│     created_at                             │
└─────┬──────────────────────────────────────┘
      │
      │ 1:N
      │
      ▼
┌────────────────────────────────────────────┐
│              COMMISSIONS                   │
├────────────────────────────────────────────┤
│ PK: id                                     │
│ FK: transaction_id                         │
│ FK: agent_id (NULLABLE)                    │
│ FK: office_id (NULLABLE)                   │
│     amount (DECIMAL)                       │
│     percentage (DECIMAL)                   │
│     type (ENUM)                            │
│     status (ENUM)                          │
│     paid_date (DATE)                       │
│     payment_method                         │
│     notes (TEXT)                           │
│     created_at                             │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│              ACTIVITY_LOG                  │
├────────────────────────────────────────────┤
│ PK: id                                     │
│ FK: causer_id (user_id)                    │
│     log_name, description                  │
│     subject_type, subject_id               │
│     properties (JSON)                      │
│     created_at                             │
└────────────────────────────────────────────┘
```

---

## 3. Detailed Table Schemas

### 3.1 Authentication & Users

#### Table: `users`
**Purpose:** Store all user accounts (Admin Master, Admin Kantor, Agen, Buyer)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| `name` | VARCHAR(255) | NOT NULL | Full name |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Login email |
| `email_verified_at` | TIMESTAMP | NULLABLE | Email verification time |
| `password` | VARCHAR(255) | NOT NULL | Hashed password (bcrypt) |
| `role` | ENUM | NOT NULL | admin_master, admin_kantor, agent, buyer |
| `phone` | VARCHAR(20) | NULLABLE | Phone number |
| `avatar` | VARCHAR(255) | NULLABLE | Avatar image path |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active status |
| `remember_token` | VARCHAR(100) | NULLABLE | Remember me token |
| `created_at` | TIMESTAMP | DEFAULT NOW | Record creation time |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last update time |

**Indexes:**
- `PRIMARY KEY (id)`
- `UNIQUE KEY unique_email (email)`
- `INDEX idx_role (role)`
- `INDEX idx_is_active (is_active)`

**Relationships:**
- `hasOne(Agent)` - untuk user dengan role agent
- `belongsToMany(Office)` - via office_admins untuk admin kantor

---

#### Table: `password_reset_tokens`
**Purpose:** Store password reset tokens (Laravel default)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `email` | VARCHAR(255) | PK | Email address |
| `token` | VARCHAR(255) | NOT NULL | Reset token |
| `created_at` | TIMESTAMP | NULLABLE | Token creation time |

---

#### Table: `sessions`
**Purpose:** Store user sessions (Laravel default)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | VARCHAR(255) | PK | Session ID |
| `user_id` | BIGINT UNSIGNED | NULLABLE, INDEX | User ID |
| `ip_address` | VARCHAR(45) | NULLABLE | IP address |
| `user_agent` | TEXT | NULLABLE | User agent |
| `payload` | LONGTEXT | NOT NULL | Session data |
| `last_activity` | INT | INDEX | Last activity timestamp |

---

### 3.2 Organization Structure

#### Table: `offices`
**Purpose:** Store office/branch information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| `name` | VARCHAR(255) | NOT NULL | Office name |
| `address` | TEXT | NULLABLE | Full address |
| `phone` | VARCHAR(20) | NULLABLE | Office phone |
| `email` | VARCHAR(255) | NULLABLE | Office email |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active status |
| `created_at` | TIMESTAMP | DEFAULT NOW | Record creation |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last update |

**Indexes:**
- `PRIMARY KEY (id)`
- `INDEX idx_is_active (is_active)`

**Relationships:**
- `hasMany(Agent)` - satu kantor punya banyak agen
- `belongsToMany(User)` - via office_admins
- `hasMany(Commission)` - komisi kantor

---

#### Table: `office_admins`
**Purpose:** Pivot table untuk assign Admin Kantor ke Office

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| `user_id` | BIGINT UNSIGNED | FK → users.id | Admin Kantor user ID |
| `office_id` | BIGINT UNSIGNED | FK → offices.id | Office ID |
| `created_at` | TIMESTAMP | DEFAULT NOW | Assignment time |

**Indexes:**
- `PRIMARY KEY (id)`
- `UNIQUE KEY unique_user_office (user_id, office_id)`
- `INDEX idx_user (user_id)`
- `INDEX idx_office (office_id)`

**Foreign Keys:**
- `FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`
- `FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE`

---

#### Table: `agents`
**Purpose:** Store agent profiles (linked to users table)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| `user_id` | BIGINT UNSIGNED | UNIQUE, FK → users.id | User account |
| `office_id` | BIGINT UNSIGNED | FK → offices.id | Office affiliation |
| `phone` | VARCHAR(20) | NULLABLE | Contact phone |
| `whatsapp` | VARCHAR(20) | NULLABLE | WhatsApp number |
| `bio` | TEXT | NULLABLE | Agent bio/description |
| `status` | ENUM | DEFAULT 'active' | active, inactive |
| `created_at` | TIMESTAMP | DEFAULT NOW | Record creation |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last update |

**Indexes:**
- `PRIMARY KEY (id)`
- `UNIQUE KEY unique_user (user_id)`
- `INDEX idx_office (office_id)`
- `INDEX idx_status (status)`

**Foreign Keys:**
- `FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`
- `FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE RESTRICT`

**Relationships:**
- `belongsTo(User)` - agent punya user account
- `belongsTo(Office)` - agent belong to satu kantor
- `hasMany(Property)` - agent punya banyak listing
- `hasMany(Transaction as owner)` - transaksi sebagai pemilik
- `hasMany(Transaction as buyer)` - transaksi sebagai pembawa buyer
- `hasMany(Commission)` - komisi agen

---

### 3.3 Property Management

#### Table: `properties`
**Purpose:** Store property listings

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| `agent_id` | BIGINT UNSIGNED | FK → agents.id | Property owner (agent) |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | URL-friendly slug |
| `title` | VARCHAR(255) | NOT NULL | Property title |
| `description` | TEXT | NULLABLE | Full description |
| `type` | ENUM | NOT NULL | house, apartment, land, commercial |
| `listing_type` | ENUM | NOT NULL | sale, rent, both |
| `price` | DECIMAL(15,2) | NOT NULL | Listing price (IDR) |
| `price_per_sqm` | DECIMAL(15,2) | NULLABLE | Price per m² |
| `land_area` | DECIMAL(10,2) | NULLABLE | Land area (m²) |
| `building_area` | DECIMAL(10,2) | NULLABLE | Building area (m²) |
| `bedrooms` | INT UNSIGNED | NULLABLE | Number of bedrooms |
| `bathrooms` | INT UNSIGNED | NULLABLE | Number of bathrooms |
| `address` | TEXT | NULLABLE | Full address |
| `city` | VARCHAR(100) | NULLABLE | City/Kabupaten |
| `province` | VARCHAR(100) | NULLABLE | Province |
| `latitude` | DECIMAL(10,8) | NULLABLE | GPS latitude |
| `longitude` | DECIMAL(11,8) | NULLABLE | GPS longitude |
| `certificate_type` | VARCHAR(50) | NULLABLE | SHM, HGB, dll |
| `status` | ENUM | DEFAULT 'available' | available, pending, sold, rented |
| `approval_status` | ENUM | DEFAULT 'draft' | draft, pending, published, declined, need_revision |
| `submitted_at` | TIMESTAMP | NULLABLE | When agent submitted for review |
| `reviewed_by` | BIGINT UNSIGNED | NULLABLE | FK to users (Admin Kantor) |
| `reviewed_at` | TIMESTAMP | NULLABLE | When admin reviewed |
| `revision_notes` | TEXT | NULLABLE | Notes from admin for revision |
| `is_featured` | BOOLEAN | DEFAULT FALSE | Featured listing |
| `is_public` | BOOLEAN | DEFAULT TRUE | Show in public marketplace |
| `published_at` | TIMESTAMP | NULLABLE | Publication timestamp |
| `views_count` | INT UNSIGNED | DEFAULT 0 | View counter |
| `created_at` | TIMESTAMP | DEFAULT NOW | Record creation |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last update |
| `deleted_at` | TIMESTAMP | NULLABLE | Soft delete timestamp |

**Indexes:**
- `PRIMARY KEY (id)`
- `UNIQUE KEY unique_slug (slug)`
- `INDEX idx_agent (agent_id)`
- `INDEX idx_type (type)`
- `INDEX idx_listing_type (listing_type)`
- `INDEX idx_status (status)`
- `INDEX idx_approval_status (approval_status)`
- `INDEX idx_reviewed_by (reviewed_by)`
- `INDEX idx_city (city)`
- `INDEX idx_price (price)`
- `INDEX idx_is_public (is_public)`
- `INDEX idx_published_at (published_at)`
- `INDEX idx_created_at (created_at)`
- `INDEX idx_deleted_at (deleted_at)`
- `FULLTEXT idx_search (title, description, address)`

**Foreign Keys:**
- `FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE RESTRICT`

**Relationships:**
- `belongsTo(Agent)` - property dimiliki agent
- `hasMany(PropertyPhoto)` - property punya banyak foto
- `hasMany(PropertyLink)` - property bisa punya banyak private links
- `hasOne(Transaction)` - property punya max 1 transaksi

**Soft Delete:**
- Uses Laravel's `SoftDeletes` trait
- Deleted properties tidak muncul di query default
- Admin Master bisa restore jika diperlukan

---

#### Table: `property_photos`
**Purpose:** Store property photos/images

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| `property_id` | BIGINT UNSIGNED | FK → properties.id | Property reference |
| `photo_url` | VARCHAR(255) | NOT NULL | File path/URL |
| `order_number` | INT UNSIGNED | DEFAULT 0 | Display order |
| `is_cover` | BOOLEAN | DEFAULT FALSE | Cover image flag |
| `created_at` | TIMESTAMP | DEFAULT NOW | Upload time |

**Indexes:**
- `PRIMARY KEY (id)`
- `INDEX idx_property (property_id)`
- `INDEX idx_order (order_number)`

**Foreign Keys:**
- `FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE`

**Relationships:**
- `belongsTo(Property)` - foto belong to property

---

#### Table: `property_links`
**Purpose:** Store tokenized private links for exclusive property viewing

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| `property_id` | BIGINT UNSIGNED | FK → properties.id | Property reference |
| `created_by` | BIGINT UNSIGNED | FK → users.id | User who created the link |
| `token` | VARCHAR(64) | UNIQUE, NOT NULL | Random access token |
| `expires_at` | TIMESTAMP | NOT NULL | Link expiration time |
| `is_used` | BOOLEAN | DEFAULT FALSE | Single-use flag |
| `accessed_at` | TIMESTAMP | NULLABLE | First access timestamp |
| `access_count` | INT UNSIGNED | DEFAULT 0 | Number of times accessed |
| `created_at` | TIMESTAMP | DEFAULT NOW | Link creation time |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last update |

**Indexes:**
- `PRIMARY KEY (id)`
- `UNIQUE KEY unique_token (token)`
- `INDEX idx_property (property_id)`
- `INDEX idx_created_by (created_by)`
- `INDEX idx_expires_at (expires_at)`

**Foreign Keys:**
- `FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE`
- `FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL`

**Relationships:**
- `belongsTo(Property)` - link untuk property tertentu
- `belongsTo(User as creator)` - user yang generate link
- `hasMany(PropertyVisitor)` - link bisa punya banyak visitor

**Business Logic:**
```php
// Check if link is valid
public function isValid(): bool {
    return $this->expires_at > now() 
        && (!$this->is_used || $this->access_count == 0);
}

// Generate random token
public static function generateToken(): string {
    return Str::random(64);
}
```

---

#### Table: `property_visitors`
**Purpose:** Store visitor information from private link access (lead capture)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| `property_link_id` | BIGINT UNSIGNED | FK → property_links.id | Link yang diakses |
| `property_id` | BIGINT UNSIGNED | FK → properties.id | Property reference (denormalized) |
| `visitor_name` | VARCHAR(255) | NOT NULL | Visitor full name |
| `visitor_email` | VARCHAR(255) | NOT NULL | Visitor email |
| `visitor_phone` | VARCHAR(20) | NULLABLE | Visitor phone |
| `visitor_whatsapp` | VARCHAR(20) | NULLABLE | WhatsApp number |
| `interest_level` | ENUM | DEFAULT 'medium' | low, medium, high, very_high |
| `message` | TEXT | NULLABLE | Visitor's message/notes |
| `visited_at` | TIMESTAMP | DEFAULT NOW | When visitor accessed |
| `ip_address` | VARCHAR(45) | NULLABLE | Visitor IP (IPv4/IPv6) |
| `user_agent` | TEXT | NULLABLE | Browser user agent |
| `created_at` | TIMESTAMP | DEFAULT NOW | Record creation |

**Indexes:**
- `PRIMARY KEY (id)`
- `INDEX idx_property_link (property_link_id)`
- `INDEX idx_property (property_id)`
- `INDEX idx_visitor_email (visitor_email)`
- `INDEX idx_visited_at (visited_at)`
- `INDEX idx_interest_level (interest_level)`

**Foreign Keys:**
- `FOREIGN KEY (property_link_id) REFERENCES property_links(id) ON DELETE CASCADE`
- `FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE`

**Relationships:**
- `belongsTo(PropertyLink)` - visitor dari link tertentu
- `belongsTo(Property)` - visitor tertarik ke property tertentu

**Business Logic:**
```php
// Auto-notify agent when high interest visitor
PropertyVisitor::created(function ($visitor) {
    if (in_array($visitor->interest_level, ['high', 'very_high'])) {
        $visitor->property->agent->notify(
            new HighInterestLeadNotification($visitor)
        );
    }
});
```

---

### 3.4 Transactions & Commissions

#### Table: `transactions`
**Purpose:** Store property transactions (sale/rent)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| `property_id` | BIGINT UNSIGNED | FK → properties.id | Property sold/rented |
| `agent_owner_id` | BIGINT UNSIGNED | FK → agents.id | Property owner agent |
| `agent_buyer_id` | BIGINT UNSIGNED | NULLABLE, FK → agents.id | Buyer's agent (optional) |
| `buyer_name` | VARCHAR(255) | NOT NULL | Buyer full name |
| `buyer_phone` | VARCHAR(20) | NULLABLE | Buyer contact |
| `buyer_email` | VARCHAR(255) | NULLABLE | Buyer email |
| `transaction_type` | ENUM | NOT NULL | sale, rent |
| `final_price` | DECIMAL(15,2) | NOT NULL | Closing price (IDR) |
| `commission_percentage` | DECIMAL(5,2) | DEFAULT 2.00 | Commission % (e.g., 2%) |
| `transaction_date` | DATE | NOT NULL | Transaction date |
| `status` | ENUM | DEFAULT 'completed' | pending, completed, cancelled |
| `notes` | TEXT | NULLABLE | Additional notes |
| `created_at` | TIMESTAMP | DEFAULT NOW | Record creation |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last update |

**Indexes:**
- `PRIMARY KEY (id)`
- `INDEX idx_property (property_id)`
- `INDEX idx_agent_owner (agent_owner_id)`
- `INDEX idx_agent_buyer (agent_buyer_id)`
- `INDEX idx_transaction_date (transaction_date)`
- `INDEX idx_status (status)`

**Foreign Keys:**
- `FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE RESTRICT`
- `FOREIGN KEY (agent_owner_id) REFERENCES agents(id) ON DELETE RESTRICT`
- `FOREIGN KEY (agent_buyer_id) REFERENCES agents(id) ON DELETE RESTRICT`

**Relationships:**
- `belongsTo(Property)` - transaction untuk property tertentu
- `belongsTo(Agent as agentOwner)` - agen pemilik
- `belongsTo(Agent as agentBuyer)` - agen pembawa buyer (optional)
- `hasMany(Commission)` - transaction generate multiple commissions

**Business Logic:**
```php
// Auto-update property status when transaction created
Transaction::creating(function ($transaction) {
    $property = $transaction->property;
    
    if ($transaction->transaction_type === 'sale') {
        $property->status = 'sold';
    } else {
        $property->status = 'rented';
    }
    
    $property->save();
});
```

---

#### Table: `commissions`
**Purpose:** Store commission records for agents and offices

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| `transaction_id` | BIGINT UNSIGNED | FK → transactions.id | Related transaction |
| `agent_id` | BIGINT UNSIGNED | NULLABLE, FK → agents.id | Agent (if applicable) |
| `office_id` | BIGINT UNSIGNED | NULLABLE, FK → offices.id | Office (if applicable) |
| `amount` | DECIMAL(15,2) | NOT NULL | Commission amount (IDR) |
| `percentage` | DECIMAL(5,2) | NOT NULL | Percentage from total |
| `type` | ENUM | NOT NULL | agent_owner, agent_buyer, office |
| `status` | ENUM | DEFAULT 'pending' | pending, paid, cancelled |
| `paid_date` | DATE | NULLABLE | Payment date |
| `payment_method` | VARCHAR(50) | NULLABLE | Transfer, Cash, etc |
| `notes` | TEXT | NULLABLE | Payment notes |
| `created_at` | TIMESTAMP | DEFAULT NOW | Record creation |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last update |

**Indexes:**
- `PRIMARY KEY (id)`
- `INDEX idx_transaction (transaction_id)`
- `INDEX idx_agent (agent_id)`
- `INDEX idx_office (office_id)`
- `INDEX idx_status (status)`
- `INDEX idx_paid_date (paid_date)`
- `INDEX idx_type (type)`

**Foreign Keys:**
- `FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE`
- `FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE RESTRICT`
- `FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE RESTRICT`

**Relationships:**
- `belongsTo(Transaction)` - commission dari transaction
- `belongsTo(Agent)` - agent commission
- `belongsTo(Office)` - office commission

**Business Logic:**
```php
// Auto-generate commissions when transaction created
Transaction::created(function ($transaction) {
    $commissions = CommissionService::calculate($transaction);
    
    foreach ($commissions as $commission) {
        Commission::create([
            'transaction_id' => $transaction->id,
            'agent_id' => $commission['agent_id'] ?? null,
            'office_id' => $commission['office_id'] ?? null,
            'amount' => $commission['amount'],
            'percentage' => $commission['percentage'],
            'type' => $commission['type'],
            'status' => 'pending',
        ]);
    }
});
```

---

## 4. Enum Values

### 4.1 user.role
```php
enum UserRole: string {
    case ADMIN_MASTER = 'admin_master';
    case ADMIN_KANTOR = 'admin_kantor';
    case AGENT = 'agent';
    case BUYER = 'buyer';
}
```

### 4.2 property.type
```php
enum PropertyType: string {
    case HOUSE = 'house';         // Rumah
    case APARTMENT = 'apartment';  // Apartemen
    case LAND = 'land';            // Tanah
    case COMMERCIAL = 'commercial'; // Komersial
}
```

### 4.3 property.listing_type
```php
enum ListingType: string {
    case SALE = 'sale';  // Dijual
    case RENT = 'rent';  // Disewa
    case BOTH = 'both';  // Dijual & Disewa
}
```

### 4.4 property.status
```php
enum PropertyStatus: string {
    case AVAILABLE = 'available'; // Tersedia
    case PENDING = 'pending';     // Dalam nego
    case SOLD = 'sold';           // Terjual
    case RENTED = 'rented';       // Tersewa
}
```

### 4.5 property.approval_status
```php
enum PropertyApprovalStatus: string {
    case DRAFT = 'draft';                   // Belum disubmit, agent masih edit
    case PENDING = 'pending';               // Sudah disubmit, menunggu review
    case PUBLISHED = 'published';           // Approved, bisa dilihat publik
    case DECLINED = 'declined';             // Rejected permanently
    case NEED_REVISION = 'need_revision';   // Perlu diperbaiki agent
}
```

**Business Rules:**
- DRAFT → agent submit → PENDING
- PENDING → admin approve → PUBLISHED
- PENDING → admin decline → DECLINED  
- PENDING → admin request revision → NEED_REVISION
- NEED_REVISION → agent perbaiki & resubmit → PENDING
- Only PUBLISHED properties dapat dilihat di public marketplace
- Property dengan is_public=false tetap bisa generate private link

### 4.6 property_visitor.interest_level
```php
enum VisitorInterestLevel: string {
    case LOW = 'low';               // Hanya lihat-lihat
    case MEDIUM = 'medium';         // Cukup tertarik
    case HIGH = 'high';             // Sangat tertarik
    case VERY_HIGH = 'very_high';   // Siap beli/nego
}
```

**Business Logic:**
- Agent akan dapat notifikasi untuk HIGH dan VERY_HIGH interest
- Visitor dengan VERY_HIGH prioritas untuk di-follow up

### 4.7 transaction.transaction_type
```php
enum TransactionType: string {
    case SALE = 'sale'; // Jual
    case RENT = 'rent'; // Sewa
}
```

### 4.8 transaction.status
```php
enum TransactionStatus: string {
    case PENDING = 'pending';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';
}
```

### 4.9 commission.type
```php
enum CommissionType: string {
    case AGENT_OWNER = 'agent_owner';
    case AGENT_BUYER = 'agent_buyer';
    case OFFICE = 'office';
}
```

### 4.10 commission.status
```php
enum CommissionStatus: string {
    case PENDING = 'pending';
    case PAID = 'paid';
    case CANCELLED = 'cancelled';
}
```

---

## 4.11 Additional Tables

### Table: `activity_log`
**Purpose:** Store audit trail for all important actions (using spatie/laravel-activitylog)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary key |
| `log_name` | VARCHAR(255) | NULLABLE | Log category |
| `description` | TEXT | NOT NULL | Action description |
| `subject_type` | VARCHAR(255) | NULLABLE | Model class name |
| `subject_id` | BIGINT UNSIGNED | NULLABLE | Model ID |
| `causer_type` | VARCHAR(255) | NULLABLE | User model class |
| `causer_id` | BIGINT UNSIGNED | NULLABLE | User ID who caused |
| `properties` | JSON | NULLABLE | Old & new values |
| `created_at` | TIMESTAMP | DEFAULT NOW | Action timestamp |

**Indexes:**
- `PRIMARY KEY (id)`
- `INDEX idx_subject (subject_type, subject_id)`
- `INDEX idx_causer (causer_type, causer_id)`
- `INDEX idx_log_name (log_name)`
- `INDEX idx_created_at (created_at)`

**Use Cases:**
- Track siapa yang create/update/delete properti
- Track perubahan komisi
- Track perubahan harga jual
- Track approval/rejection
- Track login/logout activity

**Example Log:**
```php
// Automatic logging with spatie/laravel-activitylog
activity()
    ->performedOn($property)
    ->causedBy($user)
    ->withProperties([
        'old' => ['price' => 1000000000],
        'new' => ['price' => 900000000]
    ])
    ->log('Property price updated');
```

---

## 5. Database Migrations (Laravel)

### 5.1 Migration Order
```
1. 2025_11_01_000000_create_users_table.php
2. 2025_11_01_000001_create_password_reset_tokens_table.php
3. 2025_11_01_000002_create_sessions_table.php
4. 2025_11_01_000003_create_offices_table.php
5. 2025_11_01_000004_create_agents_table.php
6. 2025_11_01_000005_create_office_admins_table.php
7. 2025_11_01_000006_create_properties_table.php
8. 2025_11_01_000007_create_property_photos_table.php
9. 2025_11_01_000008_create_property_links_table.php
10. 2025_11_01_000009_create_transactions_table.php
11. 2025_11_01_000010_create_commissions_table.php
12. 2025_11_01_000011_create_activity_log_table.php
```

**Note:** `activity_log` table will be auto-created by spatie/laravel-activitylog package via:
```bash
php artisan vendor:publish --provider="Spatie\Activitylog\ActivitylogServiceProvider" --tag="activitylog-migrations"
php artisan migrate
```

---

## 6. Sample Data (Seeders)

### 6.1 Admin Master (Default)
```php
User::create([
    'name' => 'Super Admin',
    'email' => 'admin@hendraprop.com',
    'password' => Hash::make('password'),
    'role' => 'admin_master',
    'is_active' => true,
]);
```

### 6.2 Sample Offices
```php
Office::create(['name' => 'Hendra Prop 1', 'address' => 'Jakarta', 'phone' => '021-xxx']);
Office::create(['name' => 'Hendra Prop 2', 'address' => 'Bandung', 'phone' => '022-xxx']);
Office::create(['name' => 'Hendra Prop 3', 'address' => 'Surabaya', 'phone' => '031-xxx']);
```

### 6.3 Sample Agents
```php
// Create user first
$user = User::create([
    'name' => 'Agent 1',
    'email' => 'agent1@hendraprop.com',
    'password' => Hash::make('password'),
    'role' => 'agent',
]);

// Create agent profile
Agent::create([
    'user_id' => $user->id,
    'office_id' => 1,
    'phone' => '08123456789',
    'whatsapp' => '08123456789',
    'status' => 'active',
]);
```

---

## 7. Query Examples

### 7.1 Get all properties with agent info
```sql
SELECT 
    p.id, p.title, p.price, p.status,
    a.id as agent_id,
    u.name as agent_name,
    o.name as office_name
FROM properties p
JOIN agents a ON p.agent_id = a.id
JOIN users u ON a.user_id = u.id
JOIN offices o ON a.office_id = o.id
WHERE p.status = 'available'
ORDER BY p.created_at DESC
LIMIT 20;
```

### 7.2 Get agent performance (omzet & komisi)
```sql
SELECT 
    a.id,
    u.name as agent_name,
    COUNT(DISTINCT p.id) as total_listings,
    COUNT(DISTINCT t.id) as total_transactions,
    SUM(t.final_price) as total_omzet,
    SUM(c.amount) as total_commission,
    SUM(CASE WHEN c.status = 'pending' THEN c.amount ELSE 0 END) as commission_pending,
    SUM(CASE WHEN c.status = 'paid' THEN c.amount ELSE 0 END) as commission_paid
FROM agents a
JOIN users u ON a.user_id = u.id
LEFT JOIN properties p ON p.agent_id = a.id
LEFT JOIN transactions t ON t.agent_owner_id = a.id OR t.agent_buyer_id = a.id
LEFT JOIN commissions c ON c.agent_id = a.id
WHERE a.id = ?
GROUP BY a.id, u.name;
```

### 7.3 Get office performance
```sql
SELECT 
    o.id,
    o.name as office_name,
    COUNT(DISTINCT a.id) as total_agents,
    COUNT(DISTINCT p.id) as total_listings,
    COUNT(DISTINCT t.id) as total_transactions,
    SUM(t.final_price) as total_omzet,
    SUM(c.amount) as office_commission
FROM offices o
LEFT JOIN agents a ON a.office_id = o.id
LEFT JOIN properties p ON p.agent_id = a.id
LEFT JOIN transactions t ON t.property_id = p.id
LEFT JOIN commissions c ON c.office_id = o.id
WHERE o.id = ?
GROUP BY o.id, o.name;
```

---

## 8. Performance Optimization

### 8.1 Index Strategy
- **Primary Keys:** All tables have auto-increment BIGINT primary key
- **Foreign Keys:** All FKs are indexed automatically
- **Search Columns:** city, type, status, price (for filtering)
- **FULLTEXT:** title, description, address (for search)
- **Composite Index:** (agent_id, status) pada properties

### 8.2 Query Optimization
```php
// ❌ BAD: N+1 problem
$properties = Property::all();
foreach ($properties as $property) {
    echo $property->agent->user->name; // N queries
}

// ✅ GOOD: Eager loading
$properties = Property::with('agent.user', 'photos')->get(); // 1 query
```

### 8.3 Caching Strategy
```php
// Cache expensive queries
$topProperties = Cache::remember('properties:featured', 3600, function() {
    return Property::where('is_featured', true)
        ->with('agent.user', 'photos')
        ->take(10)
        ->get();
});
```

---

## 9. Backup Strategy

### 9.1 Daily Backup
```bash
#!/bin/bash
# Daily backup script
mysqldump -u root -p hendra_prop > /backup/hendra_prop_$(date +%Y%m%d).sql
```

### 9.2 Retention Policy
- Daily backups: Keep for 7 days
- Weekly backups: Keep for 1 month
- Monthly backups: Keep for 1 year

---

**Prepared by:** AI Project Analysis System  
**Date:** 31 Oktober 2025  
**Version:** 1.0.0

