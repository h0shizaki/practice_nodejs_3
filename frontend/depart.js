const API_URL = 'http://localhost:3000/'

function getData(){
    fetch(API_URL+'department/api')
    .then(res => res.json())
    .then(data =>{
        let rowData = ''
        const departments = data['data'];

        departments.forEach( department =>{
            rowData +="<tr>";
            rowData +=`<td>${department['department_id']}</td>`
            rowData +=`<td>${department['department_name']}</td>`
            rowData +=`<td><a href="editDepartment.html?id=${department['department_id']}" class="btn btn-warning">Edit</a></td>`
            rowData +=`<td><button class="btn btn-danger" onclick="delDepartment(${department['department_id']})">Delete</button></td>`
            rowData +="</tr>"
        })

        document.querySelector('#myTable').innerHTML = rowData

    });

}

getData()

async function delDepartment(id){
    console.log(id)
    await fetch(API_URL+'department/api',{
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({'id': id})
    })
    .then(res=> res.json() )
    .then(data=>{
        if(data['error']){
            alert(data['message'])
        }else{
            alert(data['message'])
            getData()
        }
        
    })
}