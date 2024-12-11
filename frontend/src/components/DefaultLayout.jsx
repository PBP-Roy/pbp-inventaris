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
import { getLowStockProducts, getTopTenProducts } from "../api/dashboardApi";
import axiosClient from "../api/axiosClient";

const DefaultLayout = () => {
    if (!localStorage.getItem("token")) {
        return <Navigate to='/guest/login' />
    }
    const { items, categories, magnitudes, statuses, logs, lowStockProducts, topTenProducts, user, setItems, setCategories, setMagnitudes, setLogs, setStatuses, setLowStockProducts, setTopTenProducts } = useStateContext();
    const [isLoading, setIsLoading] = useState(true);

    const fetchLogs = async () => {
        const data = await getLogs();
        setLogs(data.data);
    }

    const fetchAllData = async () => {
        const data = await axiosClient.get('/all').then(res => {
            return res.data.data;
        }).catch(err => {
            console.log(err);
            return err;
        })
        setItems(data.items);
        setCategories(data.categories);
        setMagnitudes(data.magnitudes);
        setLogs(data.logs);
        setStatuses(data.statuses);
        setLowStockProducts(data.lowStock);
        setTopTenProducts(data.topTen);
    }

    useEffect(() => {
        fetchAllData();
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [items])

    useEffect(() => {
        if (categories.length > 0 && magnitudes.length > 0 && statuses.length > 0 && user) {
            setIsLoading(false);
        }
    }, [categories, magnitudes, statuses, user])

    return (
        <>
        <Navbar />
        <Sidebar />
        <main style={{marginLeft: "250px", marginTop: "80px", padding: "20px"}}>
            {isLoading ? <h2>Loading...</h2> : <Outlet />}
        </main>
        </>
    )
}

export default DefaultLayout;