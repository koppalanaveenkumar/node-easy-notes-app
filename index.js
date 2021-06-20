const express = require('express');

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: true}));


const dbConfig = require('../node-easy-notes-app/config/database.config');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.url, { useUnifiedTopology: true, useNewUrlParser: true},{
    useNewUrlParser : true
}).then(()=> {
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

app.get('/', (req, res) =>{
    res.send({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
})

// Require Notes routes
const routers = require('./routes/note.route');
app.use(routers);
app.listen(3000, () =>{
    console.log("Server is listening on port 3000");
})
