import { ShoppingList } from "../ShoppingList/index.js";
import { week, dayPrefix } from "../constants.js";

export const ShoppingItem = (props) => {
  const { id, product, amount, unit, done, day } = props;

  let checkClass = "";
  if (done) {
    checkClass = "item__btn-done--check";
  }

  const element = document.createElement("li");
  element.classList.add("item");
  element.innerHTML = `
    <div class="item__name">${product}</div>
    <div class="item__amount"><input id="amount" type="number" value="${amount}"> ${unit}</div>
    <button id="checked" class="item__btn-done ${checkClass}"></button>
    <button id="trash" class="item__btn-delete"></button>
  `;

  const amountElm = element.querySelector("#amount");
  amountElm.addEventListener("change", () => {
    fetch(
      `https://apps.kodim.cz/daweb/shoplist/api/weeks/31/days/${day}/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amountElm.value) }),
      }
    )
      .then((response) => response.json())
      .then((data) =>
        element.replaceWith(ShoppingItem({ ...data.results, day }))
      );
  });

  element.querySelector("#checked").addEventListener("click", () => {
    fetch(
      `https://apps.kodim.cz/daweb/shoplist/api/weeks/31/days/${day}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: !done }),
      }
    )
      .then((response) => response.json())
      .then((data) =>
        element.replaceWith(ShoppingItem({ ...data.results, day }))
      );
  });

  element.querySelector("#trash").addEventListener("click", () => {
    const dayObj = week.find((item) => item.day === day);
    const dayListElm = document.querySelector(`#${dayPrefix + dayObj.day}`);
    fetch(
      `https://apps.kodim.cz/daweb/shoplist/api/weeks/31/days/${day}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
