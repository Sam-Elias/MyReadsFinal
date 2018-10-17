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

  findBook = (book) => {
    const bookFound = this.state.books.find(books => books.id === book.id)
    return bookFound
  }

  shelfHandler = (book, newShelf) => {
    const bookFound= this.findBook(book)
    if (bookFound) {
      if (newShelf === 'none') {
        const newBooksArray = this.state.books.filter(books => books.id !== bookFound.id)
        this.setState({ books: newBooksArray })
      } else {
        const newBooksArray = this.state.books.map(book => {
          if (book.id === bookFound.id) {
            book.shelf = newShelf
            BooksAPI.update(book, newShelf)
            }
            return book
          })
          console.log(newBooksArray)
          this.setState({books: newBooksArray})
        }}}

  bookAdder = (book) => {
    const bookAdding= this.findBook(book)
    if (!bookAdding) {this.setState({books: this.state.books.concat(book)})}
    else {console.log(`already here`)}
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
                bookAdder= {this.bookAdder}
                books= {this.state.books}
              />
            )}/>
      </div>
    )
  }
}

export default BooksApp
