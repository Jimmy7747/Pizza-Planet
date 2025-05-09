function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem("pizzaCart")) || [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");

    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if (cartItems) {
        cartItems.innerHTML = cart.length
            ? cart.map((item) => `<li>${item.name} x${item.quantity}</li>`).join("")
            : "<li>No items in cart</li>";
    }
}

document.getElementById("cart-container")?.addEventListener("click", () => {
    const dropdown = document.getElementById("cart-dropdown");
    if (dropdown) dropdown.classList.toggle("hidden");
});

document.getElementById("clear-cart-btn")?.addEventListener("click", () => {
    localStorage.removeItem("pizzaCart");
    location.reload();
});

document.getElementById("checkout-btn")?.addEventListener("click", () => {
    window.location.href = "checkout.html";
});

updateCartUI();
