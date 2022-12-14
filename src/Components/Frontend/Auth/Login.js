import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
function Login() {
  const history = useHistory();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const { setAuthenticated } = useAppContext();

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          setAuthenticated();
          swal("Success", res.data.message, "success");
          if (res.data.role === "admin") {
            history.push("/admin/dashboard");
          } else {
            history.push("/");
          }
        } else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow rouded-lg">
              <div className="card-header bg-white text-center">
                <h4 className="fw-bold ">Login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={loginSubmit}>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      value={loginInput.email}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {loginInput.error_list.email}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleInput}
                      value={loginInput.password}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {loginInput.error_list.password}
                    </span>
                  </div>
                  <div className="form-group mb-3 d-flex justify-content-center">
                    <button className="btn btn-dark btn-lg" type="submit">
                      Login
                    </button>
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

export default Login;
