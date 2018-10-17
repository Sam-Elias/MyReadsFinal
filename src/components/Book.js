import React, { Component } from 'react'


class Book extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shelf: this.props.shelf
    }
  }
 
  handleChange(el) {
    this.setState({ shelf: el.target.value });
    if(!this.props.pushSearchBooks) {this.props.shelfHandler(this.props.book, el.target.value)}
    if(this.props.pushSearchBooks) {this.props.pushSearchBooks(this.props.book, el.target.value)}
  }

  render() {
    const style = { width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ""})`}
    const title= this.props.book.title
    const author= this.props.book.authors
    const shelf= this.props.book.shelf

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={ style }></div>
            <div className="book-shelf-changer">
              <select 
                defaultValue={shelf? shelf : 'none'} 
                onChange={shelf => this.handleChange(shelf)}
              >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title? title : 'Unknown title'}</div>
          <div className="book-authors">{author? author : 'Unknown author'}</div>
        </div>
      </li>
    )
  }
}

export default Book