import products from './products.json'assert {type: 'json'};

console.log(products);

const menuInner = document.querySelector('.menu__inner');
const menuForm = document.querySelector('.menu__form');
const btnLoadMore = document.querySelector('.button-more');


let currentCategory = "coffee";

menuForm.addEventListener('click', (event) => {
    currentCategory = event.target.value;
    if (currentCategory !== undefined) {
      changeCurrentCategory(currentCategory);
    }
});

menuInner.addEventListener("animationend", animationFade);

btnLoadMore.addEventListener('click', showAllProducts);

function showAllProducts() {
  const hiddenProducts = document.querySelectorAll('.menu__item-hide');
  hiddenProducts.forEach((element) => showMenuItem(element));
  hideBtnLoadMore();
}

function hideBtnLoadMore() {
  menuInner.classList.add('showAll');
}

function showMenuItem(item) {
  item.classList.remove('menu__item-hide');
}

function changeCurrentCategory() {
  menuInner.classList.remove('showAll');
  menuInner.classList.add('menu__inner-fadeout');
  menuInner.classList.add('menu__inner-fadein');
};

function animationFade(event) {
    if (event.animationName === 'fade-out') {
        event.srcElement.style.opacity = 0;
        event.srcElement.classList.remove('menu__inner-fadeout');
        loadProducts(currentCategory);
        addListenerForModal();
    }

    if (event.animationName === 'fade-in') {
        event.srcElement.style.opacity = 1;
        event.srcElement.classList.remove('menu__inner-fadein');
    }
}

function loadProducts(category) {
    menuInner.innerHTML = '';
    const currentProducts = products.filter((element) => element.category === category);
    currentProducts.forEach((element, index) => loadMenuItem(element, index));
    checkVisibilityBtnLoadMore(currentProducts.length);
}

function loadMenuItem(element, index) {
    const menuItem = createMenuItem(index);
    createMenuItemImage(menuItem, element);
    createMenuItemDescription(menuItem, element);
    createMenuItemId(menuItem, element);
    menuInner.append(menuItem);
}

function createMenuItem(index) {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu__item');
    if (index > 3) {
      menuItem.classList.add('menu__item-hide');
    }
    return menuItem;
}

function createMenuItemDescription(item, element) {
    const menuDescription = createMenuItemDescriptionWrapper('menu__item__description');
    createMenuItemDescriptionTitle(menuDescription, element);
    createMenuItemDescriptionText(menuDescription, element);
    createMenuItemDescriptionPrice(menuDescription, element);
    item.append(menuDescription);
}

function createImageWrapper() {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('menu__item__image__wrapper');
    return itemWrapper;
}

function createMenuItemDescriptionWrapper(className) {
    const itemDescription = document.createElement('div');
    itemDescription.classList.add(className);
    return itemDescription;
}

function createImage(element, className) {
    const itemImage = document.createElement('img');
    itemImage.classList.add(className);
    itemImage.src = element.src;
    itemImage.alt = `${element.category} image`;
    return itemImage;
}

function createMenuItemImage(item, element) {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('menu__item__image__wrapper');
    const itemImage = document.createElement('img');
    itemImage.classList.add('menu__item__image');
    itemImage.src = element.src;
    itemImage.alt = `${element.category} image`;

    itemWrapper.append(itemImage);
    item.append(itemWrapper);
}

function createMenuItemDescriptionTitle(item, element) {
    const itemTitle = document.createElement('h3');
    itemTitle.classList.add('menu__item__title');
    itemTitle.textContent = element.name;
    item.append(itemTitle);
}

function createMenuItemDescriptionText(item, element) {
    const itemText = document.createElement('span');
    itemText.classList.add('menu__item__text');
    itemText.textContent = element.description;
    item.append(itemText);
}

function createMenuItemDescriptionPrice(item, element) {
    const itemPrice = document.createElement('span');
    itemPrice.classList.add('menu__item__price');
    itemPrice.textContent = `$${element.price}`;
    item.append(itemPrice);
}

function checkVisibilityBtnLoadMore(length) {
  if (length <= 4) {
    menuInner.classList.add('showAll');
  }
}

function createMenuItemId(item, element) {
  const id = document.createElement('span');
  id.classList.add('menu__item__id');
  id.textContent = element.id;
  item.append(id);
}

loadProducts(currentCategory);