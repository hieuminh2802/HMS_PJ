import React from "react";
import card1 from "../../Assets/frontend/Uploads/card1.jpg";
import card2 from "../../Assets/frontend/Uploads/card2.jpg";
import card3 from "../../Assets/frontend/Uploads/card3.jpg";

function Card()
{
    return(
        <div className="container mt-3">
            <h3 className="d-flex p-4 border-bottom">Card</h3>
            <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
                <div className="card h-100 " style={{'borderRadius':'15px'}} >
                <div className="inner">
                    <img src={card1} className="card-img-top"
                    alt="Hollywood Sign on The Hill"/>
                </div>
                <div className="card-body">
                    <h5 className="card-title text-center fw-bold">Designed for durability .</h5>
                    <p className="card-text">
                    With Ceramic Shield, tougher than any smartphone glass. Water resistance.1 Surgical-grade stainless steel. 6.1″ and 6.7″ display sizes.2 All in four Pro colors.
                    </p>
                </div>
                </div>
            </div>
            <div className="col">
                <div className="card h-100" style={{'borderRadius':'15px'}} >
                <div className="inner">
                    <img src={card2} className="card-img-top"
                    alt="Palm Springs Road" />
                </div>
                <div className="card-body">
                    <h5 className="card-title text-center fw-bold">
                        Always-On display.</h5>
                    <p className="card-text">Now your Lock Screen is always glanceable, so you don’t even have to tap it to stay in the know.</p>
                </div>
                </div>
            </div>
            <div className="col">
                <div className="card h-100" style={{'borderRadius':'15px'}} >
                <div className="inner">
                    <img src={card3} className="card-img-top"
                    alt="Los Angeles Skyscrapers"/>
                </div>
                <div className="card-body">
                    <h5 className="card-title text-center fw-bold">Pro.Beyond.</h5>
                    <p className="card-text">Introducing Dynamic Island, a truly Apple innovation that’s hardware and software and something in between. It bubbles up music, sports scores, FaceTime, and so much more — all without taking you away from what you’re doing.</p>
                </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Card;