document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const taskList = document.getElementById("taskList")
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    taskList.innerHTML = "";
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if(taskText !== "") {
        const newTask = { text: taskText, completed: false };
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        addTaskToDOM(newTask);
        taskInput.value = "";
    }
}

function addTaskToDOM(task) {
    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("li");

    taskItem.innerHTML = `
        <span>${task.text}</span>
        <button onclick="toggleTaskCompletion(this)">Completed</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    if(task.completed) {
        taskItem.classList.add("completed");
    }

    taskList.appendChild(taskItem);
}

function toggleTaskCompletion(button) {
    const taskItem = button.parentNode;
    taskItem.classList.toggle("completed");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = Array.from(taskItem.parentNode.children).indexOf(taskItem);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

