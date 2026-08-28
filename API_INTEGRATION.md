# RentNest API Integration Documentation

## Overview

This document outlines all API endpoints integrated into the RentNest frontend application, their corresponding actions/services, and where they are used in the UI.

## Base URL

Development: http://localhost:3000
Production: https://rent-nest-frontend-blue.vercel.app

---

## Authentication APIs

### Register

| Property           | Value                                         |
| ------------------ | --------------------------------------------- |
| **Endpoint**       | `POST /auth/register`                         |
| **Action/Service** | `authActions.ts → registerAction`             |
| **UI Location**    | `/register`                                   |
| **Request Body**   | `{ name, email, password, role? }`            |
| **Response**       | `{ success: boolean, data: { user, token } }` |

### Login

| Property           | Value                                         |
| ------------------ | --------------------------------------------- |
| **Endpoint**       | `POST /auth/login`                            |
| **Action/Service** | `authActions.ts → loginAction`                |
| **UI Location**    | `/login`                                      |
| **Request Body**   | `{ email, password }`                         |
| **Response**       | `{ success: boolean, data: { user, token } }` |

---

## User APIs

### Get Current User

| Property           | Value                                  |
| ------------------ | -------------------------------------- |
| **Endpoint**       | `GET /users/me`                        |
| **Action/Service** | `service/getMe.ts`                     |
| **UI Location**    | Navbar, `/dashboard`, `/dashboard/*`   |
| **Auth Required**  | Yes                                    |
| **Response**       | `{ success: boolean, data: { user } }` |

### Get All Users (Admin Only)

| Property           | Value                                     |
| ------------------ | ----------------------------------------- |
| **Endpoint**       | `GET /users`                              |
| **Action/Service** | `service/getUsers.ts`                     |
| **UI Location**    | `/admin/users`                            |
| **Auth Required**  | Yes (Admin)                               |
| **Response**       | `{ success: boolean, data: { users[] } }` |

---

## Property APIs

### Get All Properties

| Property           | Value                                                 |
| ------------------ | ----------------------------------------------------- |
| **Endpoint**       | `GET /properties`                                     |
| **Action/Service** | `service/getProperties.ts`                            |
| **UI Location**    | `/` (Homepage)                                        |
| **Query Params**   | `?category=id&search=term&minPrice=100&maxPrice=1000` |
| **Response**       | `{ success: boolean, data: { properties[] } }`        |

### Get My Properties (Landlord)

| Property           | Value                                          |
| ------------------ | ---------------------------------------------- |
| **Endpoint**       | `GET /properties/my`                           |
| **Action/Service** | `service/getMyProperties.ts`                   |
| **UI Location**    | `/dashboard/my-properties`                     |
| **Auth Required**  | Yes (Landlord)                                 |
| **Response**       | `{ success: boolean, data: { properties[] } }` |

### Get Single Property

| Property           | Value                                      |
| ------------------ | ------------------------------------------ |
| **Endpoint**       | `GET /properties/:id`                      |
| **Action/Service** | `service/getProperty.ts`                   |
| **UI Location**    | `/properties/[id]`                         |
| **Response**       | `{ success: boolean, data: { property } }` |

### Create Property

| Property           | Value                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------- |
| **Endpoint**       | `POST /properties`                                                                     |
| **Action/Service** | `propertyActions.ts → createPropertyAction`                                            |
| **UI Location**    | `/dashboard/properties/create`                                                         |
| **Auth Required**  | Yes (Landlord)                                                                         |
| **Request Body**   | `{ title, description, price, bedrooms, bathrooms, address, city, image, categoryId }` |
| **Response**       | `{ success: boolean, data: { property } }`                                             |

### Update Property

| Property           | Value                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Endpoint**       | `PATCH /properties/:id`                                                                                     |
| **Action/Service** | `propertyActions.ts → updatePropertyAction`                                                                 |
| **UI Location**    | `/dashboard/properties/[id]/edit`                                                                           |
| **Auth Required**  | Yes (Landlord)                                                                                              |
| **Request Body**   | `{ title?, description?, price?, bedrooms?, bathrooms?, address?, city?, image?, available?, categoryId? }` |
| **Response**       | `{ success: boolean, data: { property } }`                                                                  |

### Delete Property

| Property           | Value                                       |
| ------------------ | ------------------------------------------- |
| **Endpoint**       | `DELETE /properties/:id`                    |
| **Action/Service** | `propertyActions.ts → deletePropertyAction` |
| **UI Location**    | `/dashboard/properties` (Delete button)     |
| **Auth Required**  | Yes (Landlord/Admin)                        |
| **Response**       | `{ success: boolean, message: string }`     |

---

## Category APIs

### Get All Categories

| Property           | Value                                          |
| ------------------ | ---------------------------------------------- |
| **Endpoint**       | `GET /categories`                              |
| **Action/Service** | `service/getCategories.ts`                     |
| **UI Location**    | `/`, `/properties`, `/admin/categories`        |
| **Response**       | `{ success: boolean, data: { categories[] } }` |

### Create Category (Admin Only)

| Property           | Value                                      |
| ------------------ | ------------------------------------------ |
| **Endpoint**       | `POST /categories`                         |
| **Action/Service** | `categoryActions.ts → addCategory`         |
| **UI Location**    | `/admin/categories`                        |
| **Auth Required**  | Yes (Admin)                                |
| **Request Body**   | `{ name }`                                 |
| **Response**       | `{ success: boolean, data: { category } }` |

### Update Category (Admin Only)

| Property           | Value                                      |
| ------------------ | ------------------------------------------ |
| **Endpoint**       | `PUT /categories/:id`                      |
| **Action/Service** | `categoryActions.ts → editCategory`        |
| **UI Location**    | `/admin/categories`                        |
| **Auth Required**  | Yes (Admin)                                |
| **Request Body**   | `{ name }`                                 |
| **Response**       | `{ success: boolean, data: { category } }` |

### Delete Category (Admin Only)

| Property           | Value                                   |
| ------------------ | --------------------------------------- |
| **Endpoint**       | `DELETE /categories/:id`                |
| **Action/Service** | `categoryActions.ts → removeCategory`   |
| **UI Location**    | `/admin/categories`                     |
| **Auth Required**  | Yes (Admin)                             |
| **Response**       | `{ success: boolean, message: string }` |

---

## Rental Request APIs

### Create Rental Request

| Property           | Value                                                 |
| ------------------ | ----------------------------------------------------- |
| **Endpoint**       | `POST /rentals`                                       |
| **Action/Service** | `rentalRequestActions.ts → createRentalRequestAction` |
| **UI Location**    | `/properties/[id]` (Rental Request Form)              |
| **Auth Required**  | Yes (Tenant)                                          |
| **Request Body**   | `{ propertyId, moveInDate, duration?, message? }`     |
| **Response**       | `{ success: boolean, data: { rentalRequest } }`       |

### Get My Rental Requests (Tenant)

| Property           | Value                                                |
| ------------------ | ---------------------------------------------------- |
| **Endpoint**       | `GET /rentals`                                       |
| **Action/Service** | `service/getRentalRequests.ts` → `getRentalRequests` |
| **UI Location**    | `/dashboard/my-requests`                             |
| **Auth Required**  | Yes (Tenant)                                         |
| **Response**       | `{ success: boolean, data: { rentalRequests[] } }`   |

### Get Landlord Rental Requests

| Property           | Value                                                |
| ------------------ | ---------------------------------------------------- |
| **Endpoint**       | `GET /rentals`                                       |
| **Action/Service** | `service/getRentalRequests.ts` → `getRentalRequests` |
| **UI Location**    | `/dashboard/rentals`                                 |
| **Auth Required**  | Yes (Landlord)                                       |
| **Response**       | `{ success: boolean, data: { rentalRequests[] } }`   |

### Update Rental Request Status

| Property           | Value                                                 |
| ------------------ | ----------------------------------------------------- | ---------- | -------- | -------------- |
| **Endpoint**       | `PUT /rentals/:id`                                    |
| **Action/Service** | `rentalRequestActions.ts → updateRentalRequestAction` |
| **UI Location**    | `/dashboard/rentals` (Approve/Reject buttons)         |
| **Auth Required**  | Yes (Landlord)                                        |
| **Request Body**   | `{ status: "APPROVED"                                 | "REJECTED" | "ACTIVE" | "COMPLETED" }` |
| **Response**       | `{ success: boolean, data: { rentalRequest } }`       |

---

## Payment APIs

### Create Checkout Session

| Property           | Value                                         |
| ------------------ | --------------------------------------------- |
| **Endpoint**       | `POST /payments/checkout/:rentalRequestId`    |
| **Action/Service** | `paymentActions.ts → createCheckoutSession`   |
| **UI Location**    | `/dashboard/my-requests` (Payment Button)     |
| **Auth Required**  | Yes (Tenant)                                  |
| **Response**       | `{ success: boolean, data: { checkoutUrl } }` |

### Get My Payments (Tenant)

| Property           | Value                                        |
| ------------------ | -------------------------------------------- |
| **Endpoint**       | `GET /payments/my`                           |
| **Action/Service** | `paymentActions.ts → getMyPayments`          |
| **UI Location**    | `/dashboard/payments`                        |
| **Auth Required**  | Yes (Tenant)                                 |
| **Response**       | `{ success: boolean, data: { payments[] } }` |

### Payment Webhook

| Property           | Value                          |
| ------------------ | ------------------------------ |
| **Endpoint**       | `POST /payments/webhook`       |
| **Action/Service** | Backend only (Stripe webhook)  |
| **UI Location**    | N/A (Server-to-server)         |
| **Auth Required**  | No (Webhook secret validation) |
| **Response**       | `{ received: true }`           |

---

## Admin APIs

### Get Dashboard Stats (Admin Only)

| Property           | Value                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **Endpoint**       | `GET /admin/stats`                                                                         |
| **Action/Service** | `service/getAdminStats.ts`                                                                 |
| **UI Location**    | `/admin/dashboard`                                                                         |
| **Auth Required**  | Yes (Admin)                                                                                |
| **Response**       | `{ success: boolean, data: { totalUsers, totalProperties, totalRentals, totalPayments } }` |

### Get All Users (Admin Only)

| Property           | Value                                     |
| ------------------ | ----------------------------------------- |
| **Endpoint**       | `GET /admin/users`                        |
| **Action/Service** | `service/getAllUsers.ts`                  |
| **UI Location**    | `/admin/users`                            |
| **Auth Required**  | Yes (Admin)                               |
| **Response**       | `{ success: boolean, data: { users[] } }` |

### Update User Role (Admin Only)

| Property           | Value                                    |
| ------------------ | ---------------------------------------- | ---------- | ---------- |
| **Endpoint**       | `PATCH /admin/users/:id/role`            |
| **Action/Service** | `adminActions.ts → updateUserRoleAction` |
| **UI Location**    | `/admin/users`                           |
| **Auth Required**  | Yes (Admin)                              |
| **Request Body**   | `{ role: "TENANT"                        | "LANDLORD" | "ADMIN" }` |
| **Response**       | `{ success: boolean, data: { user } }`   |

---

## API Response Format

### Success Response

```typescript
{
  success: true,
  message: string,
  data: any
}
```
