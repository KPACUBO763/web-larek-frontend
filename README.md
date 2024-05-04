# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание данных

### Интерфейсы и типы

```typescript
export type Category = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";

// отображение данных на странице
export interface IPage {
    counter: number;
    catalog: HTMLElement[]
};

// состояние данных в приложении
export interface IAppState {
    catalog: IProduct[];
    basket: string[];
    order: IOrder | null
};

// товар
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Category;
    price: number | null
};

// карточка
export interface ICard {
    description: string;
    image: string;
    title: string;
    category: Category;
    price: number | null
};

// модалка
export interface IModalData {
    content: HTMLElement
};

// модалка с адресом
export interface IAddressForm {
    payment: string;
    address: string
};

// модалка с контактами
export interface IСontactsForm {
    email: string;
    phone: string
};

// оформление заказа
export interface IOrder extends IAddressForm, IСontactsForm {
    items: string | string[];
    total: number
};

// успешный заказ
export interface ISuccess {
    id: string;
    total: number
};

// состояние формы
export interface IFormState {
    valid: boolean;
    errors: string[]
};

// корзина
export interface IBasketView {
    items: HTMLElement[];
    price: number
};

// ошибка в форме
export type FormErrors = Partial<Record<keyof IOrder, string>>
```

### Базовые классы

- Класс **Api** отвечает за взаимодействие с сервером.
**Методы:**
    - `get(uri: string)` - отправляет GET запросы на сервер;
    - `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - отправляет POST запросы на сервер.

- Абстрактный класс **Component** отвечает за взаимодействие с DOM.
**Методы:**
    - `toggleClass(element: HTMLElement, className: string, force?: boolean)` - переключает класс;
    - `setText(element: HTMLElement, value: unknown)` - устанавливает текстовое содержимое;
    - `setDisabled(element: HTMLElement, state: boolean)` - меняет статус блокировки;
    - `setHidden(element: HTMLElement)` - скрывает элемент;
    - `setVisible(element: HTMLElement)` - показывает элемент;
    - `setImage(element: HTMLImageElement, src: string, alt?: string)` - устанавливает изображение с альтернативным текстом;
    - `render(data?: Partial<T>): HTMLElement` - возвращает корневой DOM-элемент.

- Класс **EventEmitter** отвечает за работу событий.
**Методы:**
    - `on<T extends object>(eventName: EventName, callback: (event: T) => void)` - устанавливает обработчик на событие;
    - `off(eventName: EventName, callback: Subscriber)` - снимает обработчик с события;
    - `emit<T extends object>(eventName: string, data?: T)` - инициирует событие с данными;
    - `onAll(callback: (event: EmitterEvent) => void)` - слушает все события;
    - `offAll()` - сбрасывает все события;
    - `trigger<T extends object>(eventName: string, context?: Partial<T>)` - делает коллбек триггер, генерирующий событие при вызове.

- Абстрактный класс **Model** отвечает за работу с данными.
**Методы:**
    - `emitChanges(event: string, payload?: object)` - сообщает всем, что модель поменялась.


### Слой данных (Model)
- Класс **AppState** отвечает за управление данными.
**Методы:**
    - `getCatalog(items: IProductList[])` - возвращает список товаров;
    - `addProduct()` - добавляет товар в корзину;
    - `removeProduct()` - удаляет товар из корзины;
    - `get countProducts()` - возвращает кол-во товаров в корзине;
    - `get priceProducts()` - возвращает общую стоимость товаров в корзине;
    - `setDataOrder()` - устанавливает данные о покупателе;
    - `resetBasket()` - очищает корзину;
    - `resetDataOrder()` - удаляет данные о покупателе.

### Слой коммуникаций
- Класс **WebLarekAPI** соединяет слой данных (Model) и слой отображения (View).
**Методы:**
    - `getProductItem(id: string)` - возвращает товар;
    - `getProductList()` - возвращает список товаров.

### Слой отображения (View)
- Класс **Page** отвечает за отображение данных на странице.
**Методы:**
    - `set counter(value: number)` - устанавливает счетчик товаров;
    - `set catalog(items: HTMLElement[])` - устанавливает каталог товаров;
    - `set locked(value: boolean)` - устанавливает блокировку.

- Класс **basket** отвечает за отображение данных в корзине.
**Методы:**
    - `set items(items: HTMLElement[])` - устанавливает добавленные товары;
    - `set price(price: number)` - устанавливает общую сумму корзины.

- Класс **Form** отвечает за установку контента в формах и его валидацию.
**Методы:**
    - `onInputChange(field: keyof T, value: string)` - изменяет значение в поле;
    - `set valid(value: boolean)` - отображает валидность;
    - `set errors(value: string)` - устанавливает ошибку;
    - `render(state: Partial<T> & IFormState)` - отображает форму.

- Класс **ISuccess** отвечает за отображение суммы списанных средств в окне успешного заказа.
**Методы:**
    - `set price(price: number)` - устанавливает сумму списанных средств.

- Класс **Modal** отвечает за работу модальных окон.
**Методы:**
    - `set content(value: HTMLElement)` - устанавливает контент;
    - `open()` - открывает модальное окно;
    - `close()` - закрывает модальное окно;
    - `render(data: IModalData)` - отображает модальное окно.

- Класс **AddressForm** отвечает за форму с выбором способа оплаты и адреса доставки.
**Методы:**
    - `set address(value: string)` - устанавливает адрес доставки.

- Класс **ContactsForm** отвечает за форму с указанием телефона и почты покупателя.
**Методы:**
    - `set phone(value: string)` - устанавливает номер телефона;
    -  `set email(value: string)` - устанавливает почту.
