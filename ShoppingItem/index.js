export const ShoppingItem = (props) => {
  const { item, day, onDelete, onMoveDown, onMoveUp } = props;
  const { id, product, amount, unit, done } = item;

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
    <button id="moveDown" class="item__btn-down"></button>
    <button id="moveUp" class="item__btn-up"></button>
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
        element.replaceWith(ShoppingItem({ ...props, item: data.results }))
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
        element.replaceWith(ShoppingItem({ ...props, item: data.results }))
      );
  });

  element.querySelector("#trash").addEventListener("click", () => {
    onDelete(id);
  });

  element
    .querySelector("#moveDown")
    .addEventListener("click", () => onMoveDown(id));

  element
    .querySelector("#moveUp")
    .addEventListener("click", () => onMoveUp(id));

  return element;
};
