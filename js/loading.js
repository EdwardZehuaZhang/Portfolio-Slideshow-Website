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
        if (imagesLoaded === slides.length) {
            document.getElementById('loadingScreen').style.display = 'none';
            document.querySelector('.slideshow-container').style.display = 'block';
            document.querySelectorAll('.prev, .next').forEach(el => el.classList.remove('hidden'));
        }
    }
});

// Function to start falling images only after the first slide change
function startFallingImages() {
    // Ensure this only happens once
    if (window.fallingImagesActive) return;
    window.fallingImagesActive = true;

    // Assuming your falling images are initialized here
    addFallingImage(); // This function should then control the repeated falling images as slides change
}
