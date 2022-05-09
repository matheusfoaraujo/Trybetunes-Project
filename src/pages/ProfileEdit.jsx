import React, { Component } from 'react';
import Header from '../components/Header';

export default class ProfileEdit extends Component {
  render() {
    return (
      <section>
        <div>
          <Header />
        </div>
        <div data-testid="page-profile-edit">ProfileEdit</div>
      </section>
    );
  }
}
