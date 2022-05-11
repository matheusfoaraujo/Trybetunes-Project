import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicsList: { /* details: null */ },
      artist: '',
      album: '',
      /* thisTimeMusic: '', */
    };
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const albumMusics = await getMusics(id);
    const { artistName, collectionName } = albumMusics[0];
    this.setState({
      musicsList: albumMusics,
      artist: artistName,
      album: collectionName,
    });
  }

  /* addFavoriteSongCheckBox = async ({ target }) => {
    const { musicsList, thisTimeMusic } = this.state;
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true, // faz com que loading seja true e mostre a mensagem de loading enquanto o CreateUser não for chamado.

    });
    const newMusics = musicsList.map((music) => {
      if (target.checked && music.collectionId === Number(id)) {
        music.favorite = true;
        this.setState({
          thisTimeMusic: music,
        });
      } else {
        music.favorite = false;
      }
      return music;
    });
    await addSong(thisTimeMusic);
    this.setState({
      musicsList: newMusics,
      loading: false,
    });
  } */

  /* addFavoriteSongCheckBox = async () => {
    this.setState({
      loading: true, // faz com que loading seja true e mostre a mensagem de loading enquanto o CreateUser não for chamado.

    });
    const newMusics = musicsList.map((music) => {
      if (target.checked && music.collectionId === Number(id)) {
        music.favorite = true;
        this.setState({
          thisTimeMusic: music,
        });
      } else {
        music.favorite = false;
      }
      return music;
    });
    await addSong(song);
    this.setState({
      loading: false, // para de mostrar a mensagem do loading
    });
  }
*/

  render() {
    const { musicsList, artist, album } = this.state;
    return (
      <section>
        <div>
          <Header />
        </div>
        <div
          data-testid="page-album"
        >
          <h2 data-testid="artist-name">{ artist }</h2>
          <h3 data-testid="album-name">{ album }</h3>
          {musicsList.length >= 1 ? musicsList.map((music, index) => (
            <div key={ index }>
              {music.trackName
                ? (
                  <div>
                    <MusicCard
                      song={ music }
                    />

                  </div>)
                : ''}
            </div>
          ))
            : ''}

        </div>

      </section>
    );
  }
}
Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }),
}.isRequired;
