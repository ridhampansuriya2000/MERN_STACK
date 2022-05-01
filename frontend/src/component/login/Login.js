import React, {useState} from "react";
import axios from 'axios';
import {useHistory, useParams} from "react-router";
import {Link} from "react-router-dom";
import {Spin, Space} from 'antd';

const Login = () => {
    const {id} = useParams();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",

    });
    const [errors, setErrors] = useState({});
    let history = useHistory();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginDetails({
            ...loginDetails,
            [name]: value
        })
    };

    const validation = (name, value) => {
        switch (name) {
            case 'email':
                if (!value) {
                    return 'Please Enter email';
                } else {
                    return '';
                }
            case 'password':
                if (!value) {
                    return 'Please fill up password';
                } else {
                    return '';
                }
            default: {
                return ''
            }
        }
    };

    const onSubmit = async () => {
        // event.preventDefault();
        // const email = this.refs.email.value;
        // const password = this.refs.password.value;
        let logvalidationErrors = {};
        Object.keys(loginDetails).forEach(name => {
            const error = validation(name, loginDetails[name]);

            if (error && error.length > 0) {
                logvalidationErrors[name] = error;
            }
        });
        if (Object.keys(logvalidationErrors).length > 0) {
            setErrors(logvalidationErrors);
            return true;
        }
        const config = {
            headers: {
                "Contetnt-Type": "application/json"
            }
        };
        await axios.post('http://localhost:3001/login', {...loginDetails}, config)
            .then(res => {
                console.log("---> login res.data", res);
                if (res.status === 200) {
                    localStorage.setItem("userId", JSON.stringify(res && res.data && res.data.userData._id));
                    localStorage.setItem("token", res.data.token);
                    history.push({
                        pathname: `/profile/${res.data.userData._id}`,
                        // state: { detail: res.data.userData }
                        state: {detail: res.data}
                    });
                } else {
                    console.log("ree--->")
                }
            })
            .catch(error => {
                return (error.response);
            })
    }
    return (
        <div className="container">
            <div>
                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email"
                           className="form-control"
                           name="email"
                           placeholder="Enter email"
                           onChange={handleChange}/>
                    <p className="text-danger">{errors.email}</p>

                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password"
                           className="form-control"
                           name="password"
                           placeholder="Enter password"
                           onChange={handleChange}/>
                    <p className="text-danger">{errors.password}</p>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" onClick={onSubmit} className="btn btn-dark btn-lg btn-block">Sign in</button>
            </div>

        </div>
    );
};

export default Login;
