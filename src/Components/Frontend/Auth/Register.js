import axios from "axios";
import React, { useState } from "react";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

function Register(){

    const history = useHistory();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]:e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => {
                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.name);
                    swal("Success",res.data.message,"success");
                    history.push('/');
                }
                else
                {
                    setRegister({...registerInput, error_list: res.data.validation_errors});
                }
            });
        });
    }

    return (
        <div>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card shadow rouded-lg">
                                <div className="card-header bg-white text-center">
                                    <h4 className="fw-bold ">Register</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={registerSubmit}>
                                        <div className="form-group mb-3">
                                            <label>Full Name</label>
                                            <input type="" name="name" onChange={handleInput} value={registerInput.name} className="form-control" />
                                            <span className="text-danger">{registerInput.error_list.name}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Email</label>
                                            <input type="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control" />
                                            <span className="text-danger">{registerInput.error_list.email}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Password</label>
                                            <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control" />
                                            <span className="text-danger">{registerInput.error_list.password}</span>
                                        </div>
                                        <div className="form-group mb-3 d-flex justify-content-center">
                                            <button className="btn btn-dark btn-lg" type="submit">Register</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
            

    );
}

export default Register;