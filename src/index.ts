import './scss/styles.scss';

import { WebLarekAPI } from './components/WebLarekAPI';
import {API_URL, CDN_URL} from "./utils/constants";
import {EventEmitter} from "./components/base/events";
import {AppState, Product} from './components/AppData';
import {Page} from "./components/Page";
import {cloneTemplate, createElement, ensureElement} from "./utils/utils";
import {Modal} from "./components/common/Modal";
import {Basket} from "./components/common/Basket";
import {Card} from './components/Card';
import {Address} from './components/Address';
import {Contacts} from './components/Contacts';
import {Success} from './components/common/Success';


const events = new EventEmitter();
const api = new WebLarekAPI(CDN_URL, API_URL)

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const addressTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const address = new Address(cloneTemplate(addressTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});

// Получаем продукты с сервера
api.getProductList()
    .then(appData.setCatalog.bind(appData))
    .catch(err => console.error(err));

// вывести каталог на страницу
events.on('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const cardCatalog = new Card(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });

        return cardCatalog.render({
            id: item.id,
            description: item.description,
            image: item.image,
            title: item.title,
            category: item.category,
            price: item.price
        })
    })
});

// модалка выбранной карточки
events.on('card:select', (item: Product) => {
    events.emit('modal:open');
    const cardItem = new Card(cloneTemplate(cardPreviewTemplate), {
        onClick: () => events.emit('item:addBasket', item)
    });

    modal.render({
        content: cardItem.render({
            id: item.id,
            description: item.description,
            image: item.image,
            title: item.title,
            category: item.category,
            price: item.price,
            selected: item.selected
        })
    })
})
