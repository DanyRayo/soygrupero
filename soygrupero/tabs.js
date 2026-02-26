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