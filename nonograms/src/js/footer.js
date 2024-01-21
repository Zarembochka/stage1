import { rsschoolLogo, githubLogo } from "./logos";
import { createElement } from "./layout";

export function createFooter(container) {
    const footer = createElement("footer", "footer");
    const footerList = createFooterList(footer);
    createFooterListItems(footerList);
    container.append(footer);
}

function createFooterList(footer) {
    const footerList = createElement("ul", "footer__list");
    footer.append(footerList);
    return footerList;
}

function createFooterListItems(footerList) {
    for (let i = 1; i <= 3; i += 1) {
        const listItem = createElement("li", "footer__list__item");
        fillFooterListElement(listItem, i);
        footerList.append(listItem);
    }
}

function fillFooterListElement(listItem, index) {
    //rsschool logo
    if (index === 1) {
        createFooterLogo(listItem, "https://rs.school", rsschoolLogo, "Rsschool logo image");
        return;
    }
    if (index === 2) {
        createDevelopmentYear(listItem);
        return;
    }
    if (index === 3) {
        createFooterLogo(
            listItem,
            "https://github.com/Zarembochka",
            githubLogo,
            "Github logo image"
        );
        return;
    }
}

function createFooterLogo(item, href, src) {
    const link = createElement("a", "footer__link");
    link.href = href;
    link.target = "_blank";
    link.innerHTML = src;
    item.append(link);
}

function createDevelopmentYear(item) {
    item.textContent = "©2024";
}
