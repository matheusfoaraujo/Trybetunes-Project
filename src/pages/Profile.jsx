import React, { Component } from 'react';
import Header from '../components/Header';

export default class Profile extends Component {
  render() {
    return (
      <section>
        <div>
          <Header />
        </div>
        <div data-testid="page-profile">Profile</div>
      </section>
    );
  }
}
