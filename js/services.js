(function(){
    // Services modal logic moved from inline HTML to external file
    const modal = document.getElementById('svcModal');
    const backdrop = document.getElementById('svcModalBackdrop');
    const panel = document.getElementById('svcModalPanel');
    const closeBtn = document.getElementById('svcModalClose');
    const titleEl = document.getElementById('svcModalTitle');
    const descEl = document.getElementById('svcModalDesc');

    if(!modal) return; // safe-guard if modal is not present

    function openModal(t,d){
        titleEl.textContent = t;
        descEl.textContent = d;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    function closeModal(){
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.service-card').forEach(card=>{
        card.addEventListener('click', ()=>{
            const t = card.querySelector('h2') ? card.querySelector('h2').textContent : 'Service';
            const d = card.getAttribute('data-desc') || Array.from(card.querySelectorAll('p')).map(p=>p.textContent.trim()).join('\n\n') || 'No details available.';
            openModal(t,d);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeModal(); });
})();
