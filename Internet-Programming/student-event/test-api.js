#!/usr/bin/env node

/**
 * Student Event API - Node.js Test Runner
 * 
 * This script tests all API endpoints against live backend services
 * Usage: node test-api.js
 * 
 * Prerequisites:
 *   - Student Service running on http://localhost:8081
 *   - Event Service running on http://localhost:8082
 *   - Node.js with native fetch support (v18+) or install node-fetch
 */

const http = require('http');

// Configuration
const STUDENT_SERVICE = 'http://localhost:8081';
const EVENT_SERVICE = 'http://localhost:8082';

// Test data
const TEST_DATA = {
  rollNumber: 'CS2021005',
  email: 'testuser@example.com',
  password: 'testpass123',
  name: 'Test User'
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(color, ...args) {
  console.log(`${color}${args.join(' ')}${colors.reset}`);
}

function header(text) {
  console.log('');
  log(colors.cyan, '═════════════════════════════════════════════════════════════════');
  log(colors.cyan, text);
  log(colors.cyan, '═════════════════════════════════════════════════════════════════');
  console.log('');
}

function makeRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const isHttps = parsedUrl.protocol === 'https:';
    const client = isHttps ? require('https') : http;

    const requestOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = client.request(parsedUrl, requestOptions, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: responseData
        });
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function checkService(host, port) {
  return new Promise((resolve) => {
    const req = http.request(`http://${host}:${port}`, { method: 'HEAD' }, () => {
      resolve(true);
    });

    req.on('error', () => {
      resolve(false);
    });

    req.end();
  });
}

async function runTests() {
  console.log('');
  log(colors.cyan + colors.bright, '    Student Event Management - API Testing');
  log(colors.cyan + colors.bright, '         Endpoint Validation Suite');
  console.log('');

  // Check services
  log(colors.blue, 'Checking Backend Services...');
  console.log('');

  const studentServiceAvailable = await checkService('localhost', 8081);
  const eventServiceAvailable = await checkService('localhost', 8082);

  log(
    studentServiceAvailable ? colors.green : colors.red,
    `${studentServiceAvailable ? '✓' : '✗'} Student Service (localhost:8081) - ${studentServiceAvailable ? 'Available' : 'Not responding'}`
  );

  log(
    eventServiceAvailable ? colors.green : colors.red,
    `${eventServiceAvailable ? '✓' : '✗'} Event Service (localhost:8082) - ${eventServiceAvailable ? 'Available' : 'Not responding'}`
  );

  console.log('');

  // Test 1: Register Student
  header('TEST 1: POST /student/register');
  log(colors.blue, 'Endpoint: POST /student/register');
  log(colors.blue, 'Purpose: Register a new student');
  log(colors.blue, 'Service: Student Service (port 8081)');
  console.log('');

  log(colors.white, 'Request Body:');
  console.log(JSON.stringify({
    rollNumber: TEST_DATA.rollNumber,
    name: TEST_DATA.name,
    email: TEST_DATA.email,
    password: TEST_DATA.password
  }, null, 2));

  console.log('');
  log(colors.green, 'Response:');

  try {
    const registerResponse = await makeRequest(
      `${STUDENT_SERVICE}/student/register`,
      { method: 'POST' },
      {
        rollNumber: TEST_DATA.rollNumber,
        name: TEST_DATA.name,
        email: TEST_DATA.email,
        password: TEST_DATA.password
      }
    );

    log(colors.green, `Status: ${registerResponse.statusCode}`);
    if (registerResponse.body) {
      try {
        console.log(JSON.stringify(JSON.parse(registerResponse.body), null, 2));
      } catch {
        console.log(registerResponse.body);
      }
    }
  } catch (error) {
    log(colors.red, `Error: ${error.message}`);
  }

  // Test 2: Login Student
  header('TEST 2: POST /student/login');
  log(colors.blue, 'Endpoint: POST /student/login');
  log(colors.blue, 'Purpose: Authenticate student and get roll number');
  log(colors.blue, 'Service: Student Service (port 8081)');
  console.log('');

  log(colors.white, 'Request Body:');
  console.log(JSON.stringify({
    email: TEST_DATA.email,
    password: TEST_DATA.password
  }, null, 2));

  console.log('');
  log(colors.green, 'Response:');

  try {
    const loginResponse = await makeRequest(
      `${STUDENT_SERVICE}/student/login`,
      { method: 'POST' },
      {
        email: TEST_DATA.email,
        password: TEST_DATA.password
      }
    );

    log(colors.green, `Status: ${loginResponse.statusCode}`);
    if (loginResponse.body) {
      try {
        const parsedResponse = JSON.parse(loginResponse.body);
        console.log(JSON.stringify(parsedResponse, null, 2));
        
        if (parsedResponse.student && parsedResponse.student.rollNumber) {
          log(colors.cyan, `Extracted Roll Number: ${parsedResponse.student.rollNumber}`);
        }
      } catch {
        console.log(loginResponse.body);
      }
    }
  } catch (error) {
    log(colors.red, `Error: ${error.message}`);
  }

  // Test 3: Get Events by Student
  header('TEST 3: GET /api/events/student/{rollNumber}');
  log(colors.blue, 'Endpoint: GET /api/events/student/{rollNumber}');
  log(colors.blue, 'Purpose: Fetch all events registered by a student');
  log(colors.blue, 'Service: Event Service (port 8082)');
  log(colors.blue, `URL Parameter: rollNumber=${TEST_DATA.rollNumber}`);
  console.log('');

  log(colors.green, 'Response:');

  try {
    const eventsResponse = await makeRequest(
      `${EVENT_SERVICE}/api/events/student/${TEST_DATA.rollNumber}`,
      { method: 'GET' }
    );

    log(colors.green, `Status: ${eventsResponse.statusCode}`);
    if (eventsResponse.body) {
      try {
        console.log(JSON.stringify(JSON.parse(eventsResponse.body), null, 2));
      } catch {
        console.log(eventsResponse.body);
      }
    }
  } catch (error) {
    log(colors.red, `Error: ${error.message}`);
  }

  // Summary
  header('Testing Complete');
  log(colors.white, 'Summary of Endpoints Tested:');
  console.log('  1. POST   /student/register        - Register new student');
  console.log('  2. POST   /student/login            - Login and authenticate');
  console.log('  3. GET    /api/events/student/{id}  - Fetch student events');
  console.log('');
  log(colors.white, 'Notes:');
  console.log('  • Student Service runs on port 8081 (with proxy)');
  console.log('  • Event Service runs on port 8082 (direct URL)');
  console.log('  • Session storage preserves data between Login and Events pages');
  console.log('');
}

runTests().catch(error => {
  log(colors.red, 'Fatal error:', error.message);
  process.exit(1);
});
