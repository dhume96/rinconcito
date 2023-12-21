/*import { gql } from '@apollo/server';

export default gql`
  extend type Query {
    products(cursor: String, limit: Int): ProductConnection!
    product(id: ID!): Product!
  }

  extend type Mutation {
    createProductAdmin(name: String!, store: String!, dateAdded: String!, quantity: Int!, unitPrice: Float!, pic: String!): Product!
    updateProduct(id: ID!, name: String, store: String, quantity: Int, unitPrice: Float, pic: String): Product!
  }

  type ProductConnection {
    edges: [Product!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Product {
    id: ID!
    name: String!
    store: String!
    dateAdded: String!
    quantity: String!
    unitPrice: String!
    pic: String!
  }
`;*/

export default `#graphql
  type Query {
    products(cursor: String, limit: Int): ProductConnection!
    product(id: ID!): Product!
  }

  type Mutation {
    createProductAdmin(name: String!, store: String, dateAdded: String!, quantity: Int!, unitPrice: Float!, pic: String!): Product!
    updateProduct(id: ID!, name: String, store: String, quantity: Int, unitPrice: Float, pic: String): Product!
  }

  type ProductConnection {
    edges: [Product!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Product {
    id: ID!
    name: String!
    store: String!
    dateAdded: String!
    quantity: String!
    unitPrice: String!
    pic: String!
  }
`;
