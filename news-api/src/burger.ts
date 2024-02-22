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
        menu.addEventListener('click', showSources);
    }
    public showSources(): void {
        if (this.header) {
            if (this.header.classList.contains('show')) {
                this.hideSources();
                return;
            }
            this.header.classList.add('show');
            this.stopScroll();
        }
    }
    private calcRightPadding(): string {
        const bodyMargin: number = 8;
        return window.innerWidth - document.body.clientWidth - 2 * bodyMargin + 'px';
    }
    private stopScroll(): void {
        document.body.style.paddingRight = this.calcRightPadding();
        document.body.classList.add('show-menu');
    }
    public hideSources(): void {
        if (this.header) {
            this.header.classList.remove('show');
        }
        this.allowScroll();
    }
    private allowScroll(): void {
        document.body.style.paddingRight = '';
        document.body.classList.remove('show-menu');
    }
}

export const burgerMenu = new BurgerMenu();

document.addEventListener('DOMContentLoaded', addBurgerMenu);

function addBurgerMenu(): void {
    burgerMenu.createBurger();
}

function showSources(): void {
    burgerMenu.showSources();
}

export function hideSources(): void {
    burgerMenu.hideSources();
}
