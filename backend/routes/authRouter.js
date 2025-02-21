const express = require('express');
const { googleLogin } = require('../controller/authCtrl');

const router = express.Router();

router.get('/test', (req, res)=>{
    res.send("router is working");
})

router.get('/google', googleLogin);
// router.get('/google', (req, res)=>{
//     res.send("it is running");
// })


module.exports = router;