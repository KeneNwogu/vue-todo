<template>
    <form class="input-box" @submit.prevent="add_todo">
      <div class="circle">
      </div>
      <input type="text" name="add" autocomplete="off" class="add" placeholder="Create a new todo...">
    </form>
</template>


<script>
export default {
    data(){
        return {
        }
    },
    props: {
        todo_items: Array,
        add_todo: Function
    },
    
}
</script>