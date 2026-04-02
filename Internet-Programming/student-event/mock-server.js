#!/usr/bin/env node

/**
 * Mock Backend Server for Student Event Management
 * Runs on ports 8081 (Student Service) and 8082 (Event Service)
 * 
 * Usage: node mock-server.js
 */

const http = require('http');
const url = require('url');

// Mock database
const students = [
  {
    rollNumber: '001',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    rollNumber: '002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'pass456'
  }
];

const events = [
  {
    eventId: 'E001',
    eventName: 'Tech Fest 2024',
    eventDescription: 'Annual technology festival',
    eventDate: '2024-04-15',
    eventLocation: 'Main Campus',
    studentRollNumber: '001',
    studentName: 'John Doe'
  },
  {
    eventId: 'E002',
    eventName: 'Coding Competition',
    eventDescription: 'Inter-college coding competition',
    eventDate: '2024-05-20',
    eventLocation: 'IT Building',
    studentRollNumber: '001',
    studentName: 'John Doe'
  }
];

const cors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
};

// ─── Student Service (Port 8081) ───────────────────────────────────────
const studentServer = http.createServer(async (req, res) => {
  cors(req, res);

  // Handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // POST /student/register
  if (pathname === '/student/register' && req.method === 'POST') {
    const body = await parseBody(req);
    console.log('[8081] POST /student/register', body);

    // Check if student already exists
    if (students.find(s => s.email === body.email)) {
      res.writeHead(400, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({
        success: false,
        message: 'Email already registered'
      }));
      return;
    }

    // Add new student
    const newStudent = {
      rollNumber: `${students.length + 1}`,
      name: body.name,
      email: body.email,
      password: body.password
    };
    students.push(newStudent);

    res.writeHead(201, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({
      success: true,
      message: 'Student registered successfully',
      student: {
        rollNumber: newStudent.rollNumber,
        name: newStudent.name,
        email: newStudent.email
      }
    }));
    return;
  }

  // POST /student/login
  if (pathname === '/student/login' && req.method === 'POST') {
    const body = await parseBody(req);
    console.log('[8081] POST /student/login', body);

    const student = students.find(s => s.email === body.email && s.password === body.password);

    if (!student) {
      res.writeHead(401, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({
        success: false,
        message: 'Invalid email or password'
      }));
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({
      success: true,
      message: 'Login successful',
      student: {
        rollNumber: student.rollNumber,
        name: student.name,
        email: student.email
      }
    }));
    return;
  }

  // Not found
  res.writeHead(404, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify({ error: 'Not found' }));
});

// ─── Event Service (Port 8082) ─────────────────────────────────────────
const eventServer = http.createServer((req, res) => {
  cors(req, res);

  // Handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // GET /api/events/student/{rollNumber}
  if (pathname.match(/^\/api\/events\/student\//) && req.method === 'GET') {
    const rollNumber = pathname.split('/').pop();
    console.log('[8082] GET /api/events/student/' + rollNumber);

    const studentEvents = events.filter(e => e.studentRollNumber === rollNumber);

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(studentEvents));
    return;
  }

  // Not found
  res.writeHead(404, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify({ error: 'Not found' }));
});

studentServer.listen(8081, () => {
  console.log('✓ Student Service running on http://localhost:8081');
});

eventServer.listen(8082, () => {
  console.log('✓ Event Service running on http://localhost:8082');
});

console.log('\n📝 Mock Backend Server Started\n');
console.log('Available endpoints:');
console.log('  POST http://localhost:8081/student/register');
console.log('  POST http://localhost:8081/student/login');
console.log('  GET  http://localhost:8082/api/events/student/{rollNumber}');
console.log('\nTest credentials:');
console.log('  Email: john@example.com');
console.log('  Password: password123');
console.log('\n');
