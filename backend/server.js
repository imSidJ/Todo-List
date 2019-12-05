const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const todoRoutes =  express.Router()
const mongoose  = require('mongoose')
const PORT = 4000

var todo = require('./todo.model.js')

app.use(cors())
app.use(bodyParser.json())

const uri = "mongodb+srv://Siddharth:Mo1rrC0a82txoJHZ@cluster0-63xm5.gcp.mongodb.net/Todos";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("Todos").collection("todo");
 // perform actions on the collection object
  //client.close();
console.log(collection)
});

//mongoose.connect(`mongodb+srv://Siddharth:Mo1rrC0a82txoJHZ@cluster0-63xm5.gcp.mongodb.net/todo`, { useNewUrlParser : true});

//const connection  = mongoose.connection

//connection.once('open', function() {
 //   console.log('connected to db')
//})

todo.find({}, function(err, docs){
    console.log(docs)
})
//console.log(task)

//todoRoutes.route('/').get(function(req, res){
//})

//app.use('/todos', todoRoutes)

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`)
})

