document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide img');
    let imagesLoaded = 0;

    slides.forEach(img => {
        if (img.complete) {
            handleImageLoad(); // Handle already loaded images
        } else {
            img.onload = handleImageLoad;
        }
    });

    function handleImageLoad() {
        imagesLoaded++;
        if (imagesLoaded === slides.length) {
            document.getElementById('loadingScreen').style.display = 'none';
            document.querySelector('.slideshow-container').style.display = 'block';
        }
    }
});

