import axios from "axios";
import { API_ENDPOINTS } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react"
import UserCard from "./UserCard";

const Feed = () => {

    // useSelector hook to access the feed state from the store
    // useDispatch hook to dispatch actions to the store
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
            // send data to store using useDispatch hooks
            const res = await axios.get(API_ENDPOINTS.BASE_URL + API_ENDPOINTS.FEED, { withCredentials: true });
            dispatch(addFeed(res?.data?.data))
        }
        catch (err) {
            console.log("Error fetching feed:", err)
        }
    }
    // useEffect hook to fetch feed data when component mounts
    // and when feed changes
    useEffect(() => {
        getFeed();
    }, [feed, dispatch])

    if (!feed) return <div className="flex justify-center my-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;

    if (feed?.length <= 0) return <h1 className="text-center text-red-500 text-3xl p-10"> No New User found</h1>

    return (
        feed && (<div className="flex justify-center my-10">
            {/* pass user data as props */}
            <UserCard user={feed[0]} />
        </div>)
    )
}

export default Feed;