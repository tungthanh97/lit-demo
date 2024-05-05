// import style from '../styles/main.css?inline';
import globalCss from '../styles/global.css';

const supportsAdoptedCSS = Array.isArray(document.adoptedStyleSheets);
const cssContent = String(globalCss);

export const TW = <T extends LitMixin>(superClass: T): T => {
    class TailwindMixin extends superClass {
        static styleElement: HTMLStyleElement;

        static stylesheet: CSSStyleSheet;

        // Disable no-explicit-any because Mixin constructor parameters must have an any[] type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);
            void this.createStylesheet();
        }

        async createStylesheet() {
            console.log('superClass', cssContent);
            if (supportsAdoptedCSS) {
                if (!TailwindMixin.stylesheet) {
                    TailwindMixin.stylesheet = new CSSStyleSheet();
                    await TailwindMixin.stylesheet.replace(cssContent);
                }
                this.shadowRoot?.adoptedStyleSheets.push(TailwindMixin.stylesheet);
            } else {
                if (!TailwindMixin.styleElement) {
                    TailwindMixin.styleElement = document.createElement('style');
                    TailwindMixin.styleElement.textContent = cssContent;
                }
                this.shadowRoot?.append(TailwindMixin.styleElement.cloneNode());
            }
        }
    }
    return TailwindMixin;
};
