import { Form, Button, Row, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setIsLoggedIn, setUserInformation } from '../../../app/slices/userSlice';
import NavElement from '../NavElement/NavElement';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

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
        const url = 'http://localhost:3001/login'
        const newUser = await fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await newUser.json();
        console.log("login data:", data);

        if (data.message) {
            return setMessage(data.message);
        }
        localStorage.setItem('token', data.token);
        const { firstName, lastName, email, username } = data.user;
        dispatch(setUserInformation({ firstName, lastName, email, username }));
        dispatch(setIsLoggedIn(true));
        navigate('/dashboard');
    };

    return (
        <div>
            <NavElement hideDropDown hideLogin />
            <Row className="login-container">
                <h2 className="mb-2">Login</h2>
                <Form onSubmit={e => submitLogin(e)} className="login-form">
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            required onChange={(event) =>
                                setUser({ ...user, email: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Password"
                                required onChange={(event) =>
                                    onPasswordEntry(event)
                                }
                            />
                            <Button variant="outline-secondary show-hide-button" onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <div className="mt-2 ">
                        <Button variant="primary" type="submit">
                            Log In
                        </Button>
                        <Form.Text className="ms-2">
                            No account?&nbsp;
                            <Link to="/register">Sign up!</Link>
                        </Form.Text>
                    </div>
                </Form>
                {message && <p>{message}</p>}
            </Row>
        </div>
    );
};

export default Login;
