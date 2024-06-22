# CP-Alert API

## Introduction

Welcome to the CP-Alert API! This API provides contest data from various Competitive Platform. It is built using Express.js and connects to a MongoDB database. 

## Getting Started

Follow the steps below to set up and run the application.

### 1. Clone the Repository

```bash
git clone https://github.com/arjunsharma1152/cpalert-api
cd cpalert-api
```

### 2. Install Dependencies

Install the required Node.js packages by running:

```bash
npm install
```

### 3. Run the Application

Start the server by running:

```bash
node index.js
```

The server will start on the port specified in your `.env` file (default is 3000).

## API Endpoints

### Base URL

```
http://localhost:3000/
```

### Get All Contests

#### Endpoint

```
GET /api/v1/contests
```

#### Description

Fetches all contest entries from the database.

#### Response

```json
{
  "status": "success",
  "data": {
    "contests": [
      // Array of contest objects
    ]
  }
}
```

## Project Structure

```
cpalert-api/
├── index.js         # Main application file
├── package.json     # NPM package file
└── README.md        # Project documentation
```

## Middleware

The application includes a middleware that logs a message for each incoming request:

```js
app.use((req, res, next) => {
    console.log("Hello from middleware!!");
    next();
});
```

## Database Connection

The application uses the MongoDB Node.js driver to connect to a MongoDB instance. Ensure you update the MongoDB connection string with your credentials:

```js
const uri = "your_mongodb_connection_string";
```

## Error Handling

Proper error handling is implemented for database operations. If an error occurs, the server responds with a `500 Internal Server Error` status.
