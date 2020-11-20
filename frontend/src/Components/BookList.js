import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Book from "./Book.js";
import AddBook from "./AddBook.js";
import { getBooksQuery, deleteSelectedBook } from "./Queries.js";

const BookList = () => {
  const [deleteBook] = useMutation(deleteSelectedBook);
  const [selected, setId] = useState(null);
  const displayBooks = () => {
    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) {
      return <h1 style={{ textAlign: "center" }}>Fetching Books...</h1>;
    } else {
      return data.books.map((book) => {
        return (
          <li
            key={book.id}
            onClick={(e) => {
              setId(book.id);
            }}>
            {book.name}
            <i
              className="fa fa-trash"
              onClick={() => {
                deleteBook({
                  variables: { id: book.id },
                  refetchQueries: [{ query: getBooksQuery }],
                });
              }}></i>
          </li>
        );
      });
    }
  };

  return (
    <div>
      <h2>List of Books Abdul has read so far...</h2>
      <ul id="books-list">{displayBooks()}</ul>
      <Book bookId={selected} />
      <AddBook />
    </div>
  );
};

export default BookList;
