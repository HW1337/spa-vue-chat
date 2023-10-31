<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="margin-bottom: 50px;">
        <div class="container-fluid">
        
            <router-link class="navbar-brand" to="/">
                Chat Station
            </router-link>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/">
                            Home
                            <span class="visually-hidden">(current)</span>
                        </router-link>
                    </li>

                    <li class="nav-item" v-if="!login">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>

                    <li class="nav-item" v-if="!login">
                        <router-link class="nav-link" to="/register">Register</router-link>
                    </li>

                    <li class="nav-item dropdown" v-if="login">
                        <a class="nav-link dropdown-toggle" href="#" v-text="$user.name" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="javascript:void(0);" v-on:click="doLogout">Logout</a></li>
                        </div>
                    </li>
                </ul>

                <form class="d-flex">
                    <input class="form-control me-sm-2" type="text" v-model="query" placeholder="Search">
                    <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
 
    import axios from "axios"
    import swal from "sweetalert2"
    import { io } from 'socket.io-client'
 
    export default {
        data() {
            return {
                login: false,
                user: null
            }
        },
 
        methods: {
            doLogout: async function () {
                const response = await axios.post(
                    this.$apiURL + "/logout",
                    null,
                    {
                        headers: this.$headers
                    }
    );
 
    if (response.data.status == "success") {
        localStorage.removeItem(this.$accessTokenKey)
 
        window.location.href = "/login"
    } else {
        swal.fire("Error", response.data.message, "error");
    }
},
            getUser: async function () {
                const self = this
 
                if (localStorage.getItem(this.$accessTokenKey)) {
                    const response = await axios.post(
                        this.$apiURL + "/getUser",
                        null,
                        {
                            headers: this.$headers
                        }
                    )
 
                    if (response.data.status == "success") {
                        this.$user = response.data.user
                        socketIO.emit("connected", this.$user.email)
                        socketIO.on("sendMessage", async function (data) {
                            const Toast = swal.mixin({
                                toast: true,
                                position: 'bottom-right',
                                customClass: {
                                    popup: 'colored-toast'
                                },
                                showConfirmButton: false,
                                    timer: 10000,
                                    timerProgressBar: true
                                })
                            
                            await Toast.fire({
                                title: data.title
                            })
                        })
                    } else {
                        localStorage.removeItem(this.$accessTokenKey);
                    }
 
                    this.login = (localStorage.getItem(this.$accessTokenKey) != null);
                } else {
                    this.login = false;
                }
 
                global.user = this.user
            },
        },
 
        mounted: function () {
            this.getUser();
            global.socketIO = io(this.$apiURL)
        }
    }
</script>