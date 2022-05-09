import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    return (
      <section>
        <div>
          <Header />
        </div>
        <div data-testid="page-search">Search</div>
      </section>
    );
  }
}
