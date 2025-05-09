document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("buildPizza");
  const receiptBody = document.getElementById("receipt-body");
  const totalCell = document.getElementById("receipt-total");

  // --- FORM PAGE ---
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const sauce = document.querySelector('input[name="sauce"]:checked')?.value || "";
      const cheese = document.querySelector('input[name="cheese"]:checked')?.value || "";
      const quantity = document.getElementById("quantity")?.value || "1";

      const toppings = [];
      document.querySelectorAll('input[name="toppings"]:checked').forEach(t => toppings.push(t.value));

      const params = new URLSearchParams({
        sauce,
        cheese,
        quantity,
        toppings: toppings.join(",")
      });

      window.location.href = `receipt.html?${params.toString()}`;
    });
  }

  // --- RECEIPT PAGE ---
  if (receiptBody && totalCell) {
    const params = new URLSearchParams(window.location.search);
    const sauce = params.get("sauce");
    const cheese = params.get("cheese");
    const quantity = parseInt(params.get("quantity")) || 1;
    const toppings = params.get("toppings") ? params.get("toppings").split(",") : [];

    // Pricing
    const basePrice = 10;
    const toppingPrice = 1;
    const extraCheesePrice = cheese.toLowerCase() === "extra" ? 2 : 0;
    const pizzaPrice = basePrice + toppings.length * toppingPrice + extraCheesePrice;
    const total = pizzaPrice * quantity;

    // Inject HTML
    receiptBody.innerHTML = `
      <tr>
        <td>Custom Pizza</td>
        <td>
          Sauce: ${sauce}<br>
          Cheese: ${cheese}<br>
          Toppings: ${toppings.length ? toppings.join(", ") : "None"}
        </td>
        <td>${quantity}</td>
        <td>$${total.toFixed(2)}</td>
      </tr>
    `;

    totalCell.textContent = `$${total.toFixed(2)}`;
  }
});
