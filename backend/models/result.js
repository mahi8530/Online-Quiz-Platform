import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  email: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Result', resultSchema);