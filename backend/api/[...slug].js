let app;
try {
  app = require('../server.js');
} catch (error) {
  app = (req, res) => {
    res.status(500).json({
      error: "Initialization Error",
      message: error.message,
      stack: error.stack
    });
  };
}
module.exports = app;
