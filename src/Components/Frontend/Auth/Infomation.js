import axios from "axios";
import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import avt from "../../../Assets/frontend/Uploads/avt.png";
function Information(){

    const [loading,setLoading] = useState(true);
    const [info, setInfoUser] = useState([]);

    useEffect(() => {
        let isMountered = true;
        axios.get(`/api/get-info`).then(res => {
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                    setInfoUser(res.data.info);
                }
                setLoading(false);
            }
        });
        return() => {
            isMountered = false;
        }
    },[]);

    if(loading)
    {
        return (
            <div>
                <div className="vh-100 d-flex justify-content-center align-items-center">  
                    <div className="row">
                        <div className="loading d-flex justify-content-center align-items-center">
                            <div className="spinner-border text-dark" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    <h4 className="text-center">Loading Information</h4>
                    </div>
                </div>
            </div>
        );   
    }
    var Information = '';
    Information = info.map( (item, idx)=>(
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-5">
                    <div className="avt mt-2 mb-3 ms-5 me-5">
                        <img src={avt} height="250px" width="250px" className="d-flex justify-content-center" />
                    </div>      
                </div>
                <div className="col-md-7">
                    <div className="col-md-12 mt-3">
                        <h4>
                            <label>Name : </label>
                            <label> {item.name}</label>
                        </h4>
                    </div>
                    <div className="col-md-12 mt-5">
                        <h4>
                            <label>Email : </label>
                            <label> {item.email}</label>
                        </h4>
                    </div>   
                    <div className="col-md-12 mt-5">
                        <h4>
                            <label>Password : </label>
                            <label>********</label>
                        </h4>
                    </div>   
                    <div className="d-flex justify-content-center mt-5">
                        <Link to={`view-detail-order/${item.id}`} className="btn btn-dark btn-lg">Change Informaiton</Link>
                    </div>                   
                </div>
            </div>
        </div>
    ));
    return (
        <div>
            <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="card shadow rouded-lg">
                                <div className="card-header bg-white text-center">
                                    <h4 className="fw-bold ">Information</h4>
                                </div>
                                <div className="card-body">
                                    {Information}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Information;