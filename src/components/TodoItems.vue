<template>
    <main class="todo-container" @click="refresh_todo">
        <p v-show="todo_list.length <= 0" class="error">You have no {{ filter }} todos</p>

        <ul class="todos" id="items"> 
            <li v-for="todo in todo_list" class="todo-item" :class="todo.completed ? 'completed' : ''" :key="todo.id">
                <div class="check-box" @click="mark_complete(todo.id)">
                    <div class="check-box-inner" :class="todo.completed ? 'checked' : ''">
                        <img src="../assets/images/icon-check.svg" alt="check-box">
                    </div>
                </div>
                <button class="text" @click="start_edit(todo)" v-if="!todo.editing" :disabled="todo.disabled">
                    {{ todo.todo_name }}
                    <img class="delete" src="../assets/images/icon-cross.svg" alt="delete todo" @click="delete_todo(todo.id)">
                </button>
                <form class="input-box" @submit.prevent="submit_edit(todo)" v-else>
                    <input type="text" name="add" autocomplete="off" class="add" :placeholder="todo.todo_name || 'Edit Todo'" v-model="todo.todo_name" :disabled="todo.edited">
                    <img class="delete" src="../assets/images/icon-cross.svg" alt="delete todo" @click="cancel_edit(todo)">
                </form>
            </li>
        </ul>

        <div class="todo-information">
            <p><span class="counter">{{ counter }}</span> items left</p>

            <div class="btns">
                <button :class="active_btn == 0 ? 'activeBtn' : ''" @click="display_all" ref="filter" >All</button>          
                <button :class="active_btn == 1 ? 'activeBtn' : ''" @click="display_active" ref="filter">Active</button>      
                <button :class="active_btn == 2 ? 'activeBtn' : ''" @click="display_completed" ref="filter">Completed</button>    
            </div>

            <button class="delete-all">Clear Completed</button>
        </div>
    </main>
</template>

<style scoped>
.todo-item{
    position: relative;
}
.todo-item .input-box{
    position: absolute;
    width: 80%;
    padding-left: 10px;
    padding-right: 10px;
}
</style>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data(){
        return {
            active_btn: 0,
            todo_list: [],
            filter: undefined,
            before_edit: ''
        }
    },
    // props: {
    //     todo_items: Array
    // },
    mounted(){
        this.todo_list = this.todos
    },
    computed: {
        ...mapState(['todos']),
        counter: function(){
            return this.todo_list.length
        }
    },
    methods: {
        ...mapActions(['mark_todo_complete', 'delete_action', 'get_todos', 'edit_todo']),
        display_completed: function(){
            this.todo_list = this.todos.filter((task) => task.completed == true)
            this.active_btn = 2
            this.filter = 'completed'
        },
        display_active: function(){
            this.todo_list = this.todos.filter((task) => task.completed == false)
            this.active_btn = 1
            this.filter = 'active'
        },
        display_all: function(){
            this.todo_list = this.todos
            this.active_btn = 0
            this.filter = undefined
        },
        mark_complete: function(id){
            console.log(id)
            this.mark_todo_complete(id)
            this.refresh_todo()
        },
        delete_todo: function(id){
            console.log('delete', id)
            this.delete_action(id)
            this.refresh_todo()
        },
        refresh_todo: function(){
            if(this.active_btn == 0) this.todo_list = this.todos
            if(this.active_btn == 1) this.todo_list = this.todos.filter((task) => task.completed == false)
            if(this.active_btn == 2) this.todo_list = this.todos.filter((task) => task.completed == true)
        },
        start_edit: function(todo){
            console.log('editing')
            todo.editing = true
            this.before_edit = todo.todo_name
            Array.from(this.todos).forEach(todo_el => {
                if (todo_el.id != todo.id) todo_el.disabled = true
            });
        },
        cancel_edit: function(todo){
            todo.editing = false
            todo.todo_name = this.before_edit
            this.before_edit = ''
            Array.from(this.todos).forEach(todo_el => {
                if (todo_el.id != todo.id) todo_el.disabled = false
            });
        },
        submit_edit: function(todo){
            todo.edited = true
            this.edit_todo(todo)
        }
    },
    watch: {
        todos: function(){
            this.refresh_todo( )
        }
    }
}
</script>