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
    };
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const albumMusics = await getMusics(id);
    const { artistName, collectionName } = albumMusics[0];
    console.log(albumMusics);
    this.setState({
      musicsList: albumMusics,
      artist: artistName,
      album: collectionName,
    });
  }

  // handleInputChange = ({ target }) => {
  //   const { value } = target;
  //   this.setState(() => ({ searchInput: value }));
  // }

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
                    {' '}
                    <MusicCard
                      trackName={ music.trackName }
                      audioPreview={ music.previewUrl }
                    />
                    {' '}

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
