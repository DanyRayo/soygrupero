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
overlay.addEventListener("click", function (e) {
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
document.addEventListener('DOMContentLoaded', () => {
    // 1. Referencias a los elementos del DOM
    const btnCompartir = document.getElementById('btnCompartir');
    const shareModal = document.getElementById('shareModal');
    const closeShare = document.getElementById('closeShare');
    const btnCopyLink = document.getElementById('copyLink');
    const btnShareWA = document.getElementById('shareWA');
    const btnShareFB = document.getElementById('shareFB');

    // 2. Datos del video (puedes hacer que estos sean dinámicos después)
    const videoData = {
        title: "Oscar Ortíz: La nueva promesa del regional mexicano",
        url: "https://www.dailymotion.com/video/x9zcgxk",
        text: "Mira esta entrevista exclusiva en Soy Grupero: "
    };

    // 3. Función para abrir el compartidor
    const abrirCompartir = async () => {
        // Si el navegador soporta el menú nativo Y estamos en HTTPS
        if (navigator.share && location.protocol === 'https:') {
            try {
                await navigator.share({
                    title: videoData.title,
                    text: videoData.text,
                    url: videoData.url
                });
            } catch (err) {
                console.log("Compartir nativo cancelado o fallido");
            }
        } else {
            // Si estamos en desarrollo (HTTP) o no hay soporte nativo, abrimos tu modal
            mostrarModal();
        }
    };

    // 4. Lógica del Modal Personalizado
    function mostrarModal() {
        // Configurar los enlaces de redes sociales antes de mostrar
        const encodedText = encodeURIComponent(videoData.text + " " + videoData.url);
        const encodedURL = encodeURIComponent(videoData.url);

        btnShareWA.href = `https://api.whatsapp.com/send?text=${encodedText}`;
        // Cambia la línea de FB por esta:
        btnShareFB.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoData.url)}`;

        // Mostrar el modal
        shareModal.classList.add('active');
    }

    function cerrarModal() {
        shareModal.classList.remove('active');
    }

    // 5. Lógica del botón "Copiar Enlace"
    btnCopyLink.onclick = function () {
        navigator.clipboard.writeText(videoData.url).then(() => {
            // Guardamos el contenido original para restaurarlo luego
            const originalHTML = this.innerHTML;

            // Feedback visual: cambia texto y color
            this.innerHTML = '<i class="bi bi-check-lg"></i> ¡Enlace copiado!';
            this.style.backgroundColor = "#28a745"; // Verde éxito

            // Esperamos 1 segundo para que el usuario lo vea
            setTimeout(() => {
                cerrarModal();

                // Restauramos el botón después de que el modal se oculte
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.backgroundColor = "";
                }, 400);
            }, 1000);

        }).catch(err => {
            // Plan B si el navegador bloquea el copiado (común en HTTP)
            alert("Copia este enlace: " + videoData.url);
            cerrarModal();
        });
    };

    // 6. Eventos de clic
    btnCompartir.addEventListener('click', (e) => {
        e.preventDefault();
        abrirCompartir();
    });

    closeShare.addEventListener('click', cerrarModal);

    // Cerrar si hace clic fuera del contenido blanco (en el fondo oscuro)
    window.addEventListener('click', (e) => {
        if (e.target === shareModal) {
            cerrarModal();
        }
    });
});

/*-------------------Shorts preview (Dailymotion)-------------------*/
console.log("SHORTS HOVER PREVIEW ACTIVO");

/* ---------- CONFIGURACIÓN ---------- */
const shorts = [{
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

    shorts.forEach(({
        id,
        thumb
    }) => {

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
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
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