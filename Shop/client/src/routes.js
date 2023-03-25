import Adm from "./pages/Adm";
import Auth from "./pages/Auth";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SELLER_ADMIN_ROUTE} from "./utils/consts";

export const authRoutes = [
    {
        path: SELLER_ADMIN_ROUTE,
        Component: Adm
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]