document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("achievements-list");
  const searchInput = document.getElementById("achievementSearch");
  let achievementsData = [];

  fetch("/data/achievements.json")
    .then(res => res.json())
    .then(data => {
      achievementsData = data;
      renderAchievements(achievementsData);
    });

  function renderAchievements(data) {
    container.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "card fade-in";
      card.innerHTML = `
        <h3>${item.student}</h3>
        <p><strong>Award:</strong> ${item.award}</p>
      `;
      container.appendChild(card);
    });

    revealOnScroll();
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = achievementsData.filter(item =>
      item.student.toLowerCase().includes(query) ||
      item.award.toLowerCase().includes(query)
    );
    renderAchievements(filtered);
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
