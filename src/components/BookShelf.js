import React from 'react'
import BookItem from './BookItem'

function BookShelf(props) {
	return (
		<div className="list-books-content">
			{props.shelf.map((shelf) =>
				<div key={shelf.name}>
			    <div className="bookshelf">
			      <h2 className="bookshelf-title">{shelf.text}</h2>
			      <div className="bookshelf-books">
			        <BookItem 
			        	books={props.books.filter((book) => book.shelf === shelf.name)} 
			        	shelf={props.shelf}
			        	onChangeBookShelf={props.onChangeBookShelf}
			        />
			      </div>
			    </div>
				</div>
			)}
		</div>
	)
}

export default BookShelf