import React, {useState} from "react";
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

const Register = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
        conformPassword: "",
        dateOfBirth: "",
        firstName: "",
        lastName: "",
        contact: "",
        file: ""
    });
    const [errors, setErrors] = useState({});
    let history = useHistory();
    const handleChange = async (e) => {
        const {name, value, files} = e.target;
        const file = files && files[0];
        if (name === "file") {
            // const base64 = await convertBase64(files && files[0]);
            // console.log(base64);
            setUserDetails({
                ...userDetails,
                [name]: file
            })
        } else {
            setUserDetails({
                ...userDetails,
                [name]: value
            })
        }
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    };
    const validation = (name, value) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        switch (name) {
            case 'firstName':
                if (!value) {
                    return 'First Name is Required';
                } else {
                    return '';
                }
            case 'lastName':
                if (!value) {
                    return 'Laast Name is Required';
                } else {
                    return '';
                }
            case 'dateOfBirth':
                if (!value) {
                    return 'Date of birth is Required';
                } else {
                    return '';
                }
            case 'email':
                if (!value) {
                    return 'Email is required';
                } else if (!re.test(value)) {
                    return 'Email is not valid';
                } else {
                    return '';
                }
            case 'contact':
                if (!value) {
                    return 'Please fill up this fild';
                } else {
                    return '';
                }
            case 'password':
                if (!value) {
                    return 'Password is required';
                } else {
                    return '';
                }
            case 'file':
                if (!value) {
                    return 'Profile pictur is required';
                } else {
                    return '';
                }
            case 'conformPassword':
                if (userDetails.password !== userDetails.conformPassword && userDetails.conformPassword !== "") {
                    return "password Miss match";
                } else if (!value) {
                    return 'Re-enter password';

                } else {
                    return '';
                }
            default: {
                return ''
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let validationErrors = {};
        Object.keys(userDetails).forEach(name => {
            const error = validation(name, userDetails[name]);

            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return true;
        }
        const form = new FormData();
        Object.keys(userDetails).forEach(key => {
            form.append(key, userDetails[key])
        });
        const config = {
            headers: {
                "Contetnt-Type": "multipart/form-data"
            }
        };
        await axios.post('http://localhost:3001/register', form, config)
            .then(res => {
                if (!res.data) {
                    return;
                } else {
                    if (res.status === 200) {
                        history.push("/login");
                    }
                }
            })
            .catch(error => {
                return (error.response);
            })
    };

    return (
        <div className="container">

            <div className="mt-2 d-flex justify-content-center">
                <h3>Register</h3>
            </div>
            <div className="form-group">
                <label>First Name</label>
                <input type="text"
                       className="form-control"
                       name="firstName"
                       value={userDetails.firstName || ""}
                       placeholder="First Name" onChange={handleChange}/>
                <p className="text-danger">{errors.firstName}</p>
            </div>

            <div className="form-group">
                <label>Last Name</label>
                <input type="text"
                       className="form-control"
                       name="lastName"
                       value={userDetails.lastName || ""}
                       placeholder="Last Name" onChange={handleChange}/>
                <p className="text-danger">{errors.lastName}</p>
            </div>

            <div className="form-group">
                <label>Date Of Birth</label>
                <input type="date"
                       className="form-control"
                       name="dateOfBirth"
                       value={userDetails.dateOfBirth || ""}
                       placeholder="Date Of Birth"
                       onChange={handleChange}/>
                <p className="text-danger">{errors.dateOfBirth}</p>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email"
                       className="form-control"
                       name="email" value={userDetails.email || ""}
                       placeholder="Enter email"
                       onChange={handleChange}/>
                <p className="text-danger">{errors.email}</p>
            </div>

            <div className="form-group">
                <label>Mobile Number</label>
                <input type="text"
                       className="form-control"
                       name="contact"
                       value={userDetails.contact || ""}
                       placeholder="Enter Mobile Number"
                       onChange={handleChange}/>
                <p className="text-danger">{errors.contact}</p>
            </div>

            <div className="form-group">
                <label>Upload Profile</label>
                <input
                    className="form-control"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleChange}
                />
                <p className="text-danger">{errors.file}</p>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password"
                       className="form-control"
                       name="password"
                       value={userDetails.password || ""}
                       placeholder="Enter password"
                       onChange={handleChange}/>
                <p className="text-danger">{errors.password}</p>
            </div>

            <div className="form-group">
                <label>Conform Password</label>
                <input type="password"
                       className="form-control"
                       name="conformPassword"
                       value={userDetails.conformPassword || ""}
                       placeholder="Confirm password"
                       onChange={handleChange}/>
                <p className="text-danger">{errors.conformPassword}</p>
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg btn-block">Register</button>
            <p className="forgot-password text-right">
                Already registered <Link to="/">log in?</Link>
            </p>
        </div>
    );
};

export default Register;