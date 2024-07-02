const express =require('express');
const mongoose =require('mongoose');
const app =express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userRoute=require('./routes/user');
app.use('/users',userRoute)



app.listen(3000);