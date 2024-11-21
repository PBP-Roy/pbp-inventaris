import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    items: [],
    categories: [],
    magnitudes: [],
    logs: [],
    statuses: [],
    setUser: () => {},
    setToken: () => {},
    setItems: () => {},
    setCategories: () => {},
    setMagnitudes: () => {},
    setLogs: () => {},
    setStatuses: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, _setUser] = useState(sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null);
    const [token, _setToken] = useState(sessionStorage.getItem('token'));
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [magnitudes, setMagnitudes] = useState([]);
    const [logs, setLogs] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const setUser = (user) => {
        _setUser(user);
        if(user) {
            let User = {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
            }
            sessionStorage.setItem('user', JSON.stringify(User));
        } else {
            sessionStorage.removeItem('user');
        }
    }

    const setToken = (token) => {
        _setToken(token);
        if(token) {
            sessionStorage.setItem('token', token);
        } else {
            sessionStorage.removeItem('token');
        }
    }

    return (
        <StateContext.Provider value={{ user, token, items, categories, magnitudes, logs, statuses, setUser, setToken, setItems, setCategories, setMagnitudes, setLogs, setStatuses }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);