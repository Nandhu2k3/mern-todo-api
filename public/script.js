let token = "";

const api = "https://mern-todo-api-jvw8.onrender.com/api";
const todoApi = "https://mern-todo-api-jvw8.onrender.com/api/todos";


function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${api}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("authMsg").innerText = data.message || data.error;
    if (data.token) {
      token = data.token;
      document.getElementById("todoSection").classList.remove("hidden");
      document.getElementById("quoteSection").classList.remove("hidden");
      getTodos();
    }
  });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${api}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("authMsg").innerText = data.message || data.error;
    if (data.token) {
      token = data.token;
      document.getElementById("todoSection").classList.remove("hidden");
      document.getElementById("quoteSection").classList.remove("hidden");
      getTodos();
    }
  });
}

function addTodo() {
  const taskInput = document.getElementById("newTask");
  const task = taskInput.value;

  fetch(todoApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ task })
  })
  .then(() => {
    taskInput.value = ""; // Clear input field after adding
    getTodos();
  });
}

function getTodos() {
  fetch(todoApi, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(todos => {
    const list = document.getElementById("todoList");
    list.innerHTML = "";
    todos.forEach(todo => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${todo.task} - <span>${todo.done ? "✅" : "❌"}</span>
        <button onclick='toggle(${JSON.stringify(todo)})'>Toggle</button>
        <button onclick="remove('${todo._id}')">Delete</button>
      `;
      list.appendChild(li);
    });
  });
}

function toggle(todo) {
  fetch(`${todoApi}/${todo._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ done: !todo.done })
  })
  .then(() => getTodos());
}

function remove(id) {
  fetch(`${todoApi}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(() => getTodos());
}

function getQuote() {
  fetch(`${api}/inspire`, { // ✅ corrected from /quote to /inspire
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => {
    if (!res.ok) throw new Error("Quote fetch failed");
    return res.json();
  })
  .then(data => {
    document.getElementById("quote").innerText =
      `${data.message} — "${data.quote}"`;
  })
  .catch(err => {
    document.getElementById("quote").innerText =
      "❌ Failed to load quote.";
    console.error("Quote error:", err);
  });
}
