import React from 'react'
import BookItem from './BookItem'

function BookShelf(props) {
	return (
		<div>
			{props.shelf.map((shelf) =>
		    <div className="bookshelf" key={shelf.name}>
		      <h2 className="bookshelf-title">{shelf.text}</h2>
		      <div className="bookshelf-books">
		        <BookItem 
		        	books={props.books.filter((book) => book.shelf === shelf.name)} 
		        	shelf={props.shelf} 
		        />
		      </div>
		    </div>
			)}
		</div>
	)
}

export default BookShelf