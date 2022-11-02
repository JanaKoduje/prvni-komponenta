import { ShoppingList } from './ShoppingList/index.js';
import { AddItemForm } from './AddItem/index.js'

document.querySelector('#add').append(
  AddItemForm()
);

document.querySelector('#lists').append(
  ShoppingList({ day: 'mon', dayName: 'Pondělí' }),
  ShoppingList({ day: 'tue', dayName: 'Úterý' }),
);
