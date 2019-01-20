import React from 'react'

function BookShelfChanger(props) {
  return(
    <div className="book-shelf-changer">
      <select value={props.book.shelf} onChange={(event) => props.onChangeBookShelf(props.book, event)} >
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

export default BookShelfChanger