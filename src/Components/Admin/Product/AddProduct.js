import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import swal from "sweetalert";
function AddProduct()
{   
    const [loading,setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);
    const [productInput, setProduct] = useState({
        category_id: '',
        slug: '',
        name: '',
        description: '',

        meta_title: '',
        meta_keyword: '',
        meta_descrip: '',

        selling_price: '',
        original_price: '',
        qty: '',
        brand: '',
        featured: '',
        populor: '',
        status: '',
    });
    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);
    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput,[e.target.name]:e.target.value});
    }

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0]});
    }

    useEffect(() => {

        axios.get(`/api/all-category`).then(res =>{
            if(res.data.status === 200)
            {
                setCategorylist(res.data.category);
            }
            setLoading(false);
        });

    }, []);

    const submitProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',picture.image);
        formData.append('category_id',productInput.category_id);
        formData.append('slug',productInput.slug);
        formData.append('name',productInput.name);
        formData.append('description',productInput.description);

        formData.append('meta_title',productInput.meta_title);
        formData.append('meta_keyword',productInput.meta_keyword);
        formData.append('meta_descrip',productInput.meta_descrip);

        formData.append('selling_price',productInput.selling_price);
        formData.append('original_price',productInput.original_price);
        formData.append('qty',productInput.qty);
        formData.append('brand',productInput.brand);
        formData.append('featured',productInput.featured);
        formData.append('populor',productInput.populor);
        formData.append('status',productInput.status);

        axios.post(`/api/store-product`, formData).then(res => {
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setProduct({...productInput,
                    category_id: '',
                    slug: '',
                    name: '',
                    description: '',

                    meta_title: '',
                    meta_keyword: '',
                    meta_descrip: '',

                    selling_price: '',
                    original_price: '',
                    qty: '',
                    brand: '',
                    featured: '',
                    populor: '',
                    status: '',
                });
                setError([]);
            }
            else if(res.data.status === 422)
            {
                swal("All Fields are mandetory","","error");
                setError(res.data.errors);
            }
        });
    }
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
                    <h4 className="text-center">Loading Add Products </h4>
                    </div>
                </div>
            </div>
        );   
    }
    return(
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Product 
                        <Link to="/admin/view-product" className="btn btn-dark btn-sm float-end">View Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitProduct} encType="multipart/form-data">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">Seo Tags</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="other-details-tab" data-bs-toggle="tab" data-bs-target="#other-details" type="button" role="tab" aria-controls="other-details" aria-selected="false">Other Details</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="form-group mb-3">
                                <label>Select Category</label>
                                <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                                    <option>Select Category</option>
                                    {
                                        categorylist.map( (item) => {
                                            return(
                                                <option value={item.id} key={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <small className="text-danger">{errorlist.category_id}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Slug</label>
                                <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control"/>
                                <small className="text-danger">{errorlist.slug}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control"/>
                                <small className="text-danger">{errorlist.name}</small>  
                            </div>
                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea type="text" name="description" onChange={handleInput} value={productInput.description} className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                            <div className="form-group mb-3">
                                <label>Meta Title</label>
                                <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className="form-control"/>
                                <small className="text-danger">{errorlist.meta_title}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label>Meta Keywords</label>
                                <textarea type="text" name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className="form-control"></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label>Meta Description</label>
                                <textarea type="text" name="meta_descrip" onChange={handleInput} value={productInput.meta_descrip} className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="tab-pane card-body border fade" id="other-details" role="tabpanel" aria-labelledby="seo-tags-tab">
                            <div className="row">
                                <div className="col-md-4 form-group mb-3">
                                    <label>Selling Price</label>
                                    <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
                                    <small className="text-danger">{errorlist.selling_price}</small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Original Price</label> 
                                    <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control" />
                                    <small className="text-danger">{errorlist.original_price}</small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Quantity</label>
                                    <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className="form-control" />
                                    <small className="text-danger">{errorlist.qty}</small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Brand</label>
                                    <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control" />
                                    <small className="text-danger">{errorlist.brand}</small>
                                </div>
                                <div className="col-md-8 form-group mb-3">
                                    <label>Image</label>
                                    <input type="file" name="image" onChange={handleImage} className="form-control" />
                                    <small className="text-danger">{errorlist.image}</small>
                                </div>
                                <div className="col-md-4 form-group mb-3 mt-4">
                                    <div className="form-check">
                                        <label className="form-check-label">Featured</label>
                                        <input type="checkbox" onChange={handleInput} value={productInput.featured} className="form-check-input" name="featured" />
                                    </div>                              
                                </div>
                                <div className="col-md-4 form-group mb-3 mt-4">
                                    <div className="form-check">
                                        <label className="form-check-label">Populor</label>
                                        <input type="checkbox" onChange={handleInput} value={productInput.populor} className="form-check-input" name="populor" />
                                    </div>                              
                                </div>
                                <div className="col-md-4 form-group mb-3 mt-4">
                                    <div className="form-check">
                                        <label className="form-check-label">Status</label>
                                        <input type="checkbox" onChange={handleInput} value={productInput.status} className="form-check-input" name="status" />
                                    </div>                              
                                </div>
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
export default AddProduct;