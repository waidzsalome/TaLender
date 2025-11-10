# System description

# CONTAINERS

## CONTAINER_NAME: Talender_Client-FE

### USER STORIES:

### PORTS:

5173:5173

### DESCRIPTION:

- Provides the user interface for the Talender application for both public and authenticated users.

### PERSISTANCE EVALEVALUATION

The Client-FE container does not include a database.

### EXTERNAL SERVICES SERVICES CONNECTIONS

The Farmer-FE container connect to Talender-BE using Restful API and Socket.

### MICROSERVICES:

#### MICROSERVICE: client-fe

- TYPE: frontend
- DESCRIPTION: This microservice serves the main user interface for the customer.
- PORTS: 5173
- TECHNOLOGICAL SPECIFICATION:

### TECHNOLOGICAL SPECIFICATION:

- **Framework and Tools**

  - **React** – Provides a component-based framework for building dynamic, reusable, and maintainable user interfaces.

  - **Vite** – A modern build tool offering fast development with hot module replacement (HMR) and efficient production bundling.
  - **Material UI (MUI)** – Ensures a consistent, accessible, and responsive design system aligned with modern UI standards.

- State and Data Management

  - Utilizes **React Hooks API** to manage local states and data flow.

- Network Communication

  - **Axios** handles RESTful communication with backend microservices. Includes **interceptors** for attaching tokens and handling expired token s.
  - **Socket.io** enables real-time bidirectional communication for the chat page.

- Authentication

  - Integrated **Google OAuth 2.0** for secure user login and token-based session handling.

- Environment and Deployment

  - **Development:** Vite Dev Server with hot module replacement (HMR), API mocking, and linting.
  - **Production:** Code-splitting and optimization, built static assets served via **Nginx** in a **Docker container**.
  - Supports environment-based configuration through `.env` files.

6. **Infrastructure**
   - Designed as an independent **frontend microservice**.
   - Communicates asynchronously with distributed backend containers (Auth, User, Interest, Matching, Chat).
   - Fully compatible with **Infrastructure as Code (IaC)** practices.

### Front-end ARCHITECTURE:

The frontend microservice follows a layered architecture to ensure modularity, maintainability, and scalability.  
Each layer is responsible for a specific aspect of the client-side system.

1. **Business Layer**

   - Contains all main UI pages: **MainPage**, **ProfilePage**, **ModifySkills**, **SwipePage**, and **ChatPage**.
   - Includes shared UI components (Header, Footer) and third-party libraries (Material UI).
   - Manages routing and navigation with **public** and **protected routes**, ensuring secure access control.

2. **Data Layer**

   - Manages data flow and UI state through **React Hooks** and **Contexts**.
   - Synchronizes local and remote data, handling updates triggered by user actions or API responses.
   - Provides reactive rendering and state isolation for each component.

3. **Network Layer**

   - Responsible for all communication with backend services.
   - Uses **Axios** for RESTful requests and custom interceptors for token injection and error handling.
   - Implements **Socket.io** for real-time bidirectional communication in the chat module.
   - Ensures seamless integration with distributed backend microservices (Auth, User, Interest, Matching, Chat).

4. **Build Layer (Vite)**

   - **Development Mode:** Provides fast HMR (Hot Module Replacement), linting, and API mocking for local testing.
   - **Production Mode:** Performs code splitting, asset optimization, and containerized deployment with **Docker**.
   - Environment-based configuration enables easy transitions between dev/test/prod environments.

5. **Integration with Browser and Backend**
   - The system runs entirely in the browser, delivering dynamic HTML/CSS/JS content.
   - Interacts asynchronously with backend APIs, authentication gateways, and WebSocket servers.
   - This separation ensures independent development, deployment, and scaling of frontend and backend components.

- ROUTES and PAGES:

  | Name/Routers   | Description                                                                                                                                                                                                                     | Related BE Modules | User Stories |
  | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------ |
  | /mainpage      | The public landing page of the application. It introduces the application, allows users to search their interests, and provides navigation to other main features.                                                              |                    |              |
  | /loginrequired | The access control page shown when a user is not loged in, lacks permission, or their token has expired. It prompts the user to log in through Google or return to the homepage.                                                |                    |              |
  | /profilepage   | Displays and manages the user’s personal information. Users can edit their name, age, location and log out, or delete their account. And when user want to edit their interests and talents, guide user to jump to tailoredpage |                    |              |
  | /swipepage     | Displays user cards based on shared interests or skills. Users can view brief profiles and decide to connect or skip by swiping or clicking “Yes”/“No.” The matching logic is driven by user interests and location data.       |                    |              |
  | /tailoredpage  | Displays categorized lists of interests and talents. Users can search through filter and keywords, click existing tags to add them to their profile, or create a new skill if their interests are not listed.                   |                    |              |
  | /chatpage      | Users can select a matched contact to view conversation history and exchange messages through a WebSocket connection.                                                                                                           |                    |              |
