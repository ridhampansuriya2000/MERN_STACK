import React, {useEffect, useState} from "react";
import profilePic from "../../assert/images/avatar.png";
import "../profile/Profile.scss";
import {useHistory} from "react-router-dom";
import {CameraOutlined} from "@ant-design/icons";
import {Spin, Space} from 'antd';
import axios from "axios";

const Profile = (props) => {
    const location = props.history.location.pathname.split('/');
    let id = location[location.length -1];
    id = id ? String(id).trim() : String(JSON.parse(localStorage.getItem('userId'))).trim();
    let history = useHistory();
    const [profileData, setProfile] = useState({});
    // const {name, email, contact} = user;
    useEffect(() => {
        const userToken = localStorage.getItem("token");
        if (userToken && id) {
            loadUser(userToken, id);
        }

    }, []);

    const config = (userToken) => ({
        headers: {
            "Authorization": userToken,
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const loadUser = async (userToken, id) => {
        const result = await axios.get(`http://localhost:3001/user/${id}`, config(userToken));
        setProfile(result.data);
    }

    const Edit = async () => {
        const userToken = localStorage.getItem("token")
        await axios.get(`http://localhost:3001/user/${id}`
            , {headers: {'Authorization': userToken}}
        )
            .then(res => {
                console.log("res data of edit(search) url--->", res.data);
                if (res.status === 200) {
                    history.push({
                        pathname: `/editUser/${res.data._id}`,
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
    const profilePicUpload = async (e) => {
        const userToken = localStorage.getItem("token")
        const {files} = e.target;
        const file = files && files[0];
        const fileName = file.name;
        const form = new FormData();
        form.append('file', file);
        form.append('profile_photo', fileName);
        await axios.post(`http://localhost:3001/profileUpdate/${id}`,
            form,
            {headers: {'Authorization': userToken}})
            .then(res => {
                setProfile(res.data)
                if (!res.data) {
                    return;
                }
            })
    }
    return (
        <div className="card-contain mt-5">
            <div className="card">
                <div className="card-img" variant="top">
                    <img
                        src={(profileData.profile_photo !== "undefined" && profileData.profile_photo) ? "http://localhost:3001/" + profileData.profile_photo : profilePic}
                        className="card-img-top" alt="Profile-picture"/>
                </div>
                <label htmlFor="upload-button" className="camera-icon">
                    <CameraOutlined/>
                </label>
                <input
                    type="file"
                    name="profile_photo"
                    accept="image/*"
                    id="upload-button"
                    style={{display: "none"}}
                    onChange={profilePicUpload}
                />
                <div className="card-body">
                    <div
                        className="card-title">{`${profileData && profileData.firstName || ""} ${profileData && profileData.lastName || ""} `}</div>

                    <div className="row row-contain">
                        <div className="col-sm-12 description">
                            <div className="key">Email:</div>
                            <div>{profileData && profileData.email || "-"}</div>
                        </div>
                    </div>
                    <div className="row row-contain">
                        <div className="col-sm-12 description">
                            <div className="key">Gender:</div>
                            <div>{profileData && profileData.gender || "-"}</div>
                        </div>
                    </div>
                    <div className="row row-contain">
                        <div className="col-sm-12 description">
                            <div className="key">IP Address:</div>
                            <div>{profileData && (profileData.ip_address) || "-"}</div>
                        </div>
                    </div>
                    <div className="row row-contain">
                        <div className="col-sm-12 description">
                            <div className="key">Contact No.:</div>
                            <div>{profileData && profileData.contact || "-"}</div>
                        </div>
                    </div>
                    <div className="row row-contain">
                        <div className="col-sm-12 description">
                            <div className="key">Date Of Birth:</div>
                            <div>{profileData && (profileData.dateOfBirth) || "-"}</div>
                        </div>
                    </div>
                    <div className="row row-contain">
                        <div className="col-sm-12 description">
                            <div className="m-auto">
                                <button onClick={Edit}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Profile;

