// Fade-in animation for gallery images

document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach((img, i) => {
        img.style.opacity = 0;
        img.style.transition = 'opacity 1s';
        setTimeout(() => {
            img.style.opacity = 1;
        }, 200 * i);
    });
});