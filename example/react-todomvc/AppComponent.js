import React, {Component} from 'react'
import './App.css'
import {RSlimConsumer} from 'rslim'
import TodoItem from './TodoItem'
import store from './store'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

class AppComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visibility: 'all',
      filters: filters
    }
  }

  addTodo (e) {
    if (e.key === 'Enter') {
      const text = e.target.value
      if (text.trim()) {
        store.dispatch('addTodo', {
          text: text,
          id: new Date().getTime(),
          done: false
        })
      }
      e.target.value = ''
    }
  }

  remaining (todos) {
    return todos.filter(todo => !todo.done).length
  }

  filteredTodos (todos) {
    return filters[this.state.visibility](todos)
  }

  setVisible (key) {
    this.setState({
      visibility: key
    })
  }

  render () {
    return (
      <RSlimConsumer>
        {({$store, $state}) => (
          <section className="todoapp">
            <header className="header">
              <h1>TODOS</h1>
              <input className="new-todo"
                     autoFocus={true}
                     autoComplete="off"
                     placeholder="What needs to be done?"
                     onKeyPress={this.addTodo}
              />
            </header>
            <section className="main">
              <input
                className="toggle-all"
                id="toggle-all"
                type="checkbox"
                checked={this.state.allChecked}
              />
              <ul className="todo-list">
                {
                  this.filteredTodos($state.todos).map(todo => {
                    return (
                      <TodoItem todo={todo} key={todo.id}/>
                    )
                  })
                }
              </ul>
            </section>
            {
              $state.todos.length ? (
                <footer className="footer">
                  <span className="todo-count"><strong>{this.remaining($state.todos)}</strong></span>
                  <ul className="filters">
                    {
                      Object.keys(filters).map((key) => {
                        return (
                          <li key={key}>
                            <a href={'#/' + key}
                               className={
                                 `${this.state.visibility === key ? 'selected' : ''}`
                               }
                               onClick={() => {
                                 this.setVisible(key)
                               }}>{key}</a>
                          </li>
                        )
                      })
                    }
                  </ul>
                  {
                    $state.todos.length > this.remaining($state.todos) ? (
                      <button
                        className="clear-completed"
                        onClick={() => {
                          $store.dispatch('clearTodo')
                        }}
                      >
                        Clear completed
                      </button>
                    ) : ''
                  }
                </footer>
              ) : ''
            }
          </section>
        )}
      </RSlimConsumer>
    )
  }
}

export default AppComponent
