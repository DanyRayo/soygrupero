/*-------------------Menu mobile-------------------*/
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
overlay.addEventListener("click", function(e) {
    if (e.target === overlay) {
        closeMenu();
    }
});

/*-----------------------------Slider de hero ---------------------- */
const track = document.querySelector(".hero-slider__track");
const slides = document.querySelectorAll(".hero-slider__item");
const prevBtn = document.querySelector(".hero-slider__arrow--prev");
const nextBtn = document.querySelector(".hero-slider__arrow--next");

let currentIndex = 0;
const totalSlides = slides.length;

function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    updateSlider();
}

function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }
    updateSlider();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

/*--------------------Colapsar descripción--------------------*/
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".destacado-meta__toggle");
    const text = document.querySelector(".destacado-meta__text");
    const toggleText = document.querySelector(".toggle-text");

    toggleBtn.addEventListener("click", function () {

        const isOpen = text.classList.contains("is-open");

        if (isOpen) {
            text.style.maxHeight = null;
            text.classList.remove("is-open");
            toggleBtn.classList.remove("rotate");
            toggleText.textContent = "Ver descripción";
        } else {
            text.classList.add("is-open");
            text.style.maxHeight = text.scrollHeight + "px";
            toggleBtn.classList.add("rotate");
            toggleText.textContent = "Ocultar descripción";
        }

    });
});

/*-------------------compartir---------------------------*/
const btnCompartir = document.getElementById("btnCompartir");

function fallbackCopy(texto) {
    const textarea = document.createElement("textarea");
    textarea.value = texto;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        const successful = document.execCommand("copy");
        if (successful) {
            alert("Enlace copiado al portapapeles");
        } else {
            alert("No se pudo copiar el enlace");
        }
    } catch (err) {
        alert("No se pudo copiar el enlace");
    }

    document.body.removeChild(textarea);
}

btnCompartir.addEventListener("click", async () => {

    const videoIframe = document.querySelector(".destacado-frame iframe");
    const videoURL = videoIframe ? videoIframe.src : window.location.href;

    const shareData = {
        title: "Video Destacado",
        text: "Mira este video destacado:",
        url: videoURL
    };

    // 1️⃣ Intentar Web Share (móviles modernos)
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            return;
        } catch (err) {
            console.log("Share cancelado o error:", err);
        }
    }

    // 2️⃣ Intentar Clipboard moderno
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(videoURL);
            alert("Enlace copiado al portapapeles");
            return;
        } catch (err) {
            console.log("Clipboard falló, usando fallback");
        }
    }

    // 3️⃣ Fallback para iPhone viejo
    fallbackCopy(videoURL);

});
/*-------------------Shorts preview (Dailymotion)-------------------*/
console.log("SHORTS HOVER PREVIEW ACTIVO");

/* ---------- CONFIGURACIÓN ---------- */
const shorts = [
    {
        id: "x9uzzy0",
        thumb: "./assets/img/shorts/dailymotion-short-1.webp"
    },
    {
        id: "x9b2r54",
        thumb: "./assets/img/shorts/dailymotion-short-2.webp"
    },
    {
        id: "x99vfww",
        thumb: "./assets/img/shorts/dailymotion-short-3.webp"
    }
];

const container = document.getElementById("shortsContainer");

if (container) {

    shorts.forEach(({ id, thumb }) => {

        const item = document.createElement("div");
        item.className = "shorts-item";

        item.innerHTML = `
            <div class="shorts-item__bg"></div>
            <div class="shorts-thumb">
                <img 
                    src="${thumb}"
                    alt="Short preview"
                    loading="lazy"
                    decoding="async"
                    width="720"
                    height="1280"
                />
            </div>
        `;

        const thumbContainer = item.querySelector(".shorts-thumb");
        let iframe = null;

        /* -------- HOVER (solo desktop) -------- */
        item.addEventListener("mouseenter", () => {
            if (window.innerWidth > 768 && !iframe) {

                iframe = document.createElement("iframe");
                iframe.src = `https://www.dailymotion.com/embed/video/${id}?autoplay=1&mute=1&loop=1`;
                iframe.allow = "autoplay";
                iframe.className = "shorts-preview";
                iframe.loading = "lazy";

                thumbContainer.appendChild(iframe);
            }
        });

        item.addEventListener("mouseleave", () => {
            if (iframe) {
                iframe.remove();
                iframe = null;
            }
        });

        /* -------- CLICK -------- */
        item.addEventListener("click", () => {
            window.open(`https://www.dailymotion.com/video/${id}`, "_blank");
        });

        container.appendChild(item);
    });

}

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

/*-------------Botón cambiar a modo oscuro -------------*/
document.addEventListener("DOMContentLoaded", () => {
    const switcher = document.querySelector(".switcher__btn");
    if (!switcher) return;

    const iconLight = switcher.querySelector(".switcher__icon-light");
    const iconDark = switcher.querySelector(".switcher__icon-dark");
    const DARK_LINK_ID = "dark-mode-stylesheet";

    const enableDarkMode = () => {
        let link = document.getElementById(DARK_LINK_ID);
        if (!link) {
            link = document.createElement("link");
            link.id = DARK_LINK_ID;
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = "./assets/css/dark-mode.css";
            document.head.appendChild(link);
        }

        if (iconLight) iconLight.style.display = "none";
        if (iconDark) iconDark.style.display = "inline-block";
    };

    const disableDarkMode = () => {
        const link = document.getElementById(DARK_LINK_ID);
        if (link) link.remove();

        if (iconLight) iconLight.style.display = "inline-block";
        if (iconDark) iconDark.style.display = "none";
    };

    switcher.addEventListener("click", () => {
        const isDark = !!document.getElementById(DARK_LINK_ID);
        if (isDark) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
});

/*-------------Botón volver arriba -------------*/
document.addEventListener("DOMContentLoaded", () => {
    const backTopBtn = document.querySelector(".btn-back-top");
    if (!backTopBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backTopBtn.classList.add("btn-back-top--visible");
        } else {
            backTopBtn.classList.remove("btn-back-top--visible");
        }
    });

    backTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

/*-------------Animaciones fade-in al hacer scroll -------------*/
document.addEventListener("DOMContentLoaded", () => {
    const fadeEls = document.querySelectorAll(".fade-in");
    if (!fadeEls.length) return;

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in--visible");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        fadeEls.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback simple: mostrar todo sin animación avanzada
        fadeEls.forEach(el => el.classList.add("fade-in--visible"));
    }
});