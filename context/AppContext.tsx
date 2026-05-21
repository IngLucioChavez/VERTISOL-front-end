"use client";

import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useEffect,
} from "react";

import { reducer, initialState } from "./reducer";

const AppContext = createContext<any>(null);

export const AppProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            dispatch({
                type: "LOGIN",
                payload: JSON.parse(storedUser),
            });
        }
    }, []);

    return (
        <AppContext.Provider
            value={{ state, dispatch }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () =>
    useContext(AppContext);