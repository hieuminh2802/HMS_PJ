import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Category()
{   
    const [category, setCategory] = useState([]);
    useEffect(() => {
        let isMountered = true;
        axios.get(`/api/getCategory`).then(res => {
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                    setCategory(res.data.category);
                }
            }
        });
        return() => {
            isMountered = false;
        }
    },[]);
    var showCategoryList = '';
        showCategoryList = category.map( (item, idx)=>{
            return (
                <div className="column-cate" key={idx}>
                    <div className="card-cate">
                        <Link to={`collections/${item.slug}`} style={{ textDecoration: 'none' }}>
                            <h5>{item.name}</h5>
                        </Link>
                    </div>
                </div>
            )
        });
    return(
        <div>
            <div className="container mt-3">
                    <h3 className="d-flex p-4 border-bottom">All Category</h3>
                        <div className="row-cate">
                            {showCategoryList}
                        </div>
            </div>
        </div>
    )
}
export default Category;