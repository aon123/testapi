require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = require();
const cors = require('cors');

mongoose.connect(process.env.mongo_url, {
    authSource: "admin",
    user: "aon",
    pass: "testpassword"
}).then(()=>{
    console.log("Db connected!")
})

app.use(express.json());
app.use(cors());
app.use('/api', require('./routes/notes'))
app.use('/api', require('./routes/user'))

app.listen(3000, ()=>{
    console.log('app listening at http://localhost:3000')
})