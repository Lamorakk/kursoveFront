import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfilePage;
