import { Form, Button, Row, InputGroup } from 'react-bootstrap';
import { setIsLoggedIn, setUserInformation } from '../../../app/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import NavElement from '../NavElement/NavElement';

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onPasswordEntry = (event) => {
        setUser({ ...user, password: event.target.value })
        setPassword(event.target.value);
    }

    const submitRegistration = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:3001/users';
        const newUser = await fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await newUser.json();

        if (data.message) {
            // return setMessage(data.message);
        };

        const { firstName, lastName, email, username } = data;
        dispatch(setUserInformation({ ...firstName, lastName, email, username }));
        dispatch(setIsLoggedIn(true));
        navigate('/login');
    };

    return (
        <div>
            <NavElement hideDropDown />
            <Row className="register-container">
                <h2>Sign up</h2>
                <Form onSubmit={e => submitRegistration(e)}>
                    <Form.Group className="mt-2">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            required onChange={(event) =>
                                setUser({ ...user, firstName: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            required onChange={(event) =>
                                setUser({ ...user, lastName: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a Username"
                            required onChange={(event) =>
                                setUser({ ...user, userName: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            required onChange={(event) =>
                                setUser({ ...user, email: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
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
                    <Button variant="primary" className="mt-2" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>
        </div>
    );
};

export default Register;