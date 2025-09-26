// Cart logic for booking form
let cart = [];

// Helper to find an item in cart
function findCartItem(category, name) {
    return cart.find(item => item.category === category && item.name === name);
}

function addAllToCart() {
    const selects = [
        { id: 'base', label: 'Base Price', multiple: false },
        { id: 'fullset', label: 'Full Set Design', multiple: false },
        { id: 'addons', label: 'Add-On', multiple: false }
    ];
    selects.forEach(sel => {
        const select = document.getElementById(sel.id);
        if (select && select.value) {
            const option = select.selectedOptions[0];
            const name = option.value;
            const price = parseFloat(option.dataset.price);
            addToCart(sel.label, name, price, false);
        }
    });
    updateCartDisplay();
}

function addToCart(category, name, price, update = true) {
    // For Per Nail Design we store pricePerUnit and qty
    if (category === 'Per Nail Design') {
        const existing = findCartItem(category, name);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ category, name, pricePerUnit: price, qty: 1 });
        }
    } else {
        cart.push({ category, name, price });
    }
    if (update) updateCartDisplay();
}

function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    if (!cartList || !cartTotal) return;
    cartList.innerHTML = '';
    let total = 0; // booking charge removed
    cart.forEach(item => {
        const li = document.createElement('li');
        if (item.category === 'Per Nail Design') {
            const lineTotal = item.pricePerUnit * item.qty;
            li.textContent = `${item.category}: ${item.name} x${item.qty} ($${item.pricePerUnit} ea) — $${lineTotal.toFixed(2)}`;
            total += lineTotal;
        } else {
            li.textContent = `${item.category}: ${item.name} ($${item.price})`;
            total += item.price;
        }
        cartList.appendChild(li);
    });
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}

window.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    // Wire up per-nail plus/minus controls
    const perNailControls = document.querySelectorAll('#pernail-controls .pernail');
    perNailControls.forEach(control => {
        const name = control.dataset.name;
        const price = parseFloat(control.dataset.price);
        const plus = control.querySelector('.pn-plus');
        const minus = control.querySelector('.pn-minus');
        const count = control.querySelector('.pn-count');

        function updateCountDisplay() {
            const existing = findCartItem('Per Nail Design', name);
            count.textContent = existing ? existing.qty : '0';
        }

        plus.addEventListener('click', function() {
            addToCart('Per Nail Design', name, price);
            updateCountDisplay();
        });

        minus.addEventListener('click', function() {
            const existing = findCartItem('Per Nail Design', name);
            if (existing) {
                existing.qty -= 1;
                if (existing.qty <= 0) {
                    cart = cart.filter(item => !(item.category === 'Per Nail Design' && item.name === name));
                }
                updateCartDisplay();
            }
            updateCountDisplay();
        });

        // initialize display
        updateCountDisplay();
    });
});
