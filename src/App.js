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
    books: [
/*      {
        id: "To Kill a Mockingbird",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        bookcover: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
      },
      {
        id: "Ender's Game",
        title: "Ender's Game",
        author: "Orson Scott Card",
        bookcover: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
      },
      {
        id: "1776",
        title: "1776",
        author: "David McCullough",
        bookcover: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"
      },
      {
        id: "Harry Potter and the Sorcerer's Stone",
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        bookcover: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"
      },
      {
        id: "The Hobbit",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        bookcover: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
      },
      {
        id: "Oh, the Places You'll Go!",
        title: "Oh, the Places You'll Go!",
        author: "Seuss",
        bookcover: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"
      },
      {
        id: "The Adventures of Tom Sawyer",
        title: "The Adventures of Tom Sawyer",
        author: "Mark Twain",
        bookcover: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api"
      }*/
    ],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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
      console.log(book)        
        return {
          id: book.id,
          title: book.title,
          author: book.authors,
          bookcover: book.imageLinks.thumbnail,
          shelf: book.shelf
        }
      })
      this.setState({books: fetchedBooks})
      console.log(fetchedBooks)
    })
  }

  changeBookShelf = (book, event) => {
    const newShelf = event.target.value

    BooksAPI.update(book, newShelf)

    this.setState((state) => {
      const bookToMove = state.books.find((b) => b.id === book.id)
      console.log(bookToMove)
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

/*  searchBooks = (query) => {
    if(query) {     
      BooksAPI.search(query).then((books) => {
        const showingBooks = books.map((book) => {
          return {
            id: book.id,
            title: book.title,
            author: book.authors,
            bookcover: book.imageLinks.thumbnail,
            shelf: "none"           
          }
        })
        this.setState({books: showingBooks})
        this.setState({searchResult: true})
        console.log(showingBooks)
      })
    }
  }*/

  searchBooks = (query) => {
    if(query) {     
      BooksAPI.search(query).then((books) => {
        const showingBooks = books.map((book) => {
          const bookOnShelf = this.state.books.find((b) => b.id === book.id)
          if (bookOnShelf === undefined) {
            return {
              id: book.id,
              title: book.title,
              author: book.authors,
              bookcover: book.imageLinks.thumbnail,
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
      })
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
