const { createSlice } = require("@reduxjs/toolkit");

const intialState = {
    cartItems: [],
    total: 0,
}

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
          existingItem.subtotal =
            existingItem.productId.price *
            (1 - existingItem.productId.offerPercentage / 100) *
            existingItem.quantity;
        } else {
          // Add new item to the cart
          state.cartItems.unshift(action.payload);
        }
  
        // Recalculate the total based on all items in the cart
        state.total = state.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
      },
      setCartItems: (state, action) => {
        state.cartItems = action.payload;
        // Recalculate the total based on all items in the cart
        state.total = state.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
      },
    },
  });

export const { addItemToCart, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;