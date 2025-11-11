# TaLender — Full Stack Application

This repository contains the **TaLender** system — a full-stack Node.js + React application that handles authentication, chat communication, and user matching logic.  
The system is containerized with **Docker** for easy setup and reproducibility.
---

## Requirements

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)


---

## Setup and Run

1. **Clone the repository**

   ```bash
   git clone <your_repo_url>
   cd <project_root>
2. **Configure environment variables**

   The backend (`Talender-Server`) requires environment variables for authentication, database connection, and third-party integrations.

   - Copy the example environment file:
     ```bash
     cp Talender-Server/.env.example Talender-Server/.env
     ```

   - Open the new `.env` file and replace the placeholder values with your own credentials:
     ```env
     SECRET_KEY=your_secret_key_here
     DB_URL=your_mongodb_atlas_connection_string
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     ```

3. **Build and start the containers**

   From the project root directory, run:
   ```bash
   docker compose up --build
