const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD,MONGO_IP,MONGO_PORT } = require("./config/config");
const app = express();

const mongoURL =`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry=()=>{
  mongoose
  .connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
  .then(() =>
    console.log("Succesfully connectedd to DB")).catch((e) => {
      console.log(e)
    setTimeout(connectWithRetry,5000) //Make sure that the mongo DB is up and running!!
    })

}

connectWithRetry()


app.get("/", (_req, res) => {
  res.send("Hello World!!!!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
//apt-get install -y npm
//install npm first then install any other packages
