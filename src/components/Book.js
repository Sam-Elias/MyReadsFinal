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
    this.props.shelfHandler(this.props.book.title, el.target.value);
  }


  render() {
    const cover = `url(${this.props.book.imageLinks.thumbnail})`;
    const title= this.props.book.title;
    const author= this.props.book.authors;
    const shelf= this.props.book.shelf;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: cover}}></div>
            <div className="book-shelf-changer">
              <select 
                defaultValue={shelf} 
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
          <div className="book-title">{title}</div>
          <div className="book-authors">{author}</div>
        </div>
      </li>
    )
  }
}

export default Book