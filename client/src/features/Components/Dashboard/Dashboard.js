import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserInformation } from "../../../app/slices/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectFavoriteJoke } from "../../../app/slices/jokeSlice";
import JokeCard from "../JokeCard/JokeCard";
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userInformation = useSelector(selectUserInformation);
    const jokes = useSelector(selectFavoriteJoke);

    useEffect(() => {
        if (!isLoggedIn) return navigate('/login')
    },[isLoggedIn]);
    
    if (isLoggedIn) {
        console.log("Dashboard User Info:", userInformation)
        return (
            <div className="dashboard-container">
                <h1>Hello {userInformation.firstName}!</h1>
                <div className="favorite-joke-container">
                    {jokes.map((joke, index) => {
                        return <JokeCard showButton={false} joke={joke} key={index}/>
                    })}
                </div>
            </div>
        )
    }
};

export default Dashboard;