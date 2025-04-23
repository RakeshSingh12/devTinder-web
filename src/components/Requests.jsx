import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice"

const Requests = () => {
    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch();
    const [error, setError] = useState("")

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            ) //2nd paramter always send empty if body no request available
            dispatch(removeRequest(_id))
        }
        catch (err) {
            setError(err || "Something went wrong")
        }
    }


    const fetchRequest = async () => {

        try {
            const res = await axios.get(BASE_URL + "/user/request/received", { withCredentials: true })
            //send data to store using use useDispatch hooks
            dispatch(addRequests(res?.data?.data));
            console.log(res.data.message)

        }
        catch (err) {
            setError(err || "Something went wrong")

        }
    }

    useEffect(() => {
        fetchRequest();
    }, []);

    if (requests?.length <= 0 || !requests) return <h1 className="text-center text-red-500 text-3xl p-10"> No Request found</h1>

    return (
        <div className="text-center my-3">
            <h1 className="text-bold text-white text-3xl"> Connections Request</h1>
            {requests.map((request) => {
                const { _id, firstName, lastName, photoURL, age, gender, about } = request.fromUserId;
                return (
                    <div
                        key={_id}
                        className=" flex item-center m-4 p-4 bg-base-300  rounded-lg w-1/2 mx-auto">
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full"
                                src={photoURL} />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{firstName + " , " + lastName}</h2>
                            {age && gender && <p>{age + " , " + gender}</p>}
                            <p>{about}</p>
                        </div>

                        <div>
                            <button
                                className="btn btn-secondary mx-2"
                                onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                            <button
                                className="btn btn-primary mx-2"
                                onClick={() => reviewRequest("rejected", request._id)}>Reject</button>


                        </div>

                    </div>
                )
            }
            )}
        </div>

    )
}

export default Requests;