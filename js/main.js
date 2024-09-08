let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let isTransitioning = false;
let debounceTimeout;
let startX = 0;
let endX = 0;
let isSwiping = false;
let buttonClicked = false;

// Function to display the correct slide
function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
        slide.classList.toggle("active-slide", i === currentSlide);
    });
    addFallingImage(); // Adjust if needed
}

// Function to change the slide
function changeSlide(offset) {
    if (!isTransitioning) {
        isTransitioning = true;

        // Clear any previous debounce timer
        clearTimeout(debounceTimeout);

        // Show the next/previous slide
        showSlide(currentSlide + offset);

        // Set a debounce to prevent rapid transitions
        debounceTimeout = setTimeout(() => {
            isTransitioning = false;
        }, 300); // Adjust the delay as needed
    }
}

// Detect if the device is mobile
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Event listeners for desktop (pointerup)
if (!isMobileDevice()) {
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
}

// Swipe detection for mobile (touch events)
if (isMobileDevice()) {
    document.addEventListener("touchstart", function(e) {
        startX = e.touches[0].clientX;
        isSwiping = false; // Reset swipe state
    });

    document.addEventListener("touchmove", function(e) {
        endX = e.touches[0].clientX;
        let swipeDistance = endX - startX;
        if (Math.abs(swipeDistance) > 50) { // Threshold for swipe
            isSwiping = true;
        }
    });

    document.addEventListener("touchend", function() {
        let swipeDistance = endX - startX;
        if (!isTransitioning && isSwiping) {
            if (swipeDistance > 50) {
                changeSlide(-1); // Swipe right
            } else if (swipeDistance < -50) {
                changeSlide(1); // Swipe left
            }
        }
    });
}

// Keyboard arrow key functionality (for desktop use)
document.addEventListener("keydown", (e) => {
    if (!isTransitioning) {
        if (e.key === "ArrowLeft") {
            changeSlide(-1);
        } else if (e.key === "ArrowRight") {
            changeSlide(1);
        }
    }
});

// Handle orientation changes for mobile devices
function handleOrientationChange() {
    const video = document.getElementById('rotateVideo');
    const loadingScreen = document.getElementById('loadingScreen');

    if (loadingScreen.style.display === 'none' && isMobileDevice()) {
        if (window.innerHeight > window.innerWidth) {
            video.style.display = 'block';
            video.play();
        } else {
            video.style.display = 'none';
            video.pause();
        }
    } else {
        video.style.display = 'none';
    }
}

window.addEventListener('resize', handleOrientationChange);

// Image loading and progress bar handling
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide img');
    let imagesLoaded = 0;

    slides.forEach(img => {
        if (img.complete) {
            handleImageLoad();
        } else {
            img.onload = handleImageLoad;
        }
    });

    function handleImageLoad() {
        imagesLoaded++;
        updateProgressBar(imagesLoaded / slides.length * 100);
        if (imagesLoaded === slides.length) {
            document.getElementById('loadingScreen').style.display = 'none';
            document.querySelector('.slideshow-container').style.display = 'block';
            document.querySelectorAll('.prev, .next').forEach(el => el.classList.remove('hidden'));
            handleOrientationChange();
        }
    }
});

// Adjust slideshow height dynamically
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
