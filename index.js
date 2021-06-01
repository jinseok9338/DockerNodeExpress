const express = require("express");
const mongoose = require("mongoose");
const redis = require('redis')
const session = require('express-session')
const cors  = require("cors")


const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET
} = require("./config/config");


let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
  host: REDIS_URL, 
  port:REDIS_PORT
})



const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,  
    })
    .then(() => console.log("Succesfully connectedd to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000); //Make sure that the mongo DB is up and running!! Not Really!!
    });
};

connectWithRetry();

app.enable("trust proxy")
app.use(cors({}));

 app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge:60000
  }
}))

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!!!!");
  console.log("Yes it ran!! Congrats")
});

//localhost:3000/posts
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
//sudo apt-get update
//apt-get install -y npm
//install npm first then install any other packages
