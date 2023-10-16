import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from "./components/RegisterComponent.vue"
import LoginComponent from "./components/LoginComponent.vue"
import HomeComponent from "./components/HomeComponent.vue"
import AddContactComponent from "./components/AddContactComponent.vue"

const routes = [
    { path: "/register", component: RegisterComponent },
    { path: "/login", component: LoginComponent },
    { path: '/', component: HomeComponent },
    { path: "/contacts/add", component: AddContactComponent },
]
const router = createRouter ({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.config.globalProperties.$mainURL = "http://127.0.0.1:8080"
app.config.globalProperties.$apiURL = "http://127.0.0.1:3000"
app.config.globalProperties.$accessTokenKey = "accessTokenKey"
app.config.globalProperties.$user = null;
app.config.globalProperties.$login = false;
app.config.globalProperties.$headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("accessTokenKey")
};
app.mount('#app')