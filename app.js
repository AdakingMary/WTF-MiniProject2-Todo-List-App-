import { getTasks, postTask, updateTask, deleteTask } from "./api.js";

// LOGIN CHECK
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) window.location.href = "index.html";

// WELCOME MESSAGE
document.getElementById(
  "welcomeMsg"
).innerText = `Hello, ${currentUser.name}! 😎`;

// LOGOUT
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

let tasks = [];
const todoList = document.getElementById("todoList");

// LOAD tasks from Xano
const loadTasks = async () => {
  tasks = await getTasks();
  renderTasks();
};

// RENDER tasks
const renderTasks = () => {
  todoList.innerHTML = "";
  const now = new Date();

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    let style = "";
    if (task.completed) style = "text-decoration: line-through; color: gray;";
    else if (task.dueDate && new Date(task.dueDate) < now)
      style = "color: red;";

    li.innerHTML = `
      <strong style="${style}">${task.title}</strong> - ${
      task.description || ""
    }
      <br>
      Due: ${task.dueDate || ""}
      <br>
      <button class="complete-btn">${
        task.completed ? "Undo" : "Complete"
      }</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      <hr>
    `;
    todoList.appendChild(li);
  });
};

// EVENT DELEGATION for dynamic buttons
todoList.addEventListener("click", async (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const id = li.dataset.id;
  const task = tasks.find((t) => t.id == id);
  if (!task) return;

  // COMPLETE / UNDO
  if (e.target.classList.contains("complete-btn")) {
    task.completed = !task.completed;
    await updateTask(task); // POST update
    renderTasks();
  }

  // DELETE
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task.id);
      tasks = tasks.filter((t) => t.id != task.id);
      renderTasks();
    }
  }

  // EDIT
  if (e.target.classList.contains("edit-btn")) {
    const newTitle = prompt("Edit Title:", task.title);
    if (!newTitle) return alert("Title is required!");
    const newDesc = prompt("Edit Description:", task.description || "");
    const newDue = prompt(
      "Edit Due Date (YYYY-MM-DDTHH:MM):",
      task.dueDate || ""
    );
    Object.assign(task, {
      title: newTitle,
      description: newDesc,
      dueDate: newDue,
    });
    await updateTask(task); // POST update
    renderTasks();
  }
});

// ADD NEW TASK
document.getElementById("todoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("todoTitle").value.trim();
  const description = document.getElementById("todoDescription").value.trim();
  const dueDate = document.getElementById("todoDueDate").value;
  if (!title) return alert("Title is required");

  const newTask = await postTask({
    title,
    description,
    dueDate,
    completed: false,
  });
  tasks.push(newTask); // Use Xano's real ID
  renderTasks();
  e.target.reset();
});

// INITIAL LOAD
document.addEventListener("DOMContentLoaded", loadTasks);
