const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database Succesfull Connected")
}).catch(() => {
    console.log("Database Connection Failed")
})