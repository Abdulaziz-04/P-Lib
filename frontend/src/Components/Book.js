import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getSelectedBook } from "./Queries.js";

const Book = ({ bookId }) => {
  const { loading, error, data } = useQuery(getSelectedBook, {
    variables: { id: bookId },
  });
  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Fetching Details...</h1>;
  } else {
    if (data != null && data.book != null) {
      const { book } = data;
      return (
        <div id="book-details">
          <div id="book-nga">
            <h1>Name : {book.name}</h1>
            <h2>Genre :{book.genre}</h2>
            <h2>Author : {book.author.name}</h2>
          </div>
          <div id="more">
            <h2>More from this author:</h2>
            <ul>
              {book.author.books.map((bk) => {
                return <li key={bk.id}>{bk.name}</li>;
              })}
            </ul>
          </div>
        </div>
      );
    }
  }
  return <div></div>;
};
export default Book;
