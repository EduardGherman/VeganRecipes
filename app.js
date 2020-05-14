const addForm = document.querySelector('.add');
const list = document.querySelector('.vrecipes');
const search = document.querySelector('.search input');
let itemsArray = [];

if (!localStorage.getItem('items')) {
  window.calStorage.setItem('items', JSON.stringify(itemsArray));
}

const generateTemplate = (item) => {
  const html = `
        <li class="list-group-item d-flex justify-content-between alight-items-center">
            <span>${item}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

  list.innerHTML += html;
};

// add recipes
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const item = addForm.add.value.trim();

  if (item.length) {
    generateTemplate(item);
    addForm.reset();
  }
});

// delete recipes
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
});

// filter recipes
const filterRecipes = (term) => {
  Array.from(list.children)
    .filter(
      (recipeItem) => !recipeItem.textContent.toLowerCase().includes(term)
    )
    .forEach((recipeItem) => recipeItem.classList.add('filtered'));

  Array.from(list.children)
    .filter((recipeItem) => recipeItem.textContent.toLowerCase().includes(term))
    .forEach((recipeItem) => recipeItem.classList.remove('filtered'));
};

// keyup event
search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase();
  filterRecipes(term);
});

// Get from local storage
// Set Local Storage
localStorage.setItem('items', JSON.stringify(itemsArray));
itemsArray.push(item);
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));
