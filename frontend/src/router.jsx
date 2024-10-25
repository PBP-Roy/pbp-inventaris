import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import App from './App';
import NotFoundPage from './NotFoundPage';
import DashboardPage from './Pages/DashboardPage';
import LoginPage from './Pages/LoginPage';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '/',
                element: <DashboardPage />
            }
        ]
    },
    {
        path: '/guest',
        element: <GuestLayout />,
        errorElement: <App />,
        // TODO: Uncomment after component is done
        children: [
            {
                path: '/guest/login',
                element: <LoginPage />
            },
            {
                path: '/guest/register',
                // element: <RegisterPage />
            }
        ]
    }
])

export default routes;