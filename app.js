// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Recreate __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const port = 3000;

// // Create an HTTP server
// const server = http.createServer(app);

// // Create a new instance of socket.io, passing the HTTP server
// const io = new Server(server);

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Middleware to parse URL-encoded bodies
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Initialize users array
// let users = [];

// // When a client connects, set up event listeners
// io.on('connection', (socket) => {
//   console.log('a user connected');

//   // Send the current list of users to the newly connected client
//   socket.emit('users', users);

//   // Handle 'addUser' event
//   socket.on('addUser', (user) => {
//     const validation = checkUser(user);
//     if (validation.status) {
//       const newUser = { ...user, id: users.length + 1 };
//       users.push(newUser);
//       io.emit('users', users); // Emit an event to update clients
//     } else {
//       socket.emit('error', validation.msg);
//     }
//   });

//   // When a client disconnects
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// // GET endpoint to retrieve all users
// app.get('/users', (req, res) => {
//   if (users.length === 0) {
//     res.send('No users found!');
//   } else {
//     res.json(users);
//   }
// });

// // POST endpoint to add a new user
// app.post('/users', (req, res) => {
//   const validation = checkUser(req.body);
//   if (validation.status) {
//     const newUser = { ...req.body, id: users.length + 1 };
//     users.push(newUser);
//     io.emit('users', users); // Emit an event to update clients
//     res.json(users);
//   } else {
//     res.status(400).send(validation.msg);
//   }
// });

// // DELETE endpoint to remove a user by ID
// app.delete('/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const userIndex = users.findIndex(usr => usr.id === id);

//   if (userIndex !== -1) {
//     users = users.filter(usr => usr.id !== id);
//     io.emit('users', users); // Emit an event to update clients
//     res.json(users);
//   } else {
//     res.status(400).send('No user with that ID!');
//   }
// });

// // PATCH endpoint to update a user by ID
// app.patch('/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const userIndex = users.findIndex(usr => usr.id === id);

//   if (userIndex !== -1) {
//     const updatedUser = { ...users[userIndex], ...req.body, id };
//     users[userIndex] = updatedUser;
//     io.emit('users', users); // Emit an event to update clients
//     res.json(users);
//   } else {
//     res.status(400).send('No user with that ID!');
//   }
// });

// // Function to check if user data is valid
// function checkUser(user) {
//   if (users.some(usr => usr.name === user.name)) {
//     return { status: false, msg: 'Name is already in use!' };
//   } else if (!user.name || !user.age) {
//     return { status: false, msg: 'Invalid user data!' };
//   } else {
//     return { status: true, msg: 'Success!' };
//   }
// }

// // Default route handler
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Start the server
// server.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Create an HTTP server
let messages=[];
const server = http.createServer(app);

// Create a new instance of socket.io, passing the HTTP server
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// When a client connects, set up event listeners
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('chat message',messages);
  // Listen for chat messages
  socket.on('chat message', (msg) => {
    messages.push(msg);
    io.emit('chat message', msg); // Broadcast message to all clients
  });

  // When a client disconnects
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Default route handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

