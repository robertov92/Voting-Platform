import React, { Component } from 'react';
import RegisterForm from './RegisterForm';

import './RegisterPage.css';

class RegisterPage extends Component {
  render() {
    return (
      <div className="RegisterPage">
        <RegisterForm />
      </div>
    );
  }
}

export default RegisterPage;