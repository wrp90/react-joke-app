import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavElement = ({ setJokeType }) => {
    return (
        <Navbar className="border" bg="light" expand="lg">
            <Container className="nav-container">
                <Navbar.Brand href="#home">Joke Generator</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown className="mx-auto" title="Select Joke Type" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setJokeType('Any')}>Any</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setJokeType('Miscellaneous')}>Miscellaneous</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setJokeType('Programming')} >
                                Programming
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setJokeType('Dark')}>Dark</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setJokeType('Pun')}>
                                Pun
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#Login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavElement;