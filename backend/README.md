# Government Citizen Engagement Platform (Civiklink) - API Documentation

## Table of Contents

- [Government Citizen Engagement Platform (Civiklink) - API Documentation](#government-citizen-engagement-platform-civiklink---api-documentation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Citizen](#citizen)
    - [Official](#official)
    - [Chat](#chat)
  - [WebSocket Integration](#websocket-integration)
  - [Authentication Flow](#authentication-flow)
  - [Error Handling](#error-handling)
  - [Setup \& Installation](#setup--installation)
  - [Environment Variables](#environment-variables)
  - [Testing](#testing)
  - [Deployment](#deployment)

## Overview

This platform provides a communication channel between citizens and government officials, enabling:

- Secure citizen registration and profile management
- Official profile management
- Real-time messaging between citizens and officials
- Complaint and feedback submission
- Official response system

Built with Node.js, Express, MongoDB, and WebSocket for real-time communication.

## API Endpoints

- **Prefix Url**: `/v1/api`

### Authentication

| Endpoint               | Method | Description                        | Required Fields                                                      |
| ---------------------- | ------ | ---------------------------------- | -------------------------------------------------------------------- |
| `/auth/register`       | POST   | Citizen registration               | `username`, `firstName`, `lastName`, `email`, `password`             |
| `/auth/admin/register` | POST   | Official registration (admin only) | `name`, `email`, `password`, `position`, `department`, `contactInfo` |
| `/auth/login`          | POST   | User login                         | `email`, `password`                                                  |

### Citizen

| Endpoint                    | Method | Description            | Authentication |
| --------------------------- | ------ | ---------------------- | -------------- |
| `/citizen/profile`          | GET    | Get citizen profile    | Bearer Token   |
| `/citizen/profile`          | PUT    | Update citizen profile | Bearer Token   |
| `/citizen/profile`          | DELETE | Delete citizen account | Bearer Token   |
| `/citizen/officials`        | GET    | List all officials     | Bearer Token   |
| `/citizen/officials/search` | GET    | Search officials using query parameter `searchWord`       | Bearer Token   |
| `/citizen/officials/:id`    | GET    | Get official details   | Bearer Token   |

### Official

- **Prefix Url**: `api/user`

| Endpoint            | Method | Description             | Authentication |
| ------------------- | ------ | ----------------------- | -------------- |
| `/official/profile` | GET    | Get official profile    | Bearer Token   |
| `/official/profile` | PUT    | Update official profile | Bearer Token   |
| `/official/profile` | DELETE | Delete official account | Bearer Token   |

### Chat

| Endpoint                 | Method | Description        | Authentication |
| ------------------------ | ------ | ------------------ | -------------- |
| `/chat/`                 | POST   | Create new chat    | Bearer Token   |
| `/chat/:chatId/messages` | POST   | Send message       | Bearer Token   |
| `/chat/:chatId`          | GET    | Get chat details   | Bearer Token   |
| `/chat/`                 | GET    | List user's chats  | Bearer Token   |
| `/chat/:chatId/status`   | PATCH  | Update chat status | Bearer Token   |

## WebSocket Integration

Real-time messaging is handled via WebSocket:

```javascript
// Client-side connection example
const socket = new WebSocket(`ws://yourdomain.com/ws?token=${authToken}`);

socket.onmessage = (event) => {
  const { event: eventType, data } = JSON.parse(event.data);

  if (eventType === "CHAT_UPDATE") {
    // Handle new message
    console.log("New message:", data);
  }
};

// Sending a message
socket.send(
  JSON.stringify({
    action: "SEND_MESSAGE",
    data: {
      chatId: "123",
      content: "Hello official",
      sender: "citizen",
    },
  })
);
```

## Authentication Flow

1. User logs in via `/auth/login` to receive JWT token
2. Token must be included in subsequent requests:

   ```http
   Authorization: Bearer <token>
   ```

3. For WebSocket connections, include token in query params:

   ```Typescript
   ws://yourdomain.com/ws?token=<token>
   ```

## Error Handling

Standard error responses:

```json
{
  "success": false,
  "message": "Error description",
  "code": 400
}
```

Common error codes:

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EjikeJosephUche/civiklink.git
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see next section)

4. Start the server:

   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
DB_URI=your_DB_uri
JWT_SECRET=your_jwt_secret
PORT=your_port
NODE_ENV="production" or "development"
CLIENT_URL=your_client_Deployed_link_for_cors_origin_management
```

## Testing

Run unit tests:

```bash
npm test
```

Run integration tests:

```bash
npm run test:integration
```

## Deployment

1. Production build:

   ```bash
   npm run build
   ```

2. Using PM2 for process management:

   ```bash
   pm2 start dist/server.js --name civiklink
   ```

3. Development command to Start server

   ```bash
   npm run dev
   ```

4. Production command to Start server

   ```bash
   npm run start
   ```
