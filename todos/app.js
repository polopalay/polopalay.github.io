const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", fistLoad);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerHTML = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  if (filterOption.value === "completed") {
    todoDiv.style.display = "none";
  }

  todoList.appendChild(todoDiv);
  saveTodo();
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;
  if (item.classList[0] == "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("webkitTransitionEnd", function () {
      todo.remove();
      saveTodo();
    });
  }

  if (item.classList[0] == "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    saveTodo();
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

function saveTodo() {
  localStorage.setItem("node", todoList.innerHTML);
}

function loadTodo() {
  if (localStorage.getItem("node") !== null) {
    todoList.innerHTML = localStorage.getItem("node");
  }
}

function fistLoad() {
  loadTodo();
  const todos = todoList.childNodes;
  todos.forEach((child) => {
    child.style.display = "flex";
  });
}
