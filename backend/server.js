require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

let isConnected = false;

async function ensureDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("MongoDB Connected");
  }
}

// Localhost
if (!process.env.VERCEL) {
  (async () => {
    await ensureDB();

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })();
}

// Vercel
module.exports = async (req, res) => {
  await ensureDB();
  return app(req, res);
};