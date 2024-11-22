import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider"
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { getItems } from "../api/itemsApi";
import { getCategories } from "../api/categoriesApi";
import { getMagnitudes } from "../api/magnitudesApi";
import { getLogs } from "../api/logsApi";
import { getStatuses } from "../api/statusesApi";

const DefaultLayout = () => {
    // const { token } = useStateContext();
    // if (!token) {
    //     return <Navigate to='/login' />
    // }
    const { items, categories, magnitudes, statuses, setItems, setCategories, setMagnitudes, setLogs, setStatuses } = useStateContext();
    const [isLoading, setIsLoading] = useState(true);

    const fetchItems = async () => {
        const data = await getItems();
        setItems(data.data);
    }
    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data.data);
    }
    const fetchMagnitudes = async () => {
        const data = await getMagnitudes();
        setMagnitudes(data.data);
    }
    const fetchLogs = async () => {
        const data = await getLogs();
        setLogs(data.data);
    }
    const fetchStatuses = async () => {
        const data = await getStatuses();
        setStatuses(data.data);
    }

    const fetchAllData = async () => {
        fetchItems();
        fetchCategories();
        fetchMagnitudes();
        fetchLogs();
        fetchStatuses();
    }

    useEffect(() => {
        fetchAllData();
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [items])

    useEffect(() => {
        if (categories.length > 0 && magnitudes.length > 0 && statuses.length > 0) {
            setIsLoading(false);
        }
    }, [categories, magnitudes, statuses])

    return (
        <>
        <Navbar />
        <Sidebar />
        <main style={{marginLeft: "250px", marginTop: "80px", padding: "20px"}}>
            {isLoading ? <h1>Loading...</h1> : <Outlet />}
        </main>
        </>
    )
}

export default DefaultLayout;