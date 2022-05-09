/* import propTypes from 'prop-types'; */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      isEnterButtonDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  /*   componentDidMount() {
    this.onEnterButtonClick();
  } */

  /*   componentWillUnmount() {
    this.onEnterButtonClick();
  } */

  onInputChange = ({ target }) => { // desconstroi o evento pegando o target, o node que está sendo modificado
    const { value } = target; // desconstroi o valor de dentro do target que está sendo modificado
    this.setState({ login: value }, () => {
      // callback que pega os valores do estado já atualizados pelo onChange
      const { login } = this.state;
      console.log(this.state);
      const minChar = 2;
      if (login.length > minChar) {
        this.setState({ isEnterButtonDisabled: false });
      } else {
        this.setState({ isEnterButtonDisabled: true });
      }
    });
  }

  onEnterButtonClick = async () => {
    const { login } = this.state;

    this.setState({
      loading: true, // faz com que loading seja true e mostre a mensagem de loading enquanto o CreateUser não for chamado.

    });
    await createUser({ name: login });

    this.setState({
      loading: false, // para de mostrar a mensagem do loading
      redirect: true, // redireciona pra proxima pagina (/search no caso)
    });
  }

  render() {
    const { login,
      isEnterButtonDisabled, loading, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <section>
        {loading ? (<Loading />) : (

          <>
            <div data-testid="page-login">Login</div>
            <div>
              <form>
                <input
                  type="text"
                  data-testid="login-name-input"
                  value={ login }
                  onChange={ this.onInputChange }
                />

                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ isEnterButtonDisabled }
                  onClick={ this.onEnterButtonClick }
                >
                  Entrar
                </button>
              </form>
            </div>

          </>
        )}
      </section>

    );
  }
}

/* Login.propTypes = {
  login: propTypes.string.isRequired,
  onInputChange: propTypes.func.isRequired,
  isEnterButtonDisabled: propTypes.bool.isRequired,
}; */
