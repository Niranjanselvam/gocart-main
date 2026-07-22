import { createSlice } from '@reduxjs/toolkit'

const initialState = { orders: [] }

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder(state, action) {
            state.orders.push(action.payload)
        },
        setOrders(state, action) {
            state.orders = action.payload
        },
    },
})

export const { addOrder, setOrders } = orderSlice.actions
export default orderSlice.reducer
