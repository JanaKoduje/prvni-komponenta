import { ShoppingList } from './ShoppingList/index.js';

const AddItemForm = () => {
  const addElm = document.createElement("form");

    addElm.innerHTML = `
    <input type="text" id="produkt" placeholder="Produkt">
    <input type="number" id="mnozstvi" placeholder="Množství">
    <input type="text" id="jednotka" placeholder="Jednotka"><br />

    <select name="den">
    <option value="nic">– vyber den –</option>
    <option value="mon">Pondělí</option>
    <option value="tue">Úterý</option>
   </select>
    <button type="submit">Přidat</button>
    `
    return addElm;
}

document.querySelector("#addItem").append(
  AddItemForm()
)

document.querySelector('#lists').append(
  ShoppingList({ day: 'mon', dayName: 'Pondělí' }),
  ShoppingList({ day: 'tue', dayName: 'Úterý' }),
);
