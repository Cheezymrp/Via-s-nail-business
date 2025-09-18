// Cart logic for booking form
let cart = [];

function addToCart(service, design, price) {
    cart.push({ service, design, price });
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    if (!cartList || !cartTotal) return;
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.service} - ${item.design} ($${item.price})`;
        cartList.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}

window.addEventListener('DOMContentLoaded', updateCartDisplay);
