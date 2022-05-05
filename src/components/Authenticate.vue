<template>
    <div class="row">
        <form action="index.html" method="post" @submit.prevent="register_user" v-if="current_page == 0">
            <div v-if="message" style="margin-bottom: 12px; text-align: center; width: 100%">
                <p class="message" :class="success ? 'success' : 'fail'" v-for="key in Object.keys(message)" :key="key">{{ key }}: {{ message[key] }}</p>
            </div>
            <fieldset>
                <legend style="margin-bottom: 20px">Sign Up</legend>
                
                <label for="name">Name:</label>
                <input type="text" id="name" name="user_name" v-model="sign_up.username">
                
                <label for="email">Email:</label>
                <input type="email" id="mail" name="user_email" v-model="sign_up.email">
            
                <label for="password">Password:</label>
                <input type="password" id="password" name="user_password" v-model="sign_up.password">
            </fieldset>
            <button type="submit">
                Sign Up
                <Preloader v-if="loading" />
            </button>
            <p style="margin-top: 20px">Already have an account? <a href="" @click.prevent="swap_page">Login</a></p>
        </form> 

        <form action="index.html" method="post" @submit.prevent="login_user" v-if="current_page == 1">
            <legend style="margin-bottom: 20px">Login</legend>
            <fieldset>
                <label for="email">Email:</label>
                <input type="email" id="mail" name="user_email" v-model="login.email">
            
                <label for="password">Password:</label>
                <input type="password" id="password" name="user_password" v-model="login.password">
            </fieldset>
            <button type="submit">
                Log in
                <Preloader v-if="loading" />
            </button>
            <p style="margin-top: 20px">Don't have an account? 
                <a href="" @click.prevent="swap_page">Register</a>
            </p>
        </form>
    </div>
</template>

<style scoped src="@/assets/css/form.css">

</style>
<script>
import { mapActions } from 'vuex'
import Preloader from './Preloader.vue'

export default {
    name: 'Authenticate',
    components: {
        Preloader
    },
    data(){
        return {
            current_page: 0,
            message: '',
            success: true,
            loading: false,
            sign_up: {
                username: '',
                email: '',
                password: ''
            },
            login: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions(['login_']),
        register: function(payload){
            this.loading = true
            fetch('https://onetodoapi.herokuapp.com/user', {
                method: 'post',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then((res) => {
                    if(res.status != 200) throw res.json()
                    else return res.json()
                })
                .then((data) => {
                    this.loading = false
                    this.message = data
                    this.current_page = 1
                })
                .catch((message) => {
                    this.loading = false
                    message.then((data) => {
                        this.current_page = 0
                        this.message = data
                        this.success = false
                        this.loading = false
                        console.log('message', message)
                    })
                })
        },
        register_user: function(){
            let payload = {
                username: this.sign_up.username,
                email: this.sign_up.email,
                password: this.sign_up.password
            }
            this.register(payload)
        },
        swap_page: function(){
            let page = this.current_page
            if(page == 0) this.current_page++
            else if(page == 1) this.current_page--

            console.log(this.current_page)
        }, 
        login_user: function(){
            let payload = {
                username: this.login.email,
                password: this.login.password
            }
            this.loading = true
            this.loading = this.login_(payload)
        }
    }
}
</script>