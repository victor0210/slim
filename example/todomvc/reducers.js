const todoReducers = {
    addTodo: ({todos}, todo) => {
        todos.push(todo)
    },
    clearTodo: (draft) => {
        draft.todos = draft.todos.filter(todo => {
            return !todo.done
        })
    },
    removeTodo: (draft, id) => {
        draft.todos = draft.todos.filter(todo => {
            return todo.id !== id
        })
    },
    toggleTodo: ({todos}, id) => {
        todos.some(todo => {
            if (todo.id === id) {
                todo.done = !todo.done
                return true
            }
        })
    },
    editTodo: ({todos}, id, text) => {
        todos.some(todo => {
            if (todo.id === id) {
                todo.text = text
                return true
            }
        })
    }
}

const filterReducers = {}

const reducers = {
    ...todoReducers,
    ...filterReducers
}

export default reducers
