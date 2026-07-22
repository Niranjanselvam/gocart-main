import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import productReducer from './features/product/productSlice'
import addressReducer from './features/address/addressSlice'
import ratingReducer from './features/rating/ratingSlice'
import authReducer from './features/auth/authSlice'
import orderReducer from './features/order/orderSlice'

const appReducer = combineReducers({
    cart: cartReducer,
    product: productReducer,
    address: addressReducer,
    rating: ratingReducer,
    auth: authReducer,
    order: orderReducer,
})

export const makeStore = () => {
    // Wrap the combined reducer to reset cart on logout
    const rootReducer = (state, action) => {
        if (action && action.type === 'auth/logout') {
            const { cart, ...rest } = state || {}
            const resetState = {
                ...rest,
                cart: { total: 0, cartItems: {} },
            }
            return appReducer(resetState, action)
        }
        return appReducer(state, action)
    }

    return configureStore({
        reducer: rootReducer,
    })
}