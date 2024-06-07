require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const itemRoute = require('./routes/item.routes.js')
const userRoute = require('./routes/user.routes.js')
const errorHandler = require('./middleware/error-handler.js')
const errorMessage = require('./middleware/error-message.js')
const accessControl= require('./middleware/access-controls.js')
app.use(cors());
app.use(accessControl);

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
app.use(bodyParser.json());

try {
  mongoose.connect("mongodb://127.0.0.1:27017/", 
  {
      useNewUrlParser: true,
      useUnifiedTopology:true,
  });
  console.log(`mongoDB connected successfully on mongodb://localhost:27017/mern-app(app.js)`);
} catch (error) {
  console.log("Error occured while connecting with mongoDB")
}
  fs.readdirSync(__dirname + "/models").forEach(function(file) {
    require(__dirname+"/models/"+file);
});

app.get('/',  function (req, res) {
    res.status(200).send({
      message: 'Express backend server'});
  });

app.use(accessControl);

app.use("/items",itemRoute);
app.use("/users",userRoute);

app.use(errorHandler);
app.use(errorMessage);

try {
    server.listen(process.env.PORT || 5000);
    console.log("connect with the port(app.js)");  
} catch (error) {
    console.log("Cannot connect with the port(app.js)");
    console.log(error);
}
