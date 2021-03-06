import React, {Component} from 'react'
import './App.css'
import {RSlimConsumer} from 'rslim'
import store from './store'

class TodoItem extends Component {
  constructor (props) {
    super(props)

    this.handleDoubleClick.bind(this)
    this.doneEdit.bind(this)

    this.editor = React.createRef()

    this.state = {
      editing: false
    }
  }

  handleDoubleClick (e) {
    this.setState({
      editing: true
    })
    setTimeout(() => {
      this.editor.current.focus()
    })
  }

  doneEdit (e, todo) {
    if (e.key === 'Enter') {
      const text = e.target.value
      if (text.trim()) {
        store.commit('editTodo', todo, e.target.value)
      }
      e.target.value = ''


      this.setState({
        editing: false
      })
    }
  }

  render () {
    return (
      <RSlimConsumer>
        {({$store}) => (
          <li className={
            `todo ${this.props.todo.done ? 'completed' : ''} ${this.state.editing ? 'editing' : ''}`
          }>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={this.props.todo.done}
                onChange={() => {
                  store.commit('toggleTodo', this.props.todo)
                }}
              />
              <label
                onDoubleClick={(e) => {
                  this.handleDoubleClick(e)
                }}
              >{this.props.todo.text}</label>
              <button className="destroy" onClick={() => {
                $store.commit('removeTodo', this.props.todo)
              }}/>
            </div>
            <input
              className="edit"
              ref={this.editor}
              style={{
                display: this.state.editing ? 'block' : 'none'
              }}
              defaultValue={this.props.todo.text}
              onKeyPress={(e) => {
                this.doneEdit(e, this.props.todo)
              }}
            />
          </li>
        )}
      </RSlimConsumer>
    )
  }
}

export default TodoItem
