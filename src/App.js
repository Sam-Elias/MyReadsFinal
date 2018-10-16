import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksPage from './pages/Books'
import SearchPage from './pages/Search';

class BooksApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //ARRAY OF BOOK OBJECTS
      books: [],
      showSearchPage: false
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
  render() {
    return (
      <div className="app">
      {console.log(this.state.books)} {this.test()}
        {this.state.showSearchPage ? (
          
          <SearchPage />
        ) : (
          <BooksPage 
            books={this.state.books}
            shelfHandler= {this.shelfHandler}
          />
          
        )}
      </div>
    )
  }
}

export default BooksApp
