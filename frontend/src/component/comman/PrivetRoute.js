import React from "react";
import { BrowserRouter, Route, Switch,} from "react-router-dom";
import { Redirect } from "react-router-dom";

const PrivetRoute = ({ component: Component }) =>{
    return(
        <div>
            <Route
                render={(props) =>
                    (localStorage.getItem("userId") && localStorage.getItem("token")) ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/login" />
                    )
                }
            />
        </div>
    )
}
export default PrivetRoute;