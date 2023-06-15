import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserId } from '../../../app/slices/userSlice';
import { addFavoriteJoke } from '../../../app/slices/jokeSlice';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const JokeCard = ({ joke, setButtonText, buttonText, showButton=true }) => {
  const dispatch = useDispatch();


  const isLoggedIn = useSelector(selectIsLoggedIn);
  const id = useSelector(selectUserId);

  const jokeBody = {
    userId: id,
    joke: joke.joke,
    category: joke.category
  };

  const saveJoke = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:3001/jokes';
    const newJoke= await fetch(url, {
        method: "POST",
        body: JSON.stringify(jokeBody),
        headers: {
            "Content-Type": "application/json"
        },
    });

    const data = await newJoke.json();
    console.log("New Joke Data:", data);

    dispatch(addFavoriteJoke(data));
    setButtonText('Saved');
  };
  
  
  return (
    <>
      <Card border="primary" style={{ width: '18rem', marginTop: '32px' }}>
        <Card.Header>{joke.category}</Card.Header>
        <Card.Body>
          <Card.Text>
            {joke.joke}
          </Card.Text>
          {isLoggedIn && showButton && <Button disabled={buttonText === 'Saved'} onClick={e => saveJoke(e)}>
            {buttonText}
          </Button>}
        </Card.Body>
      </Card>
    </>
  );
}

export default JokeCard;