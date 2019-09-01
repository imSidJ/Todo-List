import React from 'react'
import TodoItem from '../TodoItem/todoItem.js'

class TodoList extends React.Component {

    render() {

        const todos = this.props.todos

        return(
            <div className='todoListContainer'>
                {
                    todos.map((_todo, _index) => {
                        return(
                            <TodoItem updateTodoFn={this.updateTodo} todo={_todo} key={_index}></TodoItem>
                        )
                    })
                }
            </div>
        )
    }

    updateTodo = (todo) => {
        this.props.updateTodoFn(todo)
    }

}

export default TodoList