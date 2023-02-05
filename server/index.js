import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import loginRoutes from "./routes/login.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

//const { ApolloServer, gql} = require('apollo-server-express');
import { ApolloServer, gql } from 'apollo-server-express';
//import { typeDefs, resolvers } from './schemas'

import resolvers from './schemas/resolver.js';
import typeDefs from './schemas/typeDefs.js';

// //data imports
// import {
//     dataAffiliateStat, dataOverallStat, dataProduct,
//     dataProductStat,
//     dataTransaction, dataUser
// } from "./data/index.js";
// import AffiliateStat from "./models/AffiliateStat.js";
// import OverallStat from "./models/OverallStat.js";
// //import Product from "./models/Product.js";
// import ProductStat from "./models/ProductStat.js";
// //import Transaction from "./models/Transaction.js";
// import User from "./models/User.js";




// Configuration and middlewares
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

//Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

//JWT Login
app.get('/', (req, res) => {
    res.status(201).json("home GET Request");
});
app.use(express.json());
app.use("/home", loginRoutes);


const apolloPort = process.env.PORT || 4000;
async function startServer() {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start()

    apolloServer.applyMiddleware({ app: app });

    app.use((req, res) => {
        res.send('GraphQL up and running');
    })

    await mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log('Mongoose connected...');

    app.listen(apolloPort, () => console.log(`Server Active on Port: ${apolloPort}`));
}

startServer();
