require("dotenv").config();
const app =  require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

module.exports = app;