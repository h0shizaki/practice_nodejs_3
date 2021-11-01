const API_URL = 'http://localhost:3000/';
const string_url = window.location.href;
const url = new URL(string_url);
const id = url.searchParams.get('id')

const depName = document.querySelector('#depName');

async function loadData(id){
    await fetch(API_URL+'department/api/'+id)
    .then(res => res.json())
    .then(data =>{
        depName.value = data['data'][0]['department_name']
    })

}

loadData(id)

const submit = document.querySelector('#submit')

submit.addEventListener('click', ()=>{
    const name = document.querySelector('#depName').value
    const data = JSON.stringify({'name': name ,'id': id })
    putData(data)
})

async function putData(data){
    await fetch(API_URL+'department/api', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: data
    })
    
    window.location.href = 'department.html'

}