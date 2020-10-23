const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const Film = require("./models/Film");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// connect mongoDB;
const uri = "mongodb+srv://nodeapi:nodeapi@cluster0.wezhq.mongodb.net/node_api?retryWrites=true&w=majority";
mongoose.connect(uri,{useUnifiedTopology : true, useNewUrlParser :true}).then(() => {
    console.log("MongoDB Connected…");
  })
  .catch(err => console.log("Connect error",err));


app.get('/',(req,res,next) => {
    return res.status(200).json({ 
        message: "Node Film API",
    })
});


app.get("/film",async (req,res,next) => {
    const films = await Film.find({});
     return res.status(200).json({ 
        films
    })
})

app.post('/film', async (req,res,next) => {
    const film = new Film(req.body);
    await film.save();
    return res.status(200).json({ 
        message: "Create Film Success!",
    })
});


// const addUser = async (req, res) => {
//     const newUser = new User(req.body);
//     await newUser.save();
//     return res.status(201).json({ message: "create user success!" });
// };

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server is OK port ${PORT}!`);
})