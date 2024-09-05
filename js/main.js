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

    addFallingImage();

    setTimeout(() => {
        isTransitioning = false;
    }, 300); 
}

function changeSlide(offset) {
    if (!isTransitioning) {
        isTransitioning = true; 
        showSlide(currentSlide + offset); 
    }
}


function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}


function handleOrientationChange() {
    const video = document.getElementById('rotateVideo');


    if (isMobileDevice()) {
        if (window.innerHeight > window.innerWidth) {

            video.style.display = 'block';
            video.play();
        } else {

            video.style.display = 'none';
            video.pause();
        }
    }
}


window.addEventListener('resize', handleOrientationChange);


document.addEventListener('DOMContentLoaded', handleOrientationChange);


prevButton.addEventListener('pointerup', () => {
    if (!isTransitioning) {
        changeSlide(-1);
    }
});

nextButton.addEventListener('pointerup', () => {
    if (!isTransitioning) {
        changeSlide(1);
    }
});


document.addEventListener("keydown", (e) => {
    if (!isTransitioning) {
        if (e.key === "ArrowLeft") {
            changeSlide(-1);
        } else if (e.key === "ArrowRight") {
            changeSlide(1);
        }
    }
});


let startX = 0;
let endX = 0;

document.addEventListener("pointerdown", function(e) {
    startX = e.clientX || e.touches?.[0]?.clientX;
});

document.addEventListener("pointermove", function(e) {
    endX = e.clientX || e.touches?.[0]?.clientX;
});

document.addEventListener("pointerup", function() {
    let swipeDistance = endX - startX;

    if (!isTransitioning) {
        if (swipeDistance > 50) {

            changeSlide(-1);
        } else if (swipeDistance < -50) {
  
            changeSlide(1);
        }
    }
});

function adjustSlideshowHeight() {
    const vh = window.innerHeight * 0.01;
    document.querySelector('.slideshow-container').style.height = `${vh * 100}px`;
}


window.addEventListener('DOMContentLoaded', () => {
    adjustSlideshowHeight();
});


window.addEventListener('resize', () => {
    adjustSlideshowHeight();
});
