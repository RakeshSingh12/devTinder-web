import axios from "axios";
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react"
import UserCard from "./UserCard";

const Feed = () => {

    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();


    const getFeed = async () => {
       // check if feed is already loaded
       // return data
        if (feed) return;

        try {
            // fetch data from api
            // map data to feed item component  
            // dispatch action to feedSlice
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(res?.data?.data))
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getFeed();

    }, [])

    return (
       feed && (<div className="flex justify-center my-10">
            {/* pass user data as props */}
            <UserCard user = {feed[0]} />
        </div>)
    )
}

export default Feed;