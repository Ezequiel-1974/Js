
// Clase para representar un producto
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

// Clase para representar el carrito
class Cart {
  constructor() {
    this.items = [];
    this.cartItemsElement = document.getElementById('cart-items');
    this.cartTotalElement = document.getElementById('cart-total');
    this.checkoutButton = document.getElementById('checkout-button');
    this.clearCartButton = document.getElementById('clear-cart-button');
  }

  addItem(productName, productPrice) {
    const existingItem = this.items.find(item => item.product.name === productName);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const product = new Product(productName, productPrice);
      this.items.push({ product, quantity: 1 });
    }
    this.updateCartDisplay();
    this.updateCartStorage();
  }

  removeItem(productName) {
    this.items = this.items.filter(item => item.product.name !== productName);
    this.updateCartDisplay();
    this.updateCartStorage();
  }

  clearCart() {
    this.items = [];
    this.updateCartDisplay();
    this.updateCartStorage();
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  updateCartDisplay() {
    this.cartItemsElement.innerHTML = '';
    let totalPrice = 0;
    for (const item of this.items) {
      const li = document.createElement('li');
      li.className = 'product-item';
      li.innerHTML = `
        <span>${item.product.name} - ${item.product.price} x ${item.quantity}</span>
        <span>${item.product.price * item.quantity}</span>
        <button class="button is-danger" onclick="cart.removeItem('${item.product.name}')">Eliminar</button>
      `;
      this.cartItemsElement.appendChild(li);
      totalPrice += item.product.price * item.quantity;
    }
    this.cartTotalElement.textContent = totalPrice.toFixed(2);

    // Habilitar o deshabilitar botón de pagar según si hay elementos en el carrito
    this.checkoutButton.disabled = this.items.length === 0;
  }

  updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}

const cart = new Cart(); // Crear una instancia de la clase Cart

function checkout() {
  if (cart.items.length === 0) {
    alert('El carrito está vacío. Agrega productos antes de pagar.');
    return;
  }

  // Simulamos una petición al servidor para procesar la compra
  makePurchase()
    .then(response => {
      alert('¡Gracias por su compra! Respuesta del servidor: ' + response);
      cart.clearCart(); // Limpiar carrito después de la compra exitosa
    })
    .catch(error => {
      console.error('Error en la compra:', error);
      alert('Hubo un error al procesar la compra. Inténtelo de nuevo.');
    });
}

function clearCart() {
  cart.clearCart();
}

// Llamar a updateCartDisplay después de cargar la página para mostrar el carrito inicial
document.addEventListener('DOMContentLoaded', () => {
  const storedCart = localStorage.getItem('cart');
  cart.items = storedCart ? JSON.parse(storedCart) : [];
  cart.updateCartDisplay();
});

// Función simulada de compra en un servidor (puede ser sustituida por una real)
function makePurchase() {
  return new Promise((resolve, reject) => {
    // Simulamos una petición al servidor para procesar la compra
    setTimeout(() => {
      const success = true; // Simulamos una compra exitosa
      if (success) {
        resolve('Compra exitosa');
      } else {
        reject('La compra ha fallado');
      }
    }, 2000); // Simulamos un tiempo de espera de 2 segundos
  });
}