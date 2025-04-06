
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react"
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Boday = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);


    const fetchUser = async () => {
         // check if userData is already loaded
        if (userData) return;
        try {
            const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true })
            // send data to store
            dispatch(addUser(res.data))

        }
        catch (error) {
            // navigate to login page if user is not authenticated
            if (error.status === 401) {
                navigate("/login")
            }
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();

    }, [])


    return <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
}

export default Boday;