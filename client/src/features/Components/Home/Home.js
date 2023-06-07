import { useDispatch, useSelector } from 'react-redux';
import { currentJoke, searchJoke } from '../../../app/slices/jokeSlice';
import { useState } from 'react';
import NavbarElement from "../NavElement/NavElement";
import SearchBar from "../SearchBar/SearchBar";
import JokeCard from '../JokeCard/JokeCard';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const [jokeType, setJokeType] = useState('');
    const initAPI = async () => {
        const userResponse = await fetch(
            `https://v2.jokeapi.dev/joke/${jokeType}?blacklistFlags=racist&type=single`
        );
        const response = await userResponse.json();
        // if (response.error === true) {
        //     setSearchError(response.error);
        // } else {
        //     if (searchError) {
        //         setSearchError('')
        //     }
        // };
        console.log(response);
        dispatch(searchJoke(response));
    };

    const joke = useSelector(currentJoke);

    return (
        <div>
            <NavbarElement setJokeType={setJokeType}/>
            <div className="joke-card">
                <h2 className="title">Joke Generator</h2>
                <p>
                    Welcome to my joke site!  Please select a joke type then hit the joke button!
                </p>
                <SearchBar onHandleSubmit={initAPI} />
                {joke && <JokeCard joke={joke} />}
            </div>
        </div>
    )
};



export default Home; 