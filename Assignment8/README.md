# Assignment 8 – Secure RESTful APIs (Node.js, Express, MongoDB)

This project is a secure RESTful API built with Node.js, Express, and MongoDB. It includes user registration, login, and profile management with a focus on security best practices like password hashing, JWT authentication, and input validation.

## Features

- **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
- **Password Security**: Passwords are hashed using `bcryptjs` before being stored.
- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for user profiles.
- **Input Validation**: Server-side validation of user input using `express-validator`.
- **Secure Headers**: `helmet` is used to protect the app from common web vulnerabilities by setting appropriate HTTP headers.
- **File Uploads**: Supports user profile image uploads using `multer`.
- **API Documentation**: Interactive API documentation is available through Swagger UI.
- **Environment Variables**: Secure management of configuration and secrets using `.env` files.
- **CORS Ready**: Configured with the `cors` middleware to handle cross-origin requests.
- **Request Logging**: `morgan` is used for logging HTTP requests during development.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **bcryptjs**: Library for hashing passwords.
- **jsonwebtoken**: For creating and verifying JSON Web Tokens.
- **express-validator**: For data validation.
- **multer**: Middleware for handling `multipart/form-data`, used for file uploads.
- **helmet**: Middleware for securing Express apps.
- **dotenv**: For loading environment variables from a `.env` file.
- **Swagger UI Express**: For generating API documentation.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- MongoDB installed and running on your local machine or a connection string to a cloud instance.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/rushita-vachhani/INFO6150-Assignments.git
    cd assignment8
    ```

2.  **Install dependencies:**
    ```sh
    bash
    npm install
    ```

3.  **Create an environment file:**
    To create a file named `.env` in the root of the project, run below command.

    ```env
    cp .env.example .env
    ```

## Running the Application
-   **Test Mode**: To run the server with `nodemon` for automatic restarts on file changes:
    ```sh
    npm run dev
    ```

The server will start on the port specified in your `.env` file (e.g., `http://localhost:4000`).

## Available Scripts
- `npm run dev`: Starts the development server.
- `npm run lint`: Lints the project files using ESLint.

## API Documentation
Once the server is running, you can access the interactive API documentation at `http://localhost:4000/docs`.
