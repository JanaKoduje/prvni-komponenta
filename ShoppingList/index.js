import { ShoppingItem } from "../ShoppingItem/index.js";
import { dayPrefix } from "../constants.js";

export const ShoppingList = (props) => {
  const { day, dayName, items } = props;

  const element = document.createElement("div");
  element.setAttribute("id", dayPrefix + day);
  element.classList.add("shopping-list");
  element.innerHTML = `
    <h2>${dayName}</h2>
    <button id="reset">Obnovit data</button>
    <button id="clear">Vymazat celý seznam</button>
    <ul class="shopping-list__items"></ul>
  `;

  const replaceList = (data) => {
    element.replaceWith(
      ShoppingList({
        day: day,
        dayName: dayName,
        items: data.results,
      })
    )
  }

  const handleDeleteItem = (id) => {
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
      .then(replaceList);
  };

  const handleMoveDown = (id) => {
    fetch(
      `https://apps.kodim.cz/daweb/shoplist/api/weeks/31/days/${day}/${id}/actions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "moveDown" }),
      }
    )
      .then((response) => response.json())
      .then(replaceList);
  };

  const handleMoveUp = (id) => {
    fetch(
      `https://apps.kodim.cz/daweb/shoplist/api/weeks/31/days/${day}/${id}/actions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "moveUp" }),
      }
    )
      .then((response) => response.json())
      .then(replaceList);
  };

  element.querySelector("#reset").addEventListener("click", () => {
    fetch(
      `https://apps.kodim.cz/daweb/shoplist/api/weeks/31/days/${day}/actions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "reset" }),
      }
    )
      .then((response) => response.json())
      .then(replaceList);
  });

  element.querySelector("#clear").addEventListener("click", () => {
    fetch(
      `https://apps.kodim.cz/daweb/shoplist/api/weeks/31/days/${day}/actions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "clear" }),
      }
    )
      .then((response) => response.json())
      .then(replaceList);
  });

  if (items === undefined) {
    fetch(`https://apps.kodim.cz/daweb/shoplist/api/weeks/31/days/${day}`)
      .then((response) => response.json())
      .then(replaceList);
  } else {
    const ulElement = element.querySelector("ul");
    ulElement.append(
      ...items.map((item) =>
        ShoppingItem({
          item,
          day,
          onDelete: handleDeleteItem,
          onMoveDown: handleMoveDown,
          onMoveUp: handleMoveUp,
        })
      )
    );
  }

  return element;
};
