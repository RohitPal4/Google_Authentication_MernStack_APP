const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;


mongoose.connect(DB_URL)
     .then(()=>{
        console.log("Mongodb is connected....");
     }).catch((err)=>{
        console.log('Error while mongodb connection', err);
     })