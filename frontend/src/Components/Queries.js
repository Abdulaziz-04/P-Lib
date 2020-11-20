import { gql } from "@apollo/client";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $author: String!) {
    addBook(name: $name, genre: $genre, author: $author) {
      name
    }
  }
`;

const getSelectedBook = gql`
  query($id: ID!) {
    book(id: $id) {
      name
      genre
      author {
        name
        age
        books {
          name
          genre
        }
      }
    }
  }
`;

const deleteSelectedBook = gql`
  mutation($id: ID!) {
    deleteBook(id: $id) {
      name
    }
  }
`;
export { getBooksQuery, addBookMutation, getSelectedBook, deleteSelectedBook };
