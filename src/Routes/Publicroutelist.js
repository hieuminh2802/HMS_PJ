import Home from '../Components/Frontend/Home';
import Login from "../Components/Frontend/Auth/Login";
import Register from "../Components/Frontend/Auth/Register";
import Page403 from "../Components/Errors/Page403";
import Page404 from "../Components/Errors/Page404";
import ViewCategory from '../Components/Frontend/Collections/ViewCategory';
import ViewProduct from '../Components/Frontend/Collections/ViewProduct';
import ProductDetail from '../Components/Frontend/Collections/ProductDetail';
import Cart from "../Components/Frontend/Cart";
import Checkout from "../Components/Frontend/Checkout";
import Thankyou from '../Components/Frontend/thankyou';
import ViewOrder from '../Components/Frontend/Collections/ViewOrder';
import Information from '../Components/Frontend/Auth/Infomation';
import ViewDetailOrder from '../Components/Frontend/Collections/ViewDetailOrder';

const Publicroutelist = [
    { path: '/', exact: true, name: 'Home' , component:Home},
    { path: '/403', exact: true, name: 'Page403' , component: Page403},
    { path: '/404', exact: true, name: 'Page404' , component: Page404},
    { path: '/Login', exact: true, name: 'Login', component:Login},
    { path: '/Register', exact: true, name: 'Register', component:Register},
    { path: '/Collections', exact: true, name: 'ViewCategory', component:ViewCategory},
    { path: '/Collections/:slug', exact: true, name: 'ViewProduct', component:ViewProduct},
    { path: '/Collections/:category/:product', exact: true, name: 'ProductDetail', component:ProductDetail},
    { path: '/Cart', exact: true, name: 'Cart', component:Cart},
    { path: '/checkout', exact: true, name: "Checkout", component:Checkout},
    { path: '/Thankyou', exact: true, name: "Thankyou", component:Thankyou},
    { path: '/view-order', exact: true, name: "ViewOrder", component:ViewOrder},
    { path: '/view-detail-order/:id', exact: true, name: 'ViewDetailOrder', component: ViewDetailOrder},
    { path: '/Information', exact: true, name: "Information", component:Information},

];

export default Publicroutelist;