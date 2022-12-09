import  React,{useState, useEffect} from "react";
import axios from "axios";
import {Route, Redirect} from "react-router-dom";
import MasterLayout from "./Layouts/Admin/MasterLayout";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function AdminPrivateRoute({...rest})
{
    const history = useHistory();
    const [Authenticated, setAuthticated] = useState(false);
    const [loading, setloading] = useState(true);

    
    useEffect(()=>{
        axios.get(`/api/checkingauthenticated`).then(res => {
            if(res.status === 200)
            {
                setAuthticated(true);
            }
            setloading(false);
        });
        return() => {
            setAuthticated(false);
        };
    }, []); 

    axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
        if(err.response.status ===  401)
        {
            swal("Unauthorized", err.response.data.message,"warning");
            history.push('/');
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response){
        return response;
        },function (error){
            if(error.response.status === 403)
            {
                swal("Forbedden",error.response.data.message,"warning");
                history.push('/403');
            }
            else if(error.response.status === 404)
            {
                swal("404 Error","URL/Page Not Found","warning");
                history.push('/404');
            }
            return Promise.reject(error);
        }
    );

    if(loading)
    {
        return (
            <div>
                <h4 className="vh-100 d-flex justify-content-center align-items-center">Loading 
                    <div className="spinner-grow text-dark" role="status"></div>
                    <div className="spinner-grow text-dark" role="status"></div>
                    <div className="spinner-grow text-dark" role="status"></div>
                </h4>
            </div>
        );   
    }
    return(
        <Route {...rest}
        render={ ({props, location}) => 
            localStorage.getItem('auth_token') ? 
            ( <MasterLayout {...props} />) :
            ( <Redirect to={{ pathname: "/login", state: {from: location} }} />)
        
        }
        />
    );
}

export default AdminPrivateRoute;