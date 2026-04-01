import { Student, LoginRequest, LoginResponse, StudentEvent } from "../types";

const EVENT_SERVICE_URL = "http://localhost:8082/api";

// ─── Student Service API Calls ──────────────────────────────────────────────

export const registerStudent = async (student: Student): Promise<{ message: string }> => {
  const response = await fetch(`/students/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Registration failed");
  }

  return response.json();
};

export const loginStudent = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`/student/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Login failed");
  }

  return response.json();
};

// ─── Event Service API Calls ─────────────────────────────────────────────────

export const getEventsByStudent = async (rollNumber: string): Promise<StudentEvent[]> => {
  const response = await fetch(
    `${EVENT_SERVICE_URL}/events/student/${rollNumber}`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to fetch events");
  }

  return response.json();
};
