const formElement = document.getElementById("todo-form");
const todoInputElement = document.querySelector("#todo");
const todoListElement = document.querySelector("ul");
const firstCardElement = document.querySelectorAll("body")[0];
const secondCardElement = document.querySelectorAll("body")[1];
const filterInputElement = document.querySelector("#filter");
const clearButtonElement = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    formElement.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI); 
    secondCardElement.addEventListener("click", deleteTodo);
    clearButtonElement.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e){
    if (confirm("Tümünü silmek istediğinize emin misiniz ?")) {
        while(todoListElement.firstElementChild != null) {
            todoListElement.removeChild(todoListElement.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){         
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }
    });
}

function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi...");
    }
}

function deleteTodoFromStorage(deletedTodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletedTodo){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const newTodo = todoInputElement.value.trim();
    if (newTodo === "") {
        showAlert("danger","Lütfen bir todo girin...");
    }
    else {
        addTodoToUI(newTodo); 
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi...");
    }
    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){
    const alertElement = document.createElement("div");
    alertElement.className = `alert alert-${type}`;
    alertElement.textContent = message;
    firstCardElement.appendChild(alertElement);

    setTimeout(function(){
        alertElement.remove();
    },1000);
}

function addTodoToUI(newTodo){
    const listElement = document.createElement("li");
    const linkElement = document.createElement("a");
    linkElement.href = "#";
    linkElement.className = "delete-item";
    linkElement.innerHTML = "<i class = 'fa fa-remove'></i>"

    listElement.className = "list-group-item d-flex justify-content-between";
    listElement.appendChild(document.createTextNode(newTodo));
    listElement.appendChild(linkElement);

    todoListElement.appendChild(listElement);
}

