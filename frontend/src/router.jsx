import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import App from './App';
import NotFoundPage from './NotFoundPage';
import DashboardPage from './Pages/DashboardPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import InventoryPage from './Pages/InventoryPage';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '/',
                element: <DashboardPage />
            },
            {
                path: '/inventory/:param', // Type: all, in, out
                element: <InventoryPage />
            }
        ]
    },
    {
        path: '/guest',
        element: <GuestLayout />,
        errorElement: <App />,
        children: [
            {
                path: '/guest/login',
                element: <LoginPage />
            },
            {
                path: '/guest/register',
                element: <RegisterPage />
            }
        ]
    }
])

export default routes;