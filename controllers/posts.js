const mongoose = require('mongoose');
const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8; // post per page
    const startIndex = (Number(page) - 1) * LIMIT; // get start index of every page
    const total = await Post.countDocuments({});

    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i');

    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });

    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
};

exports.createPost = async (req, res) => {
  try {
    const data = req.body;
    const newPost = await Post.create({
      ...data,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });

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

  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No Post with that id');
  }

  try {
    const post = await Post.findById(id);
    const index = post.likes.findIndex(id => id === String(req.userId));

    if (index === -1) {
      // like the post
      post.likes.push(req.userId);
    } else {
      // dislike the post
      post.likes = post.likes.filter(id => id !== String(req.userId));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DOCS
// const title = new RegExp(searchQuery, 'i');
// i berarti ingnore
// artinya membolehkan semua query
// contoh test, Test, TEST semuanya sama
