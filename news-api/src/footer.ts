import { rsschoolLogo, githubLogo } from './components/abstracts/logos';
import { Layout } from './components/abstracts/classes';

class Footer extends Layout {
    public createAndAddLogosToFooter(): void {
        const footer = document.querySelector('footer');
        if (footer) {
            const footerLogoRsschhol = this.createFooterLogo('https://rs.school', rsschoolLogo);
            footer.prepend(footerLogoRsschhol);
            const footerLogoGithub = this.createFooterLogo('https://github.com/Zarembochka', githubLogo);
            footer.append(footerLogoGithub);
        }
    }

    private createFooterLogo(href: string, src: string): Element {
        const link = this.createElement('a', 'footer__link');
        link.innerHTML = src;
        link.setAttribute('href', href);
        link.setAttribute('target', '_blank');
        return link;
    }
}

const footer = new Footer();

document.addEventListener('DOMContentLoaded', addLogosToFooter);

function addLogosToFooter(): void {
    footer.createAndAddLogosToFooter();
}
