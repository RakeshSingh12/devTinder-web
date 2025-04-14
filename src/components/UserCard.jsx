import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { deleteFeed } from "../utils/feedSlice"

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoURL, age, gender, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send" + "/" + status + "/" + userId, {}, { withCredentials: true }) // 2nd paramter currenty don't have data so we pass as an empty resqust that is mandatry
            dispatch(deleteFeed(userId))
        }
        catch (err) {

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