const header = document.querySelector(".header");
const overlay = document.getElementById("mobile-menu");
const toggle = document.getElementById("menu-toggle");
const closeBtn = document.getElementById("menu-close");
const menuItems = document.querySelectorAll(".header-overlay__menu li");

/* Abrir menú */
function openMenu() {
    header.classList.add("hidden");
    overlay.classList.add("active");
}

/* Cerrar menú */
function closeMenu() {
    overlay.classList.remove("active");
    header.classList.remove("hidden");
}

/* Click hamburguesa */
toggle.addEventListener("click", openMenu);

/* Click botón cerrar */
closeBtn.addEventListener("click", closeMenu);

/* Click en cualquier li */
menuItems.forEach(item => {
    item.addEventListener("click", closeMenu);
});

/* Click fuera del contenido (overlay) */
overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
        closeMenu();
    }
});

/*-------------Tabs para el directorio -------------*/
document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".dgm-tab-btn");
    const cards = document.querySelectorAll(".dgm-grid-tabs .dgm-card");

    function filterCards(type) {
        cards.forEach(card => {
            card.classList.toggle("hidden", card.dataset.type !== type);
        });
    }

    // Inicializa mostrando editores
    filterCards("editores");

    buttons.forEach(button => {
        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            filterCards(button.dataset.target);
        });
    });

});