const mongoose = require('mongoose');
const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const data = req.body;
    const newPost = await Post.create(data);

    res.status(201).json(newPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id: _id } = req.params;

  // jika bukan dari tipe data object mongodb
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No Post with that id');
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No Post with that id');
  }

  try {
    await Post.findByIdAndRemove(id);

    res.status(200).json({ message: 'Post Deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No Post with that id');
  }

  try {
    const post = await Post.findById(id);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        likeCount: post.likeCount + 1,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
