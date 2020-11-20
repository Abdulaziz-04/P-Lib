const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const gqlschema = require("./backend/GQLSchema.js");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;
//Connecting to the database
mongoose.connect(
    gqlClusterDBURL, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to mongoDB");
    }
);
//Access to data somewhere other than the origin (access from other server)
app.use(cors());
//GraphQL middleware to deal with hassle of REST apis
//set graphiql to true to access GUI
app.use(
    "/graphql",
    graphqlHTTP({
        schema: gqlschema,
        graphiql: true,
    })
);
//port and listener service
app.listen(port, () => {
    console.log(`listening to port ${port}`);
});