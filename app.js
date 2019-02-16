// load the app server using express
const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql')
app.use(morgan('combined'));

app.get('/user/id', (req, res) => {
  console.log("Fetching user with ID: " + req.params.id)
  const connection = mysql.createConnection({
   host: '#####',
   user: '#####',
   password: '######',
   database: 'users_test' 
  })

  connection.query("SELECT * FROM users", (err, rows, fields) => {
    console.log("Looks like we fetched users successfully")
    res.json(rows)
  })
  // res.end()
})

app.get("/", (req, res) => {
  console.log("Responding to root route");
  res.send("Hello from root...");
});
app.get("/users", (req, res) => {
  var user1 = {firstName: "Mariko", lastName: "Yashida"};
  const user2 = {firstName: "Yukio", lastName: "Yukio"};
  const user3 = {firstName: "Rila", lastName: "Fukushima"};
  res.json([user1, user2, user3]);
});
//listening on localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on port 3003...");
});
