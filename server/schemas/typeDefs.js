import { gql } from 'apollo-server-express'

const typeDefs = gql`
    type User {
        id: ID
        name: String
        email: String
        password: String
    }
    type Transaction {
        id: ID
        userId: ID
        cost: String
    }
    type Product {
        id: ID
        name: String
        price: String
        description: String
        category: String
        rating: String
        supply: String

    }
    type Query {
        getAllUsers: [User]
        getAllTransactions: [Transaction]
        getAllProducts: [Product]
    }
    type Mutation {
        createUser(name: String!, email: String!, password: String!, city: String, state: String, country: String, company: String, phoneNumber: String): User
        createProduct(name: String, price: Int, description: String, category: String, rating: Int, supply: Int): Product
        createTransaction(userId: String, cost: Int): Transaction
        deleteProduct(id: String): Product
        deleteTransaction(id: String): Transaction
        deleteUser(id: String): User
        updateUser(id: ID!, email: String!): User
        updateProduct(id: ID!, name: String, price: Int, description: String, category: String, rating: Int, supply: Int): Product
        updateTransaction(id: ID!, cost: Int): Transaction
    }
`
export default typeDefs;
