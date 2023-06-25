import { Form, Button, Row, InputGroup } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Register.css';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Register = () => {
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
    };

    const submitRegistration = async (event) => {
        event.preventDefault();
        const url = `${baseUrl}/users`;
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });
        navigate('/login');
    };

    return (
        <div className="register-form">
            <Row className="register-container">
                <h2 className="register-font">Sign up</h2>
                <Form onSubmit={e => submitRegistration(e)}>
                    <Form.Group className="mt-2">
                        <Form.Label className="register-font mt-3">First name</Form.Label>
                        <Form.Control
                            type="text"
                            className="register-font"
                            placeholder="Enter First Name"
                            required onChange={(event) =>
                                setUser({ ...user, firstName: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label className="register-font">Last name</Form.Label>
                        <Form.Control
                            type="text"
                            className="register-font"
                            placeholder="Enter Last Name"
                            required onChange={(event) =>
                                setUser({ ...user, lastName: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label className="register-font">Username</Form.Label>
                        <Form.Control
                            type="text"
                            className="register-font"
                            placeholder="Enter a Username"
                            required onChange={(event) =>
                                setUser({ ...user, userName: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label className="register-font">Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            className="register-font"
                            placeholder="Enter email"
                            required onChange={(event) =>
                                setUser({ ...user, email: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label className="register-font">Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                className="register-font"
                                value={password}
                                placeholder="Password"
                                required onChange={(event) =>
                                    onPasswordEntry(event)
                                }
                            />
                            <Button
                                className={`register-font ${showPassword ? 'active' : ''}`}
                                variant="outline-secondary show-hide-button"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <BsEyeSlash /> : <BsEye />}
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Button className="submit-button mt-3 d-flex align-items-center" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>
        </div>
    );
};

export default Register;