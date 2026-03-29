// Get cart from localStorage (or empty array)
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add a book to the cart
function addToCart(title, price) {
    var cart = getCart();
    cart.push({ title: title, price: price });
    saveCart(cart);
    alert(title + ' added to cart!');
    updateCount();
}

// Update the cart count shown on the store page
function updateCount() {
    var countEl = document.getElementById('cart-count');
    if (countEl) {
        countEl.textContent = getCart().length;
    }
}

// Show cart items on cart.html
function showCart() {
    var cart = getCart();
    var container = document.getElementById('cart-items');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('total').textContent = 0;
        return;
    }

    var html = '<ul>';
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
        html += '<li>' + cart[i].title + ' - Rs. ' + cart[i].price + '</li>';
        total += cart[i].price;
    }
    html += '</ul>';
    container.innerHTML = html;
    document.getElementById('total').textContent = total;
}

// Clear all items from cart
function clearCart() {
    localStorage.removeItem('cart');
    showCart();
}

// Run on page load
updateCount();
showCart();