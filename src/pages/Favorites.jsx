import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    favesongs: [],
  }

  componentDidMount = async () => {
    const faveSongsResponse = await getFavoriteSongs();
    this.setState({ favesongs: faveSongsResponse });
  }

  render() {
    const { favesongs } = this.state;
    return (
      <section>
        <div>
          <Header />
        </div>
        <div data-testid="page-favorites">
          {favesongs.length >= 1 ? favesongs.map((music, index) => (
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
