document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("lab-list");
  const searchInput = document.getElementById("labSearch");
  let labData = [];

  fetch("/data/labs.json")
    .then(res => res.json())
    .then(data => {
      labData = data;
      renderLabs(labData);
    });

  function renderLabs(data) {
    container.innerHTML = "";
    data.forEach(lab => {
      const card = document.createElement("section");
      card.className = "glass-section fade-in lab-card";
      card.innerHTML = `
        <img src="${lab.image}" alt="${lab.name}" />
        <div>
          <h3>${lab.name}</h3>
          <p><strong>In-charge:</strong> ${lab.incharge}</p>
          <p><strong>Equipment:</strong> ${lab.equipment}</p>
          <p><strong>Description:</strong> ${lab.description}</p>
        </div>
      `;
      container.appendChild(card);
    });

    revealOnScroll();
  }


  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();
    const filtered = labData.filter(lab =>
      lab.name.toLowerCase().includes(q) ||
      lab.equipment.toLowerCase().includes(q) ||
      lab.incharge.toLowerCase().includes(q)
    );
    renderLabs(filtered);
  });

  function revealOnScroll() {
    const els = document.querySelectorAll(".fade-in");
    els.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
});
