# MyReads
***
*Udacity | Front End Web Developer Nanodegree | Project 6: MyReads*
***

This project is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. 

### About this project
The project emphasizes using React to build the application.
I was provided a starter code that contains all the CSS and a static HTML markup but omits the React code that is required to complete the project. I was also provided with an API server and client library that I will use to persist information on interaction with the application.

### App Functionality
##### Main Page
- The main page shows 3 shelves for books. Each book is shown on the correct shelf, along with its title and all of its authors.
- The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance. The functionality of moving a book to a different shelf works correctly.
- When the browser is refreshed, the same information is displayed on the page.

##### Search Page
- As the user types into the search field, books that match the query are displayed on the page, along with their titles and authors.
- Search results are not shown when all of the text is deleted out of the search input box.
- Invalid queries are handled and prior search results are not shown.
- The search works correctly when a book does not have a thumbnail or an author. (To test this, try searching for "poetry" and "biography").
- Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.
- If a book is assigned to a shelf on the main page and that book appears on the search page, the correct shelf should be selected on the search page. The option "None" should be selected if a book has not been assigned to a shelf.
- When an item is categorized on the search page and the user navigates to the main page, it appears on that shelf in the main page.

##### Routing
- The main page contains a link to the search page. When the link is clicked, the search page is displayed and the URL in the browser’s address bar is /search.
- The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is /.


### How to run this project

1. Clone the repository using the Web URL `https://github.com/ionipas/reactnd-project-myreads-starter.git`
2. From inside the new directory: 
     - install all project dependencies with `npm install`
     - start the development server with `npm start`
3. Visit the site in your browser at `http://localhost:3000/`

### Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

### Built using

- HTML
- CSS
- JavaScript
- React