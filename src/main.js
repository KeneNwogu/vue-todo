import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/style.css";

import Vuex from 'vuex'
import store from '@/store'


createApp(App)
.use(Vuex)
.use(store)
.mount("#app");