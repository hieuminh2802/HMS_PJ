import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";
import { FaHeart, FaShoppingCart} from "react-icons/fa";
import "../../../Assets/frontend/css/detail.css";
import { useAppContext } from "../../../Context/AppContext";

function ProductDetail(props)
{
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [products, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(()=>{

        let isMounted = true;
        const category_slug = props.match.params.category;
        const product_slug = props.match.params.product;
        axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(res => {
           if(isMounted)
            {
                if(res.data.status === 200)
                {
                    console.log(res.data.product);
                    setProduct(res.data.product);
                    setLoading(false);
                }
                else if(res.data.status === 404)
                {
                    history.push('/collections');
                    swal("Warning",res.data.message,"error");
                }
            } 
        });
        return() => {
            isMounted = false
        };
    }, [props.match.params.category,props.match.params.product,history]);

    const handleDecrement = () => {
        if(quantity > 1){
            setQuantity(prevCount => prevCount - 1);
        }
    }
    const handleIncrement = () => {
        if(quantity < 10){
            setQuantity(prevCount => prevCount + 1);
        }
    }
    const {setCartCount} = useAppContext()


    const submitAddtocart = (e) => {
        e.preventDefault();

        const data = {
            product_id : products.id,
            product_qty: quantity,
        }

        axios.post(`/api/add-to-cart`,data).then(res => {
            if(res.data.status === 201)
            {
                swal("Success",res.data.message,"success");
                  axios.get(`/api/getcountcard`).then(res => {
                         setCartCount(res.data.countcart)
                  })
            }
            else if(res.data.status === 409)
            {
                swal("Warning",res.data.message,"warning");
            }
            else if(res.data.status === 401)
            {
                swal("Error",res.data.message,"error");
            }
            else if(res.data.status === 404)
            {
                swal("Warning",res.data.message,"warning");
            }
        });
    }

    const numberFormatter = new Intl.NumberFormat('en-US', {
        style : 'currency',
        currency : 'USD'
    });

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
                    <h4 className="text-center">Loading Product Detail</h4>
                    </div>
                </div>
            </div>
        );   
    }
    else
    {
        var avail_stock = '';
        if(products.qty > 0 )
        { 
            avail_stock = <div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <h5 className="fw-bold text-black me-3 mt-4 float-start">Quantity : {products.qty}</h5>
                        <label className="cart me-3 mt-3 float-start">In Stock</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mt-4">
                        <div className="input-group input">
                            <button type="button" onClick={handleDecrement} className="input-group-text qtychange">-</button>
                            <div className="form-control text-center">{quantity}</div>
                            <button type="button" onClick={handleIncrement} className="input-group-text qtychange">+</button>
                        </div>
                    </div>
                    <div className="col-md-9 mt-1">
                        <button type="button" onClick={submitAddtocart}  className="cart mt-3 me-3 float-start">Add to Cart <FaShoppingCart/></button>
                        <button type="button" className="wishlist mt-3 me-3 float-start"><FaHeart/></button>
                    </div>
                    
                </div>
            </div>
        }
        else
        {
            avail_stock = <div>
                <div className="col-md-12 me-3 mt-3 float-start">
                    <label className="wishlist me-3">Out of Stock</label>
                    <button type="button" className="wishlist"><FaHeart/></button>
                </div>
            </div>
        }  
    }

    return(
        <div>
            <div className="py-3 bg-dark text-white">
                <div className="container mt-2">
                    <h6><Link to={"/Collections"} style={{ textDecoration: 'none' }} className="text-white" >Collections</Link> / {products.category.name} / {products.name} </h6>
                </div>
            </div>
            <div className="app">
                <div className="details">
                    <div className="big-img">
                        <img src={`http://localhost:8000/${products.image}`} alt={products.name} />
                    </div>
                    <div className="box">
                        <div className="row">
                            <h3>{products.name}</h3>
                            <hr/>
                            <h5>{numberFormatter.format(products.selling_price)}</h5>
                        </div>
                        <h4>Color&Capacity : {products.description}</h4>
                        <p>{products.meta_keyword} {products.meta_descrip}</p>
                        <div>
                            {avail_stock}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail;