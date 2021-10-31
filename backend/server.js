const express = require('express');
const app = express();
const dbCon = require('./connection.js')
const employeeRoute = require('./routes/employee')
const departmentRoute = require('./routes/department')

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//middleware
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use('/employee/api', employeeRoute);
app.use('/department/api', departmentRoute)

app.get('/' , (req,res)=>{
    return res.send({error: false , message: 'Hello world'})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{ console.log(`Running on port ${PORT}`)} )

module.exports = app ;