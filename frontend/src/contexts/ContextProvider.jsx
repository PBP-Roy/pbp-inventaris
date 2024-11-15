import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, _setUser] = useState(sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null);
    const [token, _setToken] = useState(sessionStorage.getItem('token'));

    const setUser = (user) => {
        _setUser(user);
        // TODO: Sesuaikan dengan skema database
        if(user) {
            let User = {
                id: user.id,
                name: user.name,
                username: user.username,
                tipe_user: user.tipe_user,
                no_hp: user.no_hp,
                id_jurusan: user.id_jurusan
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

    // TODO: Sesuaikan value
    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);