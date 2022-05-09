import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      searchQuery: '',
      result: '',
      isSearchButtonDisabled: true,
      loading: false,
    };
  }

  onInputChange = ({ target }) => { // desconstroi o evento pegando o target, o node que está sendo modificado
    const { value } = target; // desconstroi o valor de dentro do target que está sendo modificado
    this.setState({ searchQuery: value }, () => {
      // callback que pega os valores do estado já atualizados pelo onChange
      const { searchQuery } = this.state;
      const minChar = 1;
      if (searchQuery.length > minChar) {
        this.setState({ isSearchButtonDisabled: false });
      } else {
        this.setState({ isSearchButtonDisabled: true });
      }
    });
  }

  onSearchButtonClick = () => {
    const { searchQuery } = this.state;
    this.setState({
      loading: true, // faz com que loading seja true e mostre a mensagem de loading enquanto o CreateUser não for chamado.

    });
    this.fetchAlbum();
    this.setState({
      loading: false, // para de mostrar a mensagem do loading
      searchQuery: '',
      result: searchQuery,
    });
  }

fetchAlbum = async () => {
  const { searchQuery } = this.state;
  const albumsList = await searchAlbumsAPI(searchQuery);
  this.setState({
    albums: [...albumsList],
  });
}

render() {
  const { searchQuery,
    isSearchButtonDisabled, loading, albums, result } = this.state;

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
          <div>
            {albums.length > 0 ? (

              <h1>

                { `Resultado de álbuns de: ${result}` }

              </h1>) : '' }
          </div>
          <div id="Results">

            {albums.length >= 1 ? albums.map((album, index) => (
              <div key={ index }>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <AlbumCard
                    artistId={ album.artistId }
                    artistName={ album.artistName }
                    collectionId={ album.collectionId }
                    collectionName={ album.collectionName }
                    albumImage={ album.artworkUrl100 }
                    trackCount={ album.trackCount }
                  />
                </Link>
              </div>
            )) : (
              <h3>
                Nenhum álbum foi encontrado
              </h3>)}
          </div>
        </div>)}
    </section>
  );
}
}
/* ## 6. Faça a requisição para pesquisar artistas
Com a estrutura da tela de pesquisa criada,
agora é hora de fazer uma requisição e receber
a lista de álbums da banda ou artista pesquisada.

  * Ao clicar no botão de `Pesquisar`,
limpe o valor do input e faça uma requisição utilizando
a função do arquivo `searchAlbumsAPIs.js`. Lembre-se que
essa função espera receber uma string com o nome da banda
ou artista.

  * Enquanto aguarda a resposta da API, esconda o input e
o botão de pesquisa e exiba a mensagem `Carregando...` na tela.

  * Após receber a resposta da requisição exibir na tela o
texto `Resultado de álbuns de: <artista>`, onde `<artista>`
é o nome que foi digitado no input.

  * Liste os álbuns retornados. A API irá retorna um *array*
de objetos. Cada objeto terá a seguinte estrutura:
  ```
  [
    {
      artistId: 12,
      artistName: "Artist Name",
      collectionId: 123,
      collectionName: "Collection Name",
      collectionPrice: 12.25,
      artworkUrl100: "https://url-to-image",
      releaseDate: "2012-03-02T08:00:00Z",
      trackCount: 8,
    }
  ]

  ```

  * Ao listar os álbuns, crie um link em cada card para
  redirecionar para a página do álbum. Este link deve ter
  o atributo ```data-testid={`link-to-album-${collectionId}`}```.
  Onde `collectionId` é o valor da propriedade de cada Álbum.

  * Este link deve redirecionar para a rota `/album/:id`,
  onde `:id` é o valor da propriedade `collectionId` de
  cada Álbum da lista recebida pela API.

  * Se nenhum álbum for encontrado para o nome pesquisado,
  a API irá retornar um array vazio. Nesse caso, a mensagem
  `Nenhum álbum foi encontrado` deverá ser exibida.

  ![requisito-6_1](images/requisito6_1.gif)
  ![requisito-6_2](images/requisito6_2.gif) */
