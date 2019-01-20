import React from 'react'
import BookItem from './BookItem'

function BookShelf(props) {
	return (
		<div>
			{props.shelf.map((shelf) =>
		    <div className="bookshelf" key={shelf.text}>
		      <h2 className="bookshelf-title">{shelf.text}</h2>
		      <div className="bookshelf-books">
		        <BookItem books={props.books}/>
		      </div>
		    </div>
			)}
		</div>
	)
}

export default BookShelf