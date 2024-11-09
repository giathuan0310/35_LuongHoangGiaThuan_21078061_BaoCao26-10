//Cài đặt thư viện
//express ,mysql,body-parser,cors
// npm install express --save
//npm install mysql --save
//npm install body-parser --save
//npm install cors --save

// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyparser = require('body-parser');



const app = express(); //tạo đối tượng mới

app.use(cors());
app.use(bodyparser.json()); //sử dụng json để chuyển dữ liệu
app.use(cors());//sử dụng thư viện cors

//kết nối mysql

const db = mysql.createConnection({
    host: '127.0.0.1',  // or 'localhost'
    port: 3306,          // default MySQL port
    user: 'root',        // your MySQL root username
    password: '123456',  // replace 'your_password' with your actual root password
    database: 'testmysql'   // replace 'your_database' with the name of your database
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

//select 
app.get('/login',(req,res)=>{
    var sql="select * from user ";
    db.query(sql,(err,kq)=>{
        if(err) throw err;
        console.log(kq);
        res.send(kq);//trả kết quả cho react


    });

});
//lấy name và pass
app.post('/login', express.json(), (req, res) => {
    const { name, pass } = req.body;
    var sql = "SELECT * FROM user WHERE name = ? AND pass = ?";
    db.query(sql, [name, pass], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.length > 0) {
            res.json({ message: 'Login successful', user: result[0] });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

app.get('/avatar/:name', (req, res) => {
    const username = req.params.name;
    console.log(`Fetching avatar for username: ${username}`);
    var sql = "SELECT avatar FROM user WHERE name = ?";
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.length > 0) {
            res.json({ avatar: result[0].avatar });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});

// Delete user by name
app.delete('/deleteUser/:name', (req, res) => {
    const userName = req.params.name;
    var sql = "DELETE FROM user WHERE name = ?";
    db.query(sql, [userName], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows > 0) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});

// Endpoint để đăng ký tài khoản
app.post('/api/register', (req, res) => {
    const { name, pass, avatar } = req.body;
  
    // Kiểm tra tên người dùng đã tồn tại hay chưa
    const checkQuery = 'SELECT * FROM user WHERE name = ?';
    db.query(checkQuery, [name], (err, result) => {
      if (err) {
        console.error('Lỗi:', err);
        return res.status(500).json({ error: 'Lỗi !' });
      }
  
      if (result.length > 0) {
        return res.status(409).json({ error: 'Username đã tồn tại' });
      }
  
      // Thêm người dùng vào cơ sở dữ liệu
      const insertQuery = 'INSERT INTO user (name, pass, avatar) VALUES (?, ?, ?)';
      db.query(insertQuery, [name, pass, avatar], (err, result) => {
        if (err) {
          console.error('Lỗi:', err); // Log lỗi insert
          return res.status(500).json({ error: 'Lỗi !' });
        }
        res.status(201).json({ message: 'Người dùng đã đăng ký thành công', userId: result.insertId });
      });
    });
  });

  app.put('/updateUser/:id', (req, res) => {
    const userId = req.params.id;  // Extract user ID from request parameters
    const { name, pass, avatar } = req.body;  // Extract new data from request body
  
    // Ensure MySQL connection is available
    if (!db) {
      return res.status(500).send("MySQL connection is not established");
    }
  
    // Create an array to hold the fields for the update query
    let updateFields = [];
    let updateValues = [];
  
    if (name) {
      updateFields.push("name = ?");
      updateValues.push(name);
    }
    if (pass) {
      updateFields.push("pass = ?");
      updateValues.push(pass);
    }
    if (avatar) {
      updateFields.push("avatar = ?");
      updateValues.push(avatar);
    }
  
    // If there are no fields to update, return an error
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No data to update' });
    }
  
    // Create the SQL query
    const sql = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
  
    // Add userId as the last value in the updateValues array
    updateValues.push(userId);
  
    // Perform the update operation
    db.query(sql, updateValues, (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (results.affectedRows > 0) {
        res.json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    });
  });
  
  
//Chạy 
app.listen(3000,()=>{

console.log("server đang chạy cổng 3000")

})