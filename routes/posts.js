const router = require('express').Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
} = require('../controllers/posts');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/search', getPostsBySearch);
router.post('/', authMiddleware, createPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.patch('/:id/like-post', authMiddleware, likePost);

module.exports = router;
