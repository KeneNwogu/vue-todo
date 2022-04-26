export default {
    LOGIN: (state, data) => {
        console.log('datasss', data)
        state.user.token = data.token
    },
    LOGOUT: (state) => {
        state.user = {}
    },
    STORE_TODOS: (state, data) => {
        state.todos = data
    },
    ADD_TODO: (state, data) => {
        console.log(data)
        console.log('state:', state.todos)
    },
    MARK_COMPLETE: (state, id) => {
        let ids = state.todos.map((el) => el.id)
        let index = ids.indexOf(id)
        let todo = state.todos[index]
        todo.completed = true
        state.todos[index] = todo
    },
    DELETE_TODO: (state, id) => {
        let ids = state.todos.map((el) => el.id)
        let index = ids.indexOf(id)
        let todo = state.todos[index]
        todo.completed = true
        state.todos.splice(index, 1)
    }
}