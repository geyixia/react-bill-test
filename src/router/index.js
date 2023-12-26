import { createBrowserRouter } from "react-router-dom";
import Layout from '../pages/Layout/index';
import Month from '../pages/Month/index';
import New from '../pages/New/index';
import Year from '../pages/Year/index';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children:[
            {
                path: "month",
                element: <Month />
            },
            {
                path: "year",
                element: <Year />
            },
        ]
    },
    {
        path: "/new",
        element: <New />
    },
])

export default router