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

//Chạy 
app.listen(3000,'192.168.2.58',()=>{

console.log("server đang chạy cổng 3000")

})