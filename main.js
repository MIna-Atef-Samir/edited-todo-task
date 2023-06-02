// set data attribute

let tasks =[];
const addTask = function(){
    let input = document.getElementById('input');
    let priority = document.getElementById('priority');
    let task = {todo:input.value, rate:priority.value}

    
    const isValid = validation(task);
    if(!isValid){
        alert("Please Enter a Correct data!")
        return;
    }
    addTasksTList(task)
    renderTheTable(tasks);
input.value=""
priority.value=""
} 
const validation = function(task){
    if(!task.todo.trim()) return false;
    if(!task.rate) return false;
    return true;
}
const renderTheTable = function(tasks){
    let tbody = "";
    for(let i=0 ; i < tasks.length; i++){
        tbody += getTable(i, tasks[i]);
    }
    document.getElementById('list').innerHTML = tbody;
}
const getTable = function(i, task){
    let rate = ''
    if(task.rate == 1){
        rate = 'Low'
    }else if(task.rate == 2){
        rate = 'Medium'
    }else{
        rate = 'High'
    }

    let tr = getTheRow(i,task, rate)
    // `
    // <tr>
    // <td id="id_${i}">${i+1}</td>
    // <td id="todoLine_${i}">${task.todo.trim()}</td>
    // <td id="TaskRate_${i}">${rate}</td>
    // <td>
    // <button class="btn btn-danger" id="delete_${i}" onclick="DeleteTodo(${i})">Delete</button>
    // <button class="btn btn-warning" id="edit_${i}" onclick="EditTodo(${i})">Edit</button>
    // <button class="btn btn-success" id="save_${i}"  onclick="save(${i})">Save</button>
    // <button class="btn btn-secondary" id="cancel${i}"  onclick="cancel(${i})">Cancel</button>
    // </td>
    // </tr>
    // `
    return tr;
}
const getTheRow = (i,task, rate)=>{
    return `<tr>
    <td id="id_${i}">${i+1}</td>
    <td id="todoLine_${i}">${task.editable? `<input type="text" class="form-control" id="editedTodo_${i}" value="${tasks[i].todo}" />`:task.todo.trim()}</td>
    <td id="TaskRate_${i}">${task.editable? `<select type="text" class="form-select" id="editedRate_${i}" value="${tasks[i].rate}">
            <option disabled selected value="">Open the priority</option>
            <option value= '1' >Low - 1</option>
            <option value= '2' >Medium - 2</option>
            <option value= '3' >High - 3</option>
        </select>`:rate}</td>
        <td class = "d-flex  justify-content-center">${task.editable? `<button class="btn btn-success" id="save_${i}"  onclick="save(${i})">Save</button>
        <button class="btn btn-secondary ms-2" id="cancel${i}"  onclick="cancel(${i})">Cancel</button>`

        :`<button class="btn btn-danger" id="delete_${i}" onclick="DeleteTodo(${i})">Delete</button>
        <button class="btn btn-warning ms-2" id="edit_${i}" onclick="EditTodo(${i})">Edit</button>`}
        </td>
    </tr>`
}
const addTasksTList = function(task){
    tasks.push(task);
    console.log(tasks);
}
const DeleteTodo = function(i){
    if(!confirm(`Are You Sure you want to cancel task num ${i+1}`)) return;
    tasks.splice(i,1);
    renderTheTable(tasks)
}
const find = function(){
    // debugger
    if(tasks.length == 0)return null;
    let min = tasks[0].priority
    minI = 0
    for(let i =1 ; i < tasks.length; i++){
        if(min >tasks[i],priority){
            min =tasks[i].priority;
            minI = i
        }
    }
    console.log(tasks[minI]);
}
// const EditTodo = function(i){
//     // THE PROBLEM IS iN Here 👇 / Solved! by adding {i} to all the id's
//     const todoLine = document.querySelector(`#todoLine_${i}`);
//     const TaskRate = document.querySelector(`#TaskRate_${i}`);
//     const id = document.getElementById(`id_${i}`).textContent;

//     todoLine.innerHTML = `<input type="text" class="form-control" id="editedTodo_${i}" value="${tasks[i].todo}"  />`
//     TaskRate.innerHTML = `<select type="text" class="form-select" id="editedRate_${i}" value="${tasks[i].rate}">
//     <option disabled selected value="">Open the priority</option>
//                     <option value= '1' >Low - 1</option>
//                     <option value= '2' >Medium - 2</option>
//                     <option value= '3' >High - 3</option>
//     </select>`
//     document.getElementById(`edit_${i}`).classList.add('hide')
//     document.getElementById(`delete_${i}`).classList.add('hide')
//     document.getElementById(`save_${i}`).classList.remove('hide')
//     document.getElementById(`cancel${i}`).classList.remove('hide')
// }
const EditTodo = (i)=>{
tasks[i].editable = true;
renderTheTable(tasks)
}
const cancel = (i)=>{
    tasks[i].editable = false;
    renderTheTable(tasks)
}
const save = (i)=>{
    let editedTodo = document.getElementById(`editedTodo_${i}`);  
    let editedRate = document.getElementById(`editedRate_${i}`);
    if(editedRate.value > 3 || editedRate.value < 0){
        return alert('Please Enter a valid priority between 1 to 3')
    }
    tasks[i].todo = editedTodo.value;
    tasks[i].rate = editedRate.value;
    tasks[i].editable = false
    renderTheTable(tasks)
}

// const save = function(i){
//         let editedTodo = document.getElementById(`editedTodo_${i}`);  
//         let editedRate = document.getElementById(`editedRate_${i}`);
//         if(editedRate.value > 3 || editedRate.value < 0){
//             return alert('Please Enter a valid priority between 1 to 3')
//         }
//         tasks[i].todo = editedTodo.value;
//         tasks[i].rate = editedRate.value;
//         document.getElementById(`edit_${i}`).classList.add('hide')
//         document.getElementById(`cancel${i}`).classList.add('hide')
//         document.getElementById(`delete_${i}`).classList.remove('hide')
//         document.getElementById(`save_${i}`).classList.remove('hide')
//         renderTheTable(tasks)
// }

const changeRate = ()=>{
    tasks.sort(function(a,b){
        return b.rate - a.rate
    })
    console.log("clicked on priorty");
    renderTheTable(tasks)
}
const changeName = ()=>{
    tasks.sort(function(a,b){
        if (a.todo < b.todo) return -1
        if (a.todo > b.todo) return 1
        return 0
    })
    renderTheTable(tasks)
    console.log("Change name");
}
// const align = (a,b) => {
//     if(a.priority > b.priority){
//         return 1
//     }else if(a.priority < b.priority){
//         return -1
//     }else{
//         return 0
//     }
// }
