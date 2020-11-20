const graphql = require("graphql");
const {
    GraphQLString,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;
const { Book, Author } = require("./MongoSchema.js");

//args : The arguments to be passed
//resolve(parent,args) is a function to fetch data from database where parent is object itself

//Creating GraphQL object type Author
const authorSchema = new GraphQLObjectType({
    //name field to use in graphiql
    name: "Author",
    //fields is used as function because on runtime,issues arise as books and authors are interdependent on each other
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        books: {
            //List of books of particular author,find by matching parent name with author property of books
            type: new GraphQLList(bookSchema),
            resolve(parent, args) {
                return Book.find({ author: parent.name });
                //filter book array
            },
        },
    }),
});

//Creating GraphQL object type Book
const bookSchema = new GraphQLObjectType({
    //name field to use in graphiql
    name: "Book",
    //fields is used as function because on runtime,issues arise as books and authors are interdependent on each other
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        author: {
            //Accessing the authorSchema type to get the author details as well,if not avaialble returns null
            type: authorSchema,
            resolve(parent, args) {
                return Author.findOne({ name: parent.author });
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    //The basic Accessible queries must be included here
    name: "RootQuery",
    fields: {
        //Single book object
        book: {
            type: bookSchema,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Book.findById(args.id);
            },
        },
        //Single Author object
        author: {
            type: authorSchema,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                Author.findById(args.id);
            },
        },
        //Book Array
        books: {
            type: new GraphQLList(bookSchema),
            resolve(parent, args) {
                return Book.find({});
            },
        },
        //Author Array
        authors: {
            type: new GraphQLList(authorSchema),
            resolve(parent, args) {
                return Author.find({});
            },
        },
    },
});

//Modifications to data require mutations
const Mutations = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        addAuthor: {
            type: authorSchema,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                let newAuthor = new Author({ name: args.name, age: args.age });
                return newAuthor.save();
            },
        },
        updateAuthor: {
            type: authorSchema,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                return Author.findOneAndUpdate({ name: args.name }, { age: args.age }, { new: true });
            },
        },
        deleteBook: {
            type: bookSchema,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return Book.findByIdAndDelete(args.id);
            },
        },
        addBook: {
            type: bookSchema,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                genre: { type: GraphQLNonNull(GraphQLString) },
                author: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                //to avoid duplicate entries use find and update/delete
                const avail = await Book.findOne({
                    name: args.name,
                    author: args.author,
                });
                if (avail) {
                    await Book.findOneAndDelete({ name: args.name, author: args.author });
                }
                let newBook = new Book({
                    name: args.name,
                    genre: args.genre,
                    author: args.author,
                });
                let newAuthor = new Author({
                    name: args.author,
                    //add new author with age being zero if not available
                    age: 0,
                });
                newAuthor.save();
                return newBook.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations,
});