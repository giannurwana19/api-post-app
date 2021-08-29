const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  creator: '',
  title: String,
  message: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Post', postSchema);
