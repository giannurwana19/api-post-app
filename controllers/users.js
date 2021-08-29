const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = require('../secret');

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User doesn`t exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: '1h',
    });

    res.status(200).json({ result: user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something when wrong' });
  }
};

exports.signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({ message: 'User already exist' });
    }

    if (password !== confirmPassword) {
      return res.status(404).json({ message: 'Password Don`t Match' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: '1h',
    });

    res.status(200).json({ result, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something when wrong' });
  }
};
