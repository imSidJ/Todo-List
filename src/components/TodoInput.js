import React, { Component } from 'react'

export default class TodoInput extends Component {
    render() {

        const { item, handleChange, handleSubmit, editItem } = this.props

        return (
            <div className="card card-body my-3">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-primary text-white">
                                <i className="fas fa-book"></i>
                            </div>
                        </div>
                        <input
                            type="text"
                            className="form-control text-capitalize"
                            placeholder="Add A Todo Item"
                            value={item}
                            onChange={handleChange}
                        required/>
                    </div>
                    <button type="submit" className={"btn btn-block mt-3 text-capitalize" + (editItem ? " btn-success" : " btn-primary")}>
                        {(editItem ? "edit item" : "add item")}
                    </button>
                </form>
            </div>
        )
    }
}
