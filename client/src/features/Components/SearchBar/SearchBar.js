

const SearchBar = ({ onHandleSubmit }) => {
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        onHandleSubmit();
    }; 

    return (
        <div className="search">
            <form className="joke-button-form" onSubmit={(event) => handleSubmit(event)}>
                <input className="joke-button"type="submit" value="Joke"></input>
            </form>
        </div>
    )
};

export default SearchBar;