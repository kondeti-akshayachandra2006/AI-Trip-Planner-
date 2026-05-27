# AI Trip Planner Backend

Node.js, Express, MongoDB, JWT, and Socket.IO backend scaffold for the mobile app.

Create a local environment file in `backend/.env` with your database and origin settings:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/pdd
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_ORIGIN=http://localhost:19006
```

Then run:

```bash
cd backend
npm install
npm run dev
```

Endpoints:

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `GET /trips`
- `POST /trips`
- `POST /trips/:id/share`
- `GET /notifications`
- `GET /health`

Socket event:

- `travel:update` for live weather, traffic, route, and emergency alerts
