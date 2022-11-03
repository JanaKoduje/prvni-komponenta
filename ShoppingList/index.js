import { ShoppingItem } from "../ShoppingItem/index.js";
import { dayPrefix } from "../constants.js";

export const ShoppingList = (props) => {
  const { day, dayName, items } = props;
 
  const element = document.createElement("div");
  element.setAttribute("id", dayPrefix + day);
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

  return element;
};
