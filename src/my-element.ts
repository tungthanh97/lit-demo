import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TW } from './utils/TailwindMixin';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends TW(LitElement) {
    /**
     * The name to say "Hello" to.
     */
    @property()
    name = 'World';

    /**
     * The number of times the button has been clicked.
     */
    @property({ type: Number })
    count = 0;

    override render() {
        return html`
            <h1 class="text-green">${this.sayHello(this.name)}!</h1>
            <button class="text-red bg-red" @click=${this._onClick} part="button">
                Click Count: ${this.count}
            </button>
            <div class="bg-green">
                <slot></slot>
            </div>
        `;
    }

    private _onClick() {
        this.count++;
        this.dispatchEvent(new CustomEvent('count-changed'));
    }

    /**
     * Formats a greeting
     * @param name The name to say "Hello" to
     */
    sayHello(name: string): string {
        return `Hello, ${name}`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'my-element': MyElement;
    }
}
