// let btnNew = document.querySelector("#tda-new-btn");
// let list = document.querySelector(".tda-list");
// btnNew.addEventListener("click", function (e) {
//   let tdaInput = document.querySelector("#tda-new-input");
//   if (tdaInput.value === "") {
//     alert("Bạn chưa nhập tên công việc của mình");
//     return;
//   }

//   const li = document.createElement("li");
//   li.innerHTML = `
//   <span class="text">${tdaInput.value}</span>
//   <button class="delete">Delete</button>
//   `;
//   list.appendChild(li);
//   tdaInput.value = "";
// });
// list.addEventListener("click", function (e) {
//   e.target.closest("li").remove();
// });

// let dltList = document.querySelector("#tda-clear-btn");
// dltList.addEventListener("click", function (e) {
//   list.innerHTML = "";
// });

// let btnNew = document.querySelector("#tda-new-btn");
// let list = document.querySelector(".tda-list");
// let dltList = document.querySelector("#tda-clear-btn");

// let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// function renderJobs() {
//   list.innerHTML = "";
//   jobs.forEach((job, index) => {
//     const li = document.createElement("li");
//     li.innerHTML = `
//       <span class="text">${job}</span>
//       <button class="delete" data-index="${index}">Delete</button>
//     `;
//     list.appendChild(li);
//   });
// }

// renderJobs();

// btnNew.addEventListener("click", function () {
//   let tdaInput = document.querySelector("#tda-new-input");

//   if (tdaInput.value === "") {
//     alert("Bạn chưa nhập tên công việc của mình");
//     return;
//   }

//   jobs.push(tdaInput.value);

//   localStorage.setItem("jobs", JSON.stringify(jobs));

//   renderJobs();

//   tdaInput.value = "";
// });

// list.addEventListener("click", function (e) {
//   if (e.target.classList.contains("delete")) {
//     let index = e.target.dataset.index;
//     jobs.splice(index, 1);

//     localStorage.setItem("jobs", JSON.stringify(jobs));

//     renderJobs();
//   }
// });

// dltList.addEventListener("click", function () {
//   list.innerHTML = "";

//   jobs = [];

//   localStorage.setItem("jobs", JSON.stringify(jobs));
// });
let btnNew = document.querySelector("#tda-new-btn");
let list = document.querySelector(".tda-list");
let dltList = document.querySelector("#tda-clear-btn");

// Lấy dữ liệu từ Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tất cả công việc
function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="text ${task.done ? "done" : ""}">
        ${task.name} 
        <small style="color: gray; font-size: 12px;">(${
          task.created_at
        })</small>
      </span>

      <div class="actions">
        <button onclick="toggleDone(${index})" class="done-btn">
          ${task.done ? "Undo" : "Done"}
        </button>
        <button onclick="editTask(${index})" class="edit">Edit</button>
        <button onclick="deleteTask(${index})" class="delete">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// Lần đầu mở trang → render
renderTasks();

// ➤ 1. Thêm công việc
btnNew.addEventListener("click", function () {
  let inputBox = document.querySelector("#tda-new-input");
  let input = inputBox.value.trim();

  if (input === "") {
    alert("Bạn chưa nhập tên công việc!");
    return;
  }

  // Không cho trùng tên
  if (tasks.some((t) => t.name.toLowerCase() === input.toLowerCase())) {
    alert("Công việc đã tồn tại!");
    return;
  }

  // Tạo task mới
  let newTask = {
    name: input,
    done: false,
    created_at: new Date().toLocaleString("vi-VN"),
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  inputBox.value = "";
  renderTasks();
});

// ➤ 2. Đánh dấu hoàn thành
function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// ➤ 3. Xóa một task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// ➤ 4. Sửa task
function editTask(index) {
  let newName = prompt("Nhập tên mới:", tasks[index].name);

  if (newName === null) return;
  newName = newName.trim();
  if (newName === "") return;

  // Không cho trùng tên sau khi sửa
  if (
    tasks.some(
      (t, i) => t.name.toLowerCase() === newName.toLowerCase() && i !== index
    )
  ) {
    alert("Tên công việc bị trùng!");
    return;
  }

  tasks[index].name = newName;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// ➤ 5. Xóa toàn bộ
dltList.addEventListener("click", function () {
  if (!confirm("Bạn có chắc muốn xóa tất cả công việc?")) return;

  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
});
