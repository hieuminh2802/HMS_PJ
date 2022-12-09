import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function ViewDetailOrder(props)
{
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [vieworder, setViewOrder] = useState();
    const [orderitem, setOrderItem] = useState();

    useEffect(() => {

        const order_id = props.match.params.id;
        const order_detail_id = props.match.params.id;
        axios.get(`/api/view-detail-order-item/${order_id}/${order_detail_id}`).then(res =>{
            if(res.data.status === 200)
            {
                console.log(res.data.orderitem);
                setOrderItem(res.data.orderitem);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/view-order');
            }
            setLoading(false);
        });
    }, [props.match.params.order_id,props.match.params.order_detail_id,history]);
   
    var display_viewdetailorders = "";
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
                    <h4 className="text-center">Loading Orders  </h4>
                    </div>
                </div>
            </div>
        );   
    }
    else
    {
        display_viewdetailorders =
            <div className='row'>
                <div className='col-md-6'>
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            <h4>Basic Information</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 mt-3">
                                    <h3>
                                        <label>Tracking Number : </label>
                                        <label> {vieworder.tracking_no}</label>
                                    </h3>
                                </div>
                                <hr></hr>
                                <div className="col-md-12 mt-3">
                                    <h4>
                                        <label>Name : </label>
                                        <label> {vieworder.firstname} {vieworder.lastname}</label>
                                    </h4>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <h4>
                                        <label>Phone : </label>
                                        <label> {vieworder.phone}</label>
                                    </h4>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <h4>
                                        <label>Email : </label>
                                        <label> {vieworder.email}</label>
                                    </h4>
                                </div>
                                <div className="col-md-12 mt-3 mb-3">
                                    <h4>
                                        <label>Full Address : </label>
                                        <label> {vieworder.address}</label>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            <h4>Order Information</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="text-center">
                                    <tr>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {/* {cart.map((item, idx) => {
                                    {
                                    return(
                                        <tr>
                                            <td width="10%">
                                                <img src={`http://localhost:8000/${item.product.image}`} alt={item.product.name} width="50px" height="60px" />
                                            </td>
                                            <td><h4>{item.product.name}</h4></td>
                                            <td width="15%" className="price"><h5>{numberFormatter.format(item.product.selling_price)}</h5></td>
                                            <td width="15%">
                                                <div className="input-group inputcart" >
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
                                    } */}
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    }

    return (
            <div className="container px-4 mt-3">
                <div className="card">
                    <div className="card-header bg-dark text-white">
                        <h4>Orders Detail</h4>
                    </div>
                    <div className="py-4">
                        <div className="container">
                            {display_viewdetailorders}
                        </div>
                    </div>
                </div>
            </div>
    )

}

export default ViewDetailOrder;