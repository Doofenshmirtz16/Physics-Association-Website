document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("research-list");
  const chartCanvas = document.getElementById("researchChart");
  const searchInput = document.getElementById("researchSearch");

  let researchData = [];

  fetch("/data/research.json")
    .then(res => res.json())
    .then(data => {
      researchData = data;
      renderResearch(researchData);
      renderChart(researchData);
    });

  function renderResearch(data) {
    listContainer.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "card fade-in";
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p><strong>Lead:</strong> ${item.lead}</p>
        <p>${item.description}</p>
      `;
      listContainer.appendChild(card);
    });
    revealOnScroll();
  }

  function renderChart(data) {
    const counts = {};
    data.forEach(item => {
      counts[item.lead] = (counts[item.lead] || 0) + 1;
    });

    const ctx = chartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(counts),
        datasets: [{
          label: "Research Projects",
          data: Object.values(counts),
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    });

    revealOnScroll();
  }

  // 🔍 Search filter
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = researchData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.lead.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
    renderResearch(filtered);
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
