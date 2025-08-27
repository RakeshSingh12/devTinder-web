import axios from "axios"
import { useEffect, useState } from "react"
import { API_ENDPOINTS } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux" // useSelector hook to access the store state
import { addConnections } from "../utils/connectionSlice"

const Connections = () => {
    const connections = useSelector((store) => store.connection) // useSelector hook to access the connections state from the store
    const [error, setError] = useState("")
    const dispatch = useDispatch(); // useDispatch hook to dispatch actions to the store

    //
    // fetch connections from api
    // send data to store using useDispatch hooks
    // map data to connection item component
    const fetchConnections = async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.BASE_URL + API_ENDPOINTS.CONNECTIONS, { withCredentials: true })
            //dispatch data to store
            dispatch(addConnections(res?.data?.data)) // add connections data to the store using addConnections action

        }
        catch (err) {
            console.log(err);
            setError(err)
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections || connections.length <= 0) return <h1 className="text-center text-red-500 text-3xl p-10"> No Connection found</h1>

    return (
        <div className="text-center my-3">
            <h1 className="text-bold text-white text-3xl"> Connections</h1>
            <p className="text-center text-red-500"> {error}</p>
            {connections.map((connections) => {
                const { _id, firstName, lastName, photoURL, age, gender, about } = connections;
                return (
                    <div
                        key={_id}
                        className=" flex m-4 p-4 bg-base-300 rounded-lg w-1/2 mx-auto">
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full object-cover"
                                src={photoURL} />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{firstName + " , " + lastName}</h2>
                            {age && gender && <p>{age + " , " + gender}</p>}
                            <p>{about}</p>
                        </div>


                    </div>
                )
            }
            )}
        </div>

    )
}

export default Connections;