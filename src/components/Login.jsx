import { useState, useEffect } from "react"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"

import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../utils/constants";
const Login = () => {

    const [email, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoggingForm, setLoggingForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    useEffect(() => {
        if (user) {
            navigate("/feed");
        }
    }, [user, navigate]);

    const handleLogin = async () => {

        try {
            const response = await axios.post(API_ENDPOINTS.BASE_URL + API_ENDPOINTS.LOGIN, {
                email,
                password
            }, {
                withCredentials: true
            })
            // dispatch the user data
            dispatch(addUser(response.data));
            return navigate('/feed')

        } catch (err) {
            setError(err?.response?.data || "Something went wrong")

        }

    };
    const handleSignUp = async () => {
        try {
            const res = await axios.post(API_ENDPOINTS.BASE_URL + API_ENDPOINTS.SIGNUP, {
                firstName,
                lastName,
                email,
                password
            }, {
                withCredentials: true
            })
            // dispatch the user data
            dispatch(addUser(res.data.data));
            return navigate("/profile")

        } catch (err) {
            setError(err?.res?.data || "Something went wrong")
        }
    }
    return (
        <div className="flex justify-center my-10">
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoggingForm ? "Login" : "Register"}</h2>
                    <div>
                        {!isLoggingForm && <><fieldset className="fieldset m-2">
                            <legend className="fieldset-legend">First Name</legend>
                            <input
                                type="text"
                                className="input"
                                placeholder="Please enter email ID"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>
                            <fieldset className="fieldset m-2">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Please enter email ID"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                        </>}
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
                                type="password"
                                className="input"
                                placeholder="Please enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <p className="text-center text-red-500"> {error}</p>
                    <p className="text-center text-gray-200 cursor-pointer" onClick={() => setLoggingForm((value) => !value)}>{isLoggingForm ? "Don't have an account? Signup here" : "Existing user? Login here"}</p>

                    <div className="card-actions justify-center p-2">
                        <button className="btn btn-primary" onClick={isLoggingForm ? handleLogin : handleSignUp}>{isLoggingForm ? "Login" : "Register"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;