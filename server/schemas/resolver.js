//import { Product, Transaction, User } from '../GraphQLModels';
import Product from '../GraphQLModels/Product.js'
import Transaction from '../GraphQLModels/Transaction.js';
import User from '../GraphQLModels/User.js'


const resolvers = {
    Query: {
        getAllUsers: async () => {
            return await User.find();
        },
        getAllTransactions: async () => {
            return await Transaction.find().populate('products').populate('userId');
        },
        getAllProducts: async () => {
            return await Product.find();
        },
        getOneUser: async (parent, args) => {
            const { id } = args
            const user = await User.findById(id);
            return user;
        }

        
    },
    Mutation: {
        createUser: async (parent, args) => {
            const { name, email, password } = args
            const user = await User.create({ name, email, password })
            return user;
        },
        deleteUser: async (parent, args) => {
            const { id } = args
            const deletedUser = await User.findByIdAndDelete(id);
            return deletedUser;
        },
        updateUser: async (parent, args) => {
            const { id } = args
            const { name, email, password, city, state, country, company, phoneNumber } = args
            const updatedUser = await User.findByIdAndUpdate(id, {name, email, password, city, state, country, company, phoneNumber}, {new: true})
            return updatedUser;
            
        },
        createProduct: async (parent, args) => {
            const { name, price, description, category, rating, supply } = args
            const product = await Product.create({name, price, description, category, rating, supply})
            return product;
        },
        deleteProduct: async (parent, args) => {
            const { id } = args
            const deletedProduct = await Product.findByIdAndDelete(id);
            return deletedProduct;
        },
        updateProduct: async (_, {id, name, price, description, category, rating, supply}) => {
            const result = await Product.updateOne(
                {_id: id},
                {
                    $set: {
                        name,
                        price,
                        description,
                        category,
                        rating,
                        supply,
                    }
                }
            );
            if (result.acknowledged && result.modifiedCount === 1) {
                return await Product.findOne({_id: id});
            }
            console.log('Received id:', id);
            return null;
        },
        createTransaction: async (parent, args) => {
            const { userIds, cost, productIds } = args
            const products = await Product.find({ _id: { $in: productIds }})
            const users = await User.find({ _id: {$in: userIds}})
            const transaction = await Transaction.create({ userId: users, cost, products })
            return transaction;
        },
        deleteTransaction: async (parent, args) => {
            const { id } = args
            const deletedTransaction = await Transaction.findByIdAndDelete(id);
            return deletedTransaction;
        },
        updateTransaction: async (parent, args) => {
            const { id, cost} = args
            const updatedTransaction = await Transaction.findByIdAndUpdate(id, {cost}, {new: true})
            return updatedTransaction;
        }
    }
};


export default resolvers;