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

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

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

renderJobs();

btnNew.addEventListener("click", function () {
  let tdaInput = document.querySelector("#tda-new-input");

  if (tdaInput.value === "") {
    alert("Bạn chưa nhập tên công việc của mình");
    return;
  }

  jobs.push(tdaInput.value);

  localStorage.setItem("jobs", JSON.stringify(jobs));

  renderJobs();

  tdaInput.value = "";
});

list.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    let index = e.target.dataset.index;
    jobs.splice(index, 1);

    localStorage.setItem("jobs", JSON.stringify(jobs));

    renderJobs();
  }
});

dltList.addEventListener("click", function () {
  list.innerHTML = "";

  jobs = [];

  localStorage.setItem("jobs", JSON.stringify(jobs));
});
