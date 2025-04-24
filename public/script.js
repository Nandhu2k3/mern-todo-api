let token = "";

const api = "http://localhost:4000/api";
const todoApi = "http://localhost:4000/api/todos";

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
  const task = document.getElementById("newTask").value;
  fetch(`${todoApi}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ task })
  })
  .then(() => getTodos());
}

function getTodos() {
  fetch(`${todoApi}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(todos => {
    const list = document.getElementById("todoList");
    list.innerHTML = "";
    todos.forEach(todo => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${todo.task} - ${todo.done ? "✅" : "❌"}
        <button onclick="toggle(${JSON.stringify(todo)})">Toggle</button>
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
  fetch(`${api}/quote`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("quote").innerText = `${data.message} — "${data.quote}"`;
  });
}
