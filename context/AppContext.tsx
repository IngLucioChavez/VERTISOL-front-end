"use client";

import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
} from "react";

import { reducer, initialState } from "./reducer";
import { Action, AppState } from "./types";

interface ContextProps {
    state: AppState;
    dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<ContextProps | undefined>(
    undefined
);

export const AppProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useApp debe usarse dentro del provider");
    }

    return context;
};