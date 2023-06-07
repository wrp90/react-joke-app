import { Form, Button, Row, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import NavElement from '../NavElement/NavElement';
import { setIsLoggedIn } from '../../../app/slices/userSlice';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({
        email: "",
        userName: "",
        password: "",
    });
    console.log('user:', user)

    const handleChange = (event) => {
        const { email, userName, password, value } = event.target;
        setUser({ ...user, [email]: value, [userName]: value, [password]: value, });
        setPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // const [message, setMessage] = useState(null)

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
        console.log('logindata:', data)

        if (data.message) {
            // return setMessage(data.message);
        }

        console.log(data);
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
                            onChange={handleChange}
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
                                onChange={handleChange}
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
            </Row>
            {/* {message && <p>{message}</p>} */}
        </div>
    );
};

export default Login;
