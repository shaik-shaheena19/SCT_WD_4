document.getElementById("addTaskBtn").addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput");
  const datetimeInput = document.getElementById("datetimeInput");

  const taskName = taskInput.value.trim();
  const datetimeValue = datetimeInput.value;

  if (!taskName || !datetimeValue) {
    alert("Please enter both task and date/time.");
    return;
  }

  const date = new Date(datetimeValue);
  const formattedDate = date.toLocaleDateString("en-GB");
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const taskList = document.getElementById("taskList");

  const taskItem = document.createElement("div");
  taskItem.className = "task-item";

  const tick = document.createElement("span");
  tick.className = "tick";
  tick.innerText = "✔️";

  const content = document.createElement("div");
  content.className = "task-content";

  const taskNameEl = document.createElement("p");
  taskNameEl.innerHTML = `${taskName}`; // ✅ Only task name, no emoji

  const taskDateEl = document.createElement("p");
  taskDateEl.innerHTML = `📅 ${formattedDate}`;
  const taskTimeEl = document.createElement("p");
  taskTimeEl.innerHTML = `🕒 ${formattedTime}`;

  content.appendChild(taskNameEl);
  content.appendChild(taskDateEl);
  content.appendChild(taskTimeEl);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(taskItem);
  });

  tick.addEventListener("click", () => {
    taskNameEl.classList.toggle("strike");
    taskDateEl.classList.toggle("strike");
    taskTimeEl.classList.toggle("strike");
  });

  taskItem.appendChild(tick);
  taskItem.appendChild(content);
  taskItem.appendChild(deleteBtn);

  taskList.appendChild(taskItem);

  taskInput.value = "";
  datetimeInput.value = "";
  datetimeInput.type = "text";
  const placeholder = document.getElementById("placeholderText");
  placeholder.classList.remove("hidden");
  placeholder.classList.remove("blue");
  document.querySelector(".calendar-icon").classList.remove("active");
});

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

document.getElementById("exportTasks").addEventListener("click", () => {
  const tasks = document.querySelectorAll(".task-content");
  let content = "📋 To-Do List\n\n";
  tasks.forEach(task => {
    const lines = task.querySelectorAll("p");
    lines.forEach(line => {
      content += line.innerText + "\n";
    });
    content += "\n";
  });

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "To-Do_List.txt";
  link.click();
});

// 📅 Calendar Icon Behavior
function highlightDate() {
  const icon = document.querySelector(".calendar-icon");
  const input = document.getElementById("datetimeInput");
  const placeholder = document.getElementById("placeholderText");

  icon.classList.toggle("active");
  placeholder.classList.add("blue");

  setTimeout(() => {
    placeholder.classList.add("hidden");
    input.type = "datetime-local";
    input.focus();
  }, 300);
}
