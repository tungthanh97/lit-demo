import MessageRepository from '@/repositories/messageRepository';
import { messageTemplate } from '@/templates/message.template';
import { IMesssage, MESSAGE_ROLE } from '@/types/message';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
    static override styles = css`
        :host {
            display: block;
            border: solid 1px gray;
            padding: 16px;
            max-width: 800px;
        }

        .container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .message-input input {
            width: 500px;
            padding: 10px;
            font-size: 16px;
        }

        .message-input button {
            height: 40px;
            padding: 10px;
        }
    `;

    /**
     * Messages to display
     */
    @property({ state: true })
    private _messages: IMesssage[] = [];

    /**
     * Messages input
     */
    @property({ state: true })
    private _messageInput = '';

    override connectedCallback(): void {
        // executed when the component is connected to the DOM
        super.connectedCallback();

        MessageRepository.getMessages().then((response) => {
            console.log(response);
            // this._messages = response.data;
        });
    }

    async submitMessage(event: any) {
        event.preventDefault();
        this._messages.push({
            id: String(this._messages.length + 1),
            role: MESSAGE_ROLE.HUMAN,
            content: this._messageInput,
        });
        const aiResponse = await MessageRepository.postMessage(this._messageInput);

        if (!aiResponse.error)
            this._messages.push({
                id: String(this._messages.length + 1),
                role: MESSAGE_ROLE.AI,
                content: aiResponse.content,
            });
        this._messageInput = '';
    }

    inputHandler(event: any) {
        this._messageInput = event.target.value;
    }

    override render() {
        return html`
            <div class="container">
                ${this._messages?.map((message) => messageTemplate(message))}
                <form @submit="${(e: any) => this.submitMessage(e)}" class="message-input">
                    <input value="${this._messageInput}" @input="${this.inputHandler}" />

                    <button type="submit">Send</button>
                </form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'my-element': MyElement;
    }
}
