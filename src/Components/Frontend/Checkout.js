import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Modal } from 'bootstrap';

function Checkout()
{
    const numberFormatter = new Intl.NumberFormat('en-US', {
        style : 'currency',
        currency : 'USD'
    });

    const history = useHistory();
    if(!localStorage.getItem('auth_token')){
        history.push('/');
        swal("Warning","Login to goto Cart Page","error");
    }
    
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    var totalCartPrice = 0;


    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });
    const [error, setError] = useState([]);

    useEffect(() => {

        let isMounted = true;

        axios.get(`/api/cart`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if(res.data.status === 401)
                {
                    history.push('/');
                    swal("Warning",res.data.message,"error");
                }
            }
        }); 
 
        return () => {
            isMounted = false
        };
    }, [history]);
    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value });
    }

    var orderinfo_data = {
        firstname: checkoutInput.firstname,
        lastname: checkoutInput.lastname,
        phone: checkoutInput.phone,
        email: checkoutInput.email,
        address: checkoutInput.address,
        payment_mode: 'Paid by PayPal',
        payment_id: '',
    }

    
    // Paypal Code
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
    const createOrder = (data, actions) =>{
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: totalCartPrice,
              },
            },
          ],
        });
    };
    const onApprove = (data, actions) => {
        // return actions.order.capture();
        return actions.order.capture().then(function(details) {
            console.log(details);
            orderinfo_data.payment_id = details.id;

            axios.post(`/api/place-order`, orderinfo_data).then(res=>{
                if(res.data.status === 200)
                {
                    swal("Order Placed Successfully",res.data.message,"success");
                    setError([]);
                    history.push('/thankyou');
                }
                else if(res.data.status === 422)
                {
                    swal("All fields are mandetory","","error");
                    setError(res.data.errors);
                }
            });
        });
    };
    // End-Paypal Code

    const submitOrder = (e, payment_mode) => {
        e.preventDefault();

        var data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            payment_mode: payment_mode,
            payment_id: '',
        }

        switch (payment_mode) {
            case 'cod':
                axios.post(`/api/place-order`, data).then(res=>{
                    if(res.data.status === 200)
                    {
                        swal("Order Placed Successfully",res.data.message,"success");
                        setError([]);
                         history.push('/thankyou');
                
                    }
                    else if(res.data.status === 422)
                    {
                        swal("All fields are mandetory","","error");
                        setError(res.data.errors);
                    }
                });
                break;

            case 'payonline':
                axios.post(`/api/validate-order`, data).then(res=>{
                    if(res.data.status === 200)
                    {
                        setError([]);
                          var myModal = new Modal(document.getElementById('payOnlineModal'));
                        myModal.show();
                    }
                    else if(res.data.status === 422)
                    {
                        swal("All fields are mandetory","","error");
                        setError(res.data.errors);
                    }
                });
                break;
        
            default:
                break;
        }
       
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
                    <h4 className="text-center">Loading Checkout</h4>
                    </div>
                </div>
            </div>
        );   
    }

    var checkout_HTML = '';
    if(cart.length > 0)
    {
        checkout_HTML = <div>
            <div className="row">

            <div className="col-md-6">
                <div className="card">
                    <div className="card-header bg-dark text-white">
                        <h4>Basic Information</h4>
                    </div>
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> First Name</label>
                                    <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                    <small className="text-danger">{error.firstname}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> Last Name</label>
                                    <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                                    <small className="text-danger">{error.lastname}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> Phone Number</label>
                                    <input type="number" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                    <small className="text-danger">{error.phone}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> Email Address</label>
                                    <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                    <small className="text-danger">{error.email}</small>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mb-3">
                                    <label> Full Address</label>
                                    <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                                    <small className="text-danger">{error.address}</small>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group text-end">
                                    <button type="button" className="btn-placeorder mx-1 mt-2" onClick={ (e) => submitOrder(e, 'cod') }>Place Order</button>
                                    <button type="button" className="btn-paypal mx-1 mt-2" onClick={ (e) => submitOrder(e, 'payonline') }>Pay Online</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th width="50%">Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map( (item, idx) => {
                            totalCartPrice += item.product.selling_price * item.product_qty;
                            return (
                                <tr key={idx}>
                                    <td>{item.product.name}</td>
                                    <td>{numberFormatter.format(item.product.selling_price)}</td>
                                    <td>{item.product_qty}</td>
                                    <td>{numberFormatter.format(item.product.selling_price * item.product_qty)}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan="2" className="text-end fw-bold">Grand Total :</td>
                            <td colSpan="2" className="text-end fw-bold">{numberFormatter.format(totalCartPrice)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            </div>
        </div>
    }
    else
    {
        checkout_HTML = <div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your Shopping Cart is Empty. You are in Checkout Page.</h4>
            </div>
        </div>
    }

    return (
        <div>
            <div className="modal fade" id="payOnlineModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Online Payment Mode</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <hr />
                        <PayPalButton
                            createOrder = {(data, actions) => createOrder(data, actions)}
                            onApprove = {(data, actions) => onApprove(data, actions)}
                        />
                    </div>
                    </div>
                </div>
            </div>
            <div className="py-3 bg-dark text-white">
                <div className="container mt-2">
                    <h6>Home / Checkout</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                   {checkout_HTML}
                </div>
            </div>

        </div>
    )
}



export default Checkout;
