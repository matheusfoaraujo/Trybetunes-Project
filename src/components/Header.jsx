import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            <div>
              <Link
                to="/search"
                data-testid="link-to-search"
                className="search button"
              >
                Search

              </Link>
            </div>
            <div>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="search button"
              >
                Favorites

              </Link>
            </div>
            <div>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="search button"
              >
                Profile

              </Link>
            </div>
            <div>
              <h2 data-testid="header-user-name">
                {loggedUser.name}
              </h2>
            </div>
          </header>
        )}
      </div>
    );
  }
}
