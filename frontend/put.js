const API_URL = 'http://localhost:3000/';
const string_url = window.location.href;
const url = new URL(string_url);
const id = url.searchParams.get('id')

const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const salary = document.querySelector('#salary');
const age = document.querySelector('#age');
const dep = document.querySelector('#department');

async function getData(){
    const emp_fname = ''
    const emp_lname = ''
    const emp_salary = '' 
    const emp_age = '' 
    const emp_dep = '' 
    await loadData(id)
    await getDepartment() 
}

async function loadData(id){
    await fetch(API_URL+'employee/api/'+id)
    .then(res => res.json())
    .then(data => {
        const employee = data['data'][0]
        emp_fname = employee['first_name']
        emp_lname = employee['last_name']
        emp_salary = employee['salary']
        emp_age = employee['age']
        emp_dep = employee['department_id']

        fname.value = emp_fname
        lname.value = emp_lname
        salary.value = emp_salary
        age.value = emp_age

    })
}


function getDepartment(){
    fetch(API_URL+'department/api')
    .then(res => res.json())
    .then(data =>{
        const departments = data['data'];
        let option ='' 

        departments.forEach( department =>{

            if(department['department_id'] == emp_dep){
                option += `<option value='${department['department_id']}' selected>`
                option += department['department_name'] 
                option += "</option>" 

            }else{
                option += `<option value='${department['department_id']}'>`
                option += department['department_name'] 
                option += "</option>"
            } 
        } )
        
        document.querySelector('#department').innerHTML = option
    })

}

getData()

const submit = document.querySelector('#submit');

submit.addEventListener('click', ()=>{
    const emp_fname = fname.value
    const emp_lname = lname.value
    const emp_salary = salary.value
    const emp_age = age.value
    const emp_dep = dep.value

    const data = JSON.stringify({
        'fname': emp_fname,
        'lname': emp_lname,
        'salary': emp_salary,
        'age': emp_age,
        'department_id' : emp_dep,
        'id': id
    })
    console.log(data)
    putData(data)
})

async function putData(data){
    await fetch(API_URL+'employee/api', {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: data
    })
    .then(res=>console.log(res))

    window.location.href = 'index.html'
}