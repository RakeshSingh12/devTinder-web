import { useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux"

import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
const Login = () => {
    const [email, setEmailId] = useState("atharv@gmail.com");
    const [password, setPassword] = useState("Atharv@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {
            const response = await axios.post(BASE_URL + "/login", {
                email,
                password
            }, {
                withCredentials: true
            })
            // dispatch the user data
            dispatch(addUser(response.data));
            return navigate('/feeed')

        } catch (err) {
            console.error(err);

        }

    };
    return (
        <div className="flex justify-center my-10">
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset m-2">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input
                                type="text"
                                className="input"
                                placeholder="Please enter email ID"
                                value={email}
                                onChange={(e) => setEmailId(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset m-2">
                            <legend className="fieldset-legend">Password</legend>
                            <input
                                type="text"
                                className="input"
                                placeholder="Please enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center p-2">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;