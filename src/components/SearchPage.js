import React from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem'

function SearchPage(props) {
	return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/"><button className="close-search" onClick={ props.onHideSearchPage }>Close</button></Link>
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