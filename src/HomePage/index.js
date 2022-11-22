import { ShoppingList } from "./../ShoppingList/index.js";
import { AddItemForm } from "./../AddItem/index.js";

import "./style.css";

export const HomePage = (props) => {
  const { session } = props;

  if (session === "no-session") {
    window.location.href = "/login";
    return null;
  }

  const element = document.createElement("div");
  element.classList.add("page");
  element.innerHTML = `
    <div class="container">
    <h1>Nákupní seznamy</h1>
    <div id="add"></div>
    <div id="lists"></div>
    </div>
    `;

  if (session === undefined) {
    return element;
  }

  element.querySelector("#add").append(AddItemForm());

  element
    .querySelector("#lists")
    .append(
      ShoppingList({ day: "mon", dayName: "Pondělí" }),
      ShoppingList({ day: "tue", dayName: "Úterý" })
    );

  return element;
};
