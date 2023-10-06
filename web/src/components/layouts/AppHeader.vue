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

                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" to="/register">Register</router-link>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="javascript:void(0);">Logout</a></li>
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

    export default {
        //
    }
</script>