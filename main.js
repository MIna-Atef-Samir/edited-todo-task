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
    let tr = `
    <tr>
    <td id="id">${i+1}</td>
    <td id="todoLine">${task.todo.trim()}</td>
    <td id="TaskRate">${rate}</td>
    <td>
    <button class="btn btn-danger" onclick="DeleteTodo(${i})">Delete</button>
    <button class="btn btn-warning" id="edit" onclick="EditTodo(${i})">Edit</button>
    <button class="btn btn-success hide" id="save"  onclick="save(${i})">Save</button>
    </td>
    </tr>
    `
    return tr;
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
const EditTodo = function(i){
    // THE PROBLEM IS iN Here 👇
    const todoLine = document.querySelector("#todoLine");
    const TaskRate = document.querySelector("#TaskRate");
    const id = document.getElementById("id").textContent;

    todoLine.innerHTML = `<input type="text" class="form-control" id="editedTodo" value="${tasks[i].todo}"  />`
    TaskRate.innerHTML = `<select type="text" class="form-select" id="editedRate" value="${tasks[i].rate}">
    <option disabled selected value="">Open the priority</option>
                    <option value= '1' >Low - 1</option>
                    <option value= '2' >Medium - 2</option>
                    <option value= '3' >High - 3</option>
    </select>`
    document.getElementById('edit').classList.add('hide')
    document.getElementById('save').classList.remove('hide')
}

const save = function(i){
        let editedTodo = document.getElementById('editedTodo');  
        let editedRate = document.getElementById('editedRate');
        if(editedRate.value > 3 || editedRate.value < 0){
            return alert('Please Enter a valid priority between 1 to 3')
        }
        tasks[i].todo = editedTodo.value;
        tasks[i].rate = editedRate.value;
        document.getElementById('save').classList.add('hide')
        document.getElementById('edit').classList.remove('hide')
        renderTheTable(tasks)
}
