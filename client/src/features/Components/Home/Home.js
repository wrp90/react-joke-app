import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentJoke, selectJokeType, setCurrentJoke, setJokeType } from '../../../app/slices/jokeSlice';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import JokeCard from '../JokeCard/JokeCard';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const jokeType = useSelector(selectJokeType);
    const [buttonText, setButtonText] = useState('Save Joke');
    const initAPI = async () => {
        const userResponse = await fetch(
            `https://v2.jokeapi.dev/joke/${jokeType}?blacklistFlags=racist&type=single`
        );
        const response = await userResponse.json();
        dispatch(setCurrentJoke(response));
        setButtonText('Save Joke');
    };

    const joke = useSelector(selectCurrentJoke);

    const handleJokeTypeChange = (type) => {
        dispatch(setJokeType(type));
    };

    useEffect(() => {
        const reloadHomePage = () => {
            if (window.location.pathname === '/' && document.visibilityState === 'visible') {
                window.location.reload();
            }
        };

        window.addEventListener('visibilitychange', reloadHomePage);

        return () => {
            window.removeEventListener('visibilitychange', reloadHomePage);
        };
    }, []);

    return (
        <div className="home-container">
            <div className="joke-card">
                <h1 className="title">Joke Generator</h1>
                <p className="welcome">Welcome to my joke site! Please select a joke type then hit the joke button!</p>
                <div className="joke-controls">
                    <DropdownButton
                        variant="info"
                        id="dropdown-basic-button"
                        title={jokeType ? jokeType : 'Select Joke Type'}
                        className="dropdown-menu-font me-2"
                    >
                        <Dropdown.Item className="dropdown-menu-font" onClick={() => handleJokeTypeChange('Any')}>Any</Dropdown.Item>
                        <Dropdown.Item className="dropdown-menu-font" onClick={() => handleJokeTypeChange('Miscellaneous')}>Miscellaneous</Dropdown.Item>
                        <Dropdown.Item className="dropdown-menu-font" onClick={() => handleJokeTypeChange('Programming')}>Programming</Dropdown.Item>
                        <Dropdown.Item className="dropdown-menu-font" onClick={() => handleJokeTypeChange('Dark')}>Dark</Dropdown.Item>
                        <Dropdown.Item className="dropdown-menu-font" onClick={() => handleJokeTypeChange('Pun')}>Pun</Dropdown.Item>
                    </DropdownButton>
                    <Button variant="primary" className="dropdown-menu-font joke-button" onClick={initAPI}>
                        Joke
                    </Button>
                </div>
                {joke && <JokeCard buttonText={buttonText} setButtonText={setButtonText} joke={joke} />}
            </div>
        </div>
    );
};

export default Home;
