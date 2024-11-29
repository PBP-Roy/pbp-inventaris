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
import { getLowStockProducts, getSummary } from "../api/dashboardApi";

const DefaultLayout = () => {
    if (!localStorage.getItem("token")) {
        return <Navigate to='/guest/login' />
    }
    const { items, categories, magnitudes, statuses, summary, lowStockProducts, user, setItems, setCategories, setMagnitudes, setLogs, setStatuses, setSummary, setLowStockProducts } = useStateContext();
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
    const fetchSummary = async () => {
        const data = await getSummary();
        setSummary({
            total_categories: data.TotalCategory,
            total_products: data.TotalProduct,
            total_products_in: data.TotalProductIn,
            total_products_out: data.TotalProductOut,
        })
    }
    const fetchLowStockProducts = async () => {
        const data = await getLowStockProducts();
        setLowStockProducts(data.LowQuantityStock);
    }

    const fetchAllData = async () => {
        fetchItems();
        fetchCategories();
        fetchMagnitudes();
        fetchLogs();
        fetchStatuses();
        fetchSummary();
        fetchLowStockProducts();
    }

    useEffect(() => {
        fetchAllData();
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [items])

    useEffect(() => {
        if (categories.length > 0 && magnitudes.length > 0 && statuses.length > 0 && summary.total_categories >= 0 && user) {
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