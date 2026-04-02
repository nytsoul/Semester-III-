# Student Event API - Manual Testing Script (PowerShell)
# This script tests all endpoints with Invoke-WebRequest
# Prerequisites: Backend services must be running on localhost:8081 and localhost:8082

Write-Host "═════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   Student Event Management - Endpoint Testing Script" -ForegroundColor Cyan
Write-Host "═════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Configuration
$STUDENT_SERVICE = "http://localhost:8081"
$EVENT_SERVICE = "http://localhost:8082"

# Test data
$ROLL_NUMBER = "CS2021005"
$STUDENT_EMAIL = "testuser@example.com"
$STUDENT_PASSWORD = "testpass123"
$STUDENT_NAME = "Test User"

Write-Host "Checking Backend Services..." -ForegroundColor Blue
Write-Host ""

# Check Student Service
try {
    $testConn = Test-NetConnection -ComputerName localhost -Port 8081 -WarningAction SilentlyContinue
    if ($testConn.TcpTestSucceeded) {
        Write-Host "✓ Student Service (localhost:8081) - Available" -ForegroundColor Green
    } else {
        Write-Host "✗ Student Service (localhost:8081) - Not responding" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Student Service (localhost:8081) - Error" -ForegroundColor Red
}

# Check Event Service
try {
    $testConn = Test-NetConnection -ComputerName localhost -Port 8082 -WarningAction SilentlyContinue
    if ($testConn.TcpTestSucceeded) {
        Write-Host "✓ Event Service (localhost:8082) - Available" -ForegroundColor Green
    } else {
        Write-Host "✗ Event Service (localhost:8082) - Not responding" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Event Service (localhost:8082) - Error" -ForegroundColor Red
}

Write-Host ""
Write-Host "═════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Test 1: Register Student
Write-Host "TEST 1: POST /student/register" -ForegroundColor Yellow
Write-Host "Endpoint: POST $STUDENT_SERVICE/student/register" -ForegroundColor Blue
Write-Host "Purpose: Register a new student" -ForegroundColor Blue
Write-Host ""

Write-Host "Request Body:" -ForegroundColor White
$registerBody = @{
    rollNumber = $ROLL_NUMBER
    name = $STUDENT_NAME
    email = $STUDENT_EMAIL
    password = $STUDENT_PASSWORD
} | ConvertTo-Json
Write-Host $registerBody

Write-Host ""
Write-Host "Response:" -ForegroundColor Green

try {
    $response = Invoke-WebRequest -Uri "$STUDENT_SERVICE/student/register" `
        -Method POST `
        -Headers @{"Content-Type" = "application/json"} `
        -Body $registerBody `
        -UseBasicParsing
    
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host ($response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3)
} catch {
    $errorResponse = $_.Exception.Response
    Write-Host "Status Code: $($errorResponse.StatusCode)" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "═════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Test 2: Login Student
Write-Host "TEST 2: POST /student/login" -ForegroundColor Yellow
Write-Host "Endpoint: POST $STUDENT_SERVICE/student/login" -ForegroundColor Blue
Write-Host "Purpose: Authenticate student and get roll number" -ForegroundColor Blue
Write-Host ""

Write-Host "Request Body:" -ForegroundColor White
$loginBody = @{
    email = $STUDENT_EMAIL
    password = $STUDENT_PASSWORD
} | ConvertTo-Json
Write-Host $loginBody

Write-Host ""
Write-Host "Response:" -ForegroundColor Green

try {
    $response = Invoke-WebRequest -Uri "$STUDENT_SERVICE/student/login" `
        -Method POST `
        -Headers @{"Content-Type" = "application/json"} `
        -Body $loginBody `
        -UseBasicParsing
    
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    $loginResponseData = $response.Content | ConvertFrom-Json
    Write-Host ($loginResponseData | ConvertTo-Json -Depth 3)
    
    # Extract RollNumber for next test
    $extractedRollNumber = $loginResponseData.student.rollNumber
    Write-Host ""
    Write-Host "Extracted Roll Number: $extractedRollNumber" -ForegroundColor Cyan
} catch {
    $errorResponse = $_.Exception.Response
    Write-Host "Status Code: $($errorResponse.StatusCode)" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "═════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Test 3: Get Events by Student
Write-Host "TEST 3: GET /api/events/student/{rollNumber}" -ForegroundColor Yellow
Write-Host "Endpoint: GET $EVENT_SERVICE/api/events/student/$ROLL_NUMBER" -ForegroundColor Blue
Write-Host "Purpose: Fetch all events registered by a student" -ForegroundColor Blue
Write-Host "URL Parameter: rollNumber=$ROLL_NUMBER" -ForegroundColor Blue
Write-Host ""

Write-Host "Response:" -ForegroundColor Green

try {
    $response = Invoke-WebRequest -Uri "$EVENT_SERVICE/api/events/student/$ROLL_NUMBER" `
        -Method GET `
        -Headers @{"Content-Type" = "application/json"} `
        -UseBasicParsing
    
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    $eventsData = $response.Content | ConvertFrom-Json
    Write-Host ($eventsData | ConvertTo-Json -Depth 3)
} catch {
    $errorResponse = $_.Exception.Response
    Write-Host "Status Code: $($errorResponse.StatusCode)" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "═════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "Testing Complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary of Endpoints Tested:" -ForegroundColor White
Write-Host "  1. POST   /student/register        - Register new student"
Write-Host "  2. POST   /student/login            - Login and authenticate"
Write-Host "  3. GET    /api/events/student/{id}  - Fetch student events"
Write-Host ""
Write-Host "Notes:" -ForegroundColor White
Write-Host "  • Student Service runs on port 8081 (with proxy)"
Write-Host "  • Event Service runs on port 8082 (direct URL)"
Write-Host "  • Session storage preserves data between Login and Events pages"
Write-Host ""
