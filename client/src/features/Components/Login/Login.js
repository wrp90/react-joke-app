import { Form, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavElement from '../NavElement/NavElement';

const Login = () => {
    return (
        <div>
            <NavElement hideDropDown hideLogin/>
            <Row className="login-container">
                <h2 className="mb-2">Login</h2>
                <Form className="login-form">
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                        // type="email"
                        // placeholder="Enter email"
                        // value={email}
                        // onChange={handleEmailChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        // type="password"
                        // placeholder="Password"
                        // value={password}
                        // onChange={handlePasswordChange}
                        />
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
        </div>
    );
};

export default Login;
