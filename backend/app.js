const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accessControl= require('./middleware/access-controls.js')
const app = express();
const bodyParser = require('body-parser');

const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret';

app.use(cors());
app.use(accessControl);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
try {
  mongoose.connect("mongodb://127.0.0.1:27017/", 
  {
      useNewUrlParser: true,
      useUnifiedTopology:true,
  });
  console.log(`mongoDB connected successfully on mongodb://localhost:27017/mern-app(app.js)`);
} catch (error) {
  console.log("Error occured while connecting with mongoDB")
}


const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
});

const User = mongoose.model('User', userSchema);


const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  userId: mongoose.Schema.Types.ObjectId,
});

const Item = mongoose.model('Item', itemSchema);

app.get('/', async (req, res) => {
  res.send('Hello World');
});
// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword,email });
    await newUser.save();
    res.json(newUser);
    console.log("User registered successfully");
  } catch (error) {
    console.log(error);
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { username, password, email } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// CRUD routes with authentication
app.get('/api/items', authenticate, async (req, res) => {
  const items = await Item.find({ userId: req.userId });
  res.json(items);
});

app.post('/api/items', authenticate, async (req, res) => {
  const newItem = new Item({ ...req.body, userId: req.userId });
  await newItem.save();
  res.json(newItem);
});

app.put('/api/items/:id', authenticate, async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(updatedItem);
});

app.delete('/api/items/:id', authenticate, async (req, res) => {
  await Item.findByIdAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Item deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
