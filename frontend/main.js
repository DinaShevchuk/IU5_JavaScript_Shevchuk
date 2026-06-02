import { MainPage } from "./pages/main/index.js";

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    if (root) {
        const mainPage = new MainPage(root);
        mainPage.render();
    } else {
        console.error('Элемент #root не найден');
    }
});
