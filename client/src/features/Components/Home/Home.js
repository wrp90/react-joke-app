import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentJoke, setCurrentJoke } from '../../../app/slices/jokeSlice';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useState } from 'react';
import NavbarElement from "../NavElement/NavElement";
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
        dispatch(setCurrentJoke(response));
    };

    const joke = useSelector(selectCurrentJoke);

    return (
        <div>
            <NavbarElement setJokeType={setJokeType} />
            <div className="joke-card">
                <h1 className="title">Joke Generator</h1>
                <p>
                    Welcome to my joke site!  Please select a joke type then hit the joke button!
                </p>
                <div className="joke-controls">
                    <DropdownButton
                        variant="info"
                        id="dropdown-basic-button"
                        title="Dropdown button"
                        className="me-2"
                    >
                        <Dropdown.Item onClick={() => setJokeType('Any')}>
                            Any
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => setJokeType('Miscellaneous')}
                        >
                            Miscellaneous
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => setJokeType('Programming')}
                        >
                            Programming
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setJokeType('Dark')}>
                            Dark
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setJokeType('Pun')}>
                            Pun
                        </Dropdown.Item>
                    </DropdownButton>
                    <Button variant="primary" onClick={initAPI}>
                        Joke
                    </Button>
                </div>
                {joke && <JokeCard joke={joke} />}
            </div>
        </div>
    )
};



export default Home; 