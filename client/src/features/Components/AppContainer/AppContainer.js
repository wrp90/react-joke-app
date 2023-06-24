import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { selectIsLoggedIn, setIsLoggedIn, setUserId, setUserInformation } from '../../../app/slices/userSlice';
import { Container, Nav } from 'react-bootstrap';
import { useCallback, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './AppContainer.css'

const baseUrl = process.env.REACT_APP_BASE_URL;

const AppContainer = ({ hideLogin }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let location = useLocation();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const token = localStorage.getItem('token');
    const hasToken = !!token;

    const fetchUserData = useCallback(async (event) => {
        const url = `${baseUrl}/user/${token}`;
        const newUser = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await newUser.json();
        if (data.message) {
            navigate("/logout");
            return;
        };

        const { firstName, lastName, email, userName, id } = data;
        dispatch(setIsLoggedIn(true));
        dispatch(setUserId(id));
        dispatch(setUserInformation({ firstName, lastName, email, userName }));
        navigate({location});
    }, [dispatch, navigate, location, token]) 

    useEffect(() => {
        if (hasToken) {
            fetchUserData();
            return;
        }
        // eslint-disable-next-line
    },[hasToken])

    const renderLinks = () => {
        if (!isLoggedIn) {
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

        if (isLoggedIn) {
            return (
                <>
                    <Link
                        className="navbar-brand"
                        to="/dashboard">
                        Dashboard
                    </Link>
                    <Link
                        className="navbar-brand"
                        to={isLoggedIn ? '/logout' : '/login'}
                    >
                        {isLoggedIn ? 'Log Out' : 'Log In'}
                    </Link>
                </>
            );
        };
    };

    return (
        <>
            <Navbar className="custom-navbar border navbar-light p-2 justify-content-between" expand="lg">
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