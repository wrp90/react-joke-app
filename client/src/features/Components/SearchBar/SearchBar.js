import { Button, Form } from "react-bootstrap";

const SearchBar = ({ onHandleSubmit }) => {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        onHandleSubmit();
    }; 

    return (
        <div className="search">
            <Form className="joke-button-form" onSubmit={(event) => handleSubmit(event)}>
                <Button variant="primary" className="mt-2" value="Joke" type="submit">
                    Joke
                </Button>
            </Form>
        </div>
    )
};

export default SearchBar;