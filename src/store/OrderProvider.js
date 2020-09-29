import React, { createContext, useReducer } from "react"

export const OrderContext = createContext({})

const initialState = {
    order: []
}


const orderReducer = (state, action) => {
    switch (action.type) {
        case "SET_ORDER":
            return {
                ...state, // copy state 
                order: action.payload // set state counter
            }
    }
}

export const OrderProvider = ({ children }) => {
    const [orderState, orderDispatch] = useReducer(
        orderReducer,
        initialState
    )

    const { order } = orderState

    const setOrder = payload =>
        orderDispatch({ type: "SET_ORDER", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    )
}