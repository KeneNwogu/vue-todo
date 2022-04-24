<template>
    <main class="todo-container">
        <p v-show="todo_list.length <= 0" class="error">You have no todos completed</p>

        <ul class="todos" id="items"> 
            <li v-for="todo in todo_list" class="todo-item" :class="todo.completed ? 'completed' : ''" :key="todo.id">
                <div class="check-box" @click="mark_complete(todo.id)">
                    <div class="check-box-inner" :class="todo.completed ? 'checked' : ''">
                        <img src="../assets/images/icon-check.svg" alt="check-box">
                    </div>
                </div>
                <div class="text">
                    {{ todo.todo_name }}
                    <img class="delete" src="../assets/images/icon-cross.svg" alt="delete todo" @click="delete_todo(todo.id)">
                </div>
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

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data(){
        return {
            active_btn: 0,
            todo_list: []
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
        ...mapActions(['mark_todo_complete', 'delete_action', 'get_todos']),
        display_completed: function(){
            this.todo_list = this.todos.filter((task) => task.completed == true)
            this.active_btn = 2
        },
        display_active: function(){
            this.todo_list = this.todos.filter((task) => task.completed == false)
            this.active_btn = 1
        },
        display_all: function(){
            this.todo_list = this.todos
            this.active_btn = 0
        },
        mark_complete: function(id){
            console.log(id)
            this.mark_todo_complete(id)
        },
        delete_todo: function(id){
            console.log('delete', id)
            this.delete_action(id)
        }
    },
    watch: {
        '$store.state.todos': function(){
            this.get_todos()
            this.display_all()
        }
    }
}
</script>