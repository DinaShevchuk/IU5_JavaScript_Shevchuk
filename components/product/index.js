import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../../main/index.js";

export class ProductPage {
    constructor(parent, productId) {
        this.parent = parent;
        this.productId = productId;
    }

    get pageRoot() {
        return document.getElementById('product-detail');
    }

    getHTML() {
        return `
            <div class="container">
                <div id="product-detail" class="detail-card"></div>
            </div>
        `;
    }

    getProductById(id) {
        const products = {
            1: {
                id: 1,
                name: "Аспирин-МедФарм",
                shortDescription: "Эффективное противовоспалительное и жаропонижающее средство",
                image: "https://apteka245.ru/img/drugs/nnt7691.jpg",
                price: "150 ₽",
            },
            2: {
                id: 2,
                name: "Парацетамол-МедФарм",
                shortDescription: "Быстрое жаропонижающее и обезболивающее средство",
                fullDescription: "Парацетамол-МедФарм - эффективное жаропонижающее и обезболивающее средство. Применяется при лихорадочных состояниях, головной и зубной боли, мигрени, боли в спине и суставах. Действующее вещество: парацетамол 500 мг. Не содержит сахар.",
                image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600",
                price: "120 ₽",
                form: "Таблетки 500 мг",
                dosage: "По 1 таблетке при необходимости до 4 раз в день",
                contraindications: "Печеночная недостаточность, алкоголизм, гиперчувствительность"
            },
            3: {
                id: 3,
                name: "Гриппин-МедФарм",
                shortDescription: "Комплексное средство от гриппа и простуды",
                fullDescription: "Гриппин-МедФарм - комбинированный препарат для симптоматического лечения гриппа и ОРВИ. Снимает жар, головную боль, уменьшает насморк и кашель. Действующие вещества: парацетамол, фенилэфрин, аскорбиновая кислота. Устраняет основные симптомы простуды.",
                image: "https://images.unsplash.com/photo-1616671276441-2f2c3a21a5a4?w=600",
                price: "280 ₽",
                form: "Капсулы",
                dosage: "По 1 капсуле 2 раза в день",
                contraindications: "Тяжелые заболевания печени, почек, беременность"
            },
            4: {
                id: 4,
                name: "Ноофен-МедФарм",
                shortDescription: "Для улучшения памяти и концентрации",
                fullDescription: "Ноофен-МедФарм - ноотропный препарат для улучшения мозгового кровообращения, памяти и внимания. Применяется при снижении концентрации внимания, нарушениях памяти, в период интенсивных умственных нагрузок. Улучшает метаболизм в тканях мозга.",
                image: "https://images.unsplash.com/photo-1585435557343-3b092031a3e4?w=600",
                price: "350 ₽",
                form: "Капсулы 400 мг",
                dosage: "По 1 капсуле 2 раза в день",
                contraindications: "Индивидуальная непереносимость, беременность"
            },
            5: {
                id: 5,
                name: "АллергоСтоп-МедФарм",
                shortDescription: "Быстрое действие при аллергии",
                fullDescription: "АллергоСтоп-МедФарм - эффективное антигистаминное средство нового поколения. Быстро устраняет зуд, чихание, заложенность носа, слезотечение при аллергических реакциях. Действует 24 часа, не вызывает сонливости. Подходит для длительного применения.",
                image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600",
                price: "220 ₽",
                form: "Таблетки 10 мг",
                dosage: "1 таблетка 1 раз в день",
                contraindications: "Беременность, кормление грудью"
            },
            6: {
                id: 6,
                name: "КардиоЗдоровье-МедФарм",
                shortDescription: "Для здоровья сердечно-сосудистой системы",
                fullDescription: "КардиоЗдоровье-МедФарм - комплекс витаминов и минералов для поддержки сердца. Содержит калий, магний, коэнзим Q10, витамины группы B. Улучшает работу сердечной мышцы, нормализует ритм, снижает уровень холестерина. Рекомендуется для профилактики сердечно-сосудистых заболеваний.",
                image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600",
                price: "420 ₽",
                form: "Капсулы",
                dosage: "2 капсулы в день во время еды",
                contraindications: "Индивидуальная непереносимость компонентов"
            }
        };
        return products[id] || products[1];
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const productData = this.getProductById(parseInt(this.productId));
        const productComponent = new ProductComponent(this.pageRoot);
        productComponent.render(productData);
    }
}
