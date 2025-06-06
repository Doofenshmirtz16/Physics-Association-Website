function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
}

window.onload = () => {
  // Apply saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
  }

  // Announcements
  fetch("/data/announcements.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("announcement-list");
    if (container) {
      data.forEach(item => {
        const row = document.createElement("div");
        row.className = "ticker-row";

        const content = document.createElement("div");
        content.className = "ticker-content";

        const span = document.createElement("span");
        span.textContent = "📢 " + item.message;

        content.appendChild(span);
        row.appendChild(content);
        container.appendChild(row);
      });
    }
  });
};
