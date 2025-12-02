// Robust script for Sage To-Do (Daily/Monthly)
// Wrap in DOMContentLoaded to ensure elements exist and add helpful console logs

document.addEventListener("DOMContentLoaded", () => {
  try {
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

    if (!inputEl || !addBtn || !listDaily || !listMonthly || !remainingEl) {
      console.error("SageTodo: essential DOM elements are missing.", {
        inputEl, addBtn, listDaily, listMonthly, remainingEl
      });
      return;
    }

    // tasks store
    let tasks = [];

    // date helpers
    function updateDateHeaders() {
      const today = new Date();
      dailyDateEl.textContent = today.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
      monthlyMonthEl.textContent = today.toLocaleDateString(undefined, { month: "long", year: "numeric" });
      todayDateEl.textContent = today.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
    }

    // load/save
    function loadTasks() {
      try {
        const raw = localStorage.getItem("sage_todo_tasks_v2");
        tasks = raw ? JSON.parse(raw) : [];
      } catch (e) {
        console.warn("SageTodo: failed to parse localStorage tasks, resetting.", e);
        tasks = [];
      }
    }
    function saveTasks() {
      try {
        localStorage.setItem("sage_todo_tasks_v2", JSON.stringify(tasks));
      } catch (e) {
        console.error("SageTodo: failed to save tasks to localStorage", e);
      }
    }

    // render helpers
    function updateRemaining() {
      const remaining = tasks.filter(t => !t.done).length;
      remainingEl.textContent = String(remaining);
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

    // actions
    window.addTask = function addTask() {
      try {
        const text = (inputEl.value || "").trim();
        if (!text) {
          // small user feedback
          inputEl.focus();
          return;
        }
        const category = (categorySelect && categorySelect.value) ? categorySelect.value : "daily";
        const newTask = { id: Date.now() + Math.random(), text, done: false, category };
        tasks.push(newTask);
        inputEl.value = "";
        saveTasks();
        renderTasks();
        console.log("SageTodo: added task", newTask);
      } catch (e) {
        console.error("SageTodo: addTask error", e);
      }
    };

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

    // bind events safely
    addBtn.addEventListener("click", addTask);
    inputEl.addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); });

    // init
    loadTasks();
    updateDateHeaders();
    renderTasks();
    // refresh date header hourly
    setInterval(updateDateHeaders, 1000 * 60 * 60);

    console.info("SageTodo: script initialized successfully.");
  } catch (err) {
    console.error("SageTodo: fatal error in initialization", err);
  }
});
