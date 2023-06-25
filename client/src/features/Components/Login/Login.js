import { Form, Button, Row, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    selectIsLoggedIn,
    setIsLoggedIn,
    setUserId,
    setUserInformation
} from '../../../app/slices/userSlice';
import { setFavoriteJokes } from '../../../app/slices/jokeSlice';
import './Login.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState(null);

    const onPasswordEntry = (event) => {
        setUser({ ...user, password: event.target.value })
        setPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submitLogin = async (event) => {
        event.preventDefault();
        const newUser = await fetch(`${baseUrl}/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await newUser.json();

        if (data.message) {
            return setMessage(data.message);
        };

        if (!data.user.id) return 
        const favJoke = await fetch(`http://localhost:3001/jokes/${data.user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const jokes = await favJoke.json();
        dispatch(setFavoriteJokes(jokes));
        
        localStorage.setItem('token', data.token);
        const { firstName, lastName, email, userName, id } = data.user;
        dispatch(setIsLoggedIn(true));
        dispatch(setUserId(id));
        dispatch(setUserInformation({ firstName, lastName, email, userName }));
        navigate('/');
    };

    useEffect(() => {
        if (isLoggedIn) return navigate('/')
    }, [isLoggedIn, navigate]);

    return (
        <div className="login-form">
            <Row className="login-container">
                {message && <p>{message}</p>}
                <h2 className="login-font mb-2">Login</h2>
                <Form onSubmit={e => submitLogin(e)} className="login-form">
                    <Form.Group controlId="email">
                        <Form.Label className="login-font mt-3">Email address</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            className="login-font"
                            required onChange={(event) =>
                                setUser({ ...user, email: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label className="login-font">Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                className="login-font"
                                placeholder="Password"
                                required onChange={(event) =>
                                    onPasswordEntry(event)
                                }
                            />
                            <Button
                                className={`login-font ${showPassword ? 'active' : ''}`}
                                variant="outline-secondary show-hide-button"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <BsEyeSlash /> : <BsEye />}
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <div className="mt-3 d-flex align-items-center">
                        <Button className="login-button" variant="primary" type="submit">
                            Log In
                        </Button>
                        <Form.Text className="login-font ms-2">
                            No account?&nbsp;
                            <Link to="/register">Sign up!</Link>
                        </Form.Text>
                    </div>
                </Form>
            </Row>
        </div>
    );
};

export default Login;
