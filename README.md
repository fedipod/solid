# With Docker Compose

## Prerequisites

Install [Docker Desktop](https://docs.docker.com/get-docker) for Mac, Windows, or Linux. Docker Desktop includes Docker Compose as part of the installation.

## Production

First, run the production server:

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create solid

# Build
docker compose up
```

Open [http://localhost:4000](http://localhost:4000) or [http://localhost:3000](http://localhost:3000) with your browser to see the result.
