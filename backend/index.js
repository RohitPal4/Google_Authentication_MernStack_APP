const express = require('express');
require('dotenv').config();
const authRouter = require('./routes/authRouter');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;
require('./models/dbConnection');

app.get('/', (req, res)=>{
    res.send('hello form auth server');
})

app.use(cors());
app.use('/auth', authRouter);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

                           