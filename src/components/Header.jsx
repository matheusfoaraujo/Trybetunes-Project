import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loggedUser: '',
      loading: true,
    };
  }

  componentDidMount = async () => {
    const user = await getUser();
    this.setState({
      loggedUser: user,
      loading: false,
    });
  };

  render() {
    const { loggedUser, loading } = this.state;
    return (
      <div>
        {loading ? (<Loading />) : (

          <header data-testid="header-component">
            <h2 data-testid="header-user-name">
              {loggedUser.name}
            </h2>
          </header>
        )}
      </div>
    );
  }
}
