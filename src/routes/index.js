import AdminPage from "../pages/admin";
import Home from "../pages/home";
import Login from "../pages/login";
import Product from "../pages/product";
const publicRoutes = [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/product', component: Product },
    { path: '/admin', component: AdminPage },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };