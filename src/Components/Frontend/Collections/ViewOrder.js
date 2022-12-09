import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewOrder()
{
    const [loading,setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`/api/view-order`).then(res =>{
            if(res.status === 200)
            {
                setOrders(res.data.order)
            }
            setLoading(false);
        });
    }, []);

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
    var display_orders = "";
    if(orders.length > 0)
    {
    display_orders =
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="text-center">
                                <tr>
                                    <th>ID</th>
                                    <th>Tracking No.</th>
                                    <th>Phone No.</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                            {orders.map( (item) => {                               
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.tracking_no}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <Link to={`view-detail-order/${item.id}`} className="btn btn-dark btn-sm">View</Link>
                                        </td>
                                    </tr>
                                    )
                                })}
                                </tbody>
                        </table>
                    </div>
                </div>
    }
    else
    {
        display_orders = <div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your Order Empty</h4>
            </div>
        </div>
    }
    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header  bg-dark text-white">
                    <h4>Orders  </h4>
                </div>
                {display_orders}
            </div>    
        </div>
    )

}

export default ViewOrder;