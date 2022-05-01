import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import "./Home.scss"


const Home = () => {
    const {id} = useParams();
    const [users, setUser] = useState([]);
    const [searchData, setSearchData] = useState({
        fullName: ""
    })

    useEffect(() => {
        loadUsers();
    }, [])
    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3001/listUser");
        console.log(result);
        setUser(result.data.reverse());
    }
    const deleteUser = async id => {
        console.log(id);
        await axios.delete(`http://localhost:3001/deleteUser/${id}`);
        loadUsers();
    }
    const onchange = async (e) => {
        // debugger
        console.log("up serchdata", searchData)
        const {name, value} = e.target;
        console.log("serchdata", value)
        const result = await axios.post("http://localhost:3001/findUser", {search: value});
        console.log("result", result)
        setUser(result.data.reverse());
    };

    return (
        <div className="container">
            <div className="mt-3 w-100 d-flex justify-content-end">
                <input type="string"
                       className="w-50"
                       name="fullName"
                       placeholder="search"
                       onChange={onchange}
                />
            </div>
            <div className="py-4">
                <table className="table border shadow">
                    <thead className="thead-light primary-color">
                    <tr>
                        <th scope="col">Sr no</th>
                        <th scope="col">Name</th>
                        {/*<th scope="col">User Name</th>*/}
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">IP Address</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users && users.map((user, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{user.firstName} {user.lastName}</td>
                                {/*<td>{user.username}</td>*/}
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.ip_address}</td>
                                <td>
                                    <Link className="btn btn-primary mr-2" to={`/profile/${user._id}`}>View</Link>
                                    <Link className="btn btn-outline-primary m-2"
                                          to={`/editUser/${user._id}`}>Edit</Link>
                                    <Link className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</Link>

                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;