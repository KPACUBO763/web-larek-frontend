import './scss/styles.scss';

import { WebLarekAPI } from './components/WebLarekAPI';
import {API_URL, CDN_URL} from "./utils/constants";
import {EventEmitter} from "./components/base/events";
import {cloneTemplate, createElement, ensureElement} from "./utils/utils";


const events = new EventEmitter();
const api = new WebLarekAPI(CDN_URL, API_URL)
// const catalogModel = new CatalogModel(events);

// export interface ICatalogModel {
//     items: IProduct[];
//     setItems(items: IProduct[]): void;
//     getProduct(id: string): IProduct
// }

// api.getProductList()
//     .then(catalogModel.setItems.bind(catalogModel))
//     .catch(err => console.log(err))
