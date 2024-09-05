document.addEventListener("DOMContentLoaded", function() {
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
        }
    }
});

function updateProgressBar(percent) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${percent}%`;
}

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

document.addEventListener('DOMContentLoaded', function () {
    const fallingImagesContainer = document.getElementById('falling-images-container');
    document.body.appendChild(fallingImagesContainer); 
});

