# Todo List API

A robust, secure, and scalable RESTful API for managing todo lists. Built with cutting-edge technologies and designed for ease of use.

## Features

- Google Authentication: Securely authenticate users with Google OAuth 2.0.
- JWT-based Authorization: Protect API routes with JSON Web Tokens (JWT) for enhanced security.
- Todo List Management: Create, read, update, and delete (CRUD) todo lists and tasks.
- Task Assignment: Assign tasks to specific users for efficient collaboration.

# Technologies Used

- Node.js: Built on top of Node.js for fast and scalable server-side development.
- Nest.js: Leveraging the powerful Nest.js framework for building efficient, scalable, and maintainable RESTful APIs.
- TypeScript: Utilizing TypeScript for statically typed, maintainable, and efficient code.
- OAuth 2.0: Implementing OAuth 2.0 for secure, standardized authentication.
- MongoDB: Utilizing MongoDB for efficient and scalable data storage.
- Mongoose: Using Mongoose for seamless interaction with the MongoDB database.

## API Endpoints
```

- POST /google: #Authenticate with Google OAuth 2.0.
- POST /signup: #Create a new user account, returning a JWT token and refresh token for API access.
- POST /signin: #Sign in to an existing user account, returning a JWT token and refresh token for API access.
- POST /refresh: #Obtain a new JWT token using a valid refresh token. Returns a new JWT token and refresh token.
- POST /tasks/createtask: #Create a new todo list.
- GET /tasks/getTasks: #Retrieve a list of todo lists.
- GET /tasks/:id: #Retrieve a specific todo list.
- GET /tasks?status=status: #Retrieve tasks by status. Query parameter: status (string).
- PATCH /tasks/:id: #Update a todo list.
- DELETE /tasks/:id: #Delete a todo list.


```
## Why Choose This API?

- Secure: Built with security in mind, using Google Authentication and JWT-based authorization.
- Scalable: Designed to handle a large number of users and requests, using Node.js and MongoDB.
- Easy to Use: Simple and intuitive API endpoints make it easy to integrate with your application.

## Getting Started

1. Clone the repository: `git clone (https://github.com/Sunnywayne7/To-Do-list_api.git)
2. Install dependencies: npm install
3. Start the server: npm run start:dev
4. Use the API endpoints to manage your todo lists!

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Thanks to the Node.js, Nest.js, Typescript, and MongoDB communities for their support and resources.

## Created By

Akande Sunday(Sunnywayne) [https://github.com/Sunnywayne7]
