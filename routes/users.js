const { signin, signup } = require('../controllers/users');
const User = require('../models/User');
const router = require('express').Router();

// router.get('/', async (req, res) => {
//   const users = await User.find();

//   return res.json({ data: users });
// });

router.post('/signin', signin);
router.post('/signup', signup);

module.exports = router;
