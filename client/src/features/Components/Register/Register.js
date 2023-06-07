import { Form, Button, Row } from 'react-bootstrap';
import NavElement from '../NavElement/NavElement';

const Register = () => {
    return (
        <div>
            <NavElement hideDropDown/>
            <Row className="register-container">
                <h2>Sign up</h2>
                <Form>
                    <Form.Group className="mt-2">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
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