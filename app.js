require("dotenv").config();
const express = require("express");
const router = require("./routes/index");
const app = express();
const path = require("path");
const ejs = require("ejs");
const port = process.env.PORT || 3000;
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const flash = require('connect-flash');
const cron = require('node-cron')
const CronJob = require('cron').CronJob

require("./config/db");
require('./config/passport')(passport)

app.set("view engine", "ejs");

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false, limit: "100mb" }));

app.use(flash());

// // mongo store
const mongoStore = MongoStore.create({
  mongoUrl:process.env.MONGO_URL,
  ttl: 24 * 60 * 60, // = 24 hour
  crypto: {
      secret: process.env.SECRET_KEY
  }
})

// Session config
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  } // 24 hour
}))

app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize())
app.use(passport.session())

app.use(router);

// cron.schedule('* * * * * *', () => {
  // console.log('running a task every minute');
// })


// console.log('Before job instantiation');
// const job = new CronJob('*/3 * * * * *', function() {
  
// 	const d = new Date();
// 	console.log('At Every Second:', d.toLocaleTimeString());
// });

// job.start();

app.listen(port, () => {
  console.log(`Server Listning On Port ${port}`);
});
