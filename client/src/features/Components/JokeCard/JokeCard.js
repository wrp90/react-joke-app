import { useDispatch, useSelector } from 'react-redux';
import { TwitterShareButton, TwitterIcon } from 'react-share'
import { selectIsLoggedIn, selectUserId } from '../../../app/slices/userSlice';
import { addFavoriteJoke } from '../../../app/slices/jokeSlice';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const JokeCard = ({ joke, setButtonText, buttonText, showButton=true, showTwitterButton=false }) => {
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
          {/* {showTwitterButton && <Button  onClick={'save to twitter'}>
            Post to twitter
          </Button>} */}
          {showTwitterButton && <TwitterShareButton url={joke.joke}>
            <TwitterIcon style={{height: '36px'}}/>
          </TwitterShareButton>}
        </Card.Body>
      </Card>
    </>
  );
}

export default JokeCard;