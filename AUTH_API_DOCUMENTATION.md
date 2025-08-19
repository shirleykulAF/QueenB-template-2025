# QueenB Authentication API Documentation

## Overview
This document describes the authentication endpoints for the QueenB platform, allowing users to sign up as mentors or mentees and authenticate with email/password.

## Base URL
```
http://localhost:5000/api/auth
```

## Authentication Endpoints

### 1. User Registration (Signup)

**Endpoint:** `POST /api/auth/signup`

**Description:** Register a new user as either a mentor or mentee.

**Request Body:**
```json
{
  "userType": "mentor", // or "mentee"
  "firstName": "Sarah",
  "lastName": "Cohen",
  "email": "sarah.cohen@example.com",
  "password": "MySecurePassword123!", // Minimum 6 characters, will be hashed
  "phone": "050-1234567",
  
  // Mentor-specific fields (only if userType is "mentor")
  "technologies": ["JavaScript", "React", "Node.js"],
  "yearsOfExperience": 5,
  "description": "Full-stack developer with 5 years of experience",
  "linkedinUrl": "https://linkedin.com/in/sarahcohen",
  
  // Mentee-specific fields (only if userType is "mentee")
  "description": "Looking to learn React and JavaScript",
  "lookingFor": ["React", "JavaScript", "Frontend"]
}
```

**Required Fields for Mentors:**
- `userType`: Must be "mentor"
- `firstName`: String (2-50 characters)
- `lastName`: String (2-50 characters)
- `email`: Valid email format (unique)
- `password`: String (minimum 6 characters)
- `phone`: Valid phone number format
- `technologies`: Array of strings (at least one required)
- `yearsOfExperience`: Number (non-negative)

**Required Fields for Mentees:**
- `userType`: Must be "mentee"
- `firstName`: String (2-50 characters)
- `lastName`: String (2-50 characters)
- `email`: Valid email format (unique)
- `password`: String (minimum 6 characters)
- `phone`: Valid phone number format

**Success Response (201):**
```json
{
  "success": true,
  "message": "mentor registered successfully",
  "data": {
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "firstName": "Sarah",
      "lastName": "Cohen",
      "email": "sarah.cohen@example.com",
      "phone": "050-1234567",
      "technologies": ["JavaScript", "React", "Node.js"],
      "yearsOfExperience": 5,
      "description": "Full-stack developer with 5 years of experience",
      "linkedinUrl": "https://linkedin.com/in/sarahcohen",
      "availability": "available",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400`: Validation errors (missing fields, invalid format)
- `400`: User already exists
- `500`: Server error

### 2. User Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate a user with email and password.

**Request Body:**
```json
{
  "email": "sarah.cohen@example.com",
  "password": "MySecurePassword123!",
  "userType": "mentor" // Optional - if not provided, searches both collections
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "firstName": "Sarah",
      "lastName": "Cohen",
      "email": "sarah.cohen@example.com",
      "phone": "050-1234567",
      "technologies": ["JavaScript", "React", "Node.js"],
      "yearsOfExperience": 5,
      "description": "Full-stack developer with 5 years of experience",
      "linkedinUrl": "https://linkedin.com/in/sarahcohen",
      "availability": "available",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userType": "mentor"
  }
}
```

**Error Responses:**
- `400`: Missing email or password
- `401`: Invalid email or password
- `500`: Server error

### 3. Get Current User Profile

**Endpoint:** `GET /api/auth/me`

**Description:** Get the current authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "firstName": "Sarah",
      "lastName": "Cohen",
      "email": "sarah.cohen@example.com",
      "phone": "050-1234567",
      "technologies": ["JavaScript", "React", "Node.js"],
      "yearsOfExperience": 5,
      "description": "Full-stack developer with 5 years of experience",
      "linkedinUrl": "https://linkedin.com/in/sarahcohen",
      "availability": "available",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "userType": "mentor"
  }
}
```

**Error Responses:**
- `401`: Missing or invalid token
- `500`: Server error

## Authentication Flow

1. **Registration**: User signs up with email/password and user type
2. **Login**: User authenticates with email/password
3. **Token**: JWT token is returned and should be included in subsequent requests
4. **Protected Routes**: Include token in Authorization header

## Token Usage

Include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <your-jwt-token>
```

## Example Usage

### Register a Mentor
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "userType": "mentor",
    "firstName": "Sarah",
    "lastName": "Cohen",
    "email": "sarah.cohen@example.com",
    "password": "MySecurePassword123!",
    "phone": "050-1234567",
    "technologies": ["JavaScript", "React", "Node.js"],
    "yearsOfExperience": 5,
    "description": "Full-stack developer with 5 years of experience",
    "linkedinUrl": "https://linkedin.com/in/sarahcohen"
  }'
```

### Register a Mentee
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "userType": "mentee",
    "firstName": "Noa",
    "lastName": "Katz",
    "email": "noa.katz@example.com",
    "password": "MySecurePassword123!",
    "phone": "050-1111111",
    "description": "Computer Science student looking to improve my React skills",
    "lookingFor": ["React", "JavaScript", "Frontend"]
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "sarah.cohen@example.com",
    "password": "MySecurePassword123!",
    "userType": "mentor"
  }'
```

## Password Security

### How Passwords Work:
1. **Client sends password** in the request body (plain text over HTTPS)
2. **Server receives password** and immediately hashes it using bcrypt
3. **Hashed password is stored** in the database (never plain text)
4. **Original password is discarded** from memory
5. **Login verification** compares the hashed input with stored hash

### Password Requirements:
- **Minimum length**: 6 characters
- **Recommended**: Include uppercase, lowercase, numbers, and symbols
- **Example**: `MySecurePassword123!`

### Security Features:
- **bcrypt hashing** with salt rounds of 10
- **HTTPS required** for all authentication requests
- **Passwords never logged** or stored in plain text
- **JWT tokens expire** after 24 hours
- **Email addresses stored** in lowercase
- **All inputs validated** and sanitized
- **Tokens should be stored** securely on the client side

## Environment Variables

Make sure to set these environment variables:

```env
JWT_SECRET=your-secret-key-here
MONGODB_URI=mongodb://localhost:27017/queenb_db
```

## Testing with Seed Data

**⚠️ Note**: The seed data includes test users with a simple password `password123` for development/testing purposes only. In production, users should create strong, unique passwords.

**Test users with password `password123`:**

**Mentors:**
- sarah.cohen@example.com
- dana.levy@example.com
- rachel.bendavid@example.com
- michal.goldberg@example.com
- yael.shapira@example.com
- amit.peretz@example.com
- tamar.weiss@example.com
- roni.mizrahi@example.com

**Mentees:**
- noa.katz@example.com
- or.solomon@example.com
- maya.friedman@example.com
- itay.rosenberg@example.com
- shira.levi@example.com
- gaya.cohen@example.com
