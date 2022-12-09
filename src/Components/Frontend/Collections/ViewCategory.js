import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
function ViewCategory()
{

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        let isMountered = true;
        axios.get(`/api/getCategory`).then(res => {
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                    setCategory(res.data.category);
                    setLoading(false);
                }
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
                    <h4 className="text-center">Loading Categories</h4>
                    </div>
                </div>
            </div>
        );   
    }
    else
    {
        var showCategoryList = '';
        showCategoryList = category.map( (item, idx)=>{
            return (
                <div className="column-cate" key={idx}>
                    <div className="card-cate">
                        <Link to={`collections/${item.slug}`} style={{ textDecoration: 'none' }} className="text-black fw-bold">
                            <h5>{item.name}</h5>
                        </Link>
                    </div>
                </div>
            )
        });
    }

    return(
        <div>
            <div className="py-3 bg-dark text-white">
                <div className="container mt-2">
                    <h6>Category Page</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row-cate">
                        {showCategoryList}
                    </div>
                </div>
            </div>
        </div>
    )
}   
export default ViewCategory;