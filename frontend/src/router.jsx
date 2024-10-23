import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import App from './App';
import NotFoundPage from './NotFoundPage';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/',
        element: <GuestLayout />,
        errorElement: <App />,
        // TODO: Uncomment after component is done
        children: [
            {
                path: '/login',
                // element: <LoginPage />
            },
            {
                path: '/register',
                // element: <RegisterPage />
            }
        ]
    }
])

export default routes;