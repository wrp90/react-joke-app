import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../app/slices/userSlice';
import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

const AppContainer = ({ hideLogin }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const hasToken = !!localStorage.getItem('token');

    const renderLinks = () => {
        if (!isLoggedIn && !hasToken) {
            return (
                <div className="d-flex align-items-center">
                    <Link className="navbar-brand me-3" to="/register">
                        Register
                    </Link>
                    <Link className="navbar-brand" to="/login">
                        Log In
                    </Link>
                </div>
            );
        };

        if (isLoggedIn || hasToken) {
            return (
                <>
                    <Link
                        className="navbar-brand"
                        to="/dashboard">
                        Dashboard
                    </Link>
                    <Link
                        className="navbar-brand"
                        to={isLoggedIn || hasToken ? '/logout' : '/login'}
                    >
                        {isLoggedIn || hasToken ? 'Log Out' : 'Log In'}
                    </Link>
                </>
            );
        };
    };

    return (
        <>
            <Navbar className="border navbar-light bg-light p-2 justify-content-between" bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">
                    Joke Generator
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!hideLogin && renderLinks()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container className="mt-5">
                <Outlet />
            </Container>
        </>
    );
}

export default AppContainer;