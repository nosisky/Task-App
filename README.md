# Task App

### Task App is a simple task management system where a user can set a reminder for a specific task.

## Table of Contents

- [Features](#features)
- [Technologies](#technology)
- [Installation and Setup](#installation)
- [How to Contribute](#how-to-contribute)
- [License](#license)
- [TODO](#todo)

## Features

Task App consists of the following features:

#### Authentication

- It uses JSON Web Token (JWT) for authentication.
- Token is generated on user login
- Token is perpetually verified to check the state of the user if logged in or not.
- User can only delete or edit their own tasks

#### Users

- Users can register
- Users can log in
- Users can create task
- Users can edit tasks
- Users can delete tasks

## Technology

**Task App** makes use of a host of modern technologies. The core ones are:

- NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
  See [this link](https://en.wikipedia.org/wiki/Node.js) for details. Codes were also written in ES6.
- ExpressJS: ExpressJS, is a web application framework for Node.js, It is designed for building web applications and APIs.
  see [this link](https://en.wikipedia.org/wiki/Express.js).
- MongoDB & Mongoose: MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.
- Major codes are written using the Airbnb javascript style guide, see [this link](https://github.com/airbnb/javascript) for details.

## Installation

- Git clone this repository

- CD to the created directory

- Rename .env.example file to .env and fill in your DB credentials and other available configuration like API_KEY_SECRET for JWT

- run `npm install`

- run `npm run start:dev` to start server

## API Routes

> POST : `/api/v1/users/signup`
> API route for users to create an account

> POST : `/api/v1/users/login (email, password)`
> An API route that allow users to login

> GET : `/api/v1/task`
> An API route that allow users to fetch all task

> POST : `/api/v1/task`
> An API route that allow users to add a new task

> DELETE : `/api/v1/task/:taskId`
> An API route that allow users to delete a specific task

> PUT : `/api/v1/task/:taskId`
> An API route that allows users to edit their task

## How to Contribute

Contributions to this project are welcomed, If you need to contribute to this project, kindly take steps below

- **Fork** the repository
- Follow [Installation and Setup](#installation) as explained earlier
- Create a branch off **master** for the feature you wish to add
- Make neccessary changes, commit and raise a pull request against develop
  **Note** when making contributions, please endevour to follow the [Airbnb](https://github.com/airbnb/javascript) javascript style guide. check out the [wiki](https://github.com/nosisky/blogIt/wiki)

## License

This project is authored by **Abdulrasaq Nasirudeen** (nosisky@gmail.com) and is licensed for your use, modification and distribution under the **MIT** license.
[MIT][license]

<!-- Definitions -->

[license]: LICENSE

[author]: Abdulrasaq Nasirudeen

## TODO

- Dockerize the application
- Implement a reminder system to notify users about their upcoming task changes
- Implment a forgot password system
- Add API documentation with swagger
