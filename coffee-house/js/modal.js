import products from './products.json'assert {type: 'json'};

const modal = document.querySelector('.modal');
const modalInner = document.querySelector('.modal__inner');

modalInner.addEventListener('click', clickOnTheModal);

modal.addEventListener('click', checkTheClick);

function addListenerForModal() {
    const menuItems = document.querySelectorAll('.menu__item');
    menuItems.forEach((element) => element.addEventListener('click', showModal));
}

function checkTheClick(event) {
    if (event._isClickOnTheModal) {
        return;
    }
    hideModal();
}

function clickOnTheModal(event) {
    event._isClickOnTheModal = true;
}

function showModal(event) {
    event._isClickOnTheModal = true;
    const id = event.currentTarget.lastChild.textContent;
    const elementFromJson = findElementFromJson(id);
    prepareModal(elementFromJson);
    modal.classList.add('modal-show');
    stopScroll();
}

function hideModal() {
    modal.classList.remove('modal-show');
    clearModal();
    allowScroll();
}

function findElementFromJson(id) {
    return products.find((element) => element.id === +id);
}

function clearModal() {
    modalInner.innerHTML = '';
}

function prepareModal(element) {
    prepareModalImage(element);
    prepareModalContent(element);
}

function prepareModalImage(element) {
    const modalImage = createImage(element, 'modal__image');
    modalInner.append(modalImage);
}

function prepareModalContent(element) {
    const modalContent = createMenuItemDescriptionWrapper('modal__content');
    createMenuItemTitle(modalContent, element);
    createMenuItemSizeChoice(modalContent, element);
    addListenerForSizeChoice(modalContent, element);
    createMenuItemAdditivesChoice(modalContent, element);
    addListenerForAdditivesChoice(modalContent, element);
    createMenuItemTotalPrice(modalContent, element);
    createMenuItemPriceInfo(modalContent);
    createMenuItemButtonClose(modalContent);
    modalInner.append(modalContent);
}

function createMenuItemTitle(item, element) {
    const modalTitle = createMenuItemDescriptionWrapper('modal__content__title');
    createMenuItemDescriptionTitle(modalTitle, element);
    createMenuItemDescriptionText(modalTitle, element);
    item.append(modalTitle);
}

function createMenuItemSizeChoice(item, element) {
    const sizeChoiceWrapper = createMenuItemDescriptionWrapper('modal__content__size');
    createBlockTitle(sizeChoiceWrapper, 'Size', 'modal__content__size__title');
    createModalSizeChoice(sizeChoiceWrapper, element);
    item.append(sizeChoiceWrapper);
}

function createMenuItemAdditivesChoice(item, element) {
    const sizeAdditivesWrapper = createMenuItemDescriptionWrapper('modal__content__additives');
    createBlockTitle(sizeAdditivesWrapper, 'Additives', 'modal__content__size__title');
    createModalAdditivesChoice(sizeAdditivesWrapper, element);
    item.append(sizeAdditivesWrapper);
}

function createMenuItemPriceInfo(item) {
    const priceInfoWrapper = createMenuItemDescriptionWrapper('modal__content__price__info');
    createPriceInfoIco(priceInfoWrapper);
    createPriceInfoInfo(priceInfoWrapper);
    item.append(priceInfoWrapper);
}

function createBlockTitle(item, title, className) {
    const blockTitle = document.createElement('h4');
    blockTitle.textContent = title;
    blockTitle.classList.add(className);
    item.append(blockTitle);
}

function createModalForm(className) {
    const modalForm = document.createElement('form');
    modalForm.classList.add(className);
    return modalForm;
}

function createMenuItemButtonClose(item) {
    const btnModalClose = document.createElement('button');
    btnModalClose.classList.add('button', 'button-close');
    btnModalClose.textContent = 'Close';
    item.append(btnModalClose);
    btnModalClose.addEventListener('click', hideModal);
}

function createPriceInfoIco(item) {
    const modalItemPriceIco = document.createElement('span');
    modalItemPriceIco.classList.add("modal__form__total__ico");
    modalItemPriceIco.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clip-path="url(#clip0_268_9737)">
        <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_268_9737">
            <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
    </svg>
    `;
    item.append(modalItemPriceIco);
}

function createPriceInfoInfo(item) {
    const modalItemPriceInfo = document.createElement('span');
    modalItemPriceInfo.classList.add("modal__form__total__info");
    modalItemPriceInfo.textContent = `
        The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
    `;
    item.append(modalItemPriceInfo);
}

function createMenuItemTotalPrice(item, element) {
    const modalTotalPrice = document.createElement('p');
    modalTotalPrice.classList.add("modal__form__total");
    modalTotalPrice.innerHTML = `
        Total:
        <span class="menu__form__price">
            $${element.price}
        </span>
    `;
    item.append(modalTotalPrice);
}

function createModalSizeChoice(item, element) {
    const modalSizeForm = createModalForm('modal__size');
    modalSizeForm.innerHTML = `
    <div class="menu__form__item">
        <input class="menu__form__input input-radio" type="radio" name="user__size" id="small" value="s" checked>
        <label class="menu__form__label" for="small">
            <span class="menu__form__ico">
                S
            </span>
            ${element.sizes.s.size}
        </label>
    </div>
    <div class="menu__form__item">
        <input class="menu__form__input input-radio" type="radio" name="user__size" id="medium" value="m">
        <label class="menu__form__label" for="medium">
            <span class="menu__form__ico">
                M
            </span>
            ${element.sizes.m.size}
        </label>
    </div>
    <div class="menu__form__item">
        <input class="menu__form__input input-radio" type="radio" name="user__size" id="large" value="l">
        <label class="menu__form__label" for="large">
            <span class="menu__form__ico">
                L
            </span>
            ${element.sizes.l.size}
        </label>
    </div>`;
    item.append(modalSizeForm);
}

function createModalAdditivesChoice(item, element) {
    const modalAdditivesForm = createModalForm('modal__size');
    modalAdditivesForm.classList.add('modal__additives');
    modalAdditivesForm.innerHTML = `
    <div class="menu__form__item">
        <input class="menu__form__input input-checkbox" type="checkbox" name="user__additives" id=${element.additives[0].name} value=${element.additives[0].name}>
        <label class="menu__form__label" for=${element.additives[0].name}>
            <span class="menu__form__ico">
                1
            </span>
            ${element.additives[0].name}
        </label>
    </div>
    <div class="menu__form__item">
        <input class="menu__form__input input-checkbox" type="checkbox" name="user__additives" id=${element.additives[1].name} value=${element.additives[1].name}>
        <label class="menu__form__label" for=${element.additives[1].name}>
            <span class="menu__form__ico">
                2
            </span>
            ${element.additives[1].name}
        </label>
    </div>
    <div class="menu__form__item">
        <input class="menu__form__input input-checkbox" type="checkbox" name="user__additives" id=${element.additives[2].name} value=${element.additives[2].name}>
        <label class="menu__form__label" for=${element.additives[2].name}>
            <span class="menu__form__ico">
                3
            </span>
            ${element.additives[2].name}
        </label>
    </div>`;
    item.append(modalAdditivesForm);
}

function changePriceForItem(item, price) {
    const itemPrice = item.querySelector(".menu__form__price");
    itemPrice.textContent = `$${price.toFixed(2)}`;
}

function addListenerForSizeChoice(item, element) {
    const modalSizeForm = item.querySelector('.modal__size');
    modalSizeForm.addEventListener('click', (event) => {
        const newSize = event.target.value;
        if (newSize !== undefined) {
            let newPrice = calculatePriceForSize(element, newSize);
            newPrice += calculatePriceForAllAdditives(item, element);
            changePriceForItem(item, newPrice);
        }
    });
}

function addListenerForAdditivesChoice(item, element) {
    const modalAdditivesForm = item.querySelector('.modal__additives');
    modalAdditivesForm.addEventListener('click', (event) => {
        const newAdditive = event.target.value;
        if (newAdditive !== undefined) {
            let newPrice = getStartPrice(modalAdditivesForm, element);
            newPrice += calculatePriceForAllAdditives(modalAdditivesForm, element);
            changePriceForItem(item, newPrice);
        }
    });
}

function calculatePriceForSize(element, newSize) {
    let currentPrice = +element.price;
    currentPrice += +element.sizes[newSize]['add-price'];
    return currentPrice;
}

function getCurrentPriceForAdditive(additive, element) {
    const currentAdditive = element.additives.find((item) => item.name === additive);
    return +currentAdditive['add-price'];
}

function calculatePriceForAdditive(additive, element) {
    if (additive.checked) {
        return getCurrentPriceForAdditive(additive.value, element);
    }
    return 0;
}

function getStartPrice(item, element) {
    const currentSize = modal.querySelector('.input-radio:checked').value;
    return calculatePriceForSize(element, currentSize);
}

function calculatePriceForAllAdditives(item, element) {
    const additives = item.querySelectorAll('.input-checkbox');
    let currentPrice = 0;
    additives.forEach((additive) => currentPrice += calculatePriceForAdditive(additive, element));
    return currentPrice;
}

addListenerForModal();




