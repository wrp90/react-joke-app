import Card from 'react-bootstrap/Card';

const JokeCard = ({ joke }) => {
  return (
    <>
      <Card border="primary" style={{ width: '18rem', marginTop: '32px' }}>
        <Card.Header>{joke.category}</Card.Header>
        <Card.Body>
          <Card.Text>
            {joke.joke}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default JokeCard;