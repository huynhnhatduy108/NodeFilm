const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const logger = require("morgan");

const filmRoute = require("./routes/film");
const typeRoute = require("./routes/type");
const userRoute = require("./routes/user");


// Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use("/uploads", express.static("uploads"));

// connect mongoDB;
const uri = "mongodb+srv://nodeapi:nodeapi@cluster0.wezhq.mongodb.net/node_api?retryWrites=true&w=majority";
mongoose.connect(uri,{useUnifiedTopology : true, useNewUrlParser :true}).then(() => {
    console.log("✅ MongoDB Connected successfully");
  })
  .catch(err => console.log("❌ Connection failed ",err));

// Route
app.get('/',(req,res,next) => {
  return res.sendFile(__dirname + '/index.html');
});

//  Route Users
app.use("/film", filmRoute);
app.use("/type", typeRoute);
app.use("/user", userRoute);



// Catch 404 Error Page Not Found
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

// Error handler function
app.use((err,req,res,next) => {
    const error = app.get("env") === "development" ? err : {};
    const status = error.status || 500;
    return res.status(status).json({
      error: {
        message: error.message,
      },
    });
  });


const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server is OK port ${PORT}!`);
})