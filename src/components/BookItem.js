import React from 'react'
import BookShelfChanger from './BookShelfChanger'

function BookItem(props) {
	return (
		<ol className="books-grid">
	    {props.books.map((book) =>
		    <li key={book.id}>
		      <div className="book">
		        <div className="book-top">
		          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.bookcover})` }}></div>
		          <BookShelfChanger book={book} onChangeBookShelf={props.onChangeBookShelf} />
		        </div>
		        <div className="book-title">{book.title}</div>
		        <div className="book-authors">{book.author}</div>
		      </div>
		    </li>
			)}
	  </ol>
	)
}

export default BookItem