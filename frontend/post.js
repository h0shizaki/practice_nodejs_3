const API_URL = 'http://localhost:3000/'

function getDepartment(){
    fetch(API_URL+'department/api')
    .then(res => res.json())
    .then(data =>{
        const departments = data['data'];
        let option ='' 

        departments.forEach( department =>{
            option += `<option value='${department['department_id']}'>`
            option += department['department_name'] 
            option += "</option>" 
        } )
        
        document.querySelector('#department').innerHTML = option
    })

}
getDepartment()

const submit = document.querySelector('#submit');

submit.addEventListener('click', ()=>{
    const fname = document.querySelector('#fname').value;
    const lname = document.querySelector('#lname').value;
    const salary = document.querySelector('#salary').value;
    const age = document.querySelector('#age').value;
    const dep = document.querySelector('#department').value;

    const data = JSON.stringify({
        'fname': fname, 
        'lname': lname, 
        'age': age, 
        'salary': salary, 
        'department_id': dep
    })

    console.log(data)
    postData(data)
})

async function postData(data){
    await fetch(API_URL+'employee/api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
    })
    .then( result=>console.log(result))
    window.location.href = 'index.html'
}