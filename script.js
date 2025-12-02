// DOM elements
const inputEl = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const listDaily = document.getElementById("daily-list");
const listMonthly = document.getElementById("monthly-list");
const remainingEl = document.getElementById("remaining-count");
const categorySelect = document.getElementById("task-category");
const dailyDateEl = document.getElementById("daily-date");
const monthlyMonthEl = document.getElementById("monthly-month");
const todayDateEl = document.getElementById("today-date");

// tasks array
let tasks = [];

// helpers for date display
function formatToday() {
  const d = new Date();
  const opts = { weekday: "short", month: "short", day: "numeric" };
  return d.toLocaleDateString(undefined, opts);
}
function formatMonth() {
  const d = new Date();
  const opts = { month: "long", year: "numeric" };
  return d.toLocaleDateString(undefined, opts);
}

// load/save
function loadTasks() {
  try {
    const raw = localStorage.getItem("sage_todo_tasks_v2");
    tasks = raw ? JSON.parse(raw) : [];
  } catch (e) {
    tasks = [];
  }
}
function saveTasks() {
  localStorage.setItem("sage_todo_tasks_v2", JSON.stringify(tasks));
}

// rendering
function updateDateHeaders() {
  const today = new Date();
  dailyDateEl.textContent = today.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
  monthlyMonthEl.textContent = today.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  todayDateEl.textContent = formatToday();
}

function updateRemaining() {
  const remaining = tasks.filter(t => !t.done).length;
  remainingEl.textContent = remaining;
}

function createTaskRow(task) {
  const row = document.createElement("div");
  row.className = "task" + (task.done ? " done" : "");
  row.dataset.id = task.id;

  const checkBtn = document.createElement("button");
  checkBtn.className = "check";
  checkBtn.title = task.done ? "Mark as not done" : "Mark as done";
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
  delBtn.innerHTML = "×";
  delBtn.title = "Delete";
  delBtn.addEventListener("click", () => deleteTask(task.id));

  row.appendChild(checkBtn);
  row.appendChild(textEl);
  row.appendChild(delBtn);

  return row;
}

function renderSection(listEl, items) {
  listEl.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.innerHTML = `<div class="empty-circle"></div><p>No tasks here yet.</p>`;
    listEl.appendChild(empty);
    return;
  }

  // active first, then done
  const ordered = [...items.filter(t => !t.done), ...items.filter(t => t.done)];
  ordered.forEach(t => {
    listEl.appendChild(createTaskRow(t));
  });
}

function renderTasks() {
  const daily = tasks.filter(t => t.category === "daily");
  const monthly = tasks.filter(t => t.category === "monthly");
  renderSection(listDaily, daily);
  renderSection(listMonthly, monthly);
  updateRemaining();
}

// actions
function addTask() {
  const text = (inputEl.value || "").trim();
  if (!text) return;

  const category = categorySelect.value || "daily";
  const newTask = {
    id: Date.now() + Math.random(),
    text,
    done: false,
    category
  };
  tasks.push(newTask);
  inputEl.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

// keyboard
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
addBtn.addEventListener("click", addTask);

// init
function init() {
  loadTasks();
  updateDateHeaders();
  renderTasks();

  // refresh date header at midnight (simple)
  setInterval(updateDateHeaders, 1000 * 60 * 60); // hourly
}

init();
