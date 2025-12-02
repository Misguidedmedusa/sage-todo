// Robust script with collapsible sections (Daily / Monthly)
// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  // DOM references
  const inputEl = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const listDaily = document.getElementById("daily-list");
  const listMonthly = document.getElementById("monthly-list");
  const remainingEl = document.getElementById("remaining-count");
  const categorySelect = document.getElementById("task-category");
  const dailyDateEl = document.getElementById("daily-date");
  const monthlyMonthEl = document.getElementById("monthly-month");
  const todayDateEl = document.getElementById("today-date");
  const dailySection = document.getElementById("daily-section");
  const monthlySection = document.getElementById("monthly-section");

  if (!inputEl || !addBtn || !listDaily || !listMonthly || !remainingEl) {
    console.error("SageTodo: essential DOM elements missing");
    return;
  }

  // load/save keys
  const TASK_KEY = "sage_todo_tasks_v2";
  const COLLAPSE_KEY = "sage_todo_collapsed_v1";

  // state
  let tasks = [];
  let collapsedState = {}; // { daily: true/false, monthly: true/false }

  // date helpers
  function updateDateHeaders() {
    const today = new Date();
    dailyDateEl.textContent = today.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
    monthlyMonthEl.textContent = today.toLocaleDateString(undefined, { month: "long", year: "numeric" });
    todayDateEl.textContent = today.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  }

  // persistence
  function loadTasks() {
    try {
      const raw = localStorage.getItem(TASK_KEY);
      tasks = raw ? JSON.parse(raw) : [];
    } catch (e) { tasks = []; }
  }
  function saveTasks() {
    try { localStorage.setItem(TASK_KEY, JSON.stringify(tasks)); } catch (e) { console.warn(e); }
  }

  function loadCollapsed() {
    try {
      const raw = localStorage.getItem(COLLAPSE_KEY);
      collapsedState = raw ? JSON.parse(raw) : { daily: false, monthly: false };
      // ensure keys exist
      if (typeof collapsedState.daily === "undefined") collapsedState.daily = false;
      if (typeof collapsedState.monthly === "undefined") collapsedState.monthly = false;
    } catch (e) {
      collapsedState = { daily: false, monthly: false };
    }
  }
  function saveCollapsed() {
    try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify(collapsedState)); } catch (e) { console.warn(e); }
  }

  // UI helpers
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
    const ordered = [...items.filter(t => !t.done), ...items.filter(t => t.done)];
    ordered.forEach(t => listEl.appendChild(createTaskRow(t)));
  }

  function renderTasks() {
    const daily = tasks.filter(t => t.category === "daily");
    const monthly = tasks.filter(t => t.category === "monthly");
    renderSection(listDaily, daily);
    renderSection(listMonthly, monthly);
    updateRemaining();
  }

  function updateRemaining() {
    const remaining = tasks.filter(t => !t.done).length;
    remainingEl.textContent = String(remaining);
  }

  // actions
  function addTask() {
    const text = (inputEl.value || "").trim();
    if (!text) { inputEl.focus(); return; }
    const category = (categorySelect && categorySelect.value) ? categorySelect.value : "daily";
    const task = { id: Date.now() + Math.random(), text, done: false, category };
    tasks.push(task);
    inputEl.value = "";
    saveTasks();
    renderTasks();
    console.log("SageTodo: added", task);
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

  // collapse helpers
  function applyCollapsedToSection(sectionEl, listEl, key) {
    const isCollapsed = !!collapsedState[key];
    if (isCollapsed) {
      sectionEl.classList.add("collapsed");
      listEl.classList.add("collapsed");
    } else {
      sectionEl.classList.remove("collapsed");
      listEl.classList.remove("collapsed");
    }
  }

  function toggleCollapse(key) {
    collapsedState[key] = !collapsedState[key];
    saveCollapsed();
    if (key === "daily") applyCollapsedToSection(dailySection, listDaily, "daily");
    if (key === "monthly") applyCollapsedToSection(monthlySection, listMonthly, "monthly");
  }

  // create collapse button and attach
  function makeCollapseButton(sectionKey) {
    const btn = document.createElement("button");
    btn.className = "collapse-btn";
    btn.title = "Collapse / expand";
    btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 9l4 4 4-4" /></svg>`;
    btn.addEventListener("click", () => toggleCollapse(sectionKey));
    return btn;
  }

  function attachCollapseButtons() {
    // find headers and attach to right side
    const dailyHeader = dailySection.querySelector(".section-header");
    const monthlyHeader = monthlySection.querySelector(".section-header");
    if (dailyHeader && monthlyHeader) {
      // avoid duplicate buttons
      if (!dailyHeader.querySelector(".collapse-btn")) {
        const btn = makeCollapseButton("daily");
        dailyHeader.appendChild(btn);
      }
      if (!monthlyHeader.querySelector(".collapse-btn")) {
        const btn = makeCollapseButton("monthly");
        monthlyHeader.appendChild(btn);
      }
    }
  }

  // bindings
  addBtn.addEventListener("click", addTask);
  inputEl.addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); });

  // init
  loadTasks();
  loadCollapsed();
  attachCollapseButtons();
  // apply collapse initial state
  applyCollapsedToSection(dailySection, listDaily, "daily");
  applyCollapsedToSection(monthlySection, listMonthly, "monthly");
  updateDateHeaders();
  renderTasks();
  setInterval(updateDateHeaders, 1000 * 60 * 60);

  console.info("SageTodo: initialized with collapsible sections");
});
