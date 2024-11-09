import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider"
import Sidebar from "./Sidebar";

const DefaultLayout = () => {
    // const { token } = useStateContext();
    // if (!token) {
    //     return <Navigate to='/login' />
    // }

    // TODO: Fetch data from backend and pass it to context

    // TODO: Uncomment after component is done
    return (
        <>
        {/* <Navbar /> */}
        <Sidebar />
        <main style={{marginLeft: "250px", marginTop: "80px", padding: "20px"}}>
            <Outlet />
        </main>
        </>
    )
}

export default DefaultLayout;