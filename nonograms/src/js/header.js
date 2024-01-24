import { createElement } from "./layout";
import { createNavListItems } from "./nav";

export function createHeader(container) {
    const header = createElement("header", "header");
    const title = createElement("h1", "title", "Nonograms");
    const nav = createElement("nav", "nav");
    const navList = createList(nav, "nav__list");
    createNavListItems(navList);
    //fillHeaderNav(nav);
    header.append(title, nav);
    //header.append(nav);
    container.prepend(header);
}

export function createList(nav, className) {
    const navList = createElement("ul", className);
    nav.append(navList);
    return navList;
}
