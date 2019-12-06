//const express = require('express')
//const MongoClient = require('mongodb').MongoClient
//const app = express()
//const bodyParser = require('body-parser')
//const cors = require('cors')
//const todoRoutes =  express.Router()
const mongoose  = require('mongoose')
//const PORT = 4000

var Todo = require('./todo.model.js')

//app.use(cors())
//app.use(bodyParser.json())

mongoose.connect('mongodb+srv://Siddharth:Mo1rrC0a82txoJHZ@cluster0-63xm5.gcp.mongodb.net/Todos', { useNewUrlParser : true});

const connection  = mongoose.connection

connection.once('open', function() {
    console.log('connected to database')
})



//item.save().then(doc => {
  //  console.log(doc)
//})

//todo.find({}).then(docs => {
//    console.log(docs)
//})
//console.log(task)

todoRoutes.route('/').get(function(req, res){
    console.log('Hit on todos')
	Todo.find(function(err, todos) {
	if(err) {
    	    console.log(err)
        } else {
            res.json(todos)
        }
    })
})

todoRoutes.route('/delete').post(function(req, res) {
	let id = req.body.id
	Todo.deleteOne({id: id}).then(docs => {
		if(docs)
			res.status(200).send('todo deleted')
		else
			res.status(400).send('no record found')
	})
})

todoRoutes.route('/add').post(function(req, res) {
	let todo = new Todo(req.body)
	todo.save().then(todo => {
		res.status(200).json({'todo': 'todo added successfully'})
	}).catch(err => {
		res.status(400).send('adding new todo failed')
	})
})

todoRoutes.route('/update').post(function(req, res) {
	let id = req.body.id
	Todo.findOneAndUpdate({id: id},{$set:{title:req.body.title}},{new:true}).then((docs)=>{
    	if(docs) {
       		console.log(docs)
    	} else {
       		reject({success:false,data:"no such user exist"});
    	}
	})

	//Todo.find({id: id}, function(err, todo) {
	//	if(!todo)
	//		res.status(400).send('data not found')
	//	else {
	//		console.log(todo)
	//		let editedTodo = new Todo(req.body)
		//	editedTodo.save({id: id}).then(doc => {
		//		res.status(200).send('edited todo added')
		//	})
	//	}
//	})
})

//app.use('/todos', todoRoutes)

//app.listen(PORT, function() {
//    console.log(`Server is running on port ${PORT}`)
//})

