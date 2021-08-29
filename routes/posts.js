const router = require('express').Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require('../controllers/posts');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getPosts);
router.post('/', authMiddleware, createPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.patch('/:id/like-post', authMiddleware, likePost);

module.exports = router;
