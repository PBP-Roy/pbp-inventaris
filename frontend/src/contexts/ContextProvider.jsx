import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    items: [],
    categories: [],
    magnitudes: [],
    logs: [],
    statuses: [],
    summary: {
        total_categories: -1,
        total_products: -1,
        total_products_in: -1,
        total_products_out: -1,
    },
    setUser: () => {},
    setItems: () => {},
    setCategories: () => {},
    setMagnitudes: () => {},
    setLogs: () => {},
    setStatuses: () => {},
    setSummary: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [magnitudes, setMagnitudes] = useState([]);
    const [logs, setLogs] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [summary, setSummary] = useState({
        total_categories: -1,
        total_products: -1,
        total_products_in: -1,
        total_products_out: -1,
    });
    const [lowStockProducts, setLowStockProducts] = useState([]);

    return (
        <StateContext.Provider value={{ user, items, categories, magnitudes, logs, statuses, summary, lowStockProducts, setUser, setItems, setCategories, setMagnitudes, setLogs, setStatuses, setSummary, setLowStockProducts }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);