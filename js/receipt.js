document.addEventListener("DOMContentLoaded", () => {

    const cart = JSON.parse(localStorage.getItem("confirmedOrder")) || [];
    const tbody = document.getElementById("receipt-body");
    const totalCell = document.getElementById("receipt-total");

    const TAX_RATE = 0.08;
    const specialtyPrices = {
        "The Meteor Meatball": 15.99,
        "BBQ Comet": 16.99,
        "Galactic Garden": 14.99,
        "Supernova Spice": 17.99,
    };

    let subtotal = 0;

    if (!cart.length) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No items found.</td></tr>`;
        totalCell.textContent = "$0.00";
        return;
    }

    const rowsHtml = cart.map(item => {
        let basePrice = 0;
        if (item.type === "specialty") {
            for (let name in specialtyPrices) {
                if (item.name.includes(name)) {
                    basePrice = specialtyPrices[name];
                    break;
                }
            }
        } else {
            const match = item.name.match(/\((.*)\)/);
            const toppingsCount = match ? match[1].split(",").length : 0;
            basePrice = 10 + toppingsCount;
        }
        const lineTotal = basePrice * item.quantity;
        subtotal += lineTotal;

        return `
        <tr>
          <td>${item.type === "custom" ? "Custom Pizza" : "Specialty Pizza"}</td>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${lineTotal.toFixed(2)}</td>
        </tr>`;
    }).join("");

    const tax = subtotal * TAX_RATE;
    const grand = subtotal + tax;

    tbody.innerHTML = rowsHtml;
    totalCell.textContent = `$${grand.toFixed(2)}`;
    localStorage.removeItem("confirmedOrder");
});
