import React from "react";

export const Book = ({ book }) => {
  return (
    <div className="book">
      <div data-testid="book-title" className="title">
        {book.title}
      </div>
      <div data-testid="book-summary" className="summary">
        {book.summary}
      </div>
      <h4 data-testid="book-author">
        <hr />
        {book.author.author}
      </h4>
    </div>
  );
};

const DisplayBooks = ({ books }) => {
  return (
    <div data-testid="book-container" className="bookContainer">
      {books.map(book => (
        <Book key={book.title} book={book} />
      ))}
    </div>
  );
};

export default DisplayBooks;
