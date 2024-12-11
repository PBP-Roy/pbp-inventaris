import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    items: [],
    categories: [],
    magnitudes: [],
    logs: [],
    statuses: [],
    lowStockProducts: [],
    topTenProducts: [],
    setUser: () => {},
    setItems: () => {},
    setCategories: () => {},
    setMagnitudes: () => {},
    setLogs: () => {},
    setStatuses: () => {},
    setLowStockProducts: () => {},
    setTopTenProducts: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [magnitudes, setMagnitudes] = useState([]);
    const [logs, setLogs] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [topTenProducts, setTopTenProducts] = useState([]);

    return (
        <StateContext.Provider value={{ user, items, categories, magnitudes, logs, statuses, lowStockProducts, topTenProducts, setUser, setItems, setCategories, setMagnitudes, setLogs, setStatuses, setLowStockProducts, setTopTenProducts }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);