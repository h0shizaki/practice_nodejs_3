const express = require('express');
const Router = express.Router();
const dbCon = require('../connection.js')

Router.get('/api' , (req,res)=>{
    console.log('get dep');

    dbCon.query('SELECT * FROM department', (error, results, field)=>{
        if(!error){
            let message = "";
            if(results.length == 0 || results === undefined) {
                message = "No data"
            }else{
                message = "Success got data"
            }
            return res.status(200).send({error: false, data: results, message: message})
        }
        else{
            throw error;
        }

    })
})

module.exports = Router ;