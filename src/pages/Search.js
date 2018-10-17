
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from '../components/Book'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchBooks: [],
      matchedBooksn:[]
    }
   
  }

  inputHandler = (query) => {
    console.log(query.target.value)
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
              {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" onChange={this.inputHandler} placeholder="Search by title or author"/>
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