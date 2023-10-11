import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from "./components/RegisterComponent.vue"
import LoginComponent from "./components/LoginComponent.vue"

const routes = [
    { path: "/register", component: RegisterComponent },
    { path: "/login", component: LoginComponent }
]
const router = createRouter ({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.config.globalProperties.$mainURL = "http://localhost:8080"
app.config.globalProperties.$apiURL = "http://localhost:3000"
app.config.globalProperties.$accessTokenKey = "accessTokenKey"
app.mount('#app')