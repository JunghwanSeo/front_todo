let inputTask = document.getElementById("inputTask");
let btnAddTask = document.getElementById("bntAddTask");
let taskList = []

let btnTabs = document.querySelectorAll(".divTabs div")

btnAddTask.addEventListener("click", addTask);

for(let a=1; btnTabs.length>a; a++){
    btnTabs[a].addEventListener("click", function (event){
        render(event.target.id)
    })
}

function addTask(){
    let taskContent = {
        taskId: 0,
        task: inputTask.value,
        isComplete: false
    }

    if(taskContent.task===""){
        return;
    }

    callAddTask(taskContent);
    render("all");
}

function render(type){
    let listTasks = callListTasks(type);

    document.getElementById("divTaskBoard").innerHTML = listTasks.map((taskContent)=>{
        let markComplete = "";
        if(taskContent.isComplete){
            markComplete = " class=\"taskComplete\"";
        }

        return `<div class="divTodoDetail">
            <div>
                ${taskContent.taskId}
            </div>
            <div${markComplete}>
                ${taskContent.task}
            </div>
            <div>
                <button onclick="callCompleteTask(${taskContent.taskId})">OK</button>
                <button onclick="callDeleteTask(${taskContent.taskId})">Delete</button>
            </div>
        </div>`;
    }).join('');
}

function callCompleteTask(taskId){
    for(let a=0; taskList.length>a; a++){
        if(taskList[a].taskId===taskId){
            taskList[a].isComplete = !taskList[a].isComplete;
            break;
        }
    }

    render("all");
}

function callDeleteTask(taskId){
    for(let a=0; taskList.length>a; a++){
        if(taskList[a].taskId===taskId){
            taskList.splice(a, 1);
            break;
        }
    }

    render("all");
}

function callAddTask(taskContent){
    if(taskList.length === 0){
        taskContent.taskId = 0;
    }else{
        taskContent.taskId=taskList[taskList.length-1].taskId+1;
    }

    taskList.push(taskContent);
}

function callListTasks(type){
    if(type === "processing"){
        let temp = [];
        for(let a=0; taskList.length>a; a++){
            if(!taskList[a].isComplete){
                temp.push(taskList[a]);
            }
        }

        return temp;
    }else if(type === "complete"){
        let temp = [];
        for(let a=0; taskList.length>a; a++){
            if(taskList[a].isComplete){
                temp.push(taskList[a]);
            }
        }

        return temp;
    }else{
        return taskList;
    }
}

const getInfo = async ()=> {
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "Test",
            body: "I am testing!",
            userId: 1,
        }),
    }).then((response) => console.log(response));
}