#!/bin/bash

# Enable BuildKit
export DOCKER_BUILDKIT=1

# Function to cleanup and exit
cleanup() {
    echo "Tearing down containers..."
    docker compose down
    echo "Containers stopped and removed."
    exit 0
}

# Trap Ctrl+C (SIGINT) and call cleanup function
trap cleanup SIGINT

# Build and run Docker containers
docker compose up --build -d

# Wait for containers to start
echo "Waiting for containers to start..."
sleep 5

# Print container status
docker compose ps

echo "Your application is now running!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:8080"

echo "Press Ctrl+C to stop the application and tear down containers."

# Keep the script running
while true; do
    sleep 1
done
