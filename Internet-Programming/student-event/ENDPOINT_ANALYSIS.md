# Student Event Management System - Endpoint Analysis

## Project Overview
**Framework:** React 19 + TypeScript  
**HTTP Client:** Fetch API (no external HTTP library like Axios)  
**Backend Services:** 2 Microservices (Student Service & Event Service)  

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   React Frontend                         │
│              (http://localhost:3000)                     │
└──────────────────┬──────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌──────────────────┐  ┌──────────────────┐
│ Student Service  │  │  Event Service   │
│ (via proxy)      │  │  (direct URL)    │
│ Port: 8081       │  │  Port: 8082      │
└──────────────────┘  └──────────────────┘
```

---

## API Endpoints

### 1. Student Service Endpoints
**Base URL:** `http://localhost:8081` (via proxy in package.json)

#### Register Student
- **URL:** `/student/register`
- **Method:** `POST`
- **Used in:** [RegisterPage.tsx](src/components/RegisterPage.tsx)
- **Request Body:**
```json
{
  "rollNumber": "string (e.g., CS2021003)",
  "name": "string",
  "email": "string (email format)",
  "password": "string"
}
```
- **Response:**
```json
{
  "message": "string"
}
```
- **Function:** `registerStudent()` in [api.ts](src/services/api.ts)

#### Login Student
- **URL:** `/student/login`
- **Method:** `POST`
- **Used in:** [Login.tsx](src/components/Login.tsx)
- **Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response:**
```json
{
  "success": boolean,
  "message": "string",
  "student": {
    "rollNumber": "string",
    "name": "string",
    "email": "string"
  }
}
```
- **Function:** `loginStudent()` in [api.ts](src/services/api.ts)

---

### 2. Event Service Endpoints
**Base URL:** `http://localhost:8082/api` (direct URL, not using proxy)

#### Get Events by Student
- **URL:** `/api/events/student/{rollNumber}`
- **Method:** `GET`
- **URL Parameter:** `rollNumber` (e.g., "CS2021003")
- **Used in:** [Login.tsx](src/components/Login.tsx) (after successful login), [Events.tsx](src/components/Events.tsx)
- **Request Headers:**
```json
{
  "Content-Type": "application/json"
}
```
- **Response:**
```json
[
  {
    "eventId": "string",
    "eventName": "string",
    "eventDescription": "string",
    "eventDate": "string (ISO format)",
    "eventLocation": "string",
    "studentRollNumber": "string",
    "studentName": "string"
  }
  // ... more events
]
```
- **Function:** `getEventsByStudent()` in [api.ts](src/services/api.ts)

---

## Frontend Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `LandingPage.tsx` | Landing/Home page |
| `/register` | `RegisterPage.tsx` | Student registration form |
| `/login` | `Login.tsx` | Student login form |
| `/events` | `Events.tsx` | Display registered events (requires login) |

---

## API Call Flow

### Registration Flow
```
User fills form → RegisterPage.tsx
    ↓
registerStudent() called
    ↓
POST /student/register (proxy → port 8081)
    ↓
Success → Redirect to /login
```

### Login & Events Flow
```
User fills login form → Login.tsx
    ↓
loginStudent() called
    ↓
POST /student/login (proxy → port 8081)
    ↓
Extract rollNumber from response
    ↓
getEventsByStudent(rollNumber) called
    ↓
GET /api/events/student/{rollNumber} (direct → port 8082)
    ↓
Store events in sessionStorage
    ↓
Redirect to /events
    ↓
Events.tsx displays from sessionStorage
```

---

## Data Models

### Student Interface
```typescript
interface Student {
  rollNumber: string;
  name: string;
  email: string;
  password: string;
}
```

### LoginRequest Interface
```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

### LoginResponse Interface
```typescript
interface LoginResponse {
  success: boolean;
  message: string;
  student: {
    rollNumber: string;
    name: string;
    email: string;
  };
}
```

### StudentEvent Interface
```typescript
interface StudentEvent {
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventLocation: string;
  studentRollNumber: string;
  studentName: string;
}
```

---

## Configuration

### Package.json Proxy
```json
"proxy": "http://localhost:8081"
```
- Enables automatic proxying of relative URLs to the Student Service
- `/student/register` and `/student/login` use this proxy
- Event Service URL is explicitly set to avoid proxy

### Environment Setup Required
1. **Student Service:** Running on `http://localhost:8081`
2. **Event Service:** Running on `http://localhost:8082`
3. **Frontend:** Running on `http://localhost:3000` (default React dev server)

---

## Summary

### Total Endpoints: 3

| Service | Method | Endpoint | Purpose |
|---------|--------|----------|---------|
| Student | POST | `/student/register` | Register new student |
| Student | POST | `/student/login` | Authenticate student |
| Event | GET | `/api/events/student/{rollNumber}` | Get student events |

### Key Points
- ✅ Two separate microservices (Student & Event)
- ✅ Proxy configuration for Student Service
- ✅ Direct HTTP calls for Event Service
- ✅ Error handling with try-catch and user feedback
- ✅ Session storage for event data persistence
- ✅ Clean separation of API calls in `api.ts`
