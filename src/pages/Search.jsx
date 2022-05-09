import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      isSearchButtonDisabled: true,
      loading: false,
    };
  }

  onInputChange = ({ target }) => { // desconstroi o evento pegando o target, o node que está sendo modificado
    const { value } = target; // desconstroi o valor de dentro do target que está sendo modificado
    this.setState({ searchQuery: value }, () => {
      // callback que pega os valores do estado já atualizados pelo onChange
      const { searchQuery } = this.state;
      console.log(this.state);
      const minChar = 1;
      if (searchQuery.length > minChar) {
        this.setState({ isSearchButtonDisabled: false });
      } else {
        this.setState({ isSearchButtonDisabled: true });
      }
    });
  }

  onSearchButtonClick = () => {
    // const { searchQuery } = this.state;

    this.setState({
      loading: true, // faz com que loading seja true e mostre a mensagem de loading enquanto o CreateUser não for chamado.

    });

    this.setState({
      loading: false, // para de mostrar a mensagem do loading
      redirect: true, // redireciona pra proxima pagina (/search no caso)
    });
  }

  render() {
    const { searchQuery,
      isSearchButtonDisabled, loading } = this.state;

    return (
      <section>
        {loading ? (<Loading />) : (

          <div>
            <div>
              <Header />
            </div>
            <div data-testid="page-search">Search</div>
            <form>
              <label id="page-search" htmlFor="search-products">
                <input
                  type="text"
                  name="search-artist-input"
                  data-testid="search-artist-input"
                  value={ searchQuery }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                type="button"
                disabled={ isSearchButtonDisabled }
                onClick={ this.onSearchButtonClick }
                data-testid="search-artist-button"
              >
                buscar

              </button>
            </form>

          </div>)}
      </section>
    );
  }
}
/* ## 5. Crie o formulário para pesquisar artistas
Este formulário deve conter um input e um botão para
que seja possível pesquisar os álbums de uma banda ou artista.
Crie o formulário dentro do componente `Search`, que é
renderizado na rota `/search`.

  * Crie um campo para pessoa digitar o nome da banda ou
artista a ser pesquisada. Esse campo deve ter o
atributo `data-testid="search-artist-input"`.

  * Crie um botão com o texto `Pesquisar`. Esse botão
deve ter o atributo `data-testid="search-artist-button"`.

  * O botão só deve estar habilitado caso o nome do
artista tenha 2 ou mais caracteres. */
