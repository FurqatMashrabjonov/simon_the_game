import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'vue-axios'
import VueAxios from 'vue-axios'

import SignUp from "@/views/SignUp";
import Main from "@/views/Main";
import Login from "@/views/Login";


// require('./assets/css/swipe.min.css')
// require('./assets/css/lib/bootstrap.min.css')
// require('./assets/img/favicon.png')


Vue.use(VueAxios, axios)

const routes = [
    { path: '/signup', component: SignUp },
    { path: '/home', component: Main },
    { path: '/login', component: Login }
]


const router = new VueRouter
({
    mode: 'history',
    routes
})

Vue.use(VueRouter);
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router: router,
}).$mount('#app')
Vue.config.devtools = true