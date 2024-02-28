import './alphabet.css';
import { Layout } from './components/abstracts/classes';

export class Alphabet extends Layout {
    public createAlphabet(): void {
        const main = document.querySelector('main');
        if (main) {
            const mainAlphabet = this.createElement('div', 'alphabet');
            this.addAlphabetFunctions(mainAlphabet);
            this.createAlphabetBtns(mainAlphabet);
            main.prepend(mainAlphabet);
        }
    }

    private createAlphabetBtns(item: Element): void {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < alphabet.length; i += 1) {
            const btn = this.createElement('button', 'alphabet__btn buttons', alphabet[i]);
            btn.setAttribute('data-literal', alphabet[i]);
            item.append(btn);
        }
    }

    private addAlphabetFunctions(item: Element): void {
        item.addEventListener('click', this.filterSources);
    }

    private filterSources(e: Event): void {
        const target = e.target as HTMLElement;
        if (target.classList.contains('alphabet__btn')) {
            const literal = target.dataset.literal;
            if (literal) {
                const checked = target.getAttribute('checked');
                if (checked && checked === 'true') {
                    alphabet.showAllSources();
                    alphabet.removeAttributeChecked();
                    return;
                }
                alphabet.removeAttributeChecked();
                target.setAttribute('checked', 'true');
                alphabet.hideSourses(literal);
            }
        }
    }

    private removeAttributeChecked(): void {
        const btns = [...document.querySelectorAll('.alphabet__btn[checked="true"]')];
        btns.forEach((item) => item.removeAttribute('checked'));
    }

    private showAllSources(): void {
        const sources = [...document.querySelectorAll('.source__item')];
        sources.filter((item) => item.classList.contains('hide')).map((item) => item.classList.remove('hide'));
    }

    private filterFunction(item: Element, literal: string): boolean {
        const sourceTitle = item.getAttribute('data-source-id');
        if (!sourceTitle) return true;
        return sourceTitle[0].toUpperCase() !== literal.toUpperCase();
    }

    private hideSourses(literal: string): void {
        const sources = [...document.querySelectorAll('.source__item')];
        this.showAllSources();
        sources.filter((item) => this.filterFunction(item, literal)).forEach((item) => item.classList.add('hide'));
        this.clearNews();
    }

    private clearNews(): void {
        const news = document.querySelector('.news');
        if (news) {
            news.innerHTML = '';
        }
    }
}

const alphabet = new Alphabet();

document.addEventListener('DOMContentLoaded', addAlphabetToLayout);

function addAlphabetToLayout(): void {
    alphabet.createAlphabet();
}
