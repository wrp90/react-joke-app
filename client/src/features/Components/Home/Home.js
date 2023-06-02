import { useDispatch, useSelector } from 'react-redux';
import { currentJoke, searchJoke } from '../../../app/jokeSlice';
import Navbar from "../Navbar/Navbar";
import SearchBar from "../SearchBar/SearchBar";

const Home = () => {
    const dispatch = useDispatch();
    const initAPI = async () => {
        const userResponse = await fetch(
            `https://v2.jokeapi.dev/joke/Dark?type=single`
        );
        const response = await userResponse.json();
        console.log(response);
        dispatch(searchJoke(response.joke));
    };

    const joke = useSelector(currentJoke);

    return (
        <div className="container">
            <Navbar/>
            <h1>Home</h1>
            <SearchBar onHandleSubmit={initAPI}/>
            <p className="joke">{joke}</p>
        </div>
    )
};

export default Home; 