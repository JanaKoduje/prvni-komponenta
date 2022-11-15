import { ShoppingList } from "./../ShoppingList/index.js";
import { week, dayPrefix } from "./../constants.js";

export const AddItemForm = () => {
  const element = document.createElement("form");

  element.innerHTML = `
    <input type="text" id="produkt" placeholder="Produkt">
    <input type="number" id="mnozstvi" placeholder="Množství">
    <input type="text" id="jednotka" placeholder="Jednotka"><br />

    <select name="den">
    <option value="nic">– vyber den –</option>
    <option value="mon">Pondělí</option>
    <option value="tue">Úterý</option>
   </select>
    <button type="submit">Přidat</button>
    `;

  element.addEventListener("submit", (event) => {
    event.preventDefault();
    if ( element.den.value === "nic") {
      alert ('Není vybrán den!')
    }
    
    const dayObj = week.find((item) => item.day === element.den.value);
    const dayListElm = document.querySelector(`#${dayPrefix + dayObj.day}`);

    fetch(
      `https://apps.kodim.cz/daweb/shoplist/api/weeks/0/${dayObj.day}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: element.querySelector("#produkt").value,
          amount: Number(element.querySelector("#mnozstvi").value),
          unit: element.querySelector("#jednotka").value,
          done: false,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) =>
        dayListElm.replaceWith(
          ShoppingList({
            day: dayObj.day,
            dayName: dayObj.dayName,
            items: data.results,
          })
        )
      );
  });

  
  return element;
};
