<system of the system>

# System description

# USER STORIES:

1 As a user, I want to create an account, so that I can access the website
2 As a user, I want to login my account, so that I can use the website
3 As a user, I want to modify my account's data
4 As a user, I want to access the main page, so that I can see the entrance of all other pages.
5 As a user, I want to modify the skills I am offering on the website
6 As a user, I want to delete my account
7 As user, I want to select the skills I am interested in
8 As a user, I want to report inappropriate content, so that it's removed
9 As a moderator, I want to be able to remove inappropriate content, so that the website is more secure
10 As a user, I want to be shown skills I'm interested in, so that I can choose one
11 As a user, I want to filter skills, so that they are more relevant
12 As a user, I want to sort skills, so that I get the more important ones first
13 As a user, I want to be presented with accounts one by one, so that I can pick each one by swiping
14 As a user, I want to be able to instant chatting with accounts I have matched
15 As a user, I want to receive a notification if I have a "match"
16 As a moderator, I want to be able to delete accounts, so that the website is more secure
17 As a user, I want to be able to log out
18 As a user, I want to share my location if I choose to meet talented people in person.
19 As a user, I want to be able to edit my interests and filters
20 As a user, I want to be able to message other users, so that I can meet them.

# CONTAINERS:

## CONTAINER NAME:

BACKEND

### PORTS:

3000

### DESCRIPTION:

This container hosts the full backend logic of the system, handling authentication, user data, chat communication, and client API requests within a single Node.js runtime.
It provides both REST and WebSocket interfaces and connects remotely to a MongoDB Atlas instance.

### USER STORIES:

1 As a user, I want to create an account, so that I can access the website
2 As a user, I want to login my account, so that I can use the website
3 As a user, I want to modify my account's data
5 As a user, I want to modify the skills I am offering on the website
6 As a user, I want to delete my account
7 As user, I want to select the skills I am interested in
10 As a user, I want to be shown users I'm interested in, so that I can choose one
11 As a user, I want to filter skills, so that they are more relevant
12 As a user, I want to sort skills, so that I get the more important ones first
14 As a user, I want to be able to instant chatting with accounts I have matched
17 As a user, I want to be able to log out
18 As a user, I want to share my location if I choose to meet talented people in person.
19 As a user, I want to be able to edit my interests and filters
20 As a user, I want to be able to message other users, so that I can meet them.

### PERSISTENCE EVALUATION:

No local data persistence.
All data is stored remotely in MongoDB Atlas.

### EXTERNAL SERVICE CONNECTIONS

MongoDB Atlas: for persistent data storage.
Google OAuth 2.0: for third-party authentication.

### MICROSERVICES (Logical Modules):

### MODULE: auth

- TYPE: Backend module (Express + Passport + JWT).
- DESCRIPTION: Handles user authentication and authorization.
- TECHNOLOGICAL SPECIFICATION:
  This module is developed in JavaScript. It uses the following technologies: - bcrypt: Allows for creating and storing encrypted passwords, using salt as a deterrant to dictionary attacks. - jwt: Used for Json Web Tokens, which allow secure authentication. - passport: Allows for quick and reliable google authentication.
  In addition to this, a middleware componenent, using the same technologies, secures all protected routes by verifying JWTs and checking against a Blacklist collection in MongoDB.
  Revoked tokens (e.g., after logout) are stored and blocked from reuse, ensuring session invalidation and enhanced security.
  This mechanism prevents unauthorized access even if a token is stolen or manually reused.

- SERVICE ARCHITECTURE:
  The authentication module exposes REST endpoints via Express and integrates with Passport for both local and Google OAuth strategies.
  When a user logs in, credentials are verified using bcrypt and a JWT is issued, signed with a secret key.
  All protected routes depend on an authentication middleware that: - Extracts and verifies the JWT from the request header. - Checks the token’s validity against the Blacklist collection in MongoDB. - Attaches the corresponding user object to req.user if valid.
  Sessions from Google OAuth are serialized/deserialized using Passport’s built-in session handlers.
  Token revocation is handled by inserting invalidated tokens into the Blacklist, ensuring stateless yet secure session management.

Inter-module communication:
Uses the database module for user lookups and account creation.
Provides identity verification for chat and front-end modules through middleware injection.

### ENDPOINTS:

| HTTP METHOD | URL | Description | User Stories |
| POST | /login | Validate credentials and return a JWT. | 2 |
| POST | /register | Create new user and account. | 1 |
| GET | /auth/google | Redirect to Google login. | 1, 2 |
| GET | /auth/google/callback | OAuth callback handler. | 1, 2 |
| POST | /api/logout | Invalidate a JWT and blacklist it. | 17 |

- DB STRUCTURE:
  **_<USER>_** : | **_id_** | **username** | **email** | **first_name** | **last_name** | **moderator** | **location** | **age** | **sharedLocation** | **avatarLink** | **skills** | **interests**

### MODULE: database

- TYPE: Backend module (Mongoose ODM).
- DESCRIPTION: Handles all CRUD operations for all collections in the Database
- TECHNOLOGICAL SPECIFICATION:
  The module connects to the MongoDB Atlas throgh mongoose, a JavaScript library. It uses UUIDs for internal user and chat identification
- SERVICE ARCHITECTURE:
  Initializes a single Mongoose connection to MongoDB Atlas and defines all models.
  Uses UUIDv4 for non-sequential IDs to avoid collisions and ensure cross-collection uniqueness.
  Indexes are configured on fields such as email, id, and chatId to improve query performance.
  Inter-module communication:
  Consumed by all other modules for CRUD operations and lookups.
  Exposes no HTTP endpoints; acts as an internal dependency.

### ENDPOITS:

No endpoints are necessary for this module

### MODULE: chat

- TYPE: Real-time backend module (Socket.io).
- DESCRIPTION: Manages WebSocket-based real-time communication.
- TECHONOLOGICAL SPECIFICATION:
  This module uses socket.io, a JavaScript library which allows to instantiate a pool of real-time rooms, which allow users to send and receive messages in real time using events instead of direct messages.
  This implementation avoids having to periodically fetch chat data, since whenever a new message is sent, an event is generated for all the users in the chat room.
- SERVICE ARCHITECTURE:
  Hybrid system combining Express endpoints and Socket.io for real-time messaging. When a message is sent via POST /api/messages/send, the module: - Stores the message in the Message collection using database. - Emits a newMessage event through Socket.io to all connected users in that chat room. - Updates the corresponding Chat document’s last_message field.
  Clients join rooms identified by chatId.
  This architecture ensures low-latency communication while persisting all messages to MongoDB for reliability.
  Inter-module communication:
  Relies on auth middleware for socket authentication.
  Uses database for all persistent message storage and retrieval.

### ENDPOINTS:

| HTTP METHOD | URL | Description | User Stories |
| POST | /api/messages/send | Send message via socket. | 20 |
| POST | /api/chats | Create new chat and notify participants. | 14 |
| GET | /api/chats/user | Return all chats containing a particular user. | 14 |
| GET | /api/messages | Given a chatId, return its corresponding chat's content. | 20 |

- DB STRUCTURE:
  **_<USER>_** : | **_id_** | **id** | **username** | **email** | **first_name** | **last_name** | **moderator** | **location** | **age** | **sharedLocation** | **avatarLink** | **skills** | **interests**
  **_<CHAT>_** : | **_id_** | **chatId** | **partecipants** | **last_message**
  **_<MESSAGE>_** : | **_id_** | **chatId** | **senderId** | **text** | **createdAt**

### MODULE: front-end

- TYPE: Backend module (Express API).
- DESCRIPTION: Manages user queries, preferences, and recommendations.
- TECHONOLOGICAL SPECIFICATION:
  The module uses Express, a JavaScript library used to manage GET and POST requests. The module allows connection from a set of designated ports (following CORS policy), and uses the mongoose built in functions to fetch the necessary data and send a response to the client.
- SERVICE ARCHITECTURE:
  Implements modular Express routers grouped by domain (user, skill, preference, category).
  Each route validates the JWT through the shared auth middleware before processing.
  The service retrieves and manipulates user data through the database module using Mongoose queries.
  It exposes endpoints for profile management, skill selection, and recommendation logic.
  Recommendations are computed dynamically by comparing user preferences and skill overlaps (e.g., shared categories or reciprocal likes).
  All requests are subject to CORS restrictions, allowing only approved frontend origins.
  Inter-module communication:
  Uses auth for request authentication and user identity.
  Uses database for data retrieval, mutation, and aggregation.

### ENDPOINTS:

| HTTP METHOD | URL | Description | User Stories |
| GET | /api/user/search-by-id/:id | Fetch user info. | 3, 5, 6, 7, 10, 14, 17, 18, 19, 20 |
| POST | /api/edit-user | Edit the information shared by the user. | 18, 19 |
| POST | /api/delete-user | Delete a user and all their related data. | 6 |
| POST | /api/user/preference | Like/dislike users and form matches. | 10, 14|
| GET | /api/recommendedUsers | Suggest compatible users. | 10 |
| GET | /api/skills | Fetch skills (optionally filtered by category). | 11, 12 |
| GET | /api/categories | Fetch all categories. | 11 |
| POST | /api/skills/add | Add a new skill. | 7 |
| POST | /api/user-skills/add | Adds a new skill to a user’s profile. | 19 |
| GET | /api/categories-with-skills | Get categories with related skills. | 7, 11, 12 |
| GET | /api/user/:id/skills| Return all the skills selected by a user. | 10 |

- DB STRUCTURE:
  **_<USER>_** : | **_id_** | **id** | **username** | **email** | **first_name** | **last_name** | **moderator** | **location** | **age** | **sharedLocation** | **avatarLink** | **skills** | **interests**
  **_<CATEGORY>_** : | **_id_** | **id** | **name** | **slug**
  **_<ACCOUNT>_** : | **_id_** | **email** | **username** | **passeord** | **token**
  **_<SKILL>_** : | **_id_** | **id** | **name** | **slug** | **categories**
  **_<PREFERENCE>_** : | **_id_** | **fromUserId** | **toUserId** | **value**

### CONTAINER ARCHITECTURE:

The application runs within a single Express-based Node.js container, organized into modular route groups and socket handlers. This means the modules are only separated logically, as they share both the Javascript runtime, and the port.

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

## <other containers>
