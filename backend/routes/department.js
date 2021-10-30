const express = require('express');
const Router = express.Router();
const dbCon = require('../connection.js')

Router.get('/api' , (req,res)=>{
    console.log('get');

    return res.send({error: false , message: 'test department'})
})

module.exports = Router ;