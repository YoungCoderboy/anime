import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  TOGGLE_CART_ITEM_AMOUNT,
  COUNT_CART_TOTALS,
} from "../utils/actions";

interface CardState {
  cart: any;
  total_items: number;
  total_amount: number;
  shipping_fee: number;
}

type Action = {
  type: string;
  payload?: any;
};

const card_reducer = (state: CardState, action: Action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, quantity, product } = action.payload;
      const tempItem = state.cart.find((item: any) => item.id === id);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem: any) => {
          if (cartItem.id === id) {
            let newAmount = cartItem.quantity + 1;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, quantity: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id,
          name: product.name,
          price: product.price,
          image: product.imageCover,
          quantity,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }

    case REMOVE_FROM_CART:
      const tempCart = state.cart.filter(
        (item: any) => item.id !== action.payload
      );
      return { ...state, cart: tempCart };
    case CLEAR_CART:
      return { ...state, cart: [] };
    case TOGGLE_CART_ITEM_AMOUNT:
      const { id: toggleId, value } = action.payload;
      const newCart = state.cart.map((item: any) => {
        if (item.id === toggleId) {
          if (value === "inc") {
            let newAmount = item.quantity + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, quantity: newAmount };
          }
          if (value === "dec") {
            let newAmount = item.quantity - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, quantity: newAmount };
          }
        } else {
          return item;
        }
      });

      return { ...state, cart: newCart };
    case COUNT_CART_TOTALS:
      const { total_items, total_amount } = state.cart.reduce(
        (total: any, cartItem: any) => {
          const { quantity, price } = cartItem;
          total.total_items += quantity;
          total.total_amount += price * quantity;
          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );
      return { ...state, total_items, total_amount };
    default:
      return state;
  }
};

export default card_reducer;
