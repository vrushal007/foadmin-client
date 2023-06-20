import { configureStore } from '@reduxjs/toolkit'
import { cartApi } from './api/cartApi'
import {ordersApi} from './api/ordersApi';
import {mealsApi} from './api/mealsApi';

const store = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [mealsApi.reducerPath]: mealsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(cartApi.middleware).concat(ordersApi.middleware).concat(mealsApi.middleware)
})

export default store;