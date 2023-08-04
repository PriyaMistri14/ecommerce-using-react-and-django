
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import userReducer from './user/userSlice'


import storage from 'redux-persist/lib/storage';

import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import { combineReducers } from '@reduxjs/toolkit';


import categoryReducer from './category/categorySlice'


import productReducer from './product/productSlice'


import cartReducer from './cart/cartSlice'


import orderReducer from './order/orderSlice'


import reviewReducer from './review/reviewSlice'





const rootReducer = combineReducers({
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    review:reviewReducer
})




const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)





export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })   
})



export const persistor = persistStore(store)

