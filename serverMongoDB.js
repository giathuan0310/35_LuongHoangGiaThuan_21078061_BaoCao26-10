// server.js
const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");

const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/mongodbtest";
let db;

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db("mongodbtest");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Get all users
app.get("/login", (req, res) => {
  db.collection("users")
  .find()
  .toArray()
  .then((users) => {
    res.status(200).json(users); // Send users as JSON response
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Server Error"); // Handle errors
  });


});


//lấy name và pass
app.post('/login', express.json(), (req, res) => {
  const { username, password } = req.body; // Lấy username và password từ body

  // Kiểm tra kết nối MongoDB trước khi thực hiện truy vấn
  if (!db) {
    return res.status(500).send("MongoDB connection is not established");
  }

  const collection = db.collection("users"); // Lấy collection 'users'

  // Tạo điều kiện tìm kiếm với username và password
  let query = {};
  if (username) {
    query.name = username; // Tìm người dùng theo tên
  }
  if (password) {
    query.pass = password; // Tìm người dùng theo mật khẩu
  }

  // Thực hiện truy vấn trong MongoDB
  collection
    .find(query)
    .toArray()
    .then((users) => {
      if (users.length > 0) {
        res.status(200).json(users); // Trả về danh sách người dùng khớp điều kiện
      } else {
        res.status(404).json("Tài khoản không hợp lệ"); // Không tìm thấy người dùng
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Server Error"); // Xử lý lỗi khi truy vấn
    });
});

app.get('/avatar/:name', async (req, res) => {
  const username = req.params.name;
  console.log(`Fetching avatar for username: ${username}`);
  
  try {
    // Query MongoDB to find the user with the specified `name`
    const user = await db.collection('users').findOne({ name: username });
    
    if (user) {
      // Respond with the avatar if the user is found
      res.json({ avatar: user.avatar });
    } else {
      // If no user found, respond with a 404 status
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    // Handle any potential errors in the database operation
    console.error("Database error:", err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Endpoint để đăng ký tài khoản
app.post('/api/register', (req, res) => {
  const { name, pass, avatar } = req.body;

  // Basic validation
  if (!name || !pass) {
    return res.status(400).json({ message: "Name and password are required." });
  }

  const newUser = { name: name, pass: pass, avatar };

  db.collection("users")
    .insertOne(newUser)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// Delete user by name
app.delete('/deleteUser/:name', (req, res) => {
  const userName = req.params.name;

  // Ensure MongoDB connection is available
  if (!db) {
    return res.status(500).send("MongoDB connection is not established");
  }

  const collection = db.collection("users"); // Access the 'users' collection

  // Perform the delete operation
  collection
    .deleteOne({ name: userName })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((error) => {
      console.error("Database error:", error);
      res.status(500).json({ error: 'Database error' }); // Handle server errors
    });
});

// Endpoint to update user by ID
app.put('/updateUser/:id', (req, res) => {
  const userId = req.params.id; // Extract user ID from request parameters
  const { name, pass, avatar } = req.body; // Extract new data from request body

  // Ensure MongoDB connection is available
  if (!db) {
    return res.status(500).send("MongoDB connection is not established");
  }

  const collection = db.collection("users"); // Access the 'users' collection

  // Create an object with the fields to update
  const updatedData = {};

  if (name) updatedData.name = name;  // If new name is provided
  if (pass) updatedData.pass = pass;  // If new password is provided
  if (avatar) updatedData.avatar = avatar;  // If new avatar is provided

  // Perform the update operation
  collection
    .updateOne({ _id: new ObjectId(userId) }, { $set: updatedData })
    .then((result) => {
      if (result.matchedCount > 0) {
        res.json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((error) => {
      console.error("Database error:", error);
      res.status(500).json({ error: 'Database error' }); // Handle server errors
    });
});



// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
