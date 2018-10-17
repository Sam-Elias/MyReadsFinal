
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from '../components/Book'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchBooks: []
    }
   
  }

  handleInput = (query) => {
    this.getSearchBooks(query.target.value);
  }
  
  getSearchBooks = (query) => {
    BooksAPI.search(query)
    .then(searchBooks => {if (!searchBooks) {this.setState({ searchBooks: [] })}
                          else if (searchBooks.error) {this.setState({ searchBooks: [] })}
                          else { searchBooks.map(book => {
                                  const matchedBook = this.matchSearchBooks(book)
                                  if (matchedBook) {
                                    book.shelf = matchedBook.shelf
                                    }})
                                  this.setState({ searchBooks: searchBooks})}
    })          
    .catch(err => console.log(err))
  }

  matchSearchBooks = (book) => {
    const match = this.props.books.find(books => books.id === book.id)
    return match
  }

  pushSearchBooks = (book, shelf) => {
    book.shelf= shelf
    this.props.bookAdder(book)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" > Close </Link>
            <div className="search-books-input-wrapper">
              <input type="text" onChange={this.handleInput} placeholder="Search by title or author"/>
            </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.map( book => <Book
                                         book= {book}
                                         shelfHandler= {this.props.shelfHandler}
                                         key= {book.id}
                                         pushSearchBooks= {this.pushSearchBooks}
              />)}
            
          </ol>
        </div>
      </div>
        )
    }
}

export default SearchPage