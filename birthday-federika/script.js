document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       OPEN INVITATION
    ========================================= */

    const openInvitation = document.getElementById("openInvitation");
    const opening = document.getElementById("opening");
    const mainContent = document.getElementById("mainContent");

    if (openInvitation && opening && mainContent) {

        openInvitation.addEventListener("click", function () {

            opening.style.opacity = "0";
            opening.style.transform = "scale(1.03)";
            opening.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

            setTimeout(function () {

                opening.style.display = "none";
                mainContent.classList.add("visible");

                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });

            }, 800);


            /* =========================================
               START FLOWERS
            ========================================= */

            for (let i = 0; i < 15; i++) {

                setTimeout(function () {
                    createPetal();
                }, i * 200);

            }

        });

    }


    /* =========================================
       COUNTDOWN
    ========================================= */

    const targetDate =
        new Date("2026-10-14T18:00:00+08:00").getTime();

    function updateCountdown() {

        const now = new Date().getTime();
        const distance = targetDate - now;

        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");

        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            return;
        }

        if (distance > 0) {

            const days = Math.floor(
                distance / (1000 * 60 * 60 * 24)
            );

            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24))
                / (1000 * 60 * 60)
            );

            const minutes = Math.floor(
                (distance % (1000 * 60 * 60))
                / (1000 * 60)
            );

            const seconds = Math.floor(
                (distance % (1000 * 60))
                / 1000
            );

            daysElement.textContent =
                String(days).padStart(2, "0");

            hoursElement.textContent =
                String(hours).padStart(2, "0");

            minutesElement.textContent =
                String(minutes).padStart(2, "0");

            secondsElement.textContent =
                String(seconds).padStart(2, "0");

        } else {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

        }

    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    /* =========================================
       MUSIC
    ========================================= */

    const musicBtn = document.getElementById("musicBtn");
    const birthdayMusic = document.getElementById("birthdayMusic");

    let musicPlaying = false;

    if (musicBtn && birthdayMusic) {

        musicBtn.addEventListener("click", function () {

            if (!musicPlaying) {

                birthdayMusic.play()
                    .then(function () {

                        musicPlaying = true;

                        musicBtn.classList.add("playing");
                        musicBtn.innerHTML = "❚❚";

                    })
                    .catch(function (error) {

                        console.error("Music error:", error);

                        alert(
                            "Lagu tidak bisa diputar. Pastikan file ada di folder music dan namanya birthday.mp3"
                        );

                    });

            } else {

                birthdayMusic.pause();

                musicPlaying = false;

                musicBtn.classList.remove("playing");
                musicBtn.innerHTML = "♫";

            }

        });

    }


    /* =========================================
       REVEAL ANIMATION
    ========================================= */

    const sections = document.querySelectorAll(".section");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform =
                            "translateY(0)";

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


        sections.forEach(function (section) {

            section.style.opacity = "0";

            section.style.transform =
                "translateY(30px)";

            section.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

            observer.observe(section);

        });

    }


    /* =========================================
       FALLING FLOWERS
    ========================================= */

    function createPetal() {

        const petal = document.createElement("div");

        const flowers = [
            "🌸",
            "🌷",
            "🌺",
            "♡"
        ];

        const randomIndex =
            Math.floor(Math.random() * flowers.length);

        petal.innerText = flowers[randomIndex];

        petal.style.position = "fixed";
        petal.style.top = "-30px";

        petal.style.left =
            Math.random() * 100 + "vw";

        petal.style.fontSize =
            (Math.random() * 12 + 10) + "px";

        petal.style.opacity =
            Math.random() * 0.5 + 0.3;

        petal.style.pointerEvents = "none";
        petal.style.zIndex = "9999";

        document.body.appendChild(petal);


        const duration =
            Math.random() * 5000 + 4000;

        const rotation =
            Math.random() * 360;


        petal.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)"
                },
                {
                    transform:
                        "translateY(110vh) rotate(" +
                        rotation +
                        "deg)"
                }
            ],
            {
                duration: duration,
                easing: "linear"
            }
        );


        setTimeout(function () {

            petal.remove();

        }, duration);

    }


    /* =========================================
       CONTINUOUS FLOWERS
    ========================================= */

    setInterval(function () {

        if (
            mainContent &&
            mainContent.classList.contains("visible")
        ) {

            createPetal();

        }

    }, 1800);

});
/* =========================================
   FLORAL GALLERY LIGHTBOX
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const photoButtons = document.querySelectorAll(
        ".memory-photo-button"
    );

    const lightbox = document.getElementById("memoryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeButton = document.getElementById("lightboxClose");

    if (!lightbox || !lightboxImage || !closeButton) {
        return;
    }

    let previousFocus = null;

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        lightboxImage.src = "";

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    photoButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const image = button.querySelector("img");

            if (!image) return;

            previousFocus = button;

            lightboxImage.src = button.dataset.photo;
            lightboxImage.alt = image.alt;

            lightboxCaption.textContent =
                button.dataset.caption || "";

            lightbox.classList.add("is-open");
            lightbox.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";

            closeButton.focus();

        });

    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("is-open")
        ) {
            closeLightbox();
        }

    });

});
// BACKGROUND MUSIC - SWEET 17 FEDERIKA

const birthdayMusic = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");
const openInvitation = document.getElementById("openInvitation");

if (birthdayMusic && musicBtn) {
    birthdayMusic.volume = 0.5;

    function updateMusicButton() {
        const playing = !birthdayMusic.paused;

        musicBtn.textContent = playing ? "♫" : "♪";
        musicBtn.title = playing ? "Matikan musik" : "Putar musik";
        musicBtn.setAttribute("aria-pressed", String(playing));
    }

    async function playMusic() {
        try {
            await birthdayMusic.play();
        } catch (error) {
            console.log("Autoplay diblokir browser.");
        }

        updateMusicButton();
    }

    // Coba putar musik saat halaman dibuka.
    window.addEventListener("load", () => {
        playMusic();
    });

    // Interaksi membuka undangan menjadi cadangan.
    if (openInvitation) {
        openInvitation.addEventListener("click", () => {
            playMusic();
        });
    }

    // Tombol musik untuk ON/OFF.
    musicBtn.addEventListener("click", async () => {
        if (birthdayMusic.paused) {
            await playMusic();
        } else {
            birthdayMusic.pause();
            updateMusicButton();
        }
    });

    birthdayMusic.addEventListener("play", updateMusicButton);
    birthdayMusic.addEventListener("pause", updateMusicButton);

    updateMusicButton();
}