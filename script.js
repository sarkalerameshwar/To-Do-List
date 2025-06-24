// Global variables
let tasks = [];
let taskIdCounter = 1;

// Get DOM elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const tasksList = document.getElementById("tasksList");
const emptyState = document.getElementById("emptyState");
const stats = document.getElementById("stats");
const progressSection = document.getElementById("progressSection");
const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");
const completedCount = document.getElementById("completed-count");
const totalCount = document.getElementById("total-count");
const completedCountBtn = document.getElementById("completedCountBtn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

// Add task function
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const task = {
    id: taskIdCounter++,
    text: text,
    completed: false,
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
}

// Toggle task completion
function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
}

// Clear completed tasks
function clearCompleted() {
  tasks = tasks.filter((t) => !t.completed);
  renderTasks();
}

// Clear all tasks
function clearAll() {
  tasks = [];
  renderTasks();
}

// Show empty state
function showEmptyState() {
  emptyState.style.display = "block";
  tasksList.style.display = "none";
  stats.style.display = "none";
  progressSection.style.display = "none";
}

// Show tasks list
function showTasksList() {
  emptyState.style.display = "none";
  tasksList.style.display = "block";
  stats.style.display = "block";
  progressSection.style.display = "block";
}

// Create task element
function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = `task-item ${task.completed ? "completed" : ""}`;

  taskDiv.innerHTML = `
                <div class="task-checkbox ${
                  task.completed ? "checked" : ""
                }" onclick="toggleTask(${task.id})">
                    ${task.completed ? "✓" : ""}
                </div>
                <div class="task-text ${
                  task.completed ? "completed" : ""
                }" onclick="toggleTask(${task.id})">
                    ${escapeHtml(task.text)}
                </div>
                <button class="delete-btn" onclick="deleteTask(${
                  task.id
                })">Delete</button>
            `;

  return taskDiv;
}

// Update progress
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  completedCount.textContent = completed;
  totalCount.textContent = total;
  completedCountBtn.textContent = completed;
  progressPercent.textContent = `${percentage}%`;
  progressFill.style.width = `${percentage}%`;

  clearCompletedBtn.disabled = completed === 0;
  clearCompletedBtn.style.opacity = completed === 0 ? "0.5" : "1";
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Main render function
function renderTasks() {
  if (tasks.length === 0) {
    showEmptyState();
  } else {
    showTasksList();

    // Clear existing tasks
    tasksList.innerHTML = "";

    // Add each task
    tasks.forEach((task) => {
      const taskElement = createTaskElement(task);
      tasksList.appendChild(taskElement);
    });

    updateProgress();
  }
}

// Event listeners
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
clearCompletedBtn.addEventListener("click", clearCompleted);
clearAllBtn.addEventListener("click", clearAll);

// Initialize the app
renderTasks();
