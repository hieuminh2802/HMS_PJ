import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import swal from "sweetalert";
function EditCategory(props)
{
    const history = useHistory();
    const [categoryInput, setCategory] = useState({
        slug:'',
        name:'',
        description:'',
        status:'',
        meta_title:'',
        meta_keyword:'',    
        meta_descrip:'',
    });
    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allcheckbox, setCheckboxes] = useState([]);
    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput,[e.target.name]:e.target.value});
    }

    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({...allcheckbox,[e.target.name]:e.target.checked});
    }

    useEffect(() => {

        const category_id = props.match.params.id;
        axios.get(`/api/edit-category/${category_id}`).then(res =>{
            if(res.data.status === 200)
            {
                setCategory(res.data.category);
                setCheckboxes(res.data.category);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/admin/view-category');
            }
            setLoading(false);
        });
    }, []);

    const updateCategory = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const category_id = props.match.params.id;
        formData.append('slug',categoryInput.slug);
        formData.append('name',categoryInput.name);
        formData.append('description',categoryInput.description);
        formData.append('meta_title',categoryInput.meta_title);
        formData.append('meta_keyword',categoryInput.meta_keyword);
        formData.append('meta_descrip',categoryInput.meta_descrip);
        formData.append('status',allcheckbox.status ? '1':'0');

        axios.post(`/api/update-category/${category_id}`, formData).then(res => {
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                console.log(allcheckbox);
                setError([]);
                history.push('/admin/view-category');
            }
            else if(res.data.status === 422)
            {
                swal("All Fields are mandetory","","error");
                setError(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/admin/view-category');
            }
        });

        // axios.post(`/api/update-category/${category_id}`, formData).then(res => {
        //     if(res.data.status === 200)
        //     {
        //         swal("Success",res.data.message,"success");
        //         console.log(allcheckbox);
        //         setError([]);
        //         history.push('/admin/view-category');
        //     }
        //     else if(res.data.status === 422)
        //     {
        //         swal("All Fields are mandetory","","error");
        //         setError(res.data.errors);
        //     }
        //     else if(res.data.status === 404)
        //     {
        //         swal("Error",res.data.message,"error");
        //         history.push('/admin/view-category');
        //     }
        // });
    }
    if(loading)
    {
        return (
            <div>
                <h4 className="vh-100 d-flex justify-content-center align-items-center">Loading Edit Category  
                    <div className="spinner-grow text-dark" role="status"></div>
                    <div className="spinner-grow text-dark" role="status"></div>
                    <div className="spinner-grow text-dark" role="status"></div>
                </h4>
            </div>
        );   
    }

    return(
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4 className="mt-4">Edit Category
                        <Link to="/admin/view-category" className="btn btn-dark btn-sm float-end">BACK</Link>
                    </h4>   
                <div className="card-body">
                    <form onSubmit={updateCategory} encType="multipart/form-data">
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
                                    <div className="form-group mb-3">
                                        <div className="form-check">
                                            <label className="form-check-label">Status</label>
                                            <input type="checkbox" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true:false} className="form-check-input" name="status" />
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

                            <button type="submit" className="btn btn-dark px-4 float-end">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditCategory;