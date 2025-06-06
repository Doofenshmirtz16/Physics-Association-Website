document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("curriculumSearch");
  const rows = document.querySelectorAll(".glass-table tbody tr");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    rows.forEach(row => {
      const semester = row.cells[0].textContent.toLowerCase();
      const subjects = row.cells[1].textContent.toLowerCase();
      const match = semester.includes(query) || subjects.includes(query);
      row.style.display = match ? "" : "none";
    });
  });
});