# API Documentation

## Overview

The EcoTech Solutions API is built using Next.js API Routes, providing RESTful endpoints for e-commerce operations.

**Base URL:** `http://localhost:3000/api` (development) or `https://yourdomain.com/api` (production)

**Authentication:** Most endpoints require Clerk authentication. The session is automatically validated via cookies.

---

## API Endpoints

### Checkout

#### POST `/api/checkout`

Creates a Stripe checkout session.

**Request Body:**
```json
{
  "items": [
    {
      "productId": "string",
      "quantity": 1
    }
  ],
  "addressId": "string"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/..."
}
```

---

### Orders

#### GET `/api/orders`

Retrieves orders for the authenticated user.

**Response:**
```json
{
  "orders": [
    {
      "_id": "string",
      "orderNumber": "string",
      "status": "pending | processing | shipped | delivered",
      "total": 1000,
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

#### GET `/api/orders/[orderId]`

Retrieves a specific order by ID.

#### PATCH `/api/orders/[orderId]/status`

Updates order status (admin only).

**Request Body:**
```json
{
  "status": "shipped"
}
```

---

### User

#### GET `/api/user/profile`

Retrieves the current user's profile.

#### PATCH `/api/user/profile`

Updates user profile information.

#### GET `/api/user/addresses`

Retrieves user's saved addresses.

#### POST `/api/user/addresses`

Creates a new address.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "street": "string",
  "city": "string",
  "county": "string",
  "postalCode": "string",
  "phone": "string"
}
```

#### GET `/api/user/wishlist`

Retrieves user's wishlist items.

#### POST `/api/user/wishlist`

Adds/removes item from wishlist.

---

### Admin

**Authentication:** Requires admin email in `NEXT_PUBLIC_ADMIN_EMAIL`

#### GET `/api/admin/products`

Lists all products.

#### POST `/api/admin/products`

Creates a new product.

#### PATCH `/api/admin/products/[productId]`

Updates a product.

#### GET `/api/admin/orders`

Lists all orders (admin view).

#### GET `/api/admin/users`

Lists all users.

---

### Webhook

#### POST `/api/webhook`

Stripe webhook endpoint for payment events.

**Headers Required:**
- `stripe-signature`: Webhook signature

**Events Handled:**
- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message description",
  "code": "ERROR_CODE"
}
```

**Common Status Codes:**

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

API routes do not implement explicit rate limiting. Vercel's serverless functions have built-in limits.

---

## CORS

CORS is configured for the same origin. Cross-origin requests are not allowed by default.
