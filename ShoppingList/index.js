import { ShoppingItem } from "../ShoppingItem/index.js";

export const ShoppingList = (props) => {
  const { day, dayName, items } = props;

  const element = document.createElement("div");
  element.classList.add("shopping-list");
  element.innerHTML = `
    <h2>${dayName}</h2>
    <form>
    <input type="text" class="produkt" placeholder="Produkt">
    <input type="number" class="mnozstvi" placeholder="Množství">
    <input type="text" class="jednotka" placeholder="Jednotka">
    <button type="submit">Přidat</button>
    </form>
    <ul class="shopping-list__items"></ul>
  `;

  if (items === undefined) {
    fetch(`https://apps.kodim.cz/daweb/shoplist/api/weeks/31/days/${day}`)
      .then((response) => response.json())
      .then((data) => {
        element.replaceWith(
          ShoppingList({
            day: day,
            dayName: dayName,
            items: data.results,
          })
        );
      });
  } else {
    const ulElement = element.querySelector("ul");
    ulElement.append(...items.map((item) => ShoppingItem({ ...item, day })));
  }

  element.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    fetch(`https://apps.kodim.cz/daweb/shoplist/api/weeks/31/days/${day}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: document.querySelector(".produkt").value,
        amount: document.querySelector(".mnozstvi").value,
        unit: document.querySelector(".jednotka").value,
        done: false,
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        element.replaceWith(
          ShoppingList({
            day: day,
            dayName: dayName,
            items: data.results,
          })
        )
      );
  });

  return element;
};
