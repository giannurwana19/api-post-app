const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createPost = (req, res) => {
  try {
    const data = req.body;
    const newPost = Post.create(data);

    res.status(201).json(newPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
