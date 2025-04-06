import axios from "axios";
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {

    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed)
    console.log("askjhasfkjas::::::->"+feed)


    const getFeed = async () => {
        try {
            // check if feed is already loaded
            if (feed) return;
            // fetch data from api
            // return data
            // map data to feed item component
            // dispatch action to feedSlice
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            console.log(res)
            dispatch(addFeed(res?.data))
        }
        catch (err) {
            console.log(err)
        }


        useEffect(() => {
            getFeed();

        }, []);
    }
    return(
        <div className="flex justify-center my-10">
            {/* pass user data as props */}
            <UserCard/>
        </div>
    )
}

export default Feed;