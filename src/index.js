
import express from "express";
import { ApolloServer } from 'apollo-server-express';
const connectDB = require('./config/db.js');
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
require("dotenv").config();


const app = express();
const port = process.env.SERVER_PORT;

// Connect to MongoDB
connectDB();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV !== 'production',
});

server.start().then(res => {
  server.applyMiddleware({ app });

  // Middleware
  app.use(express.json());

  // Routes
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  // Start server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`GraphQL server ready at http://localhost:${port}${server.graphqlPath}`);
  });
});
