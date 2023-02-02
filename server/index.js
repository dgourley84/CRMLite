import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import path from "path";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import loginRoutes from "./routes/login.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";



//data imports
import {
    dataAffiliateStat, dataOverallStat, dataProduct,
    dataProductStat,
    dataTransaction, dataUser
} from "./data/index.js";
import AffiliateStat from "./models/AffiliateStat.js";
import OverallStat from "./models/OverallStat.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import User from "./models/User.js";



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

//serve frontend

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')))

//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
// } else {
//     app.get('/', (req, res) => res.send('Please set to production'))
// }


// Mongoose Setup
const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

        /* ONLY ADD THIS DATA ONCE */
        //if this is done a second time - navigate to atlas db delete the user document and then redo.
        // User.insertMany(dataUser);
        // Product.insertMany(dataProduct);
        // ProductStat.insertMany(dataProductStat);
        // Transaction.insertMany(dataTransaction);
        // OverallStat.insertMany(dataOverallStat);
        // AffiliateStat.insertMany(dataAffiliateStat);

    }).catch((error) => console.log(`${error} did not connect`))
