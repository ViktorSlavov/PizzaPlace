import { DocumentReference } from 'angularfire2/firestore';

export interface TimelineDate {
    date: Date;
    event: string;
}

/** Different types of hypoalergens and/or other specific information */
export enum PRODUCT_SPECIFICS {
    VEGAN = 'VEGAN',
    SPICY = 'SPICY',
    DAIRY = 'DAIRY',
    NUTS = 'NUTS'
}

export enum PRODUCT_TYPES {
    BEVARAGE = 'BEVARAGE',
    PIZZA = 'PIZZA',
    COMBO = 'COMBO',
    SIDE = 'SIDE'
}

export const PRODUCT_SPECIFICS_IMAGES = {
    [PRODUCT_SPECIFICS.VEGAN]: '🌿',
    [PRODUCT_SPECIFICS.SPICY]: '🔥',
    [PRODUCT_SPECIFICS.DAIRY]: '🥛',
    [PRODUCT_SPECIFICS.NUTS]: '🥜',
};
export interface Timeline {
    dates: TimelineDate[];
}

export enum INGREDIENT_CATEGORY {
    SAUCE = 'sauce',
    CHEESE = 'cheese',
    VEGETABLE = 'vegetable',
    FRUIT = 'fruit',
    MEAT = 'meat',
    OTHER = 'other'
}

export interface Ingredient {
    name: string;
    category: INGREDIENT_CATEGORY;
    cost: number;
}

export interface Order {
    id?: any;
    user: any;
    active: boolean;
    checkOut: boolean;
    items: {
        product: DocumentReference,
        quantity: number
    }[];
    orderPrice: number;
}

export interface CartEntry {
    cartItemId: any;
    product: Pizza | Product;
    quantity: number;
}

export interface Product {
    name: string;
    type: PRODUCT_TYPES;
    price: number;
    image?: string;
    link?: string;
    description?: string;
    specifics?: PRODUCT_SPECIFICS[];
}
export interface Pizza extends Product {
    ingredients: Ingredient[];
}

export interface UserAddress {
    street?: {
        name: string,
        number: string
    };
    building?: {
        number: number;
        floor?: string;
        entrance?: string;
        appartmentNumber?: string;
    };
}
export interface UserInfo {
    name: string;
    phone: string;
    email: string;
    address: UserAddress;
}

export interface Offer {
    name: string;
    link: string;
    image: string;
}

/** Emitters */
export interface OrderChangeEmit {
    product: Product;
    quantity: number;
}
