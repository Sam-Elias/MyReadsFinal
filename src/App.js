import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksPage from './pages/Books'
import SearchPage from './pages/Search';

class BooksApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      showSearchPage: false
    }
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => this.setState({ books: books }))
      .catch(err => { });
  }


  render() {
    return (
      <div className="app">
      {console.log(this.state.books)}
        {this.state.showSearchPage ? (
          
          <SearchPage  />
        ) : (
          <BooksPage />
          
        )}
      </div>
    )
  }
}

export default BooksApp
