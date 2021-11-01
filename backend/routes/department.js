const express = require('express');
const Router = express.Router();
const dbCon = require('../connection.js')

Router.get('/' , (req,res)=>{
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

Router.post('/' ,(req, res)=>{
    console.log('post dep')
    const name = req.body.name;
    if(!name){
        return res.status(400).send({error: true , message: 'Please enter data'});
    }
    
    dbCon.query('INSERT INTO department( department_name ) VALUES(?)', name, (error, results, field)=>{
        if(!error){
            return res.status(200).send({error: false, data: results, message: 'Data added'})
        }

    })

})

Router.get('/:id', (req,res)=>{
    console.log('search dep');
    const id = req.params.id;
   
    if(!id){
        return res.status(400).send({error: true, message: "Please enter id"})
    } 

    dbCon.query("SELECT * FROM department WHERE department_id = ?", id, (error, results, field)=>{
        if(!error){
            let message = ""
            if(results === undefined || results.length == 0){
                message = "No data"
            }
            else{
                message = "Success got data"
            }
            return res.status(200).send({error: false, data: results, message: message})

        }else throw error;
        
    })
})

Router.put('/', (req, res)=>{
    console.log('put dep')
    const name = req.body.name
    const id = req.body.id;

    if(!name || !id){
        return res.status(400).send({error: false, message: "Please enter data"});
    }

    dbCon.query("UPDATE department SET department_name = ? WHERE department_id = ?",[name, id], (error, results, field)=>{
        if(!error){
            return res.status(200).send({error: false, data: results, message:"Update success"})
        }
        else throw error;

    })
})

Router.delete('/', (req,res)=>{
    console.log('delete dep')
    const id = req.body.id;
    if(!id){
        return res.status(400).send({error: true, message: "Please enter id"});
    }

    dbCon.query('SELECT * FROM employee WHERE department_id = ?', id, (error, results, field)=>{
        if(!error){

            if(results.length == 0 || results === undefined){
                dbCon.query('DELETE FROM department WHERE department_id = ?', id, (err, result, field)=>{
                    if(!err){
                        return res.status(200).send({error: false, data: result, message: "Data deleted"})
                    }
                    else throw err
                })
            }else{
                return res.status(200).send({error: true, message:"Can not delete this department"})
            }
        }
        else throw error
    } )
    
})

module.exports = Router ;