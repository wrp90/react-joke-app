import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserInformation } from "../../../app/slices/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate()
    const userInformation = useSelector(selectUserInformation);
    // const joke = useSelector(selectFavoriteJoke);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) return navigate('/login')
    },[isLoggedIn]);
    
    if (isLoggedIn) {
        console.log("Dashboard User Info:", userInformation)
        return (
            <div className="dashboard-container">
                <h1>Hello {userInformation.firstName}!</h1>
                <div className="favorite-joke-container">

                </div>
            </div>
        )
    }
};

export default Dashboard;