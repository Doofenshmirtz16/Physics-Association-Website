document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("publicationSearch");
  const container = document.getElementById("publications-list");
  let publicationData = [];

  fetch("/data/publications.json")
    .then(res => res.json())
    .then(data => {
      publicationData = data;
      renderPublications(publicationData);
    });

  function renderPublications(data) {
    container.innerHTML = "";
    data.forEach(pub => {
      const card = document.createElement("div");
      card.className = "card fade-in";
      card.innerHTML = `
        <h3>${pub.title}</h3>
        <p><strong>Authors:</strong> ${pub.authors}</p>
        <p><strong>Journal:</strong> ${pub.journal}</p>
        <p><strong>Year:</strong> ${pub.year}</p>
      `;
      container.appendChild(card);
    });
    revealOnScroll();
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = publicationData.filter(pub =>
      pub.title.toLowerCase().includes(query) ||
      pub.authors.toLowerCase().includes(query) ||
      pub.journal.toLowerCase().includes(query) ||
      pub.year.toString().includes(query)
    );
    renderPublications(filtered);
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
