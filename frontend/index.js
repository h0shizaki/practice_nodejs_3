const API_URL = 'http://localhost:3000/'

function getData(){
    fetch(API_URL+'employee/api')
    .then(res => res.json())
    .then(data =>{
        let rowData = ''
        const employees = data['data'];

        employees.forEach( employee =>{
            rowData +="<tr>";
            rowData +=`<td>${employee['id']}</td>`
            rowData +=`<td>${employee['first_name']}</td>`
            rowData +=`<td>${employee['last_name']}</td>`
            rowData +=`<td>${employee['salary']}</td>`
            rowData +=`<td>${employee['age']}</td>`
            rowData +=`<td>${employee['department_name']}</td>`
            rowData +=`<td><a href="editEmployee.html?id=${employee['id']}" class="btn btn-warning">Edit</a></td>`
            rowData +=`<td><button class="btn btn-danger" onclick="delEmployee(${employee['id']})">Delete</button></td>`
            rowData +="</tr>"
        })

        document.querySelector('#myTable').innerHTML = rowData

    });

}
getData()

async function delEmployee(id){
    console.log(id)
    let delComfirm = confirm('Want to delete? Are you sure?')

    if(delComfirm){
        await fetch(API_URL+'employee/api',{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'id':id})
        }).then(res=>console.log(res))
        getData()
    }
}