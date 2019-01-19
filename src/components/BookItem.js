import React from 'react'
import BookShelfChanger from './BookShelfChanger'

function BookItem(props) {
	return (
    <li>
    	{props.books.map((book) =>
	      <div className="book" key={book.id}>
	        <div className="book-top">
	          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.bookcover})` }}></div>
	          <BookShelfChanger />
	        </div>
	        <div className="book-title">{book.title}</div>
	        <div className="book-authors">{book.author}</div>
	      </div>
			)}
    </li>
	)
}

export default BookItem