document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "theme-toggle";
  toggleBtn.textContent = "Toggle Theme";
  toggleBtn.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #1a73e8;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 16px;
    font-size: 14px;
    box-shadow: 2px 2px 6px #888;
    cursor: pointer;
    z-index: 1000;
  `;
  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });

  // Load from localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger-btn");
    const sidebar = document.querySelector(".sidebar");

    if (hamburger && sidebar) {
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebar.classList.toggle("open");
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener("click", (e) => {
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                e.target !== hamburger) {
                sidebar.classList.remove("open");
            }
        });

        // Close sidebar when a navigation link is clicked (optional)
        const navLinks = document.querySelectorAll('.sidebar nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove("open");
                }
            });
        });
    }
});