function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
        slide.classList.toggle("active-slide", i === currentSlide);
    });

    // Retrieve the data-color attribute
    const slideColor = slides[currentSlide].getAttribute("data-color");

    // Apply the color if defined, else hide the top bar
    if (slideColor) {
        topBar.style.backgroundColor = slideColor;
        topBar.style.display = "block";
    } else {
        topBar.style.display = "none";
    }
}

document.querySelector(".prev").addEventListener("click", () => changeSlide(-1));
document.querySelector(".next").addEventListener("click", () => changeSlide(1));

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        changeSlide(-1);
    } else if (e.key === "ArrowRight") {
        changeSlide(1);
    }
});
