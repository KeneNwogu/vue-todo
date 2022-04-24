<template>
  <div class="container">
    <Header />
    <TodoArea v-if="Object.keys(user).length > 0" />
  </div>
  <Authenticate v-if="Object.keys(user).length < 1" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
import { mapState } from 'vuex'
import Header from "./components/Header.vue";
import TodoArea from "./components/TodoArea.vue";
import Authenticate from "@/components/Authenticate.vue"

export default {
  data(){
    return {
      
    }
  },
  components: {
    Header,
    TodoArea,
    Authenticate
  },
  computed: {
      ...mapState(['user'])
  }
}
</script>
