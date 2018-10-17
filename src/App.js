import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksPage from './pages/Books'
import SearchPage from './pages/Search'
import { Route } from 'react-router-dom'

class BooksApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
    }
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => this.setState({ books: books }))
      .catch(err => { });
  }

  test = () => {
    this.state.books.map( book => console.log(book.title)) 
  }

  shelfHandler = (title, newShelf) => {
    console.log(title + "  to  " + newShelf )
    const bookChanging= this.state.books.find(book => book.title === title);
    if (bookChanging) {
      const newBooksArray = this.state.books.map(book => {
        if (book.title === bookChanging.title) {
          book.shelf = newShelf
          BooksAPI.update(book, newShelf)
          }
        return book
      })
      this.setState({books: newBooksArray})
    } else {
      console.log('else')
    }
  }

  bookPageAdder = (book) => {
    console.log(book)
  }

  render() {
    return (
      <div className="app">
          <Route 
            exact
            path= "/"
            render= {() => (
              <BooksPage 
                books={this.state.books}
                shelfHandler= {this.shelfHandler}
              />
            )}/>
          <Route
            path= "/search"
            render= {() => (
              <SearchPage
                shelfHandler= {this.shelfHandler}
              />
            )}/>
      </div>
    )
  }
}

export default BooksApp
