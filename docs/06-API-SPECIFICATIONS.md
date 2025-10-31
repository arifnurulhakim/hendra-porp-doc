# 🔌 API Specifications - Hendra Prop

**Dokumen API Specifications (For Future Mobile App)**  
Proyek: Hendra Prop - Sistem Manajemen Properti  
Tanggal: 31 Oktober 2025  
Versi: 1.0.0

---

## 1. API Overview

### 1.1 Base Information
- **Base URL:** `https://api.hendraprop.com/v1`
- **Protocol:** HTTPS only
- **Format:** JSON
- **Authentication:** Laravel Sanctum (Bearer Token)
- **Rate Limiting:** 60 requests/minute per user
- **Versioning:** URL-based (v1, v2, etc.)

### 1.2 Request Headers
```
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
X-App-Version: 1.0.0 (optional)
```

### 1.3 Response Format

**Success Response (2xx):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Rumah Mewah Jakarta Selatan",
    "price": 5000000000
  },
  "meta": {
    "current_page": 1,
    "total": 45
  },
  "message": "Property retrieved successfully"
}
```

**Error Response (4xx/5xx):**
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

## 2. Authentication Endpoints

### 2.1 Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "agent@hendraprop.com",
  "password": "password123",
  "remember": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "1|abc123def456ghi789...",
    "user": {
      "id": 5,
      "name": "Agent 1",
      "email": "agent@hendraprop.com",
      "role": "agent",
      "avatar": "https://..."
    }
  },
  "message": "Login successful"
}
```

---

### 2.2 Logout
```http
POST /auth/logout
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 2.3 Get Current User
```http
GET /auth/me
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "name": "Agent 1",
    "email": "agent@hendraprop.com",
    "role": "agent",
    "agent": {
      "id": 3,
      "phone": "08123456789",
      "whatsapp": "08123456789",
      "office": {
        "id": 1,
        "name": "Hendra Prop 1"
      }
    }
  }
}
```

---

## 3. Property Endpoints

### 3.1 List Properties
```http
GET /properties?page=1&type=house&status=available&price_min=1000000000&price_max=5000000000
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | int | Page number (default: 1) |
| `per_page` | int | Items per page (default: 20, max: 100) |
| `type` | string | Filter by type: house, apartment, land, commercial |
| `listing_type` | string | Filter: sale, rent, both |
| `status` | string | Filter: available, pending, sold, rented |
| `price_min` | decimal | Minimum price |
| `price_max` | decimal | Maximum price |
| `city` | string | Filter by city |
| `search` | string | Search keyword (title, description, address) |
| `sort` | string | Sort by: price_asc, price_desc, date_desc, views_desc |

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "slug": "rumah-mewah-jakarta-selatan",
      "title": "Rumah Mewah Jakarta Selatan",
      "type": "house",
      "listing_type": "sale",
      "price": 5000000000,
      "price_per_sqm": 15000000,
      "land_area": 300,
      "building_area": 250,
      "bedrooms": 4,
      "bathrooms": 3,
      "address": "Jl. Kemang Raya No. 10",
      "city": "Jakarta Selatan",
      "status": "available",
      "cover_image": "https://storage.hendraprop.com/properties/1/cover.jpg",
      "views": 152,
      "agent": {
        "id": 3,
        "name": "Agent 1",
        "phone": "08123456789",
        "whatsapp": "08123456789",
        "avatar": "https://..."
      },
      "created_at": "2025-10-15T10:30:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 20,
    "total": 95,
    "from": 1,
    "to": 20
  }
}
```

---

### 3.2 Get Property Detail
```http
GET /properties/{id}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "slug": "rumah-mewah-jakarta-selatan",
    "title": "Rumah Mewah Jakarta Selatan",
    "description": "Rumah mewah dengan design modern minimalis...",
    "type": "house",
    "listing_type": "sale",
    "price": 5000000000,
    "price_per_sqm": 15000000,
    "land_area": 300,
    "building_area": 250,
    "bedrooms": 4,
    "bathrooms": 3,
    "address": "Jl. Kemang Raya No. 10, Jakarta Selatan",
    "city": "Jakarta Selatan",
    "province": "DKI Jakarta",
    "latitude": -6.259051,
    "longitude": 106.818134,
    "certificate_type": "SHM",
    "status": "available",
    "is_featured": true,
    "views": 152,
    "photos": [
      {
        "id": 1,
        "url": "https://storage.hendraprop.com/properties/1/photo1.jpg",
        "order": 1,
        "is_cover": true
      },
      {
        "id": 2,
        "url": "https://storage.hendraprop.com/properties/1/photo2.jpg",
        "order": 2,
        "is_cover": false
      }
    ],
    "agent": {
      "id": 3,
      "name": "Agent 1",
      "phone": "08123456789",
      "whatsapp": "08123456789",
      "bio": "Experienced property agent...",
      "avatar": "https://..."
    },
    "created_at": "2025-10-15T10:30:00Z",
    "updated_at": "2025-10-20T15:45:00Z"
  }
}
```

---

### 3.3 Create Property
```http
POST /properties
```

**Request Body (multipart/form-data):**
```json
{
  "title": "Rumah Mewah Jakarta Selatan",
  "description": "Rumah mewah dengan design modern...",
  "type": "house",
  "listing_type": "sale",
  "price": 5000000000,
  "land_area": 300,
  "building_area": 250,
  "bedrooms": 4,
  "bathrooms": 3,
  "address": "Jl. Kemang Raya No. 10",
  "city": "Jakarta Selatan",
  "province": "DKI Jakarta",
  "latitude": -6.259051,
  "longitude": 106.818134,
  "certificate_type": "SHM",
  "photos": [
    "file1.jpg",
    "file2.jpg"
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 15,
    "slug": "rumah-mewah-jakarta-selatan",
    "title": "Rumah Mewah Jakarta Selatan",
    ...
  },
  "message": "Property created successfully"
}
```

---

### 3.4 Update Property
```http
PUT /properties/{id}
```

**Request Body:** (same as create)

**Response (200 OK):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Property updated successfully"
}
```

---

### 3.5 Delete Property
```http
DELETE /properties/{id}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

---

## 4. Transaction Endpoints

### 4.1 List Transactions
```http
GET /transactions?agent_id=3&status=completed&date_from=2025-01-01&date_to=2025-12-31
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `agent_id` | int | Filter by agent |
| `office_id` | int | Filter by office |
| `status` | string | Filter: pending, completed, cancelled |
| `date_from` | date | Start date (YYYY-MM-DD) |
| `date_to` | date | End date (YYYY-MM-DD) |

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 10,
      "property": {
        "id": 1,
        "title": "Rumah Mewah Jakarta Selatan",
        "cover_image": "https://..."
      },
      "agent_owner": {
        "id": 3,
        "name": "Agent 1"
      },
      "agent_buyer": {
        "id": 5,
        "name": "Agent 2"
      },
      "buyer_name": "John Doe",
      "buyer_phone": "08123456789",
      "transaction_type": "sale",
      "final_price": 4800000000,
      "commission_percentage": 2,
      "transaction_date": "2025-10-20",
      "status": "completed",
      "created_at": "2025-10-20T16:00:00Z"
    }
  ],
  "meta": {
    "total": 12
  }
}
```

---

### 4.2 Create Transaction
```http
POST /transactions
```

**Request Body:**
```json
{
  "property_id": 1,
  "agent_buyer_id": 5,
  "buyer_name": "John Doe",
  "buyer_phone": "08123456789",
  "buyer_email": "john@example.com",
  "transaction_type": "sale",
  "final_price": 4800000000,
  "commission_percentage": 2,
  "transaction_date": "2025-10-20",
  "notes": "Deal after nego"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 15,
    "property_id": 1,
    "final_price": 4800000000,
    "commissions": [
      {
        "type": "agent_owner",
        "agent_id": 3,
        "amount": 33600000,
        "percentage": 35,
        "status": "pending"
      },
      {
        "type": "agent_buyer",
        "agent_id": 5,
        "amount": 33600000,
        "percentage": 35,
        "status": "pending"
      },
      {
        "type": "office",
        "office_id": 1,
        "amount": 28800000,
        "percentage": 30,
        "status": "pending"
      }
    ]
  },
  "message": "Transaction created successfully"
}
```

---

## 5. Commission Endpoints

### 5.1 List Commissions
```http
GET /commissions?agent_id=3&status=pending
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `agent_id` | int | Filter by agent |
| `office_id` | int | Filter by office |
| `status` | string | Filter: pending, paid, cancelled |
| `date_from` | date | Start date |
| `date_to` | date | End date |

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 25,
      "transaction": {
        "id": 10,
        "property": {
          "title": "Rumah Mewah Jakarta Selatan"
        },
        "transaction_date": "2025-10-20"
      },
      "amount": 33600000,
      "percentage": 35,
      "type": "agent_owner",
      "status": "pending",
      "paid_date": null,
      "created_at": "2025-10-20T16:00:00Z"
    }
  ],
  "meta": {
    "total_pending": 100000000,
    "total_paid": 50000000,
    "total_all": 150000000
  }
}
```

---

### 5.2 Mark Commission as Paid
```http
PUT /commissions/{id}/pay
```

**Request Body:**
```json
{
  "paid_date": "2025-10-25",
  "payment_method": "bank_transfer",
  "notes": "Transfer to BCA 1234567890"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 25,
    "status": "paid",
    "paid_date": "2025-10-25",
    "payment_method": "bank_transfer"
  },
  "message": "Commission marked as paid"
}
```

---

## 6. Dashboard Endpoints

### 6.1 Agent Performance
```http
GET /dashboard/agent/{agent_id}?date_from=2025-01-01&date_to=2025-12-31
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "agent": {
      "id": 3,
      "name": "Agent 1"
    },
    "metrics": {
      "total_listings": 25,
      "total_listings_sold": 10,
      "total_transactions": 12,
      "total_omzet": 50000000000,
      "total_commission": 1200000000,
      "commission_pending": 500000000,
      "commission_paid": 700000000
    },
    "omzet_per_month": [
      { "month": "2025-01", "omzet": 5000000000 },
      { "month": "2025-02", "omzet": 8000000000 }
    ]
  }
}
```

---

### 6.2 Office Performance
```http
GET /dashboard/office/{office_id}?date_from=2025-01-01&date_to=2025-12-31
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "office": {
      "id": 1,
      "name": "Hendra Prop 1"
    },
    "metrics": {
      "total_agents": 15,
      "total_listings": 120,
      "total_transactions": 45,
      "total_omzet": 150000000000,
      "office_commission": 2000000000
    },
    "agents_performance": [
      {
        "agent_id": 3,
        "name": "Agent 1",
        "total_listings": 25,
        "total_omzet": 50000000000,
        "total_commission": 1200000000
      }
    ]
  }
}
```

---

## 7. Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 422 | Input validation failed |
| `UNAUTHORIZED` | 401 | Not authenticated |
| `FORBIDDEN` | 403 | No permission to access resource |
| `NOT_FOUND` | 404 | Resource not found |
| `SERVER_ERROR` | 500 | Internal server error |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |

---

## 8. Rate Limiting

- **Default:** 60 requests/minute per user
- **Authenticated:** 120 requests/minute
- **Public endpoints:** 30 requests/minute per IP

**Response when rate limit exceeded:**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again in 60 seconds.",
    "retry_after": 60
  }
}
```

---

**Prepared by:** AI Project Analysis System  
**Date:** 31 Oktober 2025  
**Version:** 1.0.0

