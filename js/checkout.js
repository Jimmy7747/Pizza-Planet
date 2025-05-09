document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("pizzaCart")) || [];
    const itemsList = document.getElementById("checkout-items");
    const subtotalDisplay = document.getElementById("checkout-subtotal");
    const taxDisplay = document.getElementById("checkout-tax");
    const totalDisplay = document.getElementById("checkout-total");

    const TAX_RATE = 0.08;

    const specialtyPrices = {
        "The Meteor Meatball": 15.99,
        "BBQ Comet": 16.99,
        "Galactic Garden": 14.99,
        "Supernova Spice": 17.99,
    };

    let subtotal = 0;

    if (cart.length === 0) {
        itemsList.innerHTML = "<li>No items in your cart.</li>";
        subtotalDisplay.textContent = "0.00";
        taxDisplay.textContent = "0.00";
        totalDisplay.textContent = "0.00";
        return;
    }

    const itemHTML = cart.map((item) => {
        let basePrice = 0;

        if (item.type === "specialty") {
            for (let name in specialtyPrices) {
                if (item.name.includes(name)) {
                    basePrice = specialtyPrices[name];
                    break;
                }
            }
        } else if (item.type === "custom") {
            const toppingMatch = item.name.match(/\((.*)\)/);
            const toppingCount = toppingMatch ? toppingMatch[1].split(",").length : 0;
            basePrice = 10 + toppingCount * 1;
        }

        const itemTotal = basePrice * item.quantity;
        subtotal += itemTotal;

        return `<li>${item.name} x${item.quantity} — $${itemTotal.toFixed(2)}</li>`;
    });

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    itemsList.innerHTML = itemHTML.join("");
    subtotalDisplay.textContent = subtotal.toFixed(2);
    taxDisplay.textContent = tax.toFixed(2);
    totalDisplay.textContent = total.toFixed(2);

    document.getElementById("pickup-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem("pizzaCart")) || [];
        localStorage.setItem("confirmedOrder", JSON.stringify(cart));
        localStorage.removeItem("pizzaCart");
        window.location.href = "receipt.html";
    });

});