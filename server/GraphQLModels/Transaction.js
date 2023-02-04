//const mongoose = require('mongoose');
import mongoose, { Schema } from 'mongoose';
import Product from './Product.js'

const TransactionSchema = new mongoose.Schema(
    {
      userId: String,
      cost: Number,
      products: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        }
      ]
    },
    { timestamps: true }
  );
  
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;