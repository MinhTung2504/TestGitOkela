var coursesApi = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourses);

  handleCreateForm();
}

start();

// Functions CRUD
function getCourses(callback) {
  fetch(coursesApi)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}

function createCourse(data, callback) {
  var options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(coursesApi, options)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}

function handleDeleteCourse(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(coursesApi + "/" + id, options)
    .then(function (res) {
      res.json();
    })
    .then(function () {
      var courseToDelete = document.querySelector(".course-item-" + id);
      courseToDelete.remove();
    });
}

function getOneCourse() {
  fetch(coursesApi + "/" + id).then((res) => res.json);
}

function renderCourses(courses) {
  var listCoursesBlock = document.querySelector("#list-courses");
  var htmls = courses.map(function (course) {
    return `
    <li class="course-item-${course.id}">
      <h4>${course.title}</h4>
      <p>${course.description}</p>
      <button onclick = "handleDeleteCourse(${course.id})">Delete</button>
      <button id="course-${course.id}" onclick = "handleUpdateForm(${course.id})">Update</button>
    </li>`;
  });
  listCoursesBlock.innerHTML = htmls.join("");
}

function handleCreateForm() {
  document.querySelector("#create").addEventListener("click", function () {
    var name = document.querySelector('input[name="name"]').value;

    var description = document.querySelector('input[name="description"]').value;

    var formData = {
      title: name,
      description: description,
    };
    createCourse(formData, function () {
      getCourses(renderCourses);
    });
  });
}

function putCourse(id, data) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(courseApi + "/" + id, options)
    .then(function (response) {
      response.json();
    })
    .then(function (callback) {});
}

function handleUpdateCourse(id) {
  var createBtn = document.querySelector("#create");
  var name = document.querySelector('input[name="name"]');
  var description = document.querySelector('input[name="description"]');
  createBtn.innerHTML = "Update";
  var courseName = document.querySelector(
    ".course-item-name-" + id
  ).textContent;
  var courseDesc = document.querySelector(
    ".course-item-desc-" + id
  ).textContent;
  name.value = courseName;
  description.value = courseDesc;
  createBtn.onclick = function () {
    var data = {
      Name: name.value,
      description: description.value,
    };
    putCourse(id, data);
  };
}
