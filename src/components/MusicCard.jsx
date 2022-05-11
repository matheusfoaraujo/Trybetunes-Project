import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
 state = {
   loading: false,
   favorite: false,
 }

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
   addFavoriteSongCheckBox = async () => {
     const { song } = this.props;
     /* const { musicsList, thisTimeMusic } = this.state; */
     /* const { match: { params: { id } } } = this.props; */
     this.setState({
       loading: true, // faz com que loading seja true e mostre a mensagem de loading enquanto o CreateUser não for chamado.

     });
     await addSong(song);
     this.setState({
       favorite: true,
       loading: false,
     });
   }

   render() {
     const { loading, favorite } = this.state;
     const {
       song,
     } = this.props;
     return (
       <div>
         <p>{ song.trackName }</p>
         {loading ? <Loading /> : (
           <label
             htmlFor={ song.trackId }
           >
             <input
               data-testid={ `checkbox-music-${song.trackId}` }
               type="checkbox"
               checked={ favorite }
               onChange={ this.addFavoriteSongCheckBox }
             />
             Favorita
           </label>)}
         <audio data-testid="audio-component" src={ song.previewUrl } controls>
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
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    favorite: PropTypes.bool,
  }).isRequired,
};
