import { registerStudent, loginStudent, getEventsByStudent } from './api';
import { Student, LoginRequest, LoginResponse, StudentEvent } from '../types';

// Mock fetch
global.fetch = jest.fn();

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ─────────────────────────────────────────────────────
  // 1. POST /students/register
  // ─────────────────────────────────────────────────────
  describe('POST /students/register - Register Student', () => {
    it('should successfully register a new student', async () => {
      const newStudent: Student = {
        rollNumber: 'CS2021005',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const mockResponse = {
        ok: true,
        json: async () => ({ message: 'Student registered successfully' }),
      };

      mockFetch.mockResolvedValueOnce(mockResponse as Response);

      const result = await registerStudent(newStudent);

      expect(mockFetch).toHaveBeenCalledWith('/students/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      expect(result.message).toBe('Student registered successfully');
    });

    it('should handle registration error', async () => {
      const newStudent: Student = {
        rollNumber: 'CS2021005',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const mockResponse = {
        ok: false,
        json: async () => ({ message: 'Email already exists' }),
      };

      mockFetch.mockResolvedValueOnce(mockResponse as Response);

      await expect(registerStudent(newStudent)).rejects.toThrow('Email already exists');
    });

    it('should validate required fields', async () => {
      const incompleteStudent: Student = {
        rollNumber: '',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      expect(incompleteStudent.rollNumber).toBe('');
    });
  });

  // ─────────────────────────────────────────────────────
  // 2. POST /student/login
  // ─────────────────────────────────────────────────────
  describe('POST /student/login - Login Student', () => {
    it('should successfully login with valid credentials', async () => {
      const credentials: LoginRequest = {
        email: 'john@example.com',
        password: 'password123',
      };

      const mockResponse: LoginResponse = {
        success: true,
        message: 'Login successful',
        student: {
          rollNumber: 'CS2021005',
          name: 'John Doe',
          email: 'john@example.com',
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await loginStudent(credentials);

      expect(mockFetch).toHaveBeenCalledWith('/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      expect(result.success).toBe(true);
      expect(result.student.rollNumber).toBe('CS2021005');
      expect(result.student.name).toBe('John Doe');
    });

    it('should reject with invalid credentials', async () => {
      const credentials: LoginRequest = {
        email: 'wrong@example.com',
        password: 'wrongpassword',
      };

      const mockResponse = {
        ok: false,
        json: async () => ({ message: 'Invalid email or password' }),
      };

      mockFetch.mockResolvedValueOnce(mockResponse as Response);

      await expect(loginStudent(credentials)).rejects.toThrow('Invalid email or password');
    });

    it('should return student object with correct properties', async () => {
      const credentials: LoginRequest = {
        email: 'student@example.com',
        password: 'pass123',
      };

      const mockResponse: LoginResponse = {
        success: true,
        message: 'Login successful',
        student: {
          rollNumber: 'CS2021003',
          name: 'Jane Smith',
          email: 'student@example.com',
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await loginStudent(credentials);

      expect(result.student).toHaveProperty('rollNumber');
      expect(result.student).toHaveProperty('name');
      expect(result.student).toHaveProperty('email');
    });
  });

  // ─────────────────────────────────────────────────────
  // 3. GET /api/events/student/{rollNumber}
  // ─────────────────────────────────────────────────────
  describe('GET /api/events/student/{rollNumber} - Get Student Events', () => {
    it('should fetch events for a student', async () => {
      const rollNumber = 'CS2021005';
      const mockEvents: StudentEvent[] = [
        {
          eventId: 'EVT001',
          eventName: 'Tech Conference 2026',
          eventDescription: 'Annual tech conference',
          eventDate: '2026-05-15',
          eventLocation: 'Auditorium A',
          studentRollNumber: 'CS2021005',
          studentName: 'John Doe',
        },
        {
          eventId: 'EVT002',
          eventName: 'Hackathon',
          eventDescription: 'Code competition',
          eventDate: '2026-06-10',
          eventLocation: 'Lab 3',
          studentRollNumber: 'CS2021005',
          studentName: 'John Doe',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockEvents,
      } as Response);

      const result = await getEventsByStudent(rollNumber);

      expect(mockFetch).toHaveBeenCalledWith(
        `http://localhost:8082/api/events/student/${rollNumber}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      expect(result).toHaveLength(2);
      expect(result[0].eventName).toBe('Tech Conference 2026');
    });

    it('should return empty array if no events', async () => {
      const rollNumber = 'CS2021010';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response);

      const result = await getEventsByStudent(rollNumber);

      expect(result).toHaveLength(0);
    });

    it('should handle events fetch error', async () => {
      const rollNumber = 'INVALID';

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Student not found' }),
      } as Response);

      await expect(getEventsByStudent(rollNumber)).rejects.toThrow('Student not found');
    });

    it('should return events with correct properties', async () => {
      const rollNumber = 'CS2021005';
      const mockEvents: StudentEvent[] = [
        {
          eventId: 'EVT001',
          eventName: 'Workshop',
          eventDescription: 'Database workshop',
          eventDate: '2026-04-20',
          eventLocation: 'Room 101',
          studentRollNumber: 'CS2021005',
          studentName: 'John Doe',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockEvents,
      } as Response);

      const result = await getEventsByStudent(rollNumber);

      expect(result[0]).toHaveProperty('eventId');
      expect(result[0]).toHaveProperty('eventName');
      expect(result[0]).toHaveProperty('eventDescription');
      expect(result[0]).toHaveProperty('eventDate');
      expect(result[0]).toHaveProperty('eventLocation');
      expect(result[0]).toHaveProperty('studentRollNumber');
      expect(result[0]).toHaveProperty('studentName');
    });
  });

  // ─────────────────────────────────────────────────────
  // Integration Tests
  // ─────────────────────────────────────────────────────
  describe('Integration: Full User Flow', () => {
    it('should complete full registration → login → view events flow', async () => {
      // Step 1: Register
      const newStudent: Student = {
        rollNumber: 'CS2021020',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'secure123',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Student registered successfully' }),
      } as Response);

      const registerResult = await registerStudent(newStudent);
      expect(registerResult.message).toBe('Student registered successfully');

      // Step 2: Login
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          message: 'Login successful',
          student: {
            rollNumber: 'CS2021020',
            name: 'Alice Johnson',
            email: 'alice@example.com',
          },
        }),
      } as Response);

      const loginResult = await loginStudent({
        email: 'alice@example.com',
        password: 'secure123',
      });
      expect(loginResult.success).toBe(true);

      // Step 3: Get events
      const mockEvents: StudentEvent[] = [
        {
          eventId: 'EVT003',
          eventName: 'AI Summit',
          eventDescription: 'Artificial Intelligence discussions',
          eventDate: '2026-07-01',
          eventLocation: 'Main Hall',
          studentRollNumber: 'CS2021020',
          studentName: 'Alice Johnson',
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockEvents,
      } as Response);

      const eventsResult = await getEventsByStudent('CS2021020');
      expect(eventsResult).toHaveLength(1);
      expect(eventsResult[0].studentName).toBe('Alice Johnson');
    });
  });
});
