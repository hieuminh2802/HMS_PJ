import React from "react";
import {Carousel} from "react-bootstrap";
import img1 from "../../Assets/frontend/Uploads/banner1.png";
import img2 from "../../Assets/frontend/Uploads/banner2.png";
import img3 from "../../Assets/frontend/Uploads/banner3.png";
import img4 from "../../Assets/frontend/Uploads/banner5.png";
import img5 from "../../Assets/frontend/Uploads/banner6.png";



function Carousel1 () {
    return (
        <div className="container" >
            <div className="row">
                <div className="col-md-8 mt-3" style={{ zIndex: '-1' }}>
                    <Carousel fade>
                        <Carousel.Item>
                            <div className="inner1">
                                <img
                                className="d-block w-100"
                                src={img1}
                                alt="First slide"
                                />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="inner1">
                                <img
                                className="d-block w-100"
                                src={img2}
                                alt="Second slide"
                                />
                            </div>  
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="inner1">
                                <img
                                className="d-block w-100"
                                src={img3}
                                alt="Third slide"
                                />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="col-md-4 mt-2">
                    <div className="col mt-4">
                        <div className="inner1">
                            <div className="card">
                                <img src={img4}
                                alt="Palm Springs Road"/>
                            </div>
                        </div>    
                    </div>
                    <div className="col mt-4">
                        <div className="inner1">
                            <div className="card">
                                <img src={img5}
                                alt="Palm Springs Road"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel1;