import { Form, Button, Row } from 'react-bootstrap';

const Login = () => {
    return (
        <Row className="login-container">
            <h2 className="mb-2">Login</h2>
            <Form class="login-form">
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
                    <Button className="ms-2" variant="primary" type="submit">
                        Register
                    </Button>
                </div>
            </Form>
        </Row>
    );
};

export default Login;
