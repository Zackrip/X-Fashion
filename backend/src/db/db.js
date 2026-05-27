const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB successfully")
    })

    .catch((err) => {
        console.log("Error connecting to MongoDB:", err)
    })
}

module.exports = connectDB; 