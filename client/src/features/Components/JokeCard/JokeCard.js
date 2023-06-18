import { useDispatch, useSelector } from 'react-redux';
import { TwitterShareButton, TwitterIcon } from 'react-share'
import { selectIsLoggedIn, selectUserId } from '../../../app/slices/userSlice';
import { addFavoriteJoke, deleteFavoriteJoke } from '../../../app/slices/jokeSlice';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const JokeCard = ({ joke, setButtonText, buttonText, showButton=true, showTwitterButton=false, showDeleteButton=false }) => {
  const dispatch = useDispatch();

  // const jokeId = useSelector(selectJokeId);
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
    const newJoke = await fetch(url, {
      method: "POST",
      body: JSON.stringify(jokeBody),
      headers: {
        "Content-Type": "application/json"
      },
    });

    const data = await newJoke.json();

    dispatch(addFavoriteJoke(data));
    setButtonText('Saved');
  };

  const deleteJoke = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/jokes/${joke.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        dispatch(deleteFavoriteJoke(joke.id));
        console.log("Joke deleted successfully");
      } else {
        console.error("Error deleting joke:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Card border="primary" style={{ width: '18rem', marginTop: '32px' }}>
        <Card.Header>{joke.category}</Card.Header>
        <Card.Body>
          <Card.Text>
            {joke.joke}
          </Card.Text>
          {isLoggedIn && showButton && (
            <Button variant="success" disabled={buttonText === 'Saved'} onClick={saveJoke}>
              {buttonText}
            </Button>
          )}
          {showTwitterButton && (
            <TwitterShareButton url={joke.joke}>
              <TwitterIcon style={{ height: '36px' }} />
            </TwitterShareButton>
          )}
          {showDeleteButton && <Button variant="danger" onClick={deleteJoke}>
            Delete
          </Button>}
        </Card.Body>
      </Card>
    </>
  );
}

export default JokeCard;
