
import React, { Component } from 'react'
import Book from './Book'


class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.books.map( 
            book => <Book
                      cover= {`url(${book.imageLinks.thumbnail})`}
                      title= {book.title}
                      author= {book.authors}
                      shelf= {book.shelf}
                      key= {book.id}
                    />)}
            
          </ol>
        </div>
      </div>
    )
  }    
}

export default BookShelf

  
