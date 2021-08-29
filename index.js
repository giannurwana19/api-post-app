const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const postRoutes = require('./routes/posts');

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello, this is api post memory😍' });
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${process.env.APP_URL}:${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
