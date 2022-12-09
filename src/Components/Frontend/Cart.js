import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";
import {GoTrashcan} from "react-icons/go";
import "../../Assets/frontend/css/cart.css";
import { useAppContext } from "../../Context/AppContext";
import { useCallback } from "react";

function Cart()
{
    
    const numberFormatter = new Intl.NumberFormat('en-US', {
        style : 'currency',
        currency : 'USD'
    });
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [cart,setCart] = useState([]);

    var totalCartPrice = 0;

    if(!localStorage.getItem('auth_token')){
        history.push('/');
        swal("Warning","Login to go to Cart Page","error");
    }

    const getCart = useCallback(()=>{
          axios.get(`/api/cart`).then(res => {
       
                if(res.data.status === 200)
                {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if(res.data.status === 401)
                {
                    history.push('/');
                    swal("Warning",res.data.message,"error")
                }
        });
    },[history])
    
    useEffect(() => {
        getCart()
    },[getCart]);

    const checkValidQuantity = useCallback((cart_id)=>{
        const currentCart = cart.find(item=>item.id===cart_id)
        if(!currentCart || parseInt(currentCart.product_qty)===1){
          
            return false
        }
        return true
    },[cart])


    const handleDecrement = (cart_id) => {
        if(!checkValidQuantity(cart_id)){
             return
        }

         updateCartQuantity(cart_id,"dec");
      
    }
    const handleIncrement = (cart_id) => {
       
         const currentCart = cart.find(item=>item.id===cart_id)
          if(!currentCart || parseInt(currentCart.product.qty)===parseInt(currentCart.product_qty)){
            return false
        }
              updateCartQuantity(cart_id,"inc"); 
    }

    function updateCartQuantity(cart_id,scope)
    {
        axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then(res => {
            if(res.data.status === 200)
            {
                getCart()
            }
        });
    }
const {setCartCount,cartCount} = useAppContext()
    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing";

        axios.delete(`/api/delete-cartitem/${cart_id}`).then(res => {
            if(res.data.status === 200)
            {

                     axios.get(`/api/getcountcard`).then(res => {
                         setCartCount(res.data.countcart)
                  })
                swal("Success",res.data.message,"success");
                thisClicked.closest("tr").remove();

            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Remove";
            }
        })
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
                    <h4 className="text-center">Loading Cart</h4>
                    </div>
                </div>
            </div>
        );   
    }
    // var avail_stock = '';
    //     {cart.map((item, idx) => {
    //     if(item.product_qty > 8)
    //     {
    //         avail_stock =  <div>
    //         <div className="col-md-12 mt-1">
    //                 <label className="btn-area">Out of Stock</label>
    //             </div>
    //         </div>
    //     }
    //     else
    //     {

    //     avail_stock =   
    //             <div className="input-group inputcart" key={idx}>
    //                 <button type="button" onClick={() => handleDecrement(item.id)} className="input-group-text qtychange">-</button>
    //                 <div className="form-control text-center">{item.product_qty}</div>
    //                 <button type="button" onClick={() => handleIncrement(item.id)} className="input-group-text qtychange">+</button>
    //             </div>
    //     }});
    // }
    var cart_HTML = '';
    if(cartCount)
    {
        cart_HTML =
        <div>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="text-center">
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {cart.map((item, idx) => {
                        totalCartPrice += item.product.selling_price * item.product_qty;
                        return(
                            <tr key={idx}>
                                <td width="10%">
                                    <img src={`http://localhost:8000/${item.product.image}`} alt={item.product.name} width="50px" height="60px" />
                                </td>
                                <td><h4>{item.product.name}</h4></td>
                                <td width="15%" className="price"><h5>{numberFormatter.format(item.product.selling_price)}</h5></td>
                                <td width="15%">
                                <div className="input-group inputcart">
                                    <button type="button" onClick={() => handleDecrement(item.id)} className="input-group-text qtychange">-</button>
                                    <div className="form-control text-center">{item.product_qty}</div>
                                    <button type="button" onClick={() => handleIncrement(item.id)} className="input-group-text qtychange">+</button>
                                </div>
                                </td>
                                <td width="15%" className="price"><h5>{numberFormatter.format(item.product.selling_price * item.product_qty)}</h5></td>
                                <td width="10%" className="btn-delete">
                                    <button type="button" onClick={ (e) => deleteCartItem(e, item.id )} className="btn-area"><GoTrashcan /> Remove</button>
                                </td>
                            </tr>
                            )
                        })}
                        </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-4">
                    <div className="card card-body mt-3">
                        <h4>Grand Total:
                            <span className="float-end">{numberFormatter.format(totalCartPrice)}</span>
                        </h4>
                        <hr />
                        <Link to="/checkout" className="btn-checkout text-center">Checkout</Link>
                    </div>
                </div>
            </div>
        </div>     
    }
    else
    {
        cart_HTML = <div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your Shopping Cart is Empty</h4>
            </div>
        </div>
    }

    return (
        <div>
            <div className="py-3 bg-dark text-white">
                <div className="container mt-2">
                    <h6>Home / Cart</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container"> 
                    <div className="row">
                        <div className="col-md-12">
                            {cart_HTML}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart;