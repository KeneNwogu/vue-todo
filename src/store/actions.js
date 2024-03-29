export default {
    login_: (context, payload) => {
        fetch('https://onetodoapi.herokuapp.com/user', {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + btoa(payload.username + ':' + payload.password)
            }
        })
            .then((res) => res.json())
            .then((data) => {
                context.commit('LOGIN', data)
                return false
            })
    },

    get_todos: ({ commit, state }) => {
        fetch('https://onetodoapi.herokuapp.com/todos', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(state.user.token + ':' + '')
            }
        })
            .then((res) => {
                if(res.status != 200) throw res.json()
                else {
                    return res.json()
                }
            })
            .then((data) => {
                console.log(data)
                commit('STORE_TODOS', data)
            })
            .catch(() => commit('LOGOUT'))
    },
    create_todo: ({ state, commit, dispatch }, payload) => {
        payload = {
            'task': payload.task
        }
        console.log(JSON.stringify(payload))
        fetch('https://onetodoapi.herokuapp.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(state.user.token + ':' + '')
            },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then((data) => {
                commit('ADD_TODO', { todo_name: payload.task, completed: false })
                dispatch('get_todos')
                console.log(data, 'add mut')
            })
    },
    mark_todo_complete: ({ state, commit }, id) => {
        fetch(`https://onetodoapi.herokuapp.com/todo/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(state.user.token + ':' + '')
            },
            body: JSON.stringify({fake: true})
        })
            .then((res) => res.json())
            .then(() => {
                commit('MARK_COMPLETE', id)
            })
    },
    delete_action: ({ state, commit }, id) => {
        fetch(`https://onetodoapi.herokuapp.com/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(state.user.token + ':' + '')
            },
            body: JSON.stringify('')
        })
            .then((res) => res.json())
            .then(() => commit('DELETE_TODO', id))
    },
    edit_todo: ({ state, dispatch }, todo) => {
        let edit = {
            "task": todo.todo_name
        }
        fetch(`https://onetodoapi.herokuapp.com/todo/${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(state.user.token + ':' + '')
            },
            body: JSON.stringify(edit)
        })
        .then((res) => res.json())
        .then(() => dispatch('get_todos'))
    },
    clear_completed_todos: ({ state, dispatch }) => {
        fetch(`https://onetodoapi.herokuapp.com/todo/completed`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(state.user.token + ':' + '')
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch('get_todos')
        })
    }
}
