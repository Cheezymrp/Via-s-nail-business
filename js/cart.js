// Cart logic for booking form
let cart = [];

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
    // Prevent duplicate Per Nail Design entries
    if (category === 'Per Nail Design') {
        if (cart.some(item => item.category === category && item.name === name)) return;
    }
    cart.push({ category, name, price });
    if (update) updateCartDisplay();
}

function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    if (!cartList || !cartTotal) return;
    cartList.innerHTML = '';
    let total = 10; // $10 booking charge
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.category}: ${item.name} ($${item.price})`;
        cartList.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}

window.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    // Checkbox logic for Per Nail Designs
    const checkboxes = document.querySelectorAll('#pernail-checkboxes input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const name = checkbox.value;
            const price = parseFloat(checkbox.dataset.price);
            if (checkbox.checked) {
                addToCart('Per Nail Design', name, price);
            } else {
                // Remove from cart by name and category
                cart = cart.filter(item => !(item.category === 'Per Nail Design' && item.name === name));
                updateCartDisplay();
            }
        });
    });
});
