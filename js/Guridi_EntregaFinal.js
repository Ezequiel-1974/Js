// Clase para representar un producto
class Product {
  constructor(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image; // Nueva propiedad para la imagen
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

  addItem(productName, productPrice, productImage) {
    const existingItem = this.items.find(item => item.product.name === productName);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const product = new Product(productName, productPrice, productImage);
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
        <img src="./img/${item.product.image}" alt="${item.product.name}" width="50" height="50">
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

  async loadProductsFromJSON(jsonUrl) {
    try {
      const response = await fetch(jsonUrl);
      if (!response.ok) {
        throw new Error('Error al cargar el archivo JSON');
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error cargando productos desde JSON:', error);
      return [];
    }
  }
}

const cart = new Cart();

document.addEventListener('DOMContentLoaded', async () => {
  const storedCart = localStorage.getItem('cart');
  cart.items = storedCart ? JSON.parse(storedCart) : [];

  const jsonUrl = 'JSON/Productos.json';
  const products = await cart.loadProductsFromJSON(jsonUrl);

  const productList = document.getElementById('product-list');
  products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="./img/${product.image}" alt="${product.name}" width="50" height="50">
      <button class="button is-success" onclick="cart.addItem('${product.name}', ${product.price}, '${product.image}')">${product.name} - $${product.price.toFixed(2)}</button>`;
    productList.appendChild(listItem);
  });

  cart.updateCartDisplay();
});

function checkout() {
  if (cart.items.length === 0) {
    alert('El carrito está vacío. Agrega productos antes de pagar.');
    return;
  }

  makePurchase()
    .then(response => {
      alert('¡Gracias por su compra! Respuesta del servidor: ' + response);
      cart.clearCart();
    })
    .catch(error => {
      console.error('Error en la compra:', error);
      alert('Hubo un error al procesar la compra. Inténtelo de nuevo.');
    });
}

function clearCart() {
  cart.clearCart();
}

function makePurchase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve('Compra exitosa');
      } else {
        reject('La compra ha fallado');
      }
    }, 2000);
  });
}
