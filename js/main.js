let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let isTransitioning = false;

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active-slide", i === currentSlide);
    });

    isTransitioning = false;

    addFallingImage();
}

function changeSlide(offset) {
    if (!isTransitioning) {
        isTransitioning = true;
        showSlide(currentSlide + offset);
    }
}

prevButton.onclick = () => changeSlide(-1);
nextButton.onclick = () => changeSlide(1);

document.addEventListener("keydown", (e) => {
    if (!isTransitioning) {
        if (e.key === "ArrowLeft") {
            changeSlide(-1);
        } else if (e.key === "ArrowRight") {
            changeSlide(1);
        }
    }
});


