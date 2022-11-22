import { ShoppingItem } from "./../ShoppingItem/index.js";
import { dayPrefix } from "./../constants.js";

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
        items: data.results.items,
      })
    );
  };

  const handleDeleteItem = (id) => {
    fetch(
      `https://apps.kodim.cz/daweb/shoplist/api/me/week/${day}/items/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
        },
      }
    )
      .then((response) => response.json())
      .then(replaceList);
  };

  const handleMoveDown = (id) => {
    fetch(
      `https://apps.kodim.cz/daweb/shoplist/api/me/week/${day}/items/${id}/actions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ type: "moveDown" }),
      }
    )
      .then((response) => response.json())
      .then(replaceList);
  };

  const handleMoveUp = (id) => {
    fetch(
      `https://apps.kodim.cz/daweb/shoplist/api/me/week/${day}/items/${id}/actions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ type: "moveUp" }),
      }
    )
      .then((response) => response.json())
      .then(replaceList);
  };

  element.querySelector("#reset").addEventListener("click", () => {
    fetch(`https://apps.kodim.cz/daweb/shoplist/api/me/week/${day}/actions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ type: "reset" }),
    })
      .then((response) => response.json())
      .then(replaceList);
  });

  element.querySelector("#clear").addEventListener("click", () => {
    fetch(`https://apps.kodim.cz/daweb/shoplist/api/me/week/${day}/actions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ type: "clear" }),
    })
      .then((response) => response.json())
      .then(replaceList);
  });

  if (items === undefined) {
    fetch(`https://apps.kodim.cz/daweb/shoplist/api/me/week/${day}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
    })
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
