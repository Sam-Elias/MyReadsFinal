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
      //ARRAY OF BOOK OBJECTS
      books: [],
      searchBooks: [],
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
    const bookChanging= this.state.books.find(book => book.title === title)
    //MAPPING THORUGH THE ARRAY INSIDE PROPERTY BOOKS
    const newBooksArray = this.state.books.map(book => {
      //IF TITLES MATCH
      if (book.title === bookChanging.title) {
        //CHANGE THE SHELF PROPERTY
        book.shelf = newShelf
        BooksAPI.update(book, newShelf)
        }
      return book
    })
    console.log(newBooksArray)
    this.setState({books: newBooksArray})
  }

  getSearchBooks = (query) => {
    BooksAPI.search(query).then(books => this.setState({ searchBooks: books }))
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
                getSearchBooks= {this.getSearchBooks}
                searchBooks= {this.state.searchBooks} />
            )}/>
      </div>
    )
  }
}

export default BooksApp
