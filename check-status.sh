#!/bin/bash

# Quick status check for Nova server

PORT=3000

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔍 Checking Nova Server Status..."
echo "================================"

# Check if process is running
PROCESS=$(ps aux | grep "node.*next dev" | grep -v grep)
if [ ! -z "$PROCESS" ]; then
    PID=$(echo "$PROCESS" | awk '{print $2}')
    echo -e "Process: ${GREEN}✓ Running (PID: $PID)${NC}"
else
    echo -e "Process: ${RED}✗ Not running${NC}"
fi

# Check if port is listening
if lsof -ti:$PORT > /dev/null 2>&1; then
    echo -e "Port $PORT: ${GREEN}✓ Listening${NC}"
else
    echo -e "Port $PORT: ${RED}✗ Not listening${NC}"
fi

# Check HTTP response
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT 2>/dev/null)
if [ "$STATUS" = "200" ]; then
    echo -e "HTTP Status: ${GREEN}✓ OK ($STATUS)${NC}"
    echo -e "\n${GREEN}🚀 Server is RUNNING at http://localhost:$PORT${NC}"
else
    echo -e "HTTP Status: ${RED}✗ Failed (${STATUS:-No response})${NC}"
    echo -e "\n${RED}⚠️  Server is DOWN${NC}"
    echo ""
    echo "To start the server, run one of:"
    echo "  npm run dev"
    echo "  ./server-monitor.sh  (auto-restart)"
    exit 1
fi
