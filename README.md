# MERN CRUD Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Backend](#backend)
  - [Controllers](#controllers)
  - [Middleware](#middleware)
  - [Routes](#routes)
  - [Models](#models)
- [Frontend](#frontend)
  - [Services (APIs)](#services-apis)
  - [Pages](#pages)
- [Running the Application](#running-the-application)

## Introduction
This is a simple CRUD (Create, Read, Update, Delete) application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application is divided into two main directories: `backend` and `frontend`.

## Features
- Create, Read, Update, and Delete operations for a sample data model.
- RESTful API on the backend.
- Responsive UI on the frontend.

## Technologies Used
- MongoDB
- Express.js
- React.js
- Node.js

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/chmuhammadasim/MERN-CRUD.git
    cd your-repo-name
    ```

2. Install dependencies for both backend and frontend:
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

## Backend
The backend directory contains the server-side code, structured as follows:
```
backend/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── app.js
```

### Controllers
`controllers`
- Contains functions to handle requests for CRUD operations.

### Middleware
`middleware`
- Contains middleware functions for request validation and authorization.

### Routes
`routes`
- Defines the API endpoints and associates them with controller functions.

### Models
`models`
- Defines the Mongoose schema and model for the application data.

## Frontend
The frontend directory contains the client-side code, structured as follows:
```
frontend/
│
├── src/
│   ├── services/
│   │   └── api.js
│   ├── pages/
│   ├── App.js
│   └── ...
├── public/
│   └── index.html
└── package.json
```

### Services (APIs)
`src/services/api.js`
- Contains functions to make API requests to the backend.

### Pages
`src/pages/`
- Contains React components representing different pages of the application.

## Running the Application
1. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

2. Start the frontend development server:
    ```bash
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.
