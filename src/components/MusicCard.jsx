import propTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  /* addToFavorite = () => {
     const { collectionId,
       artistName,
       collectionName,
       albumImage,
       trackCount } = this.props;
     const albumFavorite = {
       collectionId, artistName, collectionName, albumImage, trackCount };
     const recoveredAlbum = JSON.parse(localStorage.getItem('FavAlbum')) || [];
     recoveredAlbum.push(albumFavorite);
     localStorage.setItem('FavAlbum', JSON.stringify(recoveredAlbum));
   } */

  render() {
    const {
      trackName, previewUrl,
    } = this.props;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {/* <button
           type="button"
           onClick={ this.addToFavorite }
         >
           Fav
         </button> */}
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
};
