const express = require('express');
const Router = express.Router();
const dbCon = require('../connection.js')

Router.get('/', (req,res)=>{
    console.log('get emp')
    dbCon.query('SELECT * FROM `employee` INNER JOIN department WHERE employee.department_id = department.department_id; ', (error, results, field)=>{
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

Router.post('/', (req,res)=>{
    console.log('post emp')
    const fname = req.body.fname;
    const lname = req.body.lname;
    const age = req.body.age;
    const salary = req.body.salary;
    const department_id = req.body.department_id;

    if(!fname || !lname || !age || !salary || !department_id){
        return res.status(400).send({error: true , message: "please the enter data"})
    }

    dbCon.query("INSERT INTO employee (first_name, last_name, salary, age, department_id) VALUE(?,?,?,?,?)",
    [fname, lname, salary, age, department_id] , (error, results, field)=>{
        if(!error){
            return res.status(200).send({error: false, data: results, message: "OK boi"})
        }
        else {
            throw error;
        }
    }
    )
})

Router.get('/:id', (req,res)=>{
    console.log('search emp')
    const id = req.params.id
    if(!id) return res.status(400).send({error: false , message: "Please enter id"}) ;
    dbCon.query('SELECT * FROM employee where id = ?',id , (error, results, field)=>{
        if(!error){
            let message = ''
            if(results === undefined || results.length == 0){
                message = "No data"
            }else{
                message = "Success got data"
            }
            return res.status(200).send({error: false, data: results, message: message});
        }else throw error;
    })
})

Router.put('/', (req,res)=>{
    console.log('put emp')
    const id = req.body.id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const age = req.body.age;
    const salary = req.body.salary;
    const department_id = req.body.department_id;

    if(!id || !fname || !lname || !age || !salary || !department_id){
        return res.status(400).send({error: true , message: "please the enter data"})
    }

    dbCon.query('UPDATE employee SET first_name = ?, last_name = ?, salary = ?, age = ?, department_id = ? WHERE id = ? ' ,
    [fname,lname,salary,age,department_id,id], (error, results, field)=>{
        if(!error){
            return res.status(200).send({error: false, data: results, message: "Update success"})
        }
        else throw error
    })
})

Router.delete('/', (req,res)=>{
    console.log('delete emp')
    const id = req.body.id
    if(!id) return res.status(400).send({error: false , message: "Please enter id"}) ;

    dbCon.query('DELETE FROM employee where id = ?', id, (error, results, field)=>{
        if(!error){
            return res.status(200).send({error: false, data: results, message: "Delete success"})
        }else throw error;
    })
})

module.exports = Router ;