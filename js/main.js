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
