import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { addBookMutation, getBooksQuery } from "./Queries.js";

const AddBook = () => {
  const [bookName, setbookName] = useState("");
  const [genreName, setgenreName] = useState("");
  const [authorName, setauthorName] = useState("");
  const [exbookMutation] = useMutation(addBookMutation);

  return (
    <div id="add-book">
      <form
        onSubmit={(e) => {
          if (bookName === "" || authorName === "" || genreName === "") {
            return alert("Please fill all fields");
          }
          e.preventDefault();
          exbookMutation({
            variables: {
              name: bookName,
              genre: genreName,
              author: authorName,
            },
            refetchQueries: [{ query: getBooksQuery }],
          });
          setbookName("");
          setauthorName("");
          setgenreName("");
        }}>
        <div>
          <h2>Add a new Book ...</h2>
          <label htmlFor="bookName">Name : </label>
          <input
            id="bookName"
            size="30"
            type="text"
            value={bookName}
            onChange={(e) => setbookName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bookGenre">Genre : </label>
          <input
            id="bookGenre"
            type="text"
            size="30"
            value={genreName}
            onChange={(e) => setgenreName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="authorName">Author :</label>
          <input
            id="authorName"
            size="30"
            type="text"
            value={authorName}
            onChange={(e) => setauthorName(e.target.value)}
          />
        </div>
        <input type="submit" value="Add Book" id="add-button" />
      </form>
    </div>
  );
};

export default AddBook;
