#!/bin/bash

# Student Event API - Manual Testing Script
# This script tests all endpoints with cURL commands
# Prerequisites: Backend services must be running on localhost:8081 and localhost:8082

echo "═══════════════════════════════════════════════════════════════"
echo "   Student Event Management - Endpoint Testing Script"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
STUDENT_SERVICE="http://localhost:8081"
EVENT_SERVICE="http://localhost:8082"

# Test data
ROLL_NUMBER="CS2021005"
STUDENT_EMAIL="testuser@example.com"
STUDENT_PASSWORD="testpass123"
STUDENT_NAME="Test User"

echo -e "${BLUE}Checking Backend Services...${NC}"
echo ""

# Check Student Service
if timeout 2 bash -c "</dev/tcp/localhost/8081" 2>/dev/null; then
    echo -e "${GREEN}✓ Student Service (localhost:8081)${NC} - Available"
else
    echo -e "${RED}✗ Student Service (localhost:8081)${NC} - Not running"
fi

# Check Event Service
if timeout 2 bash -c "</dev/tcp/localhost/8082" 2>/dev/null; then
    echo -e "${GREEN}✓ Event Service (localhost:8082)${NC} - Available"
else
    echo -e "${RED}✗ Event Service (localhost:8082)${NC} - Not running"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Test 1: Register Student
echo -e "${YELLOW}TEST 1: POST /student/register${NC}"
echo -e "${BLUE}Endpoint:${NC} POST $STUDENT_SERVICE/student/register"
echo -e "${BLUE}Purpose:${NC} Register a new student"
echo ""

echo "Request:"
cat << EOF
{
  "rollNumber": "$ROLL_NUMBER",
  "name": "$STUDENT_NAME",
  "email": "$STUDENT_EMAIL",
  "password": "$STUDENT_PASSWORD"
}
EOF

echo ""
echo "Running cURL command..."
echo ""

curl -X POST \
  "$STUDENT_SERVICE/student/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"rollNumber\": \"$ROLL_NUMBER\",
    \"name\": \"$STUDENT_NAME\",
    \"email\": \"$STUDENT_EMAIL\",
    \"password\": \"$STUDENT_PASSWORD\"
  }" \
  -w "\n\nHTTP Status: %{http_code}\n" \
  -s

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Test 2: Login Student
echo -e "${YELLOW}TEST 2: POST /student/login${NC}"
echo -e "${BLUE}Endpoint:${NC} POST $STUDENT_SERVICE/student/login"
echo -e "${BLUE}Purpose:${NC} Authenticate student and get roll number"
echo ""

echo "Request:"
cat << EOF
{
  "email": "$STUDENT_EMAIL",
  "password": "$STUDENT_PASSWORD"
}
EOF

echo ""
echo "Running cURL command..."
echo ""

LOGIN_RESPONSE=$(curl -X POST \
  "$STUDENT_SERVICE/student/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$STUDENT_EMAIL\",
    \"password\": \"$STUDENT_PASSWORD\"
  }" \
  -w "\nHTTP_STATUS:%{http_code}" \
  -s)

echo "$LOGIN_RESPONSE"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Test 3: Get Events by Student
echo -e "${YELLOW}TEST 3: GET /api/events/student/{rollNumber}${NC}"
echo -e "${BLUE}Endpoint:${NC} GET $EVENT_SERVICE/api/events/student/$ROLL_NUMBER"
echo -e "${BLUE}Purpose:${NC} Fetch all events registered by a student"
echo -e "${BLUE}URL Parameter:${NC} rollNumber=$ROLL_NUMBER"
echo ""

echo "Running cURL command..."
echo ""

curl -X GET \
  "$EVENT_SERVICE/api/events/student/$ROLL_NUMBER" \
  -H "Content-Type: application/json" \
  -w "\n\nHTTP Status: %{http_code}\n" \
  -s

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

echo -e "${BLUE}Testing Complete!${NC}"
echo ""
echo "Summary of Endpoints Tested:"
echo "  1. POST   /student/register        - Register new student"
echo "  2. POST   /student/login            - Login and authenticate"
echo "  3. GET    /api/events/student/{id}  - Fetch student events"
echo ""
echo "Notes:"
echo "  • Student Service runs on port 8081 (with proxy)"
echo "  • Event Service runs on port 8082 (direct URL)"
echo "  • Session storage preserves data between Login and Events pages"
echo ""
