const API_URL = 'http://localhost:3000/'

const submit = document.querySelector('#submit')

submit.addEventListener('click', ()=>{
    const depName = document.querySelector('#depName').value

    const data = JSON.stringify({'name': depName});
    console.log(data);

    post(data)
    
})

async function post(data){
    await fetch(API_URL + "department/api", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
    })
    
    alert('Department added')
    window.location.href = 'department.html'
}