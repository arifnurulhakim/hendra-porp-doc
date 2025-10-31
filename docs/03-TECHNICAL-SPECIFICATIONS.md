# 🔧 Technical Specifications - Hendra Prop

**Dokumen Technical Specifications**  
Proyek: Hendra Prop - Sistem Manajemen Properti  
Tanggal: 31 Oktober 2025  
Versi: 1.0.0

---

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USERS                                 │
│  Admin Master │ Admin Kantor │ Agen │ Buyer (Public)        │
└──────────────┬──────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                         │
│  ┌──────────────────┐         ┌─────────────────────┐       │
│  │  Admin Panel     │         │  Public Website     │       │
│  │  (Filament 3)    │         │  (Blade + Alpine)   │       │
│  └──────────────────┘         └─────────────────────┘       │
└──────────────┬──────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                          │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ Auth       │  │ Property     │  │ Transaction  │        │
│  │ Module     │  │ Module       │  │ Module       │        │
│  └────────────┘  └──────────────┘  └──────────────┘        │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ User       │  │ Commission   │  │ Dashboard    │        │
│  │ Module     │  │ Module       │  │ Module       │        │
│  └────────────┘  └──────────────┘  └──────────────┘        │
└──────────────┬──────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                               │
│  ┌──────────────────┐         ┌─────────────────────┐       │
│  │  MySQL Database  │         │  File Storage       │       │
│  │  (Relational)    │         │  (Local/S3)         │       │
│  └──────────────────┘         └─────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

#### Backend
- **Framework:** Laravel 11.x
- **Language:** PHP 8.2+
- **Admin Panel:** Filament 3.x
- **Authentication:** Laravel Breeze / Fortify
- **Authorization:** Laravel Gates & Policies
- **Queue:** Laravel Queue (database driver for MVP, Redis for production)
- **Cache:** File cache (MVP) → Redis (production)
- **Activity Log:** spatie/laravel-activitylog (audit trail)
- **Notifications:** Laravel Notification (email & database)
- **Scheduler:** Laravel Task Scheduling (cron jobs)
- **Export:** Laravel Excel (maatwebsite/excel) & DomPDF
- **Soft Delete:** Laravel SoftDeletes trait
- **Image Processing:** Intervention/Image

#### Frontend
- **Admin:** Filament 3 (Alpine.js + Livewire)
- **Public Site:** Blade Templates + Alpine.js + Tailwind CSS
- **CSS Framework:** Tailwind CSS 3.x
- **Icons:** Heroicons / Font Awesome

#### Database
- **Primary:** MySQL 8.0+
- **Alternative:** PostgreSQL 15+ (jika preferred)
- **ORM:** Eloquent

#### Storage
- **MVP:** Local storage (public/storage)
- **Production:** AWS S3 / DigitalOcean Spaces / Cloudinary

#### Server & Deployment
- **Web Server:** Caddy (sesuai setup di workspace)
- **Server:** VPS (Ubuntu 22.04 LTS)
- **Process Manager:** Supervisor (untuk queue worker)
- **SSL:** Let's Encrypt (via Caddy auto-https)

#### Development Tools
- **Version Control:** Git + GitHub/GitLab
- **Package Manager:** Composer (PHP), npm (JS)
- **Code Quality:** Laravel Pint, PHPStan
- **Testing:** PHPUnit, Pest (optional)

---

## 2. Application Modules

### 2.1 Authentication Module

**Responsibilities:**
- User login/logout
- Password reset
- Session management
- Remember me functionality

**Technologies:**
- Laravel Breeze (starter kit)
- Laravel Sanctum (API auth for future mobile)

**Database Tables:**
- `users`
- `password_reset_tokens`
- `sessions`

---

### 2.2 Authorization Module

**Responsibilities:**
- Role-based access control (RBAC)
- Permission checking
- Policy enforcement

**Implementation:**
```php
// Roles
enum UserRole: string {
    case ADMIN_MASTER = 'admin_master';
    case ADMIN_KANTOR = 'admin_kantor';
    case AGENT = 'agent';
    case BUYER = 'buyer';
}

// Gates
Gate::define('manage-all-offices', function (User $user) {
    return $user->role === UserRole::ADMIN_MASTER;
});

// Policies
class PropertyPolicy {
    public function update(User $user, Property $property) {
        return $user->role === UserRole::ADMIN_MASTER
            || ($user->role === UserRole::ADMIN_KANTOR && $user->manages($property->agent->office))
            || ($user->role === UserRole::AGENT && $property->agent_id === $user->agent->id);
    }
}
```

---

### 2.3 User Management Module

**Responsibilities:**
- CRUD Users
- CRUD Offices
- CRUD Agents
- Assign relationships

**Models:**
- `User` (polymorphic: bisa Admin Master, Admin Kantor, Agent, Buyer)
- `Office`
- `Agent` (belongsTo User, belongsTo Office)
- `OfficeAdmin` (pivot: admin_kantor yang manage office)

**Key Relationships:**
```php
// User Model
class User extends Authenticatable {
    public function agent() {
        return $this->hasOne(Agent::class);
    }
    
    public function managedOffices() {
        return $this->belongsToMany(Office::class, 'office_admins');
    }
}

// Office Model
class Office extends Model {
    public function agents() {
        return $this->hasMany(Agent::class);
    }
    
    public function admins() {
        return $this->belongsToMany(User::class, 'office_admins');
    }
}

// Agent Model
class Agent extends Model {
    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function office() {
        return $this->belongsTo(Office::class);
    }
    
    public function properties() {
        return $this->hasMany(Property::class, 'agent_id');
    }
}
```

---

### 2.4 Property Management Module

**Responsibilities:**
- CRUD Properties
- Photo upload & management
- Status management
- Public listing

**Models:**
- `Property`
- `PropertyPhoto`
- `PropertyType` (enum: Rumah, Apartemen, Tanah, Komersial)
- `PropertyStatus` (enum: Available, Pending, Sold, Rented)

**Key Features:**
- Image upload dengan validation (max 10, max 5MB, JPG/PNG only)
- Image optimization (resize, compress)
- Slug generation untuk SEO-friendly URL
- Soft delete

**Database Tables:**
- `properties`
- `property_photos`

---

### 2.5 Transaction Module

**Responsibilities:**
- Record transactions
- Link property, agents, buyer
- Track transaction status

**Models:**
- `Transaction`
- `TransactionType` (enum: Sale, Rent)
- `TransactionStatus` (enum: Pending, Completed, Cancelled)

**Key Relationships:**
```php
class Transaction extends Model {
    public function property() {
        return $this->belongsTo(Property::class);
    }
    
    public function agentOwner() {
        return $this->belongsTo(Agent::class, 'agent_owner_id');
    }
    
    public function agentBuyer() {
        return $this->belongsTo(Agent::class, 'agent_buyer_id');
    }
    
    public function commissions() {
        return $this->hasMany(Commission::class);
    }
}
```

---

### 2.6 Commission Module

**Responsibilities:**
- Calculate commission
- Split commission (agent vs office)
- Track payment status

**Models:**
- `Commission`
- `CommissionStatus` (enum: Pending, Paid, Cancelled)

**Key Logic:**
```php
class CommissionService {
    public function calculateCommission(Transaction $transaction) {
        $totalCommission = $transaction->final_price * $transaction->commission_percentage / 100;
        
        $commissions = [];
        
        if ($transaction->agentBuyer) {
            // Scenario: 2 agents
            $agentSplit = 0.35; // 35% each
            
            $commissions[] = [
                'agent_id' => $transaction->agentOwner->id,
                'amount' => $totalCommission * $agentSplit,
                'type' => 'agent_owner'
            ];
            
            $commissions[] = [
                'agent_id' => $transaction->agentBuyer->id,
                'amount' => $totalCommission * $agentSplit,
                'type' => 'agent_buyer'
            ];
        } else {
            // Scenario: 1 agent only
            $commissions[] = [
                'agent_id' => $transaction->agentOwner->id,
                'amount' => $totalCommission * 0.70,
                'type' => 'agent_owner'
            ];
        }
        
        // Office commission (always 30%)
        $commissions[] = [
            'office_id' => $transaction->agentOwner->office_id,
            'amount' => $totalCommission * 0.30,
            'type' => 'office'
        ];
        
        return $commissions;
    }
}
```

---

### 2.7 Dashboard Module

**Responsibilities:**
- Aggregate data untuk dashboard
- Generate charts
- Performance metrics

**Implementation:**
- Use Laravel Query Builder untuk aggregate
- Cache hasil query (TTL: 1 hour)
- Real-time update via Livewire

**Key Metrics:**
```php
class DashboardService {
    public function getAgentMetrics(Agent $agent, $dateRange) {
        return [
            'total_listings' => $agent->properties()->active()->count(),
            'total_omzet' => $agent->transactions()->sum('final_price'),
            'total_commission' => $agent->commissions()->sum('amount'),
            'commission_pending' => $agent->commissions()->pending()->sum('amount'),
            'commission_paid' => $agent->commissions()->paid()->sum('amount'),
        ];
    }
}
```

---

### 2.8 Activity Log Module

**Responsibilities:**
- Track all important actions in the system
- Audit trail for compliance
- User activity monitoring

**Package:**
- **spatie/laravel-activitylog** v4.x

**Installation:**
```bash
composer require spatie/activitylog
php artisan vendor:publish --provider="Spatie\Activitylog\ActivitylogServiceProvider" --tag="activitylog-migrations"
php artisan migrate
```

**Implementation:**
```php
// Automatic logging on model events
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Property extends Model {
    use LogsActivity;
    
    public function getActivitylogOptions(): LogOptions {
        return LogOptions::defaults()
            ->logOnly(['price', 'status', 'is_public', 'published_at'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }
}

// Manual logging
activity()
    ->performedOn($property)
    ->causedBy($user)
    ->withProperties(['old' => [...], 'new' => [...]])
    ->log('Property price updated');
```

**Database Tables:**
- `activity_log`

---

### 2.9 Notification Module

**Responsibilities:**
- Send internal notifications (database)
- Send email notifications
- Notification preferences management

**Laravel Notification Channels:**
- **Database:** For in-app notifications
- **Mail:** For email notifications

**Implementation:**
```php
// Create notification
php artisan make:notification PropertyApprovedNotification

// Send notification
$agent->notify(new PropertyApprovedNotification($property));

// Retrieve notifications
$user->notifications; // All
$user->unreadNotifications; // Unread only
$user->markAsRead(); // Mark as read
```

**Database Tables:**
- `notifications` (Laravel default)

**Notification Types:**
1. PropertyApproved
2. PropertySold
3. CommissionPaid
4. PropertyNeedsReview

---

### 2.10 Scheduled Tasks Module

**Responsibilities:**
- Auto-expire private links
- Clean old notifications
- Generate daily reports
- Archive old logs

**Laravel Scheduler:**
```php
// app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    // Expire old property links
    $schedule->command('links:expire')->hourly();
    
    // Clean old notifications (>30 days)
    $schedule->command('notifications:clean')->daily()->at('02:00');
    
    // Cache performance metrics
    $schedule->command('reports:cache')->daily()->at('08:00');
    
    // Archive activity logs (>90 days)
    $schedule->command('logs:archive')->weekly()->sundays()->at('01:00');
}
```

**Cron Entry (Server):**
```bash
* * * * * cd /var/www/hendra-prop && php artisan schedule:run >> /dev/null 2>&1
```

**Monitoring:**
- Log every task execution
- Send alerts on failure
- Track execution time

---

### 2.11 Export Module

**Responsibilities:**
- Export performance reports to Excel
- Export to PDF (optional)
- Generate downloadable reports

**Packages:**
- **maatwebsite/excel** v3.x (Laravel Excel)
- **barryvdh/laravel-dompdf** (optional for PDF)

**Installation:**
```bash
composer require maatwebsite/excel
composer require barryvdh/laravel-dompdf
```

**Implementation:**
```php
// Export to Excel
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PerformanceExport;

return Excel::download(
    new PerformanceExport($dateRange), 
    'performance-report.xlsx'
);

// Export class
class PerformanceExport implements FromCollection {
    public function collection() {
        return Agent::with('transactions')->get();
    }
}
```

---

### 2.12 Private Link Module

**Responsibilities:**
- Generate tokenized private links
- Validate link expiration
- Track link access

**Models:**
- `PropertyLink`

**Implementation:**
```php
class PropertyLink extends Model {
    public function isValid(): bool {
        return $this->expires_at > now() 
            && (!$this->is_used || $this->access_count == 0);
    }
    
    public static function generateForProperty(Property $property, int $days = 7): self {
        return self::create([
            'property_id' => $property->id,
            'token' => Str::random(64),
            'expires_at' => now()->addDays($days),
            'created_by' => auth()->id(),
        ]);
    }
    
    public function recordAccess(): void {
        $this->increment('access_count');
        $this->accessed_at = $this->accessed_at ?? now();
        $this->save();
    }
}
```

**Database Tables:**
- `property_links`

---

## 3. Database Design

### 3.1 Entity Relationship Diagram (ERD)

```
┌─────────────┐
│   USERS     │
├─────────────┤
│ id          │
│ name        │
│ email       │
│ password    │
│ role        │
│ created_at  │
└──────┬──────┘
       │
       │ 1:1 (untuk agent)
       │
       ▼
┌─────────────┐         ┌─────────────┐
│   AGENTS    │ N:1     │   OFFICES   │
├─────────────┤────────▶├─────────────┤
│ id          │         │ id          │
│ user_id     │         │ name        │
│ office_id   │         │ address     │
│ phone       │         │ phone       │
│ status      │         │ email       │
│ created_at  │         │ created_at  │
└──────┬──────┘         └─────────────┘
       │
       │ 1:N
       │
       ▼
┌─────────────────────┐
│    PROPERTIES       │
├─────────────────────┤
│ id                  │
│ agent_id            │
│ title               │
│ description         │
│ type                │
│ listing_type        │◀─────┐
│ price               │      │ 1:1
│ price_per_sqm       │      │
│ land_area           │      │
│ building_area       │      │
│ address             │      │
│ status              │      │
│ created_at          │      │
└──────┬──────────────┘      │
       │                     │
       │ 1:N                 │
       │                     │
       ▼                     │
┌──────────────────┐         │
│ PROPERTY_PHOTOS  │         │
├──────────────────┤         │
│ id               │         │
│ property_id      │         │
│ photo_url        │         │
│ order            │         │
│ is_cover         │         │
└──────────────────┘         │
                             │
                             │
┌────────────────────────────┘
│
│
▼
┌─────────────────────┐
│   TRANSACTIONS      │
├─────────────────────┤
│ id                  │
│ property_id         │
│ agent_owner_id      │
│ agent_buyer_id      │ (nullable)
│ buyer_name          │
│ buyer_phone         │
│ transaction_type    │
│ final_price         │
│ commission_pct      │
│ transaction_date    │
│ status              │
│ notes               │
│ created_at          │
└──────┬──────────────┘
       │
       │ 1:N
       │
       ▼
┌─────────────────────┐
│   COMMISSIONS       │
├─────────────────────┤
│ id                  │
│ transaction_id      │
│ agent_id            │ (nullable)
│ office_id           │ (nullable)
│ amount              │
│ percentage          │
│ type                │ (agent_owner/agent_buyer/office)
│ status              │ (pending/paid/cancelled)
│ paid_date           │
│ notes               │
│ created_at          │
└─────────────────────┘
```

---

### 3.2 Database Tables Detail

#### Table: `users`
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin_master', 'admin_kantor', 'agent', 'buyer') NOT NULL,
    phone VARCHAR(20),
    avatar VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    remember_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table: `offices`
```sql
CREATE TABLE offices (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table: `office_admins` (Pivot)
```sql
CREATE TABLE office_admins (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    office_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_office (user_id, office_id),
    INDEX idx_user (user_id),
    INDEX idx_office (office_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table: `agents`
```sql
CREATE TABLE agents (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    office_id BIGINT UNSIGNED NOT NULL,
    phone VARCHAR(20),
    whatsapp VARCHAR(20),
    bio TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE RESTRICT,
    UNIQUE KEY unique_user (user_id),
    INDEX idx_office (office_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table: `properties`
```sql
CREATE TABLE properties (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    agent_id BIGINT UNSIGNED NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM('house', 'apartment', 'land', 'commercial') NOT NULL,
    listing_type ENUM('sale', 'rent', 'both') NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    price_per_sqm DECIMAL(15, 2),
    land_area DECIMAL(10, 2),
    building_area DECIMAL(10, 2),
    bedrooms INT UNSIGNED,
    bathrooms INT UNSIGNED,
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    certificate_type VARCHAR(50),
    status ENUM('available', 'pending', 'sold', 'rented') DEFAULT 'available',
    is_featured BOOLEAN DEFAULT FALSE,
    views INT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE RESTRICT,
    INDEX idx_agent (agent_id),
    INDEX idx_type (type),
    INDEX idx_listing_type (listing_type),
    INDEX idx_status (status),
    INDEX idx_city (city),
    INDEX idx_price (price),
    FULLTEXT idx_search (title, description, address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table: `property_photos`
```sql
CREATE TABLE property_photos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    order_number INT UNSIGNED DEFAULT 0,
    is_cover BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    INDEX idx_property (property_id),
    INDEX idx_order (order_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table: `transactions`
```sql
CREATE TABLE transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NOT NULL,
    agent_owner_id BIGINT UNSIGNED NOT NULL,
    agent_buyer_id BIGINT UNSIGNED NULL,
    buyer_name VARCHAR(255) NOT NULL,
    buyer_phone VARCHAR(20),
    buyer_email VARCHAR(255),
    transaction_type ENUM('sale', 'rent') NOT NULL,
    final_price DECIMAL(15, 2) NOT NULL,
    commission_percentage DECIMAL(5, 2) DEFAULT 2.00,
    transaction_date DATE NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'completed',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE RESTRICT,
    FOREIGN KEY (agent_owner_id) REFERENCES agents(id) ON DELETE RESTRICT,
    FOREIGN KEY (agent_buyer_id) REFERENCES agents(id) ON DELETE RESTRICT,
    INDEX idx_property (property_id),
    INDEX idx_agent_owner (agent_owner_id),
    INDEX idx_agent_buyer (agent_buyer_id),
    INDEX idx_transaction_date (transaction_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Table: `commissions`
```sql
CREATE TABLE commissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    transaction_id BIGINT UNSIGNED NOT NULL,
    agent_id BIGINT UNSIGNED NULL,
    office_id BIGINT UNSIGNED NULL,
    amount DECIMAL(15, 2) NOT NULL,
    percentage DECIMAL(5, 2) NOT NULL,
    type ENUM('agent_owner', 'agent_buyer', 'office') NOT NULL,
    status ENUM('pending', 'paid', 'cancelled') DEFAULT 'pending',
    paid_date DATE NULL,
    payment_method VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE RESTRICT,
    FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE RESTRICT,
    INDEX idx_transaction (transaction_id),
    INDEX idx_agent (agent_id),
    INDEX idx_office (office_id),
    INDEX idx_status (status),
    INDEX idx_paid_date (paid_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 4. API Specifications

### 4.1 API Endpoints (Internal - For Future Mobile App)

#### Authentication
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
```

#### Properties
```
GET    /api/properties              - List all properties
GET    /api/properties/{id}         - Get property detail
POST   /api/properties              - Create property (agent/admin)
PUT    /api/properties/{id}         - Update property
DELETE /api/properties/{id}         - Delete property
POST   /api/properties/{id}/photos  - Upload photos
```

#### Agents
```
GET    /api/agents                  - List agents
GET    /api/agents/{id}             - Get agent detail
GET    /api/agents/{id}/properties  - Get agent's properties
GET    /api/agents/{id}/performance - Get agent metrics
```

#### Transactions
```
GET    /api/transactions            - List transactions
POST   /api/transactions            - Create transaction
GET    /api/transactions/{id}       - Get transaction detail
```

#### Commissions
```
GET    /api/commissions             - List commissions
PUT    /api/commissions/{id}/pay    - Mark as paid
```

### 4.2 Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Rumah Mewah di Jakarta Selatan",
    "price": 5000000000
  },
  "message": "Property retrieved successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The given data was invalid.",
    "details": {
      "title": ["The title field is required."],
      "price": ["The price must be a number."]
    }
  }
}
```

---

## 5. Security Considerations

### 5.1 Authentication Security
- Password hashing: bcrypt (cost: 12)
- Password policy: min 8 characters, 1 uppercase, 1 number
- Rate limiting: 5 failed attempts → 15 min lockout
- Session timeout: 24 hours
- CSRF protection: enabled (Laravel default)

### 5.2 Authorization Security
- Policy-based authorization for all resources
- Middleware protection pada setiap route
- Row-level security (check ownership)
- Audit trail untuk sensitive actions

### 5.3 Data Security
- SQL injection prevention: Eloquent ORM
- XSS prevention: Blade escaping, CSP headers
- File upload validation: type, size, content check
- Image sanitization: strip EXIF data
- HTTPS enforcement
- Secure headers: HSTS, X-Frame-Options, etc.

### 5.4 Database Security
- Prepared statements (via Eloquent)
- Least privilege principle untuk DB user
- Encrypted connection to database
- Regular backups with encryption

---

## 6. Performance Optimization

### 6.1 Query Optimization
```php
// Eager loading untuk N+1 problem
$properties = Property::with(['agent.user', 'photos'])
    ->paginate(20);

// Select only needed columns
$properties = Property::select(['id', 'title', 'price', 'status'])
    ->get();

// Index semua foreign keys & frequently queried columns
```

### 6.2 Caching Strategy
```php
// Cache listing untuk public page (TTL: 5 menit)
$properties = Cache::remember('properties:public', 300, function() {
    return Property::available()->with('photos')->get();
});

// Cache dashboard metrics (TTL: 1 jam)
$metrics = Cache::remember("agent:{$agentId}:metrics", 3600, function() {
    return DashboardService::getAgentMetrics($agentId);
});
```

### 6.3 Image Optimization
```php
// Resize & compress images
use Intervention\Image\Facades\Image;

Image::make($uploadedFile)
    ->fit(1200, 800)
    ->encode('jpg', 85)
    ->save($path);

// Generate thumbnail
Image::make($uploadedFile)
    ->fit(400, 300)
    ->encode('jpg', 80)
    ->save($thumbnailPath);
```

### 6.4 Database Optimization
- Index pada foreign keys
- Index pada frequently filtered columns (status, type, city)
- FULLTEXT index untuk search
- Query caching
- Connection pooling

---

## 7. Deployment Architecture

### 7.1 Production Environment

```
┌─────────────────────────────────────────┐
│          CLOUDFLARE CDN                 │
│  (DNS, SSL, DDoS Protection, Cache)     │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│          VPS SERVER (Ubuntu 22.04)      │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  CADDY (Web Server + Auto HTTPS)  │ │
│  └────────────┬──────────────────────┘ │
│               │                         │
│               ▼                         │
│  ┌───────────────────────────────────┐ │
│  │  PHP-FPM 8.2 (Laravel 11)         │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  MySQL 8.0                        │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Redis (Cache & Queue)            │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Supervisor (Queue Worker)        │ │
│  └───────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### 7.2 Deployment Steps (CI/CD)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: 8.2
      
      - name: Install dependencies
        run: composer install --no-dev --optimize-autoloader
      
      - name: Run tests
        run: php artisan test
      
      - name: Deploy to server
        run: |
          ssh user@server 'cd /var/www/hendra-prop && git pull'
          ssh user@server 'cd /var/www/hendra-prop && composer install --no-dev'
          ssh user@server 'cd /var/www/hendra-prop && php artisan migrate --force'
          ssh user@server 'cd /var/www/hendra-prop && php artisan optimize'
          ssh user@server 'sudo systemctl reload php8.2-fpm'
```

---

## 8. Monitoring & Logging

### 8.1 Application Monitoring
- **Tool:** Laravel Telescope (development)
- **Tool:** Sentry / Bugsnag (production error tracking)
- **Metrics:** Response time, error rate, queue backlog

### 8.2 Server Monitoring
- **Tool:** UptimeRobot (uptime monitoring)
- **Tool:** New Relic / Datadog (server metrics)
- **Alerts:** Email/Slack notification untuk downtime

### 8.3 Logging
```php
// Laravel Log channels
'channels' => [
    'stack' => [
        'driver' => 'stack',
        'channels' => ['daily', 'slack'],
    ],
    'daily' => [
        'driver' => 'daily',
        'path' => storage_path('logs/laravel.log'),
        'level' => 'debug',
        'days' => 14,
    ],
    'slack' => [
        'driver' => 'slack',
        'url' => env('LOG_SLACK_WEBHOOK_URL'),
        'level' => 'critical',
    ],
];
```

---

## 9. Testing Strategy

### 9.1 Unit Tests
```php
// Test commission calculation
test('commission calculation with two agents', function() {
    $transaction = Transaction::factory()->create([
        'final_price' => 1000000000,
        'commission_percentage' => 2.00,
    ]);
    
    $commissions = CommissionService::calculate($transaction);
    
    expect($commissions)->toHaveCount(3)
        ->and($commissions[0]['amount'])->toBe(7000000) // 35% agen owner
        ->and($commissions[1]['amount'])->toBe(7000000) // 35% agen buyer
        ->and($commissions[2]['amount'])->toBe(6000000); // 30% office
});
```

### 9.2 Feature Tests
```php
// Test property creation
test('agent can create property', function() {
    $agent = User::factory()->agent()->create();
    
    $response = $this->actingAs($agent)->post('/properties', [
        'title' => 'Test Property',
        'price' => 1000000000,
        'type' => 'house',
    ]);
    
    $response->assertCreated()
        ->assertJson(['success' => true]);
    
    $this->assertDatabaseHas('properties', [
        'title' => 'Test Property',
        'agent_id' => $agent->agent->id,
    ]);
});
```

### 9.3 Browser Tests (Dusk)
```php
// Test end-to-end listing flow
test('buyer can view property detail', function() {
    $property = Property::factory()->create();
    
    $this->browse(function (Browser $browser) use ($property) {
        $browser->visit('/properties/' . $property->slug)
            ->assertSee($property->title)
            ->assertSee($property->price)
            ->click('@contact-agent-button')
            ->assertPathIs('/contact');
    });
});
```

---

## 10. Development Workflow

### 10.1 Git Branching Strategy

```
main (production)
  │
  ├── develop (staging)
  │     │
  │     ├── feature/property-management
  │     ├── feature/commission-calculation
  │     ├── feature/dashboard
  │     └── bugfix/photo-upload
  │
  └── hotfix/critical-bug
```

### 10.2 Commit Convention
```
feat: Add property photo upload
fix: Fix commission calculation for two agents
refactor: Refactor DashboardService
docs: Update API documentation
test: Add tests for TransactionService
chore: Update dependencies
```

### 10.3 Code Review Checklist
- [ ] Code follows Laravel best practices
- [ ] All tests passing
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Documentation updated
- [ ] No linter errors

---

**Prepared by:** AI Project Analysis System  
**Date:** 31 Oktober 2025  
**Version:** 1.0.0

