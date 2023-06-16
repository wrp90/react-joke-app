import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserId, selectUserInformation } from "../../../app/slices/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectFavoriteJoke, setFavoriteJokes } from "../../../app/slices/jokeSlice";
import JokeCard from "../JokeCard/JokeCard";
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userInformation = useSelector(selectUserInformation);
    const jokes = useSelector(selectFavoriteJoke);
    const id = useSelector(selectUserId);

    useEffect(() => {
        if (!isLoggedIn) return navigate('/login');
        getJokes();
    }, [isLoggedIn]);

    const getJokes = async () => {
        const favJoke = await fetch(`http://localhost:3001/jokes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const jokes = await favJoke.json();
        dispatch(setFavoriteJokes(jokes));
    };

    if (isLoggedIn) {
        console.log("Dashboard User Info:", userInformation)
        return (
            <div className="dashboard-container">
                <h1>Hello {userInformation.firstName}!</h1>
                <div className="favorite-joke-container">
                    {jokes.map((joke, index) => {
                        return <JokeCard showTwitterButton showButton={false} joke={joke} key={index} />
                    })}
                </div>
            </div>
        )
    }
};

export default Dashboard;