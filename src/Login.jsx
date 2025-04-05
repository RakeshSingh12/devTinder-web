import { useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux"

import { addUser } from "./utils/userSlice";
const Login = () => {
    const [email, setEmailId] = useState("atharv@gmail.com");
    const [password, setPassword] = useState("Atharv@123");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:7777/login", {
                email,
                password
            }, {
                withCredentials: true
            })
            dispatch(addUser(response.data));

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