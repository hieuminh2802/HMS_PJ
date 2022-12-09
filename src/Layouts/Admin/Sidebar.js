import React from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle';
import { FaAngleDown, FaChartArea, FaFirstOrderAlt, FaMobileAlt, FaStreetView, FaTable, FaTachometerAlt } from "react-icons/fa";
import {AiOutlineAppstoreAdd} from "react-icons/ai";
import {HiOutlineViewGrid, HiViewGrid} from "react-icons/hi";
import { FiSmartphone } from "react-icons/fi";
const Sidebar = () => {
    return (
                <nav className="sb-sidenav accordion sb-sidenav-dark text-white" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link className="nav-link" to="/admin/dashboard">
                                <div className="sb-nav-link-icon text-white"><FaTachometerAlt/></div>
                                Dashboard
                            </Link>
                            <Link className="nav-link" to="/admin/profile">
                                <div className="sb-nav-link-icon text-white"><FaTachometerAlt/></div>
                                Profile
                            </Link>
                            <div className="sb-sidenav-menu-heading">Category & Product</div>
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseCategories" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon text-white"><HiOutlineViewGrid/></div>
                                Category
                                <div className="sb-sidenav-collapse-arrow"><FaAngleDown/></div>
                            </Link>
                            <div className="collapse" id="collapseCategories" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/admin/add-category">
                                        <div className="sb-nav-link-icon text-white"><AiOutlineAppstoreAdd/></div>
                                        Add Category
                                    </Link>
                                    <Link className="nav-link" to="/admin/view-category">
                                        <div className="sb-nav-link-icon text-white"><HiViewGrid/></div>
                                        View Category
                                    </Link>
                                </nav>
                            </div>
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProducts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon text-white"><FiSmartphone/></div>
                                Product
                                <div className="sb-sidenav-collapse-arrow"><FaAngleDown/></div>
                            </Link>
                            <div className="collapse" id="collapseProducts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/admin/add-product">
                                        <div className="sb-nav-link-icon text-white"><FaMobileAlt/></div>
                                        Add Product
                                    </Link>
                                    <Link className="nav-link" to="/admin/view-product">
                                        <div className="sb-nav-link-icon text-white"><FaMobileAlt/></div>
                                        View Product
                                    </Link>
                                </nav>
                            </div>
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseOrders" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon text-white"><FaFirstOrderAlt/></div>
                                Orders
                                <div className="sb-sidenav-collapse-arrow"><FaAngleDown/></div>
                            </Link>
                            <div className="collapse" id="collapseOrders" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/admin/orders">
                                        <div className="sb-nav-link-icon text-white"><FaStreetView/></div>
                                        View Orders
                                    </Link>
                                </nav>
                            </div>
                            {/* <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div className="sb-nav-link-icon text-white"><FaBookOpen/></div>
                                Pages
                                <div className="sb-sidenav-collapse-arrow"><FaAngleDown/></div>
                            </Link>
                            <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                        Authentication
                                        <div className="sb-sidenav-collapse-arrow"><FaAngleDown/></div>
                                    </Link>
                                    <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to="login.html">Login</Link>
                                            <Link className="nav-link" to="register.html">Register</Link>
                                            <Link className="nav-link" to="password.html">Forgot Password</Link>
                                        </nav>
                                    </div>
                                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                        Error
                                        <div className="sb-sidenav-collapse-arrow"><FaAngleDown/></div>
                                    </Link>
                                    <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link className="nav-link" to="401.html">401 Page</Link>
                                            <Link className="nav-link" to="404.html">404 Page</Link>
                                            <Link className="nav-link" to="500.html">500 Page</Link>
                                        </nav>
                                    </div>
                                </nav>
                            </div> */}
                            <div className="sb-sidenav-menu-heading">Addons</div>
                            <Link className="nav-link" to="charts.html">
                                <div className="sb-nav-link-icon text-white"><FaChartArea/></div>
                                Charts
                            </Link>
                            <Link className="nav-link" to="tables.html">
                                <div className="sb-nav-link-icon text-white"><FaTable/></div>
                                Tables
                            </Link>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        HMSHOP
                    </div>
                </nav>
    );
}
export default Sidebar;