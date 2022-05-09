import React, { Component } from 'react';
import Header from '../components/Header';

export default class Favorites extends Component {
  render() {
    return (
      <section>
        <div>
          <Header />
        </div>
        <div data-testid="page-favorites">Favorites</div>
      </section>
    );
  }
}
