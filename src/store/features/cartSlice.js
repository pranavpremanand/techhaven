const { createSlice } = require("@reduxjs/toolkit");

const intialState = {
  cartItems: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: intialState,
  reducers: {
    addItemToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId._id === action.payload.productId._id
      );

      if (existingItem) {
        // Update quantity and subtotal for existing item
        existingItem.quantity = action.payload.quantity;
        const discountPrice =
          existingItem.productId.price *
          (1 - existingItem.productId.offerPercentage / 100);
        console.log({ discountPrice });
        existingItem.subtotal =
          Math.round(discountPrice) * existingItem.quantity;
      } else {
        // Add new item to the cart
        state.cartItems.unshift(action.payload);
      }

      // Recalculate the total based on all items in the cart
      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.subtotal,
        0
      );
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      // Recalculate the total based on all items in the cart
      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.subtotal,
        0
      );
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId._id !== action.payload
      );
      // Recalculate the total based on all items in the cart
      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.subtotal,
        0
      );
    },
  },
});

export const { addItemToCart, setCartItems, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
