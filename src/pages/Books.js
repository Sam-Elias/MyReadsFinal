
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
              <BookShelf 
                shelfTitle="Currently Reading" 
                books= {this.props.books.filter(book => book.shelf === 'currentlyReading')}
                shelfHandler= {this.props.shelfHandler}
              />
              <BookShelf 
                shelfTitle="Want to Read" 
                books= {this.props.books.filter(book => book.shelf === 'wantToRead')}
                shelfHandler= {this.props.shelfHandler}
              />
              <BookShelf 
                shelfTitle="Read" 
                books= {this.props.books.filter(book => book.shelf === 'read')}
                shelfHandler= {this.props.shelfHandler}
              />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
}

export default BooksPage