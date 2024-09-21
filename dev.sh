#!/bin/bash

# Enable BuildKit
export DOCKER_BUILDKIT=1

# Function to display a loading bar
loading_bar() {
    local -r duration=$1
    local -r interval=0.1
    local -r total=$((duration / interval))
    local -r progress_width=50

    echo -n "["
    for ((i=0; i<=total; i++)); do
        echo -n "#"
        sleep $interval
    done
    echo "] Done!"
}

# Function to cleanup and exit
cleanup() {
    echo -e "\nTearing down containers..."
    docker compose down
    echo "Containers stopped and removed."
    exit 0
}

# Trap Ctrl+C (SIGINT) and call cleanup function
trap cleanup SIGINT

# Build and run Docker containers
echo "Building and starting Docker containers..."
loading_bar 5  # Show loading bar for 5 seconds

docker compose up --build -d

# Wait for containers to start
echo -n "Waiting for containers to start"
for i in $(seq 1 5); do
    echo -n "."
    sleep 1
done
echo ""

# Print container status
docker compose ps

# Display application URLs
echo -e "\nYour application is now running!"
echo -e "Frontend: \033[1;34mhttp://localhost:3000\033[0m"
echo -e "Backend: \033[1;34mhttp://localhost:8080\033[0m"

echo -e "\nPress Ctrl+C to stop the application and tear down containers."

# Keep the script running
while true; do
    sleep 1
done
