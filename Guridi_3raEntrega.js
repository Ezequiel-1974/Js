let cartItems = [];

function toggleProductList() {
    $('#product-list').toggle();
}

function addToCart(productName, productPrice) {
    const item = { name: productName, price: productPrice, quantity: 1 };
    cartItems.push(item);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsElement.innerHTML = '';

    let totalPrice = 0;

    for (const item of cartItems) {
        const li = document.createElement('li');
        li.className = 'product-item';
        li.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <span>$${item.price * item.quantity}</span>
            <button class="button is-danger" onclick="removeFromCart(${cartItems.indexOf(item)})">Eliminar</button>`;
        cartItemsElement.appendChild(li);
        totalPrice += item.price * item.quantity;
    }

    cartTotalElement.textContent = totalPrice.toFixed(2);
}

function checkout() {
    alert('¡Gracias por su compra!');
    cartItems = [];
    updateCartDisplay();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartDisplay();
}

function clearCart() {
    cartItems = [];
    updateCartDisplay();
}