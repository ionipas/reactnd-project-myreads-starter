import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import Header from './components/Header'
import SearchPage from './components/SearchPage'

const shelves = [
  {
    "text": "Currently Reading",
    "name": "currentlyReading"
  },
  {
    "text": "Want to Read",
    "name": "wantToRead"
  },
  {
    "text": "Read",
    "name": "read"
  }    
]

class BooksApp extends React.Component {

  state = {
    books: [],
    showSearchPage: false,
    query: '',
    searchResult: false
  }

  hideSearchPage = () => {
    this.setState({ showSearchPage: false })
    this.getBooks()
    this.setState({query: ''})
    this.setState({searchResult: false})
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => { 
      const fetchedBooks = books.map((book) => {   
        return {
          id: book.id,
          title: book.title,
          author: book.authors + '',
          bookcover: book.imageLinks && book.imageLinks.thumbnail,
          shelf: book.shelf
        }
      })
      this.setState({books: fetchedBooks})
    }).catch(error => console.log(error))
  }

  changeBookShelf = (book, event) => {
    const newShelf = event.target.value

    BooksAPI.update(book, newShelf)

    this.setState((state) => {
      const bookToMove = state.books.find((b) => b.id === book.id)
      return {
        books: state.books.filter((b) => b.id !== book.id)
        .concat([{
          id: bookToMove.id,
          title: bookToMove.title,
          author: bookToMove.authors,
          bookcover: bookToMove.bookcover,
          shelf: newShelf
        }])
      }
    })
  }

  updateQuery = (query) => {
    this.setState({query: query})
    this.searchBooks(query)
  }

  searchBooks = (query) => {
    if(query) {     
      BooksAPI.search(query).then((books) => {
          console.log(books)
        const showingBooks = books.map((book) => {
          const bookOnShelf = this.state.books.find((b) => b.id === book.id)
          if (bookOnShelf === undefined) {
            return {
              id: book.id,
              title: book.title,
              author: book.authors && book.authors + '',
              bookcover: book.imageLinks && book.imageLinks.thumbnail,
              shelf: "none"           
            }
          } else {
            return {
              id: bookOnShelf.id,
              title: bookOnShelf.title,
              author: bookOnShelf.author,
              bookcover: bookOnShelf.bookcover,
              shelf: bookOnShelf.shelf              
            }
          }
        })
        this.setState({books: showingBooks})
        this.setState({searchResult: true})
      }).catch(error => console.log(error))
    }
  }
    
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
            <SearchPage 
              hideSearchPage={this.hideSearchPage} 
              query={this.state.query}
              updateQuery={this.updateQuery}
              books={this.state.books}
              searchResult={this.state.searchResult}
              onChangeBookShelf={this.changeBookShelf}
            />
        ) : (
          <div className="list-books">
            <Header />
            <BookShelf 
              shelf={shelves}
              books={this.state.books}
              onChangeBookShelf={this.changeBookShelf}
            />
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
