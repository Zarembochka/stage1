//import products from './products.json'assert {type: 'json'};

const products = [
    {
      "id": 1,
      "name": "Irish coffee",
      "src": "./images/menu/coffee/coffee-1.jpg",
      "description": "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
      "price": "7.00",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 2,
      "name": "Kahlua coffee",
      "src": "./images/menu/coffee/coffee-2.jpg",
      "description": "Classic coffee with milk and Kahlua liqueur under a cap of frothed milk",
      "price": "7.00",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 3,
      "name": "Honey raf",
      "src": "./images/menu/coffee/coffee-3.jpg",
      "description": "Espresso with frothed milk, cream and aromatic honey",
      "price": "5.50",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 4,
      "name": "Ice cappuccino",
      "src": "./images/menu/coffee/coffee-4.jpg",
      "description": "Cappuccino with soft thick foam in summer version with ice",
      "price": "5.00",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 5,
      "name": "Espresso",
      "src": "./images/menu/coffee/coffee-5.jpg",
      "description": "Classic black coffee",
      "price": "4.50",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 6,
      "name": "Latte",
      "src": "./images/menu/coffee/coffee-6.jpg",
      "description": "Espresso coffee with the addition of steamed milk and dense milk foam",
      "price": "5.50",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 7,
      "name": "Latte macchiato",
      "src": "./images/menu/coffee/coffee-7.jpg",
      "description": "Espresso with frothed milk and chocolate",
      "price": "5.50",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 8,
      "name": "Coffee with cognac",
      "src": "./images/menu/coffee/coffee-8.jpg",
      "description": "Fragrant black coffee with cognac and whipped cream",
      "price": "6.50",
      "category": "coffee",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Cinnamon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 1,
      "name": "Moroccan",
      "src": "./images/menu/tea/tea-1.jpg",
      "description": "Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint",
      "price": "4.50",
      "category": "tea",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Lemon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 2,
      "name": "Ginger",
      "src": "./images/menu/tea/tea-2.jpg",
      "description": "Original black tea with fresh ginger, lemon and honey",
      "price": "5.00",
      "category": "tea",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Lemon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 3,
      "name": "Cranberry",
      "src": "./images/menu/tea/tea-3.jpg",
      "description": "Invigorating black tea with cranberry and honey",
      "price": "5.00",
      "category": "tea",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Lemon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 4,
      "name": "Sea buckthorn",
      "src": "./images/menu/tea/tea-4.jpg",
      "description": "Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon",
      "price": "5.50",
      "category": "tea",
      "sizes": {
        "s": {
          "size": "200 ml",
          "add-price": "0.00"
        },
        "m": {
          "size": "300 ml",
          "add-price": "0.50"
        },
        "l": {
          "size": "400 ml",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Sugar",
          "add-price": "0.50"
        },
        {
          "name": "Lemon",
          "add-price": "0.50"
        },
        {
          "name": "Syrup",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 1,
      "name": "Marble cheesecake",
      "src": "./images/menu/dessert/dessert-1.jpg",
      "description": "Philadelphia cheese with lemon zest on a light sponge cake and red currant jam",
      "price": "3.50",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 2,
      "name": "Red velvet",
      "src": "./images/menu/dessert/dessert-2.jpg",
      "description": "Layer cake with cream cheese frosting",
      "price": "4.00",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 3,
      "name": "Cheesecakes",
      "src": "./images/menu/dessert/dessert-3.jpg",
      "description": "Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar",
      "price": "4.50",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 4,
      "name": "Creme brulee",
      "src": "./images/menu/dessert/dessert-4.jpg",
      "description": "Delicate creamy dessert in a caramel basket with wild berries",
      "price": "4.00",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 5,
      "name": "Pancakes",
      "src": "./images/menu/dessert/dessert-5.jpg",
      "description": "Tender pancakes with strawberry jam and fresh strawberries",
      "price": "4.50",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 6,
      "name": "Honey cake",
      "src": "./images/menu/dessert/dessert-6.jpg",
      "description": "Classic honey cake with delicate custard",
      "price": "4.50",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 7,
      "name": "Chocolate cake",
      "src": "./images/menu/dessert/dessert-7.jpg",
      "description": "Cake with hot chocolate filling and nuts with dried apricots",
      "price": "5.50",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    },
  
    {
      "id": 8,
      "name": "Black forest",
      "src": "./images/menu/dessert/dessert-8.jpg",
      "description": "A combination of thin sponge cake with cherry jam and light chocolate mousse",
      "price": "6.50",
      "category": "dessert",
      "sizes": {
        "s": {
          "size": "50 g",
          "add-price": "0.00"
        },
        "m": {
          "size": "100 g",
          "add-price": "0.50"
        },
        "l": {
          "size": "200 g",
          "add-price": "1.00"
        }
      },
      "additives": [
        {
          "name": "Berries",
          "add-price": "0.50"
        },
        {
          "name": "Nuts",
          "add-price": "0.50"
        },
        {
          "name": "Jam",
          "add-price": "0.50"
        }
      ]
    }
  ]
;

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
    const menuDescription = createMenuItemDescriptionWrapper();
    createMenuItemDescriptionTitle(menuDescription, element);
    createMenuItemDescriptionText(menuDescription, element);
    createMenuItemDescriptionPrice(menuDescription, element);
    item.append(menuDescription);
}

function createMenuItemImage(item, element) {
    const itemWrapper = createImageWrapper();
    const itemImage = createImage(element);

    itemWrapper.append(itemImage);
    item.append(itemWrapper);
}

function createImageWrapper() {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('menu__item__image__wrapper');
    return itemWrapper;
}

function createMenuItemDescriptionWrapper() {
    const itemDescription = document.createElement('div');
    itemDescription.classList.add('menu__item__description');
    return itemDescription;
}

function createImage(element) {
    const itemImage = document.createElement('img');
    itemImage.classList.add('menu__item__image');
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

loadProducts(currentCategory);