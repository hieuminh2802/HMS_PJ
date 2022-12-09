import React from "react";
import { Link } from "react-router-dom";
import "../../Assets/frontend/css/content.css";
import logo1 from "../../Assets/frontend/Uploads/640px-Apple-logo.png"
import logo2 from "../../Assets/frontend/Uploads/samsung-logo-text-png-1.png"

import img1 from "../../Assets/frontend/Uploads/IP14PM.png"
import img2 from "../../Assets/frontend/Uploads/zfold4.png"

function Content()
{
    return(
        <div>
            <div className="container mt-3">
            <h3 className="d-flex p-3 border-bottom">Hot Trend</h3>
        </div>
        <div className="container-content">
                <div className="card1">
                    <div className="circle1">
                        <img src={logo1} className="logo1" />
                    </div>
                    <div className="content1">
                        <h2 className="fw-bold">Apple</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley of type.</p>
                        <Link to="/collections/Apple" className="a fw-bold">View</Link>
                    </div>
                    <img src={img1} className="productimg1" />
                </div>
                <div className="card2">
                    <div className="circle2">
                        <img src={logo2} className="logo2" />
                    </div>
                    <div className="content2">
                        <h2 className="fw-bold">Samsung</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley of type.</p>
                        <Link to="/collections/Samsung" className="a fw-bold">View</Link>
                    </div>
                    <img src={img2} className="productimg2" />
                </div>
        </div>
        </div>
    )
}
export default Content;