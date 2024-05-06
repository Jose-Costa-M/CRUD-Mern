//Load env variables
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

// getting-started.js
const mongoose = require('mongoose');


async function connectToDb() {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to the database");
    }catch(err){
        console.log(err);
    }
}

module.exports = connectToDb;