const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[],
        totalAmount:0,
        totalQuantity:0,
        changed:false,
    },
    reducers:{
        addItem(state,action){
            state.totalAmount = state.totalAmount + (action.payload.price * action.payload.amount)
            console.log(state.totalAmount)
            const existingCartItem = state.items.find(item => item._id === action.payload._id )
            state.changed = true;
            state.totalQuantity += action.payload.amount;
            if(existingCartItem){
                existingCartItem.amount += action.payload.amount;
            }else{
                state.items.push(action.payload)
            }
        },
        removeItem(state,action){
            const id = action.payload
            const existingItem = state.items.find(item => item._id === id);
            state.totalQuantity--;
            state.changed = true;
            if(existingItem.amount>1){
                existingItem.amount--;
                state.totalAmount -= existingItem.price;
            }else{
                state.items = state.items.filter(item => item._id !== id);
                state.totalAmount -= existingItem.price;
            }
        },
        replaceCart(state,action){
            state.items = action.payload.items
            state.totalAmount = action.payload.totalAmount
        },
        updateCart(state,action){
            console.log(action.payload)
            state._id = action.payload
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice;