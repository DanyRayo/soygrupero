console.log("MAIN JS FUNCIONANDO");

const shorts = [
  { id: "WuOYQaVBdYU" },
  { id: "TYOTDMW5zTE" },
  { id: "FnP4qgLWMUc" }
];

const container = document.getElementById("shortsContainer");

shorts.forEach(video => {

  const item = document.createElement("div");
  item.className = "shorts-item";

  item.innerHTML = `
    <div class="shorts-item__bg"></div>
    <div class="shorts-thumb">
      <img 
        src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg"
        alt="YouTube Short"
        loading="lazy"
      />
    </div>
  `;

  let iframe = null;

  item.addEventListener("mouseenter", () => {
    if (window.innerWidth > 768 && !iframe) {
      iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}`;
      iframe.allow = "autoplay";
      iframe.className = "shorts-preview";
      item.appendChild(iframe);
    }
  });

  item.addEventListener("mouseleave", () => {
    if (iframe) {
      iframe.remove();
      iframe = null;
    }
  });

  item.addEventListener("click", () => {
    window.open(`https://youtube.com/shorts/${video.id}`, "_blank");
  });

  container.appendChild(item);
});

//-------------Función del reproductor--------------///
document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(".player__item");
    const iframe = document.getElementById("player-frame");

    const title = document.querySelector(".player__title");
    const date = document.querySelector(".player__date");
    const badge = document.querySelector(".player__badge");

    items.forEach(item => {
        item.addEventListener("click", () => {

            const videoId = item.dataset.video;
            const newTitle = item.dataset.title;
            const newDate = item.dataset.date;
            const newBadge = item.dataset.badge;

            // Cambiar video con autoplay
            iframe.src = `https://www.dailymotion.com/embed/video/${videoId}?autoplay=1`;

            // Actualizar contenido
            title.textContent = newTitle;
            date.textContent = newDate;
            badge.textContent = newBadge;

            // Estado activo
            items.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

        });
    });

});
