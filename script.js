// Simple, vanilla JS to manage tasks + localStorage

const inputEl = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const listEl = document.getElementById("task-list");
const remainingEl = document.getElementById("remaining-count");

let tasks = [];

// Load tasks from localStorage
function loadTasks() {
  try {
    const stored = localStorage.getItem("sage_todo_tasks");
    if (stored) {
      tasks = JSON.parse(stored);
    }
  } catch (e) {
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem("sage_todo_tasks", JSON.stringify(tasks));
}

function updateRemaining() {
  const remaining = tasks.filter((t) => !t.done).length;
  remainingEl.textContent = remaining;
}

// Render tasks: active first, completed at bottom
function renderTasks() {
  listEl.innerHTML = "";

  if (!tasks.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.innerHTML = `
      <div class="empty-circle"></div>
      <p>Start with one gentle task you can finish in 5 minutes.</p>
    `;
    listEl.appendChild(empty);
    updateRemaining();
    return;
  }

  const ordered = [
    ...tasks.filter((t) => !t.done),
    ...tasks.filter((t) => t.done),
  ];

  ordered.forEach((task) => {
    const row = document.createElement("div");
    row.className = "task" + (task.done ? " done" : "");

    const checkBtn = document.createElement("button");
    checkBtn.className = "check";
    checkBtn.addEventListener("click", () => toggleTask(task.id));

    if (task.done) {
      const mark = document.createElement("span");
      mark.className = "check-mark";
      mark.textContent = "✓";
      checkBtn.appendChild(mark);
    }

    const textEl = document.createElement("div");
    textEl.className = "task-text";
    textEl.textContent = task.text;

    const delBtn = document.createElement("button");
    delBtn.className = "delete";
    delBtn.textContent = "×";
    delBtn.addEventListener("click", () => deleteTask(task.id));

    row.appendChild(checkBtn);
    row.appendChild(textEl);
    row.appendChild(delBtn);

    listEl.appendChild(row);
  });

  updateRemaining();
}

function addTask() {
  const text = (inputEl.value || "").trim();
  if (!text) return;

  tasks.push({
    id: Date.now() + Math.random(),
    text,
    done: false,
  });

  inputEl.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

// Event listeners
addBtn.addEventListener("click", addTask);

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Init
loadTasks();
renderTasks();
