// Fade-in animation for gallery images

document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach((img, i) => {
        img.style.opacity = 0;
        img.style.transition = 'opacity 1s';
        setTimeout(() => {
            img.style.opacity = 1;
        }, 200 * i);
        // Add click event for modal viewer
        img.addEventListener('click', function() {
            openModal(img.src, img.alt);
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Modal image viewer
function openModal(src, alt) {
    let modal = document.getElementById('img-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'img-modal';
        modal.style.position = 'fixed';
        modal.style.top = 0;
        modal.style.left = 0;
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = 9999;
        modal.innerHTML = `
            <div style="position:relative;max-width:90vw;max-height:90vh;">
                <img src="${src}" alt="${alt}" style="max-width:100%;max-height:80vh;border-radius:16px;box-shadow:0 4px 24px #a14e7c55;">
                <button id="close-modal" style="position:absolute;top:8px;right:8px;background:#fff;color:#a14e7c;border:none;border-radius:50%;width:32px;height:32px;font-size:1.5rem;cursor:pointer;">&times;</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('close-modal').onclick = function() {
            modal.remove();
        };
        modal.onclick = function(e) {
            if (e.target === modal) modal.remove();
        };
    }
}