const router = require('express').Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
  commentPost,
} = require('../controllers/posts');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', authMiddleware, createPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.patch('/:id/like-post', authMiddleware, likePost);
router.post('/:id/comment-post', authMiddleware, commentPost);

module.exports = router;
