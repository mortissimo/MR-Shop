require('dotenv').config();
 
const express = require('express');
const router = require('./routes');
const app = express();
const port = process.env.PORT||7777;
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.json());
app.use(router);

app.listen(port, ()=>{
    console.log(`Listening to port`, port);
})