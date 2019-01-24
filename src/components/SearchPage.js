import React from 'react'
import BookItem from './BookItem'

function SearchPage(props) {
	return(
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={ props.hideSearchPage }>Close</button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={props.query}
            onChange={(event) => props.updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {props.searchResult && props.query && <BookItem books={props.books} onChangeBookShelf={props.onChangeBookShelf} />}
      </div>
    </div>
	)
}

export default SearchPage