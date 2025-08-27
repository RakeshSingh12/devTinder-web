import axios from "axios";
import { API_ENDPOINTS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { deleteFeed } from "../utils/feedSlice"

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoURL, age, gender, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        // status = interested or ignored
        // userId = user id of the person to whom we are sending request
        try {
            const res = await axios.post(API_ENDPOINTS.BASE_URL + API_ENDPOINTS.REQUESTS.SEND + "/" + status + "/" + userId, {}, { withCredentials: true }) // 2nd paramter currenty don't have data so we pass as an empty resqust that is mandatry
            dispatch(deleteFeed(userId))
        }
        catch (err) {
            console.error("Error sending request:", err);
        }
    }
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img src={photoURL} alt="photos" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {/* <p>{skills}</p> */}
                {age && gender && <p>{age + " , " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;