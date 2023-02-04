//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
    {
      userId: String,
      cost: Number,
    },
    { timestamps: true }
  );
  
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;