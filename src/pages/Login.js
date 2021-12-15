import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = () => {
  return (
    <div className="login">
      <Form>
        <h3>Sign In</h3>
        <br />

        <Form.Group className="mb-3" controlId="formLoginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
          <Form.Text className="text-muted">
            <i>
              <a href="#">Forgot password?</a>
            </i>
          </Form.Text>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Form.Group as={Col} className="mb-3" id="formGridCheckbox">
            <Button variant="primary" type="submit" style={{ float: "right" }}>
              Submit
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
