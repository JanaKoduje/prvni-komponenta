import { ShoppingItem } from "../ShoppingItem/index.js";

export const ShoppingList = (props) => {
  const { day, dayName, items } = props;

  const element = document.createElement("div");
  element.classList.add("shopping-list");
  element.innerHTML = `
    <h2>${dayName}</h2>
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

  const formElm = document.querySelector("form");
  formElm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (formElm.den.value === day) {
    fetch(`https://apps.kodim.cz/daweb/shoplist/api/weeks/31/days/${day}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: formElm.querySelector("#produkt").value,
        amount: formElm.querySelector("#mnozstvi").value,
        unit: formElm.querySelector("#jednotka").value,
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
      );}
      
  });

  return element;
};

