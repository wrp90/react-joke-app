

const SearchBar = ({ onHandleSubmit }) => {
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        onHandleSubmit();
    }; 

    return (
        <div className="search">
            <form onSubmit={(event) => handleSubmit(event)}>
                <input type="submit" value="Search"></input>
            </form>
        </div>
    )
};

export default SearchBar;