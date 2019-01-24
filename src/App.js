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
    searchResult: false,
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    this.getBooks()
    this.saveShelf()
  }

  hideSearchPage = () => {
    this.setState({ showSearchPage: false })
    this.getBooks()
    this.setState({query: ''})
    this.setState({searchResult: false})
  }

  showSearchPage = () => {
    this.setState({ showSearchPage: true })
    this.setState({books: []})
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
    this.saveShelf()
  }

  saveShelf = () => {
    BooksAPI.getAll().then((books) => {
      const currentlyReading = books.filter((book) => book.shelf === "currentlyReading")
      .map((book) => {
        return {
          id: book.id
        }
      })
      const wantToRead = books.filter((book) => book.shelf === "wantToRead")
      .map((book) => {
        return {
          id: book.id
        }
      })
      const read = books.filter((book) => book.shelf === "read")
      .map((book) => {
        return {
          id: book.id
        }
      })
      this.setState({currentlyReading: currentlyReading})
      this.setState({wantToRead: wantToRead})
      this.setState({read: read})
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
    this.saveShelf()
  }

  updateQuery = (query) => {
    this.setState({query: query})
    this.setState({books: []})
    this.searchBooks(query)
  }

  searchBooks = (query) => {
    if(query) {
      BooksAPI.search(query).then((books) => {
        const showingBooks = books.map((book) => {
          const bookOnCurrentlyReading = this.state.currentlyReading.find((s) => s.id === book.id)
          const bookOnWantToRead = this.state.wantToRead.find((s) => s.id === book.id)
          const bookOnRead = this.state.read.find((s) => s.id === book.id)
          if (bookOnCurrentlyReading !== undefined) {
              return {
                id: book.id,
                title: book.title,
                author: book.authors && book.authors + '',
                bookcover: book.imageLinks && book.imageLinks.thumbnail,
                shelf: "currentlyReading"
              }
          } else if (bookOnWantToRead !== undefined) {
            return {
              id: book.id,
              title: book.title,
              author: book.authors && book.authors + '',
              bookcover: book.imageLinks && book.imageLinks.thumbnail,
              shelf: "wantToRead"
            }
          } else if (bookOnRead !== undefined) {
            return {
              id: book.id,
              title: book.title,
              author: book.authors && book.authors + '',
              bookcover: book.imageLinks && book.imageLinks.thumbnail,
              shelf: "read"
            }
          } else {
            return {
              id: book.id,
              title: book.title,
              author: book.authors && book.authors + '',
              bookcover: book.imageLinks && book.imageLinks.thumbnail,
              shelf: "none"
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
              <button onClick={this.showSearchPage}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
