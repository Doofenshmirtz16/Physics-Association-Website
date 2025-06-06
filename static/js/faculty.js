document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("facultySearch");
  const facultyList = document.getElementById("faculty-list");
  let facultyData = [];

  fetch("/data/faculty.json")
    .then(res => res.json())
    .then(data => {
      facultyData = data;
      renderFaculty(facultyData);
    });

  function renderFaculty(data) {
    facultyList.innerHTML = "";
    data.forEach(faculty => {
      const card = document.createElement("div");
      card.className = "faculty-card fade-in";
      card.innerHTML = `
        <img src="/static/images/faculty_blank.jpg" alt="${faculty.name}" class="faculty-photo" />
        <h3>${faculty.name}</h3>
        <p><strong>Specialization:</strong> ${faculty.specialization}</p>
        <p><strong>Email:</strong> ${faculty.email}</p>
        <p><strong>Education:</strong> ${faculty.education}</p>
        <p><strong>Research:</strong> ${faculty.research}</p>
        <p><strong>Publications:</strong> ${faculty.publications}</p>
        <p><strong>Office:</strong> ${faculty.office}</p>
        <p><strong>Phone:</strong> ${faculty.phone}</p>
      `;
      facultyList.appendChild(card);
    });

    revealOnScroll();
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = facultyData.filter(f =>
      f.name.toLowerCase().includes(query) ||
      f.specialization.toLowerCase().includes(query)
    );
    renderFaculty(filtered);
  });

  function revealOnScroll() {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
});
