import React, { Component } from 'react';
// import { createUser } from '../services/userAPI';

export default class Login extends Component {
  render() {
    return (
      <>
        <div>
          <div data-testid="page-login">Login</div>
        </div>
        <div>
          <form action="">
            <input type="text" data-testid="login-name-input" />

            <button type="button" data-testid="login-submit-button">Entrar</button>
          </form>
        </div>

      </>
    );
  }
}
