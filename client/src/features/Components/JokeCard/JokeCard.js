import { useDispatch, useSelector } from 'react-redux';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { selectIsLoggedIn, selectUserId } from '../../../app/slices/userSlice';
import { addFavoriteJoke, deleteFavoriteJoke } from '../../../app/slices/jokeSlice';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './JokeCard.css'

const baseUrl = process.env.REACT_APP_BASE_URL;

const JokeCard = ({ joke, setButtonText, buttonText, showButton = true, showTwitterButton = false, showDeleteButton = false }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const id = useSelector(selectUserId);
  const jokeBody = {
    userId: id,
    joke: joke.joke,
    category: joke.category,
  };

  const saveJoke = async (event) => {
    event.preventDefault();

    const url = `${baseUrl}/jokes`;
    const newJoke = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(jokeBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await newJoke.json();

    dispatch(addFavoriteJoke(data));
    setButtonText('Saved');
  };

  const deleteJoke = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/jokes/${joke.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        dispatch(deleteFavoriteJoke(joke.id));
        console.log('Joke deleted successfully');
      } else {
        console.error('Error deleting joke:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card className="jokeCard" border="primary" style={{ width: '18rem', height: '28rem', marginTop: '32px', display: 'flex', flexDirection: 'column' }}>
      <Card.Header className="joke-text">{joke.category}</Card.Header>
      <Card.Body style={{ flex: '1 0 auto' }}>
        <Card.Text className="joke-text">{joke.joke}</Card.Text>
      </Card.Body>
      <Card.Footer>
        {isLoggedIn && showButton && (
          <Button className="save-button joke-text" disabled={buttonText === 'Saved'} onClick={saveJoke}>
            {buttonText}
          </Button>
        )}
        {showDeleteButton && (
          <Button className="joke-text" variant="danger" onClick={deleteJoke}>
            Delete
          </Button>
        )}
        {showTwitterButton && (
          <TwitterShareButton url={joke.joke}>
            <TwitterIcon style={{ height: '36px' }} />
          </TwitterShareButton>
        )}
      </Card.Footer>
    </Card>
  );
};

export default JokeCard;
