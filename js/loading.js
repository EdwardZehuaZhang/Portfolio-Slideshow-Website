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
        updateProgressBar(imagesLoaded / slides.length * 100);  // Update the progress bar
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
