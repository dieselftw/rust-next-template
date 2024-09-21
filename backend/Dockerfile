# Use the official Rust image
FROM rust:1.78-slim-buster

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the entire project
COPY . .

# Install any neaeded packages specified in Cargo.toml
RUN cargo build

# Set environment variable for logging
ENV RUST_LOG=info

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["cargo", "run"]
