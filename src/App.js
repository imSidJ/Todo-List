import React, { Component } from 'react'
import axios from 'axios'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

import 'bootstrap/dist/css/bootstrap.min.css'
import uuid from 'uuid'

export default class App extends Component {

    state = {
        items: [],
        id: uuid(),
        item: '',
        editItem: false
    }

	async componentDidMount(){
        let response = await axios.get('https://sid-todo-backend.herokuapp.com/todos')
        let todos = response.data
        let newTodos = []
        todos.forEach(todo => {
            delete todo['_id']
            delete todo['__v']
            newTodos.push(todo)
        })
        console.log(JSON.stringify(newTodos))
        this.setState({
            items: newTodos
        })
	}

    handleChange = (e) => {
        this.setState({
            item: e.target.value
        })
    }

    handleSubmit = (e) => {

        e.preventDefault()

        const newItem = {
            id: this.state.id,
            title: this.state.item
        }
        console.log(newItem)

        if(this.state.editItem) {
            axios.post('https://sid-todo-backend.herokuapp.com/todos/update', newItem).then(response => {
                console.log(response)
            })
        } else {
            axios.post('https://sid-todo-backend.herokuapp.com/todos/add', newItem).then(response => {
                console.log(response)
            })
        }

        const updateItems = [...this.state.items, newItem]

        this.setState({
            items: updateItems,
            item: '',
            id: uuid(),
            editItem: false
        })
    }

    handleClearList = (e) => {

        axios.post(`https://sid-todo-backend.herokuapp.com/todos/clear`).then(response => {
            console.log(response)
        })

        this.setState({
            items: []
        })
    }

    handleDelete = (id) => {

        axios.post('https://sid-todo-backend.herokuapp.com/todos/delete', {id :id}).then(response => {
            console.log(response)
        })

        const filterdItems = this.state.items.filter(item => item.id !== id)
        this.setState({
            items: filterdItems
        })
    }

    handleEdit = (id) => {
        const filterdItems = this.state.items.filter(item => item.id !== id)
        const selectedItem = this.state.items.find(item => item.id === id)
        this.setState({
            items: filterdItems,
            item: selectedItem.title,
            id: id,
            editItem: true
        })
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto col-md-8 mt-4">
                        <h3 className="text-capitalize text-center">todo input</h3>
                        <TodoInput
                            item={this.state.item}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            editItem={this.state.editItem}
                        />
                        <TodoList
                            items={this.state.items}
                            handleClearList={this.handleClearList}
                            handleDelete={this.handleDelete}
                            handleEdit={this.handleEdit}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
