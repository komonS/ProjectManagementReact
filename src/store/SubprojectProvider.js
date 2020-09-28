import React, { createContext, useReducer } from "react"

export const SubprojectContext = createContext({})

const initialState = {
    subproject: []
}


const subprojectReducer = (state, action) => {
    switch (action.type) {
        case "SET_SUBPROJECT":
            return {
                ...state, // copy state 
                subproject: action.payload // set state counter
            }
    }
}

export const SubprojectProvider = ({ children }) => {
    const [subprojectState, subprojectDispatch] = useReducer(
        subprojectReducer,
        initialState
    )

    const { subproject } = subprojectState

    const setSubproject = payload =>
        subprojectDispatch({ type: "SET_SUBPROJECT", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

    return (
        <SubprojectContext.Provider value={{ subproject, setSubproject }}>
            {children}
        </SubprojectContext.Provider>
    )
}