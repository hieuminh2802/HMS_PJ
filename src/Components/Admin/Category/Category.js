import React, { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from "axios";
import swal from "sweetalert";
import {Link} from "react-router-dom";

function Category () {
    const [loading,setLoading] =useState(true);
    const [categoryInput, setCategory] = useState({
        slug:'',
        name:'',
        descrip:'',
        status:'',
        meta_title:'',
        meta_keyword:'',    
        meta_descrip:'',
    });

    const [errorlist, setError] = useState([]);

    const handleInput = (e) =>{
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value });
    } 

    const submitCategory = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('slug',categoryInput.slug);
        formData.append('name',categoryInput.name);
        formData.append('description',categoryInput.description);
        formData.append('status',categoryInput.status);
        formData.append('meta_title',categoryInput.meta_title);
        formData.append('meta_keyword',categoryInput.meta_keyword);
        formData.append('meta_descrip',categoryInput.meta_descrip);
        
    axios.post(`/api/store-category`, formData).then(res => {
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setCategory({...categoryInput,
                    slug: '',
                    name: '',
                    description: '',

                    status: '',

                    meta_title: '',
                    meta_keyword: '',
                    meta_descrip: '',
                });
                setError([]);
            }
            else if(res.data.status === 400)
            {   
                swal("All Fields are mandetory","","error");
                setError(res.data.errors);
            }
        });
    }

    // if(loading)
    // {
    //     return (
    //         <div>
    //             <h4 className="vh-100 d-flex justify-content-center align-items-center">Loading Add Category  
    //                 <div className="spinner-grow text-dark" role="status"></div>
    //                 <div className="spinner-grow text-dark" role="status"></div>
    //                 <div className="spinner-grow text-dark" role="status"></div>
    //             </h4>
    //         </div>
    //     );   
    // }
    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Category 
                        <Link to="/admin/view-category" className="btn btn-dark btn-sm float-end">View Category</Link>
                    </h4>
                </div>
                <div className="card-body">
                <form onSubmit={submitCategory} encType="multipart/form-data">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">Seo Tags</button>
                        </li>
                    </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control"/>
                                    <small className="text-danger">{errorlist.slug}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control"/>
                                    <small className="text-danger">{errorlist.name}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea type="text" name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                                </div>
                                <div className="col-md-4 form-group mb-3 mt-4">
                                    <div className="form-check">
                                        <label className="form-check-label">Status</label>
                                        <input type="checkbox" onChange={handleInput} value={categoryInput.status} className="form-check-input" name="status" />
                                    </div>                              
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                                <div className="form-group mb-3">
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control"/>
                                    <small className="text-danger">{errorlist.meta_title}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Keywords</label>
                                    <textarea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <textarea name="meta_descrip" onChange={handleInput} value={categoryInput.meta_descrip} className="form-control"></textarea>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark mt-3 px-4 float-end">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Category;