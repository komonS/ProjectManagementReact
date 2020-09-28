import React, { createContext, useReducer } from "react"

export const TeamContext = createContext({})

const initialState = {
    team: []
}


const teamReducer = (state, action) => {
    switch (action.type) {
        case "SET_TEAM":
            return {
                ...state, // copy state 
                team: action.payload // set state counter
            }
    }
}

export const TeamProvider = ({ children }) => {
    const [teamState, teamDispatch] = useReducer(
        teamReducer,
        initialState
    )

    const { team } = teamState

    const setTeam = payload =>
    teamDispatch({ type: "SET_TEAM", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

    return (
        <TeamContext.Provider value={{ team, setTeam }}>
            {children}
        </TeamContext.Provider>
    )
}