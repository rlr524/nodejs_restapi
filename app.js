// load the app server using express
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use(morgan('short'))
// set up the mysql db
function getConnection() {
  return mysql.createConnection({
    host: 'my local host',
    user: 'my username',
    password: 'mypassword',
    database: 'users_test' 
  })
}
// Create a route for the user creation form to the db
app.post('/user_create', (req, res) => {
  console.log("Trying to create a new user...")
  console.log("How do we get the user data?")
  const firstName = req.body.create_first_name
  const lastName = req.body.create_last_name
  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
  getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500)
      return
    }
    console.log("Inserted a new user with id: ", results.insertId)
    res.end()
  })
  res.end()
})
// Set up to get from the db
app.get('/user/:id', (req, res) => {
  console.log("Fetching user with ID: " + req.params.id)
  const connection = getConnection()
  const userID = req.params.id
  const queryString = "SELECT * FROM users WHERE id = ?"
  connection.query(queryString, [userID], (err, rows, fields) => {
    if(err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      return
    }
    console.log("Looks like we fetched users successfully")

    const users = rows.map((row) => {
      return{FirstName: row.first_name, LastName: row.last_name, ID: row.id}
    })
    res.json(users)
  })
})
app.get("/users", (req, res) => {
  const connection = getConnection()
  const queryString = "SELECT * FROM users"
connection.query(queryString, (err, rows, fields) => {
  if(err) {
    console.log("Failed to query for users: " + err)
    res.sendStatus(500)
    return
  }
  const users = rows.map((row) => {
    return{FirstName: row.first_name, LastName: row.last_name, ID: row.id}
  })
  res.json(users)
  })
})
app.get("/", (req, res) => {
  console.log("Responding to root route");
  res.send("Hello from root...");
})
//listening on localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on port 3003...")
})
