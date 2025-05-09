document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("pizzaCart")) || [];

  document.querySelectorAll(".specialty-item").forEach((card) => {
    const button = card.querySelector("button");
    button.addEventListener("click", () => {
      const title = card.querySelector("h4")?.innerText || "Unknown Pizza";
      const qty =
        parseInt(card.querySelector('input[type="number"]').value) || 1;

      cart.push({ name: title, quantity: qty, type: "specialty" });

      localStorage.setItem("pizzaCart", JSON.stringify(cart));

      alert(`✅ ${title} added to cart!`);
      location.reload();
    });
  });

  const form = document.getElementById("buildPizza");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const sauce = form.sauce.value;
      const cheese = form.cheese.value;
      const qty = parseInt(form.quantity.value) || 1;

      const toppings = [];
      form
        .querySelectorAll('input[name="toppings"]:checked')
        .forEach((input) => toppings.push(input.value));

      const name = `Custom Pizza (${sauce}, ${cheese}, ${
        toppings.join(", ") || "no toppings"
      })`;

      cart.push({ name, quantity: qty, type: "custom" });

      localStorage.setItem("pizzaCart", JSON.stringify(cart));

      alert(`✅ ${name} added to cart!`);
      location.reload();
    });
  }
});