require("dotenv").config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

// Ensure DB is connected before handling any request (critical for Vercel serverless)
const dbReady = connectDB();

// Wrap the express app to wait for DB before processing requests
const handler = async (req, res) => {
  await dbReady;
  return app(req, res);
};

// Copy all express properties to handler so Vercel can use it
Object.setPrototypeOf(handler, Object.getPrototypeOf(app));
Object.assign(handler, app);

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

module.exports = handler;
