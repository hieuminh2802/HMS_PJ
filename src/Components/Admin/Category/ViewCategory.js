import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
function ViewCategory()
{
    const [loading,setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);

    useEffect(() => {
        axios.get(`/api/view-category`).then(res =>{
            if(res.status === 200)
            {
                setCategorylist(res.data.category)
            }
            setLoading(false);
        });
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
        axios.delete(`/api/delete-category/${id}`).then(res=>{
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

    var viewcategory_HTMLTABLE = "";
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
                    <h4 className="text-center">Loading Category</h4>
                    </div>
                </div>
            </div>
        );   
    }
    else
    {
        viewcategory_HTMLTABLE = categorylist.map( (item) =>{
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`edit-category/${item.id}`} className="btn btn-dark btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={ (e) => deleteCategory(e, item.id )} className="btn btn-danger btn-sm">Delete</button>
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
                        <Link to="/admin/add-category" className="btn btn-dark float-end btn-sm">Add Category</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table align-middle mb-0 bg-white text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewcategory_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewCategory;