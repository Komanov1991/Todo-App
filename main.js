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
let btnNew = document.querySelector("#tda-new-btn");
let list = document.querySelector(".tda-list");
let dltList = document.querySelector("#tda-clear-btn");

// Lấy dữ liệu từ localStorage
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// Hàm render công việc ra giao diện
function renderJobs() {
  list.innerHTML = "";
  jobs.forEach((job, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="text">${job}</span>
      <button class="delete" data-index="${index}">Delete</button>
    `;
    list.appendChild(li);
  });
}

// Lần đầu mở trang → render dữ liệu đã lưu
renderJobs();

// Thêm công việc
btnNew.addEventListener("click", function () {
  let tdaInput = document.querySelector("#tda-new-input");

  if (tdaInput.value === "") {
    alert("Bạn chưa nhập tên công việc của mình");
    return;
  }

  // Thêm vào mảng
  jobs.push(tdaInput.value);

  // Lưu vào localStorage
  localStorage.setItem("jobs", JSON.stringify(jobs));

  // Render lại danh sách
  renderJobs();

  tdaInput.value = "";
});

// Xóa từng công việc
list.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    let index = e.target.dataset.index;
    jobs.splice(index, 1); // xóa 1 phần tử theo index

    // Lưu lại vào localStorage
    localStorage.setItem("jobs", JSON.stringify(jobs));

    renderJobs();
  }
});

// Xóa toàn bộ
dltList.addEventListener("click", function () {
  list.innerHTML = "";

  jobs = []; // làm rỗng mảng

  // Cập nhật localStorage
  localStorage.setItem("jobs", JSON.stringify(jobs));
});
