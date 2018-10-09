
import React, { Component } from 'react';
import BookShelf from '../components/BookShelf'

class BooksPage extends Component {
    render() {

        return (
          <div className="list-books">
          
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <BookShelf shelfTitle="Currently Reading" />
              <BookShelf shelfTitle="Want to Read" />
              <BookShelf shelfTitle="Read" />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
}

export default BooksPage