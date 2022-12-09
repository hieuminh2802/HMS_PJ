import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
function ViewProduct()
{
    const [loading,setLoading] = useState(true);
    const [productlist, setProductlist] = useState([]);

    useEffect(() => {
        axios.get(`/api/view-product`).then(res =>{
            if(res.status === 200)
            {
                setProductlist(res.data.products);
            }
            setLoading(false);
        });
    }, []);
    const deleteProduct = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
        axios.delete(`/api/delete-product/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    var viewproduct_HTMLTABLE = "";
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
                    <h4 className="text-center">Loading Products</h4>
                    </div>
                </div>
            </div>
        );   
    }
    else
    {
        var ProdStatus = '';
        viewproduct_HTMLTABLE = productlist.map( (item) => {
            if(item.status == '0')
            {
                ProdStatus = <span className="badge rounded-pill bg-warning text-dark">Working</span>;
            }
            else if(item.status == '1')
            {
                ProdStatus = <button type="button" onClick={ (e) => deleteProduct(e, item.id )} className="btn btn-danger btn-sm">Delete</button>;
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt={ item.image } /></td>
                    <td>
                        <Link to={`edit-product/${item.id}`} className="btn btn-dark btn-sm">Edit</Link>
                    </td>
                    <td>
                        {ProdStatus}
                    </td>
                </tr>
            )
        });
    }

    return(
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header bg-white">
                    <h4>Category List
                        <Link to="/admin/add-product" className="btn btn-dark float-end btn-sm">Add Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table align-middle mb-0 bg-white">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>Product Name</th>
                                <th>Selling Price</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewproduct_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;