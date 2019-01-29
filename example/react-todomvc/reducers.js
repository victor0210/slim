const todoReducers = {
    addTodo: ({todos}, todo) => {
        todos.push(todo)
    },
    clearTodo: (state) => {
        state.todos = state.todos.filter(todo => {
            return !todo.done
        })
    },
    removeTodo: ({todos}, todo) => {
        todos.splice(todos.indexOf(todo), 1)
    },
    toggleTodo: ({todos}, todo) => {
        todos[todos.indexOf(todo)] = {
          ...todo,
          done: !todo.done
        }
    },
    editTodo: ({todos}, todo, text) => {
        todos[todos.indexOf(todo)].text = text
    }
}

const reducers = {
    ...todoReducers
}

export default reducers
