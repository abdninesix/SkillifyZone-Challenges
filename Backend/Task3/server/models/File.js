import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: String,
  type: String,
  size: Number,
  url: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('File', fileSchema);