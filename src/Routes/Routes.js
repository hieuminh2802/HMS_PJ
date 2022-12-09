import Dashboard from "../Components/Admin/Dashboard";
import Profile from "../Components/Admin/Profile";
import Category from "../Components/Admin/Category/Category";
import ViewCategory from "../Components/Admin/Category/ViewCategory";
import EditCategory from "../Components/Admin/Category/EditCategory";
import AddProduct from "../Components/Admin/Product/AddProduct";
import ViewProduct from "../Components/Admin/Product/ViewProduct";
import EditProduct from "../Components/Admin/Product/EditProduct";
import Order from "../Components/Admin/Order/Order";

const Routes = [
    { path: '/admin', exact: true, name: 'Admin'},
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile},
    { path: '/admin/add-category', exact: true, name: 'Category', component: Category},
    { path: '/admin/view-category', exact: true, name: 'ViewCategory', component: ViewCategory},
    { path: '/admin/edit-category/:id', exact: true, name: 'EditCategory', component: EditCategory},
    { path: '/admin/add-product', exact: true, name: 'Product', component: AddProduct},
    { path: '/admin/view-product', exact: true, name: 'ViewProduct', component: ViewProduct},
    { path: '/admin/edit-product/:id', exact: true, name: 'EditProduct', component: EditProduct},
    { path: '/admin/orders', exact: true, name: 'Order', component: Order},

];
export default Routes;