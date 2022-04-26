<template>
    <!-- Input box -->
    <!-- todo container -->
    <InputBox :todo_items="todos" :add_todo="addTodo"/>
    <TodoItems
        @display-completed="display_completed"
        @display-active="display_active"
        @display-all="display_all"
    />
</template>


<script>
import { mapState, mapActions } from 'vuex'
import InputBox from "@/components/InputBox.vue"
import TodoItems from "@/components/TodoItems.vue"

export default {
    data(){
        return {
            todo_items: []
        }
    },
    mounted: function(){
      this.get_todos()
      this.todo_items = this.todos
    },
    components: {
        InputBox,
        TodoItems,
    },
    methods: {
      ...mapActions(['get_todos', 'create_todo']),
      addTodo: function(event){
        let item = event.target.elements.add.value
        let todo = {
          "task": item
        }
        this.create_todo(todo)
        this.get_todos()
        event.target.elements.add.value = ''
      },
      display_completed: function(){
        this.todo_items = this.todos.filter((task) => task.completed == true)
      },
      display_active: function(){
        this.todo_items = this.todos.filter((task) => task.completed == false)
      },
      display_all: function(){
        this.todo_items = this.todos
      }
    },
    computed: {
      ...mapState(['todos'])
    }
}
</script>