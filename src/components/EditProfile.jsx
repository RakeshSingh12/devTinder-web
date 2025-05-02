import { useState } from "react";
import UserCard from "./UserCard"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || ""); //empty check
    const [gender, setGender] = useState(user.gender || ""); //empty check
    const [about, setAbout] = useState(user.about || ""); // empty check
    const [photoURL, setPhotoURL] = useState(user.photoURL || ""); //empty check
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false)
    const dispatch = useDispatch();

    //save profile function
    // this function will be called when user click on save button
    // it will send the data to the server and update the user data in the store
    // and show the toast message
    // if the data is saved successfully
    // if the data is not saved successfully then it will show the error message
    const saveProfile = async () => {
        //Clear existing error
        setError("");

        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    photoURL,
                    age,
                    gender,
                    about
                },
                { withCredentials: true });
            dispatch((addUser(res?.data?.data)));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000)

        } catch (err) {
            setError(err?.response?.data)
        }
    }
    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex justify-center">
                    <div className="card card-border bg-base-300 w-96 mx-10">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <fieldset className="fieldset m-2">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Please enter first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset m-2">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Please enter last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset m-2">
                                    <legend className="fieldset-legend">Photo update</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Please enter photo url"
                                        value={photoURL}
                                        onChange={(e) => setPhotoURL(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset m-2">
                                    <legend className="fieldset-legend">Age</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Please enter age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset m-2">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Please enter gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset m-2">
                                    <legend className="fieldset-legend">About</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Please enter about"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)} />
                                </fieldset>
                            </div>

                            <p className="text-center text-red-500"> {error}</p>

                            <div className="card-actions justify-center p-2">
                                <button className="btn btn-primary" onClick={saveProfile}>Update Profile</button>
                            </div>
                        </div>
                    </div>
                    <UserCard user={{ firstName, lastName, age, gender, about, photoURL }} />
                </div>
            </div>
            {/* how the toast here */}
            {showToast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile Save successfully!</span>
                </div>
            </div>)}
        </>
    )
}

export default EditProfile;