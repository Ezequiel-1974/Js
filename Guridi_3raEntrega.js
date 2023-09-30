let cart = [];

function toggleProductList() {
    $('#product-list').toggle();
}

function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    cartItemsElement.innerHTML = '';

    let totalPrice = 0;

    for (const item of cart) {
        const li = document.createElement('li');
        li.className = 'product-item';
        li.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <span>$${item.price * item.quantity}</span>
            <button class="button is-danger" onclick="removeFromCart('${item.name}')">Eliminar</button>`;
        cartItemsElement.appendChild(li);
        totalPrice += item.price * item.quantity;
    }

    cartTotalElement.textContent = totalPrice.toFixed(2);

    // Habilitar o deshabilitar botón de pagar según si hay elementos en el carrito
    checkoutButton.disabled = cart.length === 0;
}

function checkout() {
    if (cart.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de pagar.');
        return;
    }

    alert('¡Gracias por su compra!');
    cart = [];
    updateCartDisplay();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}
