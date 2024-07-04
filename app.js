require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.set('strictQuery', false);
//H7phtdVEZTswlTbd
mongoose.connect("mongodb+srv://jayythecracker:H7phtdVEZTswlTbd@jayy.ryk5chg.mongodb.net/?retryWrites=true&w=majority&appName=jayy");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/users');

app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/users', userRoute);

app.use(express.static(path.join(__dirname, 'view')));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'view/index.html'));
});
// Serve the registration page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'view/register.html'));
});


app.use('*', (req, res) => res.send('NOT ALLOWED!'));

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
