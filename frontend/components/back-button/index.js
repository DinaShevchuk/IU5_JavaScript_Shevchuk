export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <button id="back-button" class="btn btn-outline-primary mb-4">
                <i class="fas fa-arrow-left me-2"></i>Вернуться к каталогу
            </button>
        `;
    }

    addListeners(listener) {
        const button = document.getElementById("back-button");
        if (button) {
            button.addEventListener("click", listener);
        }
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('afterbegin', html);
        this.addListeners(listener);
    }
}
