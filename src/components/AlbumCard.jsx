import propTypes from 'prop-types';
import React, { Component } from 'react';

export default class AlbumCard extends Component {
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
    const { collectionId,
      artistName,
      collectionName,
      albumImage,
      trackCount } = this.props;
    return (
      <div id={ collectionId }>
        <p>{ artistName }</p>
        <p>{ collectionName }</p>

        <img src={ albumImage } alt={ artistName } />

        <p>{trackCount}</p>
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
AlbumCard.propTypes = {
  collectionId: propTypes.number.isRequired,
  artistName: propTypes.string.isRequired,
  collectionName: propTypes.string.isRequired,
  albumImage: propTypes.string.isRequired,
  trackCount: propTypes.number.isRequired,
};
/* artistId: 12,
      artistName: "Artist Name",
      collectionId: 123,
      collectionName: "Collection Name",
      collectionPrice: 12.25,
      artworkUrl100: "https://url-to-image",
      releaseDate: "2012-03-02T08:00:00Z",
      trackCount: 8, */
