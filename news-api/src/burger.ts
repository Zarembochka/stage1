import { Layout } from './components/abstracts/classes';

class BurgerMenu extends Layout {
    private header = document.querySelector('header');
    public createBurger(): void {
        const menu = this.createElement('button', 'burger');
        for (let i = 1; i <= 4; i += 1) {
            const menuSpan = this.createElement('span', 'burger__span');
            if (i === 2) {
                menuSpan.classList.add('burger__span-second');
            }
            if (i === 3) {
                menuSpan.classList.add('burger__span-third');
            }
            menu.prepend(menuSpan);
        }
        this.addBurgerFunctions(menu);
        const header = document.querySelector('header');
        if (header) {
            header.append(menu);
        }
    }
    private addBurgerFunctions(menu: Element): void {
        menu.addEventListener('click', burgerMenu.showSources);
    }
    public showSources(): void {
        if (burgerMenu.header) {
            if (burgerMenu.header.classList.contains('show')) {
                burgerMenu.hideSources();
                return;
            }
            burgerMenu.header.classList.add('show');
            burgerMenu.stopScroll();
        }
    }
    private calcRightPadding(): string {
        const bodyPaddingRight = getComputedStyle(document.body).paddingRight;
        const bodyPaddingRightValue = +bodyPaddingRight.slice(0, -2);
        const result = window.innerWidth - document.body.clientWidth + bodyPaddingRightValue;
        if (result > 0) {
            return result + 'px';
        }
        return '';
    }
    private stopScroll(): void {
        document.body.style.paddingRight = this.calcRightPadding();
        document.body.classList.add('show-menu');
    }
    public hideSources(): void {
        if (burgerMenu.header) {
            burgerMenu.header.classList.remove('show');
        }
        burgerMenu.allowScroll();
    }
    private allowScroll(): void {
        document.body.style.paddingRight = '';
        document.body.classList.remove('show-menu');
    }
}

export const burgerMenu = new BurgerMenu();

document.addEventListener('DOMContentLoaded', addBurgerMenu);
window.addEventListener('resize', hideBurgerMenu);

function addBurgerMenu(): void {
    burgerMenu.createBurger();
}

function hideBurgerMenu(): void {
    if (window.innerWidth > 768) {
        burgerMenu.hideSources();
    }
}
