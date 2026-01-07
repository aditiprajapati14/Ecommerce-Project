/***********************
 NAVBAR
***********************/
const list = document.querySelector(".navlist");
const hamburger = document.querySelector(".fa-bars");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("fa-x");
  list.classList.toggle("navlist-active");
});

/***********************
 PRODUCT REDIRECT
***********************/
function redirectToProduct(imgElement = null) {
  let product = {};

  if (imgElement) {
    const card = imgElement.closest(".product-card");

    product = {
      title: card.querySelector("h3").innerText,
      price: extractPrice(card.querySelector(".price").innerText),
      image: imgElement.src,
      qty: 1
    };
  } else {
    product = {
      title: qvTitle.innerText,
      price: extractPrice(qvNewPrice.innerText),
      image: qvImg.src,
      qty: Number(qtyInput.value)
    };
  }

  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "productpage.html";
}

/***********************
 ADD TO CART
***********************/
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.title === product.title);

  if (existing) {
    existing.qty += product.qty;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  openCartDrawer();
}

/***********************
 CART DRAWER
***********************/
const cartBtn = document.querySelector(".cart-btn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

function openCartDrawer() {
  cartDrawer.classList.add("active");
  cartOverlay.style.display = "block";
  renderCart();
}

function closeCartDrawer() {
  cartDrawer.classList.remove("active");
  cartOverlay.style.display = "none";
}

cartBtn.addEventListener("click", openCartDrawer);
closeCart.addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);

/***********************
 RENDER CART
***********************/
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" />

        <div class="cart-info">
          <p class="cart-title">${item.title}</p>

          <p class="cart-price">
            <span class="old">$${(item.price + 2.5).toFixed(2)}</span>
            <span class="new">$${item.price.toFixed(2)}</span>
          </p>

          <div class="cart-qty">
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>

        <div class="cart-right">
          <button class="remove-btn" onclick="removeFromCart(${index})">🗑</button>
          <p>$${(item.price * item.qty).toFixed(2)}</p>
        </div>
      </div>
    `;
  });

  cartTotal.innerText = total.toFixed(2);
}

/***********************
 CART COUNT
***********************/
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const drawerHeaderCount = document.getElementById("cartCount");
  const navbarCount = document.querySelector(".drawer-count");

  if (drawerHeaderCount) drawerHeaderCount.innerText = cart.length;
  if (navbarCount) {
    navbarCount.innerText = cart.length;
    navbarCount.style.display = cart.length ? "inline-block" : "none";
  }
}

/***********************
 REMOVE / QTY
***********************/
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function changeQty(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].qty += change;
  if (cart[index].qty < 1) cart[index].qty = 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

/***********************
 HELPER
***********************/
function extractPrice(text) {
  const match = text.match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

document.addEventListener("DOMContentLoaded", updateCartCount);
