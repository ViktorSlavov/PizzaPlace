import { Product, PRODUCT_TYPES, PRODUCT_SPECIFICS } from './interfaces';

export const dummyProducts: Product[] = [ {
    image: 'lettuce_salad',
    name: 'Wine & Dine Combo',
    price: 8.49,
    type: PRODUCT_TYPES.COMBO,
    specifics: [PRODUCT_SPECIFICS.VEGAN]
}, {
    image: 'caesar_salad',
    name: 'Caesar Salad',
    price: 8.78,
    type: PRODUCT_TYPES.SIDE,
}, {
    image: 'ice-cream',
    name: 'Chocolate Sundae',
    price: 4.86,
    type: PRODUCT_TYPES.SIDE,
    specifics: [PRODUCT_SPECIFICS.DAIRY, PRODUCT_SPECIFICS.NUTS]
}, {
    image: 'crispy_chicken',
    name: 'Cripsy Chicken Wings',
    price: 6.12,
    type: PRODUCT_TYPES.SIDE
}, {
    image: 'spicy_chicken',
    name: 'Spicy Chicken Wings',
    price: 6.49,
    type: PRODUCT_TYPES.SIDE,
    specifics: [PRODUCT_SPECIFICS.SPICY]
}, {
    image: 'coca-cola',
    name: 'Coca-Cola (0.33l)',
    price: 2.09,
    type: PRODUCT_TYPES.BEVARAGE
}, {
    image: 'orange_juice',
    name: 'Orange Juice (0.33l)',
    price: 2.09,
    type: PRODUCT_TYPES.BEVARAGE
}, {
    image: 'beer',
    name: 'Original Beer (0.33l)',
    price: 2.29,
    type: PRODUCT_TYPES.BEVARAGE
}, {
    image: 'pepperoni',
    name: 'Pepperoni Pizza',
    price: 6.19,
    type: PRODUCT_TYPES.PIZZA,
    specifics: [PRODUCT_SPECIFICS.SPICY]
}, {
    image: 'meat_mania',
    name: 'Meat Mania',
    price: 6.89,
    type: PRODUCT_TYPES.PIZZA
}, {
    image: 'vegetarian_pizza',
    name: 'Vegetarian Pizza',
    price: 5.86,
    type: PRODUCT_TYPES.PIZZA
}, {
    image: 'mushroom_pizza',
    name: 'Mushroom Pizza',
    price: 5.86,
    type: PRODUCT_TYPES.PIZZA
}];
