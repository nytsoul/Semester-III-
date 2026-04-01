export interface Student {
  rollNumber: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  student: {
    rollNumber: string;
    name: string;
    email: string;
  };
}

export interface StudentEvent {
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventLocation: string;
  studentRollNumber: string;
  studentName: string;
}
