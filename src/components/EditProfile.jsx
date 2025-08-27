import { useState, useEffect } from "react";
import UserCard from "./UserCard"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../utils/constants";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || ""); //empty check
    const [gender, setGender] = useState(user?.gender || ""); //empty check
    const [about, setAbout] = useState(user?.about || ""); // empty check
    const [photoURL, setPhotoURL] = useState(user?.photoURL || ""); //empty check
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Update local state when user prop changes
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setAge(user.age || "");
            setGender(user.gender || "");
            setAbout(user.about || "");
            setPhotoURL(user.photoURL || "");
        }
    }, [user]);

    //save profile function
    // this function will be called when user click on save button
    // it will send the data to the server and update the user data in the store
    // and show the toast message
    // if the data is saved successfully
    // if the data is not saved successfully then it will show the error message
    const saveProfile = async () => {
        //Clear existing error
        setError("");
        setIsLoading(true);

        // Basic validation
        if (!firstName.trim() || !lastName.trim()) {
            setError("First name and last name are required");
            setIsLoading(false);
            return;
        }

        try {
            // Try different possible endpoints
            let res;
            try {
                // First try the profile/edit endpoint
                res = await axios.patch(
                    API_ENDPOINTS.BASE_URL + "/profile/edit",
                    {
                        firstName,
                        lastName,
                        photoURL,
                        age,
                        gender,
                        about
                    },
                    { withCredentials: true }
                );
            } catch (editError) {
                // If that fails, try the user/update endpoint
                try {
                    res = await axios.patch(
                        API_ENDPOINTS.BASE_URL + "/user/update",
                        {
                            firstName,
                            lastName,
                            photoURL,
                            age,
                            gender,
                            about
                        },
                        { withCredentials: true }
                    );
                } catch (updateError) {
                    // If both fail, try the profile/update endpoint
                    res = await axios.patch(
                        API_ENDPOINTS.BASE_URL + "/profile/update",
                        {
                            firstName,
                            lastName,
                            photoURL,
                            age,
                            gender,
                            about
                        },
                        { withCredentials: true }
                    );
                }
            }

            // Handle the response
            const updatedUser = res?.data?.data || res?.data || res?.data?.user;
            if (updatedUser) {
                dispatch(addUser(updatedUser));
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
                
                // Navigate back to profile after successful update
                setTimeout(() => {
                    navigate("/profile");
                }, 2000);
            } else {
                setError("Profile updated but no user data received");
            }

        } catch (err) {
            console.error("Profile update error:", err);
            const errorMessage = err?.response?.data?.message || 
                               err?.response?.data?.error || 
                               err?.response?.data || 
                               err?.message || 
                               "Failed to update profile";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
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
                                    <legend className="fieldset-legend">First Name *</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Please enter first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset m-2">
                                    <legend className="fieldset-legend">Last Name *</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Please enter last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset m-2">
                                    <legend className="fieldset-legend">Photo URL</legend>
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
                                        type="number"
                                        className="input"
                                        placeholder="Please enter age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset m-2">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <select 
                                        className="input"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </fieldset>
                                <fieldset className="fieldset m-2">
                                    <legend className="fieldset-legend">About</legend>
                                    <textarea
                                        className="textarea"
                                        placeholder="Please enter about"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        rows="3"
                                    />
                                </fieldset>
                            </div>

                            {error && (
                                <div className="alert alert-error mt-2">
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="card-actions justify-center p-2">
                                <button 
                                    className={`btn btn-primary ${isLoading ? 'loading' : ''}`} 
                                    onClick={saveProfile}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : 'Update Profile'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <UserCard user={{ firstName, lastName, age, gender, about, photoURL }} />
                </div>
            </div>
            {/* Toast notification */}
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully!</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditProfile;