// const express = require('express');
// const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');



const { ApolloServer } =require( '@apollo/server');
const { startStandaloneServer } =require ('@apollo/server/standalone');

const typeDefs = `#graphql
  
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation{
    createBook(title:String, author:String ) : Book
  }
`;

// const books = [
//   {
//     title: 'The Awakening',
//     author: 'Kate Chopin',
//   },
//   {
//     title: 'City of Glass',
//     author: 'Paul Auster',
//   },
// ];
const User = require("./models/User")

const resolvers = {
  Query: {
    books: () => {

      books
    },
  },
  Mutation:{
    createBook:async(parent, params, contextValue, info)=>{
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: params } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});



const initializeApolloServer = async ()=>{
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
};
initializeApolloServer()
// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
