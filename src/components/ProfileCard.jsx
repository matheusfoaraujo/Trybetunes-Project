import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileCard extends Component {
  render() {
    const { userName,
      userEmail,
      userImage,
      userDescription,
      isSaveButtonDisabled,
      onSaveButtonClick,
      onInputChange } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="userName"
              name="userName"
              data-testid="edit-input-name"
              value={ userName }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              data-testid="edit-input-email"
              value={ userEmail }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="Image">
            Image:
            <input
              name="userImage"
              id="Image"
              type="text"
              data-testid="edit-input-image"
              value={ userImage }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              type="text"
              id="userDescription"
              name="userDescription"
              data-testid="edit-input-description"
              value={ userDescription }
              onChange={ onInputChange }
            />
          </label>
          <button
            type="submit"
            name="saveButton"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
            data-testid="edit-button-save"
          >
            Save

          </button>
        </form>

      </div>
    );
  }
}
ProfileCard.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  userDescription: PropTypes.string.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default ProfileCard;
