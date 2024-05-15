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

## Архитектура приложения

Проектная работа построена на основе паттерна MVP(Model-View-Presenter) и состоит из следующих слоев:
- Слой данных (Model) - отвечает за хранение и изменение данных.
- Слой представления (View) - реализует отображение данных и маршрутизацию пользовательских команд или событий Presenter`у.
- Слой Presenter - предназначен для управления и обменом данными между View и Model.

## Описание данных

### Интерфейсы и типы
```
export type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

// состояние данных в приложении
export interface IAppState {
    catalog: IProduct[];
    basket: IProduct[];
    order: IOrder | null;
    formErrors: TFormErrors;
    setCatalog(items: IProduct[]): void;
    add(card: IProduct): void;
    remove(id: string): void;
    setDataOrder(field: keyof IValidForm, value: string): void
};

// товар
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Category;
    price: number | null;
    selected?: boolean
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

// валидация форм
export type IValidForm = Pick<IOrder, 'payment' | 'address' | 'email' | 'phone'>

// оформление заказа
export interface IOrder extends IAddressForm, IСontactsForm {
    items: string[];
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
    total: number
};

// товар в корзине
export type IBacketCard = Pick<IProduct, 'id' | 'title' | 'price'>;

// ошибка в форме
export type TFormErrors = Partial<Record<keyof IOrder, string>>
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

- Класс **EventEmitter** отвечает за работу событий. Класс основан на паттерне Observer, который позволяет создать зависимость между объектами-наблюдателями и одним объектом-источником. При изменении состояния источника все наблюдатели автоматически об этом оповещаются.
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
    - `setCatalog(items: IProduct[])` - возвращает список товаров;
    - `add(item: IProduct)` - добавляет товар в корзину;
    - `remove(id: string)` - удаляет товар из корзины;
    - `get count()` - возвращает кол-во товаров в корзине;
    - `get total()` - возвращает общую стоимость товаров в корзине;
    - `selected()` - устанавливает выбранные товары в заказе;
    - `setDataOrder(field: keyof IValidForm, value: string)` - устанавливает данные о покупателе;
    - `resetBasket()` - очищает корзину;
    - `resetDataOrder()` - удаляет данные о покупателе;
    - `resetCount()` - сбрасывает счетчик корзины;
    - `resetSelected()` - сбрасывает выбранные товары в заказе;
    - `validateAddress()` - валидация формы адреса;
    - `validateContacts()` - валидация формы контактов.

### Слой Presenter
- Класс **WebLarekAPI** управляет данными между слоем данных (Model) и слоем представления (View).
**Методы:**
    - `getProduct(id: string): Promise<IProduct>` - возвращает товар;
    - `getProductList(): Promise<IProduct[]>` - возвращает список товаров.

### Слой представления (View)
- Класс **Page** отвечает за отображение данных на странице.
**Методы:**
    - `set counter(value: number)` - устанавливает счетчик товаров;
    - `set catalog(items: HTMLElement[])` - устанавливает каталог товаров;
    - `set locked(value: boolean)` - устанавливает блокировку.

- Класс **Card** отвечает за отображение карточек на странице.
**Методы:**
    - `set title(value: string)` - устанавливает название товара;
    - `set image(value: string)` - устанавливает картинку;
    - `set text(value: string)` - устанавливает описание;
    - `set category(value: string)` - устанавливает категорию;
    - `set price(value: number | null)` - устанавливает цену;
    - `get price()` - возвращает цену;
    - `set button(value: string)` - устанавливает текст кнопки;
    - `set selected(value: boolean)` - устанавливает статус товара (выбран или нет).

- Класс **Basket** отвечает за отображение данных в корзине.
**Методы:**
    - `set items(items: HTMLElement[])` - устанавливает добавленные товары;
    - `set price(price: number)` - устанавливает общую сумму корзины;
    - `disableButton(value: boolean)` - блокирует кнопку.

- Класс **Form** отвечает за установку контента в формах и его валидацию.
**Методы:**
    - `onInputChange(field: keyof T, value: string)` - изменяет значение в поле;
    - `set valid(value: boolean)` - отображает валидность;
    - `set errors(value: string)` - устанавливает ошибку;
    - `render(state: Partial<T> & IFormState)` - отображает форму.

- Класс **Success** отвечает за отображение суммы списанных средств в окне успешного заказа.
**Методы:**
    - `set total(total: number)` - устанавливает сумму списанных средств.

- Класс **Modal** отвечает за работу модальных окон.
**Методы:**
    - `set content(value: HTMLElement)` - устанавливает контент;
    - `open()` - открывает модальное окно;
    - `close()` - закрывает модальное окно;
    - `render(data: IModalData)` - отображает модальное окно.

- Класс **Address** отвечает за форму с выбором способа оплаты и адреса доставки.
**Методы:**
    - `set address(value: string)` - устанавливает адрес доставки.

- Класс **Contacts** отвечает за форму с указанием телефона и почты покупателя.
**Методы:**
    - `set phone(value: string)` - устанавливает номер телефона;
    - `set email(value: string)` - устанавливает почту.
