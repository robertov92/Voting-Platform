import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { FlexboxGrid, Panel } from 'rsuite';

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: -100
};

const panelStyle = {
  border: '1px solid black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 250,
  height: 150
};

const formGroupStyle = {
  paddingTop: 5,
  paddingBottom: 5
};

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 10
};

class LoginForm extends Component {

  handleFormSubmit(e) {
    e.preventDefault();

    console.log("FORM SUBMIT!");

  }

  render() {
    return (
      <div style={divStyle}>
        <Panel style={panelStyle}>
          <Form horizontal className="LoginForm" id="loginForm">
            <FormGroup style={formGroupStyle} controlId="formEmail">
              <FormControl type="email" placeholder="Email Address" />
            </FormGroup>
            <FormGroup style={formGroupStyle} controlId="formPassword">
              <FormControl type="password" placeholder="Password" />
            </FormGroup>
            <FormGroup style={buttonStyle} controlId="formSubmit">
              <Button bsStyle="primary" type="submit" onClick={this.handleFormSubmit}>
                Login
              </Button>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    )
  }
}

export default LoginForm;
