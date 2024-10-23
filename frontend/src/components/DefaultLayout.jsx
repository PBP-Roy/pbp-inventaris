import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider"

const DefaultLayout = () => {
    const { token } = useStateContext();
    if (!token) {
        return <Navigate to='/login' />
    }

    // TODO: Uncomment after component is done
    return (
        <>
        {/* <Navbar />
        <Sidebar /> */}
        <main>
            <Outlet />
        </main>
        </>
    )
}

export default DefaultLayout;