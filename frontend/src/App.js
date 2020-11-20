import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import BookList from "./Components/BookList.js";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="title">
          <h1>P-Lib</h1>
          <h4>Keep track of your book reads</h4>
        </div>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
