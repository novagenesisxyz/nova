#!/bin/bash

# Nova Server Monitor - Keeps the dev server running
# Usage: ./server-monitor.sh

PORT=3000
LOG_FILE="server-monitor.log"
SERVER_LOG="server.log"
CHECK_INTERVAL=10  # seconds
RESTART_DELAY=5    # seconds before restart

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Nova Server Monitor Started${NC}"
echo "Monitoring port $PORT - Press Ctrl+C to stop"
echo "Logs: $LOG_FILE"
echo "---"

# Function to check if server is running
check_server() {
    curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT 2>/dev/null
}

# Function to kill existing server
kill_server() {
    echo -e "${YELLOW}Stopping existing server...${NC}"
    lsof -ti:$PORT | xargs kill -9 2>/dev/null
    sleep 2
}

# Function to start server
start_server() {
    echo -e "${GREEN}Starting Nova server...${NC}"
    echo "[$(date)] Starting server" >> $LOG_FILE

    # Start the dev server with increased memory
    NODE_OPTIONS="--max-old-space-size=4096" npm run dev > $SERVER_LOG 2>&1 &
    SERVER_PID=$!

    # Wait for server to be ready
    echo -n "Waiting for server to start"
    for i in {1..30}; do
        sleep 1
        echo -n "."
        if [ "$(check_server)" = "200" ]; then
            echo -e "\n${GREEN}✅ Server is running (PID: $SERVER_PID)${NC}"
            echo "[$(date)] Server started successfully (PID: $SERVER_PID)" >> $LOG_FILE
            return 0
        fi
    done

    echo -e "\n${RED}Failed to start server${NC}"
    echo "[$(date)] Failed to start server" >> $LOG_FILE
    return 1
}

# Function to monitor server
monitor_server() {
    while true; do
        STATUS=$(check_server)

        if [ "$STATUS" != "200" ]; then
            echo -e "${RED}⚠️  Server is down (Status: $STATUS)${NC}"
            echo "[$(date)] Server down detected (Status: $STATUS)" >> $LOG_FILE

            kill_server

            echo "Waiting $RESTART_DELAY seconds before restart..."
            sleep $RESTART_DELAY

            if start_server; then
                echo -e "${GREEN}Server restarted successfully${NC}"
            else
                echo -e "${RED}Failed to restart server - will retry${NC}"
            fi
        else
            echo -e "${GREEN}✓${NC} Server healthy [$(date '+%H:%M:%S')]"
        fi

        sleep $CHECK_INTERVAL
    done
}

# Cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down monitor...${NC}"
    kill_server
    echo -e "${GREEN}Monitor stopped${NC}"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Main execution
echo "[$(date)] Monitor started" >> $LOG_FILE

# Kill any existing server
kill_server

# Start server for the first time
if start_server; then
    # Start monitoring
    monitor_server
else
    echo -e "${RED}Failed to start initial server${NC}"
    exit 1
fi
